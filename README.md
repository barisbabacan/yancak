# Yanıcak Köyü Kültür ve Dayanışma Derneği — Web Sitesi

Mobil öncelikli dernek sitesi. **Şu an prototip aşamasında:** veriler `src/lib/data.ts` içindeki örnek verilerdir, formlar kayıt yapmaz.

## Çalıştırma

```bash
npm install
npm run dev -- -p 3107
```

## Yayın (Railway)

`main` dalına yapılan her push Railway'de otomatik olarak derlenip yayınlanır (`npm run build` → `npm start`).

Sayfanın en üstündeki şeritten **Ziyaretçi / Üye / Yönetici** seçerek siteye farklı gözlerle bakabilirsiniz. Demo "Üye" hesabının bugün doğum günü olduğu için kişisel doğum günü kartı açılır.

## Sayfalar

| Herkese açık | Üyelere özel | Yönetici |
|---|---|---|
| Ana sayfa (doğum günü kartı, öne çıkan duyuru, vefat bandı, etkinlikler) | Eski fotoğraf & video arşivi | Yönetim paneli: son yüklenen görseller, talepler |
| Duyurular (kategori filtresi, WhatsApp paylaş) | Fotoğraf yorumları, fotoğraftaki kişiler | Üye ekleme formu |
| Vefat & taziye | Taziye mesajı bırakma | Duyuru / vefat ekleme |
| Köyümüz: tarihçe, kurucular, Osmanlı belgeleri | Sülaleler & soy ağacı | Kasa kaydı (anonim bağış seçeneği) |
| Fotoğraf galerisi | Kasa, gelir-gider, bağışçılar, IBAN | Yetkiler |
| Dernek: iletişim, yönetim kurulu, kadın kolu, belgeler | Esnaflar, ilan panosu, üye listesi | |
| KVKK aydınlatma metni (taslak) | Dilek-istek-şikayet (anonim seçenek), profil | |

Herkese açık sayfalarda kişi isimleri `Ahmet Yı.` şeklinde gösterilir.

## Gerçek sürüm için yapılacaklar

- MongoDB modelleri ve API (üyeler, duyurular, fotoğraflar, kasa, talepler…)
- Gerçek oturum açma (telefon/e-posta + şifre), rol ve yetki kontrolü sunucu tarafında
- Fotoğraf yükleme için dosya depolama (ör. S3 uyumlu depolama / Cloudinary)
- Yeni duyuru push bildirimleri (`public/sw.js` içinde iskeleti var)
- KVKK metninin hukukçuya kontrol ettirilmesi
- Örnek görsellerin (`public/ornek/`) gerçek fotoğraflarla değiştirilmesi
