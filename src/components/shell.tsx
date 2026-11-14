"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home, Megaphone, Images, Landmark, Menu, X, Lock, Archive, Wallet, Users, Store,
  ClipboardList, TreeDeciduous, MessageSquareText, HeartCrack, Info, ShieldCheck, LogIn, LogOut, UserRound, Settings,
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

const ROLLER: { id: Rol; ad: string }[] = [
  { id: "ziyaretci", ad: "Ziyaretçi" },
  { id: "uye", ad: "Üye" },
  { id: "yonetici", ad: "Yönetici" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const [menuAcik, setMenuAcik] = useState(false);
  const pathname = usePathname();
  const { rol, setRol, kullanici } = useAuth();

  useEffect(() => setMenuAcik(false), [pathname]);

  const aktif = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-krem shadow-xl shadow-toprak/10 md:max-w-2xl">
      {/* Prototip rol seçici */}
      <div className="flex items-center justify-between gap-2 bg-koyu px-3 py-1.5 text-[11px] text-kum">
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

      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-toprak/10 bg-krem/95 px-4 py-2.5 backdrop-blur">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="" className="size-10 shrink-0 rounded-full ring-2 ring-bugday/60" />
          <div className="min-w-0 leading-tight">
            <div className="font-serif text-[17px] font-bold text-toprak">Yanıcak Köyü</div>
            <div className="truncate text-[11px] text-toprak/70">Kültür ve Dayanışma Derneği</div>
          </div>
        </Link>
        {kullanici ? (
          <Link href="/profil" className="flex size-9 items-center justify-center rounded-full bg-toprak text-xs font-bold text-krem" aria-label="Profilim">
            {kullanici.adSoyad.split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </Link>
        ) : (
          <Link href="/giris" className="flex items-center gap-1 rounded-full bg-toprak px-3 py-1.5 text-xs font-semibold text-krem">
            <LogIn className="size-3.5" /> Üye Girişi
          </Link>
        )}
      </header>

      <main className="pb-24">{children}</main>

      {/* Alt menü */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-toprak/10 bg-white/95 backdrop-blur md:max-w-2xl">
        <ul className="grid grid-cols-5">
          {ALT_MENU.map(({ href, ad, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={`flex flex-col items-center gap-0.5 pt-2 pb-1 text-[10.5px] ${aktif(href) ? "font-semibold text-altin" : "text-toprak/60"}`}>
                <Icon className="size-[22px]" strokeWidth={aktif(href) ? 2.4 : 1.8} />
                {ad}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={() => setMenuAcik(true)} className="flex w-full flex-col items-center gap-0.5 pt-2 pb-1 text-[10.5px] text-toprak/60">
              <Menu className="size-[22px]" strokeWidth={1.8} />
              Menü
            </button>
          </li>
        </ul>
      </nav>

      {/* Menü çekmecesi */}
      {menuAcik && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-koyu/50" onClick={() => setMenuAcik(false)}>
          <div
            className="pb-safe max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-krem p-4 md:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="font-serif text-lg font-bold text-toprak">Menü</div>
              <button onClick={() => setMenuAcik(false)} className="rounded-full bg-kum p-1.5" aria-label="Kapat">
                <X className="size-5" />
              </button>
            </div>

            {kullanici && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white p-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-toprak font-bold text-krem">
                  {kullanici.adSoyad.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{kullanici.adSoyad}</div>
                  <div className="text-xs text-toprak/70">{rol === "yonetici" ? "Yönetici" : "Dernek Üyesi"}</div>
                </div>
                <Link href="/profil" className="rounded-full bg-kum p-2" aria-label="Profil">
                  <UserRound className="size-4" />
                </Link>
              </div>
            )}

            {rol === "yonetici" && (
              <Link href="/yonetim" className="mb-4 flex items-center gap-3 rounded-2xl bg-toprak p-3 text-krem">
                <Settings className="size-5" />
                <span className="flex-1 font-semibold">Yönetim Paneli</span>
                <span className="rounded-full bg-gunbatimi px-2 py-0.5 text-[11px] font-bold">3 yeni</span>
              </Link>
            )}

            {MENU_GRUPLARI.map((g) => (
              <div key={g.baslik} className="mb-4">
                <div className="mb-1.5 px-1 text-[11px] font-semibold tracking-wide text-toprak/60 uppercase">{g.baslik}</div>
                <ul className="overflow-hidden rounded-2xl bg-white">
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
