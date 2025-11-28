import React from 'react'
import NewsHeader from '../Component/latestnews/NewsHeader'
import NewsArchive from '../Component/latestnews/NewsCard'
import NewsletterSignup from '../Component/latestnews/NewsLetter'

const LatestNews = () => {
  return (
    <>
    <div className='md:w-[85%] md:mx-auto mt-[110px] mb-12'>
      <NewsHeader/>
      <NewsArchive/>

    </div>
    <NewsletterSignup/>
    </>
  )
}

export default LatestNews
