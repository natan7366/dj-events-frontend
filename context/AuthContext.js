import { createContext, useState, useEffect } from "react" 
import { useRouter } from "next/router"
import { API_URL } from "@/config/index"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // register user

  // login user

  // logout user

  // check if user is logged in

}

