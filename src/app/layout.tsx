import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth";
import { Shell } from "@/components/shell";
import { PwaKayit } from "@/components/pwa";
import { KisiselDogumGunu } from "@/components/dogum-gunu";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const serif = Lora({ subsets: ["latin", "latin-ext"], variable: "--font-serif", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Yanıcak Köyü Kültür ve Dayanışma Derneği", template: "%s · Yanıcak Köyü" },
  description: "Yanıcak Köyü (Boğazkale / Çorum) Kültür ve Dayanışma Derneği resmi sitesi. Duyurular, köy tarihi, fotoğraflar.",
  appleWebApp: { capable: true, title: "Yanıcak", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#6b4423",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${sans.variable} ${serif.variable} bg-kum antialiased`}>
        <AuthProvider>
          <Shell>{children}</Shell>
          <KisiselDogumGunu />
        </AuthProvider>
        <PwaKayit />
      </body>
    </html>
  );
}
