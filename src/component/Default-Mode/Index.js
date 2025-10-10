import React, { useContext, useState } from 'react';
import { FormGroup, FormControl, Accordion, FormCheck, Form, ButtonGroup } from "react-bootstrap";
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { ThemeContext } from "../../context";

import './Default-model.css';

import SeacrhIcon from '../../assets/icons/search.svg';
import Search from '../../assets/icons/search-white.svg';
import vektor from '../../assets/icons/Vector-white.svg';
import VektorBlack from '../../assets/icons/Vector.svg';

const Button = styled.button``;
const ButtonToggle = styled(Button)`${({ active }) => active && `background-color: #1970B2; color: #fff;`}`;
const types = ['Top 10', 'Top 20', 'Top 100'];

export default function Defaultmode() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [active, setActive] = useState(types[0]);

  return (
    <div className='content-padding'>
      <div className='Content-space p-1'>
        <div className='col-6'>
          <FormGroup className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <FormGroup className="Search-icon" controlId="formBasicEmail" >
              <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='search' />
              <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='search' />
              <input type="input" placeholder="Search filter" className='input-search' />
            </FormGroup>
          </FormGroup>
        </div>
        <div className='Content-space'>
          <Link style={{ textDecoration: 'none' }}>
            <div >
              <button className='button-link'>Reset Filter</button>
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div>
              <button className='btn-hijau'>Apply Filter</button>
            </div>
          </Link>
        </div>
      </div>
      <div className='row mb-5 p-1'>
        <div className='col-8'>
          <div className='mb-4'>
            <Accordion defaultActiveKey="0" >
              <AccordionItem eventKey="0" >
                <AccordionHeader >
                  <div className='Judul-Accordion' >
                    Market Data
                  </div>
                  <div className='classblock' style={{ display: darkMode && "none" }}>
                    <img src={VektorBlack} alt='' />
                  </div>
                  <div className='classnone' style={{ display: darkMode && "block" }}>
                    <img src={vektor} alt='' />
                  </div>
                </AccordionHeader>
                <AccordionBody className='p-0'>
                  <div className=''>
                    <div className='Content-space paddingg bottom-border mt-3'>
                      <div className='title-Acordionn'>Exchange</div>
                      <div className='form-selected'>
                        <div className='select-icon'>
                          <select className='select-option'>
                            <option>All Exchanges</option>
                            <option value="1">Binance</option>
                            <option value="2">Binance US</option>
                            <option value="3">Coinbase Pro</option>
                            <option value="4">FTX</option>
                            <option value="5">FTX US</option>
                            <option value="6">KuCoin</option>
                            <option value="7">KuCoin Futures</option>
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
                      </div>
                    </div>
                    <div className='Content-space paddingg bottom-border mt-3'>
                      <div className='title-Acordionn'>Market/Quote Coin</div>
                      <div className='form-selected'>
                        <div className='select-icon'>
                          <select className='select-option'>
                            <option>All Markets</option>
                            <option value="1">AUD</option>
                            <option value="2">BIDR</option>
                            <option value="3">BNB</option>
                            <option value="4">BRL</option>
                            <option value="5">BRZ</option>
                            <option value="6">BTC</option>
                            <option value="7">BUSD</option>
                            <option value="8">Binance-LVT</option>
                            <option value="9">DAI</option>
                            <option value="10">DOGE</option>
                            <option value="11">ETH</option>
                            <option value="12">EUR</option>
                            <option value="13">FTX-LVT</option>
                            <option value="14">GBP</option>
                            <option value="15">IDRT</option>
                            <option value="16">KCS</option>
                            <option value="17">NGN</option>
                            <option value="18">PAX</option>
                            <option value="19">Perpetual</option>
                            <option value="20">RUB</option>
                            <option value="21">TRX</option>
                            <option value="22">TRY</option>
                            <option value="23">TRYB</option>
                            <option value="24">TUSD</option>
                            <option value="25">UAH</option>
                            <option value="26">USD</option>
                            <option value="27">USD:USD</option>
                            <option value="28">USD:USD-220113</option>
                            <option value="29">USD:USD-220114</option>
                            <option value="30">USD:USD-220115</option>
                            <option value="31">USD:USD-220116</option>
                            <option value="32">USD:USD-220122</option>
                            <option value="33">USD:USD-220129</option>
                            <option value="34">USD:USD-220205</option>
                            <option value="35">USD:USD-220325</option>
                            <option value="36">USD:USD-220624</option>
                            <option value="37">USD:USD-220930</option>
                            <option value="38">USD:USD-221005</option>
                            <option value="39">USD:USD-241115</option>
                            <option value="40">USDC</option>
                            <option value="41">USDP</option>
                            <option value="42">USDT</option>
                            <option value="43">UST</option>
                            <option value="44">VAI</option>
                            <option value="45">XRP</option>
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
                      </div>
                    </div>
                    <div className='Content-space paddingg bottom-border mt-3 mb-3'>
                      <div className='title-Acordionn'>Market Cap</div>
                      <div className='form-selected-two' style={{ margin: '0px 5px' }}>
                        <div>
                          <ButtonGroup >
                            {types.map(type => (
                              <ButtonToggle className='active-blue'
                                key={type}
                                active={active === type}
                                onClick={() => setActive(type)}
                              >
                                {type}
                              </ButtonToggle>
                            ))}
                          </ButtonGroup>
                        </div>
                      </div>
                      <div className='form-selected-three'>
                        <FormControl type="number" placeholder="Min" className="select" />
                        <div className='title-center'>
                          To
                        </div>
                        <FormControl type="number" placeholder="Max" className="select" />
                      </div>
                    </div>
                    <div className='Content-space paddingg pb-4'>
                      <div className='title-Acordionn'>
                        Median of X Days 24hr Spread
                      </div>
                      <div className='form-selected'>
                        <FormControl type="number" placeholder="Numeric values only" className="select" />
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion defaultActiveKey="0">
              <AccordionItem eventKey="0" >
                <AccordionHeader >
                  <div className='Judul-Accordion'>
                    Indicator Data
                  </div>
                  <div className='classblock' style={{ display: darkMode && "none" }}>
                    <img src={VektorBlack} alt='' />
                  </div>
                  <div className='classnone' style={{ display: darkMode && "block" }}>
                    <img src={vektor} alt='' />
                  </div>
                </AccordionHeader>
                <AccordionBody className='p-0'>
                  <div className='Content-space paddinggg bottom-border mt-3'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mt-1 mb-3">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='RSI'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected'>
                      <div className='select-icon'>
                        <select className='select-option'>
                          <option>Below</option>
                          <option value="1">Above</option>
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
                    </div>
                    <div className='form-selected'>
                      <FormControl type="number" placeholder="0.0" step="0.1" min="0" max="100" className="select" />
                    </div>
                  </div>
                  <div className='Content-space paddinggg bottom-border mt-3'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mt-1 mb-3">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='MFI'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected'>
                      <div className='select-icon'>
                        <select className='select-option'>
                          <option>Below</option>
                          <option value="1">Above</option>
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
                    </div>
                    <div className='form-selected'>
                      <FormControl type="number" placeholder="0.0" step="0.1" min="0" max="100" className="select" />
                    </div>
                  </div>
                  <div className='Content-space paddinggg bottom-border mt-3'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mt-1 mb-3">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='CCI'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected'>
                      <div className='select-icon'>
                        <select className='select-option'>
                          <option>Below</option>
                          <option value="1">Above</option>
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
                    </div>
                    <div className='form-selected'>
                      <FormControl type="number" placeholder="0.0" min="-400" max="800" className="select" />
                    </div>
                  </div>
                  <div className='Content-space paddinggg pb-3 mt-3'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mt-1 mb-3">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Median of X Days Volume'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected'>
                      <FormControl type="number" placeholder="Numeric values only" className="select" />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className='col-4'>
          <div className='mb-4'>
            <Accordion defaultActiveKey="0">
              <AccordionItem eventKey="0">
                <AccordionHeader >
                  <div className='Judul-Accordion'>
                    TBO Data
                  </div>
                  <div className='classblock' style={{ display: darkMode && "none" }}>
                    <img src={VektorBlack} alt='' />
                  </div>
                  <div className='classnone' style={{ display: darkMode && "block" }}>
                    <img src={vektor} alt='' />
                  </div>
                </AccordionHeader>
                <AccordionBody className='p-0'>
                  <div className='Content-space paddingg mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Tbo Fast'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Tbo Mid Fast'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className='Content-space paddingg bottomm-border mt-1'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Tbo Mid Slow'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Tbo Slow'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className='Content-space paddingg bottomm-border mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Support'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Resistance'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className='Content-space paddingg mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Open Long'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Breakout'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className='Content-space paddingg bottomm-border mt-1'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Close Long'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Cross Up'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className='Content-space paddingg mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Open Short'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
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
                  <div className='Content-space paddingg mt-1 '>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='Close Short'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="">
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
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion defaultActiveKey="0">
              <AccordionItem eventKey="0">
                <AccordionHeader >
                  <div className='Judul-Accordion'>
                    Time Frame
                  </div>
                  <div className='classblock' style={{ display: darkMode && "none" }}>
                    <img src={VektorBlack} alt='' />
                  </div>
                  <div className='classnone' style={{ display: darkMode && "block" }}>
                    <img src={vektor} alt='' />
                  </div>
                </AccordionHeader>
                <AccordionBody className='p-0 Content-space'>
                  <div className=' paddingg mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='5m'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space-two'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='1h'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space-three'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='12h'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className=' paddingg mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='15m'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space-two'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='4h'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space-three'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='1d'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                  <div className=' paddingg mt-2'>
                    <div className='title-Acordion'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='30m'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space-two'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='6h'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                    <div className='form-selected-space-three'>
                      <Form>
                        {['checkbox'].map((type) => (
                          <div key={`default-${type}`} className="mb-4">
                            <FormCheck
                              type={type}
                              id={`default-${type}`}
                              label='1w'
                            />
                          </div>
                        ))}
                      </Form>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
