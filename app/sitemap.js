import { productOrder } from "./produto/data";

const BASE_URL = "https://rafaelfossalussa.com";

export default function sitemap() {
  const routes = ["", "/cursos", "/privacidade", "/cookies"];
  const productRoutes = productOrder.map((slug) => `/produto/${slug}`);

  return [...routes, ...productRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/produto/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/cursos" ? 0.9 : 0.7,
  }));
}
