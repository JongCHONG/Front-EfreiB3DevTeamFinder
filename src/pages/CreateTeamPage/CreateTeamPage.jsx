import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import Button from "../../components/Button/Button";
import { UserContext } from "../../contexts/UserContext";

import CreateTeamPageStyles from "./CreateTeamPage.module.scss";
import { checkUserLoggedIn, getUserById } from "../../utils/helpers";

const CreateTeamPage = () => {
  const user = checkUserLoggedIn()
  const navigate = useNavigate();
  const [errorCreateTeam, setErrorCreateTeam] = useState(null);
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      team_leader_id: "",
      region: "",
      availability: "",
    },
    onSubmit: (values) => {
      createTeam(values);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Nom requis"),
      description: Yup.string().required("Description requis"),
      region: Yup.string().required("Region requis"),
      availability: Yup.string().required("Availability requis"),
    }),
  });

  const createTeam = async (values) => {
    // fetch createTeam
    const createTeamResponse = await fetch("http://localhost:5000/teams", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        region: values.region,
        team_leader_id: user._id,
        availability: values.availability,
      }),
    });

    const team = await createTeamResponse.json();

    if (team.error) {
      setErrorCreateTeam(team.error);
      return;
    }
    const fetchUserInfo = async () => {
      const userInfoData = await getUserById(user?._id);
      setUser(userInfoData);
    };
    fetchUserInfo();
    navigate(`/`);
  };

  return (
    <TemplatePage>
      <div className={CreateTeamPageStyles.container}>
        <form
          onSubmit={formik.handleSubmit}
          className={CreateTeamPageStyles.form}
        >
          <div className={CreateTeamPageStyles.title}>Créer ton équipe</div>
          <div
            className={CreateTeamPageStyles.error}
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {errorCreateTeam && errorCreateTeam}
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom d'équipe"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <div className={CreateTeamPageStyles.error}>{formik.errors.name}</div>

          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description}
          />
          <div className={CreateTeamPageStyles.error}>
            {formik.errors.description}
          </div>

          <input
            type="text"
            id="region"
            name="region"
            placeholder="Region"
            onChange={formik.handleChange}
            value={formik.values.region}
            error={formik.errors.region}
          />
          <div className={CreateTeamPageStyles.error}>
            {formik.errors.region}
          </div>

          <input
            type="text"
            id="availability"
            name="availability"
            placeholder="Disponibilités"
            onChange={formik.handleChange}
            value={formik.values.availability}
            error={formik.errors.availability}
          />
          <div className={CreateTeamPageStyles.error}>
            {formik.errors.availability}
          </div>
          <Button text="Créer l'équipe" />
        </form>
      </div>
    </TemplatePage>
  );
};

export default CreateTeamPage;
