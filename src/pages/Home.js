import img from '../resources/img.jpg';

const Home = ({ setShowNavBarDos, shownavBarDos, showProfileMenu, setShowProfileMenu, language }) => {

  const closeNavAndProfile = () => {
    if (shownavBarDos) {
      setShowNavBarDos(false);
    }
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  return (
    <div className="home-box" onClick={closeNavAndProfile}>
      <p>{language ? 'Welcome' : 'Bienvenido'}</p>
      <img src={img}/>
    </div>
  );
}
  
export default Home;