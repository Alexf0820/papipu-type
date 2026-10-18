# 追加QAの再現記録

2026-10-18。既存のローカル本番形式buildをsystem Chromiumで表示。新規build・remote Preview・Safari試験ではない。build内106個の実ソースを固定Git blobと照合し、不一致0（`build-source-proof.json`）。生成proxy9件は実ファイル比較の対象外。

以下を一時ディレクトリの `.cjs` として実行した。公開記録ではlocal origin/outputを環境変数に置き換えた。実行環境の既存Playwrightとsystem Chromiumを使う。ダウンロード・外部postingなし。ブラウザ通信は指定originとdata URLのみ。既存48結果fixtureの再実行ではなく、320px全選択肢と10回の言語切替に限定した。

```js
const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const h=JSON.parse(fs.readFileSync('src/data/quizzes/pizza/content/handoff.json'));
const base=process.env.PIZZA_QA_BASE,out=process.env.PIZZA_QA_OUT;
if(!base||!out)throw Error('Set the authorized local origin and output directory');
const report={date:'2026-10-18',target:'Existing local production build; not remote Preview',browser:'System Chromium mobile touch; not Safari or physical iPhone',viewport:{width:320,height:740},languageSwitches:[],sessions:[],questionChecks:[],pageErrors:[],overflow:[],screenshots:[]};
const retry=l=>l==='ja'?'もう一度診断する':'Try Again';
const label=l=>l==='ja'?'日本語':'English';
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true});
 report.browserVersion=browser.version();
 const context=await browser.newContext({viewport:report.viewport,deviceScaleFactor:1,isMobile:true,hasTouch:true});
 context.setDefaultTimeout(15000);
 const page=await context.newPage();page.on('pageerror',e=>report.pageErrors.push(e.message));
 await page.route('**/*',r=>new URL(r.request().url()).origin===base||r.request().url().startsWith('data:')?r.continue():r.abort());
 const check=async name=>{const m=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));if(m.scroll>m.viewport)report.overflow.push({name,...m});};
 const answer=async i=>{const text=await page.locator('main h2').textContent();await page.locator('main li button').nth(i).tap();await page.waitForFunction(t=>document.querySelector('main h2')?.textContent!==t,text);};
 async function state(l){
  await page.waitForFunction(({questions,retryText})=>questions.includes(document.querySelector('main h2')?.textContent)||Array.from(document.querySelectorAll('main button')).some(b=>b.textContent===retryText),{questions:Object.values(h.quiz.questions).map(q=>q[l].text),retryText:retry(l)});
  return await page.getByRole('button',{name:retry(l),exact:true}).count()?'result':'question';
 }
 async function toggle(l,where){
  const before=await page.locator('main').innerText();
  await page.getByRole('link',{name:label(l),exact:true}).tap();
  await page.waitForURL(`${base}/${l}${where==='home'?'':'/pizza'}`);
  if(where==='home')await page.getByRole('link',{name:h.home.accessibleLabel[l],exact:true}).waitFor();else await state(l);
  await check(`language ${where} -> ${l}`);
  report.languageSwitches.push({at:where,to:l,urlPath:new URL(page.url()).pathname,localizedContentChanged:before!==await page.locator('main').innerText(),stateAfter:where==='home'?'home':await state(l)});
 }
 await page.goto(base+'/ja');await toggle('en','home');await toggle('ja','home');
 for(const l of ['ja','en']){
  await page.goto(`${base}/${l}/pizza`);await state(l);
  await answer(0);await toggle(l==='ja'?'en':'ja','in-progress');await toggle(l,'in-progress');
  while(await page.locator('main li button').count())await answer(0);
  await page.getByRole('button',{name:retry(l),exact:true}).waitFor();
  await toggle(l==='ja'?'en':'ja','result');await toggle(l,await state(l==='ja'?'en':'ja')==='result'?'result':'in-progress');
  while(await page.locator('main li button').count())await answer(0);
  const longest=Object.entries(h.quiz.questions).sort((a,b)=>Math.max(...Object.values(b[1][l].choices).map(x=>x.length))-Math.max(...Object.values(a[1][l].choices).map(x=>x.length)))[0][0];
  for(let k=0;k<4;k++){
   const order=h.quiz.categories.map(c=>c[k]);
   const queue=Array(8).fill((k+.1)/4).concat(Array(7).fill(.999));
   await page.evaluate(q=>{window.__qaRandom=q;Math.random=()=>window.__qaRandom.length?window.__qaRandom.shift():.5},queue);
   await page.getByRole('button',{name:retry(l),exact:true}).tap();
   await page.waitForFunction(t=>document.querySelector('main h2')?.textContent===t,h.quiz.questions[order[0]][l].text);
   for(const q of order){
    assert.equal(await page.locator('main h2').textContent(),h.quiz.questions[q][l].text);
    assert.deepEqual(await page.locator('main li button').allTextContents(),Object.values(h.quiz.questions[q][l].choices));
    const bounds=await page.locator('main li button').evaluateAll(bs=>bs.map(b=>{const r=b.getBoundingClientRect();return{left:r.left,right:r.right,width:r.width,height:r.height,scrollWidth:b.scrollWidth,clientWidth:b.clientWidth}}));
    assert(bounds.every(b=>b.left>=0&&b.right<=320&&b.scrollWidth<=b.clientWidth),`${l}/${q} choices fit`);
    report.questionChecks.push({locale:l,id:q,choiceCount:4,buttonsFit:true,maxButtonHeight:Math.max(...bounds.map(b=>b.height))});await check(`${l}/${q}`);
    if(q===longest){const file=`${l}-longest-choice-320.png`;await page.screenshot({path:out+'/'+file,fullPage:true});report.screenshots.push(file);}
    await answer(0);
   }
   await page.getByRole('button',{name:retry(l),exact:true}).waitFor();await check(`${l}/result/${k}`);
   report.sessions.push({locale:l,questionIds:order,completed:true});
  }
 }
 assert.equal(report.pageErrors.length,0);assert.equal(report.overflow.length,0);
 report.method='Eight targeted eight-question sessions cover every question and all128 choices per locale at320px. Only question sampling is controlled before Try Again; actual taps and unchanged scoring resolve results. Language toggles exercised both directions on Home, during quiz, and from result. Existing48 result/variation fixtures were not rerun.';
 await browser.close();fs.writeFileSync(out+'/missing-qa.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({sessions:report.sessions.length,questions:report.questionChecks.length,languageSwitches:report.languageSwitches,errors:report.pageErrors,overflow:report.overflow}));
})().catch(e=>{report.failure=e.stack;fs.writeFileSync(out+'/missing-qa.json',JSON.stringify(report,null,2)+'\n');console.error(e);process.exit(1)});
```

原画像の加工は行っていない。PNGはブラウザ画面キャプチャであり、キャラクター素材の差替えではない。
