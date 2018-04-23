export function safeDeepAccess(board: any[][], y: number, x: number) {
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

export function getNondiagonalNeighborVectors(x: number, y: number) : number[][] {
  return [
    [y, x - 1],
    [y, x + 1],
    [y - 1, x],
    [y + 1, x]
  ];
}
