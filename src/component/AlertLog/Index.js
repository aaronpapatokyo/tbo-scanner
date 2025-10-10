import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Overlay, FormCheck, Form, Popover } from "react-bootstrap";

import { ThemeContext } from "../../context";

import './Alertlog.css';

import SeacrhIcon from '../../assets/icons/search.svg';
import Search from '../../assets/icons/search-white.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import Filter from '../../assets/icons/Filter-white.svg';
import AlertIcon from '../../assets/icons/Alert.svg';
import Alert from '../../assets/icons/Alert-white.svg';
import LogoClose from '../../assets/icons/Close.svg';

export default function AlertLog() {
  const ref = useRef(null);

  //Edit Coloumn
  const [showset, setShowSet] = useState(false);
  const refset = useRef(null);

  //Exchange
  const [showexchange, setShowExchange] = useState(false);
  const refexchange = useRef(null);
  const handlingOpenFilterExchange = () => {
    setShowExchange(!showexchange)
    setShowPreset(false)
    setShowDirection(false)
  }
  //Preset
  const [showpreset, setShowPreset] = useState(false);
  const refpreset = useRef(null);
  const handlingOpenFilterPreset = () => {
    setShowExchange(false)
    setShowPreset(!showpreset)
    setShowDirection(false)
  }

  //Direction
  const [showdirection, setShowDirection] = useState(false);
  const refdirection = useRef(null);
  const handlingOpenFilterDirection = () => {
    setShowExchange(false)
    setShowPreset(false)
    setShowDirection(!showdirection)
  }

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div>
      <div className='content-padding'>
        <div className='Content-space p-1'>
          <div className='col-4'>
            <FormGroup className="form-space" controlId="exampleForm.ControlTextarea1">
              <FormGroup className="Search-iconn" controlId="formBasicEmail">
                <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='search' />
                <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='search' />
                <input type="input" placeholder="Search filter" className='input-search' />
              </FormGroup>
            </FormGroup>
          </div>
          <div className='Content-space'>
            <div>
              <button type='button' className='button-border'>Create Alert</button>
            </div>
            <div>
              <Link to="/Edit-Filter">
                <button type='button' className='button-border'>Edit Filter</button>
              </Link>
            </div>
            <div>
              <button type='button' className='button-border'>Reset Filter</button>
            </div>
            <div >
              <button type='button' className='button-border'>Create Watchlist</button>
            </div>
            <div ref={ref}>
              <button ref={refset} onClick={() => setShowSet(!showset)} type='button' className='button-border1'>Edit Column</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr className='header-table'>
                <th className='pointer' style={{ minWidth: "250px" }}>
                  <div className='flexx-th'>
                    <div>DATE</div>
                    <div>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={AlertIcon} alt='' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Alert} alt='' />
                    </div>
                  </div>
                </th>
                <th className='pointer'>
                  <div className='flexx-th'>
                    <div>Exhange</div>
                    <div ref={refexchange} onClick={handlingOpenFilterExchange}>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                    </div>
                  </div>
                </th>
                <th>
                  Trading Pair
                </th>
                <th className='pointer' style={{ minWidth: "105px" }}>
                  <div className='flexx-th' >
                    <div>Preset</div>
                    <div ref={refpreset} onClick={handlingOpenFilterPreset}>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                    </div>
                  </div>
                </th>
                <th className='pointer' >
                  <div className='flexx-th'>
                    <div>Alert</div>
                    <div>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={AlertIcon} alt='' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Alert} alt='' />
                    </div>
                  </div>
                </th>
                <th className='pointer' >
                  <div className='flexx-th'>
                    <div>Direction</div>
                    <div ref={refdirection} onClick={handlingOpenFilterDirection}>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                    </div>
                  </div>
                </th>
                <th ref={ref}>
                  Price at Alert
                </th>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>MP</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Long</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>MP</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
              <tr className='table-tr'>
                <td>03/12/2021 - 4:45 AM</td>
                <td>Binance</td>
                <td>1INCH-BUSD</td>
                <td>Short</td>
                <td>Lorem Ipsum Dolor Sit Amet</td>
                <td>Lorem Ipsum</td>
                <td>2.0825</td>
              </tr>
            </table>
          </div>
          <Overlay
            show={showset}
            target={refset}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
              <Popover.Body>
                <div>
                  <div style={{ float: 'right', marginTop: '-40px' }} onClick={() => setShowSet(false)}>
                    <img className='pointer' src={LogoClose} alt='' />
                  </div>
                  <div className='Search-Kolom'>
                    <div>
                      <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='search' />
                      <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='search' />
                    </div>
                    <input type="input" placeholder="Search Column" />
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='DATE'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='Exhange'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='Trading Pair'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='Preset'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='Alert'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='Direction'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='form-selected1 mt-3'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label='Price Alert'
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                </div>
              </Popover.Body>
            </Popover>
          </Overlay>
          <Overlay
            show={showexchange}
            target={refexchange}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px', backgroundColor: darkMode && "#252831" }}>
              <Popover.Body style={{ padding: '0' }}>
                <div>
                  <div className=' mt-2 title-tooltipp' style={{ padding: '10px 20px 0px 20px' }}>Filter</div>
                  <hr />
                  <div className='form-selected1 mt-1' style={{ padding: '0px 20px' }}>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`All Exchanges`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Binance`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Binance US`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Coinbase Pro`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`FTX`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`FTX US`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`KuCoin`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`KuCoin Futures`}
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <hr />
                  <div className='mb-2' style={{ padding: '0px 15px 10px 15px' }}>
                    <button className='btn-hijauu'>Apply Filter</button>
                  </div>
                </div>
              </Popover.Body>
            </Popover>
          </Overlay>
          <Overlay
            show={showpreset}
            target={refpreset}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
              <Popover.Body>
                <div>
                  <div className=' mt-2 title-tooltipp'>Filter</div>
                  <div className='form-selected1 mt-1'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`MP`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Long`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Short`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`User`}
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='mb-2'>
                    <button className='btn-hijauu'>Apply Filter</button>
                  </div>
                </div>
              </Popover.Body>
            </Popover>
          </Overlay>
          <Overlay
            show={showdirection}
            target={refdirection}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
              <Popover.Body>
                <div>
                  <div className=' mt-2 title-tooltipp'>Filter</div>
                  <div className='form-selected1 mt-1'>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Short`}
                          />
                        </div>
                      ))}
                    </Form>
                    <Form>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <FormCheck
                            type={type}
                            id={`default-${type}`}
                            label={`Long`}
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  <div className='mb-2'>
                    <button className='btn-hijauu'>Apply Filter</button>
                  </div>
                </div>
              </Popover.Body>
            </Popover>
          </Overlay>
        </div>
      </div>
    </div>
  )
}