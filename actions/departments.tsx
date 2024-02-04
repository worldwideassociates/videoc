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

    return { success: true, message: "Department created successfully." };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'Department with that name already exists.' };
    }
    return { success: false, message: 'Something went wrong.' };
  }
}