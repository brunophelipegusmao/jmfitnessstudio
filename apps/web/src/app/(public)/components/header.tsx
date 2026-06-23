"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SheetTitle,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { LogOutIcon, MenuIcon, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b my-auto px-5 h-auto font-heading bg-primary-foreground">
      <Link href="/">
        <Image
          src="/icons/icon-wt.png"
          alt="JM Fitness Studio"
          className="h-20 w-auto ml-6"
          width={80}
          height={80}
          priority
        />
      </Link>
      <nav className="flex items-center justify-center w-auto h-auto font-semibold">
        <ul className="mx-3 flex">
          <li className="mx-4 bg-accent rounded-full px-4 py-3">
            <Link href="/login">Área do Aluno</Link>
          </li>
          <li className="hidden md:flex mx-4 bg-secondary rounded-full px-4 py-3 animate-pulse">
            <Link
              href='/store'
              className="relative z-10"
            >
              JM Store
            </Link>
          </li>
          <li className="hidden md:flex mx-4 px-4 py-3">
            <Link href="/plans">Planos</Link>
          </li>
          <li className="hidden md:flex mx-4 px-4 py-3">
            <Link href="/events">Eventos</Link>
          </li>
        </ul>
        <Sheet>
          <SheetTrigger asChild className="w-10 h-10 mx-2">
            <MenuIcon color="#b58c21" strokeWidth={3} className="w-10 h-10" />
          </SheetTrigger>
          <SheetContent showCloseButton={false} className="flex flex-col px-2">
            <SheetHeader className="flex-row items-center justify-between">
              <Image
                src="/icons/icon-wt.png"
                alt="JM Fitness Studio"
                className="h-20 w-auto"
                width={80}
                height={80}
                priority
              />
              <SheetClose asChild>
                <button aria-label="Fechar menu">
                  <X className="h-6 w-6" />
                </button>
              </SheetClose>
            </SheetHeader>
            <Separator />
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="space-y-5 ">
              <ul className="flex flex-col items-start justify-start text-primary font-semibold">
                <li className="my-4">
                  <Link href="/login">Área do Aluno</Link>
                </li>
                <li className="my-4">
                  <Link
                    href='/store'
                    className="relative z-10"
                  >
                    JM Store
                  </Link>
                </li>
                <li className="my-4">
                  <Link href="/plans">Planos</Link>
                </li>
                <li className="my-4">
                  <Link href="/events">Eventos</Link>
                </li>
              </ul>
              <Separator />
              <div className="flex flex-col items-start justify-start text-primary">
                <ul>
                  <li className="my-4">
                    <Link href="/profile">Perfil</Link>
                  </li>
                  <li className="my-4">
                    <Link href="/settings">Configurações</Link>
                  </li>
                </ul>
              </div>
            </SheetDescription>

            <div className="flex items-center space-x-4 mt-auto pb-5 border-t pt-5">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <div>
                <p className="text-sm font-semibold">Bruno</p>
                <p className="text-xs text-muted-foreground">
                  bruno@example.com
                </p>
              </div>
              <Button
                size="lg"
                className="ml-auto bg-primary-foreground text-secondary-foreground"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
