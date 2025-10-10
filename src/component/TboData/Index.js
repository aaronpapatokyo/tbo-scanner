import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Overlay, Form, FormCheck, Popover, FormControl } from "react-bootstrap";

import { ThemeContext } from "../../context";

import './TboData.css';

import FilterIcon from '../../assets/icons/Filter.svg';
import Filter from '../../assets/icons/Filter-white.svg';
import LogoClose from '../../assets/icons/Close.svg';
import SeacrhIcon from '../../assets/icons/search.svg';
import Search from '../../assets/icons/search-white.svg';
import vektor from '../../assets/icons/Vector-white.svg';
import VektorBlack from '../../assets/icons/Vector.svg';

export default function TboData() {
  const ref = useRef(null);

  //Edit Coloumn
  const [showset, setShowSet] = useState(false);
  const refset = useRef(null);

  //Last
  const [showlast, setShowLast] = useState(false);
  const reflast = useRef(null);
  const [titlePageLast, setTitlePageLast] = useState('Above')
  const handleTitlePageLast = (event) => {
    setTitlePageLast(event.target.value)
  }
  const handlingOpenFilterLast = () => {
    setShowLast(!showlast)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Fast
  const [showfast, setShowFast] = useState(false);
  const reffast = useRef(null);
  const [titlePageFast, setTitlePageFast] = useState('Above')
  const handleTitlePageFast = (event) => {
    setTitlePageFast(event.target.value)
  }
  const handlingOpenFilterFast = () => {
    setShowLast(false)
    setShowFast(!showfast)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //MidFast
  const [showmidfast, setShowMidFast] = useState(false);
  const refmidfast = useRef(null);
  const [titlePageMidFast, setTitlePageMidFast] = useState('Above')
  const handleTitlePageMidFast = (event) => {
    setTitlePageMidFast(event.target.value)
  }
  const handlingOpenFilterMidFast = () => {
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(!showmidfast)
    setShowMidSlow(false)
    setShowSlow(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //MidSlow
  const [showmidslow, setShowMidSlow] = useState(false);
  const refmidslow = useRef(null);
  const [titlePageMidSlow, setTitlePageMidSlow] = useState('Above')
  const handleTitlePageMidSlow = (event) => {
    setTitlePageMidSlow(event.target.value)
  }
  const handlingOpenFilterMidSlow = () => {
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(!showmidslow)
    setShowSlow(false)
    setShowOpenLong(false)
    setShowBreakout(false)
    setShowCloseLong(false)
    setShowCrossUp(false)
    setShowOpenShort(false)
    setShowBreakdown(false)
    setShowCloseShort(false)
    setShowCrossDown(false)
  }

  //Slow
  const [showslow, setShowSlow] = useState(false);
  const refslow = useRef(null);
  const [titlePageSlow, setTitlePageSlow] = useState('Above')
  const handleTitlePageSlow = (event) => {
    setTitlePageSlow(event.target.value)
  }
  const handlingOpenFilterSlow = () => {
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(!showslow)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
    setShowLast(false)
    setShowFast(false)
    setShowMidFast(false)
    setShowMidSlow(false)
    setShowSlow(false)
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
          <div className='col-5'>
            <FormGroup className="form-space" controlId="exampleForm.ControlTextarea1">
              <FormGroup className="Search-icon" controlId="formBasicEmail">
                <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='search' />
                <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='search' />
                <input type="input" placeholder="Search filter" className='input-search' />
              </FormGroup>
              <div className='select-btnn select-icon'>
                <select className='select-option' style={{ width: ' 80px' }}>
                  <option>5m</option>
                  <option value="1">15m</option>
                  <option value="2">30m</option>
                  <option value="3">1h</option>
                  <option value="3">4h</option>
                  <option value="3">6h</option>
                  <option value="3">12h</option>
                  <option value="3">1d</option>
                  <option value="3">1w</option>
                </select>
                <div style={{ marginLeft: '85%' }}>
                  <div className='classblock' style={{ display: darkMode && "none" }}>
                    <img src={VektorBlack} alt='' />
                  </div>
                  <div className='classnone' style={{ display: darkMode && "block" }}>
                    <img src={vektor} alt='' />
                  </div>
                </div>
              </div>
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
              <button type='button' ref={refset} onClick={() => setShowSet(!showset)} className='button-border1'>Edit Column</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <tr className='header-table'>
              <th>
                Exchange
              </th>
              <th>Trading Pair</th>
              <th className='pointer' ref={ref}>
                <div className='flexx-th'>
                  <div >
                    Last
                  </div>
                  <div ref={reflast} onClick={handlingOpenFilterLast}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    TBO Fast
                  </div>
                  <div ref={reffast} onClick={handlingOpenFilterFast}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>

              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div >
                    TBO Mid Fast
                  </div>
                  <div ref={refmidfast} onClick={handlingOpenFilterMidFast}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div >
                    TBO Mid Slow
                  </div>
                  <div ref={refmidslow} onClick={handlingOpenFilterMidSlow}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    TBO Slow
                  </div>
                  <div ref={refslow} onClick={handlingOpenFilterSlow}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th>
                Support
              </th>
              <th>
                Resistance
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Open Long
                  </div>
                  <div ref={refopenlong} onClick={handlingOpenFilterOpenLong} >
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
                  <div ref={refbreakout} onClick={handlingOpenFilterBreakout} >
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
                  <div ref={refcloselong} onClick={handlingOpenFilterCloseLong} >
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
                  <div ref={refcrossup} onClick={handlingOpenFilterCrossUp}  >
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
              <th className='pointer' ref={ref} style={{ minWidth: '130px' }}>
                <div className='flexx-th'>
                  <div >
                    Breakdown
                  </div>
                  <div ref={refbreakdown} onClick={handlingOpenFilterBreakdown} >
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
                  <div ref={refcrossdown} onClick={handlingOpenFilterCrossDown}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
            </tr>
            <tr className='table-tr'>
              <td>Binance</td>
              <td>BTC-USD</td>
              <td>$58,243.00</td>
              <td>58126.51</td>
              <td>57602.33</td>
              <td>53583.56</td>
              <td>50671.41</td>
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
            </tr>
            <tr className='table-tr'>
              <td>Binance</td>
              <td>BTC-USD</td>
              <td>$58,243.00</td>
              <td>58126.51</td>
              <td>57602.33</td>
              <td>53583.56</td>
              <td>50671.41</td>
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
                          label='Exchange'
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
                          label='Last'
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
                          label='Support Resistance'
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
                <div className='form-selected1 mt-3'>
                  <Form>
                    {['checkbox'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <FormCheck
                          type={type}
                          id={`default-${type}`}
                          label='Close Short'
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
                          label='Cross Down'
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
          show={showlast}
          target={reflast}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <div className='select-icon'>
                    <select onChange={handleTitlePageLast} className='select-option'>
                      <option value="Above">Above</option>
                      <option value="Below">Bellow</option>
                      <option value="Between">Between</option>
                    </select>
                    <div style={{ marginLeft: '90%' }}>
                      <div className='classblock' style={{ display: darkMode && "none" }}>
                        <img src={VektorBlack} alt='' />
                      </div>
                      <div className='classnone' style={{ display: darkMode && "block" }}>
                        <img src={vektor} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className={titlePageLast}>
                    <div className='item1 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item2 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item3 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Lowest Halue" className="select" />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <hr style={{ width: '40%' }} />
                          <div className='mt-2' style={{ padding: '0px 10px' }}>
                            And
                          </div>
                          <hr style={{ width: '40%' }} />
                        </div>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Highest Value" className="select" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mb-2'>
                  <button className='btn-hijauu'>Apply Filter</button>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        </Overlay>
        <Overlay
          show={showfast}
          target={reffast}
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
                  <div className='select-icon'>
                    <select onChange={handleTitlePageFast} className='select-option'>
                      <option value="Above">Above</option>
                      <option value="Below">Bellow</option>
                      <option value="Between">Between</option>
                    </select>
                    <div style={{ marginLeft: '90%' }}>
                      <div className='classblock' style={{ display: darkMode && "none" }}>
                        <img src={VektorBlack} alt='' />
                      </div>
                      <div className='classnone' style={{ display: darkMode && "block" }}>
                        <img src={vektor} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className={titlePageFast}>
                    <div className='item1 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <div className='persen'>
                            <input type="number" placeholder="Enter Value" className='input-persen' />
                            <div className='body-persen'>
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='item2 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <div className='persen'>
                            <input type="number" placeholder="Enter Value" className='input-persen' />
                            <div className='body-persen'>
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='item3 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <div className='form-selected1 mt-1 mb-2'>
                            <div className='persen'>
                              <input type="number" placeholder="Lowest Value" className='input-persen' />
                              <div className='body-persen'>
                                %
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <hr style={{ width: '40%' }} />
                          <div className='mt-2' style={{ padding: '0px 10px' }}>
                            And
                          </div>
                          <hr style={{ width: '40%' }} />
                        </div>
                        <div className='form-selected1 mt-1 mb-2'>
                          <div className='persen'>
                            <input type="number" placeholder="Highest Value" className='input-persen' />
                            <div className='body-persen'>
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mb-2'>
                  <button className='btn-hijauu'>Apply Filter</button>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        </Overlay>
        <Overlay
          show={showmidfast}
          target={refmidfast}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <div className='select-icon'>
                    <select onChange={handleTitlePageMidFast} className='select-option'>
                      <option value="Above">Above</option>
                      <option value="Below">Bellow</option>
                      <option value="Between">Between</option>
                    </select>
                    <div style={{ marginLeft: '90%' }}>
                      <div className='classblock' style={{ display: darkMode && "none" }}>
                        <img src={VektorBlack} alt='' />
                      </div>
                      <div className='classnone' style={{ display: darkMode && "block" }}>
                        <img src={vektor} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className={titlePageMidFast}>
                    <div className='item1 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item2 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item3 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Lowest Halue" className="select" />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <hr style={{ width: '40%' }} />
                          <div className='mt-2' style={{ padding: '0px 10px' }}>
                            And
                          </div>
                          <hr style={{ width: '40%' }} />
                        </div>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Highest Value" className="select" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mb-2'>
                  <button className='btn-hijauu'>Apply Filter</button>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        </Overlay>
        <Overlay
          show={showmidslow}
          target={refmidslow}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <div className='select-icon'>
                    <select onChange={handleTitlePageMidSlow} className='select-option'>
                      <option value="Above">Above</option>
                      <option value="Below">Bellow</option>
                      <option value="Between">Between</option>
                    </select>
                    <div style={{ marginLeft: '90%' }}>
                      <div className='classblock' style={{ display: darkMode && "none" }}>
                        <img src={VektorBlack} alt='' />
                      </div>
                      <div className='classnone' style={{ display: darkMode && "block" }}>
                        <img src={vektor} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className={titlePageMidSlow}>
                    <div className='item1 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item2 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item3 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Lowest Halue" className="select" />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <hr style={{ width: '40%' }} />
                          <div className='mt-2' style={{ padding: '0px 10px' }}>
                            And
                          </div>
                          <hr style={{ width: '40%' }} />
                        </div>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Highest Value" className="select" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mb-2'>
                  <button className='btn-hijauu'>Apply Filter</button>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        </Overlay>
        <Overlay
          show={showslow}
          target={refslow}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Body>
              <div>
                <div className=' mt-2 title-tooltipp'>
                  Filter
                </div>
                <div className='form-selected1 mt-1'>
                  <div className='select-icon'>
                    <select onChange={handleTitlePageSlow} className='select-option'>
                      <option value="Above">Above</option>
                      <option value="Below">Bellow</option>
                      <option value="Between">Between</option>
                    </select>
                    <div style={{ marginLeft: '90%' }}>
                      <div className='classblock' style={{ display: darkMode && "none" }}>
                        <img src={VektorBlack} alt='' />
                      </div>
                      <div className='classnone' style={{ display: darkMode && "block" }}>
                        <img src={vektor} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className={titlePageSlow}>
                    <div className='item1 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item2 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Value" className="select" />
                        </div>
                      </div>
                    </div>
                    <div className='item3 None'>
                      <div className='form-selected1 mt-3 mb-3'>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Lowest Halue" className="select" />
                        </div>
                        <div style={{ display: 'flex' }}>
                          <hr style={{ width: '40%' }} />
                          <div className='mt-2' style={{ padding: '0px 10px' }}>
                            And
                          </div>
                          <hr style={{ width: '40%' }} />
                        </div>
                        <div className='form-selected1 mt-1 mb-2'>
                          <FormControl type="number" placeholder="Highest Value" className="select" />
                        </div>
                      </div>
                    </div>
                  </div>
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