// Import the necessary dependencies
import { PrismaClient, Role } from '@prisma/client';

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define the function to create a super admin user
async function createSuperAdmin(email) {
  try {
    // Create the super admin user in the database
    const user = await prisma.user.create({
      data: {
        email,
        role: Role.SUPER_ADMIN,
      },
    });

    console.log(`Super admin user created with email: ${user.email}`);
  } catch (error) {
    console.error('Error creating super admin user:', error);
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

// Get the email from the command line arguments
const email = process.argv[2];

// Call the function to create the super admin user
createSuperAdmin(email);
