import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import serverAuth from "@/libs/serverAuth";

export async function GET() {
    try {

        await serverAuth();

        const movieCount = await prismadb.movie.count();
        const movieIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: movieIndex
        });

        return NextResponse.json(randomMovies[0]);

    } catch (error) {
        console.log("[RANDOM_GET]", error);
        return new NextResponse("Internal Server Error", { status : 500 });
    }
}