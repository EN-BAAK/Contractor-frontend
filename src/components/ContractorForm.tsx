import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ContractorType, RenewsType, User } from "../misc/types";
import { IoIosClose } from "react-icons/io";
import { useAppContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { addContractor } from "../api-client";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void,
  selectedRenews: RenewsType[]
}

const ContractorForm = ({ onClose, selectedRenews }: Props): React.JSX.Element => {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [user, setUser] = useState<User | undefined>(undefined)
  const [order, setOrder] = useState<number>(0)

  const { users, showToast } = useAppContext()
  const translating = useTranslation("global")[0];
  const navigationTo = useNavigate()

  const resetValue = () => {
    setDate(new Date().toISOString().slice(0, 16));
    setUser(undefined)
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSelect = (id: number) => {
    const selectedUser = users.find(item => item.id === id)
    setUser(selectedUser)
  }

  const mutation = useMutation(addContractor, {
    onSuccess: () => {
      showToast({ message: translating("renews.contractor.form.submit.success"), type: "SUCCESS" })
      resetValue()
      navigationTo("/contractors")
    },
    onError: () => {
      showToast({ message: translating("renews.contractor.form.submit.error"), type: "ERROR" })
      resetValue()
    }
  })

  const handleAdd = () => {
    if (!selectedRenews)
      return

    if (!user)
      return showToast({ message: translating("renews.contractor.form.submit.noUser"), type: "ERROR" })


    const fixedDate = new Date(date)

    const data: ContractorType[] = [
      ...selectedRenews,
    ]

    const processData = {
      renews: data, id: user.id, date: fixedDate, tester_name: user.fullName, order
    }

    mutation.mutate(processData)
  }

  return (
    <div className="contractor-form position-relative">
      <div className="title">
        <h4>{translating("renews.contractor.title")}</h4>
      </div>
      <Form className="row justify-content-center">
        <Form.Group className="col-12 d-flex align-items-center gap-2 mb-3">
          <Form.Control
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
          />
          <Form.Label>{translating("renews.contractor.form.date")}</Form.Label>
        </Form.Group>

        <Form.Group className="col-12 d-flex align-items-center gap-2 mb-3">
          <Form.Control
            type="number"
            value={order}
            onChange={(e) => setOrder(+e.target.value)}
          />
          <Form.Label>{translating("renews.contractor.form.order")}</Form.Label>
        </Form.Group>

        <Form.Group className="col-12 d-flex align-items-center gap-2 ">
          <Form.Select
            value={user?.id} required onChange={(e) => handleSelect(+e.target.value)}>
            <option value="">{translating("users.form.user")}</option>
            {users
              .filter((item) => item.role === "tester" || item.role === "mainTester")
              .map((item) => (
                <option value={item.id}>{item.fullName}</option>
              ))}
          </Form.Select>
          <Form.Label>{translating("renews.contractor.form.user")}</Form.Label>
        </Form.Group>
      </Form>

      <Button
        onClick={handleAdd}
        className={"send-btn mt-4 d-block mx-auto"} type='button'>{
          translating("renews.contractor.form.add")}
      </Button>

      <div className="exit">
        <IoIosClose
          onClick={() => {
            onClose()
          }}
        />
      </div>
    </div>
  );
};

export default ContractorForm;