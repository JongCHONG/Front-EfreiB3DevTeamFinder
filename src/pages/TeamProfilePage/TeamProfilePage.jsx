import TemplatePage from "../../components/TemplatePage/TemplatePage";
import TeamProfilePageStyles from "./TeamProfilePage.module.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useState, useRef } from "react";

const TeamProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(defaultAvatar);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    console.log("File selected");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image loaded");
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <TemplatePage />
      <section className="middle">
        <div className={TeamProfilePageStyles.topContainer}>
          <div className={TeamProfilePageStyles.profileContainer}>
            <div className={TeamProfilePageStyles.titleBox}>
              <h2 className={TeamProfilePageStyles.title}>Profil équipe</h2>
            </div>

            <div className={TeamProfilePageStyles.middleContainer}>
              <div className={TeamProfilePageStyles.profilePicture}>
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className={TeamProfilePageStyles.picture}
                  onClick={handlePictureClick}
                />
                <div
                  className={TeamProfilePageStyles.changePicture}
                  onClick={handlePictureClick}
                >
                  <i className="fas fa-camera" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>

              <div className={TeamProfilePageStyles.teamName}>
                <h1>Team Name</h1>
              </div>
              <div className={TeamProfilePageStyles.modifyIcon}>
                <i className="fas fa-pen" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamProfilePage;
