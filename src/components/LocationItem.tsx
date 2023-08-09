import React, { useEffect, useState } from 'react';
import { getCurrentWeatherDetails } from '../actions/locationsActions';
import WindDetails from './WindDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../assets/css/LocationItem.module.css';
import LocationItemProps from '../interfaces/LocationItemProps';
import CurrentWindCondition from '../interfaces/CurrentWindCondition';
import { Link } from 'react-router-dom';

const LocationItem: React.FC<LocationItemProps> = ({ item, index, removeLocation }) => {
  const [windDetails, setWindDetails] = useState<CurrentWindCondition>({ speed: 0, deg: 0, gust: 0 });
  useEffect(() => {
    getCurrentWeatherDetails(item).then((data) => {
      if (data.wind) {
        setWindDetails(data.wind)
      }
    });
  }, [item]);

  const handleClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    //---
    removeLocation(index);
  }
  return (
    <li >
      <Link to={`details/${index}`} className={styles['link']}>
        <div className={styles.locationItem}>
          <button className={styles.removeBtn} onClick={handleClick.bind(null, index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <div className={styles.locationTitle}>
            <h2>{item.name}</h2>
          </div>
          {windDetails && <WindDetails speed={windDetails.speed} deg={windDetails.deg} gust={windDetails.gust} />}
        </div>
      </Link>
    </li >
  );
};

export default LocationItem;
