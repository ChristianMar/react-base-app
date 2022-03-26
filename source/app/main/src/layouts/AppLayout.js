import React, { useState, useEffect } from "react";
import { I18n } from "react-polyglot";
import { useSelector } from "react-redux";

import { en, it } from "../i18n";
import DevTools from "../devTools/DevTools";
import LanguageContext from "../context/LanguageContext";

const languages = {
  it: it,
  en: en,
};

const AppLayout = ({}) => {
  const auth = useSelector((state) => state.auth);
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState(en);

  const getLanguage = () => {
    if (!auth.me.payload) {
      if (!navigator) return;
      if (navigator.languages[0] !== "it" && navigator.languages[0] !== "en")
        return;
      setLanguage(navigator.languages[0]);
      setMessages(navigator.languages[0]);
    } else {
      setLanguage(
        auth.me.payload.language !== "en" || auth.me.payload.language !== "it"
          ? "en"
          : auth.me.payload.language
      );
      setMessages(languages[language]);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    getLanguage();
  }, [auth.me.payload.language]);

  return (
    <React.Fragment>
      <I18n locale={language} messages={messages}>
        <LanguageContext.Provider
          value={{
            language: language,
          }}
        >
          {process.env.STAGE === "dev" ? <DevTools /> : null}
          WELCOME
        </LanguageContext.Provider>
      </I18n>
    </React.Fragment>
  );
};

AppLayout.propTypes = {};

export default AppLayout;
