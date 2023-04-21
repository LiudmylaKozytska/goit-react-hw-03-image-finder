import React from 'react';
import PropTypes from 'prop-types';
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

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
