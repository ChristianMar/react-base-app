import React, { useEffect, Fragment } from "react";
import { Form } from "react-final-form";
import { useTranslate } from "react-polyglot";
import { useDispatch, useSelector } from "react-redux";

import { isRequired } from "../../utils/validationRules";
import { HomeWidget } from "@ui";

let Home = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const t = useTranslate();

  useEffect(() => {
    if (auth.me.loading === false && auth.me.error !== null) {
    }
  }, [auth.me.loading]);

  const onLogout = (data) => {};

  return (
    <HomeWidget
      labels={{
        welcome: t("home.welcome"),
        logout: t("home.logout"),
      }}
      onLogout={onLogout}
    />
  );
};

Home.propTypes = {};

export default Home;
