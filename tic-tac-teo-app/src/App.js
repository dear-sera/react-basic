import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]); // history 배열을 list로 생성
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {  // 아래 해당되는 배열에 변수가 존재 시, 우승
  const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]         
    ]
    for (let index = 0; index < lines.length; index++) {
        const [a, b, c] = lines[index];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];  // index a, b, c에 변수가 존재 시 우승
        }
    }
    return null;
  }

  const current = history[history.length - 1]; //현재 squres를 가져옴, length -1 은 인덱스는 0부터 시작하고 leghth는 1부터 시작해서
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
      status = 'Winner: ' + winner;  // winner가 존재 시, status는 Winner
  } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`; //True면 X, False면 O
  }

  const handleClick = (i) => {
    const newSquares = current.squares.slice();  //slice는 squeres의 원본 수정이 아닌 복사본 수정을 위해
    if (calculateWinner(newSquares) || newSquares[i]) {  //안에 변수가 있거나(이긴 X or O) 또는 인덱스가 들어가면
      return;
    }

    newSquares[i] = xIsNext? 'X' : 'O';  // xIsNext가 true면 X, false면 O
    setHistory([...history, { squares: newSquares }]); // 전개연산자로 기존 존재하던 history 배열을 가져와 늘여뜨리고, 새로운 배열을 추가함
    setXIsNext(prev => !prev);    //!물음표는 기존 값을 T -> F, F -> T로 변경해줌
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
      </div>

    </div>
  );
}

export default App;
