import { z } from 'zod';

import { citySchema, reversedGeoSchema } from './schema.ts';

export type CityType = z.infer<typeof citySchema>;

export type CountryType = {
  country: string;
  emoji: string;
};

export type ReversedGeoType = z.infer<typeof reversedGeoSchema>;

export type CityWithoutId = Omit<CityType, 'id'>;

export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
