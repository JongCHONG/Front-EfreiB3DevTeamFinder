import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

import TemplatePage from "../../components/TemplatePage/TemplatePage";
import TeamListCard from "../../components/TeamListCard/TeamListCard";

import TeamsListPageStyles from "./TeamsListPage.module.scss";

import { getTeamsListData } from "../../utils/helpers";

const TeamsListPage = () => {
  const [teamsList, setTeamsList] = useState(null);

  useEffect(() => {
    const fetchTeamsList = async () => {
      const data = await getTeamsListData();
      setTeamsList(data);
    };
    fetchTeamsList();
  }, []);

  console.log(teamsList);
  return (
    <TemplatePage>
      <section className="middle">
        <div className={TeamsListPageStyles.container}>
          <div className={TeamsListPageStyles.playersList}>
            <div className={TeamsListPageStyles.containerTitle}>
              Liste des equipes
            </div>
            <Fade bottom>
              {teamsList?.map((team, index) => (
                <TeamListCard key={index} team={team} />
              ))}
            </Fade>
          </div>
        </div>
      </section>
    </TemplatePage>
  );
};

export default TeamsListPage;
