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
    console.log(error);

    if (error.code === 'P2002') {
      return { success: false, message: 'Department with that name already exists.' };
    }
    return { success: false, message: 'Something went wrong.' };
  }
}

export const update = async (id: string, values: Department) => {
  try {
    await prismadb.department.update({
      where: { id },
      data: {
        ...values,
        members: {
          connect: values.members
        }
      }
    })

    return { success: true, message: "Department created successfully." };
  } catch (error: any) {
    console.log(error);

    if (error.code === 'P2002') {
      return { success: false, message: 'Department with that name already exists.' };
    }
    return { success: false, message: 'Something went wrong.' };
  }
}

// TODO: usr string ID for all entities
export const deleteDepartment = async (id: string) => {
  try {
    await prismadb.department.delete({
      where: { id }
    })

    return { success: true, message: "Department deleted successfully." };
  } catch (error: any) {
    return { success: false, message: 'Something went wrong.' };
  }
}