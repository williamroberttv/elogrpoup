import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import { InputCheckProps } from '../../utils/types';
import styles from './styles.module.scss';

const Checkbox = ({ name, description, ...rest }: InputCheckProps) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const defaultChecked = defaultValue === name;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.checked,
      clearValue: (ref) => {
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value) => {
        ref.current.checked = value;
      }
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <div className={styles.inputContainer}>
      <input
        ref={inputRef}
        name={name}
        type="checkbox"
        value={name}
        {...rest}
      />
      <p>{description}</p>
    </div>
  );
};
export default Checkbox;
