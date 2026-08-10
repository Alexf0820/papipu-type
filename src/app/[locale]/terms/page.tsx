import { createStaticPage } from "@/lib/legal/createStaticPage";

const { generateMetadata, Page } = createStaticPage("terms");

export { generateMetadata };
export default Page;
