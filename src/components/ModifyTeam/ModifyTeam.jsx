import React, { useState } from "react";
import PropTypes from "prop-types";
import FormulaireStyle from "./ModifyTeam.module.scss";
import Button from "../Button/Button";
import { updateTeamById, checkUserLoggedIn } from "../../utils/helpers";

const ModifyTeam = ({ onClose, teamId }) => {
  const user = checkUserLoggedIn();

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSave = async () => {
    // Prepare the form data object
    const formData = {
      name,
      description,
      region,
      availability,
    };

    // Call the updateTeam function with the form data and teamId
    await updateTeamById(teamId, formData, user.token);

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={FormulaireStyle.Container}>
      <div className={FormulaireStyle.PopupContent}>
        <h2>Profil d'équipe</h2>
        <label>
          Team name:
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </label>
        <label>
          Description: <br/>
          <textarea
            type="text"
            style={{width: "100%"}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Région:
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </label>
        <label>
          Disponibilité:
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </label>
        <div className={FormulaireStyle.Button}>
          <Button onClick={handleSave} text="Sauvegarder" />
          <Button onClick={handleCancel} text="Annuler" />
        </div>
      </div>
    </div>
  );
};

ModifyTeam.propTypes = {
  onClose: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
};
export default ModifyTeam;
