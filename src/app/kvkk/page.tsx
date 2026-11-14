import { DERNEK } from "@/lib/data";
import { PageHeader } from "@/components/ui";

export const metadata = { title: "KVKK Aydınlatma Metni" };

// TASLAK — yayına almadan önce bir hukukçuya kontrol ettirilmelidir.
export default function KvkkSayfasi() {
  return (
    <>
      <PageHeader title="KVKK Aydınlatma Metni" subtitle="Kişisel verilerin korunması hakkında bilgilendirme" />
      <div className="mx-4 mb-3 rounded-xl bg-gunbatimi/10 p-3 text-xs text-toprak/80">
        ⚠️ Taslak metindir. Yayına almadan önce bir hukukçuya kontrol ettirilmesi önerilir.
      </div>
      <article className="mx-4 mb-6 space-y-7 rounded-3xl bg-white p-5 text-[15.5px] leading-relaxed text-toprak/85 [&_h2]:mb-2 [&_h2]:text-[17px] [&_h2]:font-bold [&_h2]:text-toprak">
        <section>
          <h2>1. Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca veri sorumlusu, {DERNEK.adres} adresinde
            bulunan {DERNEK.ad}&apos;dir (&ldquo;Dernek&rdquo;).
          </p>
        </section>
        <section>
          <h2>2. İşlenen Kişisel Veriler</h2>
          <p>
            Üyelerimizin adı soyadı, e-posta adresi, telefon numarası, doğum tarihi, ev adresi, mesleği, cinsiyeti, dernek kayıt
            tarihi; sitede paylaştığı fotoğraf, yorum, taziye mesajı, ilan ve talepler ile esnaf bilgileri işlenmektedir.
          </p>
        </section>
        <section>
          <h2>3. İşleme Amaçları</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>5253 sayılı Dernekler Kanunu kapsamında üye kayıtlarının tutulması,</li>
            <li>Üyelerle iletişim kurulması, duyuru ve etkinlik bilgilendirmesi,</li>
            <li>Aidat, bağış ve dernek mali kayıtlarının üyelere şeffaf biçimde sunulması,</li>
            <li>Üyelerin doğum günlerinin kutlanması (üyenin tercihine göre yaş bilgisi gizlenebilir),</li>
            <li>Sitenin üyelere özel bölümlerine erişimin sağlanması.</li>
          </ul>
        </section>
        <section>
          <h2>4. Hukuki Sebep ve Toplama Yöntemi</h2>
          <p>
            Veriler; üyelik başvuru formu ve dernek yönetimi aracılığıyla toplanır. KVKK m.5/2 (c) sözleşmenin ifası, (ç) hukuki
            yükümlülük ve (f) meşru menfaat ile, doğum gününün herkese açık kutlanması gibi işlemler bakımından m.5/1 açık rıza
            hukuki sebeplerine dayanılarak işlenir.
          </p>
        </section>
        <section>
          <h2>5. Kimlerin Görebileceği</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Herkese açık sayfalarda yalnızca adınız ve soyadınızın ilk iki harfi görünür.</li>
            <li>Telefon ve adres bilgileriniz yalnızca dernek yönetimi tarafından görülür.</li>
            <li>Üye listesi yalnızca giriş yapmış dernek üyelerine gösterilir.</li>
            <li>Bağışlarınızı &ldquo;ismim görünmesin&rdquo; seçeneğiyle anonim yapabilirsiniz.</li>
          </ul>
          <p className="mt-1">Veriler, kanuni zorunluluklar dışında üçüncü kişilere aktarılmaz.</p>
        </section>
        <section>
          <h2>6. Haklarınız</h2>
          <p>
            KVKK m.11 uyarınca verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve itiraz etme
            haklarına sahipsiniz. Başvurularınızı {DERNEK.eposta} adresine iletebilirsiniz.
          </p>
        </section>
      </article>
    </>
  );
}
