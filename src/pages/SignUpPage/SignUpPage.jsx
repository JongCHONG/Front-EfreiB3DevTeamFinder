import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../../contexts/UserContext";

import Button from "../../components/Button/Button";

import SignUpPageStyles from "./SignUpPage.module.scss";

import { login } from "../../utils/helpers";

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorSignup, setErrorSignup] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "Valou",
      email: "aalou@aalou.com",
      password: "ValouValou",
      passwordConfirmation: "ValouValou",
      discord: "Valou",
      agreeTerms: false,
    },
    onSubmit: (values) => {
      signup(values);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required("Nom requis"),
      email: Yup.string().required("Email requis").email("Format invalide"),
      password: Yup.string()
        .required("Mot de passe requis")
        .min(8, "Mot de passe trop court"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Le mot de passe doit être identique"
      ),
      discord: Yup.string().required("Discord requis"),
      agreeTerms: Yup.boolean().oneOf(
        [true],
        "Vous devez accepter les conditions."
      ),
    }),
  });

  const signup = async (values) => {
    // fetch signup
    const signupResponse = await fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        mail: values.email,
        discord: values.discord,
      }),
    });

    const user = await signupResponse.json();

    if (user.error) {
      setErrorSignup(user.error);
      return;
    }

    // connexion
    const loginResponse = await login(user.username, values.password);

    if (loginResponse.status >= 400) {
      alert(loginResponse.statusText);
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

  // console.log(formik.values);
  // console.log(formik.errors);
  return (
    <div className={SignUpPageStyles.container}>
      <form onSubmit={formik.handleSubmit} className={SignUpPageStyles.form}>
        <div className={SignUpPageStyles.title}>Inscription</div>
        <div
          className={SignUpPageStyles.error}
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          {errorSignup && errorSignup}
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
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <div className={SignUpPageStyles.error}>{formik.errors.email}</div>

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

        <input
          type="password"
          placeholder="Confirmer votre mot de passe"
          name="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={formik.errors.passwordConfirmation}
        />
        <div className={SignUpPageStyles.error}>
          {formik.errors.passwordConfirmation}
        </div>

        <input
          type="text"
          placeholder="Discord#0000"
          name="discord"
          value={formik.values.discord}
          onChange={formik.handleChange}
          error={formik.errors.discord}
        />
        <div className={SignUpPageStyles.error}>{formik.errors.discord}</div>

        <div className={SignUpPageStyles.checkboxAgreeTerms}>
          <input
            type="checkbox"
            name="agreeTerms"
            value={formik.values.agreeTerms}
            onChange={formik.handleChange}
            error={formik.errors.agreeTerms}
          />
          <div className={SignUpPageStyles.agreeTerms}>
            J’ai lu les conditions générales d’utilisation.
            <div className={SignUpPageStyles.error}>
              {formik.errors.agreeTerms}
            </div>
          </div>
        </div>
        <Button text="S'inscrire" />
        <div className={SignUpPageStyles.redirectionToLogin}>
          Déjà inscrit?
          <Link to="/login" className={SignUpPageStyles.connection}>
            Connectez-vous
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
