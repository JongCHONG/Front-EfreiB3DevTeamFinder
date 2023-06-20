import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "../../components/Menu/Menu";
import Fade from "react-reveal/Fade";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";
import UserProfilePageStyles from "../UserProfilePage/UserProfilePage.module.scss";
import ProfilCard from "../../components/ProfilCard/ProfilCard";

const UserProfilePage = ({}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [id, setId] = useState(1);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users?id=${id}`);
        const data = await response.json();
        console.log(data);
        setUserInfo(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, [id]);

 

  return (
    <>
      <section className="top">
        <Menu />
      </section>
      <section className="middle">
        <div className={UserProfilePageStyles.topContainer}>
          <div className={UserProfilePageStyles.playersList}>
            <div className={UserProfilePageStyles.containerTitle}>
              Profil utilisateur
            </div>
            <Fade left>
              {userInfo ? (
                <div>
                  <p>Name: {userInfo.username}</p>
                  <p>teams: {userInfo.teams[1]}</p>
                  <p>Mail: {userInfo.mail}</p>
                  <p>Password: {userInfo.password}</p>
                  <p>Discord: {userInfo.discord}</p>
                </div>
              ) : (
                <span style={{ marginLeft: "3%" }}>
                  Chargement des données...
                </span>
              )}
            </Fade>
          </div>
        </div>
        <ScrollToTopButton />
      </section>
    </>
  );
};

export default UserProfilePage;
