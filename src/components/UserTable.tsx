import React, { useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { User } from "../misc/types";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import { IoIosClose, IoIosRefresh } from "react-icons/io";
import { searchText } from "../misc/hepers";


interface Props {
  users: User[],
  getUsers: () => void,
  handleSelectUser: (user: User | undefined) => void,
  selectedUser: User | undefined
}

const UserTable = ({ users, getUsers, handleSelectUser, selectedUser }: Props): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showTesters, setShowTesters] = useState(false);
  const [search, setSearch] = useState<string>("")

  const { user } = useAppContext()
  const translating = useTranslation("global")[0]

  const filteredUsers = showTesters
    ? users.filter((user) => user.role === "tester" && searchText(search, user.fullName))
    : users.filter(user => searchText(search, user.fullName));

  const reFetchUsers = async () => {
    setIsLoading(true)
    await getUsers()
    setIsLoading(false)
  }

  if (isLoading)
    return <Loading />

  return (
    <div className="user-table flex-grow-1 h-100">
      <div className="d-flex flex-row-reverse align-items-center">
        <label className={showTesters ? "show-tester active ms-auto d-block" : "show-tester ms-auto"}>
          <input
            type="checkbox"
            checked={showTesters}
            onChange={(e) => setShowTesters(e.target.checked)}
          />
          {translating("users.table.components.show-tester")}
        </label>

        <div
          className="remove-box ms-auto"
          onClick={() => {
            handleSelectUser(undefined)
          }}
        >
          <IoIosClose />
        </div>

        <Form.Group className="search my-2">
          <Form.Control
            type="text"
            minLength={0}
            maxLength={36}
            value={search}
            placeholder={translating("users.table.components.search")}
            onChange={(event) => setSearch(event.target.value)}
            required
          />
        </Form.Group>

        <IoIosRefresh
          className="refresh"
          onClick={reFetchUsers}
        />

      </div>

      <Table striped bordered hover>
        <thead>
          <tr className="main-row">
            <th>{translating("users.table.row.role")}</th>
            <th>{translating("users.table.row.phone")}</th>
            <th>{translating("users.table.row.name")}</th>
            <th>{translating("users.table.row.id")}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="admin"
            key={user?.id}
            onClick={() => {
              handleSelectUser(user)
            }}
          >
            <td>{user?.role}</td>
            <td>{user?.mobileNumber}</td>
            <td>{user?.fullName}</td>
            <td>{user?.id}</td>
          </tr>
          {filteredUsers.map((row) => (
            <tr
              key={row.id}
              className={selectedUser && row.id === selectedUser.id ? "selected" : ""}
              onClick={() => {
                handleSelectUser(row)
              }}
            >
              <td>{row.role}</td>
              <td>{row.mobileNumber}</td>
              <td>{row.fullName}</td>
              <td>{row.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserTable;