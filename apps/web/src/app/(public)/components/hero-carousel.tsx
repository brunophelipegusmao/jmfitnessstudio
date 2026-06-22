"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";

type HeroBanner = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  banners: HeroBanner[];
};

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 8000, stopOnInteraction: false }), Fade()]}
      className="relative w-full aspect-video sm:aspect-21/9 rounded-lg overflow-hidden"
    >
      <CarouselContent className="ml-0">
        {banners.map((banner, index) => (
          <CarouselItem
            key={banner.src}
            className="absolute inset-0 pl-0"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        size="icon-lg"
        className="left-4 border-none bg-accent/90 text-accent-foreground hover:bg-accent sm:left-6"
      />
      <CarouselNext
        size="icon-lg"
        className="right-4 border-none bg-accent/90 text-accent-foreground hover:bg-accent sm:right-6"
      />
    </Carousel>
  );
}
