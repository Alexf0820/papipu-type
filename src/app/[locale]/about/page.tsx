import { createStaticPage } from "@/lib/legal/createStaticPage";

const { generateMetadata, Page } = createStaticPage("about");

export { generateMetadata };
export default Page;
