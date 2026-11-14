import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { VEFATLAR, formatDate } from "@/lib/data";
import { PageHeader } from "@/components/ui";

export const metadata = { title: "Vefat ve Taziye" };

export default function VefatSayfasi() {
  return (
    <>
      <PageHeader title="Vefat ve Taziye" subtitle="Aramızdan ayrılan hemşehrilerimizi rahmetle anıyoruz" />
      <div className="space-y-2.5 px-4 pt-2">
        {VEFATLAR.map((v) => (
          <Link key={v.id} href={`/vefat/${v.id}`} className="flex items-center gap-3 rounded-2xl bg-white p-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-stone-800 text-lg">🖤</div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">
                {v.adSoyad} <span className="font-normal text-toprak/60">({v.yas})</span>
              </div>
              <div className="truncate text-[13px] text-toprak/65">{v.yakinlik}</div>
              <div className="text-xs text-toprak/50">
                {formatDate(v.tarih)} · {v.mesajlar.length} taziye mesajı
              </div>
            </div>
            <ChevronRight className="size-5 text-toprak/40" />
          </Link>
        ))}
      </div>
    </>
  );
}
