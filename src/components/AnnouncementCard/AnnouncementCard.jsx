import React from "react";

import AnnouncementCardStyles from "../AnnouncementCard/AnnouncementCard.module.scss"
import logoDefault from "../../assets/images/logo-announcement-default.png";

const AnnouncementCard = () => {
  return (
      <div className={AnnouncementCardStyles.announcementCard}>
        <div className={AnnouncementCardStyles.announcementsHeader}>TeamName</div>
        <div className={AnnouncementCardStyles.announcementsContainer}>
          <img src={logoDefault} alt="logo" />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          quod delectus adipisci saepe placeat odit laudantium, sint soluta ab,
          tempore quia, aperiam ullam quis voluptatem et repellat error
          reiciendis voluptates?
        </div>
        <div className={AnnouncementCardStyles.announcementsFooter}>Region</div>
      </div>
  );
};

export default AnnouncementCard;
