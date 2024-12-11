import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
  children: ReactNode
}

const AdminScreen = ({ children }: Props): React.JSX.Element => {
  return (
    <div className="screen">
      {children}
      <Sidebar />
    </div>
  )
}

export default AdminScreen;