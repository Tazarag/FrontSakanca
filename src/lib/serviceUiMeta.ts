import { Camera, Compass, Code, Car, Cpu, Heart } from "lucide-react";
import type { ComponentType } from "react";
import { Service } from "@/types";

export type ServiceUiMeta = {
  icon: ComponentType<{ className?: string }>;
  color: string;
};

const serviceUiMetaBySlug: Record<string, ServiceUiMeta> = {
  visual: { icon: Camera, color: "from-amber-400 to-orange-500" },
  auto: { icon: Car, color: "from-blue-400 to-indigo-600" },
  escape: { icon: Compass, color: "from-emerald-400 to-teal-600" },
  tech: { icon: Cpu, color: "from-cyan-400 to-blue-500" },
  dev: { icon: Code, color: "from-pink-500 to-purple-600" },
  pet: { icon: Heart, color: "from-rose-400 to-red-500" },
};

export function getServiceUiMeta(service: Service): ServiceUiMeta {
  const key = service.slug.replace(/^sakanca-/, ""); // "sakanca-visual" -> "visual"
  return (
    serviceUiMetaBySlug[key] ?? {
      icon: Camera,
      color: "from-slate-400 to-slate-600",
    }
  );
}
