import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import LanguageBox from "../components/LanguageBox";
import { GrLanguage } from "react-icons/gr";

export type loginData = {
  password: string,
  mobileNumber: string
}

const Login = (): React.JSX.Element => {
  const [mobileNumber, setMobileNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const translating = useTranslation("global")[0]
  const { showToast } = useAppContext();


  const resetValue = () => {
    setMobileNumber("")
    setPassword("")
  }

  const queryClient = useQueryClient()
  const navigateTo = useNavigate()

  const mutation = useMutation(login, {
    onMutate: () => setIsLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: translating("login.toast.success"), type: "SUCCESS" })
      resetValue()
      navigateTo("/")
    },
    onError: () => {
      showToast({ message: translating("login.toast.error"), type: "ERROR" })
    },
    onSettled: () => setIsLoading(false)
  })

  const handleSubmit = (data: loginData) => {
    mutation.mutate(data)
  }

  return (
    <div className="login">
      <div className="content">
        <div className="title">
          <h4>{translating("login.component.title")}</h4>
        </div>
        <Form className='form' onSubmit={e => {
          e.preventDefault()
          handleSubmit({
            mobileNumber,
            password,
          })
        }}>
          <div className="mb-4">
            <Form.Control type='number' placeholder={translating("login.component.mobileNumber")} value={mobileNumber} onChange={event => setMobileNumber(event.target.value)} />
          </div>
          <div className="mb-4">
            <Form.Control type='password' placeholder={translating("login.component.password")} value={password} onChange={event => setPassword(event.target.value)} />
          </div>
          <Button className={isLoading ? "send-btn mb-4 submitting" : "send-btn mb-4"} type='submit'>{
            isLoading ? "..." + translating("login.component.loading") : translating("login.component.title")
          }</Button>
        </Form>
      </div>
      <div className="lang">
        <GrLanguage
          onClick={() => setVisible(true)}
        />
        <div className="lang-holder">
          <LanguageBox
            visible={visible}
            onClose={() => setVisible(false)}
          />
        </div>
      </div>
    </div >
  )
}

export default Login;