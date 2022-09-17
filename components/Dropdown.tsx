import React, {useState} from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GoogleLogin } from '@react-oauth/google';

const Dropdown = ({addUser, createOrGetUser} : any) => {
    const [isActive, setIsActive] = useState(false)
    const handleActive = () => {
        if(isActive)
            setIsActive(false)
        else
            setIsActive(true)
    }
  return (
    <div className="relative inline-block text-left">
        <button onClick={handleActive} className="text-white">
            {   !isActive ?
                <AiOutlineMenu/> : <ImCancelCircle/>}
        </button>

{   isActive &&   
    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
        <div>
            <div className="text-gray-700 block text-sm" role="menuitem" >
                <GoogleLogin
                    useOneTap
                    onSuccess={(response) => createOrGetUser(response, addUser)}
                    onError={() => {console.log('Error')}}
                />                
            </div>
        </div>
      </div> 
      }
    </div>
  )
}

export default Dropdown