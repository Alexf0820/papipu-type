export function HomePageDecorations() {
  const items = [
    { className: "left-[4%] top-[12%] text-sm text-amber-200", content: "✦" },
    { className: "right-[8%] top-[8%] text-base text-yellow-300", content: "★" },
    {
      className: "left-[14%] top-[30%] h-2 w-2 rounded-full bg-pink-300",
      content: null,
    },
    {
      className: "right-[18%] top-[24%] h-2.5 w-2.5 rounded-full bg-teal-200",
      content: null,
    },
    {
      className: "left-[10%] top-[52%] h-2.5 w-2.5 rotate-45 bg-purple-200",
      content: null,
    },
    { className: "right-[6%] top-[44%] text-sm text-pink-200", content: "✦" },
    {
      className: "right-[12%] bottom-[30%] h-2.5 w-2.5 rounded-full bg-green-200",
      content: null,
    },
    {
      className: "left-[42%] top-[5%] h-2 w-2 rotate-12 bg-yellow-200",
      content: null,
    },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {items.map((item, index) => (
        <span
          key={`deco-${index}`}
          className={`absolute opacity-30 ${item.className}`}
        >
          {item.content}
        </span>
      ))}
    </div>
  );
}
