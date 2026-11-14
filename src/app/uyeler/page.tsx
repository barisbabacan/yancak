"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { UYELER, formatDate } from "@/lib/data";
import { Avatar, PageHeader, UyeKapisi } from "@/components/ui";
import { useAuth } from "@/components/auth";

export default function UyelerSayfasi() {
  const { rol } = useAuth();
  const [ara, setAra] = useState("");
  const liste = UYELER.filter((u) => (u.adSoyad + u.meslek + (u.sulale ?? "")).toLocaleLowerCase("tr").includes(ara.toLocaleLowerCase("tr"))).sort((a, b) =>
    a.adSoyad.localeCompare(b.adSoyad, "tr")
  );

  return (
    <>
      <PageHeader title="Üye Listesi" subtitle={`${UYELER.length} kayıtlı dernek üyesi`} />
      <UyeKapisi>
        <div className="px-4 pb-3">
          <label className="flex items-center gap-2 rounded-full border border-toprak/15 bg-white px-4 py-2.5">
            <Search className="size-4 text-toprak/50" />
            <input value={ara} onChange={(e) => setAra(e.target.value)} placeholder="İsim, meslek veya sülale ara…" className="flex-1 bg-transparent text-[15px] outline-none" />
          </label>
        </div>
        <ul className="mx-4 divide-y divide-kum overflow-hidden rounded-2xl bg-white">
          {liste.map((u) => (
            <li key={u.id} className="flex items-center gap-3 p-3">
              <Avatar name={u.adSoyad} size="sm" dark={u.yetkiler.length > 0} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{u.adSoyad}</div>
                <div className="truncate text-xs text-toprak/60">
                  {u.meslek} · {u.sulale}
                </div>
              </div>
              <div className="text-right text-[11px] text-toprak/50">
                Üye
                <br />
                {formatDate(u.kayitTarihi, { year: "numeric" })}
              </div>
            </li>
          ))}
        </ul>
        {rol !== "yonetici" && <p className="mx-4 mt-3 text-center text-xs text-toprak/50">Telefon ve adres bilgileri gizlilik gereği yalnızca yönetim tarafından görülür.</p>}
      </UyeKapisi>
    </>
  );
}
