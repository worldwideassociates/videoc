import headerImage from "@/assets/images/signup-header.png";
import Image from "next/image";

const logoUrl = `${process.env.NEXT_PUBLIC_BUNNY_CDN_BASE_URL}/assets/logo.svg`;

function Right() {
  return (
    <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0">
        <Image
          src={headerImage}
          alt="Header Image"
          layout="fill"
          objectFit="cover"
          className="bg-black"
        />
      </div>
      <div className="relative z-20 flex items-center  text-black text-2xl font-bold">
        <Image
          src={logoUrl}
          width={250}
          height={250}
          objectFit="cover"
          alt="logo"
        />
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          {/* <p className="text-lg">“ WWA: where distance becomes a mere inconvenience in the language of seamless business connections.”</p> */}
          {/* <footer className="text-sm">GPT-4</footer> */}
        </blockquote>
      </div>
    </div>
  );
}

export default Right;
