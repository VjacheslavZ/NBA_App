import React from 'react';
import styles from './footer.css';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config'

const footer = () => (
    <div className={styles.footer}>
        <Link to='/' className={styles.logo}>
            <img src="/images/nba_logo.png" alt="nba logo"/>
        </Link>
        <div className={styles.right}>
            @NBA {CURRENT_YEAR} All rights reserved.
        </div>
    </div>
);

export default footer;