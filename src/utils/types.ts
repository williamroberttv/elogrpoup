import { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export interface Errors {
  [key: string]: string;
}
