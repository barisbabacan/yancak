"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth";
import { Avatar } from "@/components/ui";
import { formatDate, maskName } from "@/lib/data";

type Mesaj = { yazan: string; mesaj: string; tarih: string };

export function TaziyeDefteri({ ilk }: { ilk: Mesaj[] }) {
  const { kullanici, rol } = useAuth();
  const [mesajlar, setMesajlar] = useState(ilk);
  const [metin, setMetin] = useState("");

  const gonder = () => {
    if (!metin.trim() || !kullanici) return;
    setMesajlar([...mesajlar, { yazan: kullanici.adSoyad, mesaj: metin.trim(), tarih: new Date().toISOString() }]);
    setMetin("");
  };

  return (
    <section className="mt-6 px-4">
      <h2 className="mb-2 font-serif text-lg font-bold text-toprak">Taziye Defteri ({mesajlar.length})</h2>

      {kullanici ? (
        <div className="mb-3 rounded-2xl bg-white p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {["Allah rahmet eylesin.", "Mekânı cennet olsun.", "Başımız sağ olsun."].map((h) => (
              <button key={h} onClick={() => setMetin(h)} className="rounded-full bg-kum px-2.5 py-1 text-xs">
                {h}
              </button>
            ))}
          </div>
          <textarea
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
            placeholder="Taziye mesajınızı yazın…"
            rows={2}
            className="w-full resize-none rounded-xl border border-kum bg-krem p-2.5 text-[15px] outline-none focus:border-bugday"
          />
          <button onClick={gonder} className="mt-2 w-full rounded-xl bg-stone-800 py-2.5 text-sm font-semibold text-white disabled:opacity-40" disabled={!metin.trim()}>
            Taziye Bırak
          </button>
        </div>
      ) : (
        <div className="mb-3 rounded-2xl bg-kum p-3 text-center text-sm">
          Taziye mesajı bırakmak için <Link href="/giris" className="font-semibold text-altin">üye girişi</Link> yapın.
        </div>
      )}

      <ul className="space-y-2">
        {[...mesajlar].reverse().map((m, i) => (
          <li key={i} className="flex gap-3 rounded-2xl bg-white p-3">
            <Avatar name={m.yazan} size="sm" />
            <div className="min-w-0">
              <div className="text-sm font-semibold">
                {rol === "ziyaretci" ? maskName(m.yazan) : m.yazan} <span className="font-normal text-toprak/50">· {formatDate(m.tarih, { day: "numeric", month: "short" })}</span>
              </div>
              <p className="text-[15px] text-toprak/85">{m.mesaj}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
