import { Input, InputGroup } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';

type SearchBoxProps = {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: (value: string) => void;
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
};

function SearchBox({ currentRefinement, isSearchStalled, refine, onChange, onSubmit }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    refine(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit !== undefined && onSubmit(currentRefinement);
  };

  return (
    <form noValidate action="" role="search" onSubmit={handleSubmit}>
      <InputGroup size="sm">
        <Input
          placeholder="Search for courses"
          bg="white"
          display="flex"
          width={['2xs', '3xs', '2xs', 'md', '2xl']}
          value={currentRefinement}
          onChange={handleChange}
        />
      </InputGroup>
    </form>
  );
}

type Props = SearchBoxProvided & {
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
};

export const Search = connectSearchBox<Props>(SearchBox);
