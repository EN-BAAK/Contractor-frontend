import React, { useEffect, useState } from "react";
import { RenewsType } from "../misc/types";
import { fetchRenews } from "../api-client";
import Loading from "../components/Loading";
import RenewsForm from "../components/RenewsForm";
import RenewsTable from "../components/RenewsTable";
import { useAppContext } from "../context/AppContext";
import ContractorForm from "../components/ContractorForm";
import Settings from "../components/Settings";

const Renews = (): React.JSX.Element => {
  const [renews, setRenews] = useState<RenewsType[]>([])
  const [selectedRenews, setSelectedRenews] = useState<RenewsType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [visibleContractor, setVisibleContractor] = useState<boolean>(false)
  const [visibleRenewsForm, setVisibleRenewsForm] = useState<boolean>(false)

  const { user } = useAppContext()

  const getAllRenew = async () => {
    const data = await fetchRenews();
    setRenews(data.renews);
  }

  const handleFetchRenews = async () => {
    setIsLoading(true)
    await getAllRenew()
    setIsLoading(false)
  }

  const handleSelectedRenews = (renewItem: RenewsType | undefined) => {
    if (renewItem === undefined)
      return setSelectedRenews([])

    const isItemExists = selectedRenews.some(item => item.id === renewItem.id)
    let renewList = []

    if (isItemExists) {
      renewList = selectedRenews.filter(item => item.id !== renewItem.id)
      setSelectedRenews(renewList)
    } else {
      renewList = [...selectedRenews, renewItem]
      setSelectedRenews(renewList)
    }
  }

  useEffect(() => {
    handleFetchRenews()
  }, [])

  if (isLoading)
    return <Loading />

  return (
    <div className="renew">

      {user?.role !== "admin" && (
        <>
          <Settings role="secrter" />
        </>
      )}

      {(visibleContractor) && (
        <div className="contracting-holder">
          <ContractorForm
            onClose={() => setVisibleContractor(false)}
            selectedRenews={selectedRenews}
          />
        </div>
      )}

      {visibleRenewsForm && (
        <div className="renew-form-holder">
          <RenewsForm
            selectedRenew={selectedRenews.length === 1 ? selectedRenews[0] : undefined}
            handleSelectRenew={handleSelectedRenews}
            getRenews={handleFetchRenews}
            onClose={() => setVisibleRenewsForm(false)}
          />
        </div>
      )}

      <RenewsTable
        renews={renews}
        getRenews={getAllRenew}
        handleSelectRenew={handleSelectedRenews}
        selectedRenew={selectedRenews}
        setVisible={setVisibleContractor}
        onOpen={() => setVisibleRenewsForm(true)}
      />
    </div>
  )
}

export default Renews