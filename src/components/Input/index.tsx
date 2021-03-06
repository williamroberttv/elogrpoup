import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import styles from './styles.module.scss';
import { InputProps } from '../../utils/types';

const Input = ({ name, labelName, icon: Icon, ...rest }: InputProps) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{labelName}</label>
      <div className={styles.inputContent}>
        <input ref={inputRef} {...rest} />
        {Icon && <Icon size={20} />}
      </div>
      {error && (
        <span>
          <strong>{error}</strong>
          <FiAlertCircle color="#c53030" size={20} />
        </span>
      )}
    </div>
  );
};

export default Input;
