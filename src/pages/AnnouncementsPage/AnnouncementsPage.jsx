import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";

import AnnouncementsPageStyles from "../AnnouncementsPage/AnnouncementsPage.module.scss";
import { getAnnouncements } from "../../utils/helpers";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      setAnnouncements(data);
    };
    fetchAnnouncements();
  }, []);

  return (
    <>
      <TemplatePage>
        <div className={AnnouncementsPageStyles.topContainer}>
          <div className={AnnouncementsPageStyles.announcementsList}>
            <div className={AnnouncementsPageStyles.containerTitle}>
              Annonces
            </div>
            <Fade bottom>
              {announcements?.map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
              ))}
            </Fade>
          </div>
        </div>
      </TemplatePage>
    </>
  );
};

export default AnnouncementsPage;
