'use server'

import prismadb from "@/lib/prismadb";
import { Company } from "@prisma/client";

export const update = async (values: Company) => {
  try {
    await prismadb.company.update({
      where: { singleton: "singleton" },
      data: values
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}