import siteConfig from '@/config/siteConfig'
import React from 'react'
import { Circle } from '../../icons/Circle'

function TitleDesc() {
  return (
    <>
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold flex items-center justify-center gap-2'>
        {siteConfig.siteName} <Circle />
      </h1>
      {/* <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>{siteConfig.tagline}</h2> */}
      <p className='text-secondary-foreground/70 text-sm md:text-md lg:text-base'>
        {siteConfig.description}
      </p>
    </>
  )
}

export default TitleDesc
