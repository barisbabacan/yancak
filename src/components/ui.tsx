"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock, Share2 } from "lucide-react";
import { useAuth } from "./auth";
import { initials, maskName, type Kisi } from "@/lib/data";

export function PageHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: string }) {
  return (
    <div className={`px-4 ${title ? "pt-7 pb-6 lg:pt-12 lg:pb-8" : "pt-5 pb-4 lg:pt-8"}`}>
      {back && (
        <Link href={back} className="mb-1 inline-flex items-center gap-0.5 text-sm text-toprak/85">
          <ChevronLeft className="size-4" /> Geri
        </Link>
      )}
      {title && <h1 className="font-serif text-[27px] leading-tight font-bold text-koyu lg:text-[36px]">{title}</h1>}
      {subtitle && <p className="mt-2 text-[15px] leading-relaxed text-toprak/85">{subtitle}</p>}
    </div>
  );
}

export function SectionTitle({ children, href, linkText = "Tümü" }: { children: React.ReactNode; href?: string; linkText?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between px-4">
      <h2 className="font-serif text-[20px] font-bold text-koyu">{children}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-altin">
          {linkText} ›
        </Link>
      )}
    </div>
  );
}

export function Avatar({ name, size = "md", dark }: { name: string; size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const s = size === "lg" ? "size-20 text-xl" : size === "sm" ? "size-9 text-xs" : "size-14 text-base";
  return (
    <div className={`${s} flex shrink-0 items-center justify-center rounded-full font-bold ${dark ? "bg-toprak text-krem" : "bg-kum text-toprak"} ring-2 ring-white`}>
      {initials(name)}
    </div>
  );
}

/** Herkese açık sayfalarda isim maskeli gösterilir, üyeler tam ismi görür */
export function KisiAdi({ name }: { name: string }) {
  const { rol } = useAuth();
  return <>{rol === "ziyaretci" ? maskName(name) : name}</>;
}

export function KisiGrid({ kisiler }: { kisiler: Kisi[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 sm:grid-cols-4">
      {kisiler.map((k) => (
        <div key={k.adSoyad + k.gorev} className="flex flex-col items-center rounded-3xl bg-white px-2 py-4 text-center">
          <Avatar name={k.adSoyad} />
          <div className="mt-2 text-[13px] leading-tight font-semibold">
            <KisiAdi name={k.adSoyad} />
          </div>
          <div className="mt-0.5 text-[12px] leading-tight text-toprak/80">{k.gorev}</div>
        </div>
      ))}
    </div>
  );
}

/** Üyelere özel içerik kapısı */
export function UyeKapisi({ children, baslik = "Bu bölüm üyelerimize özeldir" }: { children: React.ReactNode; baslik?: string }) {
  const { rol, hazir } = useAuth();
  if (!hazir) return <div className="h-40" />;
  if (rol !== "ziyaretci") return <>{children}</>;
  return (
    <div className="mx-4 mt-2 rounded-3xl border border-bugday/40 bg-gradient-to-b from-white to-kum p-6 text-center">
      <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-toprak text-krem">
        <Lock className="size-6" />
      </div>
      <h2 className="font-serif text-lg font-bold text-toprak">{baslik}</h2>
      <p className="mt-1 text-sm text-toprak/85">
        Görmek için üye girişi yapın. Dernek üyesiyseniz ve hesabınız yoksa yönetimimizle iletişime geçin; kaydınızı onlar oluşturur.
      </p>
      <Link href="/giris" className="mt-4 inline-block rounded-full bg-toprak px-5 py-2.5 text-sm font-semibold text-krem">
        Üye Girişi
      </Link>
      <Link href="/dernek#iletisim" className="mt-2 block text-sm text-altin">
        Yönetimle iletişim
      </Link>
    </div>
  );
}

export function WhatsAppPaylas({ text, url, compact }: { text: string; url: string; compact?: boolean }) {
  const href = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#0f7a5c] font-bold text-white ${compact ? "px-2.5 py-1 text-xs" : "px-4 py-2.5 text-sm"}`}
    >
      <Share2 className={compact ? "size-3.5" : "size-4"} />
      WhatsApp{compact ? "" : "'ta Paylaş"}
    </a>
  );
}

export function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition ${
        active ? "border-toprak bg-toprak text-krem" : "border-toprak/15 bg-white text-toprak"
      }`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-white p-4 shadow-sm shadow-toprak/5 ${className}`}>{children}</div>;
}

/** Başka bir sayfaya yönlendiren görsel kart */
export function YonlendirmeKarti({
  href,
  ust,
  baslik,
  aciklama,
  gorsel,
  logo,
}: {
  href: string;
  ust: string;
  baslik: string;
  aciklama: string;
  gorsel?: string;
  logo?: boolean;
}) {
  return (
    <Link href={href} className="relative mx-4 block overflow-hidden rounded-3xl bg-koyu text-white shadow-lg shadow-toprak/20 active:scale-[0.99]">
      {gorsel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={gorsel} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div className={`absolute inset-0 ${gorsel ? "bg-gradient-to-r from-koyu via-koyu/85 to-koyu/30" : "bg-gradient-to-br from-toprak to-koyu"}`} />
      <div className="relative flex items-center gap-4 p-5">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logo.webp" alt="" className="size-14 shrink-0 rounded-full ring-[3px] ring-bugday" />
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-bold tracking-wider text-bugday uppercase">{ust}</div>
          <div className="mt-1 font-serif text-[20px] leading-tight font-bold">{baslik}</div>
          <div className="mt-1.5 text-[14px] leading-snug text-white/85">{aciklama}</div>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bugday text-koyu">
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}
