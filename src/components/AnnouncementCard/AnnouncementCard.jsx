import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import AnnouncementCardStyles from "../AnnouncementCard/AnnouncementCard.module.scss";
import logoDefault from "../../assets/images/logo-announcement-default.png";

const AnnouncementCard = ({ announcement }) => {
  const { user, team, createdAt, announcement_text } = announcement;
  return (
    <div className={AnnouncementCardStyles.announcementCard}>
      <div className={AnnouncementCardStyles.announcementsHeader}>
        <Link to={ team ? `/team-profile/${team?._id}` : `/profil/${user?._id}`}
          className={AnnouncementCardStyles.announcementsLink}
        >
          {team ? "Team : " + team?.name : "Joueur : " + user?.username}
        </Link>
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
            <Link
              to={`/profil/${team?.team_leader_id?._id}`}
              style={{color:"white"}}
            >
              {team && `TeamLeader : ${team?.team_leader_id?.username}`}
            </Link>
          </span>
          <span className={AnnouncementCardStyles.footerText}>
            Région : {team ? team?.region : user?.region}
          </span>
          <span className={AnnouncementCardStyles.footerText}>
            Disponibilités : {team ? team?.availability : user?.availability}
          </span>
        </div>
        <div className={AnnouncementCardStyles.footerRight}>
          <span className={AnnouncementCardStyles.footerText}>
            Posté le {moment(createdAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
