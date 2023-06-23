import React, { useState, useContext, useEffect } from "react";
import TemplatePage from "../../components/TemplatePage/TemplatePage";
import TeamProfilePageStyles from "./TeamProfilePage.module.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useParams, Link } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import {
  getAnnouncements,
  getTeamById,
  checkUserLoggedIn,
} from "../../utils/helpers";
import Button from "../../components/Button/Button";
import moment from "moment";

import { UserContext } from "../../contexts/UserContext";
import ModifyTeam from "../../components/ModifyTeam/ModifyTeam";

const TeamProfilePage = ({ onClose }) => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const [fileInputRef, setFileInputRef] = useState(null);
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState(null);
  const [newAnnouncement, setNewAnnouncements] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useContext(UserContext);
  const userConnected = checkUserLoggedIn();

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
          <Link to={`/profil/${teammate._id}`} style={{ color: "#ff4454" }}>
            <li key={index}>{teammate.username}</li>
          </Link>
        );
      }
      return null;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncements((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userConnected.token}`,
        },
        body: JSON.stringify({
          team: teamInfo._id,
          announcement_text: newAnnouncement.description,
        }),
      });

      if (response.ok) {
        console.log("Announcement created successfully");
      } else {
        console.log("Failed to create announcement");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
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
                      <>
                        <Button
                          text="Modifier les infos"
                          onClick={handleModifyClick}
                        />
                        <Button text="Publier une annonce" />
                        <Button text="Ajouter des membres" />
                        <Button text="Supprimer des membres" />
                        <Button text="Supprimer son équipe" />
                      </>
                    )}
                  </div>
                </div>
                {isCreator && (
                  <form
                    onSubmit={handleSubmit}
                    className={TeamProfilePageStyles.poster}
                  >
                    <div>
                      <label htmlFor="description">Poster une annonce:</label>
                      <br />
                      <textarea
                        className={TeamProfilePageStyles.textarea}
                        id="description"
                        name="description"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <button type="submit">Envoyer</button>
                  </form>
                )}
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
