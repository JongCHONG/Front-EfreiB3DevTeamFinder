import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import Button from "../../components/Button/Button";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import CreateTeamPageStyles from "./CreateTeamPage.module.scss";
import { checkUserLoggedIn } from "../../utils/helpers";

const CreateTeamPage = () => {
  const user = checkUserLoggedIn();
  const navigate = useNavigate();
  const [errorCreateTeam, setErrorCreateTeam] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const fileInputRef = useRef(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const useRandomMembers = () => {
    useEffect(() => {
      const memberList = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "David Johnson" },
        { id: 4, name: "Sarah Davis" },
        { id: 5, name: "Michael Wilson" },
      ];

      const randomMembers = memberList.map((member) => ({
        ...member,
        selected: false,
      }));

      setMembers(randomMembers);
    }, []);

    const [members, setMembers] = useState([]);

    return { members, setMembers };
  };

  const { members, setMembers } = useRandomMembers();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      region: "",
      availability: "",
      member: "",
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
      member: Yup.string().required("Sélectionnez des membres..."),
    }),
  });

  const createTeam = async (values) => {
    const createTeamResponse = await fetch("http://localhost:5000/teams", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
    navigate(`/`);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleMemberChange = (e) => {
    const memberId = parseInt(e.target.value);

    if (memberId) {
      const selectedMember = members.find((member) => member.id === memberId);
      setSelectedMembers([...selectedMembers, selectedMember]); // Add selected member to the array
    } else {
      setSelectedMembers(
        selectedMembers.filter((member) => member.id !== memberId)
      ); // Remove selected member from the array
    }

    formik.handleChange(e); // Call formik's handleChange to update formik.values
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== memberId)
    );
  };

  return (
    <TemplatePage>
      <div className={CreateTeamPageStyles.container}>
        <div className={CreateTeamPageStyles.teamContainer}>
          <div className={CreateTeamPageStyles.titleBox}>
            <h2 className={CreateTeamPageStyles.title}>Créer une équipe</h2>
          </div>

          <div className={CreateTeamPageStyles.middleContainer}>
            <div className={CreateTeamPageStyles.teamPicture}>
              <img
                src={profilePicture}
                alt="Profile Picture"
                className={CreateTeamPageStyles.picture}
                onClick={handlePictureClick}
              />
              <i className="fas fa-camera" onClick={handlePictureClick} />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
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
              <div className={CreateTeamPageStyles.error}>
                {formik.errors.name}
              </div>

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

              <div className={CreateTeamPageStyles.customSelect}>
                <select
                  value={formik.values.member}
                  onChange={handleMemberChange} // Call the custom handleMemberChange function
                  name="member"
                >
                  <option value="" disabled hidden>
                    Sélectionnez des membres...
                  </option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={CreateTeamPageStyles.selectedMembers}>
                {selectedMembers.map((member) => (
                  <div key={member.id} className={CreateTeamPageStyles.member}>
                    <span>{member.name}</span>
                    <button
                      className={CreateTeamPageStyles.removeButton}
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className={CreateTeamPageStyles.error}>
                {formik.errors.member}
              </div>

              <Button text="Créer l'équipe" />
            </form>
          </div>
        </div>
      </div>
    </TemplatePage>
  );
};

export default CreateTeamPage;
