import { IField, IVector2d } from '../.././types';
import { safeDeepAccess } from './utils';

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
