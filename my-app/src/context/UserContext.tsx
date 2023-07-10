
import React, { createContext, useContext, useEffect, useState } from "react"
import { useWeb3 } from "./Web3Context"

// Define the type for the user context.
type UserContextType = {
  user: string | null
}

// Create a context for user data.
const UserContext = createContext<UserContextType>({
  user: null,
})

/**
 * useUser method
 * @returns 
 */
export const useUser = () => useContext(UserContext)

/**
 * UserProvider Component
 */
export const UserProvider = (
    { children }: { children: React.ReactNode }
) => {
  // call useWeb3 method
  const { web3 } = useWeb3()
  const [user, setUser] = useState<string | null>(null)

  /**
   * fetchUserAccount method
   */
  const fetchUserAccount = async () => {
    // Use Web3 to get user's accounts.
    const accounts = await web3?.eth.getAccounts()

    // Update the user state with the first account (if available), otherwise set to null.
    setUser(accounts ? accounts[0] : null)
  }

  // Run fetchUserAccount function whenever the web3 instance changes.
  useEffect(() => {
    fetchUserAccount()
  }, [web3])

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}