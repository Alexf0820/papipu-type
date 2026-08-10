import { CharacterFace } from "@/components/character/CharacterFace";
import type { FaceExpression } from "@/components/character/types";
import { getVisual } from "@/lib/visual/registry";

type CharacterVisualProps = {
  visualKey: string;
  expression: FaceExpression;
  className?: string;
};

export function CharacterVisual({
  visualKey,
  expression,
  className,
}: CharacterVisualProps) {
  const visual = getVisual(visualKey);

  if (!visual) {
    return null;
  }

  const { Body } = visual;

  return (
    <div
      className={`mx-auto aspect-square w-full max-w-[280px] sm:max-w-[320px] ${className ?? ""}`}
    >
      <Body face={<CharacterFace expression={expression} />} />
    </div>
  );
}
