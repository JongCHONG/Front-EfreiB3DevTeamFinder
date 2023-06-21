import React from 'react';
import FooterStyles from './Footer.module.scss';

import logoDiscord from '../../assets/images/discord_logo2.png';
import logoYoutube from '../../assets/images/youtube_logo2.png';
import logoTwitter from '../../assets/images/twitter_logo2.png';
import logoInstagram from '../../assets/images/instagram_logo2.png';
import logoMail from '../../assets/images/mail_logo2.png';

const Footer = () => {
  return (
    <div className={FooterStyles.container}>
      <div className={FooterStyles.leftStyle}>
        <img src={logoDiscord} className={FooterStyles.logo} alt="Discord" />
        <img src={logoInstagram} className={FooterStyles.logo} alt="Instagram" />
        <img src={logoTwitter} className={FooterStyles.logo} alt="Twitter" />
        <img src={logoYoutube} className={FooterStyles.logo} alt="Youtube" />
      </div>
      <div className={FooterStyles.centerStyle}>
        TEAMFINDER 2023
      </div>
      <div className={FooterStyles.rightStyle}>
        <img src={logoMail} className={FooterStyles.mailIconStyle} alt="Mail Icon" />
        <span>Contact</span>
      </div>
    </div>
  );
};

export default Footer;