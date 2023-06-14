import React from "react";

import PlayerListStyles from "../PlayerListCard/PlayerListCard.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';


const PlayerListCard = ({ player }) => {

  return (
      <div className={PlayerListStyles.playerCard}>
        <div className={PlayerListStyles.playersContainer}>
        <FontAwesomeIcon icon={faCircleUser} size='lg' />
            <div className={PlayerListStyles.justifyBetween}>
              <span style={{width:"250px"}}>{player.username}</span>
              <span style={{width:"200px"}}>Rank: {player.rank}</span>
              <span style={{width:"400px"}}>Discord: {player.discord}</span>
              <span>Région: {player.region}</span>
            </div>
        </div>
      </div>
  );
};

export default PlayerListCard;