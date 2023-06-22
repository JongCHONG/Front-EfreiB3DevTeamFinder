import React from "react";

const ProfilCard = ({ player }) => {
  return (
    <>
      <span style={{ width: "250px" }}>{player.username}</span>
      <span style={{ width: "200px" }}>Rank: {player.rank}</span>
      <span style={{ width: "400px" }}>Discord: {player.discord}</span>
      <span>Région: {player.region}</span>
    </>
  );
};

export default ProfilCard;
