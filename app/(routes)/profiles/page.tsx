"use client"

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import useCurrentUser from "@/hooks/useCurrentUser";

import ProfileCard from "./components/profileCard"

const ProfilesPage = () => {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth");
        },
      })
      
    const { data: currentUser } = useCurrentUser();

    return (
        <div className='h-full flex justify-center items-center'>
            <div className='flex flex-col'>
                <h2 className='text-white text-3xl md:text-5xl'>Who&#39;s is watching?</h2>
                <div className='flex justify-center items-center gap-8 mt-10'>
                    <ProfileCard name={currentUser?.name} />
                </div>
            </div>
        </div>     
    )
}

export default ProfilesPage