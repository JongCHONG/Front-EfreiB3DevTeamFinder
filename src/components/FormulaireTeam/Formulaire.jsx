import React, { useState } from "react";
import PropTypes from "prop-types";
import FormulaireStyle from "./Formulaire.module.scss";
import Button from "../Button/Button";

const Formulaire = ({ onClose }) => {
  const [teamLeader, setTeamLeader] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [disponibilite, setDisponibilite] = useState("");

  const handleSave = () => {
    // Perform save operation with the form data
    // You can use the values of `teamLeader`, `description`, `region`, and `disponibilite`
    // Close the popup after saving
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
          <Button onClick={handleSave} text="Sauvegarder">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

Formulaire.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Formulaire;
