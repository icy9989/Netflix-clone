import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prismadb from '@/libs/prismadb';

export async function POST(req: Request) { 
    try {
        const { name, email, password } = await req.json();    

        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) {
            throw new NextResponse("Email already existed!", { status: 422 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                hashedPassword,
                image: "",
                emailVerified: new Date()

            }
        })

        return NextResponse.json(user);
        
    } catch(error) {
        console.log("[REGISTER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}