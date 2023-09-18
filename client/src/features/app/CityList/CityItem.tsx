import { Link } from 'react-router-dom';

import { useCities } from '@/contexts/cities/CitiesContext.ts';
import { CityType } from '@/types/type.ts';
import { formatDate } from '@/utils/formatDate.ts';

import styles from './CityItem.module.css';

type CityItemType = {
  city: CityType;
};

export function CityItem({ city }: CityItemType) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  function handleDeleteCity(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    void deleteCity(id!);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
