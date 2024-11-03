import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getUserEvents } from '../../service/calendarService';
import { formatDate, formatTime } from '../../utils/dateUtils';
import ContainerUi from '../ContainerUi/ContainerUi';
import { useTranslation } from 'react-i18next';

interface CustomerEventsUiProps {
  userId?: string;
  customerId: string;
  isHeaderShown: boolean;
}

const CustomerEventsUi: React.FC<CustomerEventsUiProps> = ({
  userId,
  customerId,
  isHeaderShown,
}) => {
  const { t } = useTranslation();
  const {
    data: events,
    isLoading,
    error,
  } = useQuery(
    ['userEvents', userId, customerId],
    () => getUserEvents(userId ?? '', customerId),
    {
      enabled: !!customerId,
    },
  );

  const [openEventId, setOpenEventId] = useState<string | null>(null);

  const toggleDescription = (id: string) => {
    setOpenEventId(openEventId === id ? null : id);
  };

  const sortedEvents = events
    ? [...events].sort((a, b) => {
        return (
          (a.start ? new Date(a.start).getTime() : 0) -
          (b.start ? new Date(b.start).getTime() : 0)
        );
      })
    : [];

  if (isLoading) return <LoadingMessage>Loading events...</LoadingMessage>;
  if (error) return <ErrorMessage>Error fetching events.</ErrorMessage>;

  return (
    <ContainerUi isHeaderVisible={isHeaderShown}>
      <Title>
        {sortedEvents.length
          ? `${sortedEvents.length} ${t('customerDetails.events.customerEvents')}`
          : t('customerDetails.events.dontHaveCustomerEvents')}
      </Title>
      <EventList>
        {sortedEvents.map((event) => (
          <EventCard key={event.id} onClick={() => toggleDescription(event.id)}>
            <EventCircle $color={event.type ? '#f11e5d' : '#1e90ff'} />
            <EventContent>
              <EventHeader>
                <EventTitle>{event.title}</EventTitle>
                <EventDate>{formatDate(event.start)}</EventDate>
              </EventHeader>
              <EventTime>{`${formatTime(new Date(event.start))} - ${formatTime(new Date(event.end))}`}</EventTime>
              {openEventId === event.id && (
                <EventDescription>{event.description}</EventDescription>
              )}
            </EventContent>
          </EventCard>
        ))}
      </EventList>
    </ContainerUi>
  );
};

export default CustomerEventsUi;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

const LoadingMessage = styled.div`
  color: #666;
  font-size: 1.1em;
`;

const ErrorMessage = styled.div`
  color: #ff6347;
  font-size: 1.1em;
`;

const EventList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const EventCard = styled.div`
  ${({ theme }) => theme.utils.flexDirectionRtl(theme)};
  display: flex;
  width: 48%;
  min-width: 250px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    height 0.3s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const EventCircle = styled.div<{ $color: string }>`
  width: 4px;
  height: 100%;
  margin-inline-end: 8px;
  //border-radius: 50%;
  background-color: ${({ $color }) => $color};
  //position: absolute;
  //top: 16px;
  //left: 16px;
`;

const EventContent = styled.div`
  width: 100%;
  justify-content: space-between;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const EventDate = styled.span`
  font-size: 0.9em;
  color: #888;
`;

const EventTitle = styled.h3`
  font-weight: bold;
  color: #333;
  margin: 0;
  font-size: 1.1em;
`;

const EventTime = styled.span`
  display: block;
  margin-top: 8px;
  color: #555;
  font-size: 0.95em;
`;

const EventDescription = styled.p`
  margin-top: 10px;
  color: #555;
  font-size: 0.9em;
  line-height: 1.4;
  max-height: 200px;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  opacity: 1;
  overflow: hidden;
`;
