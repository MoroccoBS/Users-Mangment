import prisma from "@/lib/prisma_client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  try {
    const body = await req.json();
    const { email, password, name, country_code } = body;
    if (!email || !password || !name || !country_code) {
      return new NextResponse("Missing email, password, name or country_code", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const isEmailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isEmailExists !== null) {
      return new NextResponse("Email already exists", {
        status: 400,
      });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        coutry_code: country_code,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
