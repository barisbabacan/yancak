"use client";

import { useState } from "react";
import { MapPin, Phone, Plus, Search } from "lucide-react";
import { ESNAF } from "@/lib/data";
import { Chip, PageHeader, UyeKapisi } from "@/components/ui";

export default function EsnafSayfasi() {
  const [ara, setAra] = useState("");
  const [sektor, setSektor] = useState("hepsi");
  const sektorler = Array.from(new Set(ESNAF.map((e) => e.sektor)));
  const liste = ESNAF.filter(
    (e) => (sektor === "hepsi" || e.sektor === sektor) && (e.isletme + e.aciklama + e.konum).toLocaleLowerCase("tr").includes(ara.toLocaleLowerCase("tr"))
  );

  return (
    <>
      <PageHeader title="Esnaflarımız" subtitle="Hemşehrimizden alışveriş, hemşehrimize destek" />
      <UyeKapisi>
        <div className="px-4 lg:max-w-xl">
          <label className="flex items-center gap-2 rounded-full border border-toprak/15 bg-white px-4 py-2.5">
            <Search className="size-4 text-toprak/80" />
            <input value={ara} onChange={(e) => setAra(e.target.value)} placeholder="İşletme, hizmet veya şehir ara…" className="flex-1 bg-transparent text-[15px] outline-none" />
          </label>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          <Chip active={sektor === "hepsi"} onClick={() => setSektor("hepsi")}>
            Tümü
          </Chip>
          {sektorler.map((s) => (
            <Chip key={s} active={sektor === s} onClick={() => setSektor(s)}>
              {s}
            </Chip>
          ))}
        </div>
        <div className="space-y-5 px-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-3">
          {liste.map((e) => (
            <div key={e.id} className="overflow-hidden rounded-3xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.foto} alt="" className="h-32 w-full object-cover" />
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold">{e.isletme}</div>
                    <div className="text-xs text-toprak/80">{e.sahibi}</div>
                  </div>
                  <span className="rounded-full bg-kum px-2 py-0.5 text-[12px] font-semibold text-toprak">{e.sektor}</span>
                </div>
                <p className="mt-1.5 text-sm text-toprak/80">{e.aciklama}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-toprak/80">
                  <MapPin className="size-3.5" /> {e.konum}
                </div>
                <a href={`tel:${e.telefon.replace(/\D/g, "")}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-toprak py-2.5 text-sm font-semibold text-krem">
                  <Phone className="size-4" /> Ara
                </a>
              </div>
            </div>
          ))}
        </div>
        <button className="mx-4 mt-6 flex w-[calc(100%-2rem)] lg:mx-auto lg:w-80 items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-bugday py-4 text-sm font-semibold text-toprak">
          <Plus className="size-4" /> İşyerimi ekle
        </button>
      </UyeKapisi>
    </>
  );
}
