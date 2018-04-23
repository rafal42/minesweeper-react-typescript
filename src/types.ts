export interface IVector2d {
  x: number,
  y: number,
};

export interface IField {
  x: number,
  y: number,
  hasFlag: boolean;
  hasBomb: boolean;
  isOpen?: boolean;
  neighboringBombCount?: number,
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
};
