import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { DUYURULAR, formatDate } from "@/lib/data";
import { KategoriEtiketi } from "@/components/duyuru";
import { PageHeader, WhatsAppPaylas } from "@/components/ui";

export function generateStaticParams() {
  return DUYURULAR.map((d) => ({ id: d.id }));
}

export default async function DuyuruDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = DUYURULAR.find((x) => x.id === id);
  if (!d) notFound();

  return (
    <article>
      <PageHeader title="" back="/duyurular" />
      {d.gorsel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={d.gorsel} alt="" className="mx-4 mb-4 aspect-[16/10] w-[calc(100%-2rem)] rounded-2xl object-cover" />
      )}
      <div className="px-4">
        <div className="flex items-center gap-2">
          <KategoriEtiketi id={d.kategori} />
          <span className="text-xs text-toprak/60">{formatDate(d.tarih)}</span>
        </div>
        <h1 className="mt-2 font-serif text-2xl leading-tight font-bold text-toprak">{d.baslik}</h1>

        {d.etkinlikTarihi && (
          <div className="mt-4 space-y-2 rounded-2xl bg-kum p-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-altin" />
              {formatDate(d.etkinlikTarihi, { day: "numeric", month: "long", year: "numeric", weekday: "long" })}
            </div>
            {d.yer && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-altin" />
                {d.yer}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 space-y-3 text-[16px] leading-relaxed whitespace-pre-line">{d.icerik}</div>

        <div className="mt-6 flex justify-center">
          <WhatsAppPaylas text={`📢 ${d.baslik}\n${d.ozet}`} url={`https://yanicak.org.tr/duyurular/${d.id}`} />
        </div>
      </div>
    </article>
  );
}
