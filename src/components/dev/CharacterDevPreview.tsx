import Link from "next/link";

import { CharacterVisual } from "@/components/character/CharacterVisual";
import { FACE_EXPRESSIONS } from "@/components/character/types";

type CharacterDevPreviewProps = {
  visualKey: string;
  label: string;
  size?: "list" | "detail";
  detailHref?: string;
};

const SIZE_CLASS = {
  list: "max-w-[120px] sm:max-w-[140px]",
  detail: "max-w-[240px] sm:max-w-[320px]",
} as const;

export function CharacterDevPreview({
  visualKey,
  label,
  size = "list",
  detailHref,
}: CharacterDevPreviewProps) {
  const titleClass =
    size === "detail"
      ? "text-xl font-extrabold text-slate-800 sm:text-2xl"
      : "text-base font-bold text-slate-800 sm:text-lg";

  return (
    <section className="space-y-3 rounded-2xl bg-white px-4 py-5 ring-1 ring-pink-100">
      {detailHref ? (
        <h2 className={titleClass}>
          <Link
            href={detailHref}
            className="text-[#FF4785] transition hover:underline"
          >
            {label}
          </Link>
        </h2>
      ) : (
        <h2 className={titleClass}>{label}</h2>
      )}
      <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
        {FACE_EXPRESSIONS.map((expression) => (
          <figure
            key={expression}
            className="flex w-[33%] min-w-[100px] max-w-[140px] flex-col items-center gap-2 sm:max-w-none sm:flex-1"
          >
            <CharacterVisual
              visualKey={visualKey}
              expression={expression}
              className={SIZE_CLASS[size]}
            />
            <figcaption className="text-center text-xs font-semibold text-slate-500">
              {expression}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
