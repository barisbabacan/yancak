"use client";

import Link from "next/link";
import { Archive, ChevronRight, Lock } from "lucide-react";
import { FOTOLAR } from "@/lib/data";
import { PageHeader } from "@/components/ui";
import { GaleriIzgara, YuklemeButonu } from "@/components/galeri";
import { useAuth } from "@/components/auth";

export default function GaleriSayfasi() {
  const { rol } = useAuth();
  return (
    <>
      <PageHeader title="Fotoğraf Galerisi" subtitle="Etkinliklerimiz ve köyü ziyaret edenlerin objektifinden" />
      <Link href="/arsiv" className="mx-4 mb-1 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-toprak to-koyu p-3.5 text-krem">
        <Archive className="size-6 text-bugday" />
        <div className="flex-1">
          <div className="font-semibold">Eski Fotoğraf & Video Arşivi</div>
          <div className="text-xs text-krem/70">Köyün az bulunan, eski kareleri</div>
        </div>
        {rol === "ziyaretci" ? <Lock className="size-4 text-krem/60" /> : <ChevronRight className="size-5" />}
      </Link>
      <GaleriIzgara fotolar={FOTOLAR.filter((f) => !f.arsiv)} />
      <YuklemeButonu />
    </>
  );
}
