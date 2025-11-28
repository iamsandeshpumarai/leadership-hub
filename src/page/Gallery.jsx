import React from 'react'
import GalleryHead from '../Component/Gallery/GalleryHead'
import GalleryFilter from '../Component/Section/GalleryFilter'

const Gallery = () => {
  return (
    <div className='w-[85%] mt-[100px] mx-auto'>
      <GalleryHead/>
      <GalleryFilter/>
    </div>
  )
}

export default Gallery
