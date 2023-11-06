import { NextResponse } from "next/server";
import { without } from "lodash";

import serverAuth from "@/libs/serverAuth";

export async function POST(req: Request) {
    try {

        const { movieId } = await req.json();

        const { currentUser } = await serverAuth();

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if(!existingMovie) {
            return new NextResponse("Invalid movie Id", { status : 400 })
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || ""
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })

        return NextResponse.json(user);

    } catch (error) {
        console.log("[FAVORITE_POST]", error);
        return new NextResponse("Internal Server Error", { status : 500 });
    }
}

export async function DELETE(req: Request) {
    try {

        const { movieId } = await req.json();

        const { currentUser } = await serverAuth();

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if(!existingMovie) {
            return new NextResponse("Invalid movie Id", { status : 400 })
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || ""
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        })

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.log("[FAVORITE_DELETE]", error);
        return new NextResponse("Internal Server Error", { status : 500 });
    }
}