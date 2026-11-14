import { notFound } from "next/navigation";
import { FOTOLAR } from "@/lib/data";
import { FotoDetay } from "./detay";

export function generateStaticParams() {
  return FOTOLAR.map((f) => ({ id: f.id }));
}

export default async function FotoSayfasi({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const f = FOTOLAR.find((x) => x.id === id);
  if (!f) notFound();
  return <FotoDetay foto={f} />;
}
