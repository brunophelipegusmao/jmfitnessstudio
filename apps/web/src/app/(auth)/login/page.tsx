import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex flex-1 gap-5  justify-center p-8">
      <div className="w-[50%] h-auto border-2 border-red-400 flex flex-col items-start">
        <Image src="/icons/jm_logo.svg" alt="Logo" width={200} height={80} />
        <div className="p-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          corrupti a sit inventore saepe voluptate! Aliquid quasi similique
          inventore facere porro, voluptatem, magni velit possimus doloribus
          accusantium nesciunt cupiditate dolores!
          <div className="p-5">
            <ul >
              <li className="py-3">teste</li>
              <li className="py-3">teste</li>
              <li className="py-3">teste</li>
              <li className="py-3">teste</li>
              <li className="py-3">teste</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-auto border-2 border-red-400">formulario</div>
    </main>
  );
}
