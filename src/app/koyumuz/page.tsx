"use client";

import Link from "next/link";
import { FileText, Lock, MapPin, TreeDeciduous } from "lucide-react";
import { KOY_TARIHCE, KURUCULAR, OSMANLI_BELGELERI } from "@/lib/data";
import { KisiGrid, PageHeader, SectionTitle } from "@/components/ui";
import { useAuth } from "@/components/auth";

export default function KoyumuzSayfasi() {
  const { rol } = useAuth();
  return (
    <div className="space-y-7">
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
        <p className="mt-3 text-[15px] leading-relaxed text-toprak/85">
          Yanıcak, Çorum&apos;un Boğazkale ilçesine bağlı, buğday tarlaları arasında kurulmuş köklü bir köydür. Hitit başkenti
          Hattuşa&apos;ya komşu olan köyümüz, yüzyıllardır tarım ve hayvancılıkla yaşamış; bugün büyük kısmı Ankara&apos;da yaşayan
          hemşehrilerimizle bağını derneğimiz aracılığıyla sürdürmektedir. <span className="text-toprak/50">(Örnek metin)</span>
        </p>
      </section>

      <section>
        <SectionTitle>Tarihçe</SectionTitle>
        <ol className="relative mx-4 border-l-2 border-bugday/50 pl-5">
          {KOY_TARIHCE.map((t) => (
            <li key={t.yil} className="relative mb-5 last:mb-0">
              <span className="absolute top-1 -left-[27px] size-3.5 rounded-full border-2 border-krem bg-altin" />
              <div className="text-xs font-bold tracking-wide text-altin">{t.yil}</div>
              <div className="font-semibold">{t.baslik}</div>
              <p className="text-sm text-toprak/75">{t.metin}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionTitle>Köyün Kurucuları & Ulu Çınarları</SectionTitle>
        <KisiGrid
          kisiler={[
            { adSoyad: "Molla Hasan Karaca", gorev: "Karacaların atası" },
            { adSoyad: "Demirci Halil Yıldırım", gorev: "Yıldırımların atası" },
            { adSoyad: "Hacı Mehmet Kılıç", gorev: "Kılıçların atası" },
          ]}
        />
        <Link href="/soy-agaci" className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-toprak p-3.5 text-krem">
          <TreeDeciduous className="size-6" />
          <div className="flex-1">
            <div className="font-semibold">Sülaleler & Soy Ağacı</div>
            <div className="text-xs text-krem/70">Hangi aile kimden geliyor?</div>
          </div>
          {rol === "ziyaretci" && <Lock className="size-4 text-krem/60" />}
        </Link>
      </section>

      <section>
        <SectionTitle>Osmanlı Kayıtları & Belgeler</SectionTitle>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
          {OSMANLI_BELGELERI.map((b) => {
            const kilitli = b.arsiv && rol === "ziyaretci";
            return (
              <div key={b.id} className="w-40 shrink-0 overflow-hidden rounded-2xl bg-white">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.src} alt="" className={`sepia-photo aspect-[3/4] w-full object-cover ${kilitli ? "blur-md" : ""}`} />
                  {kilitli && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex items-center gap-1 rounded-full bg-koyu/80 px-2.5 py-1 text-xs text-white">
                        <Lock className="size-3" /> Üyelere özel
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <div className="flex items-center gap-1 text-[13px] font-semibold">
                    <FileText className="size-3.5 text-altin" /> {b.ad}
                  </div>
                  <div className="text-[11px] text-altin">{b.tarih}</div>
                  <div className="mt-0.5 text-[12px] text-toprak/65">{b.aciklama}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle>Derneğin Kurucuları</SectionTitle>
        <KisiGrid kisiler={KURUCULAR} />
      </section>
    </div>
  );
}
