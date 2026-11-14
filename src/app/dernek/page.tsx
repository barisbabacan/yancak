import { Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import { DERNEK, KADIN_KOLU, KURUCULAR, RESMI_BELGELER, YONETIM_KURULU, formatDate } from "@/lib/data";
import { KisiGrid, PageHeader, SectionTitle } from "@/components/ui";

export const metadata = { title: "Dernek & İletişim" };

export default function DernekSayfasi() {
  return (
    <div className="space-y-7">
      <PageHeader title="Derneğimiz" subtitle={`${DERNEK.ad} · Kuruluş ${DERNEK.kurulus}`} />

      <section id="iletisim" className="mx-4 scroll-mt-20 overflow-hidden rounded-3xl bg-white">
        <div className="bg-gradient-to-br from-toprak to-koyu p-4 text-krem">
          <div className="font-serif text-lg font-bold">İletişim</div>
          <div className="text-xs text-krem/70">Dernek Kütük No: {DERNEK.kutukNo}</div>
        </div>
        <a href={`https://maps.google.com/?q=${encodeURIComponent(DERNEK.adres)}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 border-b border-kum p-4">
          <MapPin className="size-5 shrink-0 text-altin" />
          <div>
            <div className="text-sm font-semibold">Dernek Merkezi</div>
            <div className="text-sm text-toprak/70">{DERNEK.adres}</div>
            <div className="mt-0.5 text-xs font-semibold text-altin">Haritada aç ›</div>
          </div>
        </a>
        <div className="grid grid-cols-2">
          <a href={`tel:${DERNEK.telefon.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 border-r border-kum p-4 text-sm font-semibold">
            <Phone className="size-4 text-altin" /> Ara
          </a>
          <a href={`mailto:${DERNEK.eposta}`} className="flex items-center justify-center gap-2 p-4 text-sm font-semibold">
            <Mail className="size-4 text-altin" /> E-posta
          </a>
        </div>
      </section>

      <section>
        <SectionTitle>Yönetim Kurulu</SectionTitle>
        <KisiGrid kisiler={YONETIM_KURULU} />
      </section>

      <section>
        <SectionTitle>Kadın Kolu</SectionTitle>
        <KisiGrid kisiler={KADIN_KOLU} />
      </section>

      <section>
        <SectionTitle>Kurucu Üyeler</SectionTitle>
        <KisiGrid kisiler={KURUCULAR} />
      </section>

      <section>
        <SectionTitle>Resmi Belgeler</SectionTitle>
        <ul className="mx-4 divide-y divide-kum overflow-hidden rounded-2xl bg-white">
          {RESMI_BELGELER.map((b) => (
            <li key={b.ad} className="flex items-center gap-3 p-3.5">
              <FileText className="size-5 text-altin" />
              <div className="flex-1">
                <div className="text-[15px] font-medium">{b.ad}</div>
                <div className="text-xs text-toprak/55">{formatDate(b.tarih)} · {b.tur}</div>
              </div>
              <Download className="size-5 text-toprak/40" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
