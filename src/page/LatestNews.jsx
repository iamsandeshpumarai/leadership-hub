import React from 'react'
import NewsHeader from '../Component/latestnews/NewsHeader'
import NewsArchive from '../Component/latestnews/NewsCard'
import NewsletterSignup from '../Component/latestnews/NewsLetter'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Shared/Loading'
import { fetchNews } from '../../utils/fetchData'

const LatestNews = () => {
 const {data,isLoading} =  useQuery({
  queryKey:["newsdata"],
  queryFn: fetchNews
 })
 console.log(data?.data?.data,"is the data")
 if(isLoading) <Loading/>
  return (
    <>
    <div className='md:w-[85%] md:mx-auto mt-[110px] mb-12'>
      <NewsHeader/>
      <NewsArchive newsList={data?.data?.data || []} />

    </div>
    <NewsletterSignup/>
    </>
  )
}

export default LatestNews
