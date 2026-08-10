import type { Metadata } from "next";

import { PARENT_PROJECT_NAME } from "@/lib/brand/labels";
import type { Locale } from "@/lib/locale";

export const STATIC_PAGE_IDS = ["about", "privacy", "terms", "contact"] as const;

export type StaticPageId = (typeof STATIC_PAGE_IDS)[number];

type StaticPageSection = {
  heading?: string;
  paragraphs: readonly string[];
};

type StaticPageCopy = {
  title: string;
  sections: readonly StaticPageSection[];
  /** Shown on the contact page only. */
  contactSiteLabel?: string;
};

export const STATIC_PAGE_LABELS: Record<
  Locale,
  Record<StaticPageId, string>
> = {
  ja: {
    about: "About",
    privacy: "プライバシー",
    terms: "利用規約",
    contact: "お問い合わせ",
  },
  en: {
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
};

const STATIC_PAGE_CONTENT: Record<
  Locale,
  Record<StaticPageId, StaticPageCopy>
> = {
  ja: {
    about: {
      title: "About Papipu Type",
      sections: [
        {
          paragraphs: [
            "Papipu Type は Project PapipupePopcorn の一部です。",
            "いろんなモノにたとえて、あなたのタイプをゆるく診断するサービスです。",
            "診断結果は娯楽目的のものであり、実在の制度・人物・団体とは関係ありません。",
          ],
        },
      ],
    },
    privacy: {
      title: "プライバシーポリシー",
      sections: [
        {
          heading: "アクセス解析",
          paragraphs: [
            "当サイトでは Google Analytics 4（GA4）を使用しています。",
            "ページ閲覧やクリック種別など、匿名の操作情報を計測します。",
            "名前、診断回答、結果本文などの個人情報・入力内容は GA4 に送信しません。",
          ],
        },
        {
          heading: "Cookie 等",
          paragraphs: [
            "当サイトでは、サービス提供や利用状況の把握のため、Cookie 等の技術を利用する場合があります。",
            "将来、広告配信を行う可能性があります。その場合も、本ポリシーの範囲内で取り扱います。",
          ],
        },
        {
          heading: "お問い合わせ",
          paragraphs: [
            "お問い合わせいただいた内容は、返信および対応の目的にのみ利用します。",
          ],
        },
      ],
    },
    terms: {
      title: "利用規約",
      sections: [
        {
          paragraphs: [
            "Papipu Type は娯楽目的のサービスです。",
            "診断結果の正確性、適法性、特定目的への適合性について、当方は保証しません。",
            "診断結果の利用は、ユーザー自身の責任において行ってください。",
            "誹謗中傷、違法行為、他者の権利侵害を目的とした利用は禁止します。",
            "サービス内容は、予告なく変更または停止する場合があります。",
          ],
        },
      ],
    },
    contact: {
      title: "お問い合わせ",
      contactSiteLabel: `${PARENT_PROJECT_NAME} お問い合わせページ`,
      sections: [
        {
          paragraphs: [
            "お問い合わせ・ご意見・ご感想は、Project PapipupePopcorn のお問い合わせページよりご連絡ください。",
            "内容を確認のうえ、必要に応じて対応いたします。",
          ],
        },
      ],
    },
  },
  en: {
    about: {
      title: "About Papipu Type",
      sections: [
        {
          paragraphs: [
            "Papipu Type is part of Project PapipupePopcorn.",
            "A lighthearted service that discovers your type through everyday things.",
            "Results are for entertainment only and are not related to real institutions, people, or organizations.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Analytics",
          paragraphs: [
            "We use Google Analytics 4 (GA4).",
            "We measure anonymous usage information such as page views and click types.",
            "We do not send personal information, quiz answers, or result text to GA4.",
          ],
        },
        {
          heading: "Cookies & ads",
          paragraphs: [
            "We may use cookies and similar technologies to operate the service and understand usage.",
            "We may serve ads in the future. If we do, we will handle data within the scope of this policy.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Information you send when contacting us is used only to respond and assist you.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      sections: [
        {
          paragraphs: [
            "Papipu Type is an entertainment service.",
            "We do not guarantee the accuracy, legality, or fitness of quiz results for any particular purpose.",
            "You use quiz results at your own responsibility.",
            "Do not use the service for defamation, illegal activity, or infringing others' rights.",
            "We may change or discontinue the service without notice.",
          ],
        },
      ],
    },
    contact: {
      title: "Contact",
      contactSiteLabel: `${PARENT_PROJECT_NAME} contact page`,
      sections: [
        {
          paragraphs: [
            "For inquiries, feedback, or comments, please contact us through the Project PapipupePopcorn contact page.",
            "We will review messages and respond when necessary.",
          ],
        },
      ],
    },
  },
};

export function getStaticPagePath(pageId: StaticPageId): string {
  return `/${pageId}`;
}

export function getStaticPageCopy(
  locale: Locale,
  pageId: StaticPageId,
): StaticPageCopy {
  return STATIC_PAGE_CONTENT[locale][pageId];
}

export function createStaticPageMetadata(
  locale: Locale,
  pageId: StaticPageId,
): Metadata {
  const copy = getStaticPageCopy(locale, pageId);

  return {
    title: copy.title,
    description: copy.sections[0]?.paragraphs[0],
  };
}
