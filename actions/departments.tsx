'use server'

import prismadb from "@/lib/prismadb";
import { Department } from "@prisma/client";




export const create = async (values: Department) => {
  try {
    await prismadb.department.create({
      data: {
        ...values,
        members: {
          connect: values.members
        }
      }
    })

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}