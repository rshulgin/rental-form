import React, { useState } from 'react';
import { TextField } from '@mui/material';

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export function AddressField({ value, setValue }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchAddresses = async (searchTerm: string) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    searchAddresses(event.target.value);
  };

  const handleAddressClick = (address: string) => {
    setValue(address);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div>
      <TextField
        label="Адрес и город"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        margin="normal"
      />
      {searchTerm && searchResults.length > 0 && (
        <ul>
          {searchResults.map((result: any) => (
            <li
              key={result.place_id}
              onClick={() => handleAddressClick(result.display_name)}
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
      {searchTerm && searchResults.length === 0 && <p>Адрес не найден</p>}
      <TextField
        label="Поиск адреса"
        name="address"
        value={searchTerm}
        onChange={handleSearchTermChange}
        fullWidth
        margin="normal"
      />
    </div>
  );
}
