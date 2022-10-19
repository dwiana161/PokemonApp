import styled from "styled-components";

export const SliderStyleBookmark = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none; /*Firefox*/
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
    };
  .slick-slide {
    width: 160px !important;
  }
`;

export const ViewBoxFavorite = styled.div`
  border: 1px solid #d3d3d3;
  padding: 16px;
  border-radius: 10px;
  width: 154px;
  background-color: #b2b2b2;
`;