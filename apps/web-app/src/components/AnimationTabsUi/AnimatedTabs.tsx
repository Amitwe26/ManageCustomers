import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type TabConfig = {
  label: string;
  component: React.ComponentType;
};

interface AnimatedTabsProps {
  tabs: TabConfig[];
  initialTabIndex?: number;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  initialTabIndex = 0,
}) => {
  const { t } = useTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(initialTabIndex);
  const [direction, setDirection] = useState<number>(0); // Tracks tab change direction

  const handleTabChange = (newIndex: number) => {
    if (newIndex !== activeTabIndex) {
      setDirection(newIndex > activeTabIndex ? 1 : -1);
      setActiveTabIndex(newIndex);
    }
  };

  const ActiveTabComponent = tabs[activeTabIndex].component;

  const variants = {
    enter: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    }),
  };

  return (
    <>
      <TabContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            onClick={() => handleTabChange(index)}
            $isActive={activeTabIndex === index}
          >
            {t(`customerDetails.tabs.${tab.label}`)}
          </TabButton>
        ))}
      </TabContainer>
      <TabContentContainer>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeTabIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'absolute', width: '100%' }}
          >
            <ActiveTabComponent />
          </motion.div>
        </AnimatePresence>
      </TabContentContainer>
    </>
  );
};

export default AnimatedTabs;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.button.light : '#ddd'};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.button.light};
    opacity: 0.5;
  }
`;

const TabContentContainer = styled.div`
  position: relative;
  min-height: 300px;
`;
