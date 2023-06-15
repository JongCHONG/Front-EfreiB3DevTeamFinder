import React, { useState, useEffect } from "react";
import { Fade } from "react-reveal";

import Menu from "../../components/Menu/Menu";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";
import PlayerListCard from "../../components/PlayerListCard/PlayerListCard";

import PlayersListPageStyles from "../PlayersListPage/PlayersListPage.module.scss";
import { getPlayersListData } from "../../utils/helpers";

const PlayersList = () => {
  const [playersListInfo, setPlayersListInfo] = useState(null);

  useEffect(() => {
    const fetchPlayersList = async () => {
      const data = await getPlayersListData();
      setPlayersListInfo(data);
    };
    fetchPlayersList();
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
              {playersListInfo ? (
                playersListInfo.map((player) => (
                  <PlayerListCard player={player} />
                ))
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

export default PlayersList;
