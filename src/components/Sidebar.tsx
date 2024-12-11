import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api-client";
import LanguageBox from "./LanguageBox";
import { CiSettings } from "react-icons/ci";
import image from "../assets/logo.png"
import { CgWorkAlt } from "react-icons/cg";

const Sidebar = (): React.JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)

  const translating = useTranslation("global")[0]
  const { showToast } = useAppContext()
  const location = useLocation()
  const queryClient = useQueryClient()
  const navigateTo = useNavigate()

  const mutation = useMutation(logout, {
    onSuccess: async () => {
      showToast({ message: translating("sidebar.logout.success"), type: "SUCCESS" })
      await queryClient.invalidateQueries("validateToken")
    },
    onError: () => {
      showToast({ message: translating("sidebar.logout.error"), type: "ERROR" })
    }
  })

  const isActiveLink = (path: string): boolean => location.pathname === path;

  const handleLogout = () => {
    mutation.mutate()
    navigateTo("/")
  }

  return (
    <div className="sidebar">
      <ul className={active ? "content active" : "content"}>
        <img src={image} alt="logo" />

        <li>
          <Link to={"/"} className={isActiveLink("/") ? "active" : ""}>
            <p className="mb-0">{translating("sidebar.links.renews")}</p>
            <CgWorkAlt />
          </Link>
        </li>
        <li>
          <Link to={"/contractors"} className={isActiveLink("/contractors") ? "active" : ""}>
            <p className="mb-0">{translating("sidebar.links.contracts")}</p>
            <FaFileContract />
          </Link>
        </li>
        <li>
          <Link to={"/finished-contracts"} className={isActiveLink("/finished-contracts") ? "active" : ""}>
            <p className="mb-0">{translating("sidebar.links.finishedContracts")}</p>
            <RiContractFill />
          </Link>
        </li>
        <li>
          <Link to={"/users"} className={isActiveLink("/users") ? "active" : ""}>
            <p className="mb-0">{translating("sidebar.links.users")}</p>
            <FaUsers />
          </Link>
        </li>
        <li>
          <button onClick={() => setVisible(!visible)} className={visible ? "active" : ""}>
            <p className="mb-0">{translating("sidebar.components.language")}</p>
            <GrLanguage />
            <div className="language-box-holder">
              <LanguageBox
                visible={visible}
                onClose={() => setVisible(false)}
              />
            </div>
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>
            <p className="mb-0">{translating("sidebar.components.logout")}</p>
            <MdLogout />
          </button>
        </li>
        <div
          className="opener"
          onClick={() => setActive(!active)}
        >
          <CiSettings />
        </div>
      </ul>

    </div >
  )
}

export default Sidebar;