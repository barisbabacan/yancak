"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth";
import { Alan } from "@/components/galeri";

export default function GirisSayfasi() {
  const { setRol } = useAuth();
  const router = useRouter();

  return (
    <div className="px-4 pt-8">
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.webp" alt="" className="mx-auto size-28 rounded-full shadow-lg ring-4 ring-bugday/50" />
        <h1 className="mt-4 font-serif text-2xl font-bold text-toprak">Üye Girişi</h1>
        <p className="mt-1 text-sm text-toprak/85">Eski fotoğraflar, kasa, esnaflar ve daha fazlası üyelerimize özel.</p>
      </div>

      <form
        className="mt-8 space-y-5 rounded-3xl bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setRol("uye");
          router.push("/");
        }}
      >
        <Alan etiket="Telefon numarası veya e-posta" placeholder="05xx xxx xx xx" />
        <Alan etiket="Şifre" type="password" placeholder="••••••••" />
        <button className="w-full rounded-xl bg-toprak py-3 font-semibold text-krem">Giriş Yap</button>
        <button type="button" className="w-full text-sm text-altin">
          Şifremi unuttum
        </button>
      </form>

      <div className="mt-4 rounded-3xl bg-kum p-4 text-sm text-toprak/80">
        <div className="font-semibold text-toprak">Hesabınız yok mu?</div>
        Site üyeliği yalnızca dernek üyelerine açıktır ve kayıtları dernek yönetimi oluşturur. Dernek üyesiyseniz{" "}
        <Link href="/dernek#iletisim" className="font-semibold text-altin">yönetimle iletişime geçin</Link>.
      </div>
      <p className="mt-3 text-center text-xs text-toprak/80">
        <Link href="/kvkk" className="underline">KVKK Aydınlatma Metni</Link>
      </p>
    </div>
  );
}
