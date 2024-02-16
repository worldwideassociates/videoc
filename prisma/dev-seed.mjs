import { PrismaClient, Role } from "@prisma/client";
import { StreamClient } from "@stream-io/node-sdk";
import casual from "casual";

const prisma = new PrismaClient();

const apiKey = process.env.STREAM_API_KEY
const secret = process.env.STREAM_API_SECRET


const streamClient = new StreamClient(apiKey, secret);


const createStreamUser = async (user) => {

  const streamUser = {
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


async function main() {
  const users = [];
  const roles = [Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE];
  for (let i = 0; i < 10; i++) {
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const user = await prisma.user.create({
      data: {
        email: casual.email,
        name: casual.full_name,
        image: `https://i.pravatar.cc/150?img=${i}`,
        role: randomRole,
        emailVerified: new Date(),
        phone: casual.phone,
        dateOfBirth: new Date(),
      },
    });
    await createStreamUser(user);
    if (i < 5) users.push({ id: user.id });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.department.create({
      data: {
        name: casual.word + i,
        description: casual.sentence,
        email: casual.email,
        phone: casual.phone,
        members: {
          connect: users,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
