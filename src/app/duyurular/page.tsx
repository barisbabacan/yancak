"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DUYURULAR, DUYURU_KATEGORILERI, type DuyuruKategori } from "@/lib/data";
import { DuyuruListeSatiri } from "@/components/duyuru";
import { Chip, PageHeader } from "@/components/ui";

function Liste() {
  const params = useSearchParams();
  const [kat, setKat] = useState<DuyuruKategori | "hepsi">((params.get("k") as DuyuruKategori) || "hepsi");
  const liste = DUYURULAR.filter((d) => kat === "hepsi" || d.kategori === kat).sort((a, b) => +new Date(b.tarih) - +new Date(a.tarih)); // en yeni en üstte

  return (
    <>
      <div className="no-scrollbar sticky top-[82px] z-20 flex gap-2 overflow-x-auto bg-krem/95 px-4 py-3 backdrop-blur">
        <Chip active={kat === "hepsi"} onClick={() => setKat("hepsi")}>
          Tümü
        </Chip>
        {DUYURU_KATEGORILERI.map((k) => (
          <Chip key={k.id} active={kat === k.id} onClick={() => setKat(k.id)}>
            {k.ad}
          </Chip>
        ))}
      </div>
      <div className="divide-y divide-toprak/15 px-4">
        {liste.map((d) => (
          <DuyuruListeSatiri key={d.id} d={d} />
        ))}
        {!liste.length && <p className="py-10 text-center text-sm text-toprak/80">Bu kategoride duyuru yok.</p>}
      </div>
    </>
  );
}

export default function DuyurularSayfasi() {
  return (
    <>
      <PageHeader title="Duyurular" subtitle="Köyümüzden ve derneğimizden son gelişmeler" />
      <Suspense>
        <Liste />
      </Suspense>
    </>
  );
}
