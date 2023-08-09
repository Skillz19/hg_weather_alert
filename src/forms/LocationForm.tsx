import React, { useState, useEffect } from 'react';
import styles from '../assets/css/LocationForm.module.css'
import AutocompleteInput from '../components/AutoCompleteInput';
import Location from '../interfaces/Location';

interface LocationFormProps {
  onSubmit: (location: Location) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [submitValue, setSubmitValue] = useState<Location | undefined>(undefined);
  const [showError,setShowError] = useState<boolean>(false);
  const submitDisable = (submitValue) ? false : true;

  useEffect(() => {
    // Fetch valid locations based on inputValue using the API
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
        );
        const data = await response.json();
        const validLocations: Location[] = data.map((item: any) => {
          return {
            name: item.display_name,
            lat: item.lat,
            lon: item.lon
          }
        });
        setSuggestions(validLocations);
        //---
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    //--- only show suggestions when the user enters more than 2 characters
    if (inputValue && inputValue.trim().length > 2) {
      fetchLocations();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (submitValue && submitValue.name.trim() !== value.trim())
      setSubmitValue(undefined);
    setShowError(false);
  };
  const handleSuggestionSelected = (value: Location) => {
    //--- only allow form submission if user selects an item from the suggestion list
    setSubmitValue(value);
    setShowError(false);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(submitDisable){
      setShowError(true);
      return;
    }
    if (submitValue)
      onSubmit(submitValue);
    setInputValue('');
    setSubmitValue(undefined);
  };

  //const inputGroupClasses = `${styles['input-group']} ${invalidInput ? styles['invalid'] : ''}`;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate autoComplete="off">
      <AutocompleteInput suggestions={suggestions} inputValue={inputValue} onInputChange={handleInputChange}
        onSuggestionSelected={handleSuggestionSelected} />

      {showError && <p className={styles.errorMessage}>Select an item from the dropdown list</p>}
      <p className={styles.actions}>
        <button type='submit' className={styles.button} >Add To Favourites</button>
      </p>
      <p className={styles.label}>e.g. Newcastle upon Tyne, UK</p>
    </form>
  );
};

export default LocationForm;
