import { IField } from './components/Field/interface';

export function buildField ({ onClick, x, y } : { onClick: Function, x: number, y: number }) : IField {
  return {
    x: x,
    y: y,
    hasBomb: Math.random() > 0.5,
    hasFlag: false,
    isOpen: false,
    onClick: () => onClick(x, y),
  };
};

export const buildBoard = (onClick : Function): IField[][] => {
  const bf = (x: number, y: number) => buildField({ onClick, x, y });
  const fields = [
    [bf(0, 0), bf(1, 0), bf(2, 0), bf(3, 0), bf(4, 0), bf(5, 0)],
    [bf(0, 1), bf(1, 1), bf(2, 1), bf(3, 1), bf(4, 1), bf(5, 1)],
    [bf(0, 2), bf(1, 2), bf(2, 2), bf(3, 2), bf(4, 2), bf(5, 2)],
    [bf(0, 3), bf(1, 3), bf(2, 3), bf(3, 3), bf(4, 3), bf(5, 3)],
    [bf(0, 4), bf(1, 4), bf(2, 4), bf(3, 4), bf(4, 4), bf(5, 4)],
    [bf(0, 5), bf(1, 5), bf(2, 5), bf(3, 5), bf(4, 5), bf(5, 5)],
  ];

  fields.forEach(row => (
    row.forEach(field => field.neighboringBombCount = neighboringBombs(fields, field.x, field.y))
  ));

  return fields;
};

export function unsafeAccess(board: any[][], y: number, x: number) {
  try {
    return board[y][x];
  } catch {
    return undefined;
  }
}

export function getNeighborVectors(x: number, y: number): number[][] {
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

export function neighboringBombs(board: IField[][], x: number, y: number) {
  const neighborVectors = getNeighborVectors(x, y);

  return neighborVectors.filter(([ny, nx]) => {
    const neighborField = unsafeAccess(board, ny, nx);
    return neighborField && neighborField.hasBomb;
  }).length;
}

export function getNeighborsToOpen(board: IField[][], x: number, y: number, visited: number[][] = [], deepCall = false): number[][] {
  const neighborVectors = getNondiagonalNeighborVectors(x, y).filter(([ny, nx]) => {
    const ua = unsafeAccess(board, ny, nx);
    return ua !== undefined && !ua.hasBomb;
  });

  let toOmit = [
    ...visited,
    ...neighborVectors
  ];

  const neighborVectorsWithOmitted = neighborVectors.filter(
    ([ny, nx]) => visited.find(([vy, vx]) => vy === ny && vx === nx) === undefined
  );

  let result = [
    ...neighborVectorsWithOmitted,
  ];

  if (board[y][x].isOpen) return [];

  if (board[y][x].hasBomb && deepCall) {
    return [];
  }

  if (board[y][x].hasBomb && !deepCall) {
    // todo: Lose game here
    return [[y, x]];
  }

  result.push([y, x]);

  neighborVectorsWithOmitted.forEach(([ny, nx]) => {
    const neighborsDeep = getNeighborsToOpen(board, ny, nx, toOmit, true);
    toOmit = [
      ...toOmit,
      ...neighborsDeep,
      [y, x]
    ];
    result = [
      ...result,
      ...neighborsDeep
    ];
  });

  return result;
}

export function open(board: IField[][], x: number, y: number, visited: Object[] = []): IField[][] {
  const toOpen = getNeighborsToOpen(board, x, y, [], false);


  const boardCopy = Object.assign([], board);
  toOpen.forEach(([y, x]) => {
    boardCopy[y][x].isOpen = true;
  })

  return boardCopy;
}
