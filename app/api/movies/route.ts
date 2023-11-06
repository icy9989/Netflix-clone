import { NextResponse } from "next/server";

import serverAuth from "@/libs/serverAuth";

export async function GET() {
    try {

        await serverAuth();

        const movies = await prismadb.movie.findMany();

        return NextResponse.json(movies);

    } catch (error) {
        console.log("[MOVIES_GET]", error);
        return new NextResponse("Internal Server Error", { status : 500 });
    }
}