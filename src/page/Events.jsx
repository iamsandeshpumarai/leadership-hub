import React from 'react'
import EventHeader from '../Component/Events/EventHeader'
import PastEvents from '../Component/Events/PastEvent'
import StayConnected from '../Component/Events/Stayconnected'

const Events = () => {
  return (
    <>
    <div className='w-[85%] mx-auto mt-[110px]'>
      <EventHeader/>
      <PastEvents/>
    </div>
      <StayConnected/>
    </>
  )
}

export default Events
