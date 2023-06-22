import React, { useState } from "react";
import PropTypes from "prop-types";
import FormulaireStyle from "./Formulaire.module.scss";
import Button from "../Button/Button";
import { updateTeamById } from "../../utils/helpers";

const Formulaire = ({ onClose, teamId }) => {
  const [teamLeader, setTeamLeader] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [disponibilite, setDisponibilite] = useState("");

  const handleSave = async () => {
    // Prepare the form data object
    const formData = {
      teamLeader,
      description,
      region,
      disponibilite,
    };

    // Call the updateTeam function with the form data and teamId
    await updateTeamById(teamId, formData);

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
          Team Leader:
          <input
            type="text"
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
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
            value={disponibilite}
            onChange={(e) => setDisponibilite(e.target.value)}
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

Formulaire.propTypes = {
  onClose: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
};
export default Formulaire;
