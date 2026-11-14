"use client";

import { FOTOLAR } from "@/lib/data";
import { PageHeader, UyeKapisi } from "@/components/ui";
import { GaleriIzgara, YuklemeButonu } from "@/components/galeri";

export default function ArsivSayfasi() {
  return (
    <>
      <PageHeader title="Eski Fotoğraf & Video Arşivi" subtitle="Köyümüzün az bulunan, eski kareleri — fotoğraftakileri tanıyorsanız yazın!" back="/galeri" />
      <UyeKapisi>
        <GaleriIzgara fotolar={FOTOLAR.filter((f) => f.arsiv)} sepia />
        <YuklemeButonu arsiv />
      </UyeKapisi>
    </>
  );
}
