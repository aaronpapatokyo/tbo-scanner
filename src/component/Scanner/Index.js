import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Overlay, Popover, FormCheck, Form, FormControl } from "react-bootstrap";

import { ThemeContext } from "../../context";

import './Scanner.css';

import FilterIcon from '../../assets/icons/Filter.svg';
import Filter from '../../assets/icons/Filter-white.svg';
import LogoClose from '../../assets/icons/Close.svg';
import SeacrhIcon from '../../assets/icons/search.svg';
import Search from '../../assets/icons/search-white.svg';
import vektor from '../../assets/icons/Vector-white.svg';
import VektorBlack from '../../assets/icons/Vector.svg';

export default function Scanner() {
  const ref = useRef(null);

  //Edit Coloumn
  const [showset, setShowSet] = useState(false);
  const refset = useRef(null);

  //High
  const [showhigh, setShowHigh] = useState(false);
  const refhigh = useRef(null);
  const [titlePageHigh, setTitlePageHigh] = useState('Above')
  const handleTitlePageHigh = (event) => {
    setTitlePageHigh(event.target.value)
  }
  const handlingOpenFilterhigh = () => {
    setShowLow(false)
    setShowHigh(!showhigh)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Low
  const [showlow, setShowLow] = useState(false);
  const reflow = useRef(null);
  const [titlePageLow, setTitlePageLow] = useState('Above')
  const handleTitlePageLow = (event) => {
    setTitlePageLow(event.target.value)
  }
  const handlingOpenFilterLow = () => {
    setShowLow(!showlow)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Last
  const [showlast, setShowLast] = useState(false);
  const reflast = useRef(null);
  const [titlePageLast, setTitlePageLast] = useState('Above')
  const handleTitlePageLast = (event) => {
    setTitlePageLast(event.target.value)
  }
  const handlingOpenFilterLast = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(true)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Near
  const [shownear, setShowNear] = useState(false);
  const refnear = useRef(null);
  const [titlePageNear, setTitlePageNear] = useState('Above')
  const handleTitlePageNear = (event) => {
    setTitlePageNear(event.target.value)
  }
  const handlingOpenFilterNear = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(true)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Spread
  const [showspread, setShowSpread] = useState(false);
  const refspread = useRef(null);
  const [titlePageSpread, setTitlePageSpread] = useState('Above')
  const handleTitlePageSpread = (event) => {
    setTitlePageSpread(event.target.value)
  }
  const handlingOpenFilterSpread = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(true)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Spread Category
  const [showspreadcategory, setShowSpreadCategory] = useState(false);
  const refspreadcategory = useRef(null);
  const [titlePageSpreadCategory, setTitlePageSpreadCategory] = useState('Above')
  const handleTitlePageSpreadCategory = (event) => {
    setTitlePageSpreadCategory(event.target.value)
  }
  const handlingOpenFilterSpreadCategory = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(true)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Volume 24h
  const [showvolume, setShowVolume] = useState(false);
  const refvolume = useRef(null);
  const [titlePageVolume, setTitlePageVolume] = useState('Above')
  const handleTitlePageVolume = (event) => {
    setTitlePageVolume(event.target.value)
  }
  const handlingOpenFilterVolume = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(true)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Volume Median
  const [showvolumemedian, setShowVolumeMedian] = useState(false);
  const refvolumemedian = useRef(null);
  const [titlePageVolumeMedian, setTitlePageVolumeMedian] = useState('Above')
  const handleTitlePageVolumeMedian = (event) => {
    setTitlePageVolumeMedian(event.target.value)
  }
  const handlingOpenFilterVolumeMedian = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(true)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //Market Cap 
  const [showmarket, setShowMarket] = useState(false);
  const refmarket = useRef(null);
  const [titlePageMarket, setTitlePageMarket] = useState('Above')
  const handleTitlePageMarket = (event) => {
    setTitlePageMarket(event.target.value)
  }
  const handlingOpenFilterMarket = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(true)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(false)
  }

  //RSI
  const [showrsi, setShowRSI] = useState(false);
  const refrsi = useRef(null);
  const [titlePageRSI, setTitlePageRSI] = useState('Above')
  const handleTitlePageRSI = (event) => {
    setTitlePageRSI(event.target.value)
  }
  const handlingOpenFilterRSI = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(true)
    setShowMFI(false)
    setShowCCI(false)
  }

  //MFI
  const [showmfi, setShowMFI] = useState(false);
  const refmfi = useRef(null);
  const [titlePageMFI, setTitlePageMFI] = useState('Above')
  const handleTitlePageMFI = (event) => {
    setTitlePageMFI(event.target.value)
  }
  const handlingOpenFilterMFI = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(true)
    setShowCCI(false)
  }

  //CCI
  const [showcci, setShowCCI] = useState(false);
  const refcci = useRef(null);
  const [titlePageCCi, setTitlePageCCI] = useState('Above')
  const handleTitlePageCCI = (event) => {
    setTitlePageCCI(event.target.value)
  }
  const handlingOpenFilterCCI = () => {
    setShowLow(false)
    setShowHigh(false)
    setShowLast(false)
    setShowNear(false)
    setShowSpread(false)
    setShowSpreadCategory(false)
    setShowVolume(false)
    setShowVolumeMedian(false)
    setShowMarket(false)
    setShowRSI(false)
    setShowMFI(false)
    setShowCCI(true)
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
              <Link to="/DefaultMode">
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
                  <div>
                    HIGH
                  </div>
                  <div ref={refhigh} onClick={handlingOpenFilterhigh}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref}>
                <div className='flexx-th'>
                  <div>
                    LOW
                  </div>
                  <div ref={reflow} onClick={handlingOpenFilterLow}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref}>
                <div className='flexx-th'>
                  <div>
                    LAST
                  </div>
                  <div ref={reflast} onClick={handlingOpenFilterLast}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div>
                    Near 24h Low
                  </div>
                  <div ref={refnear} onClick={handlingOpenFilterNear}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div>
                    Spread (LvH)
                  </div>
                  <div ref={refspread} onClick={handlingOpenFilterSpread}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '170px' }}>
                <div className='flexx-th'>
                  <div>
                    Spread Category
                  </div>
                  <div ref={refspreadcategory} onClick={handlingOpenFilterSpreadCategory}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div>
                    Volume 24h
                  </div>
                  <div ref={refvolume} onClick={handlingOpenFilterVolume}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '170px' }}>
                <div className='flexx-th'>
                  <div>
                    Volume Median
                  </div>
                  <div ref={refvolumemedian} onClick={handlingOpenFilterVolumeMedian} >
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref} style={{ minWidth: '150px' }}>
                <div className='flexx-th'>
                  <div>
                    Market Cap
                  </div>
                  <div ref={refmarket} onClick={handlingOpenFilterMarket}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref}>
                <div className='flexx-th'>
                  <div>
                    RSI
                  </div>
                  <div ref={refrsi} onClick={handlingOpenFilterRSI}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref}>
                <div className='flexx-th'>
                  <div>
                    MFI
                  </div>
                  <div ref={refmfi} onClick={handlingOpenFilterMFI}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
              <th className='pointer' ref={ref}>
                <div className='flexx-th'>
                  <div>
                    CCI
                  </div>
                  <div ref={refcci} onClick={handlingOpenFilterCCI}>
                    <img className='classblock' style={{ display: darkMode && "none" }} src={FilterIcon} alt='' />
                    <img className='classnone' style={{ display: darkMode && "block" }} src={Filter} alt='' />
                  </div>
                </div>
              </th>
            </tr>
            <tr className='table-tr'>
              <td >Binance</td>
              <td >BCH-USD</td>
              <td >64067.30</td>
              <td >52418.70</td>
              <td >$58,243.00</td>
              <td >57602.33</td>
              <td >53583.56</td>
              <td >50671.41</td>
              <td >1245315</td>
              <td >1369847</td>
              <td >1</td>
              <td >60</td>
              <td >100</td>
              <td >100</td>
            </tr>
            <tr className='table-tr'>
              <td >Binance</td>
              <td >BCH-USD</td>
              <td >64067.30</td>
              <td >52418.70</td>
              <td >$58,243.00</td>
              <td >57602.33</td>
              <td >53583.56</td>
              <td >50671.41</td>
              <td >1245315</td>
              <td >1369847</td>
              <td >1</td>
              <td >60</td>
              <td >100</td>
              <td >100</td>
            </tr>
            <tr className='table-tr'>
              <td >Binance</td>
              <td >BCH-USD</td>
              <td >64067.30</td>
              <td >52418.70</td>
              <td >$58,243.00</td>
              <td >57602.33</td>
              <td >53583.56</td>
              <td >50671.41</td>
              <td >1245315</td>
              <td >1369847</td>
              <td >1</td>
              <td >60</td>
              <td >100</td>
              <td >100</td>
            </tr>
            <tr className='table-tr'>
              <td >Binance</td>
              <td >BCH-USD</td>
              <td >64067.30</td>
              <td >52418.70</td>
              <td >$58,243.00</td>
              <td >57602.33</td>
              <td >53583.56</td>
              <td >50671.41</td>
              <td >1245315</td>
              <td >1369847</td>
              <td >1</td>
              <td >60</td>
              <td >100</td>
              <td >100</td>
            </tr>
          </table>
        </div>
        {/* Edit Coloumn */}
        <Overlay
          show={showset}
          target={refset}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained" style={{ width: '250px', maxWidth: '300px' }}>
            <Popover.Body >
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
                          label='HIGH'
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
                          label='LOW'
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
                          label='LAST'
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
                          label='Near 24h Low'
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
                          label='Spread (LvH)'
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
                          label='Spread Category'
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
                          label='Volume 24h'
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
                          label='Volume Median'
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
                          label='Market Cap Rank'
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
                          label='LOW'
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
                          label='MFI'
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
                          label='CCI'
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
          show={showhigh}
          target={refhigh}
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
                    <select onChange={handleTitlePageHigh} className='select-option'>
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
                  <div className={titlePageHigh}>
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
          show={showlow}
          target={reflow}
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
                    <select onChange={handleTitlePageLow} className='select-option'>
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
                  <div className={titlePageLow}>
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
          show={shownear}
          target={refnear}
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
                    <select onChange={handleTitlePageNear} className='select-option'>
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
                  <div className={titlePageNear}>
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
          show={showspread}
          target={refspread}
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
                    <select onChange={handleTitlePageSpread} className='select-option'>
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
                  <div className={titlePageSpread}>
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
          show={showspreadcategory}
          target={refspreadcategory}
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
                    <select onChange={handleTitlePageSpreadCategory} className='select-option'>
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
                  <div className={titlePageSpreadCategory}>
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
          show={showvolume}
          target={refvolume}
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
                    <select onChange={handleTitlePageVolume} className='select-option'>
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
                  <div className={titlePageVolume}>
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
          show={showvolumemedian}
          target={refvolumemedian}
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
                    <select onChange={handleTitlePageVolumeMedian} className='select-option'>
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
                  <div className={titlePageVolumeMedian}>
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
          show={showmarket}
          target={refmarket}
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
                    <select onChange={handleTitlePageMarket} className='select-option'>
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
                  <div className={titlePageMarket}>
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
          show={showrsi}
          target={refrsi}
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
                    <select onChange={handleTitlePageRSI} className='select-option'>
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
                  <div className={titlePageRSI}>
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
          show={showmfi}
          target={refmfi}
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
                    <select onChange={handleTitlePageMFI} className='select-option'>
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
                  <div className={titlePageMFI}>
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
          show={showcci}
          target={refcci}
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
                    <select onChange={handleTitlePageCCI} className='select-option'>
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
                  <div className={titlePageCCi}>
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
      </div>
    </div>
  )
}