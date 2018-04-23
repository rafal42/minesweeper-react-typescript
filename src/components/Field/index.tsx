import * as React from 'react';
import * as cx from 'classnames';
import './style.css';
import { IField } from './interface';


const FieldComponent = ({ hasFlag, hasBomb, isOpen, onClick, neighboringBombCount } : IField) => (
  <div
    className={cx('field', {
      'open': isOpen,
      [`bombs-${neighboringBombCount}`]: !hasBomb,
    })}
    onClick={onClick}
  >
    {isOpen ? (
        hasFlag ? '🚩' :
          hasBomb ? '💣' : neighboringBombCount
      ) : 'X'}
  </div>
);

export default FieldComponent;


