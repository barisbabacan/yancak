"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Trash2, UserPlus, Megaphone, Wallet, HeartCrack, ShieldCheck, MessageSquareText } from "lucide-react";
import { DUYURU_KATEGORILERI, TALEPLER, UYELER, formatDate, sonYuklenenler } from "@/lib/data";
import { Chip, PageHeader } from "@/components/ui";
import { Alan } from "@/components/galeri";
import { useAuth } from "@/components/auth";

const SEKMELER = [
  { id: "ozet", ad: "Özet" },
  { id: "uye", ad: "Üye Ekle" },
  { id: "duyuru", ad: "Duyuru" },
  { id: "kasa", ad: "Kasa Kaydı" },
  { id: "yetki", ad: "Yetkiler" },
] as const;
type Sekme = (typeof SEKMELER)[number]["id"];

const YETKI_ADLARI: Record<string, string> = { tam: "Tam yetki", duyuru: "Duyuru", kasa: "Kasa", galeri: "Galeri", uye: "Üye yönetimi" };

export default function YonetimSayfasi() {
  const { rol, hazir } = useAuth();
  const [sekme, setSekme] = useState<Sekme>("ozet");

  if (hazir && rol !== "yonetici")
    return (
      <div className="px-4 pt-10 text-center">
        <ShieldCheck className="mx-auto size-12 text-toprak/40" />
        <p className="mt-3 text-toprak/70">Bu sayfa yalnızca yetkili yöneticiler içindir.</p>
        <p className="mt-1 text-xs text-toprak/50">(Prototip: üstteki şeritten &ldquo;Yönetici&rdquo;yi seçin.)</p>
      </div>
    );

  return (
    <>
      <PageHeader title="Yönetim Paneli" subtitle="Telefondan hızlıca içerik yönetin" />
      <div className="no-scrollbar sticky top-[61px] z-20 flex gap-2 overflow-x-auto bg-krem/95 px-4 py-2 backdrop-blur">
        {SEKMELER.map((s) => (
          <Chip key={s.id} active={sekme === s.id} onClick={() => setSekme(s.id)}>
            {s.ad}
          </Chip>
        ))}
      </div>
      <div className="px-4 pt-2">
        {sekme === "ozet" && <Ozet git={setSekme} />}
        {sekme === "uye" && <UyeEkle />}
        {sekme === "duyuru" && <DuyuruEkle />}
        {sekme === "kasa" && <KasaKaydi />}
        {sekme === "yetki" && <Yetkiler />}
      </div>
    </>
  );
}

