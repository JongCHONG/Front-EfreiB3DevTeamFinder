import React, { useState, useRef, useEffect } from "react";
import TemplatePage from "../../components/TemplatePage/TemplatePage";
import TeamProfilePageStyles from "./TeamProfilePage.module.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useParams, Link } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import { getAnnouncements, getTeamById } from "../../utils/helpers";
import Button from "../../components/Button/Button";
import moment from "moment";

import FormulaireTeam from "../../components/FormulaireTeam/Formulaire"; // Import the Formulaire component

const TeamProfilePage = () => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  useEffect(() => {
    const fetchTeamInfo = async () => {
      const teamInfoData = await getTeamById(id);
      setTeamInfo(teamInfoData);
    };

    const fetchAnnouncements = async () => {
      const announcementsData = await getAnnouncements();
      if (announcementsData) {
        const filteredArray = announcementsData.filter(
          (item) => item?.team?._id === id
        );
        setAnnouncements(filteredArray);
      }
    };

    fetchAnnouncements();
    fetchTeamInfo();
  }, [id]);

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

  const renderUniqueUsernames = () => {
    const renderedUsernames = [];
    return teamInfo?.teammates?.map((teammate, index) => {
      if (!renderedUsernames.includes(teammate.username)) {
        renderedUsernames.push(teammate.username);
        return (
          <Link to={`/profil/${teammate._id}`} style={{color:"#ff4454"}}>
            <li key={index}>
              {teammate.username}
            </li>
          </Link>
        );
      }
      return null;
    });
  };

  const handleModifyClick = () => {
    setShowPopup(true); // Show the popup when the modify icon is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <TemplatePage>
        <section className="middle">
          <div className={TeamProfilePageStyles.topContainer}>
            <div className={TeamProfilePageStyles.profileContainer}>
              <div className={TeamProfilePageStyles.titleBox}>
                <h2 className={TeamProfilePageStyles.title}>Profil équipe</h2>
              </div>

              <div className={TeamProfilePageStyles.middleContainer}>
                <div className={TeamProfilePageStyles.AnnouncementCard}>
                  <div className={TeamProfilePageStyles.profilePicture}>
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className={TeamProfilePageStyles.picture}
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

                  <div className={TeamProfilePageStyles.teamName}>
                    <h1>{teamInfo?.name}</h1>

                    <p>Team Leader: {teamInfo?.team_leader_id?.username}</p>
                    <p>Description: {teamInfo?.description}</p>
                    <p>Région: {teamInfo?.region}</p>
                    <p>Disponibilité: {teamInfo?.availability}</p>
                    <p>
                      Créée le:{" "}
                      {moment(teamInfo?.createddAt).format("DD/MM/YYYY")}
                    </p>
                    <p>
                      Mise à jour le:{" "}
                      {moment(teamInfo?.updatedAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className={TeamProfilePageStyles.teamMates}>
                    <p>Membres de l'équipe:</p>
                    <ul>{renderUniqueUsernames()}</ul>
                  </div>
                  <div className={TeamProfilePageStyles.button}>
                    <Button text="Publier une annonce" />
                    <Button text="Ajouter des membres" />
                    <Button text="Supprimer des membres" />
                    <Button text="Supprimer son équipe" />
                  </div>
                  <div
                    className={TeamProfilePageStyles.modifyIcon}
                    onClick={handleModifyClick} // Add the click event handler
                  >
                    <i className="fas fa-pen" />
                  </div>
                </div>

                {announcements?.map((announcement, index) => (
                  <AnnouncementCard key={index} announcement={announcement} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </TemplatePage>
      {showPopup && <FormulaireTeam onClose={handleClosePopup} />}{" "}
      {/* Render the Formulaire component when showPopup is true */}
    </>
  );
};

export default TeamProfilePage;
