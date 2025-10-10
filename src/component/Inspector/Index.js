import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Overlay, FormCheck, Form, Popover } from "react-bootstrap";

import { ThemeContext } from "../../context";

import './Inpector.css';

import SeacrhIcon from '../../assets/icons/search.svg';
import Search from '../../assets/icons/search-white.svg';
import FilterIcon from '../../assets/icons/Filter.svg';
import Filter from '../../assets/icons/Filter-white.svg';
import LogoClose from '../../assets/icons/Close.svg';

export default function Inspector() {
  const ref = useRef(null);

  //Edit Coloumn
  const [showset, setShowSet] = useState(false);
  const refset = useRef(null);

  //Time Frame
  const [showtimeframe, setShowTimeFrame] = useState(false);
  const reftimeframe = useRef(null);
  const handlingOpenFilterTimeFrame = () => {
    setShowTimeFrame(!showtimeframe)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Trading Pair
  const [showtradingpair, setShowTradingPair] = useState(false);
  const reftradingpair = useRef(null);
  const handlingOpenFilterTradingPair = () => {
    setShowTimeFrame(false)
    setShowTradingPair(!showtradingpair)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Open Long status
  const [showopenlongstatus, setShowOpenLongStatus] = useState(false);
  const refopenlongstatus = useRef(null);
  const handlingOpenFilterOpenLongStatus = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(!showopenlongstatus)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Open Short Status
  const [showopenshortstatus, setShowOpenShortStatus] = useState(false);
  const refopenshortstatus = useRef(null);
  const handlingOpenFilterOpenShortStatus = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(!showopenshortstatus)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Open Long
  const [showopenlong, setShowOpenLong] = useState(false);
  const refopenlong = useRef(null);
  const handlingOpenFilterOpenLong = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(!showopenlong)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Breakout
  const [showbreakout, setShowBreakout] = useState(false);
  const refbreakout = useRef(null);
  const handlingOpenFilterBreakout = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(!showbreakout)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Close Long
  const [showcloselong, setShowCloseLong] = useState(false);
  const refcloselong = useRef(null);
  const handlingOpenFilterCloseLong = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(!showcloselong)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Cross Up
  const [showcrossup, setShowCrossUp] = useState(false);
  const refcrossup = useRef(null);
  const handlingOpenFilterCrossUp = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(!showcrossup)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Open Short
  const [showopenshort, setShowOpenShort] = useState(false);
  const refopenshort = useRef(null);
  const handlingOpenFilterOpenShort = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(!showopenshort)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Breakdown
  const [showbreakdown, setShowBreakdown] = useState(false);
  const refbreakdown = useRef(null);
  const handlingOpenFilterBreakdown = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(!showbreakdown)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Close Short
  const [showcloseshort, setShowCloseShort] = useState(false);
  const refcloseshort = useRef(null);
  const handlingOpenFilterCloseShort = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(!showcloseshort)
    setShowCrossDown(false)
  }

  //Cross Down
  const [showcrossdown, setShowCrossDown] = useState(false);
  const refcrossdown = useRef(null);
  const handlingOpenFilterCrossDown = () => {
    setShowTimeFrame(false)
    setShowTradingPair(false)
    setShowOpenLongStatus(false)
    setShowOpenShortStatus(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(!showcrossdown)
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
        <div style={{ overflowX: "auto" }}>
          <table>
            <tr className='header-table'>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div >
                    Time Frame
                  </div>
                  <div ref={reftimeframe} onClick={handlingOpenFilterTimeFrame}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div >
                    Trading Pair
                  </div>
                  <div ref={reftradingpair} onClick={handlingOpenFilterTradingPair}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th>
                TBO Fast
              </th>
              <th style={{ minWidth: '130px' }}>
                TBO Mid Fast
              </th>
              <th style={{ minWidth: '130px' }}>
                TBO Mid Slow
              </th>
              <th >
                TBO Slow
              </th>
              <th >
                Support
              </th>
              <th >
                Resistance
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '170px' }}>
                <div className='flexx-th'>
                  <div >
                    Open Long Status
                  </div>
                  <div ref={refopenlongstatus} onClick={handlingOpenFilterOpenLongStatus}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '170px' }}>
                <div className='flexx-th'>
                  <div >
                    Open Short Status
                  </div>
                  <div ref={refopenshortstatus} onClick={handlingOpenFilterOpenShortStatus}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Open Long
                  </div>
                  <div ref={refopenlong} onClick={handlingOpenFilterOpenLong}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} >
                <div className='flexx-th'>
                  <div >
                    Breakout
                  </div>
                  <div ref={refbreakout} onClick={handlingOpenFilterBreakout}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Close Long
                  </div>
                  <div ref={refcloselong} onClick={handlingOpenFilterCloseLong}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} >
                <div className='flexx-th'>
                  <div >
                    Cross Up
                  </div>
                  <div ref={refcrossup} onClick={handlingOpenFilterCrossUp}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Open Short
                  </div>
                  <div ref={refopenshort} onClick={handlingOpenFilterOpenShort}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} >
                <div className='flexx-th'>
                  <div >
                    Breakdown
                  </div>
                  <div ref={refbreakdown} onClick={handlingOpenFilterBreakdown}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Close Short
                  </div>
                  <div ref={refcloseshort} onClick={handlingOpenFilterCloseShort}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Cross Down
                  </div>
                  <div ref={refcrossdown} onClick={handlingOpenFilterCrossDown} >
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
            </tr>
            <tr className='table-tr'>
              <td>5m</td>
              <td>BINANCE:BTC-USD</td>
              <td>58008.13</td>
              <td>57962.52</td>
              <td>57210.00</td>
              <td>53874.00</td>
              <td>57739</td>
              <td>58058</td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr className='table-tr'>
              <td>5m</td>
              <td>BINANCE:BTC-USD</td>
              <td>58008.13</td>
              <td>57962.52</td>
              <td>57210.00</td>
              <td>53874.00</td>
              <td>57739</td>
              <td>58058</td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
              <td>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} style={{ textAlign: 'center' }}>
                      <FormCheck
                        type={type}
                        id={`default-${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
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
                          label='Time Frame'
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
                          label='TBO Fast'
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
                          label='TBO Mid Fast'
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
                          label='TBO Mid Slow'
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
                          label='TBO Slow'
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
                          label='Support	Resistance'
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
                          label='Open Long Status'
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
                          label='Open Short Status'
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
                          label='Open Long'
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
                          label='Breakout'
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
                          label='Close Long'
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
                          label='Cross Up'
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
                          label='Open Short'
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
                          label='Breakdown'
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
          show={showtimeframe}
          target={reftimeframe}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px', backgroundColor: darkMode && "#252831" }}>
            <Popover.Body style={{ padding: '0' }}>
              <div>
                <div className=' mt-2 title-tooltipp' style={{ padding: '10px 20px 0px 20px' }}>
                  Filter
                </div>
                <hr />
                <div className='form-selected1 mt-1' style={{ padding: '0px 20px' }}>
                  <Form>
                    {['checkbox'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`5m`}
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
                          label={`10m`}
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
                          label={`15m`}
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
                          label={`20m`}
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
                          label={`25m`}
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
                          label={`30m`}
                        />
                      </div>
                    ))}
                  </Form>
                </div>
                <hr />
                <div className='mb-2' style={{ padding: '0px 15px 10px 15px' }}>
                  <button className='btn-hijauu'>Apply</button>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        </Overlay>
        <Overlay
          show={showtradingpair}
          target={reftradingpair}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
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
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`Etherium`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`Bitcoin`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`Tezos`}
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
          show={showopenlongstatus}
          target={refopenlongstatus}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showopenshortstatus}
          target={refopenshortstatus}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showopenlong}
          target={refopenlong}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showbreakout}
          target={refbreakout}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showcloselong}
          target={refcloselong}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showcrossup}
          target={refcrossup}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showopenshort}
          target={refopenshort}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showbreakdown}
          target={refbreakdown}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showcloseshort}
          target={refcloseshort}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
          show={showcrossdown}
          target={refcrossdown}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '215px', maxWidth: '300px' }}>
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`All`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`True`}
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label={`False`}
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
  )
}
