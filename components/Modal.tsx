import React, { useState, useEffect } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import axios from 'axios';
import { BASE_URL } from '../utils';
import { client } from '../utils/client';
import Image from 'next/image';

const Modal = ({name, username, setName, setUsername, image, setImage, id} : any) => {
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState(name)
    const [newUsername, setNewUsername] = useState(username)
    const [newImg, setNewImg] = useState<any>(image)

    useEffect(() => {
      setNewName(name)
      setNewUsername(username)
      setNewImg(image)
    }, [name, username, image])
    
    const handleUploadImage = async (e : any) => {
      const selectedFile = e.target.files[0]
      client.assets.upload('image', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      }).then((data) => {
        setNewImg(data.url)
      })

    }

    const handleSubmit = () => {
      setShowModal(false)
      setName(newName)
      setUsername(newUsername)
      setImage(newImg)
      
      axios.put(`${BASE_URL}/api/users`, {
        id: id,
        username: newUsername,
        name: newName,
        image: newImg
      })
    }

    const handleClose = () => {
      setShowModal(false)
      setNewImg(image)
    }
  return (
  <>
    <p
      className='cursor-pointer mt-3' 
      onClick={() => setShowModal(true)}><AiFillEdit/></p>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Edit Profile
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black h-6 w-6 text-2xl ">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
              <form>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 mb-6 w-full group">
                      <input 
                        defaultValue={username} 
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        onChange={(e) => setNewUsername(e.target.value)}
                        />

                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                      <input 
                        defaultValue={name}   
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                        onChange={(e) => setNewName(e.target.value)}
                        />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload profile Image</label>
                    <input 
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      />
                  </div>
                  <div className=''>
                    <Image
                      width={100}
                      height={100} 
                      className='rounded-full h-32 w-32 object-scale-down bg-black'
                      src={newImg}
                    />
                  </div>
                </div>
              </form>
              </div>
              {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  )
}

export default Modal