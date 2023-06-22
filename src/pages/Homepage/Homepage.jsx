import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";

import HomepageStyles from "../HomePage/HomePage.module.scss";
import { getAnnouncements } from "../../utils/helpers";

const HomePage = () => {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      setAnnouncements(data);
    };
    fetchAnnouncements();
  }, []);

  const slicedAnnoucments = announcements?.slice(0, 5);
  return (
    <>
      <TemplatePage>
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
              {slicedAnnoucments?.map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
              ))}
            </Fade>
          </div>
        </div>
      </TemplatePage>
    </>
  );
};

export default HomePage;
