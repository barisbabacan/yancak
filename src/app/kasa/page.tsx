"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { DERNEK, KASA, KASA_BAKIYE, KASA_TURLERI, formatDate, formatTL, type KasaHareket, type KasaTur } from "@/lib/data";
import { Chip, PageHeader, SectionTitle, UyeKapisi } from "@/components/ui";

export default function KasaSayfasi() {
  return (
    <>
      <PageHeader title="Kasa" subtitle="Derneğimizin hesap defteri — her kuruş şeffaf" />
      <UyeKapisi>
        <Icerik />
      </UyeKapisi>
    </>
  );
}

type Satir = KasaHareket & { bakiye: number };

const gelirMi = (t: KasaTur) => t !== "harcama";
const isaretli = (h: KasaHareket) => (gelirMi(h.tur) ? h.tutar : -h.tutar);
const turBilgi = (t: KasaTur) => KASA_TURLERI.find((x) => x.id === t)!;
const COGUL: Record<KasaTur, string> = { harcama: "Harcamalar", aidat: "Aidatlar", bagis: "Bağışlar", ekgelir: "Ek Gelirler" };

function Icerik() {
  const [filtre, setFiltre] = useState<KasaTur | "hepsi">("hepsi");

  // En yeniden eskiye; her satırda o hareketten sonraki bakiye
  const satirlar = useMemo<Satir[]>(() => {
    const sirali = [...KASA].sort((a, b) => +new Date(b.tarih) - +new Date(a.tarih));
    let bakiye = KASA_BAKIYE;
    return sirali.map((h) => {
      const s = { ...h, bakiye };
      bakiye -= isaretli(h);
      return s;
    });
  }, []);

  const toplam = (t: KasaTur) => KASA.filter((h) => h.tur === t).reduce((a, b) => a + b.tutar, 0);
  const giris = KASA.filter((h) => gelirMi(h.tur)).reduce((a, b) => a + b.tutar, 0);
  const cikis = toplam("harcama");
  const enEski = satirlar[satirlar.length - 1];
  const devreden = enEski ? enEski.bakiye - isaretli(enEski) : KASA_BAKIYE;

  const gorunen = satirlar.filter((s) => filtre === "hepsi" || s.tur === filtre);

  // Ay → gün gruplaması
  const aylar: { ay: string; gunler: { gun: string; satirlar: Satir[] }[] }[] = [];
  for (const s of gorunen) {
    const ay = formatDate(s.tarih, { month: "long", year: "numeric" });
    const gun = s.tarih.slice(0, 10);
    let a = aylar.find((x) => x.ay === ay);
    if (!a) aylar.push((a = { ay, gunler: [] }));
    let g = a.gunler.find((x) => x.gun === gun);
    if (!g) a.gunler.push((g = { gun, satirlar: [] }));
    g.satirlar.push(s);
  }

  return (
    <div className="space-y-12 pb-6">
      {/* Özet */}
      <section className="mx-4 rounded-3xl bg-gradient-to-br from-toprak to-koyu p-5 text-krem shadow-lg md:p-7">
        <div className="text-[14px] text-krem/80">Kasadaki güncel tutar</div>
        <div className="mt-1 font-serif text-[40px] leading-none font-bold tabular-nums">{formatTL(KASA_BAKIYE)}</div>
        <div className="mt-2 text-[13px] text-krem/75">Son kayıt: {formatDate(satirlar[0].tarih)}</div>
        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          {KASA_TURLERI.map((t) => (
            <div key={t.id} className="rounded-2xl bg-white/10 p-3">
              <div className="text-[13px] text-krem/80">{COGUL[t.id]}</div>
              <div className="mt-0.5 text-[17px] font-bold tabular-nums">
                {t.id === "harcama" ? "−" : "+"}
                {formatTL(toplam(t.id))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-white/15 pt-3 text-[14px]">
          <span>
            Toplam giriş <b className="tabular-nums">{formatTL(giris)}</b>
          </span>
          <span>
            Toplam çıkış <b className="tabular-nums">{formatTL(cikis)}</b>
          </span>
        </div>
      </section>

      {/* IBAN */}
      <section>
        <SectionTitle>Bağış & Aidat Hesaplarımız</SectionTitle>
        <div className="space-y-3 px-4 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          {DERNEK.iban.map((h) => (
            <IbanKart key={h.iban} {...h} />
          ))}
        </div>
        <p className="mx-4 mt-3 text-[13px] leading-relaxed text-toprak/80">
          Açıklamaya adınızı ve &ldquo;bağış&rdquo; / &ldquo;aidat&rdquo; yazmayı unutmayın. İsminizin defterde görünmesini istemiyorsanız &ldquo;anonim&rdquo; yazın.
        </p>
      </section>

      {/* Hesap defteri */}
      <section>
        <SectionTitle>Hesap Defteri</SectionTitle>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-4">
          <Chip active={filtre === "hepsi"} onClick={() => setFiltre("hepsi")}>
            Tümü
          </Chip>
          {KASA_TURLERI.map((t) => (
            <Chip key={t.id} active={filtre === t.id} onClick={() => setFiltre(t.id)}>
              {COGUL[t.id]}
            </Chip>
          ))}
        </div>

        <div className="relative mx-4 overflow-hidden rounded-3xl bg-[#fffdf6] shadow-sm ring-1 ring-toprak/15">
          {/* defter kenar çizgisi */}
          <span className="pointer-events-none absolute inset-y-0 left-4 w-px bg-[#d9806b]/70 md:left-6" />

          {/* Sütun başlıkları (geniş ekran) */}
          <div className="hidden grid-cols-[1fr_110px_110px_120px] gap-3 border-b-2 border-toprak/25 py-3 pr-5 pl-10 text-[12.5px] font-bold tracking-wider text-toprak uppercase md:grid">
            <span>Açıklama</span>
            <span className="text-right">Giriş</span>
            <span className="text-right">Çıkış</span>
            <span className="text-right">Bakiye</span>
          </div>

          {aylar.map((a) => (
            <div key={a.ay}>
              <div className="border-b border-toprak/20 bg-kum/70 py-2 pr-4 pl-8 font-serif text-[15px] font-bold tracking-wide text-koyu uppercase md:pl-10">{a.ay}</div>
              {a.gunler.map((g) => (
                <div key={g.gun}>
                  {/* Tarih satırı */}
                  <div className="flex items-baseline gap-2 border-b border-toprak/15 pt-4 pr-4 pb-1.5 pl-8 md:pr-5 md:pl-10">
                    <span className="font-serif text-[24px] leading-none font-bold text-koyu tabular-nums">{new Date(g.gun).getDate()}</span>
                    <span className="text-[14.5px] font-semibold text-toprak">{formatDate(g.gun, { month: "long", weekday: "long" })}</span>
                  </div>
                  {g.satirlar.map((s) => (
                    <DefterSatiri key={s.id} s={s} />
                  ))}
                </div>
              ))}
            </div>
          ))}

          {filtre === "hepsi" && (
            <div className="flex items-center justify-between border-t-2 border-toprak/25 bg-kum/50 py-3 pr-4 pl-8 text-[14.5px] md:pr-5 md:pl-10">
              <span className="font-semibold text-toprak">Önceki dönemden devreden</span>
              <span className="font-bold text-koyu tabular-nums">{formatTL(devreden)}</span>
            </div>
          )}
          {!gorunen.length && <p className="py-10 text-center text-[15px] text-toprak/80">Bu türde kayıt yok.</p>}
        </div>
        <p className="mx-4 mt-3 text-[13px] leading-relaxed text-toprak/80">
          Belge numaraları makbuz (M), fatura (F) ve dekont (D) kayıtlarını gösterir. Asılları dernek merkezinde saklanır.
        </p>
      </section>
    </div>
  );
}

function DefterSatiri({ s }: { s: Satir }) {
  const t = turBilgi(s.tur);
  const giris = gelirMi(s.tur);
  const kim = s.anonim ? "İsmini vermek istemeyen hayırsever" : s.kisi;
  return (
    <div className="border-b border-dashed border-toprak/15 py-3.5 pr-4 pl-8 md:grid md:grid-cols-[1fr_110px_110px_120px] md:items-center md:gap-3 md:pr-5 md:pl-10">
      <div className="flex items-start justify-between gap-3 md:block">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`rounded-md px-2 py-0.5 text-[12px] font-bold ${t.zemin} ${t.renk}`}>{t.ad}</span>
            {s.belgeNo && <span className="font-mono text-[12px] text-toprak/75">{s.belgeNo}</span>}
          </div>
          <div className="mt-1 text-[15.5px] leading-snug font-medium text-koyu">{s.aciklama}</div>
          {kim && <div className={`text-[13.5px] ${s.anonim ? "text-toprak/80 italic" : "text-toprak"}`}>{kim}</div>}
        </div>
        {/* Telefon: tutar ve bakiye sağda */}
        <div className="shrink-0 text-right md:hidden">
          <div className={`text-[16px] font-bold tabular-nums ${giris ? "text-[#1e6b3f]" : "text-[#a8321c]"}`}>
            {giris ? "+" : "−"}
            {formatTL(s.tutar)}
          </div>
          <div className="text-[12.5px] text-toprak/80 tabular-nums">Bakiye {formatTL(s.bakiye)}</div>
        </div>
      </div>
      {/* Geniş ekran sütunları */}
      <div className="hidden text-right text-[15.5px] font-bold text-[#1e6b3f] tabular-nums md:block">{giris ? formatTL(s.tutar) : ""}</div>
      <div className="hidden text-right text-[15.5px] font-bold text-[#a8321c] tabular-nums md:block">{giris ? "" : formatTL(s.tutar)}</div>
      <div className="hidden text-right text-[15.5px] font-semibold text-koyu tabular-nums md:block">{formatTL(s.bakiye)}</div>
    </div>
  );
}

function IbanKart({ banka, alici, iban }: { banka: string; alici: string; iban: string }) {
  const [kopyalandi, setKopyalandi] = useState(false);
  return (
    <div className="rounded-3xl bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold">{banka}</div>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(iban.replace(/\s/g, ""));
            setKopyalandi(true);
            setTimeout(() => setKopyalandi(false), 1800);
          }}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-semibold ${kopyalandi ? "bg-emerald-700 text-white" : "bg-toprak text-krem"}`}
        >
          {kopyalandi ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {kopyalandi ? "Kopyalandı" : "IBAN Kopyala"}
        </button>
      </div>
      <div className="mt-2 font-mono text-[14px] tracking-wide">{iban}</div>
      <div className="text-[13px] text-toprak/80">{alici}</div>
    </div>
  );
}
