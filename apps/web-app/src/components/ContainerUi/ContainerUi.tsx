import React, { useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerUiProps {
  children: ReactNode;
  headerHeight: number;
  extraHeight?: number;
}

const ContainerUi: React.FC<ContainerUiProps> = ({
  children,
  headerHeight,
  extraHeight = 0,
}) => {
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const calculatedHeight = windowHeight * ((100 - headerHeight * 10) / 100);
      setMaxHeight(calculatedHeight);
    };
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [headerHeight, extraHeight]);

  return <StyledContainer $maxHeight={maxHeight}>{children}</StyledContainer>;
};

export default ContainerUi;

const StyledContainer = styled.div<{ $maxHeight: number }>`
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;
