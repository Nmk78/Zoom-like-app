import Image from 'next/image'
import React from 'react'

const Loading = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        src="/icons/loading.svg"
        width={75}
        height={75}
        alt="loading"
        className="spin"
      />
      {message && (
        <p className="mt-4 text-center text-gray-600">{message}</p>
      )}
    </div>
  )
}

export default Loading
