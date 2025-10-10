import React, { useState, useRef, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dropdown, Modal, Overlay, Popover, Tab, Tabs } from "react-bootstrap";
import { FormGroup } from '@mui/material';
import { Radio } from 'antd';

import { ThemeContext } from "./context";

import Defaultmode from './component/Default-Mode/Index';
import NotResult from './component/NotResult/Index';
import TboData from './component/TboData/Index';
import Inspector from './component/Inspector/Index';
import AlertLog from './component/AlertLog/Index';
import Scanner from './component/Scanner/Index';
import DarkMode from './component/Dark-Mode/Index';

import './App.css';
import 'antd/dist/antd.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

import SeacrhIcon from './assets/icons/search.svg';
import Search from './assets/icons/search-white.svg';
import Logo from './assets/images/Logo.svg';
import LogoDefaultMode from './assets/icons/Defaultmode.svg';
import LogoLongPresets from './assets/icons/LongPresets.svg';
import LogoMPpresets from './assets/icons/MPpresets.svg';
import LogoShortPresets from './assets/icons/ShortPresets.svg';
import LogoUserPresets from './assets/icons/UserPresets.svg';
import LogoUsername from './assets/icons/Username.svg';
import LogoSubciption from './assets/icons/Subsciption.svg';
import LogoEmail from './assets/icons/Email.svg';
import LogoPassword from './assets/icons/Password.svg';
import Logo3Commas from './assets/icons/3Commas.svg';
import LogoAuth from './assets/icons/Authentication.svg';
import LogoGravatar from './assets/icons/Gravatar.svg';
import LogoAvatar1 from './assets/icons/Avatar1.svg';
import LogoAvatar2 from './assets/icons/Avatar2.svg';
import LogoAvatar3 from './assets/icons/Avatar3.svg';
import LogoAvatar4 from './assets/icons/Avatar4.svg';
import LogoAvatar5 from './assets/icons/Avatar5.svg';
import LogoAvatar6 from './assets/icons/Avatar6.svg';
import LogoAvatar7 from './assets/icons/Avatar7.svg';
import LogoAvatar8 from './assets/icons/Avatar8.svg';
import LogoAvatar9 from './assets/icons/Avatar9.svg';
import LogoAvatar10 from './assets/icons/Avatar10.svg';
import LogoAvatar11 from './assets/icons/Avatar11.svg';
import LogoAvatar12 from './assets/icons/Avatar12.svg';
import LogoCeklisAvatar from './assets/icons/CeklisAvatar.svg';
import LogoClose from './assets/icons/Close.svg';
import LogoTrash from './assets/icons/Trash.svg';
import LogoEdit from './assets/icons/Edit.svg';
import user from './assets/icons/user.svg';
import vektor from './assets/icons/Vector-white.svg';
import VektorBlack from './assets/icons/Vector.svg';

// const plainOptions = ['Apple', 'Pear', 'Orange'];
function onChange(e) {
  // console.log(`radio checked:${e.target.value}`);
}

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Scanner />
  },
  {
    path: "/DefaultMode",
    main: () => <Defaultmode />
  },
  {
    path: "/NotResult",
    main: () => <NotResult />
  },
  {
    path: "/Inspector",
    main: () => <Inspector />
  }
];

