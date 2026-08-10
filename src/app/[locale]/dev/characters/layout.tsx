import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character preview (dev)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevCharactersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
