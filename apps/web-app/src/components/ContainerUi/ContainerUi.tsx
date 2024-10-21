import React, { useState, useLayoutEffect, ReactNode, useRef } from 'react';
import styled from 'styled-components';

interface ContainerUiProps {
  children: ReactNode;
  isHeaderVisible: boolean;
  extraHeight?: number;
}

const ContainerUi: React.FC<ContainerUiProps> = ({
  children,
  isHeaderVisible,
  extraHeight = 40,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const calculateHeight = () => {
    const windowHeight = window.innerHeight;
    const elementTop = containerRef.current?.getBoundingClientRect().top || 0;
    const headerHeight = isHeaderVisible ? 10 : 0; // Dynamically adjust header height

    const availableHeight =
      windowHeight - elementTop - extraHeight - headerHeight;
    setMaxHeight(availableHeight);
  };

  useLayoutEffect(() => {
    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [isHeaderVisible, extraHeight]);

  return (
    <StyledContainer
      ref={containerRef}
      $maxHeight={maxHeight}
      $isHeaderVisible={isHeaderVisible}
    >
      {children}
    </StyledContainer>
  );
};

export default ContainerUi;

const StyledContainer = styled.div<{
  $maxHeight: number;
  $isHeaderVisible: boolean;
}>`
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;
