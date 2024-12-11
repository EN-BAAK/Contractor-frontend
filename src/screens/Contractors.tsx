import React, { useEffect, useState } from "react";
import { deleteContractors, doneContractors, fetchContractors } from "../api-client";
import { Button, Form, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import { formatAMPM, isdatePassed, searchText } from "../misc/hepers";
import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";
import { IoIosClose, IoIosRefresh } from "react-icons/io";
import EditContracts from "../components/EditContracts";

export interface contracts {
  id?: number;
  name: string;
  companyName: string;
  phone: string;
  city: string;
  location: string;
  locationLink?: string;
  notes?: string;
  date: string;
  done: string,
  tester_id: number,
  tester_name: string,
  order?: number,
  creator: string
}

const Contractors = (): React.JSX.Element => {
  const [contracts, setContracts] = useState<contracts[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<contracts | undefined>(undefined)
  const [visible, setVisible] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const { showToast, users } = useAppContext()
  const translating = useTranslation("global")[0]

  const filteredRenews = contracts
    .filter(
      renew =>
        searchText(search, renew.name) ||
        searchText(search, renew.companyName) ||
        searchText(search, renew.city) ||
        searchText(search, renew.tester_name)
    )
    .sort((a, b) => {
      const dateA = new Date(a.date.slice(0, 10));
      const dateB = new Date(b.date.slice(0, 10));

      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return (a.order ?? 0) - (b.order ?? 0);
      }
    });

  const fetchData = async () => {
    setIsLoading(true)
    const data = await fetchContractors()
    setContracts(data.contracts)
    setIsLoading(false)
  }

  const mutationDelete = useMutation(deleteContractors, {
    onSuccess: async () => {
      showToast({ message: translating("contracts.actions.delete.success"), type: "SUCCESS" })
      fetchData()
      setSelectedRow(undefined)
    },
    onError: () => {
      showToast({ message: translating("contracts.actions.delete.error"), type: "ERROR" })
    }
  })

  const mutationDone = useMutation(doneContractors, {
    onSuccess: async () => {
      showToast({ message: translating("contracts.actions.edit.success"), type: "SUCCESS" })
      fetchData()
      setSelectedRow(undefined)
    },
    onError: () => {
      showToast({ message: translating("contracts.actions.edit.error"), type: "ERROR" })
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading)
    return <Loading />

  return (
    <div className="contractor-table flex-grow-1 h-100 position-relative">
      <div className="buttons">
        <IoIosRefresh
          className="refresh"
          onClick={fetchData}
        />

        <div
          className="remove-box"
          onClick={() => {
            setSelectedRow(undefined)
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
            placeholder={translating("contracts.components.search")}
            onChange={(event) => setSearch(event.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="danger"
          className={selectedRow ? "" : "disabled"}
          onClick={() => mutationDelete.mutate(selectedRow?.id || 0)}
        >{translating("contracts.components.delete")}</Button>

        <Button
          variant="warning"
          className={selectedRow ? "" : "disabled"}
          onClick={() => setVisible(true)}
        >
          {translating("contracts.components.edit")}
        </Button>

        <Button
          variant="primary"
          className={selectedRow ? "" : "disabled"}
          onClick={() => mutationDone.mutate(selectedRow?.id || 0)}
        >
          {translating("contracts.components.done")}
        </Button>
      </div>

      <div className="table-holder">
        <Table striped bordered hover>
          <thead>
            <tr className="main-row" key={0}>
              <th>{translating("contracts.table.notes")}</th>
              <th>{translating("contracts.table.order")}</th>
              <th>{translating("contracts.table.date")}</th>
              <th>{translating("contracts.table.location")}</th>
              <th>{translating("contracts.table.city")}</th>
              <th>{translating("contracts.table.creator")}</th>
              <th>{translating("contracts.table.tester")}</th>
              <th>{translating("contracts.table.companyName")}</th>
              <th>{translating("contracts.table.name")}</th>
              <th>{translating("contracts.table.id")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRenews.map((row) => (
              <tr
                key={row.id}
                className={selectedRow && row.id === selectedRow.id ? "selected" : ""}
                onClick={() =>
                  setSelectedRow(row)
                }
              >
                <td className="long-row">{row.notes || "---"}</td>
                <td>{row.order}</td>
                <td className={!isdatePassed(row.date) ? "passed" : ""}>{row.date.slice(0, 10)} {formatAMPM(row.date)}</td>
                <td className="long-row">{row.location}</td>
                <td>{row.city}</td>
                <td>{row.creator}</td>
                <td>{row.tester_name}</td>
                <td>{row.companyName}</td>
                <td>{row.name}</td>
                <td>{row.id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <EditContracts
        id={selectedRow?.id || 0}
        name={selectedRow?.name || ""}
        phone={selectedRow?.phone.toString() || ""}
        companyName={selectedRow?.companyName || ""}
        city={selectedRow?.city || ""}
        location={selectedRow?.location || ""}
        locationLink={selectedRow?.locationLink}
        notes={selectedRow?.notes || ""}
        order={selectedRow?.order || 0}
        visible={visible}
        date={selectedRow?.date || ""}
        user={users.find(item => item.id === selectedRow?.tester_id)}
        onClose={() => setVisible(false)}
        fetchData={fetchData}
        setSelectedRow={setSelectedRow}
        creator={selectedRow?.creator || "---"}
      />
    </div>
  )
}

export default Contractors