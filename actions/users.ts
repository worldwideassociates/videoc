'use server'

import prismadb from "@/lib/prismadb";
import streamClient from "@/lib/stream-server-client";
import { Role, User } from "@prisma/client";
import { UserObjectRequest } from "@stream-io/node-sdk";



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
export const deleteUser = async (id: string) => {
  try {
    await prismadb.user.delete({
      where: { id }
    })

    return { success: true, message: "user deleted successfully." };
  } catch (error: any) {
    console.log(error);

    return { success: false, message: 'Something went wrong.' };
  }
}




export const upsert = async (values: User) => {
  if (values.id) {
    return await update(values.id, values);
  } else {
    return await create(values);
  }
}


/** Private methods **/


const create = async (values: User) => {
  try {
    const user = await prismadb.user.create({
      data: {
        ...values
      }
    })

    createStreamUser(user)
    return { success: true, message: "User created successfully." };
  } catch (error: any) {
    console.log(error);

    if (error.code === 'P2002') {
      return { success: false, message: 'User with this email already exists.' };
    }
    return { success: false, message: 'Something went wrong.' };
  }
}


const update = async (id: string, values: User) => {
  try {
    await prismadb.user.update({
      where: { id },
      data: {
        ...values
      }
    })

    return { success: true, message: "user updated successfully." };
  } catch (error: any) {
    console.log(error);

    if (error.code === 'P2002') {
      return { success: false, message: 'user with this email already exists.' };
    }
    return { success: false, message: 'Something went wrong.' };
  }
}


const createStreamUser = async (user: User) => {

  const streamUser: UserObjectRequest = {
    id: user.id,
    role: 'user', //TODO: figure out roles
    // role: user.role!,
    name: user.name,
    image: user.image,
  }

  await streamClient.upsertUsers({
    users: {
      [streamUser.id]: streamUser
    }
  })
}