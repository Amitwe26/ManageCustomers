import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import ButtonUi from '../ButtonUi/ButtonUi';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CalendarHeaderUi = (calendarRef: {
  current: FullCalendar | null;
  calendarRef: React.RefObject<FullCalendar>;
}) => {
  const { t } = useTranslation();
  const [isWithWeekend, setIsWithWeekend] = React.useState(false);

  const buttonConfigs = [
    { key: 'prev', click: () => calendarRef.current?.getApi().prev() },
    { key: 'next', click: () => calendarRef.current?.getApi().next() },
    { key: 'today', click: () => calendarRef.current?.getApi().today() },
    {
      key: 'timeGridDay',
      click: () => calendarRef.current?.getApi().changeView('timeGridDay'),
    },
    {
      key: 'timeGridWeek',
      click: () => calendarRef.current?.getApi().changeView('timeGridWeek'),
    },
    {
      key: 'dayGridMonth',
      click: () => calendarRef.current?.getApi().changeView('dayGridMonth'),
    },
    {
      key: 'toggleWeekends',
      click: () => {
        const api = calendarRef.current?.getApi();
        const weekendsVisible = api?.getOption('hiddenDays')?.length === 0;
        setIsWithWeekend(weekendsVisible);
        api?.setOption('hiddenDays', weekendsVisible ? [5, 6] : []);
      },
    },
  ];

  const isToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return today;
  };
  const isCurrentDateToday = (currentDate: Date) => {
    const today = isToday();

    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getDate() === today.getDate()
    );
  };
  return (
    <HeaderWrapper>
      <ButtonGroup>
        {buttonConfigs.slice(0, 3).map((button) => {
          const currentDate = calendarRef.current?.getApi().getDate();

          return (
            <ButtonUi
              key={button.key}
              label={t(`customerDetails.events.${button.key}`)}
              disabled={
                button.key === 'today' &&
                currentDate &&
                isCurrentDateToday(currentDate)
              }
              onClick={button.click}
            />
          );
        })}
      </ButtonGroup>
      <GridButtons>
        {buttonConfigs.slice(3).map((button) => (
          <ButtonUi
            key={button.key}
            label={t(`customerDetails.events.${button.key}`)}
            isTransparent={
              button.key === 'toggleWeekends'
                ? !isWithWeekend
                : calendarRef.current?.getApi().view.type !== button.key
            }
            variant="primary"
            onClick={button.click}
          />
        ))}
      </GridButtons>
    </HeaderWrapper>
  );
};

export default CalendarHeaderUi;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 16px 0 26px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  background-color: white;
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 5px;
  background-color: white;
`;
