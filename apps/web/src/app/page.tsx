import HeroCarousel from "@/app/(public)/components/hero-carousel";
import SubtitleH2 from "@/app/(public)/components/subtitle-h2";
import Header from "./(public)/components/public-header";
import SectionStore from "./(public)/components/store-section";
import SectionPlan from "./(public)/components/plan-section";
import Footer from "./(public)/components/footer";

const heroBanners = [
  {
    src: "/images/banner-01.webp",
    alt: "Smart Fit Run — sua energia em movimento",
  },
  {
    src: "/images/banner-02.webp",
    alt: "Conheça os planos da JM Fitness Studio",
  },
  {
    src: "/images/banner-03.webp",
    alt: "Aulas coletivas para todos os níveis",
  },
  {
    src: "/images/banner-04.webp",
    alt: "Estrutura completa para o seu treino",
  },
  {
    src: "/images/banner-05.webp",
    alt: "Acompanhamento profissional na sua evolução",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-5 ">
        <HeroCarousel banners={heroBanners} />

        <section
          className="mt-10"
          aria-label="apresentação da JM Fitness Studio"
        >
          <SubtitleH2>Bem-vindo à JM Fitness Studio</SubtitleH2>
          <div className="py-5 px-5 text-center text-2xl text-foreground ">
            <p className=" mb-4">
              Na JM Fitness Studio, oferecemos uma{" "}
              <strong>experiência de treino completa e personalizada</strong>{" "}
              para ajudar você a alcançar seus objetivos de saúde e fitness. Com
              uma equipe de profissionais dedicados, uma variedade de aulas
              coletivas e uma estrutura moderna, estamos aqui para apoiar sua
              jornada de transformação.
            </p>
            <p className="mb-4">
              Explore nossos planos flexíveis, participe das nossas aulas
              dinâmicas e aproveite o acompanhamento profissional para maximizar
              seus resultados. Junte-se à comunidade JM Fitness Studio e
              descubra o poder do movimento para transformar sua vida!
            </p>
          </div>
        </section>

        <SectionPlan />
        <SectionStore />
      </main>
      <Footer />
    </>
  );
}
