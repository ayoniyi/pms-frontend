import React from 'react'
import { Link } from 'react-router-dom'

//style
import style from './Menu.module.css'

//assets
import Logo from '../Assets/images/logo1.svg'
import Dot from '../Assets/images/dashboard/dot.svg'
// import OverLight from '../Assets/images/dashboard/over.svg'
// import OverDrk from '../Assets/images/dashboard/over-dr.svg'
import AddDrk from '../Assets/images/dashboard/add-dr.svg'
import Add from '../Assets/images/dashboard/add.svg'
import MngDrk from '../Assets/images/dashboard/manage-dr.svg'
import Mng from '../Assets/images/dashboard/manage.svg'
import Log from '../Assets/images/dashboard/log.svg'

const Menu = ({ currentPage }) => {
  return (
    <div className={style.menuContainer}>
      <div className={style.menuContent}>
        <Link to="/">
          <div className={style.menuTop}>
            <img src={Logo} alt="logo" />
          </div>
        </Link>
        <div className={style.menuList}>
          {/* <Link to="/dashboard/overview">
            <div className={style.menuItem}>
              <div className={style.menuLeft}>
                <div
                  className={`${style.iconBox} ${
                    currentPage === 'Overview' ? style.greenBack : ''
                  }`}
                >
                  <img
                    src={currentPage === 'Overview' ? OverLight : OverDrk}
                    alt="icon"
                  />
                </div>
                <div className={style.textBox}>
                  <p>Overview</p>
                </div>
              </div>
              <div className={style.menuRight}>
                {currentPage === 'Overview' && <img src={Dot} alt="point" />}
              </div>
            </div>
          </Link> */}
          <Link to="/dashboard/manage">
            <div className={style.menuItem}>
              <div className={style.menuLeft}>
                <div
                  className={`${style.iconBox} ${
                    currentPage === 'Manage' ? style.greenBack : ''
                  }`}
                >
                  <img
                    src={currentPage === 'Manage' ? Mng : MngDrk}
                    alt="icon"
                  />
                </div>
                <div className={style.textBox}>
                  <p>Manage Patients</p>
                </div>
              </div>
              <div className={style.menuRight}>
                {currentPage === 'Manage' && <img src={Dot} alt="point" />}
              </div>
            </div>
          </Link>
          <Link to="/dashboard/addpatient">
            <div className={style.menuItem}>
              <div className={style.menuLeft}>
                <div
                  className={`${style.iconBox} ${
                    currentPage === 'AddPatient' ? style.greenBack : ''
                  }`}
                >
                  <img
                    src={currentPage === 'AddPatient' ? Add : AddDrk}
                    alt="icon"
                  />
                </div>
                <div className={style.textBox}>
                  <p>Add Patient</p>
                </div>
              </div>
              <div className={style.menuRight}>
                {currentPage === 'AddPatient' && <img src={Dot} alt="point" />}
              </div>
            </div>
          </Link>
          <Link to="/">
            <div className={style.menuItem}>
              <div className={style.menuLeft}>
                <div className={`${style.iconBox}`}>
                  <img src={Log} alt="icon" />
                </div>
                <div className={style.textBox}>
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
