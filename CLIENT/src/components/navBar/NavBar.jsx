import "./navBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const NavBar = ({toggleSide}) => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
          <span>SNAPSHOT</span>
        </Link>
        <GridViewOutlinedIcon className="button" onClick={toggleSide} />
        {darkMode ? (
          <WbSunnyOutlinedIcon className="button" onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon className="button" onClick={toggle} />
        )}
        <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
          <HomeOutlinedIcon />
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link
          to={"/profile/" + currentUser.id}
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <PersonOutlinedIcon />
        </Link>
        <Link
          to="/chat"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <EmailOutlinedIcon />
        </Link>
        <NotificationsOutlinedIcon />
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default NavBar;
