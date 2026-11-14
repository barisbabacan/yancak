import Link from "next/link";
import { CalendarDays, MapPin, Pin } from "lucide-react";
import { DUYURU_KATEGORILERI, formatDate, type Duyuru } from "@/lib/data";

export function KategoriEtiketi({ id }: { id: Duyuru["kategori"] }) {
  const k = DUYURU_KATEGORILERI.find((x) => x.id === id)!;
  return <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-wide ${k.renk}`}>{k.ad}</span>;
}

export function DuyuruSatir({ d }: { d: Duyuru }) {
  return (
    <Link href={`/duyurular/${d.id}`} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-toprak/5 active:scale-[0.99]">
      {d.gorsel ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={d.gorsel} alt="" className="size-20 shrink-0 rounded-xl object-cover" />
      ) : (
        <div className={`flex size-20 shrink-0 flex-col items-center justify-center rounded-xl ${d.kategori === "vefat" ? "bg-stone-800 text-stone-100" : d.kategori === "sehit" ? "bg-red-700 text-white" : "bg-kum text-toprak"}`}>
          <span className="text-2xl font-bold">{new Date(d.tarih).getDate()}</span>
          <span className="text-[11px] uppercase">{formatDate(d.tarih, { month: "short" })}</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-1.5">
          <KategoriEtiketi id={d.kategori} />
          {d.sabit && <Pin className="size-3.5 text-gunbatimi" />}
          <span className="ml-auto text-[11px] text-toprak/50">{formatDate(d.tarih, { day: "numeric", month: "short" })}</span>
        </div>
        <div className="line-clamp-2 leading-snug font-semibold">{d.baslik}</div>
        <div className="mt-0.5 line-clamp-1 text-[13px] text-toprak/65">{d.ozet}</div>
      </div>
    </Link>
  );
}

export function EtkinlikKart({ d }: { d: Duyuru }) {
  const t = new Date(d.etkinlikTarihi!);
  return (
    <Link href={`/duyurular/${d.id}`} className="flex w-64 shrink-0 gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-toprak/5">
      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-gunbatimi to-altin text-white">
        <span className="text-[11px] font-semibold uppercase">{t.toLocaleDateString("tr-TR", { month: "short" })}</span>
        <span className="text-2xl leading-none font-bold">{t.getDate()}</span>
        <span className="text-[10px]">{t.toLocaleDateString("tr-TR", { weekday: "short" })}</span>
      </div>
      <div className="min-w-0">
        <div className="line-clamp-2 text-[14px] leading-snug font-semibold">{d.baslik}</div>
        {d.yer && (
          <div className="mt-1 flex items-center gap-1 text-[12px] text-toprak/65">
            <MapPin className="size-3" /> <span className="truncate">{d.yer}</span>
          </div>
        )}
        <div className="mt-0.5 flex items-center gap-1 text-[12px] text-altin">
          <CalendarDays className="size-3" />
          {Math.max(0, Math.ceil((t.getTime() - Date.now()) / 864e5))} gün kaldı
        </div>
      </div>
    </Link>
  );
}
