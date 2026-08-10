import { createStaticPage } from "@/lib/legal/createStaticPage";

const { generateMetadata, Page } = createStaticPage("privacy");

export { generateMetadata };
export default Page;
