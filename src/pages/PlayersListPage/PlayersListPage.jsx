import React from "react";
import { Fade } from "react-reveal";

import Menu from "../../components/Menu/Menu";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";
import PlayerListCard from "../../components/PlayerListCard/PlayerListCard";

import PlayersListPageStyles from "../PlayersListPage/PlayersListPage.module.scss";

const PlayersList = () => {
  return (
    <>
      <section className="top">
        <Menu />
      </section>
      <section className="middle">
        <div className={PlayersListPageStyles.topContainer}>
        <div className={PlayersListPageStyles.playersList}>
            <Fade bottom>
              <PlayerListCard />
              <PlayerListCard />
              <PlayerListCard />
            </Fade>
          </div>
        </div>
      </section>
      <section className="bottom">
        <ScrollToTopButton />
      </section>
    </>
  );
};

export default PlayersList;