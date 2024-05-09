import Image from 'next/image'
import React from 'react'

const Loading = ({message}) => {
  return (
    <div>
        <Image src="/icons/loading.svg" width={75} height={75} alt='loading' className='spin absolute top-1/2 right-1/2 translate -translate-x-1/2 -translate-y-1/2'/>
        <p>{message}</p>
    </div>
  )
}

export default Loading