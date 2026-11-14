"use client";

// PROTOTİP: Gerçek giriş yerine rol seçimi. Gerçek sürümde
// telefon/e-posta + şifre ile oturum açılacak (kayıtları yönetici yapar).
import { createContext, useContext, useEffect, useState } from "react";
import { UYELER, type Uye } from "@/lib/data";

export type Rol = "ziyaretci" | "uye" | "yonetici";

type AuthCtx = { rol: Rol; setRol: (r: Rol) => void; kullanici: Uye | null; hazir: boolean };
const Ctx = createContext<AuthCtx>({ rol: "ziyaretci", setRol: () => {}, kullanici: null, hazir: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [rol, setRolState] = useState<Rol>("ziyaretci");
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    try {
      const r = localStorage.getItem("demo-rol") as Rol | null;
      if (r) setRolState(r);
    } catch {}
    setHazir(true);
  }, []);

  const setRol = (r: Rol) => {
    setRolState(r);
    try {
      localStorage.setItem("demo-rol", r);
    } catch {}
  };

  // Üye → Mehmet Yıldırım (bugün doğum günü — demoda özel karşılamayı görmek için), Yönetici → Hüseyin Karaca (örnek)
  const kullanici = rol === "ziyaretci" ? null : rol === "yonetici" ? UYELER[0] : UYELER[1];

  return <Ctx.Provider value={{ rol, setRol, kullanici, hazir }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
export const useUye = () => {
  const { rol } = useAuth();
  return rol !== "ziyaretci";
};
