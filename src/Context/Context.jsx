import { useQuery } from "@tanstack/react-query";
import api from '../../utils/api'
import { DataContext } from "./CreateContext";


export const AuthProvider = ({ children }) => {
  const {
    data: user,isLoading} = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await api.get("/check",{withCredentials:true});
      return res.data;
    },
      refetchOnWindowFocus: false,


  });

  return (
    <DataContext.Provider
      value={{user,isLoading}}
    >
      {children}
    </DataContext.Provider>
  );
};
