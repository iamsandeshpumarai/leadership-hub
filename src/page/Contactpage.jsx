import React from 'react'
import ContactHeader from '../Component/contact/ContactHeader'
import ContactInfoSection from '../Component/contact/ContactInfoCard'
import VisitOfficeSection from '../Component/contact/VisitOffice'
import SendMessageSection from '../Component/contact/Inquiry'

const Contactpage = () => {
  return (
      <>
    <div className='w-[85%] mx-auto mt-[40px]'>
      <ContactHeader/>
      <ContactInfoSection/>
<SendMessageSection/>
    </div>
    <VisitOfficeSection/>
    </>
  )
}

export default Contactpage
