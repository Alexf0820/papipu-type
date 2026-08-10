import { SiteHeader } from "@/components/SiteHeader";
import { PARENT_PROJECT_CONTACT_URL } from "@/lib/brand/externalUrls";
import {
  getStaticPageCopy,
  getStaticPagePath,
  type StaticPageId,
} from "@/lib/legal/staticPages";
import type { Locale } from "@/lib/locale";

type StaticPageViewProps = {
  locale: Locale;
  pageId: StaticPageId;
};

export function StaticPageView({ locale, pageId }: StaticPageViewProps) {
  const copy = getStaticPageCopy(locale, pageId);

  return (
    <>
      <SiteHeader locale={locale} path={getStaticPagePath(pageId)} />
      <main>
        <article className="space-y-6 rounded-3xl bg-white/95 p-5 shadow-lg ring-1 ring-pink-100 sm:p-8">
          <h1 className="text-center text-2xl font-extrabold text-slate-800">
            {copy.title}
          </h1>
          <div className="space-y-6 text-sm leading-relaxed text-slate-700">
            {copy.sections.map((section) => (
              <section key={section.heading ?? section.paragraphs[0]} className="space-y-3">
                {section.heading ? (
                  <h2 className="text-base font-bold text-slate-800">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            {pageId === "contact" && copy.contactSiteLabel ? (
              <p>
                <a
                  href={PARENT_PROJECT_CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange-500 transition hover:text-orange-600 hover:underline"
                >
                  {copy.contactSiteLabel}
                </a>
              </p>
            ) : null}
          </div>
        </article>
      </main>
    </>
  );
}
