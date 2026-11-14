"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Check, Copy, HeartHandshake } from "lucide-react";
import { BAGISLAR, DERNEK, KASA, KASA_BAKIYE, formatDate, formatTL } from "@/lib/data";
import { Chip, PageHeader, SectionTitle, UyeKapisi } from "@/components/ui";

export default function KasaSayfasi() {
  return (
    <>
      <PageHeader title="Kasa & Bağışlar" subtitle="Derneğimizin gelir-gider durumu — şeffaflık için" />
      <UyeKapisi>
        <Icerik />
      </UyeKapisi>
    </>
  );
}

function Icerik() {
  const [filtre, setFiltre] = useState<"hepsi" | "gelir" | "gider">("hepsi");
  const gelir = KASA.filter((k) => k.tur === "gelir").reduce((a, b) => a + b.tutar, 0);
  const gider = KASA.filter((k) => k.tur === "gider").reduce((a, b) => a + b.tutar, 0);
  const liste = KASA.filter((k) => filtre === "hepsi" || k.tur === filtre);

  return (
    <div className="space-y-6">
      <section className="mx-4 rounded-3xl bg-gradient-to-br from-toprak to-koyu p-5 text-krem shadow-lg">
        <div className="text-sm text-krem/70">Kasadaki güncel tutar</div>
        <div className="mt-1 font-serif text-4xl font-bold">{formatTL(KASA_BAKIYE)}</div>
        <div className="mt-1 text-xs text-krem/60">Son güncelleme: {formatDate(KASA[0].tarih)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="flex items-center gap-1 text-xs text-emerald-300">
              <ArrowDownLeft className="size-3.5" /> Son 30 gün gelir
            </div>
            <div className="mt-0.5 text-lg font-bold">{formatTL(gelir)}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="flex items-center gap-1 text-xs text-orange-300">
              <ArrowUpRight className="size-3.5" /> Son 30 gün gider
            </div>
            <div className="mt-0.5 text-lg font-bold">{formatTL(gider)}</div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Bağış & Aidat Hesaplarımız</SectionTitle>
        <div className="space-y-2 px-4">
          {DERNEK.iban.map((h) => (
            <IbanKart key={h.iban} {...h} />
          ))}
          <p className="px-1 text-xs text-toprak/60">
            Açıklamaya adınızı ve &ldquo;bağış&rdquo; / &ldquo;aidat&rdquo; yazmayı unutmayın. İsminizin listede görünmesini istemiyorsanız &ldquo;anonim&rdquo; yazın.
          </p>
        </div>
      </section>

      <section>
        <SectionTitle>Hareketler</SectionTitle>
        <div className="flex gap-2 px-4 pb-2">
          {(["hepsi", "gelir", "gider"] as const).map((f) => (
            <Chip key={f} active={filtre === f} onClick={() => setFiltre(f)}>
              {f === "hepsi" ? "Tümü" : f === "gelir" ? "Gelirler" : "Giderler"}
            </Chip>
          ))}
        </div>
        <ul className="mx-4 divide-y divide-kum overflow-hidden rounded-2xl bg-white">
          {liste.map((k) => (
            <li key={k.id} className="flex items-center gap-3 p-3">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${k.tur === "gelir" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}`}>
                {k.tur === "gelir" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14.5px] font-medium">{k.aciklama}</div>
                <div className="text-xs text-toprak/55">
                  {k.kategori} · {formatDate(k.tarih, { day: "numeric", month: "short" })}
                </div>
              </div>
              <div className={`text-[15px] font-semibold ${k.tur === "gelir" ? "text-emerald-700" : "text-orange-700"}`}>
                {k.tur === "gelir" ? "+" : "−"}
                {formatTL(k.tutar)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Bağış Yapanlar</SectionTitle>
        <ul className="mx-4 divide-y divide-kum overflow-hidden rounded-2xl bg-white">
          {BAGISLAR.map((b, i) => (
            <li key={i} className="flex items-center gap-3 p-3">
              <HeartHandshake className="size-5 text-altin" />
              <div className="flex-1">
                <div className="text-[14.5px] font-medium">{b.anonim ? <span className="text-toprak/60 italic">İsmini vermek istemeyen hayırsever</span> : b.ad}</div>
                <div className="text-xs text-toprak/55">
                  {b.amac} · {formatDate(b.tarih, { day: "numeric", month: "short" })}
                </div>
              </div>
              <div className="font-semibold">{formatTL(b.tutar)}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function IbanKart({ banka, alici, iban }: { banka: string; alici: string; iban: string }) {
  const [kopyalandi, setKopyalandi] = useState(false);
  return (
    <div className="rounded-2xl bg-white p-3.5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{banka}</div>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(iban.replace(/\s/g, ""));
            setKopyalandi(true);
            setTimeout(() => setKopyalandi(false), 1800);
          }}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${kopyalandi ? "bg-emerald-600 text-white" : "bg-toprak text-krem"}`}
        >
          {kopyalandi ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {kopyalandi ? "Kopyalandı" : "IBAN Kopyala"}
        </button>
      </div>
      <div className="mt-1.5 font-mono text-[14px] tracking-wide">{iban}</div>
      <div className="text-xs text-toprak/55">{alici}</div>
    </div>
  );
}
