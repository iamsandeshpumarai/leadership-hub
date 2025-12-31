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

 const defaultData = [
    {
        "_id": "6954a882b8448f9a7aa2b033",
        "title": "Former Minister Giriraj Mani Pokharel Visits Gaushala Engineering College",
        "description": "Pokharel visited Gaushala Engineering College (Rajarshi Janak University) and shared news about civil engineering course approval by Nepal Engineering Council, aiming to make Mahottari an educational hub.",
        "date": "2023-01-11T00:00:00.000Z",
        "newsurl": "https://rju.edu.np/former-minister-giriraj-mani-pokharel-visits/",
        "createdAt": "2025-12-31T04:37:22.488Z",
        "updatedAt": "2025-12-31T04:37:22.488Z",
        "__v": 0
    },
    {
        "_id": "6954a9deb8448f9a7aa2b03b",
        "title": "Giriraj Mani Pokharel on Gebate With Nimesh Banjade",
        "description": "Pokharel in a televised debate, reflecting on political and governance issues.",
        "date": "2022-02-22T00:00:00.000Z",
        "newsurl": "https://www.youtube.com/watch?v=fCTryTpbQGc",
        "createdAt": "2025-12-31T04:43:10.763Z",
        "updatedAt": "2025-12-31T04:43:10.763Z",
        "__v": 0
    },
    {
        "_id": "6954a977b8448f9a7aa2b038",
        "title": "शिक्षा मन्त्री गिरीराजमणि पोखरेलको नयाँ खबर",
        "description": "YouTube video with Pokharel’s latest updates/speech around education issues",
        "date": "2020-07-17T00:00:00.000Z",
        "newsurl": "https://www.youtube.com/watch?v=bF1pvwkYsOc",
        "createdAt": "2025-12-31T04:41:27.100Z",
        "updatedAt": "2025-12-31T04:41:27.100Z",
        "__v": 0
    },
    {
        "_id": "6954a75fb8448f9a7aa2b02a",
        "title": "Govt committed to promotion of quality education, reaffirms Minister Pokharel",
        "description": " Pokharel spoke at the Global ICT Leadership Forum in Seoul about Nepal’s commitment to promoting quality education and using technology for development.",
        "date": "2018-11-16T00:00:00.000Z",
        "newsurl": "https://english.ratopati.com/story/7509",
        "createdAt": "2025-12-31T04:32:31.051Z",
        "updatedAt": "2025-12-31T04:32:31.051Z",
        "__v": 0
    },
    {
        "_id": "6954a7bcb8448f9a7aa2b02d",
        "title": "Minister Pokharel advises Tribhuvan University to focus on quality education",
        "description": "At the 58th anniversary of Ratna Rajya Laxmi Campus, Pokharel emphasized quality education and skills aligned with market needs.",
        "date": "2018-08-20T00:00:00.000Z",
        "newsurl": "https://thehimalayantimes.com/nepal/minister-pokhrel-advises-tu-to-pay-attention-on-quality-education",
        "createdAt": "2025-12-31T04:34:04.156Z",
        "updatedAt": "2025-12-31T04:34:04.156Z",
        "__v": 0
    },
    {
        "_id": "6954a716b8448f9a7aa2b027",
        "title": "Minister Pokharel highlights Nepal's progress on gender parity in basic education",
        "description": "Giriraj Mani Pokharel, as Education Minister, highlighted Nepal’s progress toward gender parity, equality and inclusion at a high-level UN side event focusing on SDG 4.5 on basic education.",
        "date": "2018-01-01T00:00:00.000Z",
        "newsurl": "https://myrepublica.nagariknetwork.com/index.php/news/minister-pokharel-highlights-nepal-s-progress-in-gender-parity-in-basic-education-in-new-york",
        "createdAt": "2025-12-31T04:31:18.874Z",
        "updatedAt": "2025-12-31T04:39:29.449Z",
        "__v": 0
    },
    {
        "_id": "6954a80bb8448f9a7aa2b030",
        "title": "Address by Giriraj Mani Pokharel, Minister of Education",
        "description": "Official speech by Pokharel discussing Nepal’s education policy and development priorities.",
        "date": "2018-01-01T00:00:00.000Z",
        "newsurl": "https://www.youtube.com/watch?v=7YbTipo6xfQ",
        "createdAt": "2025-12-31T04:35:23.280Z",
        "updatedAt": "2025-12-31T04:35:23.280Z",
        "__v": 0
    }
]
 if(isLoading) <Loading/>
  return (
    <>
    <div className='md:w-[85%] md:mx-auto mt-[110px] mb-12'>
      <NewsHeader/>
      <NewsArchive newsList={data?.data?.data || defaultData} />

    </div>
    <NewsletterSignup/>
    </>
  )
}

export default LatestNews
