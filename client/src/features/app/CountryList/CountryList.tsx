import { Message } from '@/components/Message/Message.tsx';
import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { useCities } from '@/contexts/cities/CitiesContext.ts';
import { CountryType } from '@/types/type.ts';

import { CountryItem } from './CountryItem.tsx';
import styles from './CountryList.module.css';

export function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   } else return arr;
  // }, [] as CountryType[]);

  const seenCountries = new Set<string>();
  const countries: CountryType[] = [];

  for (const city of cities) {
    if (!seenCountries.has(city.country)) {
      countries.push({ country: city.country, emoji: city.emoji });
      seenCountries.add(city.country);
    }
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
