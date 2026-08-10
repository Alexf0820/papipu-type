import Image from "next/image";

const TYPE_MASCOT_SRC = "/images/type-mascot.png";
const MASCOT_WIDTH = 928;
const MASCOT_HEIGHT = 1066;

const MASCOT_CLASS =
  "mx-auto block h-auto w-full max-w-[160px] object-contain lg:max-w-[280px] lg:max-h-[300px]";

export function HomeHeroVisual() {
  return (
    <div className="flex justify-center px-2 lg:px-0" aria-hidden="true">
      <Image
        src={TYPE_MASCOT_SRC}
        alt=""
        width={MASCOT_WIDTH}
        height={MASCOT_HEIGHT}
        priority
        sizes="(min-width: 1024px) 280px, 160px"
        className={MASCOT_CLASS}
      />
    </div>
  );
}
