import React, { useEffect, useState } from "react";
import { ContractorType } from "../misc/types";
import { useAppContext } from "../context/AppContext";
import { fetchTesterContractors, fetchTesterDoneContractors, fetchTesters } from "../api-client";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import TesterCard from "../components/TesterCard";
import Settings from "../components/Settings";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Button, Form } from "react-bootstrap";

const Testers = (): React.JSX.Element => {
  const { user } = useAppContext()

  const [contracts, setContracts] = useState<ContractorType[]>([])
  const [finishedContracts, setFinishedContracts] = useState<ContractorType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [currentDate, setCurrentDate] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<{ fullName: string, id: number }>({ fullName: user?.fullName || "", id: user?.id || 0 })
  const [users, setUsers] = useState<{ fullName: string, id: number }[]>([])

  const translation = useTranslation("global")[0]

  const handleFetchData = async (id: number | undefined) => {
    setIsLoading(true)
    const dataContracts = await fetchTesterContractors(id || -1)
    const dataDoneContractors = await fetchTesterDoneContractors(id || -1)

    const sortedContracts = dataContracts.contracts.sort((a: ContractorType, b: ContractorType) => {
      return (a.order || 0) - (b.order || 0);
    });

    const sortedFinishedContracts = dataDoneContractors.contracts.sort((a: ContractorType, b: ContractorType) => {
      return (a.order || 0) - (b.order || 0);
    });

    setContracts(sortedContracts)
    setFinishedContracts(sortedFinishedContracts)
    setIsLoading(false)
  }

  const handleFetchTesters = async () => {
    const users = await fetchTesters()
    setUsers(users.users)
    setSelectedUser({ fullName: user?.fullName || "", id: user?.id || -1 })
  }


  const handleDateChange = (value: string) => {
    const dateObj = new Date(value)
    const fixedDate = dateObj.toISOString().slice(0, 10)
    setDate(fixedDate)
  }

  const handleDecrementDate = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    const updatedDate = currentDate.toISOString().slice(0, 10);
    setDate(updatedDate);
  }

  const handleIncrementDate = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    const updatedDate = currentDate.toISOString().slice(0, 10);
    setDate(updatedDate);
  }

  useEffect(() => {
    handleFetchTesters()
    handleFetchData(selectedUser.id || -1)
    const date = new Date();
    const formattedDate = `${date.getFullYear()}:${(date.getMonth() + 1).toString().padStart(2, '0')}:${date.getDate().toString().padStart(2, '0')}`;
    const updatedDate = formattedDate.replace(/:/g, '-');
    setCurrentDate(updatedDate);
  }, [])

  if (isLoading)
    return <Loading />
  return (
    <div className="testers container position-relative">
      <div className="settings-holder">
        <Settings role={user?.role || "no"} />
      </div>

      <Form>
        <Form.Group className="select-holder">
          <div className="d-flex align-items-center">
            <Button variant="light" onClick={handleIncrementDate}>
              <FaAngleLeft />
            </Button>
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => handleDateChange(event.target.value)}
            />
            <Button variant="light" onClick={handleDecrementDate}>
              <FaAngleRight />
            </Button>
          </div>
        </Form.Group>

        {user?.role === "mainTester" && (
          <Form.Group className="select-holder">
            <Form.Control
              as="select"
              value={selectedUser?.id || ""}
              onChange={(event) => {
                const selected = users.find((user) => user.id === parseInt(event.target.value));
                setSelectedUser({ fullName: selected?.fullName || "", id: selected?.id || 0 });
                handleFetchData(selected?.id)
              }}
            >
              <option value="">Select User</option>
              {users
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        )}
      </Form>

      {(
        !contracts.length ||
        !contracts.filter(item => item.date?.slice(0, 10) === date.slice(0, 10)).length
      ) && (
          <p className="emptyMessage">{translation("tester.components.emptyMessage")}</p>
        )}

      {contracts.filter(item => item.date?.slice(0, 10) === date.slice(0, 10)).map(item => (
        <TesterCard
          key={item.id}
          item={item}
          fetchData={() => handleFetchData(selectedUser.id)}
          disable={item.date?.slice(0, 10) !== currentDate}
        />
      ))}

      <hr />

      <p className="title">{translation("tester.components.title")}</p>

      {finishedContracts.filter(item => item.date?.slice(0, 10) === date.slice(0, 10)).map(item => (
        <TesterCard
          key={item.id}
          item={item}
          fetchData={() => handleFetchData(selectedUser.id)}
          disable={false}
        />
      ))}
    </div>
  )
}

export default Testers;