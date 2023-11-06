import { NextResponse } from "next/server";

import serverAuth from "@/libs/serverAuth";

export async function GET(req: Request, { params } : { params: { movieId: string }}) {
    try {

        await serverAuth();

        if(!params.movieId) {
            return new NextResponse("Movie id is required", { status: 400 });
        }

        if(typeof params.movieId !== 'string') {
            return new NextResponse("Invalid movie id", { status: 400 });
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: params.movieId
            }
        })

        return NextResponse.json(movie);

    } catch (error) {
        console.log("[MOVIE_GET]", error);
        return new NextResponse("Internal Server Error", { status : 500 });
    }
}