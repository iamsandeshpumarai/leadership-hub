import { useQuery } from "@tanstack/react-query";


import ContactHeader from "../Component/contact/ContactHeader";
import ContactInfoSection from "../Component/contact/ContactInfoCard";
import VisitOfficeSection from "../Component/contact/VisitOffice";
import SendMessageSection from "../Component/contact/Inquiry";
import { contactDatas } from "../../utils/fetchData";


const fallback = {
  officeAddress: "Political Office",
  province: "Bagmati Province",
  cityState: "Kathmandu, Nepal",
  phoneNumbers: [
    { number: "+977-1-XXXXXXX"},
    { number: "+977-98XXXXXXXX"},
    { number: "+977-1-XXXXXXX"},
  ],
  emails: [
    { address: "office@girirajmanipokharel.np" },
    { address: "info@girirajmanipokharel.np" },
    { address: "media@girirajmanipokharel.np" },
  ],
  officeHours: [
    { day: "Sunday - Thursday", time: "10:00 AM - 5:00 PM" },
    { day: "Friday", time: "10:00 AM - 3:00 PM" },
  ],
  Parking: "Available",
  Accessible: "Accessible",
  location: "Central",
  visitHeading:
    "Our office is located in the heart of Kathmandu. We welcome scheduled visits and meetings during our regular office hours.",
  visitDescription: "Kathmandu, Bagmati Province, Nepal",
};

const ContactPage = () => {
  const { data} = useQuery({
    queryKey: ["contactdata"],
    queryFn: contactDatas
  });

  const contactData =  data?.data?.data || fallback;

  return (
    <>
      <div className="w-[85%] mx-auto mt-[40px]">
        <ContactHeader />
        <ContactInfoSection contactData={contactData} />
        <SendMessageSection />
      </div>
      <VisitOfficeSection contactData={contactData} />
    </>
  );
};

export default ContactPage;
