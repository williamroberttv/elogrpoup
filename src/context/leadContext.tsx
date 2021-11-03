import { createContext, useCallback, useState } from 'react';
import { LeadContextProps, LeadProviderProps, Leads } from '../utils/types';

export const LeadContext = createContext({} as LeadContextProps);

export function LeadProvider({ children }: LeadProviderProps) {
  const [leads, setLeads] = useState<Leads[]>([
    {
      id: 200,
      name: 'Apple',
      email: 'apple@apple.com',
      contact: '829838923829',
      categories: ['bpm']
    }
  ]);
  const [confirmedData, setConfirmedData] = useState<Leads[]>([]);
  const [scheduledData, setScheduledData] = useState<Leads[]>([]);
  const getNewLead = useCallback((object: Leads) => {
    setLeads((prevState) => [object, ...prevState]);
  }, []);
  const getConfirmedData = useCallback((object: Leads) => {
    setConfirmedData((prevState) => [object, ...prevState]);
  }, []);

  const handleConfirmedData = useCallback((arr: Leads[]) => {
    const lead = arr[0];
    setConfirmedData((prevState) => [...prevState, ...arr]);
    setLeads((prevState) => prevState.filter((state) => state.id !== lead.id));
  }, []);

  const handleScheduledData = useCallback((arr: Leads[]) => {
    const lead = arr[0];
    setScheduledData((prevState) => [...prevState, ...arr]);
    setConfirmedData((prevState) => prevState.filter((state) => state.id !== lead.id));
  }, []);

  return (
    <LeadContext.Provider
      value={{
        leads,
        confirmedData,
        scheduledData,
        getNewLead,
        getConfirmedData,
        handleConfirmedData,
        handleScheduledData
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}
