"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home, Megaphone, Images, Landmark, Menu, X, Lock, Archive, Wallet, Users, Store,
  ClipboardList, TreeDeciduous, MessageSquareText, HeartCrack, Info, ShieldCheck, LogIn, LogOut, UserRound, Settings, ChevronDown,
  MapPin, Phone, Mail,
} from "lucide-react";
import { useAuth, type Rol } from "./auth";

type MenuItem = { href: string; ad: string; icon: React.ElementType; uye?: boolean; yonetici?: boolean };

const MENU_GRUPLARI: { baslik: string; items: MenuItem[] }[] = [
  {
    baslik: "Herkese açık",
    items: [
      { href: "/", ad: "Ana Sayfa", icon: Home },
      { href: "/duyurular", ad: "Duyurular", icon: Megaphone },
      { href: "/vefat", ad: "Vefat ve Taziye", icon: HeartCrack },
      { href: "/koyumuz", ad: "Köyümüz", icon: Landmark },
      { href: "/galeri", ad: "Fotoğraf Galerisi", icon: Images },
      { href: "/dernek", ad: "Dernek & İletişim", icon: Info },
    ],
  },
  {
    baslik: "Üyelere özel",
    items: [
      { href: "/arsiv", ad: "Eski Fotoğraf & Video Arşivi", icon: Archive, uye: true },
      { href: "/soy-agaci", ad: "Sülaleler & Soy Ağacı", icon: TreeDeciduous, uye: true },
      { href: "/kasa", ad: "Kasa & Bağışlar", icon: Wallet, uye: true },
      { href: "/esnaf", ad: "Esnaflarımız", icon: Store, uye: true },
      { href: "/ilanlar", ad: "İlan Panosu", icon: ClipboardList, uye: true },
      { href: "/uyeler", ad: "Üye Listesi", icon: Users, uye: true },
      { href: "/talep", ad: "Dilek, İstek, Şikayet", icon: MessageSquareText, uye: true },
    ],
  },
];

const ALT_MENU = [
  { href: "/", ad: "Ana Sayfa", icon: Home },
  { href: "/duyurular", ad: "Duyurular", icon: Megaphone },
  { href: "/galeri", ad: "Galeri", icon: Images },
  { href: "/koyumuz", ad: "Köyümüz", icon: Landmark },
];

const UST_MENU = [
  { href: "/", ad: "Ana Sayfa" },
  { href: "/duyurular", ad: "Duyurular" },
  { href: "/vefat", ad: "Vefat & Taziye" },
  { href: "/koyumuz", ad: "Köyümüz" },
  { href: "/galeri", ad: "Galeri" },
  { href: "/dernek", ad: "Dernek" },
];

/** Sayfa türüne göre içerik genişliği (geniş ekranlar için) */
function icerikGenisligi(path: string) {
  if (["/", "/galeri", "/arsiv", "/esnaf", "/ilanlar"].includes(path)) return "max-w-6xl";
  if (path === "/giris") return "max-w-md";
  return "max-w-3xl";
}

