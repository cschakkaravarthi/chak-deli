import React from 'react';
import { GenericAutoSuggest } from './GenericAutoSuggest';
import { shallowRender } from '../../shared/services/testHelper';

describe('GenericAutoSuggest', () => {
  const people = [
    {
      value: 'Charlie Brown',
      label: 'Charlie Brown'
    },
    {
      value: 'Charlotte White',
      label: 'Charlotte White'
    },
    {
      value: 'Chloe Jones',
      label: 'Chloe Jones'
    },
    {
      value: 'Cooper King',
      label: 'Cooper King'
    }
  ];

  it('renders correctly with suggestion value', () => {
    const tree = shallowRender(<GenericAutoSuggest
      miniNoOfCharsShowSuggestions={2}
      suggestions={people}
      handleSelected={jest.fn()}
      getSuggestions={jest.fn()}
      suggestionValue="Suggestion value"
      onSuggestionsClearRequested={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when neither suggestions nor suggestion value', () => {
    const tree = shallowRender(<GenericAutoSuggest
      miniNoOfCharsShowSuggestions={2}
      suggestions={[]}
      handleSelected={jest.fn()}
      getSuggestions={jest.fn()}
      suggestionValue=""
      onSuggestionsClearRequested={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
  });

  it('renders clear button', () => {
    const tree = shallowRender(<GenericAutoSuggest
      miniNoOfCharsShowSuggestions={2}
      suggestions={[]}
      handleSelected={jest.fn()}
      getSuggestions={jest.fn()}
      suggestionValue="Selected Suggestion"
      onSuggestionsClearRequested={jest.fn()}
      showClearButton={true}
    />);
    expect(tree).toMatchSnapshot();
  });
});
