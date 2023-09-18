import { createContext, useContext } from 'react';

import { CityType, CityWithoutId } from '@/types/type.ts';

export type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
  // setCurrentCity: React.Dispatch<React.SetStateAction<CityType | null>>;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: CityWithoutId) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

export const CitiesContext = createContext<CitiesContextType | null>(null);

export function useCities() {
  const citiesContext = useContext(CitiesContext);

  if (!citiesContext) {
    throw new Error(
      'citiesContext has to be used within <CitiesContext.Provider>',
    );
  }

  return citiesContext;
}
