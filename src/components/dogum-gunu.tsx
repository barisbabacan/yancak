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

/** Ana sayfadaki herkese açık doğum günü kartı — tebrik kartı görünümü */
export function DogumGunuKartlari() {
  const { rol } = useAuth();
  const kisiler = bugunDoganlar();
  if (!kisiler.length) return null;

  return (
    <section className="px-4 pt-6 lg:h-full lg:p-0">
      <div className="relative overflow-hidden rounded-2xl bg-[#fffaf0] p-1.5 lg:h-full shadow-md shadow-toprak/10 ring-1 ring-bugday/60">
        <Konfeti adet={12} />
        <div className="relative rounded-xl border-2 border-dashed lg:flex lg:h-full lg:flex-col lg:justify-center border-bugday/70 px-4 pt-4 pb-5 text-center">
          <div className="mx-auto -mt-1 mb-3 inline-flex items-center gap-2 rounded-full bg-toprak px-4 py-1.5 text-[14px] font-bold text-krem">
            <Cake className="size-4.5" /> Bugün Doğum Günü
          </div>
          <ul className="space-y-4">
            {kisiler.map((u) => (
              <li key={u.id}>
                <div className="font-serif text-[24px] leading-tight font-bold text-koyu">
                  🎂 {rol === "ziyaretci" ? maskName(u.adSoyad) : u.adSoyad}
                </div>
                {u.yasGoster && <div className="mt-0.5 text-[15px] font-semibold text-[#8a5a12]">{yasHesapla(u.dogumTarihi)} yaşına girdi</div>}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-4 max-w-xs font-serif text-[17px] leading-snug text-toprak italic">
            Nice mutlu, sağlıklı yıllara hemşehrim! İyi ki doğdun.
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
        <div className="relative bg-gradient-to-b from-toprak to-koyu px-6 pt-10 pb-14 text-krem">
          <div className="text-6xl">🎂</div>
          <div className="mt-3 text-[15px] font-bold tracking-[0.15em] text-bugday uppercase">Doğum Günün Kutlu Olsun</div>
          <div className="mt-1 font-serif text-[40px] leading-tight font-bold text-white">{ad}</div>
        </div>
        <div className="relative -mt-8 px-6 pb-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="" className="mx-auto size-16 rounded-full ring-4 ring-krem" />
          <p className="mt-3 font-serif text-[18px] leading-relaxed text-koyu">
            Sevgili {ad}, Yanıcak Köyü ailesi olarak yeni yaşının sana sağlık, huzur ve bereket getirmesini dileriz.
          </p>
          {u.yasGoster && <div className="mt-3 inline-block rounded-full bg-kum px-4 py-1 text-sm font-semibold text-toprak">{yasHesapla(u.dogumTarihi)}. yaşın kutlu olsun 🎉</div>}
          <div className="mt-4 text-xs text-toprak/80">— Yanıcak Köyü Kültür ve Dayanışma Derneği</div>
          <button onClick={() => setAcik(false)} className="mt-5 w-full rounded-full bg-toprak py-3 font-semibold text-krem">
            Teşekkürler 🌾
          </button>
        </div>
      </div>
    </div>
  );
}
