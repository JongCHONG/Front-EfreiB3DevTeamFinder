import React from "react";

import PlayerListStyles from "../PlayerListCard/PlayerListCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PlayerListCard = ({ player }) => {
  return (
    <div className={PlayerListStyles.playerCard}>
      <div className={PlayerListStyles.playersContainer}>
      <FontAwesomeIcon icon={faCircleUser} size='lg' />
          <div className={PlayerListStyles.justifyBetween}>
            <span style={{width:"30%"}}>
              <Link
                to={`/profil/${player._id}`}
                style={{color:"white"}}
              >
                {player.username}
              </Link>
            </span>
            <span style={{width:"30%"}}>Rank: {player.rank}</span>
            <span style={{width:"50%"}}>Discord: {player.discord}</span>
            <span style={{width:"25%"}}>Région: {player.region}</span>
          </div>
      </div>
    </div>
  );
};

export default PlayerListCard;
