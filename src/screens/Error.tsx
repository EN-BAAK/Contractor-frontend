import React from "react";
import ErrorImg from "../assets/error.png"
import { Link, } from "react-router-dom";

const Error = (): React.JSX.Element => {
  return (
    <div className="error-page">
      <img src={ErrorImg} alt="404" />

      <Link to={"/"}>Go Back</Link>
    </div>
  )
}

export default Error