"use client";

import Link from "next/link";
import { useState } from "react";
import { ImagePlus, PlayCircle, Upload, X } from "lucide-react";
import { type Foto } from "@/lib/data";
import { Chip } from "./ui";
import { useAuth } from "./auth";

export function GaleriIzgara({ fotolar, sepia }: { fotolar: Foto[]; sepia?: boolean }) {
  const albumler = Array.from(new Set(fotolar.map((f) => f.album)));
  const [album, setAlbum] = useState<string>("hepsi");
  const liste = fotolar.filter((f) => album === "hepsi" || f.album === album);

  return (
    <>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2">
        <Chip active={album === "hepsi"} onClick={() => setAlbum("hepsi")}>
          Tümü
        </Chip>
        {albumler.map((a) => (
          <Chip key={a} active={album === a} onClick={() => setAlbum(a)}>
            {a}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pt-1">
        {liste.map((f) => (
          <Link key={f.id} href={`/galeri/${f.id}`} className="group relative overflow-hidden rounded-2xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src.replace("800/600", "500/500")} alt={f.baslik} className={`aspect-square w-full object-cover ${sepia ? "sepia-photo" : ""}`} />
            {f.youtube && <PlayCircle className="absolute top-2 right-2 size-8 text-white drop-shadow" />}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-koyu/85 to-transparent p-2.5 pt-8 text-white">
              <div className="line-clamp-1 text-[13px] font-semibold">{f.baslik}</div>
              <div className="flex gap-2 text-[11px] text-white/75">
                {f.yil && <span>{f.yil}</span>}
                {f.yorumlar.length > 0 && <span>💬 {f.yorumlar.length}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

/** Üyelerin fotoğraf / YouTube videosu yüklemesi (onaysız, yönetici sonradan gözden geçirir) */
export function YuklemeButonu({ arsiv }: { arsiv?: boolean }) {
  const { rol } = useAuth();
  const [acik, setAcik] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);
  const [tur, setTur] = useState<"foto" | "video">("foto");
  if (rol === "ziyaretci") return null;

  return (
    <>
      <button
        onClick={() => {
          setAcik(true);
          setGonderildi(false);
        }}
        className="fixed right-4 bottom-24 z-30 flex items-center gap-2 rounded-full bg-gunbatimi px-4 py-3 font-semibold text-white shadow-lg shadow-gunbatimi/40 md:right-[calc(50%-20rem)]"
      >
        <ImagePlus className="size-5" /> Yükle
      </button>
      {acik && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-koyu/50" onClick={() => setAcik(false)}>
          <div className="pb-safe w-full max-w-md rounded-t-3xl bg-krem p-4 md:max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-serif text-lg font-bold text-toprak">{arsiv ? "Arşive ekle" : "Fotoğraf / video ekle"}</div>
              <button onClick={() => setAcik(false)} className="rounded-full bg-kum p-1.5" aria-label="Kapat">
                <X className="size-5" />
              </button>
            </div>
            {gonderildi ? (
              <div className="py-8 text-center">
                <div className="text-4xl">✅</div>
                <div className="mt-2 font-semibold">Yüklendi, teşekkürler!</div>
                <p className="text-sm text-toprak/70">Paylaşımınız galeride yayında.</p>
              </div>
            ) : (
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setGonderildi(true);
                }}
              >
                <div className="flex rounded-xl bg-kum p-1 text-sm">
                  {(["foto", "video"] as const).map((t) => (
                    <button type="button" key={t} onClick={() => setTur(t)} className={`flex-1 rounded-lg py-2 ${tur === t ? "bg-white font-semibold shadow-sm" : ""}`}>
                      {t === "foto" ? "Fotoğraf" : "YouTube Videosu"}
                    </button>
                  ))}
                </div>
                {tur === "foto" ? (
                  <label className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-dashed border-bugday/60 bg-white py-6 text-sm text-toprak/70">
                    <Upload className="size-7 text-altin" />
                    Fotoğraf seç veya çek
                    <input type="file" accept="image/*" multiple className="hidden" />
                  </label>
                ) : (
                  <Alan etiket="YouTube bağlantısı" placeholder="https://youtube.com/watch?v=…" />
                )}
                <Alan etiket="Başlık" placeholder="Ör. Harman zamanı" />
                <Alan etiket="Açıklama / hikâyesi" placeholder="Fotoğrafta neler var, kim çekti…" textarea />
                {arsiv && (
                  <div className="grid grid-cols-2 gap-2">
                    <Alan etiket="Yaklaşık yıl" placeholder="1965" />
                    <Alan etiket="Yer" placeholder="Köy meydanı" />
                  </div>
                )}
                <button className="w-full rounded-xl bg-toprak py-3 font-semibold text-krem">Paylaş</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function Alan({ etiket, placeholder, textarea, type = "text", defaultValue }: { etiket: string; placeholder?: string; textarea?: boolean; type?: string; defaultValue?: string }) {
  const cls = "mt-1 w-full rounded-xl border border-toprak/15 bg-white px-3 py-2.5 text-[15px] outline-none focus:border-bugday";
  return (
    <label className="block text-sm font-medium text-toprak">
      {etiket}
      {textarea ? <textarea rows={3} placeholder={placeholder} defaultValue={defaultValue} className={cls} /> : <input type={type} placeholder={placeholder} defaultValue={defaultValue} className={cls} />}
    </label>
  );
}
