import React, { useState, useEffect } from "react";
import { Fade } from "react-reveal";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
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
      <TemplatePage>
        <section className="middle">
          <div className={PlayersListPageStyles.topContainer}>
            <div className={PlayersListPageStyles.playersList}>
              <div className={PlayersListPageStyles.containerTitle}>
                Liste des joueurs
              </div>
              <Fade bottom>
                {playersListInfo?.map((player, index) => (
                  <PlayerListCard key={index} player={player} />
                ))}
              </Fade>
            </div>
          </div>
        </section>
      </TemplatePage>
    </>
  );
};

export default PlayersList;
