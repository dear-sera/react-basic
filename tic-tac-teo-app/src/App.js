import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]); // history 배열을 list로 생성
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

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

  const current = history[stepNumber]; //현재 squres를 가져옴, stepNumber도 어차피 0부터 시작이니까 stepNumber로 변경 // 변경 전: length -1 은 인덱스는 0부터 시작하고 leghth는 1부터 시작해서
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
      status = 'Winner: ' + winner;  // winner가 존재 시, status는 Winner
  } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`; //True면 X, False면 O
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); // 기존부터 최근까지의 history를 index로 가져오기
    const newCorrent = newHistory[newHistory.length - 1]; // 현재의 current 가져오기
    const newSquares = newCorrent.squares.slice();  //현재 current의 squeres만 가져오기, slice는 squeres의 원본 수정이 아닌 복사본 수정을 위해
    if (calculateWinner(newSquares) || newSquares[i]) {  //안에 변수가 있거나(이긴 X or O) 또는 인덱스가 들어가면
      return;
    }

    newSquares[i] = xIsNext? 'X' : 'O';  // xIsNext가 true면 X, false면 O
    setHistory([...newHistory, { squares: newSquares }]); // 전개연산자로 기존 존재하던 history 배열을 가져와 늘여뜨리고, 새로운 배열을 추가함
    setXIsNext(prev => !prev);    //!물음표는 기존 값을 T -> F, F -> T로 변경해줌
  
    setStepNumber(newHistory.length);  //변경된 history length로 stepnumber 변경
  }

  const moves = history.map((step, move) => {
    const desc = move ?   //move는 순서를 가리키는데, move = 0, 1, 2, 3, 4, 5 순서로 들어감
    'Go to move #' + move :
    'Go to game start';  //0은 False라서 game start로 들어감
    return(
      <li key={move}>
        <button className='move-button' onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const jumpTo = (step) => {  //step또한 0부터 시작
    setStepNumber(step);
    setXIsNext(step % 2 === 0); //stepnumber가 짝수 일 때마다 xisNext가 true로 변경
  }

  //ol태그는 ordered list라서 순서가 있는 태그
  //과거 시점으로 이동 시, 미래는 올바르지 않기 때문에 모두 버려짐
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{ listStyle: 'none' }}>{moves}</ol>
      </div>

    </div>
  );
}

export default App;
