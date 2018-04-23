import { flatten } from 'lodash';
import { BOMBS_COUNT } from './constants';
import { IField, IVector2d } from './types';

function getIndicesForPosition({ x, y } : IVector2d): IVector2d | undefined {
  const container = document.getElementById('fields-container');

  if(container) {
    const basePosition = container.getBoundingClientRect();

    return {
      x: Math.floor((x - basePosition.left) / 25),
      y: Math.floor((y - basePosition.top) / 25)
    };
  }

  return undefined;
}

export function flag(board: IField[][], mousePosition: IVector2d): { board: IField[][], flagCountDiff: number } {
  const indices = getIndicesForPosition(mousePosition);
  const buildResult = (resultBoard: IField[][], flagCountDiff = 0) => ({ board: resultBoard, flagCountDiff });

  if (indices) {
    const { x, y } = indices;

    if (safeDeepAccess(board, y, x) !== undefined) {
      const boardCopy = Object.assign([], board);

      boardCopy[y][x].hasFlag = !boardCopy[y][x].hasFlag;

      return buildResult(boardCopy, boardCopy[y][x].hasFlag ? -1 : +1);
    }
  }

  return buildResult(board);
}

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

function safeDeepAccess(board: any[][], y: number, x: number) {
  try {
    return board[y][x];
  } catch {
    return undefined;
  }
}

function getNeighborVectors(x: number, y: number): number[][] {
  return [
    ...getNondiagonalNeighborVectors(x, y),
    [y - 1, x - 1],
    [y - 1, x + 1],
    [y + 1, x - 1],
    [y + 1, x + 1],
  ];
}

function getNondiagonalNeighborVectors(x: number, y: number) : number[][] {
  return [
    [y, x - 1],
    [y, x + 1],
    [y - 1, x],
    [y + 1, x]
  ];
}

function neighboringBombs(board: IField[][], x: number, y: number): number {
  const neighborVectors = getNeighborVectors(x, y);

  return neighborVectors.filter(([ny, nx]) => {
    const neighborField = safeDeepAccess(board, ny, nx);
    return neighborField && neighborField.hasBomb;
  }).length;
}

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
