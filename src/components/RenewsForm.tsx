import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { RenewsType } from "../misc/types";
import { useAppContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { addRenews, deleteRenews, editRenews } from "../api-client";
import { IoIosClose } from "react-icons/io";

interface Props {
  selectedRenew: RenewsType | undefined,
  handleSelectRenew: (user: RenewsType | undefined) => void,
  getRenews: () => void,
  onClose: () => void
}

export interface controlRenew {
  name?: string,
  phone?: string,
  companyName?: string,
  city?: string,
  location?: string,
  locationLink?: string,
  notes?: string,
  creator?: string
}

const RenewsForm = ({
  selectedRenew,
  handleSelectRenew,
  getRenews,
  onClose
}: Props): React.JSX.Element => {
  const [name, setName] = useState<string | undefined>(undefined)
  const [phone, setPhone] = useState<string | undefined>(undefined)
  const [companyName, setCompanyName] = useState<string | undefined>(undefined)
  const [city, setCity] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [locationLink, setLocationLink] = useState<string | undefined>(undefined)
  const [notes, setNotes] = useState<string | undefined>(undefined)
  const [allowRenewsControl, setAllowRenewsControl] = useState<boolean>(false)

  const translating = useTranslation("global")[0]
  const { showToast, user } = useAppContext()

  const reset = () => {
    setName("")
    setPhone("")
    setCompanyName("")
    setCity("")
    setLocation("")
    setLocationLink("")
    setNotes("")
    handleSelectRenew(undefined)
  }

  const mutationAdd = useMutation(addRenews, {
    onSuccess: async () => {
      showToast({ message: translating("renews.form.submit.add.success"), type: "SUCCESS" })
      reset()
      getRenews()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("renews.form.submit.add.error"), type: "ERROR" })
    }
  })

  const mutationDelete = useMutation(deleteRenews, {
    onSuccess: async () => {
      showToast({ message: translating("renews.form.submit.delete.success"), type: "SUCCESS" })
      reset()
      getRenews()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("renews.form.submit.delete.error"), type: "ERROR" })
    }
  })

  const mutationEdit = useMutation(editRenews, {
    onSuccess: async () => {
      showToast({ message: translating("renews.form.submit.edit.success"), type: "SUCCESS" })
      reset()
      getRenews()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("renews.form.submit.edit.error"), type: "ERROR" })
    }
  })

  const handleEdit = () => {
    const data: controlRenew = {
      name: name || undefined,
      companyName: companyName || undefined,
      city: city || undefined,
      location: location || undefined,
      locationLink: locationLink || undefined,
      notes: notes || undefined,
      phone: phone || undefined,
      creator: user?.fullName
    }

    const finalData = { formData: data, id: selectedRenew?.id || 0 }

    mutationEdit.mutate(finalData)
  }

  const handleAdd = () => {
    const data: controlRenew = {
      name: name,
      companyName: companyName,
      city: city,
      location: location,
      locationLink: locationLink || undefined,
      notes: notes,
      phone: phone || undefined,
      creator: user?.fullName
    }

    mutationAdd.mutate(data)
  }

  useEffect(() => {
    if (selectedRenew) {
      setName(selectedRenew.name)
      setPhone(selectedRenew.phone)
      setCompanyName(selectedRenew.companyName)
      setCity(selectedRenew.city)
      setLocation(selectedRenew.location)
      setLocationLink(selectedRenew.locationLink)
      setNotes(selectedRenew.notes)
      setAllowRenewsControl(true)
    }
    else
      setAllowRenewsControl(false)

  }, [selectedRenew])

  return (
    <div className="renew-form">
      <Form className="row flex-row-reverse .renew-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <div className="title">
          <h4>{translating("renews.form.components.title")}</h4>
        </div>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-6 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={36}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <Form.Label >{translating("renews.form.name")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12  col-6 mb-3">
          <Form.Control
            type="number"
            minLength={1}
            maxLength={20}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
          <Form.Label >{translating("renews.form.phone")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12  col-6 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={36}
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.companyName")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12  col-6 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={12}
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.city")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={50}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.location")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
          <Form.Control
            type="url"
            minLength={1}
            maxLength={50}
            value={locationLink}
            onChange={(event) => setLocationLink(event.target.value)}
          />
          <Form.Label>{translating("renews.form.locationLink")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-12 mb-3">
          <Form.Control
            as="textarea"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <Form.Label>{translating("renews.form.notes")}</Form.Label>
        </Form.Group>

        <div className="row mt-3 justify-content-between">
          <div className="col-4 px-2">
            <Button
              variant="warning"
              className={allowRenewsControl ? "text-white w-100" : "text-white w-100 disabled"}
              type='submit'
              onClick={handleEdit}
            >{translating("renews.form.edit")}</Button>
          </div>

          <div className="col-4 px-2">
            <Button
              variant="primary"
              className='text-white w-100'
              type='submit'
              onClick={handleAdd}
            >{translating("renews.form.add")}</Button>
          </div>

          <div className="col-4 px-2">
            <Button
              variant="danger"
              className={allowRenewsControl ? "text-white w-100" : "text-white w-100 disabled"}
              type='button'
              onClick={() => mutationDelete.mutate(selectedRenew?.id || 0)}
            >{translating("renews.form.delete")}</Button>
          </div>
        </div>

        <div className="close">
          <IoIosClose
            onClick={onClose}
          />
        </div>
      </Form >
    </div>
  )
}

export default RenewsForm;