"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type HeroBanner = { src: string; alt: string };
type HeroCarouselProps = { banners: HeroBanner[] };

type EnteringSlide = { index: number; from: "left" | "right" };

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [entering, setEntering] = useState<EnteringSlide | null>(null);
  const [animating, setAnimating] = useState(false);
  const prevIndexRef = useRef(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const next = emblaApi.selectedScrollSnap();
    const prev = prevIndexRef.current;
    if (next === prev) return;

    const total = banners.length;
    const forwardDist = (next - prev + total) % total;
    const backwardDist = (prev - next + total) % total;
    const from: "left" | "right" =
      forwardDist <= backwardDist ? "right" : "left";

    prevIndexRef.current = next;

    flushSync(() => {
      setEntering({ index: next, from });
      setAnimating(false);
    });

    requestAnimationFrame(() => setAnimating(true));
  }, [emblaApi, banners.length]);

  const handleTransitionEnd = useCallback(() => {
    if (!entering) return;
    setCurrent(entering.index);
    setEntering(null);
    setAnimating(false);
  }, [entering]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      aria-label="banner com avisos e propagandas"
      className="w-full py-5"
    >
      <Carousel
        setApi={setEmblaApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 8000, stopOnInteraction: false })]}
        className="relative w-full aspect-video sm:aspect-21/9 rounded-lg overflow-hidden"
      >
        {banners.map((banner, index) => {
          const isCurrent = index === current;
          const isEntering = entering !== null && index === entering.index;

          let transform = "translateX(0)";
          let zIndex = 0;
          let transition = "none";

          if (isCurrent) {
            zIndex = 1;
          } else if (isEntering) {
            zIndex = 2;
            transform = animating
              ? "translateX(0)"
              : entering.from === "right"
                ? "translateX(100%)"
                : "translateX(-100%)";
            transition = animating ? "transform 600ms ease-in-out" : "none";
          }

          return (
            <div
              key={banner.src}
              className="absolute inset-0"
              style={{ transform, zIndex, transition }}
              onTransitionEnd={isEntering ? handleTransitionEnd : undefined}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}

        {/* Embla tracking layer — invisible, used only for navigation and autoplay */}
        <div className="absolute inset-0 invisible pointer-events-none">
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.src} />
            ))}
          </CarouselContent>
        </div>

        <CarouselPrevious
          size="icon-lg"
          className="z-10 left-4 border-none bg-accent/90 text-accent-foreground hover:bg-accent sm:left-6"
        />
        <CarouselNext
          size="icon-lg"
          className="z-10 right-4 border-none bg-accent/90 text-accent-foreground hover:bg-accent sm:right-6"
        />
      </Carousel>
    </section>
  );
}
