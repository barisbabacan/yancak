"use client";

import Link from "next/link";
import { Archive, CalendarDays, ChevronRight, Clock, Flower2, MapPin, MessageCircleHeart, ClipboardList, HeartCrack, Lock, MessageSquareText, Store, TreeDeciduous, Wallet, Users } from "lucide-react";
import { DUYURULAR, FOTOLAR, VEFATLAR, formatDate } from "@/lib/data";
import { DogumGunuKartlari } from "@/components/dogum-gunu";
import { DuyuruSatir, EtkinlikYaprak, KategoriEtiketi } from "@/components/duyuru";
import { WhatsAppPaylas } from "@/components/ui";
import { useAuth } from "@/components/auth";

const UYE_KISAYOLLARI = [
  { href: "/arsiv", ad: "Eski Fotoğraflar", icon: Archive },
  { href: "/soy-agaci", ad: "Soy Ağacı", icon: TreeDeciduous },
  { href: "/kasa", ad: "Kasa", icon: Wallet },
  { href: "/esnaf", ad: "Esnaflar", icon: Store },
  { href: "/ilanlar", ad: "İlanlar", icon: ClipboardList },
  { href: "/uyeler", ad: "Üyeler", icon: Users },
  { href: "/talep", ad: "Dilek & Şikayet", icon: MessageSquareText },
  { href: "/vefat", ad: "Taziye", icon: HeartCrack },
];

function gunOnce(iso: string) {
  const g = Math.floor((Date.now() - +new Date(iso)) / 864e5);
  return g <= 0 ? "Bugün" : g === 1 ? "Dün" : `${g} gün önce`;
}

