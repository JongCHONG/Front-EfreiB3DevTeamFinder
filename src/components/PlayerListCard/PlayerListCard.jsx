import React from "react";

import PlayerListStyles from "../PlayerListCard/PlayerListCard.module.scss"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCircleUser,
// } from '@fortawesome/free-solid-svg-icons';

const PlayerListCard = () => {
  return (
      <div className={PlayerListStyles.playerCard}>
        <div className={PlayerListStyles.playersContainer}>
        {/* <FontAwesomeIcon icon="fa-circle-user" size='lg' /> */}
          <div className={PlayerListStyles.justifyBetween}>
            <span>Username</span>
            <span>Rank</span>
            <span>Discord ID</span>
            <span>Region</span>
          </div>
          
        </div>
      </div>
  );
};

export default PlayerListCard;