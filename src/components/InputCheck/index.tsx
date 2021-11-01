import { useField } from '@unform/core';
import { InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface InputCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  description: string;
}

const InputCheck = ({ name, description, ...rest }: InputCheckProps) => {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.inputContainer}>
      <input ref={inputRef} name={name} type="checkbox" {...rest} />
      <p>{description}</p>
    </div>
  );
};
export default InputCheck;
