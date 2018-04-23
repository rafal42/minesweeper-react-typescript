export interface IField {
  x: number,
  y: number,
  hasFlag: boolean;
  hasBomb: boolean;
  isOpen?: boolean;
  neighboringBombCount?: number,
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
};
