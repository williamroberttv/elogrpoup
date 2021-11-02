import { InputHTMLAttributes, ReactNode } from 'react';
import { IconBaseProps } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export interface InputCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  description: string;
}

export interface Errors {
  [key: string]: string;
}

export interface Data {
  user: string;
  password: string;
  passwordConfirmation: string;
}

export interface NewLeadProps {
  name: string;
  contact: string;
  email: string;
  categories: {
    rpa: boolean;
    bpm: boolean;
    analytics: boolean;
    produtoDigital: boolean;
  };
}

export interface LeadContextProps {
  leads: Leads[];
  // eslint-disable-next-line no-unused-vars
  getNewLead: (object: Leads) => void;
}
export interface LeadProviderProps {
  children: ReactNode;
}
export interface Leads {
  name: string;
  email: string;
  contact: string;
  categories: (string | false)[];
}
