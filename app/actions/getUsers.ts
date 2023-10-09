import prisma from "@/lib/prisma_client";
const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        email: true,
        name: true,
        createdAt: true,
        coutry_code: true,
        id: true,
        updatedAt: true,
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