function Ozet({ git }: { git: (s: Sekme) => void }) {
  const [yuklenenler, setYuklenenler] = useState(sonYuklenenler());
  const yeniTalep = TALEPLER.filter((t) => t.durum === "Yeni");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-2">
        {[
          { ad: "Üye Ekle", icon: UserPlus, s: "uye" as Sekme },
          { ad: "Duyuru", icon: Megaphone, s: "duyuru" as Sekme },
          { ad: "Kasa", icon: Wallet, s: "kasa" as Sekme },
          { ad: "Vefat", icon: HeartCrack, s: "duyuru" as Sekme },
        ].map(({ ad, icon: Icon, s }) => (
          <button key={ad} onClick={() => git(s)} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 text-xs font-medium">
            <span className="flex size-10 items-center justify-center rounded-xl bg-toprak text-krem">
              <Icon className="size-5" />
            </span>
            {ad}
          </button>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-4">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-semibold">Son yüklenen görseller</h2>
          <span className="rounded-full bg-gunbatimi px-2 py-0.5 text-[11px] font-bold text-white">{yuklenenler.length} yeni</span>
        </div>
        <p className="mb-3 text-xs text-toprak/60">Üye yüklemeleri onaysız yayına girer. Uygunsuz olanları buradan kaldırabilirsiniz.</p>
        <ul className="space-y-2">
          {yuklenenler.map((f) => (
            <li key={f.id} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src.replace("800/600", "200/200")} alt="" className={`size-14 rounded-xl object-cover ${f.arsiv ? "sepia-photo" : ""}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{f.baslik}</div>
                <div className="text-xs text-toprak/55">
                  {f.yukleyen} · {f.arsiv ? "Arşiv" : "Galeri"}
                </div>
              </div>
              <Link href={`/galeri/${f.id}`} className="rounded-full bg-kum p-2" aria-label="Görüntüle">
                <Eye className="size-4" />
              </Link>
              <button onClick={() => setYuklenenler(yuklenenler.filter((x) => x.id !== f.id))} className="rounded-full bg-red-50 p-2 text-red-700" aria-label="Kaldır">
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
          {!yuklenenler.length && <li className="py-2 text-center text-sm text-emerald-700">✓ Hepsi gözden geçirildi</li>}
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-4">
        <div className="mb-2 flex items-center gap-2">
          <MessageSquareText className="size-5 text-altin" />
          <h2 className="flex-1 font-semibold">Yeni dilek / şikayetler</h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">{yeniTalep.length}</span>
        </div>
        {yeniTalep.map((t) => (
          <div key={t.id} className="rounded-xl bg-krem p-3">
            <div className="text-xs text-toprak/55">
              {t.tur} · {t.anonim ? "Anonim" : t.yazan} · {formatDate(t.tarih, { day: "numeric", month: "short" })}
            </div>
            <div className="font-medium">{t.konu}</div>
            <p className="text-sm text-toprak/75">{t.mesaj}</p>
            <textarea rows={2} placeholder="Cevabınız…" className="mt-2 w-full rounded-lg border border-toprak/15 bg-white p-2 text-sm" />
            <button className="mt-1 w-full rounded-lg bg-toprak py-2 text-sm font-semibold text-krem">Cevapla</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function Basarili({ mesaj, sifirla }: { mesaj: string; sifirla: () => void }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center">
      <div className="text-4xl">✅</div>
      <div className="mt-2 font-semibold">{mesaj}</div>
      <button onClick={sifirla} className="mt-4 rounded-full bg-kum px-5 py-2 text-sm font-semibold">
        Yeni kayıt
      </button>
    </div>
  );
}

function UyeEkle() {
  const [ok, setOk] = useState(false);
  if (ok) return <Basarili mesaj="Üye kaydedildi. Giriş bilgileri SMS ile gönderildi." sifirla={() => setOk(false)} />;
  return (
    <form
      className="space-y-3 rounded-3xl bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setOk(true);
      }}
    >
      <Alan etiket="Adı Soyadı" placeholder="Ad Soyad" />
      <Alan etiket="E-posta" type="email" placeholder="ornek@mail.com" />
      <Alan etiket="Telefon" type="tel" placeholder="05xx xxx xx xx" />
      <div className="grid grid-cols-2 gap-2">
        <Alan etiket="Doğum tarihi" type="date" />
        <Alan etiket="Kayıt tarihi" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
      </div>
      <label className="block text-sm font-medium text-toprak">
        Cinsiyet
        <div className="mt-1 grid grid-cols-2 gap-2">
          {["Kadın", "Erkek"].map((c) => (
            <label key={c} className="flex items-center gap-2 rounded-xl border border-toprak/15 px-3 py-2.5">
              <input type="radio" name="cinsiyet" className="accent-toprak" /> {c}
            </label>
          ))}
        </div>
      </label>
      <Alan etiket="Mesleği" placeholder="Ör. Öğretmen" />
      <Alan etiket="Ev adresi" placeholder="Mahalle, ilçe / il" textarea />
      <label className="flex items-start gap-2 rounded-xl bg-krem p-3 text-xs text-toprak/75">
        <input type="checkbox" required className="mt-0.5 size-4 accent-toprak" />
        Üyeye KVKK aydınlatma metni okutuldu; doğum gününün sitede kutlanmasına açık rızası alındı.
      </label>
      <button className="w-full rounded-xl bg-toprak py-3 font-semibold text-krem">Üyeyi Kaydet</button>
    </form>
  );
}

function DuyuruEkle() {
  const [ok, setOk] = useState(false);
  const [kat, setKat] = useState<string>("dernek");
  if (ok) return <Basarili mesaj="Duyuru yayınlandı, üyelere bildirim gönderildi." sifirla={() => setOk(false)} />;
  return (
    <form
      className="space-y-3 rounded-3xl bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setOk(true);
      }}
    >
      <div>
        <div className="mb-1 text-sm font-medium">Kategori</div>
        <div className="flex flex-wrap gap-1.5">
          {DUYURU_KATEGORILERI.map((k) => (
            <Chip key={k.id} active={kat === k.id} onClick={() => setKat(k.id)}>
              {k.ad}
            </Chip>
          ))}
        </div>
      </div>
      <Alan etiket="Başlık" placeholder="Duyuru başlığı" />
      <Alan etiket="Metin" placeholder="Duyuru metni…" textarea />
      {(kat === "etkinlik" || kat === "dernek") && (
        <div className="grid grid-cols-2 gap-2">
          <Alan etiket="Etkinlik tarihi" type="date" />
          <Alan etiket="Yer" placeholder="Köy meydanı" />
        </div>
      )}
      {kat === "vefat" && (
        <>
          <Alan etiket="Cenaze bilgisi" placeholder="Namaz, cami, defin yeri" />
          <Alan etiket="Mevlit (varsa)" placeholder="Tarih ve yer" />
          <Alan etiket="Taziye adresi" placeholder="Taziye kabul yeri" />
        </>
      )}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-4 accent-toprak" /> Ana sayfada öne çıkar
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked className="size-4 accent-toprak" /> Üyelere bildirim gönder
      </label>
      <button className="w-full rounded-xl bg-toprak py-3 font-semibold text-krem">Yayınla</button>
    </form>
  );
}

function KasaKaydi() {
  const [ok, setOk] = useState(false);
  const [tur, setTur] = useState<"gelir" | "gider">("gelir");
  const [kategori, setKategori] = useState("Bağış");
  if (ok) return <Basarili mesaj="Kasa kaydı eklendi." sifirla={() => setOk(false)} />;
  return (
    <form
      className="space-y-3 rounded-3xl bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setOk(true);
      }}
    >
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-kum p-1 text-sm">
        {(["gelir", "gider"] as const).map((t) => (
          <button type="button" key={t} onClick={() => setTur(t)} className={`rounded-lg py-2 ${tur === t ? (t === "gelir" ? "bg-emerald-600 font-semibold text-white" : "bg-orange-600 font-semibold text-white") : ""}`}>
            {t === "gelir" ? "Gelir" : "Gider"}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(tur === "gelir" ? ["Bağış", "Aidat", "Kermes", "Diğer"] : ["Kira", "Fatura", "Onarım", "Yardım", "Etkinlik", "Diğer"]).map((k) => (
          <Chip key={k} active={kategori === k} onClick={() => setKategori(k)}>
            {k}
          </Chip>
        ))}
      </div>
      <Alan etiket="Tutar (₺)" type="number" placeholder="0" />
      <Alan etiket="Açıklama" placeholder="Ör. Kasım aidatları" />
      <Alan etiket="Tarih" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
      {tur === "gelir" && kategori === "Bağış" && (
        <>
          <Alan etiket="Bağışçı" placeholder="Ad Soyad" />
          <label className="flex items-center gap-2 rounded-xl bg-krem p-3 text-sm">
            <input type="checkbox" className="size-4 accent-toprak" /> İsmi görünmesin (anonim)
          </label>
        </>
      )}
      <Alan etiket="Dekont / fiş fotoğrafı" type="file" />
      <button className="w-full rounded-xl bg-toprak py-3 font-semibold text-krem">Kaydet</button>
    </form>
  );
}

function Yetkiler() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-toprak/70">Üyelere site yönetimi için ayrı yetkiler verebilirsiniz.</p>
      {UYELER.filter((u) => u.yetkiler.length).map((u) => (
        <div key={u.id} className="rounded-2xl bg-white p-3.5">
          <div className="font-medium">{u.adSoyad}</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.entries(YETKI_ADLARI).map(([id, ad]) => (
              <span key={id} className={`rounded-full px-2.5 py-1 text-xs ${u.yetkiler.includes(id) || u.yetkiler.includes("tam") ? "bg-toprak text-krem" : "bg-kum text-toprak/60"}`}>
                {ad}
              </span>
            ))}
          </div>
        </div>
      ))}
      <button className="w-full rounded-2xl border-2 border-dashed border-bugday py-3 text-sm font-semibold">+ Üyeye yetki ver</button>
    </div>
  );
}
