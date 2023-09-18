import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { BackButton } from '@/components/BackButton/BackButton.tsx';
import { Button } from '@/components/Button/Button.tsx';
import { Error } from '@/components/Error/Error.tsx';
import { Message } from '@/components/Message/Message.tsx';
import { Spinner } from '@/components/Spinner/Spinner.tsx';
import { useCities } from '@/contexts/cities/CitiesContext.ts';
import { useURLPosition } from '@/hooks/useURLPosition.ts';
import { reversedGeoSchema } from '@/types/schema.ts';
import { CityWithoutId, ReversedGeoType } from '@/types/type.ts';

import styles from './Form.module.css';

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatCountryName(countryName: string): string {
  return countryName.replace(/\s+\(the\)$/, '').trim();
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const formSchema = z.object({
  cityName: z.string().nonempty(),
  date: z.date({
    required_error: 'Please select a date',
  }),
  notes: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

const positionSchema = z.object({
  lat: z.coerce
    .number()
    .max(90, { message: 'Latitude must be less than or equal to 90' })
    .min(0, { message: 'Latitude must be greater than or equal to 0' }),
  lng: z.coerce
    .number()
    .max(180, { message: 'Longitude must be less than or equal to 180' })
    .min(-180, { message: 'Longitude must be greater than or equal to -180' }),
});

export function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>(
    {},
  );

  const navigate = useNavigate();
  const [lat, lng] = useURLPosition();
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    // if (lat === null || lng === null) return;
    async function fetchCityData() {
      try {
        if (!lat || !lng) return;

        const result = positionSchema.safeParse({ lat, lng });

        if (!result.success) {
          setGeocodingError(result.error.issues[0].message);
          return;
        }

        setIsLoadingGeocoding(true);
        setGeocodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = (await res.json()) as ReversedGeoType;

        reversedGeoSchema.parse(data);

        if (!data.countryCode) {
          setGeocodingError(
            "That doesn't seem to be a city. Click somewhere else 😉",
          );
        }

        setCityName(data.city || data.locality || '');
        setCountry(formatCountryName(data.countryName));
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    void fetchCityData();
  }, [lat, lng]);

  function handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = formSchema.safeParse({ cityName, date, notes, lat, lng });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setFormErrors(newErrors);
      return;
    }

    const validatedData = result.data;

    const newCity: CityWithoutId = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: validatedData.lat, lng: validatedData.lng },
    };

    createCity(newCity)
      .then(() => {
        navigate('/app/cities');
      })
      .catch((error) => console.error(error));
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (lat === null || lng === null)
    return <Message message={'Start by clicking somewhere on the map'} />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
        {formErrors.cityName && <Error message={formErrors.cityName} />}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          onChange={(date) => setDate(date ?? new Date())}
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="date"
          popperModifiers={[
            {
              name: 'arrow',
              options: {
                padding: ({ popper }: { popper: { width: number } }) => ({
                  right: popper.width - 32,
                }),
              },
            },
          ]}
        />
        {formErrors.date && <Error message={formErrors.date} />}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button variant="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
