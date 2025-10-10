import React, { useContext } from 'react';
import { FormGroup } from "react-bootstrap";

import { ThemeContext } from "../../context";

import './NotResult.css';

import SeacrhIcon from '../../assets/icons/search.svg';
import Search from '../../assets/icons/search-white.svg';
import Error from '../../assets/images/Error.svg'

export default function NotResult() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className='content-padding'>
      <div className='Content-space p-1'>
        <div className='col-6'>
          <FormGroup className="mb-3 " controlId="exampleForm.ControlTextarea1">
            <FormGroup className="Search-icon mb-3" controlId="formBasicEmail">
              <img className='classblock' style={{ display: darkMode && "none" }} src={SeacrhIcon} alt='search' />
              <img className='classnone' style={{ display: darkMode && "block" }} src={Search} alt='search' />
              <input type="input" placeholder="Search filter" className='input-search' />
            </FormGroup>
          </FormGroup>
        </div>
        <div className='Content-space'>
          <div >
            <button className='button-link'>Reset Filter</button>
          </div>
          <div>
            <button className='btn-hijau'>Apply Filter</button>
          </div>
        </div>
      </div>
      <div>
        <div className='content-tengah mb-3 mt-3'>
          <div className='Image-error'>
            <img src={Error} alt='' />
          </div>
          <div>
            <div className='Judul-title'>
              No Results
            </div>
            <div className='title'>
              The current filters have no matches for this search. <br></br>
              Try again or click Reset Filter.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}