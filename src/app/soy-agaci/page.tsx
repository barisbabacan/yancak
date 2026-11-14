"use client";

import { useState } from "react";
import { SULALELER, UYELER, type AileDugum } from "@/lib/data";
import { Chip, PageHeader, UyeKapisi } from "@/components/ui";

function Dugum({ d, kok }: { d: AileDugum; kok?: boolean }) {
  const [acik, setAcik] = useState(true);
  const cocukVar = !!d.cocuklar?.length;
  const sehit = d.ad.startsWith("Şehit");
  return (
    <li className={kok ? "" : "relative pl-5 before:absolute before:top-0 before:left-0 before:h-full before:border-l-2 before:border-bugday/40 last:before:h-5 after:absolute after:top-5 after:left-0 after:w-4 after:border-t-2 after:border-bugday/40"}>
      <button
        onClick={() => cocukVar && setAcik(!acik)}
        className={`my-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left ${kok ? "bg-toprak text-krem" : sehit ? "bg-red-50 ring-1 ring-red-200" : "bg-white"}`}
      >
        <span className="flex-1">
          <span className="block text-[15px] font-semibold">{d.ad}</span>
          {d.not && <span className={`text-xs ${kok ? "text-krem/70" : "text-toprak/55"}`}>{d.not}</span>}
        </span>
        {cocukVar && <span className={`text-xs ${kok ? "text-krem/70" : "text-toprak/50"}`}>{acik ? "▾" : `▸ ${d.cocuklar!.length}`}</span>}
      </button>
      {cocukVar && acik && (
        <ul className="ml-2">
          {d.cocuklar!.map((c) => (
            <Dugum key={c.ad} d={c} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function SoyAgaciSayfasi() {
  const [secili, setSecili] = useState(SULALELER[0].id);
  const s = SULALELER.find((x) => x.id === secili)!;
  const uyeSayisi = UYELER.filter((u) => u.sulale === s.ad).length;

  return (
    <>
      <PageHeader title="Sülaleler & Soy Ağacı" subtitle="Hangi aile kimden geliyor?" />
      <UyeKapisi>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2">
          {SULALELER.map((x) => (
            <Chip key={x.id} active={secili === x.id} onClick={() => setSecili(x.id)}>
              {x.ad}
            </Chip>
          ))}
        </div>
        <div className="mx-4 mt-2 rounded-2xl bg-kum p-4">
          <div className="font-serif text-xl font-bold text-toprak">{s.ad}</div>
          <div className="text-sm text-altin">Lakap: &ldquo;{s.lakap}&rdquo; · {uyeSayisi} kayıtlı üye</div>
          <p className="mt-1 text-sm text-toprak/75">{s.aciklama}</p>
        </div>
        <ul className="mx-4 mt-3">
          <Dugum d={s.agac} kok />
        </ul>
        <div className="mx-4 mt-4 rounded-2xl border border-dashed border-bugday p-4 text-center text-sm text-toprak/75">
          Eksik ya da yanlış bilgi mi var?
          <button className="mt-2 block w-full rounded-xl bg-toprak py-2.5 font-semibold text-krem">Düzeltme / Ekleme Öner</button>
          <span className="mt-1 block text-xs text-toprak/50">Önerileriniz yönetim onayından sonra ağaca eklenir.</span>
        </div>
      </UyeKapisi>
    </>
  );
}
