import { Locale } from "@/i18n.config";
import prismadb from "@/lib/prismadb";
import React, { FC } from "react";
import HeaderImage from "@/assets/images/email-bg.png";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { Company } from "@prisma/client";
import { getDictionary } from "@/lib/dictionary";

interface pageProps {
  params: { lang: Locale };
}

const page: FC<pageProps> = async ({ params }) => {
  const company = (await prismadb.company.findFirst({})) as Company;
  const { license: t } = (await getDictionary(params.lang)) as any;

  return (
    <>
      <div className="relative">
        <div className="absolute h-[400px inset-0">
          <Image
            src={HeaderImage}
            alt="Header image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative  h-[400px] bg-black opacity-40">
          <div className="text-5xl font-bold z-40 h-[380px] flex  text-white opacity-100 items-end justify-center text-center mt-auto">
            <h1 className="mt-4">{t.title}</h1>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="flex justify-center w-full text-center font-bold">
          <div className="flex flex-col space-y-4">
            <p>
              {t.fields.companyName}:{" "}
              <span className="ml-2 font-medium text-gray-600">
                {company.name}
              </span>
            </p>
            <p>
              {t.fields.vatNumber}:{" "}
              <span className="ml-2 font-medium text-gray-600">
                {company.vatNumber}
              </span>
            </p>
            <p>
              {t.fields.address}:{" "}
              <span className="ml-2 font-medium text-gray-600">
                {company.address}
              </span>
            </p>
            <p>
              {t.fields.city}:{" "}
              <span className="ml-2 font-medium text-gray-600">
                {company.city}
              </span>
            </p>
            <p>
              {t.fields.zipCode}:{" "}
              <span className="ml-2 font-medium text-gray-600">
                {company.postalCode}
              </span>
            </p>
            <p>
              {t.fields.serialNumber}:{" "}
              <span className="ml-2 font-medium text-gray-600">
                {company.serialNumber}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="container mt-5"
        dangerouslySetInnerHTML={{ __html: t.fields.description }}
      ></div>
    </>
  );
};

export default page;
