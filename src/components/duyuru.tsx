import Link from "next/link";
import { ChevronRight, MapPin, Pin } from "lucide-react";
import { DUYURU_KATEGORILERI, formatDate, type Duyuru } from "@/lib/data";

const kat = (id: Duyuru["kategori"]) => DUYURU_KATEGORILERI.find((x) => x.id === id)!;

/** Dolgulu rozet — görsel üstünde veya detay sayfasında */
export function KategoriEtiketi({ id }: { id: Duyuru["kategori"] }) {
  const k = kat(id);
  return <span className={`rounded-md px-2.5 py-1 text-[12.5px] leading-none font-bold ${k.renk}`}>{k.ad}</span>;
}

/** Haber listesi satırı: gazete düzeni, kart yok */
export function DuyuruSatir({ d }: { d: Duyuru }) {
  const k = kat(d.kategori);
  return (
    <Link href={`/duyurular/${d.id}`} className="flex gap-4 py-5 active:opacity-70">
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-2 text-[13px]">
          <span className={`font-bold tracking-wide uppercase ${k.yazi}`}>{k.ad}</span>
          {d.sabit && <Pin className="size-3.5 text-gunbatimi" />}
          <span className="text-toprak/80">· {formatDate(d.tarih, { day: "numeric", month: "long" })}</span>
        </div>
        <div className="font-serif text-[17px] leading-snug font-bold text-koyu">{d.baslik}</div>
        <div className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-toprak/85">{d.ozet}</div>
      </div>
      {d.gorsel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={d.gorsel} alt="" className="mt-1 size-[88px] shrink-0 rounded-2xl object-cover" />
      )}
    </Link>
  );
}

