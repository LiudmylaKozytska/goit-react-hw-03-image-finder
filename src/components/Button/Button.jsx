import React from 'react';
import { Button } from 'components/Searchbar/SearchbarStyle';
import { FaSearch } from 'react-icons/fa';

export const LoadMoreButton = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};
