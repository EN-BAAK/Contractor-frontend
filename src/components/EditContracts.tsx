import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { User } from "../misc/types";
import { useAppContext } from "../context/AppContext";
import { IoIosClose } from "react-icons/io";
import { useMutation } from "react-query";
import { updateContractors } from "../api-client";
import { contracts } from "../screens/Contractors";

interface Props {
  id: number,
  visible: boolean;
  name: string;
  phone: string;
  companyName: string;
  city: string;
  location: string;
  locationLink: string | undefined;
  notes: string | undefined;
  date: string,
  user: User | undefined,
  order: number,
  creator?: string,
  onClose: () => void,
  fetchData: () => void,
  setSelectedRow: (data: contracts | undefined) => void
}

const EditContracts = ({
  visible,
  name,
  phone,
  companyName,
  city,
  location,
  locationLink,
  notes,
  date,
  user,
  id,
  order,
  creator,
  fetchData,
  onClose,
  setSelectedRow
}: Props): React.JSX.Element => {
  const [nameState, setNameState] = useState<string>("");
  const [phoneState, setPhoneState] = useState<string>("");
  const [companyNameState, setCompanyNameState] = useState<string>("");
  const [cityState, setCityState] = useState<string>("");
  const [locationState, setLocationState] = useState<string>("");
  const [locationLinkState, setLocationLinkState] = useState<string | undefined>(undefined);
  const [notesState, setNotesState] = useState<string | undefined>();
  const [userState, setUserState] = useState<User | undefined>(undefined);
  const [dateState, setDateState] = useState<string>("");
  const [orderState, setOrderState] = useState<number>(0)

  const { users, showToast } = useAppContext()
  const translating = useTranslation("global")[0];

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateState(event.target.value);
  };

  const handleSelect = (id: number) => {
    const selectedUser = users.find(item => item.id === id)
    setUserState(selectedUser)
  }

  const mutation = useMutation(updateContractors, {
    onSuccess: () => {
      showToast({ message: translating("contracts.actions.reset.success"), type: "SUCCESS" })
      fetchData()
      setSelectedRow(undefined)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("contracts.actions.reset.error"), type: "ERROR" })
    }
  })

  const handleEdit = () => {
    const editedContract: contracts = {
      id: id || 0,
      name: nameState,
      phone: phoneState,
      companyName: companyNameState,
      city: cityState,
      location: locationState,
      locationLink: locationLinkState,
      notes: notesState,
      tester_name: userState?.fullName || "",
      tester_id: userState?.id || 0,
      date: dateState,
      order: orderState,
      done: "false",
      creator: creator || "---"
    };

    mutation.mutate(editedContract);
  };

  useEffect(() => {
    setNameState(name);
    setPhoneState(phone);
    setCompanyNameState(companyName);
    setCityState(city);
    setLocationState(location);
    setLocationLinkState(locationLink);
    setNotesState(notes);
    setUserState(user);
    setDateState(date);
    setOrderState(order)
  }, [companyName, user, date]);

  return (
    <div
      className={visible ? "edit-contracts" : "edit-contracts hide"}
    >
      <Form className="row flex-row-reverse flex-lg-row justify-content-center renew-form position-relative"
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
            value={nameState}
            onChange={(event) => setNameState(event.target.value)}
            required
          />
          <Form.Label >{translating("renews.form.name")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12  col-6 mb-3">
          <Form.Control
            type="number"
            minLength={1}
            maxLength={20}
            value={phoneState}
            onChange={(event) => setPhoneState(event.target.value)}
            required
          />
          <Form.Label >{translating("renews.form.phone")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12  col-6 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={36}
            value={companyNameState}
            onChange={(event) => setCompanyNameState(event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.companyName")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12  col-6 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={12}
            value={cityState}
            onChange={(event) => setCityState(event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.city")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
          <Form.Control
            type="text"
            minLength={1}
            maxLength={50}
            value={locationState}
            onChange={(event) => setLocationState(event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.location")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-lg-12 col-md-6 col-12 mb-3">
          <Form.Control
            type="number"
            minLength={1}
            maxLength={20}
            value={orderState}
            onChange={(event) => setOrderState(+event.target.value)}
            required
          />
          <Form.Label>{translating("renews.form.order")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-12 mb-3">
          <Form.Control
            type="url"
            minLength={1}
            maxLength={50}
            value={locationLinkState}
            onChange={(event) => setLocationLinkState(event.target.value)}
          />
          <Form.Label>{translating("renews.form.locationLink")}</Form.Label>
        </Form.Group>

        <Form.Group className="d-flex align-items-center gap-2 col-12 mb-3">
          <Form.Control
            as="textarea"
            value={notesState}
            onChange={(event) => setNotesState(event.target.value)}
          />
          <Form.Label>{translating("renews.form.notes")}</Form.Label>
        </Form.Group>

        <Form.Group className="col-12 d-flex align-items-center gap-2 mb-3">
          <Form.Control
            type="datetime-local"
            value={dateState.slice(0, 16)}
            onChange={handleDateChange}
          />
          <Form.Label>{translating("renews.contractor.form.date")}</Form.Label>
        </Form.Group>

        <Form.Group className="col-12 d-flex align-items-center gap-2 mb-3">
          <Form.Select
            value={userState?.id} required onChange={(e) => handleSelect(+e.target.value)}>
            <option value="">:{translating("users.form.user")}</option>
            {users
              .filter((item) => item.role === "tester" || item.role === "mainTester")
              .map((item) => (
                <option value={item.id}>{item.fullName}</option>
              ))}
          </Form.Select>
          <Form.Label>{translating("renews.contractor.form.user")}</Form.Label>
        </Form.Group>
        <div className="exit">
          <IoIosClose
            onClick={() => {
              onClose()
            }}
          />
        </div>

        <Button
          className="submit-btn"
          variant="danger"
          onClick={handleEdit}
        >{translating("contracts.components.edit")}</Button>
      </Form >
    </div>
  );
};

export default EditContracts;