function App() {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseProfile = () => setShow1(false);
  const handleShowProfile = () => setShow1(true);

  const ref = useRef(null);

  //alert manager
  const [showAlert, setShowAlert] = useState(false);
  const refAlert = useRef(null);
  //delete
  const [showdelete, setShowDelete] = useState(false);
  const refDelete = useRef(null);

  const [showdeletetwo, setShowDeleteTwo] = useState(false);
  const refDeleteTwo = useRef(null);

  const [showdeletethree, setShowDeleteThree] = useState(false);
  const refDeleteThree = useRef(null);

  const [showdeletefour, setShowDeleteFour] = useState(false);
  const refDeleteFour = useRef(null);

  const [showdeletefive, setShowDeleteFive] = useState(false);
  const refDeleteFive = useRef(null);

  const [showdeletesix, setShowDeleteSix] = useState(false);
  const refDeleteSix = useRef(null);

  const [showdeleteseven, setShowDeleteSeven] = useState(false);
  const refDeleteSeven = useRef(null);

  const [showdeleteeight, setShowDeleteEight] = useState(false);
  const refDeleteEight = useRef(null);

  const [showdeletenine, setShowDeleteNine] = useState(false);
  const refDeleteNine = useRef(null);

  const [showdeleteten, setShowDeleteTen] = useState(false);
  const refDeleteTen = useRef(null);

  const [showdeleteeleven, setShowDeleteEleven] = useState(false);
  const refDeleteEleven = useRef(null);

  const [showdeletetwelve, setShowDeleteTwelve] = useState(false);
  const refDeleteTwelve = useRef(null);

  const [showdeletethirteen, setShowDeleteThirteen] = useState(false);
  const refDeleteThirteen = useRef(null);

  //default present
  const [showHint, setShowHint] = useState(false);
  const refShowHint = useRef(null);
  const [searchHint, setSearchHint] = useState('Default Present');
  const [showHintList] = useState(["Preset Weekend1", "Preset Weekend2 ", "Preset Weekend3", "Preset Weekend4"])
  const handleSearchHint = (value) => {
    setSearchHint(value)
    // setShowHint(!showHint)     
  }

  //Username
  const [showusername, setShowUsername] = useState(false);
  const refusername = useRef(null);

  const handlingOpenFilterUsername = () => {
    setShowUsername(!showusername)
    setShowSubcription(false)
    setShowEmail(false)
    setShowPassword(false)
    setShowToken(false)
    setShowAuth(false)
    setShowAvatar(false)
  }

  //Subcription
  const [showsubcription, setShowSubcription] = useState(false);
  const refsubcription = useRef(null);

  const handlingOpenFilterSubcription = () => {
    setShowUsername(false)
    setShowSubcription(!showsubcription)
    setShowEmail(false)
    setShowPassword(false)
    setShowToken(false)
    setShowAuth(false)
    setShowAvatar(false)
  }

  //Email
  const [showemail, setShowEmail] = useState(false);
  const refemail = useRef(null);
  const handlingOpenFilterEmail = () => {
    setShowUsername(false)
    setShowSubcription(false)
    setShowEmail(!showemail)
    setShowPassword(false)
    setShowToken(false)
    setShowAuth(false)
    setShowAvatar(false)
  }

  //Password
  const [showpassword, setShowPassword] = useState(false);
  const refpassword = useRef(null);
  const handlingOpenFilterPassword = () => {
    setShowUsername(false)
    setShowSubcription(false)
    setShowEmail(false)
    setShowPassword(!showpassword)
    setShowToken(false)
    setShowAuth(false)
    setShowAvatar(false)
  }

  //3Commas Email Token
  const [showtoken, setShowToken] = useState(false);
  const reftoken = useRef(null);
  const handlingOpenFilterToken = () => {
    setShowUsername(false)
    setShowSubcription(false)
    setShowEmail(false)
    setShowPassword(false)
    setShowToken(!showtoken)
    setShowAuth(false)
    setShowAvatar(false)
  }

  //3Commas Email Token
  const [showauth, setShowAuth] = useState(false);
  const refauth = useRef(null);
  const handlingOpenFilterAuth = () => {
    setShowUsername(false)
    setShowSubcription(false)
    setShowEmail(false)
    setShowPassword(false)
    setShowToken(false)
    setShowAuth(!showauth)
    setShowAvatar(false)
  }

  //Avatar
  const [showavatar, setShowAvatar] = useState(false);
  const refavatar = useRef(null);
  const handlingOpenFilterAvatar = () => {
    setShowUsername(false)
    setShowSubcription(false)
    setShowEmail(false)
    setShowPassword(false)
    setShowToken(false)
    setShowAuth(false)
    setShowAvatar(!showavatar)
  }

  //darkMode
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  //button active
  // const [active, setActive] = useState(types[0]);

  return (
    <Router>
      <div className='Bg-Color'>
        <div style={{ display: "flex", minHeight: '100vh' }} className={darkMode ? "dark-mode-side" : "light-mode-side"}>
          <div className='Sidebar ' >
            <Link to="/">
              <img style={{ padding: '5px' }} src={Logo} alt='' />
            </Link>
            <ul style={{ listStyleType: "none", padding: 0 }} className='mt-5'>
              <li>
                <Link to="/DefaultMode">
                  <div className='button-side active-button'>
                    <img src={LogoDefaultMode} alt='' />
                    <div className='title-side'>
                      Default Mode
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/NotResult">
                  <div className='button-side'>
                    <img src={LogoMPpresets} alt='' />
                    <div className='title-side'>
                      MP Presets
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/NotResult">
                  <div className='button-side'>
                    <img src={LogoLongPresets} alt='' />
                    <div className='title-side'>
                      Long Presets
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/NotResult">
                  <div className='button-side'>
                    <img src={LogoShortPresets} alt='' />
                    <div className='title-side'>
                      Short Presets
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/NotResult">
                  <div className='button-side'>
                    <img src={user} alt='' />
                    <div className='title-side'>
                      User Presets
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
            <div>
              <Dropdown>
                <Dropdown.Toggle className='bottom-2 w-full my-8' style={{ padding: "0px", }}>
                  <div className='button-side' style={{ margin: '0px' }}>
                    <img src={LogoUserPresets} alt='' style={{ width: "35px" }} />
                    <div className='title-side'>
                      Samantha
                    </div>
                    <img src={vektor} alt='' />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className='dropdown-profile'>
                  <Dropdown.Item href="#/Profile" onClick={handleShowProfile}>Profile</Dropdown.Item>
                  <Dropdown.Item href="#/Blacklist" onClick={handleShow}>Blacklist</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <hr style={{ color: '#FEFEFE' }} />
              <div>
                <DarkMode />
              </div>
              <Modal show={show} onHide={handleClose} ref={ref}>
                <Modal.Header closeButton style={{ backgroundColor: darkMode && "#242730" }}>
                  <Modal.Title style={{ color: darkMode && "#fff" }}>Blacklist Trading Pairs</Modal.Title>
                  <div className='pointer' onClick={() => setShow(false)}>
                    <img src={LogoClose} alt='' />
                  </div>
                </Modal.Header>
                <div style={{ backgroundColor: darkMode && "#242730" }}>
                  <FormGroup className="" controlId="formBasicEmail" style={{ padding: "0px 20px" }}>
                    <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='' />
                      <input type="input" placeholder="Search filter" className='inputt-search' style={{ color: darkMode && '#fff', marginLeft: '10px' }} />
                    </div>
                  </FormGroup>
                  <div style={{ padding: "20px" }} >
                    <div className='title-judul' style={{ color: darkMode && "#fff" }}>
                      BLACKLISTED
                    </div>
                    <div className='tablee mb-3' style={{ background: darkMode && "#2E323D", color: darkMode && "#fff", border: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }} ref={ref}>
                        <div>
                          BTC-CNN
                        </div>
                        <div className='blue pointer' ref={refDelete} onClick={() => setShowDelete(!showdelete)}>
                          Remove
                        </div>
                      </div>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }} ref={ref}>
                        <div>
                          1INCH-BUSD
                        </div>
                        <div className='blue pointer' ref={refDeleteTwo} onClick={() => setShowDeleteTwo(!showdeletetwo)}>
                          Remove
                        </div>
                      </div>
                      <div className='modal-spacee' ref={ref}>
                        <div>
                          1EARTH-USDT
                        </div>
                        <div className='blue pointer' ref={refDeleteThree} onClick={() => setShowDeleteThree(!showdeletethree)}>
                          Remove
                        </div>
                      </div>
                    </div>
                    <div className='tableee' style={{ background: darkMode && "rgb(36 39 48)", color: darkMode && "#fff", border: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <div>
                          SHIB-USDT
                        </div>
                        <div className='red pointer'>
                          Blacklisted
                        </div>
                      </div>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <div>
                          BTC-CNN
                        </div>
                        <div className='red pointer'>
                          Blacklisted
                        </div>
                      </div>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <div>
                          BTC-CNN
                        </div>
                        <div className='red pointer'>
                          Blacklisted
                        </div>
                      </div>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <div>
                          SHIB-USDT
                        </div>
                        <div className='red pointer'>
                          Blacklisted
                        </div>
                      </div>
                      <div className='modal-space' style={{ borderBottom: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <div>
                          BTC-CNN
                        </div>
                        <div className='red pointer'>
                          Blacklisted
                        </div>
                      </div>
                      <div className='modal-spacee' >
                        <div>
                          BTC-CNN
                        </div>
                        <div className='red pointer'>
                          Blacklisted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='button-grup' style={{ background: darkMode && "rgb(36 39 48)" }}>
                  <div>
                    <button className='button-link' onClick={() => setShow(false)}>Cancel</button>
                  </div>
                  <div>
                    <button className='btn-hijau'>Apply</button>
                  </div>
                </div>
                <Overlay
                  show={showdelete}
                  target={refDelete}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                    <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <div style={{ padding: '0px 20px' }}>
                        Are you sure you want to delete?
                      </div>
                      <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                        <div>
                          <button className='button-red' >Yes, Delete</button>
                        </div>
                        <div>
                          <button className='button-link-delete' onClick={() => setShowDelete(false)}>Cancel</button>
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showdeletetwo}
                  target={refDeleteTwo}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                    <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <div style={{ padding: '0px 20px' }}>
                        Are you sure you want to delete?
                      </div>
                      <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                        <div>
                          <button className='button-red' >Yes, Delete</button>
                        </div>
                        <div>
                          <button className='button-link-delete' onClick={() => setShowDeleteTwo(false)}>Cancel</button>
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showdeletethree}
                  target={refDeleteThree}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                    <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                      <div style={{ padding: '0px 20px' }}>
                        Are you sure you want to delete?
                      </div>
                      <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                        <div>
                          <button className='button-red' >Yes, Delete</button>
                        </div>
                        <div>
                          <button className='button-link-delete' onClick={() => setShowDeleteThree(false)}>Cancel</button>
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </Modal>
              <Modal show={show1} onHide={handleCloseProfile}>
                <Modal.Header closeButton style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff" }}>
                  <Modal.Title>Profile</Modal.Title>
                  <div className='pointer' onClick={() => setShow1(false)}>
                    <img src={LogoClose} alt='' />
                  </div>
                </Modal.Header>
                <div className='background-white' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', padding: '10px' }}>
                  <div className='modal-profile' ref={ref}>
                    <div className='content-modal'>
                      <div>
                        <img src={LogoUsername} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          Username
                        </div>
                        <div className='title-down'>
                          samanthawilliam
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={refusername} onClick={handlingOpenFilterUsername}>
                      Update
                    </div>
                  </div>
                  <div className='modal-profile' ref={ref}>
                    <div className='content-modal'>
                      <div>
                        <img src={LogoSubciption} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          Subscription
                        </div>
                        <div className='title-down'>
                          Premium  •  Expired February 20, 2022
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={refsubcription} onClick={handlingOpenFilterSubcription}>
                      Update
                    </div>
                  </div>
                  <div className='modal-profile' ref={ref}>
                    <div className='content-modal'>
                      <div>
                        <img src={LogoEmail} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          Email Address
                        </div>
                        <div className='title-down'>
                          samanthawilliam@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={refemail} onClick={handlingOpenFilterEmail}>
                      Update
                    </div>
                  </div>
                  <div className='modal-profile' ref={ref}>
                    <div className='content-modal'>
                      <div>
                        <img src={LogoPassword} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          Password
                        </div>
                        <div className='title-down'>
                          Last Changed: 2 weeks ago
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={refpassword} onClick={handlingOpenFilterPassword}>
                      Update
                    </div>
                  </div>
                  <div className='modal-profile' ref={ref}>
                    <div className='content-modal'>
                      <div>
                        <img src={Logo3Commas} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          3Commas Email Token
                        </div>
                        <div className='title-down'>
                          samanthawilliam@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={reftoken} onClick={handlingOpenFilterToken}>
                      Update
                    </div>
                  </div>
                  <div className='modal-profile' >
                    <div className='content-modal'>
                      <div>
                        <img src={LogoAuth} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          2 Factor Authentication
                        </div>
                        <div className='title-down'>
                          samanthawilliam@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={refauth} onClick={handlingOpenFilterAuth}>
                      Update
                    </div>
                  </div>
                  <div className='modal-profile' ref={ref}>
                    <div className='content-modal'>
                      <div>
                        <img src={LogoGravatar} alt='' />
                      </div>
                      <div className='content-title'>
                        <div className='title-up'>
                          Avatar
                        </div>
                        <div className='title-down'>
                          Not yet Connected
                        </div>
                      </div>
                    </div>
                    <div className='blue pointer' ref={refavatar} onClick={handlingOpenFilterAvatar}>
                      Update
                    </div>
                  </div>
                </div>
                <Overlay
                  show={showusername}
                  target={refusername}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: "250px", borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className='mb-2 title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          Username
                        </div>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                          <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                            <input type="input" placeholder="Samantha" className='inputt-search' style={{ color: darkMode && '#fff' }} />
                          </div>
                        </FormGroup>
                        <div className='mb-3'>
                          <button className='btn-hijauu'>Save</button>
                        </div>
                        <div className='pointer' style={{ textAlign: 'center' }} onClick={() => setShowUsername(false)}>
                          Cancel
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showsubcription}
                  target={refsubcription}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: "250px", borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className='mb-2 title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          Subscription
                        </div>
                        <div>
                          Update your subcription to our
                        </div>
                        <div>
                          <div className="button-link" style={{ margin: '0px', textDecoration: 'underline' }}>
                            website
                          </div>
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showemail}
                  target={refemail}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: "250px", borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className='  mb-2 title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          Email
                        </div>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                          <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                            <input type="input" placeholder="samanthawilliam@gmail.com" className='inputt-search' style={{ color: darkMode && '#fff' }} />
                          </div>
                        </FormGroup>
                        <div className='mb-3'>
                          <button className='btn-hijauu'>Save</button>
                        </div>
                        <div className='pointer' style={{ textAlign: 'center' }} onClick={() => setShowEmail(false)}>
                          Cancel
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showpassword}
                  target={refpassword}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: "250px", borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className='  mb-2 title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          Password
                        </div>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                          <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                            <input type="password" placeholder="Current password." className='inputt-search' style={{ color: darkMode && '#fff' }} />
                          </div>
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                          <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                            <input type="password" placeholder="New password" className='inputt-search' style={{ color: darkMode && '#fff' }} />
                          </div>
                        </FormGroup>
                        <div className='mb-3'>
                          <button className='btn-hijauu'>Save</button>
                        </div>
                        <div className='pointer' style={{ textAlign: 'center' }} onClick={() => setShowPassword(false)}>
                          Cancel
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showtoken}
                  target={reftoken}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: "250px", borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className='  mb-2 title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          3Commas Email Token
                        </div>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                          <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                            <input type="input" placeholder="samanthawilliam@gmail.com" className='inputt-search' style={{ color: darkMode && '#fff' }} />
                          </div>
                        </FormGroup>
                        <div className='mb-3'>
                          <button className='btn-hijauu'>Save</button>
                        </div>
                        <div className='pointer' style={{ textAlign: 'center' }} onClick={() => setShowToken(false)}>
                          Cancel
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showauth}
                  target={refauth}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ width: "250px", borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className='mb-3 title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          Authentication
                        </div>
                        <div className='button-auth'>
                          <Radio.Group defaultValue="a" buttonStyle="solid" className='button-on-off'>
                            <Radio.Button className='toggle-on-off' value="a">ON</Radio.Button>
                            <Radio.Button className='toggle-on-off' value="b">OFF</Radio.Button>
                          </Radio.Group>
                        </div>
                        <div>
                        </div>
                      </div>

                    </Popover.Body>
                  </Popover>
                </Overlay>
                <Overlay
                  show={showavatar}
                  target={refavatar}
                  placement="top"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" style={{ borderRadius: darkMode && '20px' }}>
                    <Popover.Body style={{ backgroundColor: darkMode && '#2E323D', color: darkMode && '#fff', borderRadius: darkMode && '15px' }}>
                      <div>
                        <div className=' title-tooltipp-profile' style={{ color: darkMode && '#fff' }}>
                          Avatar
                        </div>
                        <div className='mt-2 mb-4'>
                          <Radio.Group onChange={onChange} defaultValue="a" className='avatar-profile'>
                            <div className='mb-3'>
                              <Radio.Button value="a" className='radio-avatar'>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar1} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="b" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar2} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="c" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar3} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="d" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar4} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                            </div>
                            <div className='mb-3'>
                              <Radio.Button value="e" className='radio-avatar' >
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar5} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="f" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar6} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="g" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar7} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="h" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar8} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                            </div>
                            <div>
                              <Radio.Button value="i" className='radio-avatar' >
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar9} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="j" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar10} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="k" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar11} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                              <Radio.Button value="l" className='radio-avatar' style={{ marginLeft: '10px' }}>
                                <div style={{ margin: '3px' }}>
                                  <img src={LogoAvatar12} alt='' />
                                </div>
                                <div className='CeklisAvatar'>
                                  <img src={LogoCeklisAvatar} alt='' />
                                </div>
                              </Radio.Button>
                            </div>
                          </Radio.Group>
                        </div>
                        <div className='mb-3'>
                          <button className='btn-hijauu'>Save</button>
                        </div>
                        <div className='pointer' style={{ textAlign: 'center' }} onClick={() => setShowAvatar(false)}>
                          Cancel
                        </div>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </Modal>

            </div>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                />
              ))}
            </Switch>
          </div>
          <div className='Menuitem' style={{
            backgroundColor: darkMode ? "#242730" : "#fff",
            color: darkMode && "#F5F6F8",
          }}>
            <Switch>
              <div>
                <div className='header mt-2'>
                  <div className="header-title">
                    Better Crypto Scanner Pro
                  </div>
                  <div ref={ref}>
                    <button type="button" className='Button-top' trigger="click" ref={refAlert} onClick={() => setShowAlert(!showAlert)} style={{
                      color: darkMode && "#F5F6F8",
                      border: darkMode && "1px solid #F5F6F8"
                    }}>Alert Manager</button>
                  </div>
                  <Overlay
                    show={showAlert}
                    target={refAlert}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                  >
                    <Popover id="popover-contained long" style={{ maxWidth: '500px', width: '365px', marginLeft: '-30px' }}>
                      <Popover.Body>
                        <div>
                          <div className=' mt-2 title-tooltipp' >
                            Alert Manager
                            <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => setShowAlert(false)}>
                              <img src={LogoClose} alt='' />
                            </div>
                          </div>
                          <FormGroup className="mt-3 mb-4" controlId="formBasicEmail">
                            <div className='Search-iconn search-modal' style={{ border: darkMode && '1px solid #4d515a' }}>
                              <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='' />
                              <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='' />
                              <input type="input" placeholder="Search alert" className='inputt-search' style={{ color: darkMode && '#fff', marginLeft: '10px' }} />
                            </div>
                          </FormGroup>
                          <div>
                            <div className='title-judul mb-1' style={{ color: darkMode && "#fff" }}>
                              ACTIVE ALERTS
                            </div>
                            <div className='tablee mb-3'>
                              <div className='Coloumn-Alert' ref={ref}>
                                <div style={{ width: '40%' }}>
                                  Alert 1
                                </div>
                                <div className='modall-alert'>
                                  <div className='images pointer'>
                                    <img src={LogoEdit} alt='' />
                                  </div>
                                  <div className='images pointer' ref={refDeleteFive} onClick={() => setShowDeleteFive(!showdeletefive)}>
                                    <img src={LogoTrash} alt='' />
                                  </div>
                                </div>
                                <div className='red-alert'>
                                  Disable
                                </div>
                              </div>
                              <div className='Coloumn-Alert' ref={ref}>
                                <div style={{ width: '40%' }}>
                                  Alert 1
                                </div>
                                <div className='modall-alert'>
                                  <div className='images pointer'>
                                    <img src={LogoEdit} alt='' />
                                  </div>
                                  <div className='images pointer' ref={refDeleteSix} onClick={() => setShowDeleteSix(!showdeletesix)}>
                                    <img src={LogoTrash} alt='' />
                                  </div>
                                </div>
                                <div className='red-alert'>
                                  Disable
                                </div>
                              </div>
                              <div className='Coloumn-Alert' style={{ borderBottom: 'none' }} ref={ref}>
                                <div style={{ width: '40%' }}>
                                  Alert 1
                                </div>
                                <div className='modall-alert'>
                                  <div className='images pointer'>
                                    <img src={LogoEdit} alt='' />
                                  </div>
                                  <div className='images pointer' ref={refDeleteSeven} onClick={() => setShowDeleteSeven(!showdeleteseven)}>
                                    <img src={LogoTrash} alt='' />
                                  </div>
                                </div>
                                <div className='red-alert'>
                                  Disable
                                </div>
                              </div>
                            </div>
                            <div className='tableee' style={{ background: darkMode && "rgb(36 39 48)", color: darkMode && "#fff", border: darkMode && "1px solid rgba(255, 255, 255, 0.2)" }}>
                              <div className='Coloumn-Alert' ref={ref}>
                                <div style={{ width: '40%' }}>
                                  Alert 1
                                </div>
                                <div className='modall-alert'>
                                  <div className='images pointer'>
                                    <img src={LogoEdit} alt='' />
                                  </div>
                                  <div className='images pointer' ref={refDeleteEight} onClick={() => setShowDeleteEight(!showdeleteeight)}>
                                    <img src={LogoTrash} alt='' />
                                  </div>
                                </div>
                                <div className='blue-alert'>
                                  Enable
                                </div>
                              </div>
                              <div className='Coloumn-Alert' ref={ref}>
                                <div style={{ width: '40%' }}>
                                  Alert 1
                                </div>
                                <div className='modall-alert'>
                                  <div className='images pointer'>
                                    <img src={LogoEdit} alt='' />
                                  </div>
                                  <div className='images pointer' ref={refDeleteNine} onClick={() => setShowDeleteNine(!showdeletenine)}>
                                    <img src={LogoTrash} alt='' />
                                  </div>
                                </div>
                                <div className='blue-alert'>
                                  Enable
                                </div>
                              </div>
                              <div className='Coloumn-Alert' style={{ borderBottom: 'none' }} ref={ref}>
                                <div style={{ width: '40%' }}>
                                  Alert 1
                                </div>
                                <div className='modall-alert'>
                                  <div className='images pointer'>
                                    <img src={LogoEdit} alt='' />
                                  </div>
                                  <div className='images pointer' ref={refDeleteTen} onClick={() => setShowDeleteTen(!showdeleteten)}>
                                    <img src={LogoTrash} alt='' />
                                  </div>
                                </div>
                                <div className='blue-alert'>
                                  Enable
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Overlay
                          show={showdeletefive}
                          target={refDeleteFive}
                          placement="bottom"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px', borderRadius: darkMode && " 20px" }}>
                            <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', borderRadius: darkMode && "15px" }}>
                              <div style={{ padding: '0px 20px' }}>
                                Are you sure you want to delete?
                              </div>
                              <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                <div>
                                  <button className='button-red' >Yes, Delete</button>
                                </div>
                                <div>
                                  <button className='button-link-delete' onClick={() => setShowDeleteFive(false)}>Cancel</button>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                        <Overlay
                          show={showdeletesix}
                          target={refDeleteSix}
                          placement="bottom"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px', borderRadius: darkMode && " 20px" }}>
                            <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', borderRadius: darkMode && "15px" }}>
                              <div style={{ padding: '0px 20px' }}>
                                Are you sure you want to delete?
                              </div>
                              <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                <div>
                                  <button className='button-red' >Yes, Delete</button>
                                </div>
                                <div>
                                  <button className='button-link-delete' onClick={() => setShowDeleteSix(false)}>Cancel</button>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                        <Overlay
                          show={showdeleteseven}
                          target={refDeleteSeven}
                          placement="bottom"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px', borderRadius: darkMode && " 20px" }}>
                            <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', borderRadius: darkMode && "15px" }}>
                              <div style={{ padding: '0px 20px' }}>
                                Are you sure you want to delete?
                              </div>
                              <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                <div>
                                  <button className='button-red' >Yes, Delete</button>
                                </div>
                                <div>
                                  <button className='button-link-delete' onClick={() => setShowDeleteSeven(false)}>Cancel</button>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                        <Overlay
                          show={showdeleteeight}
                          target={refDeleteEight}
                          placement="bottom"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px', borderRadius: darkMode && " 20px" }}>
                            <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', borderRadius: darkMode && "15px" }}>
                              <div style={{ padding: '0px 20px' }}>
                                Are you sure you want to delete?
                              </div>
                              <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                <div>
                                  <button className='button-red' >Yes, Delete</button>
                                </div>
                                <div>
                                  <button className='button-link-delete' onClick={() => setShowDeleteEight(false)}>Cancel</button>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                        <Overlay
                          show={showdeletenine}
                          target={refDeleteNine}
                          placement="bottom"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px', borderRadius: darkMode && " 20px" }}>
                            <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', borderRadius: darkMode && "15px" }}>
                              <div style={{ padding: '0px 20px' }}>
                                Are you sure you want to delete?
                              </div>
                              <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                <div>
                                  <button className='button-red' >Yes, Delete</button>
                                </div>
                                <div>
                                  <button className='button-link-delete' onClick={() => setShowDeleteNine(false)}>Cancel</button>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                        <Overlay
                          show={showdeleteten}
                          target={refDeleteTen}
                          placement="bottom"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px', borderRadius: darkMode && " 20px" }}>
                            <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)', borderRadius: darkMode && "15px" }}>
                              <div style={{ padding: '0px 20px' }}>
                                Are you sure you want to delete?
                              </div>
                              <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                <div>
                                  <button className='button-red' >Yes, Delete</button>
                                </div>
                                <div>
                                  <button className='button-link-delete' onClick={() => setShowDeleteTen(false)}>Cancel</button>
                                </div>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>
                <div>
                  <div className='Button-select'>
                    <div className="searchBar" ref={ref}>
                      <div className="Dropdown" ref={refShowHint} onClick={() => setShowHint(!showHint)}>
                        <div className="value">{searchHint}</div>
                        <div className='classblock' style={{ display: darkMode && "none" }}>
                          <img src={VektorBlack} alt='' />
                        </div>
                        <div className='classnone ' style={{ display: darkMode && "block" }}>
                          <img src={vektor} style={{ top: 'calc(50% - 8px)' }} alt='' />
                        </div>
                      </div>
                      <Overlay
                        show={showHint}
                        target={refShowHint}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                      >
                        <Popover id="popover-contained long" style={{ maxWidth: '500px', width: '365px', marginLeft: '-30px' }}>
                          <Popover.Body>
                            <div>
                              <div className="searchHint">
                                <div className='modall' ref={ref}>
                                  <div className="hint" style={{ width: '60%' }} onClick={() => handleSearchHint(showHintList[0])} >
                                    <div>
                                      {showHintList[0]}
                                    </div>
                                  </div>
                                  <div className='modall mt-3'>
                                    <div className='images pointer'>
                                      <img src={LogoEdit} alt='' />
                                    </div>
                                    <div className='images pointer'  >
                                      <img src={LogoTrash} ref={refDeleteEleven} onClick={() => setShowDeleteEleven(!showdeleteeleven)} alt='' />
                                    </div>
                                  </div>
                                  <Overlay
                                    show={showdeleteeleven}
                                    target={refDeleteEleven}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                  >
                                    <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                                      <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                                        <div style={{ padding: '0px 20px' }}>
                                          Are you sure you want to delete?
                                        </div>
                                        <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                          <div>
                                            <button className='button-red' >Yes, Delete</button>
                                          </div>
                                          <div>
                                            <button className='button-link-delete' onClick={() => setShowDeleteEleven(false)}>Cancel</button>
                                          </div>
                                        </div>
                                      </Popover.Body>
                                    </Popover>
                                  </Overlay>
                                </div>
                                <div className='modall' ref={ref}>
                                  <div className="hint" style={{ width: '60%' }} onClick={() => handleSearchHint(showHintList[1])} >
                                    <div>
                                      {showHintList[1]}
                                    </div>
                                  </div>
                                  <div className='modall mt-3'>
                                    <div className='images pointer'>
                                      <img src={LogoEdit} alt='' />
                                    </div>
                                    <div className='images pointer'  >
                                      <img src={LogoTrash} ref={refDeleteFour} onClick={() => setShowDeleteFour(!showdeletefour)} alt='' />
                                    </div>
                                  </div>
                                  <Overlay
                                    show={showdeletefour}
                                    target={refDeleteFour}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                  >
                                    <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                                      <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                                        <div style={{ padding: '0px 20px' }}>
                                          Are you sure you want to delete?
                                        </div>
                                        <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                          <div>
                                            <button className='button-red' >Yes, Delete</button>
                                          </div>
                                          <div>
                                            <button className='button-link-delete' onClick={() => setShowDeleteFour(false)}>Cancel</button>
                                          </div>
                                        </div>
                                      </Popover.Body>
                                    </Popover>
                                  </Overlay>
                                </div>
                                <div className='modall' ref={ref}>
                                  <div className="hint" style={{ width: '60%' }} onClick={() => handleSearchHint(showHintList[2])} >
                                    <div>
                                      {showHintList[2]}
                                    </div>
                                  </div>
                                  <div className='modall mt-3'>
                                    <div className='images pointer'>
                                      <img src={LogoEdit} alt='' />
                                    </div>
                                    <div className='images pointer'  >
                                      <img src={LogoTrash} ref={refDeleteTwelve} onClick={() => setShowDeleteTwelve(!showdeletetwelve)} alt='' />
                                    </div>
                                  </div>
                                  <Overlay
                                    show={showdeletetwelve}
                                    target={refDeleteTwelve}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                  >
                                    <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                                      <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                                        <div style={{ padding: '0px 20px' }}>
                                          Are you sure you want to delete?
                                        </div>
                                        <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                          <div>
                                            <button className='button-red' >Yes, Delete</button>
                                          </div>
                                          <div>
                                            <button className='button-link-delete' onClick={() => setShowDeleteTwelve(false)}>Cancel</button>
                                          </div>
                                        </div>
                                      </Popover.Body>
                                    </Popover>
                                  </Overlay>
                                </div>
                                <div className='modall' ref={ref}>
                                  <div className="hint" style={{ width: '60%' }} onClick={() => handleSearchHint(showHintList[3])} >
                                    <div>
                                      {showHintList[3]}
                                    </div>
                                  </div>
                                  <div className='modall mt-3'>
                                    <div className='images pointer'>
                                      <img src={LogoEdit} alt='' />
                                    </div>
                                    <div className='images pointer'  >
                                      <img src={LogoTrash} ref={refDeleteThirteen} onClick={() => setShowDeleteThirteen(!showdeletethirteen)} alt='' />
                                    </div>
                                  </div>
                                  <Overlay
                                    show={showdeletethirteen}
                                    target={refDeleteThirteen}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                  >
                                    <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
                                      <Popover.Body className='body-delete' style={{ backgroundColor: darkMode && "#242730", color: darkMode && "#fff", borderTop: darkMode && '1px solid rgba(255, 255, 255, 0.2)' }}>
                                        <div style={{ padding: '0px 20px' }}>
                                          Are you sure you want to delete?
                                        </div>
                                        <div style={{ background: darkMode && "rgb(36 39 48)" }} className='mt-3'>
                                          <div>
                                            <button className='button-red' >Yes, Delete</button>
                                          </div>
                                          <div>
                                            <button className='button-link-delete' onClick={() => setShowDeleteThirteen(false)}>Cancel</button>
                                          </div>
                                        </div>
                                      </Popover.Body>
                                    </Popover>
                                  </Overlay>
                                </div>
                              </div>
                            </div>
                          </Popover.Body>
                        </Popover>
                      </Overlay>
                    </div>
                  </div>
                  <Tabs defaultActiveKey="Scanner" id="uncontrolled-tab-example">
                    <Tab eventKey="Scanner" title="Scanner">
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          children={<route.main />}
                        />
                      ))}
                    </Tab>
                    <Tab eventKey="Inspector" title="Inspector">
                      <Inspector />
                    </Tab>
                    <Tab eventKey="TBO Data" title="TBO Data" >
                      <TboData />
                    </Tab>
                    <Tab eventKey="Alert Log" title="Alert Log" >
                      <AlertLog />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;