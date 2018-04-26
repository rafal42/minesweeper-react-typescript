import open from './open';

describe('open', () => {
  test('returns proper vectors', () => {
    const board = [
      [
        {
          x: 0,
          y: 0,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        },
        {
          x: 1,
          y: 0,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 2,
          y: 0,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 3,
          y: 0,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 4,
          y: 0,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 5,
          y: 0,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        }
      ],
      [
        {
          x: 0,
          y: 1,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 1,
          y: 1,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 2,
          y: 1,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 3,
          y: 1,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 4,
          y: 1,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 5,
          y: 1,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        }
      ],
      [
        {
          x: 0,
          y: 2,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 1,
          y: 2,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 6,
          onClick: () => {}
        },
        {
          x: 2,
          y: 2,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 6,
          onClick: () => {}
        },
        {
          x: 3,
          y: 2,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 4,
          y: 2,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 6,
          onClick: () => {}
        },
        {
          x: 5,
          y: 2,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        }
      ],
      [
        {
          x: 0,
          y: 3,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 1,
          y: 3,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 2,
          y: 3,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 3,
          y: 3,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        },
        {
          x: 4,
          y: 3,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        },
        {
          x: 5,
          y: 3,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        }
      ],
      [
        {
          x: 0,
          y: 4,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        },
        {
          x: 1,
          y: 4,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 2,
          y: 4,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 5,
          onClick: () => {}
        },
        {
          x: 3,
          y: 4,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        },
        {
          x: 4,
          y: 4,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 4,
          onClick: () => {}
        },
        {
          x: 5,
          y: 4,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        }
      ],
      [
        {
          x: 0,
          y: 5,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        },
        {
          x: 1,
          y: 5,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 3,
          onClick: () => {}
        },
        {
          x: 2,
          y: 5,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        },
        {
          x: 3,
          y: 5,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        },
        {
          x: 4,
          y: 5,
          hasBomb: false,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 2,
          onClick: () => {}
        },
        {
          x: 5,
          y: 5,
          hasBomb: true,
          hasFlag: false,
          isOpen: false,
          neighboringBombCount: 0,
          onClick: () => {}
        }
      ]
    ];

    const expectedBoard = Object.assign([], board);
    expectedBoard[5][0].isOpen = true;
    expectedBoard[5][1].isOpen = true;

    expect(open(board, 0, 5)).toEqual(expectedBoard);
  })
})
