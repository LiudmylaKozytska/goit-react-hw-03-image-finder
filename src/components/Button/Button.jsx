import React from 'react';
import { LoadButton, ButtonContainer } from 'components/Button/ButtonStyle';
import { TbArrowBigDownFilled } from 'react-icons/tb';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <ButtonContainer>
      <LoadButton onClick={onClick}>
        <TbArrowBigDownFilled />
      </LoadButton>
    </ButtonContainer>
  );
};
