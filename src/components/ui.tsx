"use client";

import Link from "next/link";
import { ChevronLeft, Lock, Share2 } from "lucide-react";
import { useAuth } from "./auth";
import { initials, maskName, type Kisi } from "@/lib/data";

export function PageHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: string }) {
  return (
    <div className="px-4 pt-4 pb-2">
      {back && (
        <Link href={back} className="mb-1 inline-flex items-center gap-0.5 text-sm text-toprak/70">
          <ChevronLeft className="size-4" /> Geri
        </Link>
      )}
      <h1 className="font-serif text-2xl font-bold text-toprak">{title}</h1>
      {subtitle && <p className="mt-0.5 text-sm text-toprak/70">{subtitle}</p>}
    </div>
  );
}

export function SectionTitle({ children, href, linkText = "Tümü" }: { children: React.ReactNode; href?: string; linkText?: string }) {
  return (
    <div className="mb-2 flex items-end justify-between px-4">
      <h2 className="font-serif text-lg font-bold text-toprak">{children}</h2>
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
    <div className="grid grid-cols-3 gap-2 px-4 sm:grid-cols-4">
      {kisiler.map((k) => (
        <div key={k.adSoyad + k.gorev} className="flex flex-col items-center rounded-2xl bg-white p-3 text-center">
          <Avatar name={k.adSoyad} />
          <div className="mt-2 text-[13px] leading-tight font-semibold">
            <KisiAdi name={k.adSoyad} />
          </div>
          <div className="mt-0.5 text-[11px] leading-tight text-toprak/60">{k.gorev}</div>
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
    <div className="mx-4 mt-4 rounded-3xl border border-bugday/40 bg-gradient-to-b from-white to-kum p-6 text-center">
      <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-toprak text-krem">
        <Lock className="size-6" />
      </div>
      <h2 className="font-serif text-lg font-bold text-toprak">{baslik}</h2>
      <p className="mt-1 text-sm text-toprak/70">
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
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#25D366] font-semibold text-white ${compact ? "px-2.5 py-1 text-xs" : "px-4 py-2.5 text-sm"}`}
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
  return <div className={`rounded-2xl bg-white p-4 shadow-sm shadow-toprak/5 ${className}`}>{children}</div>;
}
