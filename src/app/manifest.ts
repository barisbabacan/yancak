import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yanıcak Köyü Kültür ve Dayanışma Derneği",
    short_name: "Yanıcak",
    description: "Yanıcak Köyü derneği: duyurular, köy tarihi, fotoğraflar.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf6ec",
    theme_color: "#6b4423",
    lang: "tr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
