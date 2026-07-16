import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Rafael Fossalussa — Trader profissional e educador",
  description:
    "De vendedor de verdura a trader profissional. Sala ao vivo: índice, dólar e o mercado global. Método, disciplina e leitura de verdade.",
  openGraph: {
    title: "Rafael Fossalussa — Trader profissional e educador",
    description:
      "De vendedor de verdura a trader profissional. Sala ao vivo: índice, dólar e o mercado global. Método, disciplina e leitura de verdade.",
    url: "https://salarafafossalussa.teksolutions.io",
    type: "website",
    images: [
      {
        url: "https://salarafafossalussa.teksolutions.io/rafa_preview.png",
        width: 1200,
        height: 630,
        alt: "Rafael Fossalussa - Trader profissional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Fossalussa — Trader profissional e educador",
    description:
      "De vendedor de verdura a trader profissional. Sala ao vivo: índice, dólar e o mercado global.",
    image: "https://salarafafossalussa.teksolutions.io/rafa_preview.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
