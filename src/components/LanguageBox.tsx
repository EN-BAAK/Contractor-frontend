import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  visible: boolean,
  onClose: () => void
}

const LanguageBox = ({ visible, onClose }: Props): React.JSX.Element => {
  const [translating, i18n] = useTranslation("global")
  const activeLanguage = i18n.language;

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    onClose()
  }

  return (
    <ul className={visible ? "lang-box" : "lang-box hide"}>
      <li
        className={activeLanguage === "ar" ? "active" : ""}
        onClick={() => handleChangeLanguage("ar")}
      >
        <p>{translating("sidebar.components.languageBox.arabic")}</p>
      </li>
    </ul>
  )
}

export default LanguageBox;