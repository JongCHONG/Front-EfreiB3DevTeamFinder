import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { UserContext } from "../../contexts/UserContext";

import TeamProfilePageStyles from "./TeamProfilePage.module.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.png";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import Button from "../../components/Button/Button";
import ModifyTeam from "../../components/ModifyTeam/ModifyTeam";

import { getAnnouncements, getTeamById } from "../../utils/helpers";

const TeamProfilePage = ({ onClose }) => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const [fileInputRef, setFileInputRef] = useState(null);
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useContext(UserContext);

  const fetchTeamInfo = async () => {
    const teamInfoData = await getTeamById(id);
    setTeamInfo(teamInfoData);
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const announcementsData = await getAnnouncements();
      const filteredArray = announcementsData?.filter(
        (item) => item?.team?._id === id
      );
      setAnnouncements(filteredArray);
    };

    const fetchTeamInfo = async () => {
      const teamInfoData = await getTeamById(id);
      setTeamInfo(teamInfoData);
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

  const handleModifyClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    fetchTeamInfo();
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

  const isCreator = user?.teams.some((team) => team._id === teamInfo?._id);

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
                      ref={setFileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className={TeamProfilePageStyles.teamInfos}>
                    <h1>{teamInfo?.name}</h1>

                    <p>Team Leader: {teamInfo?.team_leader_id?.username}</p>
                    <p>Description: {teamInfo?.description}</p>
                    <p>Région: {teamInfo?.region}</p>
                    <p>Disponibilité: {teamInfo?.availability}</p>
                    <p>
                      Créée le:
                      {moment(teamInfo?.createddAt).format("DD/MM/YYYY")}
                    </p>
                    <p>
                      Mise à jour le:
                      {moment(teamInfo?.updatedAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className={TeamProfilePageStyles.teamMates}>
                    <p>Membres de l'équipe:</p>
                    <ul>{renderUniqueUsernames()}</ul>
                  </div>
                  <div className={TeamProfilePageStyles.buttons}>
                    {isCreator && (
                      <Button
                        text="Modifier les infos"
                        onClick={handleModifyClick}
                      />
                    )}
                    <Button text="Publier une annonce" />
                    <Button text="Ajouter des membres" />
                    <Button text="Supprimer des membres" />
                    <Button text="Supprimer son équipe" />
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

      {showPopup && <ModifyTeam teamId={id} onClose={handleClosePopup} />}
    </>
  );
};

export default TeamProfilePage;
