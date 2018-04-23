import * as React from 'react';
import './App.css';
import { buildBoard } from './components/Board/build';
import { flag } from './components/Board/flag';
import { open } from './components/Board/open';
import Field from './components/Field/index';
import { BOMBS_COUNT, KEYCODE_SPACEBAR } from './constants';
import { IField, IVector2d } from './types';

class App extends React.Component<{}, {board: IField[][], flagsLeft: number, mousePosition: IVector2d}> {
  private boundMethods : {
    openField: () => void,
    restart: () => void
  };

  constructor(props: any) {
    super(props);

    this.boundMethods = {
      openField: this.openField.bind(this),
      restart: this.restart.bind(this)
    };

    this.state = {
      board: buildBoard(this.boundMethods.openField),
      flagsLeft: BOMBS_COUNT,
      mousePosition: {
        x: 0,
        y: 0
      }
    };
  }

  public componentDidMount() {
    document.body.onkeyup = (e) => {
      if(e.keyCode === KEYCODE_SPACEBAR){
        this.flagField(this.state.mousePosition);
      }
    }

    document.body.onmousemove = (e) => {
      const { x, y } = e;

      this.setState({
        mousePosition: {
          x,
          y
        }
      });
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div id="controls">
          <span>Flags: {this.state.flagsLeft}</span>
          <button onClick={this.boundMethods.restart}>Restart</button>
        </div>
        <div id="fields-container">
          {this.state.board.map((row, rowIdx) =>
            <div key={`r${rowIdx}`} className="row">
              {row.map((field, fieldIdx) => <Field {...field} key={`f${rowIdx}-${fieldIdx}`}/>)}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }

  private openField(x: number, y: number): void {
    this.setState({
      board: open(this.state.board, x, y)
    });
  }

  private flagField(mousePosition: IVector2d): void {
    const { board, flagCountDiff } = flag(this.state.board, this.state.mousePosition);

    this.setState(prevState => ({
      board,
      flagsLeft: prevState.flagsLeft + flagCountDiff
    }));
  }

  private restart() {
    this.setState({
      board: buildBoard(this.boundMethods.openField),
    });
  }
}

export default App;
