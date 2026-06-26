import Link from "next/link";
import SubtitleH2 from "./subtitle-h2";
import Image from "next/image";

const storeCards = [
  {
    src: "/storeImgs/store-01.avif",
    alt: "Equipamentos de alto padrão na JM Fitness Studio",
    label: "Equipamentos de alto padrão",
  },
  {
    src: "/storeImgs/store-02.avif",
    alt: "Salas exclusivas de aulas coletivas",
    label: "Salas exclusivas de aulas coletivas",
  },
  {
    src: "/storeImgs/store-03.avif",
    alt: "Áreas de musculação e cárdio",
    label: "Áreas de musculação e cárdio",
  },
];

export default function SectionStore() {
  return (
    <Link href="/store">
      <section className="mt-10" aria-label="apresentação da JM Store">
        <div className="flex flex-col items-center justify-center">
          <SubtitleH2>Conheça nossa Store</SubtitleH2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-7">
            {storeCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl overflow-hidden shadow-md flex flex-col cursor-pointer border-2 border-transparent hover:border-accent transition-colors"
              >
                <div className="relative aspect-video">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-center py-2 px-3">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Link>
  );
}
