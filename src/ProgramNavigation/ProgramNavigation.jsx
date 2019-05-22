import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProgramNavigation.css';

class ProgramNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    console.log(pathname);
    return (
      <nav className={`${styles['program-navigation']}`}>
        <ul className='valign-wrapper'>
          <li className={pathname.includes('/tanach-study') ? styles['nav-list-item-selected'] : styles['nav-list-item']}>
            <Link to='/tanach-study' className={styles['nav-link']}>
              <img src='https://cdn.tanachstudy.com/assets/images/logo.png' alt='Tanach Study Logo' />
            </Link>
          </li>
          <li className={pathname.includes('/mishna-study') ? styles['nav-list-item-selected'] : styles['nav-list-item']}>
            <Link to='/mishna-study' className={styles['nav-link']}>
              <img src='https://cdn.tanachstudy.com/assets/images/mishna-study-logo.png' alt='Mishna Study Logo' />
            </Link>
          </li>
          <li className={pathname.includes('/haftara-study') ? styles['nav-list-item-selected'] : styles['nav-list-item']}>
            <Link to='/haftara-study' className={styles['nav-link']}>
              <img src='https://cdn.tanachstudy.com/assets/images/haftara-study-logo.png' alt='Haftara Study Logo' />
            </Link>
          </li>
          <li className={pathname.includes('/parasha-study') ? styles['nav-list-item-selected'] : styles['nav-list-item']}>
            <Link to='/parasha-study' className={styles['nav-link']}>
              <img src='https://cdn.tanachstudy.com/assets/images/parasha-study-logo.png' alt='Parasha Study Logo' />
            </Link>
          </li>
          <li className={pathname.includes('/moadim-study') ? styles['nav-list-item-selected'] : styles['nav-list-item']}>
            <Link to='/moadim-study' className={styles['nav-link']}>
              <img src='https://cdn.tanachstudy.com/assets/images/moadim-study-logo.png' alt='Moadim Study Logo' />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default ProgramNavigation;
