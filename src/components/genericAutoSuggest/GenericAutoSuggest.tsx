// To understand how to use this component refer to: https://www.npmjs.com/package/react-autosuggest
// Some tips:
// -Styling: This component has only basic styling (same styling as TextBox) so it can be used for different scenarios and that you can have the freedom to make look as you need.
//  To accomplish this you can pass it a object trough the prop called "theme". The most important one is probably gonna be the key input. You can pass it one
//  or more styles names like so: { input: 'rounded-0 form-control' }
//  You can also style the componente by overriding with css. In you choose this options make sure you don't pass the theme property.
// -Styling suggestions list: If you want the suggestion list to not close when the input is unfocused set alwaysRenderSuggestions to true.
// -Label: If you need to add a label to the input, you could use it nested in a <Form.Group> and use a regular <label>
// Try to keep this component as simple as possible so that it's easier to make it fit different scenarios/porpuses.

import React, { FC, useEffect, useState, ReactElement } from 'react';
import Autosuggest, { SuggestionSelectedEventData, SuggestionsFetchRequestedParams, ChangeEvent } from 'react-autosuggest';
import { InputGroup, Image, Button as ClearButton } from 'react-bootstrap';
import images from '../../images/images';

export interface SearchSuggest {
  value: string;
  label: string;
  email?: string;
}

export interface HandleSelectedResponseParams {
  value: string;
  label?: string;
  email?: string;
  reason?:
  | 'input-changed'
  | 'input-focused'
  | 'escape-pressed'
  | 'suggestions-revealed'
  | 'suggestion-selected';
}

export interface GenericAutoSuggestProps {
  suggestions: Array<SearchSuggest>;
  handleSelected: (selected: HandleSelectedResponseParams) => void;
  getSuggestions: (queryText: string) => void;
  miniNoOfCharsShowSuggestions: number;
  placeHolder?: string;
  onSuggestionsClearRequested?: () => void;
  suggestionValue: string;
  isMobileSearchBar?: boolean;
  theme?: object;
  alwaysRenderSuggestions?: boolean;
  showClearButton?: boolean;
  onClearClick?: () => void;
  showEmail?: boolean;
  onInputChange?: () => void;
  id?: string;
  shouldClearInput?: boolean;
  clearCallback?: () => void;
}

const SearchAutoSuggest = Autosuggest as { new(): Autosuggest<SearchSuggest> };

export const GenericAutoSuggest: FC<GenericAutoSuggestProps> = props => {
  const [value, setValue] = useState<string>('');

  const getSuggestionValue = (suggestion: SearchSuggest): string => {
    const regex = /(<([^>]+)>)/ig;
    let suggestionValue = suggestion.value.replace(regex, '');
    if (props.showEmail) {
      suggestionValue = `${suggestionValue} - ${suggestion.email}`;
    }
    return suggestionValue;
  };

  const renderSuggestion = (suggestion: SearchSuggest): ReactElement => {
    const suggestionText = (props.showEmail && suggestion.email) ? `${suggestion.label} - ${suggestion.email}` : suggestion.label;

    return (
      <div dangerouslySetInnerHTML={{ __html: suggestionText }} />
    );
  };

  const onChanges = (_: React.FormEvent<HTMLInputElement>, newValue: ChangeEvent): void => {
    props.onInputChange && props.onInputChange();
    setValue(newValue.newValue);
  };

  const onSuggestionsSelected = (_: React.FormEvent<HTMLInputElement>, suggested: SuggestionSelectedEventData<SearchSuggest>): void => {
    return props.handleSelected(suggested.suggestion);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = (changeReason: SuggestionsFetchRequestedParams): void => {
    props.getSuggestions(changeReason.value);
  };

  const shouldRenderSuggestions = (value: string): boolean => {
    return value.trim().length > props.miniNoOfCharsShowSuggestions;
  };

  const onSuggestionsClearRequested = (): void => {
    props.onSuggestionsClearRequested && props.onSuggestionsClearRequested();
  };

  const handleClearClick = (): void => {
    props.onClearClick!();
    setValue('');
  };

  const inputProps = {
    placeholder: props.placeHolder,
    value,
    onChange: onChanges,
    disabled: props.showClearButton
  };

  useEffect(() => {
    if (props.suggestionValue) {
      setValue(props.suggestionValue);
    } else {
      setValue('');
    }
  }, [props.suggestionValue]);

  // This effect is to clear the input in case something out of the component requires it and trigger a "callback"
  useEffect(() => {
    if (props.shouldClearInput) {
      setValue('');
      props.clearCallback && props.clearCallback();
    }
  }, [props.shouldClearInput]);

  return (
    <div className="generic-auto-suggest">
      <InputGroup>
        <SearchAutoSuggest
          suggestions={props.suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionSelected={onSuggestionsSelected}
          getSuggestionValue={getSuggestionValue}
          shouldRenderSuggestions={shouldRenderSuggestions}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          theme={props.theme}
          alwaysRenderSuggestions={props.alwaysRenderSuggestions}
          id={props.id}
        />
        {props.showClearButton ? (
          <InputGroup.Append className="position-absolute clear-btn-container">
            <ClearButton className="border-0" variant="outline-light" type="reset" onClick={handleClearClick}>
              <Image
                src={images.remove}
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </ClearButton>
          </InputGroup.Append>
        ) : null}
      </InputGroup>
    </div>
  );
};
