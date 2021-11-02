import { createContext, useCallback, useState } from 'react';
import { LeadContextProps, LeadProviderProps, Leads } from '../utils/types';

export const LeadContext = createContext({} as LeadContextProps);

export function LeadProvider({ children }: LeadProviderProps) {
  const [leads, setLeads] = useState<Leads[]>([]);
  const getNewLead = useCallback((object: Leads) => {
    setLeads((prevState) => [object, ...prevState]);
  }, []);
  return (
    <LeadContext.Provider value={{ leads, getNewLead }}>
      {children}
    </LeadContext.Provider>
  );
}
