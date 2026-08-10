import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { resolveLocale } from "@/lib/locale";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  // Future: read LOCALE_COOKIE_NAME from cookies() and pass as savedLocale.
  const locale = resolveLocale({ acceptLanguage });

  redirect(`/${locale}`);
}
