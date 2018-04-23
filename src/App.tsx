import * as React from 'react';
import './App.css';

import Field from './components/Field/index';
import { IField } from './components/Field/interface';
import {
  buildBoard,
  open,
} from './Board';

class App extends React.Component<{}, {board: IField[][]}> {
  constructor(props: any) {
    super(props);
    this.state = {
      board: buildBoard(this.openField.bind(this))
    };
  }

  public openField(x: number, y: number): void {
    this.setState({
      board: open(this.state.board, x, y),
    });
  }

  public render() {
    return (
      <div>
        <p>xD</p>
        {this.state.board.map(row =>
          <div>{row.map(f => <Field {...f} />)}</div>
        )}
      </div>
    );
  }
}

export default App;
