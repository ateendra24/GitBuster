import siteConfig from '@/config/siteConfig'
import React from 'react'
import { Circle } from '../../../../public/Circle'

function TitleDesc() {
  return (
    <>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold flex items-center justify-center gap-2'>
        {siteConfig.siteName} <Circle />
      </h1>
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>{siteConfig.tagline}</h2>
      <p className='opacity-60 text-sm md:text-md lg:text-base'>
        {siteConfig.description}
      </p>
    </>
  )
}

export default TitleDesc
