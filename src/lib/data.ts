// PROTOTİP ÖRNEK VERİLERİ
// Gerçek sürümde bu veriler MongoDB'den gelecek ve yönetim panelinden düzenlenecek.

export const DERNEK = {
  ad: "Yanıcak Köyü Kültür ve Dayanışma Derneği",
  kisaAd: "Yanıcak Derneği",
  kurulus: 1994,
  koy: "Yanıcak Köyü",
  konum: "Boğazkale / Çorum",
  adres: "Örnek Mah. Dernek Sok. No: 12/3, Mamak / Ankara",
  telefon: "0 (312) 000 00 00",
  eposta: "iletisim@yanicak.org.tr",
  kutukNo: "06-000-000",
  iban: [
    { banka: "Ziraat Bankası", alici: "Yanıcak Köyü Kültür ve Dayanışma Derneği", iban: "TR00 0001 0000 0000 0000 0000 00" },
    { banka: "Vakıfbank", alici: "Yanıcak Köyü Kültür ve Dayanışma Derneği", iban: "TR00 0001 5000 0000 0000 0000 00" },
  ],
};

/** "Ahmet Yılmaz" → "Ahmet Yı." — herkese açık sayfalarda kullanılır */
export function maskName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return full;
  const soyad = parts.pop()!;
  return `${parts.join(" ")} ${soyad.slice(0, 2)}.`;
}

export function initials(full: string) {
  return full
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toLocaleUpperCase("tr-TR");
}

export function formatTL(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Date(iso).toLocaleDateString("tr-TR", opts);
}

// Prototip görselleri: logodan kırpılmış yerel örnekler (gerçek fotoğraflarla değiştirilecek)
const ORNEK = ["hasat", "orakci", "traktor", "tarla", "gunbatimi", "agac", "bugday", "gokyuzu"];
const pic = (seed: string, _w?: number, _h?: number) => {
  void _w; void _h;
  if (seed.startsWith("osmanli")) return "/ornek/belge.svg";
  const n = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  return `/ornek/${ORNEK[n % ORNEK.length]}.jpg`;
};

