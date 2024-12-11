import React, { useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { User } from "../misc/types";
import { useAppContext } from "../context/AppContext";

const Users = (): React.JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

  const { users, setUsers } = useAppContext()

  const handleSelectedUser = (user: User | undefined) => {
    setSelectedUser(user)
  }

  return (
    <section className="bg-white d-flex flex-column flex-lg-row align-items-center justify-content-center flex-grow-1 h-100">
      <UserForm
        selectedUser={selectedUser}
        handleSelectUser={handleSelectedUser}
      />
      <UserTable
        users={users}
        getUsers={setUsers}
        handleSelectUser={handleSelectedUser}
        selectedUser={selectedUser}
      />
    </section>
  )
}

export default Users