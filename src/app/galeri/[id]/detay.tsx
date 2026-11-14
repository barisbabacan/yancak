"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Plus, UserRound, UserSearch } from "lucide-react";
import { formatDate, maskName, type Foto } from "@/lib/data";
import { useAuth } from "@/components/auth";
import { Avatar, PageHeader, UyeKapisi } from "@/components/ui";

function youtubeId(url: string) {
  return url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];
}

export function FotoDetay({ foto }: { foto: Foto }) {
  const icerik = <Icerik foto={foto} />;
  return (
    <>
      <PageHeader title="" back={foto.arsiv ? "/arsiv" : "/galeri"} />
      {foto.arsiv ? <UyeKapisi baslik="Bu fotoğraf üye arşivindedir">{icerik}</UyeKapisi> : icerik}
    </>
  );
}

function Icerik({ foto }: { foto: Foto }) {
  const { kullanici, rol } = useAuth();
  const [kisiler, setKisiler] = useState(foto.kisiler);
  const [yorumlar, setYorumlar] = useState(foto.yorumlar);
  const [yorum, setYorum] = useState("");
  const [kisiFormu, setKisiFormu] = useState(false);
  const [kisiAd, setKisiAd] = useState("");
  const [kisiKonum, setKisiKonum] = useState("");
  const ad = (n: string) => (rol === "ziyaretci" ? maskName(n) : n);
  const yt = foto.youtube && youtubeId(foto.youtube);

  return (
    <div className="pb-4">
      <div className="bg-koyu">
        {yt ? (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${yt}`}
            title={foto.baslik}
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto.src.replace("800/600", "1200/900")} alt={foto.baslik} className={`max-h-[70dvh] w-full object-contain ${foto.arsiv ? "sepia-photo" : ""}`} />
        )}
      </div>

      <div className="px-4 pt-4">
        <h1 className="font-serif text-2xl font-bold text-toprak">{foto.baslik}</h1>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-toprak/65">
          {foto.yil && (
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" /> {foto.yil}
            </span>
          )}
          {foto.yer && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" /> {foto.yer}
            </span>
          )}
          <span className="flex items-center gap-1">
            <UserRound className="size-3.5" /> {ad(foto.yukleyen)} · {formatDate(foto.yuklemeTarihi, { day: "numeric", month: "short" })}
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-toprak/85">{foto.aciklama}</p>
      </div>

      {/* Fotoğraftaki kişiler */}
      <section className="mx-4 mt-5 rounded-2xl bg-white p-4">
        <div className="mb-2 flex items-center gap-2">
          <UserSearch className="size-5 text-altin" />
          <h2 className="flex-1 font-semibold">Fotoğraftakiler</h2>
          {kullanici && (
            <button onClick={() => setKisiFormu((x) => !x)} className="flex items-center gap-1 rounded-full bg-kum px-2.5 py-1 text-xs font-semibold">
              <Plus className="size-3.5" /> Kişi ekle
            </button>
          )}
        </div>
        {kisiler.length === 0 && <p className="text-sm text-toprak/60">Henüz kimse eklenmedi. Fotoğraftakileri tanıyorsanız ekleyin!</p>}
        <ul className="space-y-1.5">
          {kisiler.map((k, i) => (
            <li key={i} className={`flex justify-between gap-3 rounded-xl px-3 py-2 text-sm ${k.ad === "?" ? "bg-gunbatimi/10" : "bg-krem"}`}>
              <span className="font-semibold">{k.ad === "?" ? "❓ Tanıyan var mı?" : k.ad}</span>
              <span className="text-right text-toprak/60">{k.konum}</span>
            </li>
          ))}
        </ul>
        {kisiFormu && (
          <div className="mt-3 space-y-2">
            <input value={kisiAd} onChange={(e) => setKisiAd(e.target.value)} placeholder="Kişinin adı (ör. Kılıçların Hasan)" className="w-full rounded-xl border border-toprak/15 px-3 py-2 text-[15px]" />
            <input value={kisiKonum} onChange={(e) => setKisiKonum(e.target.value)} placeholder="Fotoğraftaki yeri (ör. ön sıra soldan 3.)" className="w-full rounded-xl border border-toprak/15 px-3 py-2 text-[15px]" />
            <button
              onClick={() => {
                if (!kisiAd.trim()) return;
                setKisiler([...kisiler, { ad: kisiAd.trim(), konum: kisiKonum.trim() }]);
                setKisiAd("");
                setKisiKonum("");
                setKisiFormu(false);
              }}
              className="w-full rounded-xl bg-toprak py-2.5 text-sm font-semibold text-krem"
            >
              Ekle
            </button>
          </div>
        )}
      </section>

      {/* Yorumlar */}
      <section className="mt-5 px-4">
        <h2 className="mb-2 font-semibold">Yorumlar & Hatıralar ({yorumlar.length})</h2>
        <ul className="space-y-2">
          {yorumlar.map((y, i) => (
            <li key={i} className="flex gap-3 rounded-2xl bg-white p-3">
              <Avatar name={y.yazan} size="sm" />
              <div className="min-w-0">
                <div className="text-sm font-semibold">
                  {ad(y.yazan)} <span className="font-normal text-toprak/50">· {formatDate(y.tarih, { day: "numeric", month: "short" })}</span>
                </div>
                <p className="text-[15px] text-toprak/85">{y.mesaj}</p>
              </div>
            </li>
          ))}
        </ul>
        {kullanici ? (
          <div className="mt-3 flex gap-2">
            <input
              value={yorum}
              onChange={(e) => setYorum(e.target.value)}
              placeholder="Bu fotoğrafla ilgili hatıranızı yazın…"
              className="min-w-0 flex-1 rounded-full border border-toprak/15 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-bugday"
            />
            <button
              onClick={() => {
                if (!yorum.trim()) return;
                setYorumlar([...yorumlar, { yazan: kullanici.adSoyad, mesaj: yorum.trim(), tarih: new Date().toISOString() }]);
                setYorum("");
              }}
              className="rounded-full bg-toprak px-4 text-sm font-semibold text-krem"
            >
              Gönder
            </button>
          </div>
        ) : (
          <p className="mt-3 rounded-2xl bg-kum p-3 text-center text-sm">
            Yorum yazmak için <Link href="/giris" className="font-semibold text-altin">üye girişi</Link> yapın.
          </p>
        )}
      </section>
    </div>
  );
}
