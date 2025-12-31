import Herosection from '../Component/Section/Herosection'
import Experience from '../Component/Experience'
import { useQuery } from '@tanstack/react-query'

import Loading from '../Shared/Loading'
import { fetchHomeData } from '../../utils/fetchData'

const Home = () => {
  const {data,loading}= useQuery({
    queryKey:["homedata"],
    queryFn : fetchHomeData
    }
  )
 
  if (loading)  <Loading/>
  return (
    <div className='md:w-[85%] md:mx-auto'>
     <Herosection herodata={data?.data[0]?.hero}/>
     <Experience expndata = {data?.data[0]?.experience}/>
    </div>
  )
}

export default Home
