import React, { useState, useEffect } from 'react';
import { I18n } from 'react-polyglot';
import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import { en, it } from '../i18n';
import DevTools from '../devTools/DevTools';
import LanguageContext from '../context/LanguageContext';
import { UserContextProvider } from '../context/UserContext';
import { AppLayout as AppLayoutUI } from '@ui';
import Login from '../components/auth/Login';
import Home from '../components/home/Home';

const languages = {
  it: it,
  en: en,
};

const AppLayout = ({}) => {
  const auth = useSelector((state) => state.auth);
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState(en);

  const getLanguage = () => {
    if (!auth.me.payload) {
      if (!navigator) return;
      if (navigator.languages[0] !== 'it' && navigator.languages[0] !== 'en')
        return;
      let lang = navigator.languages[0];
      setLanguage(lang);
      setMessages(languages[lang]);
    } else {
      let lang =
        auth.me.payload.language !== 'en' && auth.me.payload.language !== 'it'
          ? 'en'
          : auth.me.payload.language;
      setLanguage(lang);
      setMessages(languages[lang]);
    }
  };

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    getLanguage();
  }, [auth.me.payload.token]);

  return (
    <AppLayoutUI>
      <I18n locale={language} messages={messages}>
        <UserContextProvider>
          <LanguageContext.Provider
            value={{
              language: language,
            }}
          >
            {process.env.STAGE === 'dev' ? <DevTools /> : null}
            <Routes>
              <Route path="/">
                <Route path="login" element={<Login />} />
                <Route path="app" element={<Home />} />
              </Route>
            </Routes>
          </LanguageContext.Provider>
        </UserContextProvider>
      </I18n>
    </AppLayoutUI>
  );
};

AppLayout.propTypes = {};

export default AppLayout;
