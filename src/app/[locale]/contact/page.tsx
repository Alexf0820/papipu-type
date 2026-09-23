import { notFound } from "next/navigation";
import { ContactPage } from "@/components/contact-hub/contact-page";
import { createStaticPage } from "@/lib/legal/createStaticPage";
export const { generateMetadata } = createStaticPage("contact");
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params;
 if (locale !== "ja" && locale !== "en") notFound();
 return <ContactPage english={locale === "en"} home={"/" + locale} />;
}
