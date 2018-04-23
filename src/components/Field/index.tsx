import * as cx from 'classnames';
import * as React from 'react';
import { IField } from '../../types';
import './style.css';

const getContent = ({ isOpen, hasBomb, neighboringBombCount, hasFlag } :
  { isOpen?: boolean, hasBomb: boolean, neighboringBombCount?: number, hasFlag: boolean}) => {
  if (isOpen) {
    if (hasBomb) {
      return '💣';
    }

    return neighboringBombCount;
  }

  if (hasFlag) {
     return '🚩';
  }

  return 'X';
}

const FieldComponent = ({ hasFlag, hasBomb, isOpen, neighboringBombCount, ...rest } : IField) => (
  <div
    className={cx('field', {
      'bomb': hasBomb,
      [`bombs-${neighboringBombCount}`]: !hasBomb,
      'flag': hasFlag,
      'open': isOpen
    })}
    {...rest}
  >
    {getContent({ isOpen, hasBomb, neighboringBombCount, hasFlag })}
  </div>
);

export default FieldComponent;


