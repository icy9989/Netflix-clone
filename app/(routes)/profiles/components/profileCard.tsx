import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProfileCardProps {
    name: string
}

const ProfileCard:React.FC<ProfileCardProps> = ({ name }) => {

  const router = useRouter();

  return (
    <div 
      onClick={() => router.push("/")}
      className='group w-100 flex flex-col justify-center items-center'
    >
        <div 
            className='
                w-100 
                h-100 
                rounded-md 
                border-2
                border-transparent
                overflow-hidden 
                group-hover:cursor-pointer 
              group-hover:border-white
              '
            >          
                <Image 
                    src="/images/default-blue.png"
                    alt='profile'
                    width="100"
                    height="100"
                    className='object-cover'
                />
        </div>
        <p className='text-gray-400 text-xl mt-5 group-hover:text-white'>{name}</p>                    
    </div>
  )
}

export default ProfileCard