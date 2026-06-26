"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, LogOutIcon, MenuIcon, X } from "lucide-react";

export default function LoginHeader() {
  return (
    <header className="flex items-center justify-between p-4 my-auto px-5 h-auto font-heading bg-primary-foreground border-b border-b-secondary">
      <Link href="/">
        <Image
          src="/icons/jm_logo.svg"
          alt="JM Fitness Studio"
          className="h-20 w-auto ml-6"
          width={80}
          height={80}
          priority
        />
      </Link>
      <nav className="flex items-center justify-center w-auto h-auto font-semibold mr-10">
        <div className="flex ">
          <Link href="/" className="flex items-center gap-2 text-lg font-medium bg-secondary py-3 px-5 rounded-full transition-colors hover:text-primary">
            <ArrowLeftIcon /> Voltar
          </Link>
        </div>
      </nav>
    </header>
  );
}
