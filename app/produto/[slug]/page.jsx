import { notFound } from "next/navigation";

import ProductLanding from "./ProductLanding";
import { getProduct, productOrder } from "../data";

export function generateStaticParams() {
  return productOrder.map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Rafael Fossalussa`,
    description: product.summary,
    openGraph: {
      title: `${product.name} | Rafael Fossalussa`,
      description: product.summary,
      images: [{ url: product.image }],
      type: "website",
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return <ProductLanding product={product} />;
}

