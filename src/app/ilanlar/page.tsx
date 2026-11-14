"use client";

import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { ILANLAR, ILAN_TURLERI, formatDate } from "@/lib/data";
import { Chip, PageHeader, UyeKapisi } from "@/components/ui";

const RENK: Record<string, string> = {
  Satılık: "bg-emerald-100 text-emerald-800",
  Kiralık: "bg-sky-100 text-sky-800",
  İş: "bg-amber-100 text-amber-800",
  "Kayıp-Buluntu": "bg-red-100 text-red-800",
  Diğer: "bg-stone-100 text-stone-700",
};

export default function IlanlarSayfasi() {
  const [tur, setTur] = useState("hepsi");
  const liste = ILANLAR.filter((i) => tur === "hepsi" || i.tur === tur);
  return (
    <>
      <PageHeader title="İlan Panosu" subtitle="Satılık tarla, iş ilanı, kayıp-buluntu…" />
      <UyeKapisi>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-1 pb-4">
          <Chip active={tur === "hepsi"} onClick={() => setTur("hepsi")}>
            Tümü
          </Chip>
          {ILAN_TURLERI.map((t) => (
            <Chip key={t} active={tur === t} onClick={() => setTur(t)}>
              {t}
            </Chip>
          ))}
        </div>
        <div className="space-y-4 px-4 pt-2 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-3">
          {liste.map((i) => (
            <div key={i.id} className="rounded-3xl bg-white p-3.5">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${RENK[i.tur]}`}>{i.tur}</span>
                <span className="ml-auto text-xs text-toprak/80">{formatDate(i.tarih, { day: "numeric", month: "short" })}</span>
              </div>
              <div className="mt-1.5 font-semibold">{i.baslik}</div>
              <p className="text-sm text-toprak/75">{i.aciklama}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-toprak/80">
                  {i.veren}
                  {i.fiyat && <span className="ml-2 font-semibold text-toprak">{i.fiyat}</span>}
                </div>
                <button className="flex items-center gap-1 rounded-full bg-kum px-3 py-1.5 text-xs font-semibold">
                  <MessageCircle className="size-3.5" /> İletişim
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="fixed right-4 bottom-28 z-30 flex items-center gap-2 rounded-full bg-gunbatimi px-4 py-3 font-semibold text-white shadow-lg lg:right-10 lg:bottom-10">
          <Plus className="size-5" /> İlan Ver
        </button>
      </UyeKapisi>
    </>
  );
}
