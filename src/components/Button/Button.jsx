import React from 'react';
import { Button } from 'components/Searchbar/SearchbarStyle';

export const LoadMoreButton = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};
