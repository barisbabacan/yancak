"use client";

import { useEffect, useState } from "react";
import { Cake, X } from "lucide-react";
import { bugunDoganlar, maskName, yasHesapla, type Uye } from "@/lib/data";
import { useAuth } from "./auth";

const RENKLER = ["#e2702a", "#d9a441", "#6b4423", "#c0392b", "#2e8b57", "#f3e7cf"];

function Konfeti({ adet = 18 }: { adet?: number }) {
  return (
    <div className="konfeti pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: adet }).map((_, i) => (
        <span
          key={i}
          style={{ left: `${(i * 97) % 100}%`, background: RENKLER[i % RENKLER.length], animationDelay: `${(i * 0.37) % 3}s` }}
        />
      ))}
    </div>
  );
}

/** Ana sayfadaki herkese açık doğum günü kartı */
export function DogumGunuKartlari() {
  const { rol } = useAuth();
  const kisiler = bugunDoganlar();
  if (!kisiler.length) return null;

  return (
    <section className="px-4 pt-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gunbatimi via-altin to-toprak p-5 text-white shadow-lg shadow-gunbatimi/30">
        <Konfeti />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/90">
            <Cake className="size-5" /> Bugün doğum günü olanlar
          </div>
          <div className="space-y-3">
            {kisiler.map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                <div className="flex size-12 items-center justify-center rounded-full bg-white text-2xl">🎂</div>
                <div className="flex-1">
                  <div className="font-serif text-lg leading-tight font-bold">{rol === "ziyaretci" ? maskName(u.adSoyad) : u.adSoyad}</div>
                  <div className="text-[13px] text-white/85">
                    {u.yasGoster ? `${yasHesapla(u.dogumTarihi)} yaşına girdi · ` : ""}İyi ki doğdun!
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center font-serif text-[15px] italic">
            &ldquo;Nice mutlu, sağlıklı yıllara hemşehrim!&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

/** Doğum günü olan üye siteye girdiğinde açılan kişisel karşılama */
export function KisiselDogumGunu() {
  const { kullanici } = useAuth();
  const [acik, setAcik] = useState(false);
  const [u, setU] = useState<Uye | null>(null);

  useEffect(() => {
    if (!kullanici) return;
    const bugun = bugunDoganlar().find((x) => x.id === kullanici.id);
    if (!bugun) return;
    const key = `dg-${kullanici.id}-${new Date().toDateString()}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    setU(bugun);
    setAcik(true);
  }, [kullanici]);

  if (!acik || !u) return null;
  const ad = u.adSoyad.split(" ")[0];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-koyu/70 p-6" onClick={() => setAcik(false)}>
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#fff4dc] to-krem text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Konfeti adet={28} />
        <button onClick={() => setAcik(false)} className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-1.5" aria-label="Kapat">
          <X className="size-5" />
        </button>
        <div className="relative bg-gradient-to-br from-gunbatimi via-altin to-toprak px-6 pt-10 pb-14 text-white">
          <div className="text-6xl">🎂</div>
          <div className="mt-3 text-sm tracking-[0.2em] uppercase opacity-90">Doğum Günün Kutlu Olsun</div>
          <div className="mt-1 font-serif text-4xl font-bold">{ad}</div>
        </div>
        <div className="relative -mt-8 px-6 pb-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="" className="mx-auto size-16 rounded-full ring-4 ring-krem" />
          <p className="mt-3 font-serif text-[17px] leading-relaxed text-toprak">
            Sevgili {ad}, Yanıcak Köyü ailesi olarak yeni yaşının sana sağlık, huzur ve bereket getirmesini dileriz.
          </p>
          {u.yasGoster && <div className="mt-3 inline-block rounded-full bg-kum px-4 py-1 text-sm font-semibold text-toprak">{yasHesapla(u.dogumTarihi)}. yaşın kutlu olsun 🎉</div>}
          <div className="mt-4 text-xs text-toprak/60">— Yanıcak Köyü Kültür ve Dayanışma Derneği</div>
          <button onClick={() => setAcik(false)} className="mt-5 w-full rounded-full bg-toprak py-3 font-semibold text-krem">
            Teşekkürler 🌾
          </button>
        </div>
      </div>
    </div>
  );
}
