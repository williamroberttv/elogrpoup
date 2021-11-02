import { createContext, ReactNode, useCallback, useState } from 'react';

interface LeadContextProps {
  leads: Leads[];
  getNewLead: (object: Leads) => void;
}
interface LeadProviderProps {
  children: ReactNode;
}
interface Leads {
  name: string;
  email: string;
  contact: string;
  categories: (string | false)[];
}

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
