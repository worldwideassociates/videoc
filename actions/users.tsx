'use server'

import prismadb from "@/lib/prismadb";
import { Role, User } from "@prisma/client";



export const updateUser = async (email: string, values: User) => {
  try {
    await prismadb.user.update({
      where: { email: email },
      data: {
        name: values.name,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        role: Role.EMPLOYEE
      },
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


export const getEmployees = async () => {
  return await prismadb.user.findMany({
    where: {
      role: Role.EMPLOYEE
    }
  });
}

export const getAllUsers = async () => {
  return await prismadb.user.findMany({
    where: {
      NOT: {
        role: Role.SUPER_ADMIN
      }
    }
  });
}


export const getUsersWithoutDepartment = async () => {
  return await prismadb.user.findMany({
    where: {
      department: null
    }
  });
}
