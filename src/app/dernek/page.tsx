import { Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import { DERNEK, KADIN_KOLU, KURUCULAR, RESMI_BELGELER, YONETIM_KURULU, formatDate } from "@/lib/data";
import { KisiGrid, SectionTitle, YonlendirmeKarti } from "@/components/ui";

export const metadata = { title: "Dernek & İletişim" };

export default function DernekSayfasi() {
  return (
    <div className="space-y-12 pb-6">
      {/* Dernek adı */}
      <header className="px-4 pt-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.webp" alt="Dernek logosu" className="mx-auto size-24 rounded-full shadow-lg ring-4 ring-bugday" />
        <h1 className="mt-5 font-serif text-[26px] leading-tight font-bold text-koyu">
          Yanıcak Köyü
          <br />
          Kültür ve Dayanışma Derneği
        </h1>
        <p className="mt-2 text-[15px] text-toprak">
          Kuruluş {DERNEK.kurulus} · Kütük No: {DERNEK.kutukNo}
        </p>
      </header>

      {/* İletişim bilgileri */}
      <section id="iletisim" className="mx-4 -mt-4 scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-sm shadow-toprak/5">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(DERNEK.adres)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 border-b border-kum px-5 py-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-kum text-toprak">
            <MapPin className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-toprak">Adres</div>
            <div className="text-[15px] leading-snug text-koyu">{DERNEK.adres}</div>
            <div className="mt-1 text-[13px] font-bold text-altin">Haritada aç ›</div>
          </div>
        </a>
        <a href={`tel:${DERNEK.telefon.replace(/\D/g, "")}`} className="flex items-center gap-4 border-b border-kum px-5 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-kum text-toprak">
            <Phone className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-toprak">Telefon</div>
            <div className="text-[15px] text-koyu">{DERNEK.telefon}</div>
          </div>
          <span className="rounded-full bg-toprak px-4 py-2 text-[14px] font-bold text-krem">Ara</span>
        </a>
        <a href={`mailto:${DERNEK.eposta}`} className="flex items-center gap-4 px-5 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-kum text-toprak">
            <Mail className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-toprak">E-posta</div>
            <div className="truncate text-[15px] text-koyu">{DERNEK.eposta}</div>
          </div>
          <span className="rounded-full bg-kum px-4 py-2 text-[14px] font-bold text-toprak">Yaz</span>
        </a>
      </section>

      <section>
        <SectionTitle>Yönetim Kurulu</SectionTitle>
        <KisiGrid kisiler={YONETIM_KURULU} />
      </section>

      <section>
        <SectionTitle>Dernek Kurucuları</SectionTitle>
        <KisiGrid kisiler={KURUCULAR} />
      </section>

      <section>
        <SectionTitle>Kadın Kolu</SectionTitle>
        <KisiGrid kisiler={KADIN_KOLU} />
      </section>

      <section>
        <SectionTitle>Resmi Belgeler</SectionTitle>
        <ul className="mx-4 divide-y divide-kum overflow-hidden rounded-3xl bg-white">
          {RESMI_BELGELER.map((b) => (
            <li key={b.ad} className="flex items-center gap-3 px-5 py-4">
              <FileText className="size-5 text-altin" />
              <div className="flex-1">
                <div className="text-[15px] font-medium">{b.ad}</div>
                <div className="text-[13px] text-toprak/80">
                  {formatDate(b.tarih)} · {b.tur}
                </div>
              </div>
              <Download className="size-5 text-toprak/60" />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <YonlendirmeKarti
          href="/koyumuz"
          ust="Köyümüz"
          baslik="Yanıcak Köyü"
          aciklama="Köyün tarihçesi, sülaleler ve soy ağacı"
          gorsel="/ornek/tarla.jpg"
        />
      </section>
    </div>
  );
}
