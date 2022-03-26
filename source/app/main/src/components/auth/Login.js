import React, { useEffect, Fragment } from "react";
import { Form } from "react-final-form";
import { useTranslate } from "react-polyglot";
import { useDispatch, useSelector } from "react-redux";

import { authLogin } from "../../actions/auth";
import { isRequired } from "../../utils/validationRules";
import { LoginWidget } from "@ui";

let Login = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const t = useTranslate();

  useEffect(() => {
    if (auth.me.loading === false && auth.me.error !== null) {
    }
  }, [auth.me.loading]);

  const onLogin = (data) => {
    dispatch(authLogin(data));
  };

  return (
    <Fragment>
      <Form
        onSubmit={onLogin}
        initialValues={{
          username: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          errors["username"] = isRequired(
            t("validation.errors.required", { field: "Username" }),
            values["username"]
          );
          errors["password"] = isRequired(
            t("validation.errors.required", { field: "Password" }),
            values["password"]
          );
          return errors;
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LoginWidget
              labels={{
                title: t("loginModal.title"),
                username: t("loginModal.username"),
                password: t("loginModal.password"),
                login: t("loginModal.login"),
              }}
              onLogin={handleSubmit}
              loading={auth.me.loading}
              error={auth.me.error}
            />
          </form>
        )}
      />
    </Fragment>
  );
};

Login.propTypes = {};

export default Login;
