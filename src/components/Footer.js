import Language from "./Language";

const Footer = ({ language, setLanguage }) => {

  const closeNavAndProfile = () => {
    if (shownavBarDos) {
      setShowNavBarDos(false);
    }
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  return (
    <div className="footer-box" onClick={closeNavAndProfile}>
      <p>
        <span>©</span> 
        {language ? '2023 Fit-App, All rights reserved' : '2023 Fit-App, Todos los derechos reservados'}
      </p>
      <Language setLanguage={setLanguage} />
    </div>
  );
}
  
export default Footer;
