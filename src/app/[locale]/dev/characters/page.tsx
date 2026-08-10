import { notFound } from "next/navigation";

import { CharacterDevPreview } from "@/components/dev/CharacterDevPreview";
import { DEV_CHARACTERS, isDevPreviewEnabled } from "@/lib/dev/characters";
import { isValidLocale, LOCALES } from "@/lib/locale";

export function generateStaticParams() {
  if (!isDevPreviewEnabled()) {
    return [];
  }

  return LOCALES.map((locale) => ({ locale }));
}

export default async function DevCharactersPage({
  params,
}: PageProps<"/[locale]/dev/characters">) {
  if (!isDevPreviewEnabled()) {
    notFound();
  }

  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <main className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
            Character preview
          </h1>
          <p className="text-sm text-slate-500">
            Development only — not linked from site navigation.
          </p>
        </header>

        <div className="space-y-6">
          {DEV_CHARACTERS.map((character) => (
            <CharacterDevPreview
              key={character.id}
              visualKey={character.visualKey}
              label={character.id}
              detailHref={`/${locale}/dev/characters/${character.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
