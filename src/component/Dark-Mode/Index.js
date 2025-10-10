import { useContext } from "react";

import { ThemeContext } from "../../context";

import "./DarkMode.css";

import LogoMoon from '../../assets/icons/Moon.svg';
import LogoSun from '../../assets/icons/Sun.svg';

const DarkMode = () => {
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  return (
    <div>
      <div className="t" style={{backgroundColor: theme.state.darkMode && "#fff"}}>
        <div
          className="t-button"
          onClick={handleClick}
          style={{ left: theme.state.darkMode ? 32 : 52 ,backgroundColor: theme.state.darkMode ? '#0DCAB1' : '#1970B2'}}
        >
          <div className='classblock' style={{display: theme.state.darkMode && "none"}}>
            <img src={LogoSun} alt="" className="t-icon" style={{marginLeft:' 3px'}}/>          
          </div>
          <div className='classnone' style={{display: theme.state.darkMode && "block"}}>
            <img src={LogoMoon} alt="" className="t-icon" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DarkMode;
