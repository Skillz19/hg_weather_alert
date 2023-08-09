import React from 'react';
import styles from '../assets/css/WeatherDetails.module.css'
import { ReactComponent as CompassIcon } from '../assets/icons/compass.svg'
import CurrentWindCondition from '../interfaces/CurrentWindCondition';

const WindDetails: React.FC<CurrentWindCondition> = ({ speed, deg, gust }) => {
    //console.log('Speed ',speed,' deg ',deg,' gust ',gust);
    return (
        <div className={styles.detailsContainer}>
            <div className={styles.detailItem}>
                {speed && <h2>{speed} m/s</h2>}
                {!speed && <h2>N/A</h2>}
                <p>Wind Speed</p>
            </div>
            <div className={styles.detailItem}>
                {deg && <CompassIcon
                    width="50px"
                    height="50px"
                    style={{ transform: `rotate(${-47+deg}deg)`, marginLeft: '1.5rem' }}
                />}
                {!deg && <h2>N/A</h2>}
                <p>Wind Direction</p>
            </div>
            <div className={styles.detailItem} style={{ borderRight: 'none' }}>
                {gust && <h2>{gust} m/s</h2>}
                {!gust && <h2>N/A</h2>}
                <p>Wind Gust</p>
            </div>
        </div>
    );
};

export default WindDetails;