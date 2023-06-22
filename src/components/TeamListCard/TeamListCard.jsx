import React from "react";
import { Link } from "react-router-dom";

import TeamListStyles from "./TeamListCard.module.scss";
import logoDefault from "../../assets/images/logo-announcement-default.png";

const TeamListCard = ({ team }) => {
  const teammates = team.teammates?.map((teammate) => (
    <div className={TeamListStyles.teammate} key={teammate._id}>
      <Link to="/">{teammate?.username}</Link>
    </div>
  ));

  return (
    <div className={TeamListStyles.teamCard}>
      <div className={TeamListStyles.teamContainer}>
        <div>
          <img src={logoDefault} alt="logo" />
        </div>
        <div className={TeamListStyles.rightContainer}>
          <div className={TeamListStyles.head}>
            <span className={TeamListStyles.infos}>
              <Link to={`/team-profile/${team._id}`}>{team?.name}</Link>
            </span>
            <span className={TeamListStyles.infos}>
              Team Leader: <Link to="/">{team?.team_leader_id?.username}</Link>
            </span>
            <span className={TeamListStyles.infos}>Région: {team?.region}</span>
            <span className={TeamListStyles.infos}>
              Discord: {team?.discord}
            </span>
          </div>
          <div className={TeamListStyles.middle}>
            Disponibilité: {team?.availability}
          </div>
          <div className={TeamListStyles.bottom}>
            Membres:
            {teammates.length > 0 ? (
              teammates
            ) : (
              <div className={TeamListStyles.noMember}>Pas de membres</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamListCard;
