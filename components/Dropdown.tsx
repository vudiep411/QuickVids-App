import React, {useState} from 'react'
import { ImCancelCircle } from 'react-icons/im';
import { GoogleLogin } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import { aboutURL } from '../utils/constants';

const Dropdown = ({addUser, createOrGetUser, userProfile, image, logout, router} : any) => {
    const transition = 'transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110'
    const [isActive, setIsActive] = useState(false)
    const signIn = !userProfile ? 'w-54' : 'w-40'

    const handleActive = () => {
        if(isActive)
            setIsActive(false)
        else
            setIsActive(true)
    }

  return (
    <div className="relative inline-block text-left">
        { !userProfile ? (
            <button onClick={handleActive} className="text-white md:text-2xl hover:bg-[rgb(80,80,80)] p-2 rounded-md">
            {   !isActive ?
                <Typography>Sign In</Typography> : <ImCancelCircle/>}
            </button>
        ):(
            <div className={`${transition} w-[30px] md:w-[40px]`} onClick={handleActive}>
                <Avatar                    
                    style={{cursor: 'pointer'}}
                    sx={{width: 40, 
                        height: 40,
                        display: { xs: 'none', md: 'block' }
                    }}
                    src={image}
                />
                <Avatar                    
                    style={{cursor: 'pointer'}}
                    sx={{width: 30, 
                        height: 30,
                        display: { xs: 'block', md: 'none' }
                    }}
                    src={image}
                />                
            </div>                    
        )
        }

        { isActive &&   
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
                                className="block w-full text-sm" role="menuitem">
                                    <AccountCircleIcon/>&nbsp; Profile
                            </button>                              
                        </div>
                        <div className="text-white block text-sm p-2 rounded-md hover:bg-[rgb(80,80,80)]" role="menuitem" >
                            <button onClick={logout} className="block w-full text-sm" role="menuitem">
                                <p><PowerSettingsNewIcon/>&nbsp; Sign out</p>    
                            </button>                              
                        </div>
                    </div>
                    }
                    <Divider/>
                    <div className="text-white block text-sm p-2 rounded-md hover:bg-[rgb(80,80,80)]" role="menuitem" >
                        <button className="block w-full text-sm" role="menuitem" onClick={() => window.open(`${aboutURL}/about`)}>
                            <p><InfoIcon/>&nbsp; About</p>    
                        </button>                              
                    </div>
                    <div className="text-white block text-sm p-2 rounded-md hover:bg-[rgb(80,80,80)]" role="menuitem" >
                        <button className="block w-full text-sm" role="menuitem" onClick={() => window.open(`${aboutURL}/help`)}>
                            <p><HelpIcon/>&nbsp; Help</p>    
                        </button>                              
                    </div>
                </div>
            </div> 
        }
    </div>
  )
}

export default Dropdown