/** Ajanda satırı: tarih sütunu + zaman çizgisi */
export function EtkinlikSatir({ d, son }: { d: Duyuru; son?: boolean }) {
  const t = new Date(d.etkinlikTarihi!);
  const kalan = Math.max(0, Math.ceil((t.getTime() - Date.now()) / 864e5));
  return (
    <Link href={`/duyurular/${d.id}`} className="flex gap-4 active:opacity-70">
      <div className="flex w-14 shrink-0 flex-col items-center">
        <span className="text-[13px] font-bold text-gunbatimi uppercase">{t.toLocaleDateString("tr-TR", { month: "short" })}</span>
        <span className="font-serif text-[34px] leading-none font-bold text-koyu">{t.getDate()}</span>
        <span className="text-[13px] font-medium text-toprak">{t.toLocaleDateString("tr-TR", { weekday: "long" })}</span>
        {!son && <span className="mt-2 w-0.5 flex-1 bg-bugday/50" />}
      </div>
      <div className={`min-w-0 flex-1 ${son ? "" : "pb-9"}`}>
        <div className="font-serif text-[18px] leading-snug font-bold text-koyu">{d.baslik}</div>
        {d.yer && (
          <div className="mt-1 flex items-center gap-1 text-[14px] text-toprak">
            <MapPin className="size-4 shrink-0" /> {d.yer}
          </div>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-gunbatimi/15 px-3 py-1 text-[13px] font-bold text-[#a24a12]">{kalan === 0 ? "Bugün" : `${kalan} gün kaldı`}</span>
          <ChevronRight className="size-5 text-toprak/80" />
        </div>
      </div>
    </Link>
  );
}

/** Takvim yaprağı kartı: yatay kaydırılan etkinlik bandı için */
export function EtkinlikYaprak({ d }: { d: Duyuru }) {
  const t = new Date(d.etkinlikTarihi!);
  const kalan = Math.max(0, Math.ceil((t.getTime() - Date.now()) / 864e5));
  return (
    <Link href={`/duyurular/${d.id}`} className="flex w-[232px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-toprak/10 transition-transform hover:-translate-y-0.5 active:scale-[0.99] lg:w-auto">
      {/* takvim yaprağı başı */}
      <div className="relative bg-[#b9531a] px-4 pt-4 pb-3 text-white">
        <div className="absolute top-2 left-1/2 flex -translate-x-1/2 gap-10">
          <span className="size-2 rounded-full bg-white/60" />
          <span className="size-2 rounded-full bg-white/60" />
        </div>
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-[13px] font-bold tracking-wider uppercase">{t.toLocaleDateString("tr-TR", { month: "long" })}</div>
            <div className="text-[13px] font-medium text-white/90">{t.toLocaleDateString("tr-TR", { weekday: "long" })}</div>
          </div>
          <div className="font-serif text-[46px] leading-none font-bold">{t.getDate()}</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <div className="line-clamp-2 font-serif text-[17px] leading-snug font-bold text-koyu">{d.baslik}</div>
        {d.yer && (
          <div className="mt-1.5 flex items-start gap-1 text-[13.5px] leading-snug text-toprak">
            <MapPin className="mt-0.5 size-3.5 shrink-0" /> {d.yer}
          </div>
        )}
        <div className="mt-auto pt-3">
          <span className="inline-block rounded-full bg-kum px-3 py-1 text-[13px] font-bold text-[#8a3e0e]">{kalan === 0 ? "Bugün" : `${kalan} gün kaldı`}</span>
        </div>
      </div>
    </Link>
  );
}

const TARIH_RENK: Partial<Record<Duyuru["kategori"], string>> = {
  vefat: "bg-stone-900 text-white",
  sehit: "bg-red-800 text-white",
  etkinlik: "bg-[#b9531a] text-white",
};

/** Duyurular sayfası satırı: büyük tarih bloğu + büyük başlık, diğer bilgiler altta */
export function DuyuruListeSatiri({ d }: { d: Duyuru }) {
  const k = kat(d.kategori);
  const etkinlik = !!d.etkinlikTarihi;
  const t = new Date(etkinlik ? d.etkinlikTarihi! : d.tarih);
  const kalan = etkinlik ? Math.ceil((t.getTime() - Date.now()) / 864e5) : 0;
  const renk = TARIH_RENK[d.kategori] ?? (etkinlik ? TARIH_RENK.etkinlik! : "bg-kum text-koyu");

  return (
    <Link href={`/duyurular/${d.id}`} className="flex gap-4 py-6 active:opacity-70">
      {/* Büyük tarih */}
      <div className={`flex w-[68px] shrink-0 flex-col items-center self-start rounded-2xl px-1 pt-2 pb-2.5 ${renk}`}>
        {etkinlik && <span className="mb-0.5 text-[10.5px] font-bold tracking-wider uppercase opacity-90">Etkinlik</span>}
        <span className="font-serif text-[34px] leading-none font-bold">{t.getDate()}</span>
        <span className="mt-1 text-[13px] font-bold uppercase">{t.toLocaleDateString("tr-TR", { month: "short" })}</span>
        <span className="text-[12px] opacity-90">{t.toLocaleDateString("tr-TR", { weekday: "short" })}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="font-serif text-[20px] leading-snug font-bold text-koyu">{d.baslik}</h2>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px]">
          <span className={`font-bold tracking-wide uppercase ${k.yazi}`}>{k.ad}</span>
          {d.sabit && <Pin className="size-3.5 text-gunbatimi" />}
          {etkinlik && <span className="text-toprak">· Duyuru: {formatDate(d.tarih, { day: "numeric", month: "long" })}</span>}
        </div>

        {etkinlik && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px] text-toprak">
            {d.yer && (
              <span className="flex items-center gap-1">
                <MapPin className="size-4 shrink-0" /> {d.yer}
              </span>
            )}
            <span className="rounded-full bg-gunbatimi/15 px-2.5 py-0.5 text-[13px] font-bold text-[#8a3e0e]">
              {kalan > 0 ? `${kalan} gün kaldı` : kalan === 0 ? "Bugün" : "Yapıldı"}
            </span>
          </div>
        )}

        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-toprak/85">{d.ozet}</p>
      </div>
    </Link>
  );
}
