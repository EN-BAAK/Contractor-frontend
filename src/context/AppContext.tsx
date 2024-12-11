import React, { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { AppContext as AppContextType, ToastMessage, User } from "../misc/types"
import { useQuery } from "react-query"
import { fetchCurrentUser, fetchUsers } from "../api-client"
import { Toast } from "../components/Toast"
import Loading from "../components/Loading"

interface Props {
  children: ReactNode
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppContextProvider = ({ children }: Props): React.JSX.Element => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
  const [fetchUserLoading, setFechUserLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])

  const { isError, data, isLoading } = useQuery("validateToken", fetchCurrentUser, {
    retry: false,
    refetchOnWindowFocus: false
  })

  const getAllUsers = async () => {
    const data = await fetchUsers();
    setUsers(data.users);
  }

  const handleFetchUsers = async () => {
    setFechUserLoading(true)
    await getAllUsers()
    setFechUserLoading(false)
  }

  useEffect(() => {
    if (data && data.role === "admin")
      handleFetchUsers()
  }, [])

  useEffect(() => {
    if (data && data.role === "admin")
      getAllUsers()
  }, [data])

  if (isLoading || fetchUserLoading)
    return <Loading />

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        user: data ? data : undefined,
        showToast: (toastMessage) => setToast(toastMessage),
        users,
        setUsers: handleFetchUsers
      }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider >
  )
}

export const useAppContext = () => {
  const CONTEXT = useContext(AppContext)
  return CONTEXT as AppContextType
}

export default AppContextProvider