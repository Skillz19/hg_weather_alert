import React, { FormEvent } from 'react';
import Autosuggest, { ChangeEvent as AutoSuggestOnChange } from 'react-autosuggest';
import styles from '../assets/css/AutoCompleteInput.module.css';
import Location from '../interfaces/Location';

interface AutocompleteInputProps {
  suggestions: Location[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSuggestionSelected: (value: Location) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ suggestions, inputValue, onInputChange, onSuggestionSelected }) => {

  const handleChange = (event: FormEvent<HTMLElement>, { newValue }: AutoSuggestOnChange) => {
    onInputChange(newValue);
  };

  const handleSuggestionSelected = (event: React.FormEvent, data: { suggestion: string }) => {
    const selected_location: Location | undefined = suggestions.find((item) => item.name === data.suggestion)
    if (selected_location) 
      onSuggestionSelected(selected_location);
    //console.log('selected', selected_location);
  };

  const getSuggestions = (input: string) => {
    const inputLower = input.trim().toLowerCase();
    const inputLength = inputLower.length;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(inputLower)
      ).map((suggesstion: Location) => suggesstion.name);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

  return (
    <Autosuggest
      suggestions={getSuggestions(inputValue)}
      onSuggestionsFetchRequested={() => { }}
      onSuggestionsClearRequested={() => { }}
      onSuggestionSelected={handleSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: 'Search for a place',
        value: inputValue,
        className: styles['autocomplete-input'],
        style: { color: 'black', backgroundColor: 'white' },
        onChange: handleChange,
      }}
      theme={{
        container: styles['suggestions-container'], // Apply your CSS class for suggestions container styling
        suggestionsList: styles['suggestions-list'], // Apply your CSS class for suggestions list styling
        suggestion: styles.suggestion, // Apply your CSS class for individual suggestion styling
      }}
    />
  );
};

export default AutocompleteInput;
