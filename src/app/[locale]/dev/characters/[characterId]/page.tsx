import Link from "next/link";
import { notFound } from "next/navigation";

import { CharacterDevPreview } from "@/components/dev/CharacterDevPreview";
import {
  DEV_CHARACTER_IDS,
  DEV_CHARACTERS,
  getDevCharacter,
  isDevPreviewEnabled,
} from "@/lib/dev/characters";
import { isValidLocale, LOCALES } from "@/lib/locale";

export function generateStaticParams() {
  if (!isDevPreviewEnabled()) {
    return [];
  }

  return LOCALES.flatMap((locale) =>
    DEV_CHARACTER_IDS.map((characterId) => ({ locale, characterId })),
  );
}

export default async function DevCharacterDetailPage({
  params,
}: PageProps<"/[locale]/dev/characters/[characterId]">) {
  if (!isDevPreviewEnabled()) {
    notFound();
  }

  const { locale, characterId } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const character = getDevCharacter(characterId);

  if (!character) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
      <main className="space-y-6">
        <Link
          href={`/${locale}/dev/characters`}
          className="inline-block text-sm font-medium text-pink-500 hover:underline"
        >
          ← Character list
        </Link>

        <CharacterDevPreview
          visualKey={character.visualKey}
          label={character.id}
          size="detail"
        />

        <nav className="flex flex-wrap gap-2 border-t border-pink-100 pt-4">
          {DEV_CHARACTERS.map((entry) => (
            <Link
              key={entry.id}
              href={`/${locale}/dev/characters/${entry.id}`}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                entry.id === character.id
                  ? "bg-[#FF4785] text-white"
                  : "bg-white text-slate-600 ring-1 ring-pink-100 hover:bg-pink-50"
              }`}
            >
              {entry.id}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
