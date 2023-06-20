import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../../contexts/UserContext";

import SignUpPageStyles from "../SignUpPage/SignUpPage.module.scss";
import Button from "../../components/Button/Button";
import { login } from "../../utils/helpers";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(null);

  const handleSubmit = values => {
    loginUser(values.username, values.password)
  };
    
  const formik = useFormik({

    initialValues: {
      username: "jsp",
      password: "jsp12345",
    },

    onSubmit: handleSubmit,
    validationSchema: Yup.object({
      username: Yup.string().required("Nom requis"),
      password: Yup.string().required("Mot de passe requis")
    }),
  });

  const loginUser = async (username, password) => {
    // connexion
    const loginResponse = await login(username, password);

    if (loginResponse.status >= 400) {
      setErrorLogin("Nom d'utilisateur ou mot de passe incorrect");
    } else {
      const data = await loginResponse.json();
      const { username, _id } = data.user;
      localStorage.setItem(
        "TeamFinder",
        JSON.stringify({ username, _id, token: data.token })
      );
      setUser(data);
      navigate(`/`);
    }
  };

  return (
    <div className={SignUpPageStyles.container}>
      <form onSubmit={formik.handleSubmit} className={SignUpPageStyles.form}>
        <div className={SignUpPageStyles.title}>Connexion</div>
        <div
          className={SignUpPageStyles.error}
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          {errorLogin && errorLogin}
        </div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <div className={SignUpPageStyles.error}>{formik.errors.username}</div>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <div className={SignUpPageStyles.error}>{formik.errors.password}</div>

        <Button text="Se connecter" />
        <div className={SignUpPageStyles.redirectionToLogin}>
          Vous n'avez pas de compte?
          <Link to="/signup" className={SignUpPageStyles.connection}>
            Inscrivez-vous
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;