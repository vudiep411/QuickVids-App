import React, {useState} from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';

const Dropdown = ({addUser, createOrGetUser, userProfile, image, logout, router} : any) => {
    const transition = 'transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110'
    const [isActive, setIsActive] = useState(false)
    const handleActive = () => {
        if(isActive)
            setIsActive(false)
        else
            setIsActive(true)
    }
    const signIn = !userProfile ? 'w-54' : 'w-40'
  return (
    <div className="relative inline-block text-left">
        {
            !userProfile ? 
            (
            <button onClick={handleActive} className="text-white md:text-2xl">
            {   !isActive ?
                <AiOutlineMenu/> : <ImCancelCircle/>}
            </button>
            ):(
            <div className={`${transition} w-[30px] md:w-[40px]`} onClick={handleActive}>
                <Image
                    width={40}
                    height={40}
                    className='rounded-full h-10 w-10 object-scale-down bg-black cursor-pointer'
                    src={image}
                    alt='profile photo'
                />
            </div>                    
            )
        }

{   isActive &&   
    <div className={`absolute right-0 z-10 mt-2 ${signIn} origin-top-right rounded-md bg-[rgb(64,64,64)]  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
        <div>
            {   !userProfile &&
                <div className="text-gray-700 block text-sm p-2" role="menuitem" >
                    <GoogleLogin
                        useOneTap
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={() => {console.log('Error')}}
                    />                
                </div>
            }

            {   userProfile &&
            <div>
                <div className="text-white block text-sm p-2 rounded-md hover:bg-[rgb(80,80,80)]" role="menuitem" >
                    <button onClick={() => {
                        router.push(`/profile/${userProfile._id}`)
                        handleActive()
                    }}
                    className="block w-full text-sm" role="menuitem">Your Profile</button>                              
                </div>
                <div className="text-white block text-sm p-2 rounded-md hover:bg-[rgb(80,80,80)]" role="menuitem" >
                    <button onClick={logout} className="block w-full text-sm" role="menuitem">Sign out</button>                              
                </div>
            </div>
            }
        </div>
      </div> 
}
    </div>
  )
}

export default Dropdown