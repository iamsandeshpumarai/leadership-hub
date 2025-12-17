import api from "./api";
export const fetchHomeData = async()=>{
const data = await api.get('/home/gethomedata')
return data.data
}

export const fetchBioData = async()=>{
    const data = await api.get('/bio/getbio')
    return data
}

export const fetchEvents = async () => {
  // Make sure the path matches your backend route exactly
  const res = await api.get("/event/getevent"); 
  return res
};

export const fetchGallery = async () => {
      const res = await api.get("/gallery/getdata"); // your 
      return res
    }

export const fetchNews =   async  ()=> {
    const response = await api.get("/news/getnews")
    return response
  }


export const contactDatas = async () => {
      const res = await api.get("/contact");
      return res // important: access response.data
    }


    export const fetchBooks = async () => {
  const response = await api.get("/store"); // axios assumed
  return response.data; // return the data directly
};


export const fetchAuthorData = async function getAuthorData(){ const data = await api.get("/store/getauthor") 
      return data
    }

   export const logOutMutation =  async ()=>{
 await api.post("/logout")}


 export const logInMutation = async (datas)=>{
 const data =  api.post("/login",datas)
   return data
 }