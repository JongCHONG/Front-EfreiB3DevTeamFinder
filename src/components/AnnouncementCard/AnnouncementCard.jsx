import React from "react";

import moment from "moment";

import AnnouncementCardStyles from "../AnnouncementCard/AnnouncementCard.module.scss";
import logoDefault from "../../assets/images/logo-announcement-default.png";

const AnnouncementCard = ({ announcement }) => {
  const { user, team, createdAt, announcement_text } = announcement;
  return (
    <div className={AnnouncementCardStyles.announcementCard}>
      <div className={AnnouncementCardStyles.announcementsHeader}>
        {team ? "Team : " + team?.name : "Joueur : " + user?.username}
      </div>
      <div className={AnnouncementCardStyles.announcementsContainer}>
        <img src={logoDefault} alt="logo" />
        <p className={AnnouncementCardStyles.announcementText}>
          {announcement_text}
        </p>
      </div>
      <div className={AnnouncementCardStyles.announcementsFooter}>
        <div className={AnnouncementCardStyles.footerLeft}>
          <span className={AnnouncementCardStyles.footerText}>
            {team && `TeamLeader : ${team?.team_leader_id?.username}`}
          </span>
          <span className={AnnouncementCardStyles.footerText}>
            Region : {team ? team?.region : user?.region}
          </span>
          <span className={AnnouncementCardStyles.footerText}>
            Disponibilités : {team ? team?.availability : user?.availability}
          </span>
        </div>
        <div className={AnnouncementCardStyles.footerRight}>
          <span className={AnnouncementCardStyles.footerText}>
            Posté le {moment(createdAt).format("lll")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
