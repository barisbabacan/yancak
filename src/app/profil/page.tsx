"use client";

import { useState } from "react";
import { Bell, Cake, LogOut } from "lucide-react";
import { formatDate } from "@/lib/data";
import { Avatar, PageHeader, UyeKapisi } from "@/components/ui";
import { useAuth } from "@/components/auth";

export default function ProfilSayfasi() {
  return (
    <>
      <PageHeader title="Profilim" />
      <UyeKapisi baslik="Profilinizi görmek için giriş yapın">
        <Icerik />
      </UyeKapisi>
    </>
  );
}

function Icerik() {
  const { kullanici, setRol } = useAuth();
  const [yas, setYas] = useState(kullanici!.yasGoster);
  const [bildirim, setBildirim] = useState(true);
  const u = kullanici!;

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-4 rounded-3xl bg-white p-4">
        <Avatar name={u.adSoyad} size="lg" dark />
        <div>
          <div className="font-serif text-xl font-bold text-toprak">{u.adSoyad}</div>
          <div className="text-sm text-toprak/65">{u.meslek}</div>
          <div className="text-xs text-toprak/50">Üyelik: {formatDate(u.kayitTarihi)}</div>
        </div>
      </div>

      <div className="divide-y divide-kum rounded-2xl bg-white">
        <Toggle
          icon={<Cake className="size-5 text-altin" />}
          baslik="Doğum günümde yaşım görünsün"
          aciklama="Kapalıyken kutlama kartında yaşınız yazmaz."
          deger={yas}
          onChange={setYas}
        />
        <Toggle icon={<Bell className="size-5 text-altin" />} baslik="Yeni duyuru bildirimleri" aciklama="Telefonunuza bildirim gelir." deger={bildirim} onChange={setBildirim} />
      </div>

      <div className="rounded-2xl bg-white p-4 text-sm">
        <div className="mb-2 font-semibold text-toprak">Kayıtlı bilgilerim</div>
        <dl className="grid grid-cols-[110px_1fr] gap-y-1.5 text-toprak/80">
          <dt className="text-toprak/55">E-posta</dt>
          <dd>{u.eposta}</dd>
          <dt className="text-toprak/55">Telefon</dt>
          <dd>{u.telefon}</dd>
          <dt className="text-toprak/55">Doğum tarihi</dt>
          <dd>{formatDate(u.dogumTarihi)}</dd>
          <dt className="text-toprak/55">Adres</dt>
          <dd>{u.adres}</dd>
          <dt className="text-toprak/55">Cinsiyet</dt>
          <dd>{u.cinsiyet}</dd>
        </dl>
        <p className="mt-3 text-xs text-toprak/50">Bilgilerinizde değişiklik için yönetimle iletişime geçin.</p>
      </div>

      <button onClick={() => setRol("ziyaretci")} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-semibold text-red-700">
        <LogOut className="size-4" /> Çıkış Yap
      </button>
    </div>
  );
}

function Toggle({ icon, baslik, aciklama, deger, onChange }: { icon: React.ReactNode; baslik: string; aciklama: string; deger: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!deger)} className="flex w-full items-center gap-3 p-4 text-left">
      {icon}
      <span className="flex-1">
        <span className="block text-[15px] font-medium">{baslik}</span>
        <span className="text-xs text-toprak/55">{aciklama}</span>
      </span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition ${deger ? "bg-emerald-600" : "bg-stone-300"}`}>
        <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${deger ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}