/** Bölüm başlığı: ince çizgili, sade */
function Baslik({ children, href, linkText = "Tümü" }: { children: React.ReactNode; href?: string; linkText?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3 px-4 lg:px-0">
      <h2 className="font-serif text-[21px] font-bold text-koyu lg:text-[24px]">{children}</h2>
      <span className="h-px flex-1 translate-y-[-5px] bg-toprak/25" />
      {href && (
        <Link href={href} className="flex items-center text-[14px] font-bold text-toprak">
          {linkText} <ChevronRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

export default function AnaSayfa() {
  const { rol, kullanici } = useAuth();
  const sabit = DUYURULAR.find((d) => d.sabit);
  const etkinlikler = DUYURULAR.filter((d) => d.etkinlikTarihi && new Date(d.etkinlikTarihi) >= new Date()).sort(
    (a, b) => +new Date(a.etkinlikTarihi!) - +new Date(b.etkinlikTarihi!)
  );
  const sonVefat = VEFATLAR.find((v) => (Date.now() - +new Date(v.tarih)) / 864e5 <= 10);
  const digerleri = DUYURULAR.filter((d) => d.id !== sabit?.id && d.kategori !== "vefat").slice(0, 4);
  const fotolar = FOTOLAR.filter((f) => !f.arsiv).slice(0, 6);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
      {kullanici && (
        <div className="px-4 pt-6 text-[16px] text-toprak lg:col-span-12 lg:row-start-1 lg:-mb-6 lg:px-0 lg:pt-10 lg:text-[18px]">
          Hoş geldin, <span className="font-bold text-koyu">{kullanici.adSoyad.split(" ")[0]}</span> 👋
        </div>
      )}

      <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2">
        <DogumGunuKartlari />
      </div>

      {/* ÖNE ÇIKAN: kenardan kenara afiş */}
      {sabit && (
        <Link href={`/duyurular/${sabit.id}`} className="relative mx-4 mt-10 block overflow-hidden rounded-3xl bg-koyu text-white shadow-lg shadow-toprak/20 lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:mx-0 lg:mt-0 lg:min-h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sabit.gorsel} alt="" className="h-60 w-full object-cover lg:absolute lg:inset-0 lg:h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-koyu via-koyu/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 pb-5 lg:p-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-bugday px-2.5 py-1 text-[12.5px] leading-none font-bold text-koyu">ÖNE ÇIKAN</span>
              <KategoriEtiketi id={sabit.kategori} />
            </div>
            <div className="font-serif text-[24px] leading-tight font-bold lg:text-[36px]">{sabit.baslik}</div>
            {sabit.etkinlikTarihi && (
              <div className="mt-1.5 text-[15px] font-medium text-white">
                {formatDate(sabit.etkinlikTarihi, { day: "numeric", month: "long", weekday: "long" })} · {sabit.yer}
              </div>
            )}
          </div>
        </Link>
      )}

      {/* VEFAT: ağırbaşlı, koyu anma kartı */}
      {sonVefat && (
        <section className="px-4 pt-12 lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:p-0">
          <div className="relative overflow-hidden rounded-3xl bg-[#2a2420] text-stone-100 shadow-lg shadow-stone-900/25">
            {/* yumuşak ışık */}
            <div className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-bugday/10 blur-2xl" />
            <div className="relative px-5 pt-5 pb-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                  <Flower2 className="size-5 text-stone-200" strokeWidth={1.6} />
                </span>
                <span className="text-[13px] font-bold tracking-[0.2em] text-stone-300 uppercase">Vefat</span>
                <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-[13px] font-medium text-stone-200">{gunOnce(sonVefat.tarih)}</span>
              </div>

              <h2 className="mt-5 font-serif text-[28px] leading-tight font-bold text-white">{sonVefat.adSoyad}</h2>
              <p className="mt-1 text-[15.5px] text-stone-300">
                {sonVefat.yakinlik} · {sonVefat.yas} yaşında
              </p>

              <dl className="mt-5 space-y-3 border-t border-white/10 pt-5 text-[15px]">
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-bugday" />
                  <div>
                    <dt className="text-[13px] font-semibold text-stone-400">Cenaze</dt>
                    <dd className="leading-snug text-stone-100">{sonVefat.cenaze}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-bugday" />
                  <div>
                    <dt className="text-[13px] font-semibold text-stone-400">Taziye</dt>
                    <dd className="leading-snug text-stone-100">{sonVefat.taziyeAdresi}</dd>
                  </div>
                </div>
              </dl>

              <p className="mt-5 text-center font-serif text-[16.5px] text-stone-200 italic">
                Merhuma Allah&apos;tan rahmet, ailesine başsağlığı dileriz.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Link href={`/vefat/${sonVefat.id}`} className="flex-1 rounded-full bg-krem py-3 text-center text-[15px] font-bold text-koyu active:opacity-80">
                  Taziye Bırak
                </Link>
                <Link href={`/vefat/${sonVefat.id}`} className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-3 text-[14px] font-semibold text-stone-100">
                  <MessageCircleHeart className="size-4" /> {sonVefat.mesajlar.length}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ETKİNLİKLER: renkli bant üzerinde yatay takvim yaprakları */}
      {etkinlikler.length > 0 && (
        <section className="mx-4 mt-14 rounded-3xl bg-kum pt-6 pb-6 lg:col-span-12 lg:row-start-4 lg:mx-0 lg:mt-0 lg:px-3 lg:pt-8 lg:pb-8">
          <div className="flex items-end justify-between px-5">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-bold tracking-wider text-gunbatimi uppercase">
                <CalendarDays className="size-4" /> Takvim
              </div>
              <h2 className="mt-1 font-serif text-[21px] font-bold text-koyu">Yaklaşan Etkinlikler</h2>
            </div>
            <Link href="/duyurular?k=etkinlik" className="flex items-center text-[14px] font-bold text-toprak">
              Tümü <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
            {etkinlikler.map((d) => (
              <EtkinlikYaprak key={d.id} d={d} />
            ))}
          </div>
        </section>
      )}

      {/* DUYURULAR: haber listesi */}
      <section className="pt-14 lg:col-span-7 lg:row-start-5 lg:pt-0">
        <Baslik href="/duyurular">Son Duyurular</Baslik>
        <div className="divide-y divide-toprak/15 px-4 lg:px-0">
          {digerleri.map((d) => (
            <DuyuruSatir key={d.id} d={d} />
          ))}
        </div>
      </section>

      {/* FOTOĞRAFLAR: kenardan kenara mozaik */}
      <section className="pt-14 lg:col-span-5 lg:row-start-5 lg:pt-0">
        <Baslik href="/galeri">Köyden Kareler</Baslik>
        <div className="grid grid-cols-3 gap-2 px-4 lg:px-0">
          {fotolar.map((f, i) => (
            <Link key={f.id} href={`/galeri/${f.id}`} className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : "aspect-square"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.baslik} className="size-full object-cover" />
            </Link>
          ))}
        </div>
      </section>

      {/* ÜYE KÖŞESİ: renkli bant üzerinde simgeler */}
      <section className="mx-4 mt-16 rounded-3xl bg-toprak px-5 pt-8 pb-10 text-krem shadow-lg shadow-toprak/20 lg:col-span-12 lg:row-start-6 lg:mx-0 lg:mt-0 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[21px] font-bold">{rol === "ziyaretci" ? "Üyelerimize Özel" : "Üye Köşesi"}</h2>
          {rol === "ziyaretci" && (
            <Link href="/giris" className="rounded-full bg-bugday px-3.5 py-1.5 text-[14px] font-bold text-koyu">
              Giriş yap
            </Link>
          )}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-x-2 gap-y-6 md:grid-cols-8">
          {UYE_KISAYOLLARI.map(({ href, ad, icon: Icon }) => (
            <Link key={href} href={href} className="group flex flex-col items-center gap-1.5 text-center">
              <span className="relative flex size-14 items-center justify-center rounded-full bg-krem text-toprak transition-transform group-hover:-translate-y-0.5 lg:size-16">
                <Icon className="size-6" />
                {rol === "ziyaretci" && (
                  <span className="absolute -right-0.5 -bottom-0.5 flex size-5 items-center justify-center rounded-full bg-koyu ring-2 ring-toprak">
                    <Lock className="size-3 text-bugday" />
                  </span>
                )}
              </span>
              <span className="text-[13px] leading-tight font-semibold">{ad}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PAYLAŞ: sade şerit */}
      <section className="mx-4 mt-8 flex items-center gap-3 rounded-3xl bg-[#eaf7ee] px-5 py-6 lg:col-span-12 lg:row-start-7 lg:mx-0 lg:mt-0 lg:px-8">
        <p className="flex-1 text-[15px] leading-snug font-medium text-koyu">Sitemizi köy WhatsApp gruplarında paylaşın.</p>
        <WhatsAppPaylas text="Yanıcak Köyü Kültür ve Dayanışma Derneği sitesi" url="https://yanicak.org.tr" compact />
      </section>

    </div>
  );
}
