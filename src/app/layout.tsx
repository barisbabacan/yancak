import type { Metadata, Viewport } from "next";
// Yazı tipleri projeyle birlikte paketlenir; derlemede Google Fonts'a bağlanılmaz.
import "@fontsource-variable/inter";
import "@fontsource-variable/lora";
import "./globals.css";
import { AuthProvider } from "@/components/auth";
import { Shell } from "@/components/shell";
import { PwaKayit } from "@/components/pwa";
import { KisiselDogumGunu } from "@/components/dogum-gunu";


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
      <body className="bg-kum antialiased">
        <AuthProvider>
          <Shell>{children}</Shell>
          <KisiselDogumGunu />
        </AuthProvider>
        <PwaKayit />
      </body>
    </html>
  );
}
