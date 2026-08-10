import type { AdPlaceholderSize } from "@/lib/ads/config";

const SIZE_CONFIG: Record<
  AdPlaceholderSize,
  { label: string; width: number; className: string }
> = {
  leaderboard: {
    label: "728×90",
    width: 728,
    className: "h-[90px] max-w-[728px]",
  },
  rectangle: {
    label: "300×250",
    width: 300,
    className: "h-[250px] w-[300px] max-w-full",
  },
  mobile: {
    label: "320×100",
    width: 320,
    className: "h-[100px] w-[320px] max-w-full",
  },
};

type AdPlaceholderProps = {
  size?: AdPlaceholderSize;
  responsive?: boolean;
  className?: string;
};

export function AdPlaceholder({
  size = "rectangle",
  responsive = false,
  className = "",
}: AdPlaceholderProps) {
  if (responsive) {
    return (
      <div className={className}>
        <div className="hidden sm:block">
          <AdPlaceholderFrame size="leaderboard" />
        </div>
        <div className="sm:hidden">
          <AdPlaceholderFrame size="mobile" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <AdPlaceholderFrame size={size} />
    </div>
  );
}

function AdPlaceholderFrame({ size }: { size: AdPlaceholderSize }) {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className="mx-auto flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-3 py-2 text-slate-400"
      role="presentation"
      aria-hidden="true"
      data-ad-placeholder={size}
      style={{ maxWidth: config.width }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Advertisement
      </span>
      <div
        className={`flex items-center justify-center rounded-md border border-slate-200 bg-white/70 ${config.className}`}
      >
        <span className="text-xs font-medium text-slate-400">Ad Preview</span>
      </div>
    </div>
  );
}
