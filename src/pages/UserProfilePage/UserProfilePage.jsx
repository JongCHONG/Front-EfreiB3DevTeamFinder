import TemplatePage from "../../components/TemplatePage/TemplatePage";
import UserProfilePageStyles from "./UserProfilePage.module.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useState, useRef } from "react";

const UserProfilePage = () => {
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
        <div className={UserProfilePageStyles.topContainer}>
          <div className={UserProfilePageStyles.profileContainer}>
            <div className={UserProfilePageStyles.titleBox}>
              <h2 className={UserProfilePageStyles.title}>
                Profil utilisateur
              </h2>
            </div>

            <div className={UserProfilePageStyles.middleContainer}>
              <div className={UserProfilePageStyles.profilePicture}>
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className={`${UserProfilePageStyles.picture} ${UserProfilePageStyles.defaultAvatar}`}
                  onClick={handlePictureClick}
                />
                <div
                  className={UserProfilePageStyles.changePicture}
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

              <div className={UserProfilePageStyles.userName}>
                <h1>Username - Rank XXX</h1>
                <p>
                  <i className="fas fa-user" /> ID Valorant:
                  33c1f011-4eca-068c-9751-f68c788b2eee
                </p>
                <p>
                  <i className="fas fa-envelope" /> adresse@mail.com
                </p>
                <p>
                  <i className="fab fa-discord" /> Discord#0000
                </p>
                <p>
                  <i className="fas fa-map-marker-alt" /> Région: France
                </p>
                <span> Disponible le : Lundi, Vendredi, Samedi, Dimanche</span>
              </div>

              <div className={UserProfilePageStyles.modifyIcon}>
                <i className="fas fa-pen" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
