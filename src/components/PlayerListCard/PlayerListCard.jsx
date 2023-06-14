import React from "react";

import PlayerListStyles from "../PlayerListCard/PlayerListCard.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const PlayerListCard = () => {
  return (
      <div className={PlayerListStyles.playerCard}>
        <div className={PlayerListStyles.playersContainer}>
        <FontAwesomeIcon icon={faCircleUser} size='lg' />
          <div className={PlayerListStyles.justifyBetween}>
            <span>Username</span>
            <span>Rank</span>
            <span>Discord#0000</span>
            <span>Region</span>
          </div>
          
        </div>
      </div>
  );
};

export default PlayerListCard;