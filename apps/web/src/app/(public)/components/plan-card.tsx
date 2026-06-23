import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck } from "lucide-react";

type PlanId = "free" | "guest" | "master";

type PlanData = {
  badge?: string;
  title: string;
  description: string;
  originalPrice?: string;
  currentPrice: string;
  discountLabel: string;
  periodNote: string;
  fidelityNote?: string;
  ctaLabel: string;
  features: string[];
  featuresNotChecked?: string[];
};

const PLANS: Record<PlanId, PlanData> = {
  free: {
    title: "Plano Free",
    description:
      "Explore nossa academia e descubra o que podemos oferecer para você.",
    currentPrice: "R$ 0,00",
    discountLabel: "GRÁTIS",
    periodNote: "sem mensalidade, acesso limitado",
    ctaLabel: "Começar grátis",
    features: [
      "Check-in limitado",
      "Inscrição em alguns os eventos",
      "Aulas coletivas inclusas",
      "App JM Fitness",
    ],
    featuresNotChecked: [
      "Acompanhamento de evolução corporal",
      "Métricas e histórico completo",
      "Aulas exclusivas inclusas",
      "Suporte prioritário",
    ],
  },
  guest: {
    title: "Plano Guest",
    description:
      "Participe de eventos exclusivos e movimente-se com a gente quando quiser.",
    originalPrice: "R$ 89,90",
    currentPrice: "R$ 49,90",
    discountLabel: "44% OFF",
    periodNote: "por mês, sem fidelidade",
    ctaLabel: "Assinar agora",
    features: [
      "Check-in limitado",
      "Inscrição em TODOS os eventos",
      "Aulas coletivas inclusas",
      "App JM Fitness",
    ],
    featuresNotChecked: [
      "Acompanhamento de evolução corporal",
      "Métricas e histórico completo",
      "Aulas exclusivas inclusas",
      "Suporte prioritário",
    ],
  },
  master: {
    badge: "O mais vantajoso",
    title: "Plano Master",
    description:
      "Acesso completo à academia com acompanhamento profissional de evolução.",
    originalPrice: "R$ 159,90",
    currentPrice: "R$ 99,90",
    discountLabel: "38% OFF",
    periodNote: "por mês, com 6 meses de fidelidade",
    fidelityNote: "6 meses de fidelidade",
    ctaLabel: "Contratar agora",
    features: [
      "Check-in limitado",
      "Inscrição em TODOS os eventos",
      "Aulas coletivas inclusas",
      "App JM Fitness",
      "Acompanhamento de evolução corporal",
      "Métricas e histórico completo",
      "Aulas exclusivas inclusas",
      "Suporte prioritário",
    ],
  },
};

export default function PlanCard({ plan }: { plan: PlanId }) {
  const {
    badge,
    title,
    description,
    originalPrice,
    currentPrice,
    discountLabel,
    periodNote,
    fidelityNote,
    ctaLabel,
    features,
    featuresNotChecked,
  } = PLANS[plan];

  return (
    <div className="relative h-full pt-3.5">
      {badge && (
        <Badge className="absolute top-0 left-4 z-10 bg-accent text-accent-foreground rounded-full px-3 py-3 text-sm font-semibold shadow-sm">
          {badge}
        </Badge>
      )}

      <Card className="h-full flex flex-col text-primary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-primary">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-1.5">
          <p></p>
          {originalPrice && (
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">
              A PARTIR DE{" "}
              <span className="line-through text-muted text-sm">
                {originalPrice}
              </span>
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-4xl font-extrabold leading-none">
              {currentPrice}
            </span>
            <Badge className="bg-emerald-500 text-white text-xs font-bold shrink-0">
              {discountLabel}
            </Badge>
          </div>
          <p className="text-sm text-primary">{periodNote}</p>
        </CardContent>

        {fidelityNote && (
          <>
            <CardContent className="py-3">
              <p className="text-sm text-primary">{fidelityNote}</p>
            </CardContent>
          </>
        )}

        <Separator className="opacity-20" />

        <CardFooter className="mt-auto flex-col items-stretch gap-5 pt-5 bg-primary/5">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full h-12 text-base cursor-pointer">
            {ctaLabel}
          </Button>
          <ul className="space-y-2.5 w-full">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <CircleCheck className="text-emerald-400 size-5 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
            {featuresNotChecked?.map((featureUnable) => (
              <li
                key={featureUnable}
                className="flex items-start gap-2 text-sm"
              >
                <CircleCheck className="text-slate-400 size-5 shrink-0 mt-0.5" />
                <span>{featureUnable}</span>
              </li>
            ))}
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
}