// Tarihleri bugüne göre üretelim ki prototip her gün "canlı" görünsün
const today = new Date();
function daysFromToday(n: number) {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function birthdayToday(year: number) {
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

// ---------------- ÜYELER ----------------
export type Uye = {
  id: string;
  adSoyad: string;
  eposta: string;
  telefon: string;
  dogumTarihi: string;
  adres: string;
  meslek: string;
  kayitTarihi: string;
  cinsiyet: "Kadın" | "Erkek";
  yasGoster: boolean;
  yetkiler: string[]; // ör. "duyuru", "kasa", "galeri", "uye", "tam"
  sulale?: string;
};

export const UYELER: Uye[] = [
  { id: "u1", adSoyad: "Hüseyin Karaca", eposta: "huseyin@ornek.com", telefon: "0532 000 00 01", dogumTarihi: "1958-03-12", adres: "Mamak / Ankara", meslek: "Emekli öğretmen", kayitTarihi: "1994-05-20", cinsiyet: "Erkek", yasGoster: true, yetkiler: ["tam"], sulale: "Karacalar" },
  { id: "u2", adSoyad: "Mehmet Yıldırım", eposta: "mehmet@ornek.com", telefon: "0532 000 00 02", dogumTarihi: birthdayToday(1971), adres: "Keçiören / Ankara", meslek: "İnşaat mühendisi", kayitTarihi: "2001-09-02", cinsiyet: "Erkek", yasGoster: true, yetkiler: ["kasa"], sulale: "Yıldırımlar" },
  { id: "u3", adSoyad: "Ayşe Demirtaş", eposta: "ayse@ornek.com", telefon: "0532 000 00 03", dogumTarihi: birthdayToday(1985), adres: "Çankaya / Ankara", meslek: "Hemşire", kayitTarihi: "2012-04-14", cinsiyet: "Kadın", yasGoster: false, yetkiler: ["duyuru"], sulale: "Demirtaşlar" },
  { id: "u4", adSoyad: "Ali Osman Kılıç", eposta: "ali@ornek.com", telefon: "0532 000 00 04", dogumTarihi: "1966-07-30", adres: "Sungurlu / Çorum", meslek: "Çiftçi", kayitTarihi: "1994-05-20", cinsiyet: "Erkek", yasGoster: true, yetkiler: [], sulale: "Kılıçlar" },
  { id: "u5", adSoyad: "Fatma Karaca", eposta: "fatma@ornek.com", telefon: "0532 000 00 05", dogumTarihi: "1962-11-02", adres: "Mamak / Ankara", meslek: "Ev hanımı", kayitTarihi: "1998-02-11", cinsiyet: "Kadın", yasGoster: true, yetkiler: ["galeri"], sulale: "Karacalar" },
  { id: "u6", adSoyad: "Emre Aslan", eposta: "emre@ornek.com", telefon: "0532 000 00 06", dogumTarihi: "1990-01-19", adres: "Etimesgut / Ankara", meslek: "Yazılımcı", kayitTarihi: "2019-06-01", cinsiyet: "Erkek", yasGoster: true, yetkiler: ["galeri", "duyuru"], sulale: "Aslanlar" },
  { id: "u7", adSoyad: "Zeynep Yıldırım", eposta: "zeynep@ornek.com", telefon: "0532 000 00 07", dogumTarihi: "1979-05-08", adres: "Yenimahalle / Ankara", meslek: "Öğretmen", kayitTarihi: "2008-10-10", cinsiyet: "Kadın", yasGoster: false, yetkiler: [], sulale: "Yıldırımlar" },
  { id: "u8", adSoyad: "Mustafa Demirtaş", eposta: "mustafa@ornek.com", telefon: "0532 000 00 08", dogumTarihi: "1955-09-21", adres: "Çorum Merkez", meslek: "Esnaf (bakkal)", kayitTarihi: "1994-05-20", cinsiyet: "Erkek", yasGoster: true, yetkiler: [], sulale: "Demirtaşlar" },
  { id: "u9", adSoyad: "Hatice Kılıç", eposta: "hatice@ornek.com", telefon: "0532 000 00 09", dogumTarihi: "1974-12-25", adres: "Sincan / Ankara", meslek: "Terzi", kayitTarihi: "2005-03-03", cinsiyet: "Kadın", yasGoster: true, yetkiler: [], sulale: "Kılıçlar" },
  { id: "u10", adSoyad: "Osman Aslan", eposta: "osman@ornek.com", telefon: "0532 000 00 10", dogumTarihi: "1968-08-14", adres: "İstanbul / Esenyurt", meslek: "Nakliyeci", kayitTarihi: "2003-07-17", cinsiyet: "Erkek", yasGoster: true, yetkiler: [], sulale: "Aslanlar" },
];

export function bugunDoganlar() {
  return UYELER.filter((u) => {
    const d = new Date(u.dogumTarihi);
    return d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
  });
}
export function yasHesapla(iso: string) {
  return today.getFullYear() - new Date(iso).getFullYear();
}

// ---------------- DERNEK KADROLARI ----------------
export type Kisi = { adSoyad: string; gorev: string; foto?: string };

export const KURUCULAR: Kisi[] = [
  { adSoyad: "Hüseyin Karaca", gorev: "Kurucu Başkan" },
  { adSoyad: "Mustafa Demirtaş", gorev: "Kurucu Üye" },
  { adSoyad: "Ali Osman Kılıç", gorev: "Kurucu Üye" },
  { adSoyad: "İbrahim Aslan", gorev: "Kurucu Üye (merhum)" },
  { adSoyad: "Halil Yıldırım", gorev: "Kurucu Üye (merhum)" },
];

export const YONETIM_KURULU: Kisi[] = [
  { adSoyad: "Hüseyin Karaca", gorev: "Başkan" },
  { adSoyad: "Emre Aslan", gorev: "Başkan Yardımcısı" },
  { adSoyad: "Mehmet Yıldırım", gorev: "Sayman" },
  { adSoyad: "Ayşe Demirtaş", gorev: "Sekreter" },
  { adSoyad: "Osman Aslan", gorev: "Üye" },
];

export const KADIN_KOLU: Kisi[] = [
  { adSoyad: "Fatma Karaca", gorev: "Kadın Kolu Başkanı" },
  { adSoyad: "Zeynep Yıldırım", gorev: "Üye" },
  { adSoyad: "Hatice Kılıç", gorev: "Üye" },
  { adSoyad: "Ayşe Demirtaş", gorev: "Üye" },
];

export const RESMI_BELGELER = [
  { ad: "Dernek Tüzüğü", tur: "PDF", tarih: "2019-03-10" },
  { ad: "Kuruluş Bildirimi", tur: "PDF", tarih: "1994-05-20" },
  { ad: "Son Genel Kurul Tutanağı", tur: "PDF", tarih: "2025-04-06" },
  { ad: "Faaliyet Raporu 2025", tur: "PDF", tarih: "2026-01-15" },
];

// ---------------- DUYURULAR ----------------
export const DUYURU_KATEGORILERI = [
  { id: "vefat", ad: "Vefat", renk: "bg-stone-900 text-white", yazi: "text-stone-900" },
  { id: "sehit", ad: "Şehit", renk: "bg-red-800 text-white", yazi: "text-red-800" },
  { id: "dernek", ad: "Dernek", renk: "bg-amber-800 text-white", yazi: "text-amber-800" },
  { id: "etkinlik", ad: "Etkinlik", renk: "bg-emerald-800 text-white", yazi: "text-emerald-800" },
  { id: "gundem", ad: "Ülke Gündemi", renk: "bg-sky-800 text-white", yazi: "text-sky-800" },
  { id: "koy", ad: "Köyden", renk: "bg-orange-800 text-white", yazi: "text-orange-800" },
] as const;
export type DuyuruKategori = (typeof DUYURU_KATEGORILERI)[number]["id"];

export type Duyuru = {
  id: string;
  baslik: string;
  ozet: string;
  icerik: string;
  kategori: DuyuruKategori;
  tarih: string;
  sabit?: boolean;
  etkinlikTarihi?: string;
  yer?: string;
  gorsel?: string;
};

export const DUYURULAR: Duyuru[] = [
  {
    id: "d1",
    baslik: "Geleneksel Yanıcak Köyü Pilav Günü",
    ozet: "Her yıl düzenlediğimiz pilav günümüze tüm hemşehrilerimiz ailecek davetlidir.",
    icerik:
      "Değerli hemşehrilerimiz,\n\nDerneğimizin geleneksel pilav günü bu yıl da köy meydanında yapılacaktır. Ankara'dan kalkacak otobüs için yer ayırtmak isteyenler sekreterimize ulaşabilir.\n\nProgram: 10:00 Kur'an-ı Kerim tilaveti, 12:00 pilav ikramı, 14:00 güreş ve çocuk yarışmaları.",
    kategori: "etkinlik",
    tarih: daysFromToday(-2),
    sabit: true,
    etkinlikTarihi: daysFromToday(12),
    yer: "Yanıcak Köyü Meydanı",
    gorsel: "/ornek/hasat.jpg",
  },
  {
    id: "d2",
    baslik: "Vefat: Hacı Ömer Kılıç",
    ozet: "Köyümüzden Hacı Ömer Kılıç Hakk'ın rahmetine kavuşmuştur.",
    icerik:
      "Köyümüzden Ali Osman Kılıç'ın babası Hacı Ömer Kılıç (88) Hakk'ın rahmetine kavuşmuştur. Cenazesi ikindi namazına müteakip köy camiinden kaldırılarak köy mezarlığına defnedilecektir. Merhuma Allah'tan rahmet, ailesine ve yakınlarına başsağlığı dileriz.",
    kategori: "vefat",
    tarih: daysFromToday(-1),
  },
  {
    id: "d3",
    baslik: "Olağan Genel Kurul Toplantısı",
    ozet: "Derneğimizin olağan genel kurulu dernek merkezinde yapılacaktır.",
    icerik:
      "Derneğimizin olağan genel kurul toplantısı dernek merkezimizde yapılacaktır. Çoğunluk sağlanamazsa toplantı bir hafta sonra aynı yer ve saatte yapılacaktır.\n\nGündem: Açılış, yoklama, faaliyet ve denetim raporlarının okunması, yönetim kurulu seçimi, dilek ve temenniler.",
    kategori: "dernek",
    tarih: daysFromToday(-4),
    etkinlikTarihi: daysFromToday(25),
    yer: "Dernek Merkezi, Mamak",
  },
  {
    id: "d4",
    baslik: "Köy Camii Çatı Onarımı Tamamlandı",
    ozet: "Bağışlarınızla başlatılan cami çatı onarımı tamamlandı. Katkı veren herkese teşekkürler.",
    icerik:
      "Geçen bahar başlattığımız köy camii çatı onarımı tamamlanmıştır. Toplam harcama ve bağışçı listesi üyelerimize kasa bölümünde açıklanmıştır. Emeği geçen herkese teşekkür ederiz.",
    kategori: "koy",
    tarih: daysFromToday(-7),
    gorsel: "/ornek/gunbatimi.jpg",
  },
  {
    id: "d5",
    baslik: "Şehidimizi Rahmetle Anıyoruz",
    ozet: "Şehit Piyade Er Yusuf Aslan'ı şehadetinin yıl dönümünde rahmetle anıyoruz.",
    icerik: "Şehadetinin yıl dönümünde köyümüzün evladı Şehit Piyade Er Yusuf Aslan'ı rahmet ve minnetle anıyoruz. Mekânı cennet olsun.",
    kategori: "sehit",
    tarih: daysFromToday(-9),
  },
  {
    id: "d6",
    baslik: "Kadın Kolu Kermesi",
    ozet: "Kadın kolumuzun düzenlediği kermesin geliri köy okulunun onarımına aktarılacaktır.",
    icerik: "Kadın kolumuz el emeği ürünler ve ev yemeklerinden oluşan bir kermes düzenliyor. Tüm hemşehrilerimizi bekliyoruz.",
    kategori: "etkinlik",
    tarih: daysFromToday(-10),
    etkinlikTarihi: daysFromToday(5),
    yer: "Dernek Merkezi, Mamak",
  },
  {
    id: "d7",
    baslik: "Kış Lastiği Uygulaması Başladı",
    ozet: "Köye kış aylarında gidecek hemşehrilerimizin araçlarında kış lastiği bulundurmaları zorunludur.",
    icerik: "Bölge Trafik Müdürlüğü'nün açıklamasına göre kış lastiği uygulaması başlamıştır. Köy yolunda buzlanmaya dikkat ediniz.",
    kategori: "gundem",
    tarih: daysFromToday(-12),
  },
];

// ---------------- VEFAT / TAZİYE ----------------
export type Vefat = {
  id: string;
  adSoyad: string;
  yas: number;
  yakinlik: string;
  tarih: string;
  cenaze: string;
  mevlit?: string;
  taziyeAdresi: string;
  mesajlar: { yazan: string; mesaj: string; tarih: string }[];
};
export const VEFATLAR: Vefat[] = [
  {
    id: "v1",
    adSoyad: "Hacı Ömer Kılıç",
    yas: 88,
    yakinlik: "Ali Osman Kılıç'ın babası",
    tarih: daysFromToday(-1),
    cenaze: "İkindi namazına müteakip Yanıcak Köyü Camii, köy mezarlığına defin",
    mevlit: `${formatDate(daysFromToday(6))} Cumartesi, öğle namazından sonra köy camiinde`,
    taziyeAdresi: "Sungurlu / Çorum — oğlu Ali Osman Kılıç'ın evi",
    mesajlar: [
      { yazan: "Hüseyin Karaca", mesaj: "Mekânı cennet olsun. Ailesine sabır diliyorum.", tarih: daysFromToday(-1) },
      { yazan: "Fatma Karaca", mesaj: "Allah rahmet eylesin, başımız sağ olsun.", tarih: daysFromToday(-1) },
      { yazan: "Emre Aslan", mesaj: "Çocukluğumuzda hep bize harman yerinde hikâye anlatırdı. Nur içinde yatsın.", tarih: daysFromToday(0) },
    ],
  },
  {
    id: "v2",
    adSoyad: "Emine Demirtaş",
    yas: 79,
    yakinlik: "Mustafa Demirtaş'ın eşi",
    tarih: daysFromToday(-40),
    cenaze: "Öğle namazına müteakip Mamak Merkez Camii",
    taziyeAdresi: "Dernek Merkezi, Mamak",
    mesajlar: [{ yazan: "Zeynep Yıldırım", mesaj: "Allah rahmet eylesin.", tarih: daysFromToday(-39) }],
  },
];

// ---------------- GALERİ ----------------
export type Foto = {
  id: string;
  baslik: string;
  aciklama: string;
  yil?: string;
  yer?: string;
  album: string;
  src: string;
  arsiv: boolean; // true = sadece üyeler
  youtube?: string; // video ise
  yukleyen: string;
  yuklemeTarihi: string;
  kisiler: { ad: string; konum: string }[];
  yorumlar: { yazan: string; mesaj: string; tarih: string }[];
};



export const FOTOLAR: Foto[] = [
  { id: "f1", baslik: "Pilav günü 2025", aciklama: "Geçen yılki pilav gününden kareler.", album: "Etkinlikler", src: pic("yanicak1"), arsiv: false, yukleyen: "Emre Aslan", yuklemeTarihi: daysFromToday(-1), kisiler: [], yorumlar: [{ yazan: "Zeynep Yıldırım", mesaj: "Ne güzel bir gündü!", tarih: daysFromToday(-1) }] },
  { id: "f2", baslik: "Köy meydanı", aciklama: "Bahar aylarında köy meydanı.", album: "Köyden", src: pic("yanicak2"), arsiv: false, yukleyen: "Fatma Karaca", yuklemeTarihi: daysFromToday(0), kisiler: [], yorumlar: [] },
  { id: "f3", baslik: "Harman zamanı", aciklama: "Ziyaretçimizin çektiği harman fotoğrafı.", album: "Ziyaretçilerden", src: pic("yanicak3"), arsiv: false, yukleyen: "Osman Aslan", yuklemeTarihi: daysFromToday(0), kisiler: [], yorumlar: [] },
  { id: "f4", baslik: "Kermes hazırlığı", aciklama: "Kadın kolumuz kermes hazırlığında.", album: "Etkinlikler", src: pic("yanicak4"), arsiv: false, yukleyen: "Hatice Kılıç", yuklemeTarihi: daysFromToday(-3), kisiler: [], yorumlar: [] },
  { id: "f5", baslik: "Köy çeşmesi", aciklama: "Yenilenen köy çeşmesi.", album: "Köyden", src: pic("yanicak5"), arsiv: false, yukleyen: "Emre Aslan", yuklemeTarihi: daysFromToday(-5), kisiler: [], yorumlar: [] },
  { id: "f6", baslik: "Gün batımı", aciklama: "Tarlalardan gün batımı.", album: "Ziyaretçilerden", src: pic("yanicak6"), arsiv: false, yukleyen: "Mehmet Yıldırım", yuklemeTarihi: daysFromToday(-8), kisiler: [], yorumlar: [] },
  // ARŞİV (yalnızca üyeler)
  {
    id: "a1", baslik: "Köy okulu öğrencileri", aciklama: "Köy ilkokulunun ilk mezunları öğretmenleriyle birlikte. Fotoğraf okulun önünde çekilmiş.", yil: "1962", yer: "Yanıcak Köy İlkokulu",
    album: "Eski Fotoğraflar", src: pic("eski1"), arsiv: true, yukleyen: "Hüseyin Karaca", yuklemeTarihi: daysFromToday(-20),
    kisiler: [{ ad: "Öğretmen Rıza Bey", konum: "Arka sıra, ortada" }, { ad: "Mustafa Demirtaş", konum: "Ön sıra, soldan 2." }, { ad: "?", konum: "Ön sıra, sağ başta — tanıyan var mı?" }],
    yorumlar: [
      { yazan: "Mustafa Demirtaş", mesaj: "Ön sırada soldan ikinci benim, yanımdaki rahmetli Halil.", tarih: daysFromToday(-18) },
      { yazan: "Ali Osman Kılıç", mesaj: "Sağ baştaki Kılıçların Hasan olabilir.", tarih: daysFromToday(-2) },
    ],
  },
  {
    id: "a2", baslik: "Düğün alayı", aciklama: "Karacaların düğününden. Gelin at üstünde köye getiriliyor.", yil: "1971", yer: "Köy girişi", album: "Eski Fotoğraflar", src: pic("eski2"), arsiv: true, yukleyen: "Fatma Karaca", yuklemeTarihi: daysFromToday(0),
    kisiler: [{ ad: "Hasan Karaca (damat)", konum: "Önde, atın yanında" }], yorumlar: [],
  },
  { id: "a3", baslik: "Harman yeri", aciklama: "Döven ile harman sürülürken.", yil: "1958", yer: "Aşağı harman", album: "Eski Fotoğraflar", src: pic("eski3"), arsiv: true, yukleyen: "Ali Osman Kılıç", yuklemeTarihi: daysFromToday(-30), kisiler: [], yorumlar: [] },
  { id: "a4", baslik: "Köy camii (eski hali)", aciklama: "Caminin ahşap minareli eski hali.", yil: "1965", album: "Eski Fotoğraflar", src: pic("eski4"), arsiv: true, yukleyen: "Hüseyin Karaca", yuklemeTarihi: daysFromToday(-30), kisiler: [], yorumlar: [] },
  { id: "a5", baslik: "Askere uğurlama", aciklama: "Köyden askere giden gençler davul zurnayla uğurlanıyor.", yil: "1976", album: "Eski Fotoğraflar", src: pic("eski5"), arsiv: true, yukleyen: "Osman Aslan", yuklemeTarihi: daysFromToday(-12), kisiler: [], yorumlar: [] },
  { id: "a6", baslik: "Yaşlılarımız anlatıyor (video)", aciklama: "Köyün eskilerinden göç hikâyesi.", yil: "2009", album: "Eski Videolar", src: pic("eski6"), youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", arsiv: true, yukleyen: "Emre Aslan", yuklemeTarihi: daysFromToday(-15), kisiler: [], yorumlar: [] },
];

// ---------------- KÖY ----------------
export const KOY_TARIHCE = [
  { yil: "1500'ler", baslik: "İlk yerleşim", metin: "Köyün bulunduğu bölge Hitit başkenti Hattuşa'ya yakınlığıyla bilinir. Osmanlı tahrir defterlerinde köyün adı 16. yüzyılda geçmeye başlar." },
  { yil: "1530", baslik: "Tahrir kaydı", metin: "Çorum Sancağı tahrir defterinde köyde vergi veren haneler kayıtlıdır. (Örnek metin — belgelerle güncellenecek.)" },
  { yil: "1800'ler", baslik: "Sülalelerin oluşumu", metin: "Bugün köyde yaşayan büyük ailelerin ataları bu dönemde köye yerleşmiştir." },
  { yil: "1960'lar", baslik: "Okul ve göç", metin: "Köy ilkokulu açıldı, ardından büyük şehirlere — özellikle Ankara'ya — göç başladı." },
  { yil: "1994", baslik: "Derneğin kuruluşu", metin: "Ankara'daki hemşehrilerimiz bir araya gelerek Yanıcak Köyü Kültür ve Dayanışma Derneği'ni kurdu." },
];

export const OSMANLI_BELGELERI = [
  { id: "o1", ad: "Tahrir Defteri Kaydı", tarih: "H. 937 / M. 1530", aciklama: "Köyün hane ve vergi kaydı.", src: pic("osmanli1", 600, 800), arsiv: false },
  { id: "o2", ad: "Nüfus Defteri", tarih: "M. 1844", aciklama: "Köydeki erkek nüfusun kaydı.", src: pic("osmanli2", 600, 800), arsiv: false },
  { id: "o3", ad: "Temettuat Defteri", tarih: "M. 1845", aciklama: "Hanelerin gelir kayıtları.", src: pic("osmanli3", 600, 800), arsiv: true },
];

// ---------------- SÜLALELER / SOY AĞACI ----------------
export type AileDugum = { ad: string; not?: string; cocuklar?: AileDugum[] };
export const SULALELER: { id: string; ad: string; lakap: string; aciklama: string; agac: AileDugum }[] = [
  {
    id: "karacalar", ad: "Karacalar", lakap: "Değirmenciler", aciklama: "Köyün en eski ailelerinden. Eskiden köyün değirmenini işletirlerdi.",
    agac: {
      ad: "Molla Hasan", not: "~1850",
      cocuklar: [
        { ad: "Ahmet Karaca", not: "1890–1962", cocuklar: [{ ad: "Hasan Karaca", not: "1935–2010", cocuklar: [{ ad: "Hüseyin Karaca", not: "1958" }, { ad: "Fatma Karaca (gelin)", not: "1962" }] }] },
        { ad: "Veli Karaca", not: "1895–1970", cocuklar: [{ ad: "Kerim Karaca", not: "1940–2015" }] },
      ],
    },
  },
  {
    id: "yildirimlar", ad: "Yıldırımlar", lakap: "Demirciler", aciklama: "Köyün demircilik ve nalbantlık işlerini yapan aile.",
    agac: { ad: "Demirci Halil", not: "~1870", cocuklar: [{ ad: "Halil Yıldırım", not: "1938–2018", cocuklar: [{ ad: "Mehmet Yıldırım", not: "1971" }, { ad: "Zeynep Yıldırım", not: "1979" }] }] },
  },
  { id: "kiliclar", ad: "Kılıçlar", lakap: "Hacılar", aciklama: "Köyden ilk hacca gidenlerin ailesi.", agac: { ad: "Hacı Mehmet", not: "~1860", cocuklar: [{ ad: "Hacı Ömer Kılıç", not: "1937–2026", cocuklar: [{ ad: "Ali Osman Kılıç", not: "1966" }, { ad: "Hatice Kılıç", not: "1974" }] }] } },
  { id: "aslanlar", ad: "Aslanlar", lakap: "Çobanlar", aciklama: "Hayvancılıkla geçimini sağlayan köklü aile.", agac: { ad: "Çoban İbrahim", not: "~1880", cocuklar: [{ ad: "İbrahim Aslan", not: "1940–2005", cocuklar: [{ ad: "Osman Aslan", not: "1968", cocuklar: [{ ad: "Emre Aslan", not: "1990" }] }, { ad: "Şehit Yusuf Aslan", not: "1972–1993" }] }] } },
  { id: "demirtaslar", ad: "Demirtaşlar", lakap: "Taşçılar", aciklama: "Köy evlerinin taş ustaları.", agac: { ad: "Taşçı Ali", not: "~1875", cocuklar: [{ ad: "Mustafa Demirtaş", not: "1955", cocuklar: [{ ad: "Ayşe Demirtaş", not: "1985" }] }] } },
];

// ---------------- KASA (hesap defteri) ----------------
export const KASA_TURLERI = [
  { id: "harcama", ad: "Harcama", renk: "text-[#a8321c]", zemin: "bg-[#fbe9e3]" },
  { id: "aidat", ad: "Aidat", renk: "text-[#1f5f8b]", zemin: "bg-[#e3eef7]" },
  { id: "bagis", ad: "Bağış", renk: "text-[#1e6b3f]", zemin: "bg-[#e2f2e8]" },
  { id: "ekgelir", ad: "Ek Gelir", renk: "text-[#7a4f0e]", zemin: "bg-[#f6ecd6]" },
] as const;
export type KasaTur = (typeof KASA_TURLERI)[number]["id"];

export type KasaHareket = {
  id: string;
  tarih: string;
  tur: KasaTur;
  aciklama: string;
  kisi?: string; // bağışçı; aidatta zorunlu (ödeyen üye)
  anonim?: boolean; // "ismim görünmesin"
  tutar: number;
  belgeNo?: string;
};

export const KASA: KasaHareket[] = [
  { id: "k1", tarih: daysFromToday(-1), tur: "bagis", aciklama: "Cami onarımı bağışı", kisi: "Mehmet Yıldırım", tutar: 5000, belgeNo: "M-0412" },
  { id: "k2", tarih: daysFromToday(-1), tur: "aidat", aciklama: "Kasım aidatı", kisi: "Zeynep Yıldırım", tutar: 200, belgeNo: "M-0411" },
  { id: "k3a", tarih: daysFromToday(-3), tur: "aidat", aciklama: "Kasım aidatı", kisi: "Hüseyin Karaca", tutar: 200, belgeNo: "M-0410" },
  { id: "k3b", tarih: daysFromToday(-3), tur: "aidat", aciklama: "Kasım aidatı", kisi: "Fatma Karaca", tutar: 200, belgeNo: "M-0409" },
  { id: "k3c", tarih: daysFromToday(-4), tur: "aidat", aciklama: "Kasım aidatı", kisi: "Emre Aslan", tutar: 200, belgeNo: "M-0408" },
  { id: "k3d", tarih: daysFromToday(-7), tur: "aidat", aciklama: "Kasım aidatı", kisi: "Mustafa Demirtaş", tutar: 200, belgeNo: "M-0407" },
  { id: "k3e", tarih: daysFromToday(-8), tur: "aidat", aciklama: "Kasım ve Aralık aidatı", kisi: "Osman Aslan", tutar: 400, belgeNo: "M-0406" },
  { id: "k4", tarih: daysFromToday(-3), tur: "harcama", aciklama: "Kırtasiye ve çay-şeker", tutar: 640, belgeNo: "F-2291" },
  { id: "k5", tarih: daysFromToday(-5), tur: "harcama", aciklama: "Dernek merkezi kirası (Kasım)", tutar: 12000, belgeNo: "D-118" },
  { id: "k6", tarih: daysFromToday(-6), tur: "harcama", aciklama: "Elektrik + su + doğalgaz faturaları", tutar: 2350, belgeNo: "F-2287" },
  { id: "k7", tarih: daysFromToday(-9), tur: "harcama", aciklama: "Cami çatısı onarımı — son ödeme", tutar: 18500, belgeNo: "F-2280" },
  { id: "k8", tarih: daysFromToday(-12), tur: "bagis", aciklama: "Genel bağış", anonim: true, tutar: 10000, belgeNo: "M-0405" },
  { id: "k9", tarih: daysFromToday(-14), tur: "ekgelir", aciklama: "Kadın kolu kermes geliri", tutar: 14200, belgeNo: "M-0403" },
  { id: "k10", tarih: daysFromToday(-14), tur: "harcama", aciklama: "Kermes malzeme alımı", tutar: 2100, belgeNo: "F-2271" },
  { id: "k11", tarih: daysFromToday(-20), tur: "harcama", aciklama: "İhtiyaç sahibi aileye erzak yardımı", tutar: 4000, belgeNo: "F-2265" },
  { id: "k12", tarih: daysFromToday(-20), tur: "bagis", aciklama: "Pilav günü bağışı", kisi: "Osman Aslan", tutar: 3000, belgeNo: "M-0398" },
  { id: "k13", tarih: daysFromToday(-22), tur: "bagis", aciklama: "Pilav günü bağışı", kisi: "Hüseyin Karaca", tutar: 2500, belgeNo: "M-0396" },
  { id: "k14", tarih: daysFromToday(-25), tur: "ekgelir", aciklama: "Pilav günü toplanan bağış kutusu", tutar: 16500, belgeNo: "M-0394" },
  { id: "k15", tarih: daysFromToday(-28), tur: "harcama", aciklama: "Pilav günü pirinç, et ve kazan kirası", tutar: 21800, belgeNo: "F-2252" },
  { id: "k16", tarih: daysFromToday(-30), tur: "bagis", aciklama: "Yardım fonu bağışı", anonim: true, tutar: 1500, belgeNo: "M-0390" },
  { id: "k17a", tarih: daysFromToday(-31), tur: "aidat", aciklama: "Ekim aidatı", kisi: "Ali Osman Kılıç", tutar: 200, belgeNo: "M-0389" },
  { id: "k17b", tarih: daysFromToday(-32), tur: "aidat", aciklama: "Ekim aidatı", kisi: "Hatice Kılıç", tutar: 200, belgeNo: "M-0388" },
  { id: "k17c", tarih: daysFromToday(-33), tur: "aidat", aciklama: "Ekim aidatı", kisi: "Ayşe Demirtaş", tutar: 200, belgeNo: "M-0387" },
  { id: "k17d", tarih: daysFromToday(-33), tur: "aidat", aciklama: "Ekim aidatı", kisi: "Mehmet Yıldırım", tutar: 200, belgeNo: "M-0386" },
];
/** Kasadaki güncel tutar (en son hareketten sonraki bakiye) */
export const KASA_BAKIYE = 86450;

// ---------------- ESNAF ----------------
export const ESNAF = [
  { id: "e1", isletme: "Demirtaş Bakkal", sahibi: "Mustafa Demirtaş", sektor: "Gıda", aciklama: "Köy ürünleri, yufka, tarhana, bulgur.", konum: "Çorum Merkez", telefon: "0532 000 00 08", foto: pic("bakkal", 600, 400) },
  { id: "e2", isletme: "Aslan Nakliyat", sahibi: "Osman Aslan", sektor: "Nakliye", aciklama: "Şehirler arası evden eve nakliyat. Hemşehrilere indirim.", konum: "İstanbul / Esenyurt", telefon: "0532 000 00 10", foto: pic("nakliye", 600, 400) },
  { id: "e3", isletme: "Kılıç Terzi", sahibi: "Hatice Kılıç", sektor: "Tekstil", aciklama: "Tadilat, dikiş, gelinlik ve abiye.", konum: "Sincan / Ankara", telefon: "0532 000 00 09", foto: pic("terzi", 600, 400) },
  { id: "e4", isletme: "Yıldırım Yapı", sahibi: "Mehmet Yıldırım", sektor: "İnşaat", aciklama: "Proje, tadilat ve müteahhitlik hizmetleri.", konum: "Keçiören / Ankara", telefon: "0532 000 00 02", foto: pic("insaat", 600, 400) },
];

// ---------------- İLANLAR ----------------
export const ILAN_TURLERI = ["Satılık", "Kiralık", "İş", "Kayıp-Buluntu", "Diğer"] as const;
export const ILANLAR = [
  { id: "i1", tur: "Satılık", baslik: "Köyde 8 dönüm tarla", aciklama: "Yol kenarında, suya yakın tarla.", fiyat: "Görüşülür", veren: "Ali Osman Kılıç", tarih: daysFromToday(-2) },
  { id: "i2", tur: "İş", baslik: "Ankara'da şantiyeye usta aranıyor", aciklama: "Sıva ve alçı ustası, sigortalı.", veren: "Mehmet Yıldırım", tarih: daysFromToday(-4) },
  { id: "i3", tur: "Kayıp-Buluntu", baslik: "Pilav gününde anahtar bulundu", aciklama: "Mavi anahtarlıklı araba anahtarı, dernekte.", veren: "Ayşe Demirtaş", tarih: daysFromToday(-6) },
  { id: "i4", tur: "Satılık", baslik: "Ev yapımı tarhana ve erişte", aciklama: "Köyden gelen ürünler, kg ile.", fiyat: "250 ₺ / kg", veren: "Fatma Karaca", tarih: daysFromToday(-8) },
];

// ---------------- TALEPLER ----------------
export const TALEPLER = [
  { id: "t1", tur: "Dilek", konu: "Köy yoluna aydınlatma", mesaj: "Köy girişindeki yola sokak lambası için belediyeye başvurulabilir mi?", yazan: "Emre Aslan", anonim: false, tarih: daysFromToday(-1), durum: "Yeni" as const, cevap: "" },
  { id: "t2", tur: "Şikayet", konu: "Otobüs saatleri", mesaj: "Pilav günü otobüsü çok erken kalkıyor.", yazan: "", anonim: true, tarih: daysFromToday(-5), durum: "Cevaplandı" as const, cevap: "Haklısınız, kalkış saatini 08:00'e aldık." },
];

// Yönetici için: son yüklenen fotoğraflar (onay gerekmiyor, gözden geçirme listesi)
export function sonYuklenenler(gun = 3) {
  return FOTOLAR.filter((f) => (today.getTime() - new Date(f.yuklemeTarihi).getTime()) / 864e5 <= gun);
}
