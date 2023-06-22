import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import moment from "moment";

import UserProfilePageStyles from "../UserProfilePage/UserProfilePage.module.scss";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import defaultAvatar from "../../assets/images/logo-announcement-default.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import Button from "../../components/Button/Button";

import { getAnnouncements } from "../../utils/helpers";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAnnouncements = async () => {
      const announcementsData = await getAnnouncements();
      const filteredAnnouncements = announcementsData?.filter(
        (announcement) => announcement.user?._id === userInfo?._id
      );

      setAnnouncements(filteredAnnouncements);
    };

    fetchAnnouncements();
    fetchUserInfo();
  }, [id, userInfo?._id]);

  const teamCreated = userInfo?.teams?.map((team) => team.name);

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

  return (
    <>
      <TemplatePage>
        <section className="middle">
          <div className={UserProfilePageStyles.topContainer}>
            <div className={UserProfilePageStyles.profileContainer}>
              <div className={UserProfilePageStyles.titleBox}>
                <h2 className={UserProfilePageStyles.title}>
                  Profil utilisateur
                </h2>
              </div>
              <Fade>
                {userInfo ? (
                  <>
                    <div className={UserProfilePageStyles.middleContainer}>
                      <div className={UserProfilePageStyles.AnnouncementCard}>
                        <div className={UserProfilePageStyles.profilePicture}>
                          <img
                            src={profilePicture}
                            alt="Profile"
                            className={UserProfilePageStyles.picture}
                            onClick={handlePictureClick}
                          />
                          <i
                            className="fas fa-camera"
                            onClick={handlePictureClick}
                          />

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </div>

                        <div className={UserProfilePageStyles.teamName}>
                          <h1>
                            {userInfo.username} -{" "}
                            {userInfo.rank || "aucun rank"}
                          </h1>

                          <p>Mail : {userInfo.mail || "non renseigné"}</p>
                          <p>Discord : {userInfo.discord || "non renseigné"}</p>
                          <p>Valorant ID: {userInfo.valorant_id}</p>
                          <p>
                            team(s) created:{" "}
                            {teamCreated || "aucune équipe crée"}
                          </p>
                          <p>region : {userInfo?.region || "non renseigné"}</p>
                          <p>
                            Disponibilités :
                            {userInfo?.availability?.join() || "non renseigné"}
                          </p>
                          <p>
                            Date de création :
                            {moment(userInfo.createdAt).format("lll")}
                          </p>
                          <p>
                            Dernière mise à jour :
                            {moment(userInfo.updatedAt).format("lll")}
                          </p>
                        </div>
                        <div className={UserProfilePageStyles.modifyIcon}>
                          <i className="fas fa-pen" />
                        </div>
                      </div>

                      {announcements?.map((announcement, index) => (
                        <AnnouncementCard
                          key={index}
                          announcement={announcement}
                        />
                      ))}
                      <div className={UserProfilePageStyles.button}>
                        <Button text="Publier une annonce" />
                        <Button text="Créer son équipe" />
                      </div>
                    </div>
                  </>
                ) : (
                  <span style={{ marginLeft: "3%" }}>
                    Chargement des données...
                  </span>
                )}
              </Fade>
            </div>
          </div>
        </section>
      </TemplatePage>
    </>
  );
};

export default UserProfilePage;