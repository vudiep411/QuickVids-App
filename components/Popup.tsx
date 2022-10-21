import React from 'react'
import {AiFillDelete} from 'react-icons/ai'

const Popup = ({handleDelete} : any) => {
    const [showModal, setShowModal] = React.useState(false);
  return (
    <>
    <button
      className="bg-transparent mt-1 text-[#dc2626] active:bg-pink-600 font-bold uppercase text-md"
      type="button"
      onClick={() => setShowModal(true)}
    >
      <AiFillDelete className='transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110'/>
    </button>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">
                  Are your sure you want to delete this video ?
                </h3>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-gray-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    handleDelete()
                    setShowModal(false)}}
                >
                  Delete
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

export default Popup