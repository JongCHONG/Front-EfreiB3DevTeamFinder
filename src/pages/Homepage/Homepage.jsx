import React from "react";
import { Fade } from "react-reveal";

import Menu from "../../components/Menu/Menu";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";

import HomepageStyles from "../Homepage/Homepage.module.scss";

const Homepage = () => {
  return (
    <>
      <section className="top">
        <Menu />
      </section>
      <section className="middle">
        <div className={HomepageStyles.topContainer}>
          <Fade left>
            <div className={HomepageStyles.intro}>
              Trouvez votre équipe idéale avec Team Finder ! <br />
              <br />
              Notre plateforme facilite la recherche et la formation d'équipes
              performantes pour les passionnés de jeux en équipe. Trouvez des
              coéquipiers talentueux, communiquez facilement et organisez des
              sessions de jeu. Rejoignez notre communauté dès aujourd'hui et
              vivez des moments palpitants avec votre équipe de rêve. Prêt à
              relever des défis et à atteindre de nouveaux sommets ? <br />
              <br />
              Rejoignez Team Finder dès maintenant !
            </div>
          </Fade>
        </div>
        <div className={HomepageStyles.bottomContainer}>
          <div className={HomepageStyles.bottomContainerTitle}>
            Dernieres annonces
          </div>
          <div className={HomepageStyles.announcementsList}>
            <Fade bottom>
              <AnnouncementCard />
              <AnnouncementCard />
              <AnnouncementCard />
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

export default Homepage;
