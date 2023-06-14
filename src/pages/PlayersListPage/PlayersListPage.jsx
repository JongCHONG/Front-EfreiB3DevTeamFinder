import React, { useState, useEffect } from "react";
import { Fade } from "react-reveal";

import Menu from "../../components/Menu/Menu";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";
import PlayerListCard from "../../components/PlayerListCard/PlayerListCard";

import PlayersListPageStyles from "../PlayersListPage/PlayersListPage.module.scss";

const PlayersList = () => {

  const [playerInfo, setPlayerInfo] = useState(null);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        console.log(data);
        setPlayerInfo(data);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchPlayerInfo();
  }, []);

  return (
    <>
      <section className="top">
        <Menu />
      </section>
      <section className="middle">
        <div className={PlayersListPageStyles.topContainer}>
          
          <div className={PlayersListPageStyles.playersList}>
            <div className={PlayersListPageStyles.containerTitle}>
              Liste des joueurs
            </div>
              <Fade bottom>
              {playerInfo ? (
                playerInfo.map((player) => (
                  <PlayerListCard player={player}/>
                ))
                ) : (
                  <span style={{marginLeft:"3%"}}>Chargement des données...</span>
                )}
              </Fade>
            </div>
          </div>
          <ScrollToTopButton />
      </section>
      
    </>
  );
};

export default PlayersList;