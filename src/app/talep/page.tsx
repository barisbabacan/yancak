"use client";

import { useState } from "react";
import { EyeOff } from "lucide-react";
import { TALEPLER, formatDate } from "@/lib/data";
import { PageHeader, UyeKapisi } from "@/components/ui";
import { Alan } from "@/components/galeri";

const TURLER = ["Dilek", "İstek", "Şikayet", "Öneri"];

export default function TalepSayfasi() {
  const [tur, setTur] = useState("Dilek");
  const [anonim, setAnonim] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);

  return (
    <>
      <PageHeader title="Dilek, İstek, Şikayet" subtitle="Yönetimimize doğrudan ulaşın" />
      <UyeKapisi>
        {gonderildi ? (
          <div className="mx-4 rounded-3xl bg-white p-8 text-center">
            <div className="text-5xl">📨</div>
            <div className="mt-3 font-serif text-xl font-bold text-toprak">Mesajınız yönetime iletildi</div>
            <p className="mt-1 text-sm text-toprak/70">
              {anonim ? "Mesajınız anonim olarak iletildi." : "Yönetimin cevabını aşağıdaki listeden takip edebilirsiniz."}
            </p>
            <button onClick={() => setGonderildi(false)} className="mt-4 rounded-full bg-kum px-5 py-2 text-sm font-semibold">
              Yeni mesaj
            </button>
          </div>
        ) : (
          <form
            className="mx-4 space-y-3 rounded-3xl bg-white p-4"
            onSubmit={(e) => {
              e.preventDefault();
              setGonderildi(true);
            }}
          >
            <div className="grid grid-cols-4 gap-1 rounded-xl bg-kum p-1 text-sm">
              {TURLER.map((t) => (
                <button type="button" key={t} onClick={() => setTur(t)} className={`rounded-lg py-2 ${tur === t ? "bg-white font-semibold shadow-sm" : ""}`}>
                  {t}
                </button>
              ))}
            </div>
            <Alan etiket="Konu" placeholder="Kısaca konu" />
            <Alan etiket="Mesajınız" placeholder="Yönetime iletmek istediğinizi yazın…" textarea />
            <label className="flex items-center gap-3 rounded-xl bg-krem p-3">
              <input type="checkbox" checked={anonim} onChange={(e) => setAnonim(e.target.checked)} className="size-5 accent-toprak" />
              <span className="flex-1 text-sm">
                <span className="flex items-center gap-1 font-semibold">
                  <EyeOff className="size-4" /> Anonim gönder
                </span>
                <span className="text-xs text-toprak/60">Yönetim adınızı görmez.</span>
              </span>
            </label>
            <button className="w-full rounded-xl bg-toprak py-3 font-semibold text-krem">Gönder</button>
          </form>
        )}

        <h2 className="mx-4 mt-6 mb-2 font-serif text-lg font-bold text-toprak">Gönderdiklerim</h2>
        <ul className="space-y-2 px-4">
          {TALEPLER.map((t) => (
            <li key={t.id} className="rounded-2xl bg-white p-3.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-kum px-2 py-0.5 font-semibold">{t.tur}</span>
                {t.anonim && <span className="text-toprak/50">Anonim</span>}
                <span className={`ml-auto rounded-full px-2 py-0.5 font-semibold ${t.durum === "Yeni" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{t.durum}</span>
              </div>
              <div className="mt-1.5 font-semibold">{t.konu}</div>
              <p className="text-sm text-toprak/75">{t.mesaj}</p>
              {t.cevap && (
                <div className="mt-2 rounded-xl bg-krem p-2.5 text-sm">
                  <span className="font-semibold text-toprak">Yönetim: </span>
                  {t.cevap}
                </div>
              )}
              <div className="mt-1 text-[11px] text-toprak/45">{formatDate(t.tarih)}</div>
            </li>
          ))}
        </ul>
      </UyeKapisi>
    </>
  );
}
