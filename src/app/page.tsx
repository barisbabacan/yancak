"use client";

import Link from "next/link";
import { Archive, ChevronRight, ClipboardList, HeartCrack, Lock, MessageSquareText, Store, TreeDeciduous, Wallet, Users } from "lucide-react";
import { DUYURULAR, FOTOLAR, VEFATLAR, formatDate } from "@/lib/data";
import { DogumGunuKartlari } from "@/components/dogum-gunu";
import { DuyuruSatir, EtkinlikKart, KategoriEtiketi } from "@/components/duyuru";
import { SectionTitle, WhatsAppPaylas } from "@/components/ui";
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

export default function AnaSayfa() {
  const { rol, kullanici } = useAuth();
  const sabit = DUYURULAR.find((d) => d.sabit);
  const etkinlikler = DUYURULAR.filter((d) => d.etkinlikTarihi && new Date(d.etkinlikTarihi) >= new Date()).sort(
    (a, b) => +new Date(a.etkinlikTarihi!) - +new Date(b.etkinlikTarihi!)
  );
  const sonVefat = VEFATLAR.find((v) => (Date.now() - +new Date(v.tarih)) / 864e5 <= 10);
  const digerleri = DUYURULAR.filter((d) => d.id !== sabit?.id).slice(0, 4);
  const fotolar = FOTOLAR.filter((f) => !f.arsiv).slice(0, 6);

  return (
    <div className="space-y-6">
      {kullanici && (
        <div className="px-4 pt-4 text-[15px] text-toprak/80">
          Hoş geldin, <span className="font-semibold text-toprak">{kullanici.adSoyad.split(" ")[0]}</span> 👋
        </div>
      )}

      <DogumGunuKartlari />

      {/* Öne çıkan duyuru */}
      {sabit && (
        <section className="px-4">
          <Link href={`/duyurular/${sabit.id}`} className="relative block overflow-hidden rounded-3xl bg-koyu text-white shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sabit.gorsel} alt="" className="h-52 w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-koyu via-koyu/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full bg-gunbatimi px-2 py-0.5 text-[10.5px] font-bold">ÖNE ÇIKAN</span>
                <KategoriEtiketi id={sabit.kategori} />
              </div>
              <div className="font-serif text-xl leading-tight font-bold">{sabit.baslik}</div>
              {sabit.etkinlikTarihi && (
                <div className="mt-1 text-sm text-white/80">
                  {formatDate(sabit.etkinlikTarihi, { day: "numeric", month: "long", weekday: "long" })} · {sabit.yer}
                </div>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* Vefat bandı */}
      {sonVefat && (
        <section className="px-4">
          <Link href={`/vefat/${sonVefat.id}`} className="flex items-center gap-3 rounded-2xl bg-stone-800 p-3.5 text-stone-100">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-700 text-lg">🖤</div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] tracking-wide text-stone-400 uppercase">Vefat · Başımız sağ olsun</div>
              <div className="truncate font-semibold">{sonVefat.adSoyad} ({sonVefat.yas})</div>
              <div className="truncate text-xs text-stone-400">{sonVefat.yakinlik}</div>
            </div>
            <ChevronRight className="size-5 text-stone-400" />
          </Link>
        </section>
      )}

      {/* Yaklaşan etkinlikler */}
      {etkinlikler.length > 0 && (
        <section>
          <SectionTitle href="/duyurular?k=etkinlik">Yaklaşan Etkinlikler</SectionTitle>
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
            {etkinlikler.map((d) => (
              <EtkinlikKart key={d.id} d={d} />
            ))}
          </div>
        </section>
      )}

      {/* Son duyurular */}
      <section>
        <SectionTitle href="/duyurular">Son Duyurular</SectionTitle>
        <div className="space-y-2.5 px-4">
          {digerleri.map((d) => (
            <DuyuruSatir key={d.id} d={d} />
          ))}
        </div>
      </section>

      {/* Üye kısayolları */}
      <section>
        <SectionTitle>{rol === "ziyaretci" ? "Üyelerimize Özel" : "Üye Köşesi"}</SectionTitle>
        <div className="grid grid-cols-4 gap-2 px-4">
          {UYE_KISAYOLLARI.map(({ href, ad, icon: Icon }) => (
            <Link key={href} href={href} className="relative flex flex-col items-center gap-1.5 rounded-2xl bg-white px-1 py-3 text-center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-kum text-toprak">
                <Icon className="size-5" />
              </div>
              <span className="text-[11.5px] leading-tight">{ad}</span>
              {rol === "ziyaretci" && <Lock className="absolute top-1.5 right-1.5 size-3 text-toprak/40" />}
            </Link>
          ))}
        </div>
      </section>

      {/* Galeri */}
      <section>
        <SectionTitle href="/galeri">Fotoğraflar</SectionTitle>
        <div className="grid grid-cols-3 gap-1 px-4">
          {fotolar.map((f) => (
            <Link key={f.id} href={`/galeri/${f.id}`} className="aspect-square overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src.replace("800/600", "400/400")} alt={f.baslik} className="size-full object-cover" />
            </Link>
          ))}
        </div>
      </section>

      {/* Davet */}
      <section className="px-4">
        <div className="rounded-3xl border border-bugday/40 bg-white p-5 text-center">
          <div className="font-serif text-lg font-bold text-toprak">Köy grubunda paylaşın</div>
          <p className="mt-1 text-sm text-toprak/70">Sitemizi WhatsApp gruplarınızda paylaşarak hemşehrilerimize ulaşmamıza yardım edin.</p>
          <div className="mt-3">
            <WhatsAppPaylas text="Yanıcak Köyü Kültür ve Dayanışma Derneği sitesi" url="https://yanicak.org.tr" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-4 rounded-3xl bg-koyu p-5 text-sm text-kum/80">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.webp" alt="" className="size-12 rounded-full" />
        <div className="font-serif leading-tight font-bold text-kum">Yanıcak Köyü Kültür ve Dayanışma Derneği</div>
      </div>
      <p className="mt-3">Yanıcak Köyü · Boğazkale / Çorum</p>
      <p>Dernek Merkezi: Mamak / Ankara</p>
      <div className="mt-3 flex gap-4 text-kum">
        <Link href="/dernek#iletisim">İletişim</Link>
        <Link href="/kvkk">KVKK</Link>
      </div>
      <p className="mt-3 text-[11px] text-kum/50">📲 Tarayıcı menüsünden &ldquo;Ana ekrana ekle&rdquo; diyerek siteyi uygulama gibi kullanabilirsiniz.</p>
    </footer>
  );
}