const ROLLER: { id: Rol; ad: string }[] = [
  { id: "ziyaretci", ad: "Ziyaretçi" },
  { id: "uye", ad: "Üye" },
  { id: "yonetici", ad: "Yönetici" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const [menuAcik, setMenuAcik] = useState(false);
  const [uyeMenuAcik, setUyeMenuAcik] = useState(false);
  const pathname = usePathname();
  const { rol, setRol, kullanici } = useAuth();

  useEffect(() => {
    setMenuAcik(false);
    setUyeMenuAcik(false);
  }, [pathname]);

  const aktif = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="flex min-h-dvh flex-col bg-krem">
      {/* Prototip rol seçici */}
      <div className="bg-koyu">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-1.5 text-[12px] text-kum lg:px-6">
        <span className="font-medium opacity-80">Prototip — şu gözle bak:</span>
        <div className="flex rounded-full bg-white/10 p-0.5">
          {ROLLER.map((r) => (
            <button
              key={r.id}
              onClick={() => setRol(r.id)}
              className={`rounded-full px-2.5 py-0.5 ${rol === r.id ? "bg-bugday font-semibold text-koyu" : "text-kum/80"}`}
            >
              {r.ad}
            </button>
          ))}
        </div>
      </div>
      </div>

      <header className="sticky top-0 z-30 border-b-2 border-bugday/40 bg-krem/95 px-4 py-3 backdrop-blur lg:px-6">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none" aria-label="Ana sayfa">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="Yanıcak Köyü Kültür ve Dayanışma Derneği logosu" className="size-14 shrink-0 rounded-full shadow-md ring-[3px] ring-bugday" />
            <div className="min-w-0">
              <div className="font-serif text-[22px] leading-none font-bold text-toprak">Yanıcak Köyü</div>
              <div className="mt-1 text-[13.5px] leading-snug font-semibold text-koyu">Kültür ve Dayanışma Derneği</div>
              <div className="text-[12px] leading-snug text-toprak">Boğazkale · Çorum · 1994</div>
            </div>
          </Link>
          {/* Masaüstü menü */}
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Ana menü">
            {UST_MENU.map(({ href, ad }) => (
              <Link
                key={href}
                href={href}
                aria-current={aktif(href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${aktif(href) ? "bg-toprak text-krem" : "text-koyu hover:bg-kum"}`}
              >
                {ad}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setUyeMenuAcik((x) => !x)}
                aria-expanded={uyeMenuAcik}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${uyeMenuAcik ? "bg-kum" : "hover:bg-kum"} text-koyu`}
              >
                Üyelere Özel <ChevronDown className={`size-4 transition-transform ${uyeMenuAcik ? "rotate-180" : ""}`} />
              </button>
              {uyeMenuAcik && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUyeMenuAcik(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-3xl bg-white p-2 shadow-xl shadow-toprak/20 ring-1 ring-toprak/10">
                    {MENU_GRUPLARI[1].items.map(({ href, ad, icon: Icon }) => (
                      <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-krem">
                        <span className="flex size-9 items-center justify-center rounded-full bg-kum text-toprak">
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="flex-1 text-[15px] font-medium">{ad}</span>
                        {rol === "ziyaretci" && <Lock className="size-4 text-toprak/50" />}
                      </Link>
                    ))}
                    {rol === "yonetici" && (
                      <Link href="/yonetim" className="mt-1 flex items-center gap-3 rounded-2xl bg-toprak px-3 py-2.5 text-krem">
                        <Settings className="size-5" />
                        <span className="flex-1 font-semibold">Yönetim Paneli</span>
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </nav>

          {kullanici ? (
            <Link href="/profil" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-toprak text-sm font-bold text-krem" aria-label="Profilim">
              {kullanici.adSoyad.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </Link>
          ) : (
            <Link href="/giris" className="flex shrink-0 flex-col items-center gap-0.5 rounded-3xl bg-toprak px-3 py-2 text-[12px] font-semibold text-krem">
              <LogIn className="size-5" /> Giriş
            </Link>
          )}
        </div>
      </header>

      <main className={`mx-auto w-full flex-1 pb-12 lg:px-6 lg:pb-16 ${icerikGenisligi(pathname)}`}>{children}</main>

      <SiteFooter />

      {/* Alt menü */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 bg-koyu shadow-[0_-6px_20px_rgba(46,33,22,0.25)] lg:hidden" aria-label="Alt menü">
        <ul className="mx-auto grid max-w-2xl grid-cols-5 px-1 pt-1.5">
          {ALT_MENU.map(({ href, ad, icon: Icon }) => {
            const on = aktif(href);
            return (
              <li key={href}>
                <Link href={href} aria-current={on ? "page" : undefined} className={`flex flex-col items-center gap-1 pb-1.5 text-[12.5px] font-semibold ${on ? "text-bugday" : "text-krem"}`}>
                  <span className={`flex h-8 w-14 items-center justify-center rounded-full ${on ? "bg-bugday text-koyu" : ""}`}>
                    <Icon className="size-6" strokeWidth={on ? 2.4 : 2} />
                  </span>
                  {ad}
                </Link>
              </li>
            );
          })}
          <li>
            <button onClick={() => setMenuAcik(true)} className="flex w-full flex-col items-center gap-1 pb-1.5 text-[12.5px] font-semibold text-krem">
              <span className="flex h-8 w-14 items-center justify-center rounded-full">
                <Menu className="size-6" strokeWidth={2} />
              </span>
              Menü
            </button>
          </li>
        </ul>
      </nav>

      {/* Menü çekmecesi */}
      {menuAcik && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-koyu/50 md:items-center md:p-6" onClick={() => setMenuAcik(false)}>
          <div
            className="pb-safe max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-krem p-4 md:max-w-lg md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="font-serif text-lg font-bold text-toprak">Menü</div>
              <button onClick={() => setMenuAcik(false)} className="rounded-full bg-kum p-1.5" aria-label="Kapat">
                <X className="size-5" />
              </button>
            </div>

            {kullanici && (
              <div className="mb-4 flex items-center gap-3 rounded-3xl bg-white p-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-toprak font-bold text-krem">
                  {kullanici.adSoyad.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{kullanici.adSoyad}</div>
                  <div className="text-xs text-toprak/85">{rol === "yonetici" ? "Yönetici" : "Dernek Üyesi"}</div>
                </div>
                <Link href="/profil" className="rounded-full bg-kum p-2" aria-label="Profil">
                  <UserRound className="size-4" />
                </Link>
              </div>
            )}

            {rol === "yonetici" && (
              <Link href="/yonetim" className="mb-4 flex items-center gap-3 rounded-3xl bg-toprak p-3 text-krem">
                <Settings className="size-5" />
                <span className="flex-1 font-semibold">Yönetim Paneli</span>
                <span className="rounded-full bg-gunbatimi px-2 py-0.5 text-[12px] font-bold">3 yeni</span>
              </Link>
            )}

            {MENU_GRUPLARI.map((g) => (
              <div key={g.baslik} className="mb-4">
                <div className="mb-1.5 px-1 text-[12px] font-semibold tracking-wide text-toprak/80 uppercase">{g.baslik}</div>
                <ul className="overflow-hidden rounded-3xl bg-white">
                  {g.items.map(({ href, ad, icon: Icon, uye }) => (
                    <li key={href} className="border-b border-kum last:border-0">
                      <Link href={href} className="flex items-center gap-3 px-3.5 py-3">
                        <Icon className="size-5 text-altin" />
                        <span className="flex-1 text-[15px]">{ad}</span>
                        {uye && rol === "ziyaretci" && <Lock className="size-4 text-toprak/40" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex gap-2">
              <Link href="/kvkk" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2.5 text-sm">
                <ShieldCheck className="size-4" /> KVKK Aydınlatma
              </Link>
              {kullanici ? (
                <button onClick={() => setRol("ziyaretci")} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2.5 text-sm text-red-700">
                  <LogOut className="size-4" /> Çıkış
                </button>
              ) : (
                <Link href="/giris" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-toprak px-3 py-2.5 text-sm text-krem">
                  <LogIn className="size-4" /> Üye Girişi
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Site genelinde alt bilgi — mobilde alt menünün üstünde kalacak şekilde boşluklu */
function SiteFooter() {
  return (
    <footer className="rounded-t-[2rem] bg-koyu text-[15px] text-kum lg:rounded-none">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pt-9 pb-36 md:grid-cols-3 lg:px-6 lg:pt-12 lg:pb-12">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="" className="size-14 rounded-full ring-2 ring-bugday" />
            <div>
              <div className="font-serif text-[18px] leading-tight font-bold text-white">Yanıcak Köyü</div>
              <div className="text-[14px] text-kum">Kültür ve Dayanışma Derneği</div>
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-kum/90">
            1994&apos;ten beri Yanıcak Köyü (Boğazkale / Çorum) hemşehrilerini bir araya getiriyoruz.
          </p>
        </div>
        <div>
          <div className="mb-3 text-[13px] font-bold tracking-wider text-bugday uppercase">Bağlantılar</div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {UST_MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="hover:text-white">{m.ad}</Link>
              </li>
            ))}
            <li><Link href="/kvkk" className="hover:text-white">KVKK</Link></li>
            <li><Link href="/giris" className="hover:text-white">Üye Girişi</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[13px] font-bold tracking-wider text-bugday uppercase">İletişim</div>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-bugday" /> Dernek Merkezi: Mamak / Ankara</li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 size-4 shrink-0 text-bugday" /> 0 (312) 000 00 00</li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-bugday" /> iletisim@yanicak.org.tr</li>
          </ul>
          <p className="mt-4 text-[13px] text-kum/80 lg:hidden">📲 Tarayıcı menüsünden &ldquo;Ana ekrana ekle&rdquo; diyerek siteyi uygulama gibi kullanabilirsiniz.</p>
        </div>
      </div>
    </footer>
  );
}
