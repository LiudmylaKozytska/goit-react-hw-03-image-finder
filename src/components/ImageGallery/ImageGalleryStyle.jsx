import styled from '@emotion/styled';

export const GalleryList = styled.ul`
  padding: 10px;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 380px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
