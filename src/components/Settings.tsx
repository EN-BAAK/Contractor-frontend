import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import LanguageBox from "./LanguageBox";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api-client";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Settings = ({ role }: { role: string }): React.JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)

  const { showToast } = useAppContext()
  const translating = useTranslation("global")[0];
  const queryClient = useQueryClient()
  const navigationTo = useNavigate()

  const mutation = useMutation(logout, {
    onSuccess: async () => {
      showToast({ message: translating("sidebar.logout.success"), type: "SUCCESS" })
      await queryClient.invalidateQueries("validateToken")
      navigationTo("/")
    },
    onError: () => {
      showToast({ message: translating("sidebar.logout.error"), type: "ERROR" })
      navigationTo("/")
    }
  })

  return (
    <div className={(role === "tester" || role === "mainTester") ? "settings tester" : "settings secrter"}>
      <div className="icon">
        <GrLanguage
          onClick={() => {
            setVisible(true)
          }}
        />
        <div className="language-box-holder">
          <LanguageBox
            visible={visible}
            onClose={() => setVisible(false)}
          />
        </div>
      </div>
      <div className="icon">
        <MdLogout
          onClick={() => mutation.mutate()}
        />
      </div>
    </div>
  )
}

export default Settings