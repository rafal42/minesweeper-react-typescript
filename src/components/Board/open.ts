import { flatten } from 'lodash';
import { IField } from '../.././types';
import { getNondiagonalNeighborVectors, safeDeepAccess } from './utils';

export function getNeighborsToOpen(board: IField[][], x: number, y: number, visited: number[][] = [], deepCall = false): number[][] {
  const neighborVectors = getNondiagonalNeighborVectors(x, y).filter(([ny, nx]) => {
    const ua = safeDeepAccess(board, ny, nx);
    return ua && !ua.hasBomb;
  });

  const neighborVectorsWithOmitted = neighborVectors.filter(
    ([ny, nx]) => visited.find(([vy, vx]) => vy === ny && vx === nx) === undefined
  );


  if (board[y][x].isOpen) { return []; }

  if (board[y][x].hasBomb && deepCall) {
    return [];
  }

  if (board[y][x].hasBomb && !deepCall) {
    // todo: Lose game here
    return flatten(board.map(
      row => row.filter(field => field.hasBomb).map(field =>
        [field.y, field.x]
      )
    ));
  }

  let toOmit = [
    ...visited,
    ...neighborVectors,
    [y, x]
  ];

  let result : number[][] = [[y, x]];

  neighborVectorsWithOmitted.forEach(([ny, nx]) => {
    const neighborsDeep = getNeighborsToOpen(board, nx, ny, toOmit, true);
    toOmit = [
      ...toOmit,
      ...neighborsDeep,
      [ny, nx],
    ];
    result = [
      ...result,
      ...neighborsDeep
    ];
  });

  return result;
}

export function open(board: IField[][], x: number, y: number): IField[][] {
  const toOpen = getNeighborsToOpen(board, x, y, [], false);

  const boardCopy = Object.assign([], board);
  toOpen.forEach(([oy, ox]) => {
    boardCopy[oy][ox].isOpen = true;
  })

  return boardCopy;
}
