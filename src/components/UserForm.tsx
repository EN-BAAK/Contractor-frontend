import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { User } from "../misc/types";
import { useAppContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { addUser, deleteUser, editUser } from "../api-client";

interface Props {
  selectedUser: User | undefined,
  handleSelectUser: (user: User | undefined) => void
}

export interface controlUser {
  fullName?: string,
  mobileNumber?: string,
  password?: string,
  role?: string
}

const UserForm = ({ selectedUser, handleSelectUser }: Props): React.JSX.Element => {
  const [fullName, setFullName] = useState<string | undefined>(undefined)
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [allowEUserControl, setAllowUserControl] = useState<boolean>(false)
  const [role, setRole] = useState<string>("")

  const translating = useTranslation("global")[0]
  const { showToast, setUsers } = useAppContext()

  const reset = () => {
    setFullName("")
    setPhoneNumber("")
    setPassword("")
    handleSelectUser(undefined)
  }

  const mutationAdd = useMutation(addUser, {
    onSuccess: async () => {
      showToast({ message: translating("users.form.submit.add.success"), type: "SUCCESS" })
      setUsers()
      reset()
    },
    onError: () => {
      showToast({ message: translating("users.form.submit.add.error"), type: "ERROR" })
    }
  })

  const mutationDelete = useMutation(deleteUser, {
    onSuccess: async () => {
      showToast({ message: translating("users.form.submit.delete.success"), type: "SUCCESS" })
      setUsers()
      reset()
    },
    onError: () => {
      showToast({ message: translating("users.form.submit.delete.error"), type: "ERROR" })
    }
  })

  const mutationEdit = useMutation(editUser, {
    onSuccess: async () => {
      showToast({ message: translating("users.form.submit.edit.success"), type: "SUCCESS" })
      setUsers()
      reset()
    },
    onError: () => {
      showToast({ message: translating("users.form.submit.edit.error"), type: "ERROR" })
    }
  })

  const handleEdit = () => {
    const safeRole = selectedUser?.role === "admin" ? "admin" : role

    const data: controlUser = {
      fullName: fullName || undefined,
      mobileNumber: phoneNumber || undefined,
      password: password || undefined,
      role: safeRole || undefined
    }


    const finalData = { formData: data, id: selectedUser?.id || 0 }

    mutationEdit.mutate(finalData)
  }

  const handleAdd = () => {
    const data: controlUser = {
      fullName,
      mobileNumber: phoneNumber,
      password: password,
      role
    }

    mutationAdd.mutate(data)
  }

  useEffect(() => {
    if (selectedUser) {
      setFullName(selectedUser.fullName)
      setPhoneNumber(selectedUser.mobileNumber)
      setRole(selectedUser.role)
      setAllowUserControl(true)

    }
    else
      setAllowUserControl(false)

  }, [selectedUser])

  return (
    <Form className="row flex-row-reverse flex-lg-row justify-content-center user-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <div className="title">
        <h4>{translating("users.form.components.title")}</h4>
      </div>

      <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
        <Form.Control
          type="text"
          minLength={1}
          maxLength={36}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
        <Form.Label >{translating("users.form.fullName")}</Form.Label>
      </Form.Group>

      <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
        <Form.Control
          type="number"
          minLength={1}
          maxLength={20}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
        <Form.Label >{translating("users.form.phoneNumber")}</Form.Label>
      </Form.Group>

      <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
        <Form.Control
          type="password"
          minLength={1}
          maxLength={50}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Form.Label>{translating("users.form.password")}</Form.Label>
      </Form.Group>

      <div className="col-lg-12 col-md-6 col-12">
        <Form.Select value={role} required onChange={e => setRole(e.target.value)}>
          <option value={""}>{translating("users.form.role")}</option>
          <option value={"tester"}>{translating("users.form.tester")}</option>
          <option value={"secretary"}>{translating("users.form.secrter")}</option>
          <option value={"mainTester"}>{translating("users.form.mainTester")}</option>
        </Form.Select>
      </div>

      <div className="row mt-3 justify-content-between">
        <div className="col-4 px-2">
          <Button
            variant="warning"
            className={allowEUserControl ? "text-white w-100" : "text-white w-100 disabled"}
            type='button'
            onClick={handleEdit}
          >{translating("users.form.edit")}</Button>
        </div>

        <div className="col-4 px-2">
          <Button
            variant="primary"
            className='text-white w-100'
            type='submit'
            onClick={handleAdd}
          >{translating("users.form.add")}</Button>
        </div>

        <div className="col-4 px-2">
          <Button
            variant="danger"
            className={(allowEUserControl && selectedUser?.role !== "admin") ? "text-white w-100" : "text-white w-100 disabled"}
            type='button'
            onClick={() => mutationDelete.mutate(selectedUser?.id || 0)}
          >{translating("users.form.delete")}</Button>
        </div>
      </div>
    </Form >
  )
}

export default UserForm;