"use client";

import Link from "next/link";
import { Lock, MapPin, TreeDeciduous } from "lucide-react";
import { KOY_TARIHCE } from "@/lib/data";
import { PageHeader, SectionTitle, YonlendirmeKarti } from "@/components/ui";
import { useAuth } from "@/components/auth";

export default function KoyumuzSayfasi() {
  const { rol } = useAuth();
  return (
    <div className="space-y-12 pb-6">
      <PageHeader title="Yanıcak Köyü" subtitle="Boğazkale / Çorum" />

      <section className="px-4">
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ornek/tarla.jpg" alt="" className="h-48 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-koyu/80 to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-1 text-sm text-white">
            <MapPin className="size-4" /> Hattuşa&apos;ya birkaç kilometre mesafede
          </div>
        </div>
        <p className="mt-5 text-[16px] leading-relaxed text-toprak/85">
          Yanıcak, Çorum&apos;un Boğazkale ilçesine bağlı, buğday tarlaları arasında kurulmuş köklü bir köydür. Hitit başkenti
          Hattuşa&apos;ya komşu olan köyümüz, yüzyıllardır tarım ve hayvancılıkla yaşamış; bugün büyük kısmı Ankara&apos;da yaşayan
          hemşehrilerimizle bağını derneğimiz aracılığıyla sürdürmektedir. <span className="text-toprak/80">(Örnek metin)</span>
        </p>
      </section>

      <section>
        <SectionTitle>Tarihçe</SectionTitle>
        <ol className="relative mx-4 border-l-2 border-bugday/50 pl-5">
          {KOY_TARIHCE.map((t) => (
            <li key={t.yil} className="relative mb-8 last:mb-0">
              <span className="absolute top-1 -left-[27px] size-3.5 rounded-full border-2 border-krem bg-altin" />
              <div className="text-xs font-bold tracking-wide text-altin">{t.yil}</div>
              <div className="font-semibold">{t.baslik}</div>
              <p className="text-sm text-toprak/75">{t.metin}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-4">
        <Link href="/soy-agaci" className="flex items-center gap-3 rounded-3xl bg-toprak p-4 text-krem">
          <TreeDeciduous className="size-6" />
          <div className="flex-1">
            <div className="font-semibold">Sülaleler & Soy Ağacı</div>
            <div className="text-[13px] text-krem/80">Hangi aile kimden geliyor?</div>
          </div>
          {rol === "ziyaretci" && <Lock className="size-4 text-krem/70" />}
        </Link>
      </section>

      <section>
        <YonlendirmeKarti
          href="/dernek"
          ust="Derneğimiz"
          baslik="Kültür ve Dayanışma Derneği"
          aciklama="Yönetim kurulu, kurucular, kadın kolu ve iletişim"
          logo
        />
      </section>
    </div>
  );
}
