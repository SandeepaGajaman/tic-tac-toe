import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {

//   // constructor(props) {
//   //   //Always call "super" when defining the constructor of a subclass
//   //   //All React component classes that have a constructors should start with a super(props) call
//   //   super(props);
//   //   console.log('3. This is Square constructor');
//   //   this.state = {
//   //     value: null,
//   //   }
//   // }--> Not needed after passing down two props (value & onClick) from Board to Square

//     render() {
//       console.log('4. Render square');
//       return (
//         // Function
//         // <button className="square" onClick={function() {console.log('click...render');} }>

//         // Arrow Function
//         <button 
//           className="square" 
//           onClick={() => this.props.whenClick()}
//         >
//           {this.props.value}
//           {console.log('5. Clicked X')}
//         </button>
//       );
//     }
//   }

// **** Above class replaced with below function component

  function Square(props) {
    console.log('Square arrow function');
    return(
      <button className='square' onClick={props.whenClick}>
        {props.value}
      </button>
    );
  }
  // Function components are a simpler way to write components that only contain a render method and don’t have their own state.
  
  class Board extends React.Component {

    // constructor(props) {
    //   console.log('1. This is Board constructor');
    //   super(props);
    //   this.state = ({
    //     squares: Array(9).fill(null),
    //     xIsNext: true
    //   });
    //   console.log(this.state.squares);
    //   console.log('1.1. By default ' + this.state.xIsNext);
    // }

    renderSquare(i) {
      // console.log('3. Invoke renderSquare');
      // console.log(this.state.squares);
      // console.log('3.1. Changed by default to ' + this.state.xIsNext);
      return (
        <Square 
          value={this.props.squares[i]} 
          // whenClick comes fro Square's whenClick prop
          whenClick={() => this.props.onClick(i)} 
          />
        );
        /*We split the returned element into multiple lines for readability, 
        and added parentheses so that JavaScript doesn’t insert a semicolon after r
        eturn and break our code.*/
    }
  
    render() {
      // console.log('2. Render Board');
      // // *******
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if (winner) {
      //   status = 'Winner: ' + winner;
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
      // // *******
      // console.log(this.state.squares);
      // console.log('2.1. Changed by default to ' + this.state.xIsNext);
  
      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true
      };
    }

    handleClick(i) {
      console.log('4. Invoke handleClick');
      const history = this.state.history;
      const current = history[history.length - 1];
      console.log(this.state.squares);
      const squares = current.squares.slice();
      // Ignoring click when the game is over
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      console.log('4.1. xIsNext passed as ' + this.state.xIsNext);
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      console.log('4.2. Value changed to ' + squares[i]);
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext
      });
      console.log('4.3. xIsNext flip to ' + !this.state.xIsNext);
    }

    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move ' + move : 'Go to game start!';
        return(
          <li>
            <button onClick = { () => this.jumpTo(move)}> {desc} </button>
          </li>
        );
      })

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);  

  function calculateWinner(squares) {
    console.log('Invoke calculateWinner')
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(squares[a])
        return squares[a];
      }
    }
    console.log('return null')
    return null;
  }