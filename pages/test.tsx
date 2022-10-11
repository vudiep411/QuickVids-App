import React from 'react'
import useSound from 'use-sound'


const Test = () => {
    const [play] = useSound<any>('/sounds/Soft-ding-sound-effect.mp3')
  return (
    <div>
        <button onClick={play}>Click</button>
    </div>
  )
}

export default Test