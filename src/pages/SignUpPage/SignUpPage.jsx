import React from "react";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../components/Button/Button";

import SignUpPageStyles from "./SignUpPage.module.scss";

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      discord: "",
      agreeTerms: false,
    },
    onSubmit: (values) => {
      console.log(values);
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

  // console.log(formik.values);
  // console.log(formik.errors);
  return (
    <div className={SignUpPageStyles.container}>
      <form onSubmit={formik.handleSubmit} className={SignUpPageStyles.form}>
        <div className={SignUpPageStyles.title}>Inscription</div>
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
