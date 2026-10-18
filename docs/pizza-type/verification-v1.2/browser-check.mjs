import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=process.cwd(),base=process.env.PIZZA_QA_BASE; if(!base)throw Error('Set PIZZA_QA_BASE to the authorized target origin');
const h=JSON.parse(fs.readFileSync(root+'/src/data/quizzes/pizza/content/handoff.json'));
const examples=JSON.parse(fs.readFileSync(root+'/docs/pizza-type/verification-v1.1/runtime.json')).pizzaReproducibleExamples;
const out=process.env.PIZZA_QA_OUT||'/tmp/pizza-v12-browser';fs.mkdirSync(out,{recursive:true});
let report={base,browser:'System Chromium, not Safari or physical iPhone',viewport:{width:390,height:844},sessions:[],routes:[],errors:[],overflows:[],share:[],backFlow:[],faces:[],screenshots:[]};
if(process.env.PIZZA_QA_RESUME==='1'){report=JSON.parse(fs.readFileSync(out+'/report.json'));report.harnessCorrections=['Wait for retry sampling effect and back navigation before assertions; no app change','Mouse hover transition caused an action-stability timeout on existing Spaghetti; resumed using actual touch tap input in mobile Chromium context. No force click or app change.'];delete report.failure;}
const norm=x=>x.replace(/\s+/g,' ').trim();
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true});report.browserVersion=browser.version();
 const context=await browser.newContext({viewport:report.viewport,deviceScaleFactor:1,isMobile:true,hasTouch:true,permissions:['clipboard-read','clipboard-write']});
 context.setDefaultTimeout(15000); const page=await context.newPage(); page.on('pageerror',e=>report.errors.push(e.message));
 await page.route('**/*',route=>{const u=new URL(route.request().url());return (u.origin===new URL(base).origin||u.protocol==='data:')?route.continue():route.abort()});
 const retry=l=>l==='ja'?'もう一度診断する':'Try Again';
 async function overflow(label){const r=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));if(r.scroll>r.width)report.overflows.push({label,...r});}
 async function answer(letter){const heading=await page.locator('main h2').textContent();await page.locator('main li button').nth('abcd'.indexOf(letter)).tap();await page.waitForFunction(prev=>document.querySelector('main h2')?.textContent!==prev,heading);}
 async function initial(l,id='pizza'){console.log('initial',l,id);const response=await page.goto(`${base}/${l}/${id}`);assert.equal(response.status(),200);await page.locator('main li button').first().waitFor();for(let i=0;i<8;i++){await overflow(`${l}/${id}/initial/q${i}`);await answer('a')}await page.getByRole('button',{name:retry(l),exact:true}).waitFor();report.routes.push({locale:l,id,eightQuestionCompletion:true});}
 for(const l of ['ja','en']){
  const res=await page.goto(`${base}/${l}`);assert.equal(res.status(),200);await page.getByRole('link',{name:h.home.accessibleLabel[l],exact:true}).waitFor();await overflow(`${l}/Home`);report.routes.push({locale:l,id:'Home',pizzaCard:true});
  await initial(l);
  for(const t of h.quiz.resultTypeIds)for(const [vi,v] of [...'abc'].entries()){
   if(report.sessions.some(s=>s.locale===l&&s.type===t&&s.variation===v))continue;
   const selections=examples[`${t}:${v}`];assert(selections);
   const selected=Object.fromEntries(selections.map(s=>[s.questionId,s.choiceId]));
   const qids=h.quiz.categories.map(cat=>cat.find(q=>selected[q]));assert(qids.every(Boolean));
   const queue=qids.map((q,i)=>(h.quiz.categories[i].indexOf(q)+.1)/4).concat(Array(7).fill(.999),(vi+.1)/3,(vi+.1)/3);
   await page.evaluate(queue=>{window.__pizzaQ=queue;window.__pizzaRandomCalls=[];Math.random=()=>{const v=window.__pizzaQ.length?window.__pizzaQ.shift():.5;window.__pizzaRandomCalls.push(v);return v};},queue);
   await page.getByRole('button',{name:retry(l),exact:true}).tap();
   await page.waitForFunction(expected=>document.querySelector('main h2')?.textContent===expected,h.quiz.questions[qids[0]][l].text);
   for(const [i,q] of qids.entries()){
    assert.equal(await page.locator('main h2').textContent(),h.quiz.questions[q][l].text,`sampling ${l} ${t}:${v} ${i}`);
    assert.deepEqual(await page.locator('main li button').allTextContents(),Object.values(h.quiz.questions[q][l].choices));
    await overflow(`${l}/${t}:${v}/${q}`);
    await answer(selected[q]);
   }
   await page.getByRole('button',{name:retry(l),exact:true}).waitFor();
   const r=h.results[l][t], text=norm(await page.locator('main').innerText());
   for(const paragraph of r.variations[v].body.split('\n\n'))assert(text.includes(norm(paragraph)),`${l}/${t}:${v} paragraph`);
   for(const s of [r.good.reason,r.bad.reason,r.mottos[vi]])assert(text.includes(norm(s)),`${l}/${t}:${v} result text`);
   const svg=page.locator('main svg').filter({has:page.locator('image')});assert.equal(await svg.locator('image').getAttribute('href'),'/characters/'+r.visualKey+'.png');
   const face=await svg.evaluate(svg=>{const g=svg.querySelector(':scope > g'); const b=g.getBoundingClientRect(),s=svg.getBoundingClientRect();return {expression:g.querySelector('[fill="#8ED2F4"]')?'sweat-smile':g.querySelector('circle')?'smile':'noon',transform:g.getAttribute('transform'),bounds:{left:b.left-s.left,top:b.top-s.top,width:b.width,height:b.height},svg:{width:s.width,height:s.height}}});
   assert.equal(face.expression,['smile','sweat-smile','noon'][vi]);assert(face.bounds.left>=0&&face.bounds.top>=0&&face.bounds.left+face.bounds.width<=face.svg.width&&face.bounds.top+face.bounds.height<=face.svg.height);
   report.faces.push({locale:l,type:t,variation:v,...face});await overflow(`${l}/${t}:${v}/result`);
   if(l==='ja'){const file=`${t}-${face.expression}.png`;await svg.screenshot({path:out+'/'+file});report.screenshots.push(file)}
   if(t==='quattroFormaggi'&&v==='c'){await page.screenshot({path:out+`/${l}-result-mobile.png`,fullPage:true});report.screenshots.push(`${l}-result-mobile.png`)}
   // Real Chromium clipboard interaction, no external posting/native-share emulation.
   if(v==='a'){
    await page.getByRole('button',{name:l==='ja'?'結果をシェア':'Share My Result',exact:true}).tap();
    await page.getByRole('button',{name:l==='ja'?'リンクをコピーしました！':'Link copied!',exact:true}).waitFor();
    const copied=await page.evaluate(()=>navigator.clipboard.readText());assert(copied.includes(`${base}/${l}/pizza`));assert(copied.includes(r.displayName));report.share.push({locale:l,type:t,method:'actual browser clipboard',urlCorrect:true,nameCorrect:true});
   }
   report.sessions.push({locale:l,type:t,variation:v,face:face.expression,mottoIndex:vi,questionIds:qids,resultTextMatches:true});console.log('completed',l,t,v);
  }
  console.log('starting back',l);
  // Back/re-answer and retry without a forced sample, preserving real UI flow.
  await page.evaluate(()=>{Math.random=()=>.41});await page.getByRole('button',{name:retry(l),exact:true}).tap();await page.locator('main li button').first().waitFor();
  const order=h.quiz.categories.map(c=>c[1]);for(let i=7;i>0;i--){const j=Math.floor(.41*(i+1));[order[i],order[j]]=[order[j],order[i]];}await page.waitForFunction(text=>document.querySelector('main h2')?.textContent===text,h.quiz.questions[order[0]][l].text);const first=await page.locator('main h2').textContent();await answer('a');console.log('back click',l,first);await page.getByRole('button',{name:l==='ja'?'← 前の質問':'← Previous',exact:true}).tap();await page.waitForFunction(text=>document.querySelector('main h2')?.textContent===text,first);assert.equal(await page.locator('main h2').textContent(),first);await answer('b');for(let n=1;n<8;n++)await answer('a');await page.getByRole('button',{name:retry(l),exact:true}).waitFor();report.backFlow.push({locale:l,backAndChangedAnswer:true});
  for(const id of ['camp-gear','spaghetti','sushi','ice-cream','donut']){if(report.routes.some(r=>r.locale===l&&r.id===id&&r.eightQuestionCompletion))continue;await initial(l,id);await overflow(`${l}/${id}/result`)}
 }
 fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));await browser.close();console.log('BROWSER COMPLETE',report.sessions.length,report.errors.length,report.overflows.length);
})().catch(e=>{report.failure=e.stack;fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));console.error(e);process.exit(1)});
