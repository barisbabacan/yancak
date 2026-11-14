import { notFound } from "next/navigation";
import { VEFATLAR, formatDate } from "@/lib/data";
import { PageHeader, WhatsAppPaylas } from "@/components/ui";
import { TaziyeDefteri } from "./taziye";

export function generateStaticParams() {
  return VEFATLAR.map((v) => ({ id: v.id }));
}

export default async function VefatDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = VEFATLAR.find((x) => x.id === id);
  if (!v) notFound();

  return (
    <>
      <PageHeader title="" back="/vefat" />
      <div className="mx-4 rounded-3xl bg-stone-800 p-6 text-center text-stone-100">
        <div className="text-sm text-stone-400">إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</div>
        <h1 className="mt-3 font-serif text-2xl font-bold">{v.adSoyad}</h1>
        <div className="text-stone-300">({v.yas} yaşında)</div>
        <div className="mt-1 text-sm text-stone-400">{v.yakinlik}</div>
        <div className="mt-3 text-xs text-stone-400">Vefat: {formatDate(v.tarih)}</div>
      </div>

      <div className="mx-4 mt-8 divide-y divide-kum rounded-3xl bg-white text-sm">
        <Bilgi etiket="Cenaze" deger={v.cenaze} />
        {v.mevlit && <Bilgi etiket="Mevlit" deger={v.mevlit} />}
        <Bilgi etiket="Taziye" deger={v.taziyeAdresi} />
      </div>

      <div className="mt-8 flex justify-center">
        <WhatsAppPaylas text={`🖤 Vefat: ${v.adSoyad} (${v.yas})\n${v.yakinlik}\nCenaze: ${v.cenaze}`} url={`https://yanicak.org.tr/vefat/${v.id}`} />
      </div>

      <TaziyeDefteri ilk={v.mesajlar} />
    </>
  );
}

function Bilgi({ etiket, deger }: { etiket: string; deger: string }) {
  return (
    <div className="flex gap-3 p-3.5">
      <div className="w-16 shrink-0 font-semibold text-toprak">{etiket}</div>
      <div className="text-toprak/80">{deger}</div>
    </div>
  );
}
