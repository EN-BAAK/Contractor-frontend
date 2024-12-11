import React from "react";
import { ContractorType } from "../misc/types";
import { formatAMPM, isdatePassed } from "../misc/hepers";
import { MdWifiCalling3 } from "react-icons/md";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { useMutation } from "react-query";
import { doneContractors, unDoneContractors } from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { FaWaze } from "react-icons/fa";

interface Props {
  item: ContractorType,
  fetchData: () => void,
  disable: boolean
}

const TesterCard = ({ item, fetchData, disable }: Props): React.JSX.Element => {
  const { showToast } = useAppContext()
  const translation = useTranslation("global")[0]

  const mutationDone = useMutation(doneContractors, {
    onSuccess: () => {
      showToast({ message: translation("tester.actions.done.success"), type: "SUCCESS" })
      fetchData()
    },
    onError: () => {
      showToast({ message: translation("tester.actions.done.error"), type: "ERROR" })
    }
  })

  const mutationUnDone = useMutation(unDoneContractors, {
    onSuccess: () => {
      showToast({ message: translation("tester.actions.undone.success"), type: "SUCCESS" })
      fetchData()
    },
    onError: () => {
      showToast({ message: translation("tester.actions.undone.error"), type: "ERROR" })
    }
  })

  const handleCall = () => {
    window.location.href = `tel:${item.phone}`;
  };

  const handleOpenMap = () => {
    window.open(item.locationLink);
  };

  // const isNear = (item: ContractorType): boolean => {
  //   if (item.date) {
  //     const currentDate = new Date();
  //     const currentTime = currentDate.getTime();
  //     const itemTime = new Date(item.date).getTime();
  //     const halfHourMilliseconds = 30 * 1000;

  //     console.log(currentTime, itemTime, currentTime >= itemTime && currentTime >= itemTime + halfHourMilliseconds, itemTime + halfHourMilliseconds)

  //     return currentTime >= itemTime + halfHourMilliseconds && currentTime > itemTime;
  //   }

  //   return false;
  // };

  return (
    <div className={(disable && !isdatePassed(item.date)) ? "tester-card near" : "tester-card"}>
      <div className="d-flex justify-content-end mt-5">
        <p className="me-2">{item.location},</p>
        <p className=" fw-bold">,{item.city}</p>
      </div>
      <div className="d-flex justify-content-end">
        <p className="me-2">{item.companyName}</p>
        <p>,{item.name}</p>
      </div>
      <p className="ps-4 mb-2">{item.notes}

      </p>
      <p className="date">{item.date && (item.date.slice(0, 10) + " " + formatAMPM(item.date))}</p>

      <p className="order">{item.order}</p>

      <div className="floating-icon">
        {item.locationLink && (
          <div className="icon">
            <FaWaze
              onClick={handleOpenMap}
            />
          </div>
        )}

        <div className="icon">
          <MdWifiCalling3
            onClick={handleCall}
          />
        </div>

        <div className="icon">
          {item.done == "false" ?
            <ImCheckboxUnchecked
              className="unchecked"
              onClick={() => mutationDone.mutate(item.id || 0)}
            />
            :
            <ImCheckboxChecked
              onClick={() => mutationUnDone.mutate(item.id || 0)}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default TesterCard