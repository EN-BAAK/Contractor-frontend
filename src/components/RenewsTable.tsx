import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { RenewsType } from "../misc/types";
import Loading from "./Loading";
import { IoIosClose, IoIosRefresh } from "react-icons/io";
import { searchText } from "../misc/hepers";
import { useAppContext } from "../context/AppContext";


interface Props {
  renews: RenewsType[],
  getRenews: () => void,
  handleSelectRenew: (user: RenewsType | undefined) => void,
  selectedRenew: RenewsType[]
  setVisible: (is: boolean) => void,
  onOpen: () => void
}

const RenewsTable = ({ renews, getRenews, handleSelectRenew, onOpen, selectedRenew, setVisible }: Props): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const { user } = useAppContext()

  const filteredRenews =
    renews.filter(
      renew =>
        searchText(search, renew.name)
        || searchText(search, renew.companyName)
        || searchText(search, renew.city)
        || searchText(search, renew.phone)
    )

  const translating = useTranslation("global")[0]

  const reFetchRenews = async () => {
    setIsLoading(true)
    await getRenews()
    setIsLoading(false)
  }

  if (isLoading)
    return <Loading />

  return (
    <div className="renew-table h-100">
      <div className="d-flex align-items-center justify-content-end gap-3 my-2 px-3">
        <Button
          variant="warning"
          className="my-btn"
          onClick={onOpen}
        >
          {translating("renews.table.components.addNews")}
        </Button>

        {user?.role === "admin" &&
          <Button
            variant="primary"
            className={selectedRenew.length > 0 ? "my-btn" : "my-btn disabled"}
            onClick={() => setVisible(true)}
          >
            {translating("renews.table.components.addContracts")}
          </Button>
        }

        <IoIosRefresh
          className="refresh"
          onClick={reFetchRenews}
        />

        <Form.Group className="my-2">
          <Form.Control
            type="text"
            minLength={0}
            maxLength={36}
            value={search}
            placeholder={translating("renews.table.components.search")}
            onChange={(event) => setSearch(event.target.value)}
            required
          />
        </Form.Group>

        <div
          className="remove-box"
          onClick={() => {
            handleSelectRenew(undefined)
          }}
        >
          <IoIosClose />
        </div>
      </div>

      <div className={user?.role !== "admin" ? "table-holder secrter" : "table-holder"}>
        <Table striped bordered hover>
          <thead>
            <tr className="main-row">
              <th>{translating("renews.table.row.notes")}</th>
              <th>{translating("renews.table.row.location")}</th>
              <th>{translating("renews.table.row.city")}</th>
              <th>{translating("renews.table.row.creator")}</th>
              <th>{translating("renews.table.row.phone")}</th>
              <th>{translating("renews.table.row.companyName")}</th>
              <th>{translating("renews.table.row.name")}</th>
              <th>{translating("renews.table.row.id")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRenews.map((row) => (
              <tr
                key={row.id}
                className={
                  selectedRenew.length > 0 && selectedRenew.some((selected) => selected.id === row.id)
                    ? "selected" : ""}
                onClick={() => {
                  handleSelectRenew(row)
                }}
              >
                <td className="notes-row">{row.notes || "---"}</td>
                <td>{row.location}</td>
                <td>{row.city}</td>
                <td>{row.creator}</td>
                <td>{row.phone}</td>
                <td>{row.companyName}</td>
                <td>{row.name}</td>
                <td>{row.id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default RenewsTable;