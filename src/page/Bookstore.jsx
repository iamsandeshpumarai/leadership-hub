import React from 'react'
import PublishedWorks from '../Component/Bookstore/PublishedWork'
import BooksSection from '../Component/Bookstore/Booksection'
import AboutAuthor from '../Component/Bookstore/AboutAuthor'

const Bookstore = () => {
  return (
    <div className='w-[85%] mx-auto mt-[90px]'>
      <PublishedWorks/>
      <BooksSection/>
      <AboutAuthor/>
    </div>
  )
}

export default Bookstore
