import React, { useState, useRef, useEffect } from "react";
import TemplatePage from "../../components/TemplatePage/TemplatePage";
import TeamProfilePageStyles from "./TeamProfilePage.module.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useParams } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import { getAnnouncements } from "../../utils/helpers";
import Button from "../../components/Button/Button";

const TeamProfilePage = (announcement) => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      setAnnouncements(data);
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/teams/${id}`);
        const data = await response.json();
        console.log("data", data);
        setTeamInfo(data);
        console.log("teaminfo", teamInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeamInfo();
  }, [id]);

  const handleFileChange = (e) => {
    console.log("File selected");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image loaded");
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
          <li key={index} className={TeamProfilePageStyles.teammateUsername}>
            {teammate.username}
          </li>
        );
      }
      return null;
    });
  };

  console.log(id);
  return (
    <>
      <TemplatePage />

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
                    alt="Profile Picture"
                    className={TeamProfilePageStyles.picture}
                    onClick={handlePictureClick}
                  />
                  <div
                    className={TeamProfilePageStyles.changePicture}
                    onClick={handlePictureClick}
                  >
                    <i className="fas fa-camera" />
                  </div>
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
                  <p>Créer le: {teamInfo?.createdAt}</p>
                  <p>Mise à jour le: {teamInfo?.updatedAt}</p>
                </div>
                <div className={TeamProfilePageStyles.teamMates}>
                  <p>Membres de l'équipe:</p>
                  <ul>{renderUniqueUsernames()}</ul>
                </div>
                <div className={TeamProfilePageStyles.modifyIcon}>
                  <i className="fas fa-pen" />
                </div>
              </div>

              {announcements?.map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
              ))}
              <div className={TeamProfilePageStyles.button}>
                <Button text="Publier une annonce" />
                <Button text="Ajouter des membres" />
                <Button text="Supprimer des membres" />
                <Button text="Supprimer son équipe" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamProfilePage;
