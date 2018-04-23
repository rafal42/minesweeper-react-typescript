import { BOMBS_COUNT } from '../.././constants';
import { IField } from '../.././types';
import { getNeighborVectors, safeDeepAccess } from './utils';

function buildField ({ onClick, x, y } : { onClick: (x: number, y: number) => void, x: number, y: number }) : IField {
  return {
    hasBomb: false,
    hasFlag: false,
    isOpen: false,
    onClick: () => onClick(x, y),
    x,
    y,
  };
};

function neighboringBombs(board: IField[][], x: number, y: number): number {
  const neighborVectors = getNeighborVectors(x, y);

  return neighborVectors.filter(([ny, nx]) => {
    const neighborField = safeDeepAccess(board, ny, nx);
    return neighborField && neighborField.hasBomb;
  }).length;
}

export const buildBoard = (onClick : () => void): IField[][] => {
  const bf = (x: number, y: number) => buildField({ onClick, x, y });
  const fields =
    [...Array(20).keys()].map(
      (outerKey) => [...Array(20).keys()].map(innerKey => bf(innerKey, outerKey))
    )

  const getRandom = () => [Math.round(Math.random() * 19), Math.round(Math.random() * 19)];

  let minesPlaced = 0;
  while(minesPlaced < BOMBS_COUNT) {
    const [y, x] = getRandom();

    if (!fields[y][x].hasBomb && neighboringBombs(fields, x, y) <= 6) {
      fields[y][x].hasBomb = true;
      minesPlaced++;
    }
  }

  fields.forEach(row => (
    row.forEach(field => field.neighboringBombCount = neighboringBombs(fields, field.x, field.y))
  ));

  return fields;
};
