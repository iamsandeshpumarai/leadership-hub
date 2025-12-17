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
    { number: "+977-1-XXXXXXX", type: "Office" },
    { number: "+977-98XXXXXXXX", type: "Mobile" },
    { number: "+977-1-XXXXXXX", type: "Fax" },
  ],
  emails: [
    { address: "office@girirajmanipokharel.np" },
    { address: "info@girirajmanipokharel.np" },
    { address: "media@girirajmanipokharel.np" },
  ],
  officeHours: [
    { day: "Sunday", openTime: "", closeTime: "", isClosed: true },
    { day: "Monday", openTime: "09:00", closeTime: "17:00", isClosed: false },
    { day: "Tuesday", openTime: "09:00", closeTime: "17:00", isClosed: false },
    { day: "Wednesday", openTime: "09:00", closeTime: "17:00", isClosed: false },
    { day: "Thursday", openTime: "09:00", closeTime: "17:00", isClosed: false },
    { day: "Friday", openTime: "09:00", closeTime: "17:00", isClosed: false },
    { day: "Saturday", openTime: "10:00", closeTime: "14:00", isClosed: false },
  ],
  Parking: "Available",
  Accessible: "By Public Transport",
  location: "Central",
  visitHeading:
    "Our office is located in the heart of Kathmandu. We welcome scheduled visits and meetings during our regular office hours.",
  visitDescription: "Kathmandu, Bagmati Province, Nepal",
};

const ContactPage = () => {
  const { data, isError } = useQuery({
    queryKey: ["contactdata"],
    queryFn: contactDatas
  });

  const contactData = !isError && data ? data?.data?.data : fallback;
  console.log(contactData,"is the contact data")

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
