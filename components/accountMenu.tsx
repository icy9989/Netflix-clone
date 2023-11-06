import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountMenuProps {
    visible?: boolean
}

const AccountMenu:React.FC<AccountMenuProps> = ({ visible }) => {

    const { data: currentUser } = useCurrentUser();

    if(!visible) {
        return null;
    }

    return (
        <div className="w-56 bg-black absolute top-14 right-0 py-5 border-2 border-gray-800">
            <div className="flex flex-col gap-3">
                <div className="group flex flex-row items-center px-3 gap-3">
                    <Image
                        src="/images/default-blue.png"
                        alt="profile"
                        width="35"
                        height="35"
                        className="object-cover rounded-md" 
                    />
                    <p className="text-white text-sm group-hover:underline">{currentUser?.name}</p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div 
                    onClick={() => signOut()}
                    className="text-white text-sm text-center hover:underline"
                >
                    sign out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu