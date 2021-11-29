/*
 * @Description:
 * @Author: Friends233
 */
import { useEffect, useState } from 'react';
import style from './index.less';
import Board from '../components/Board';

// 游戏是否结束
function calculateWinner(squares: string[]) {
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
      return squares[a];
    }
  }
  return null;
}

// 数组拷贝
function arrayClone(ary:string[]){
  return JSON.parse(JSON.stringify(ary))
}

export default function Game() {
  // 历史
  const [history, setHistory] = useState<string[][]>([Array(9).fill('')]);
  // 是否禁用棋盘
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  // 当前棋盘数据
  const [list, setList] = useState<string[]>(Array(9).fill(''));
  // 下一个棋子类型
  const [XorO, setXorO] = useState<'X' | 'O'>('X');
  // 标题
  const [title, setTitle] = useState<string>('next X');

  // 判断游戏是否结束
  const isGameOver = function () {
    const winner = calculateWinner(list);
    if (winner) {
      setTitle('winner ' + winner);
      setIsDisabled(true);
      return;
    } else if (!list.includes('')) {
      setTitle('game over');
      setIsDisabled(true);
      return;
    }
  };

  useEffect(() => {
    isGameOver();
  });

  //  重置游戏
  const resetGame = function (index: number) {
    // 根据传入index来判断是重置到某一个历史，还是游戏结束的重置
    if (index !== -1 && history[index].length) {
      const listCopy = arrayClone(history[index])
      setList(history[index]);
      // setHistory(history.concat([listCopy]));
      const code = index % 2 === 0?'X':'O'
      setXorO(index % 2 === 0?'X':'O')
      setTitle('next ' + code);
    } else {
      setList(Array(9).fill(''));
      setHistory(history.concat([Array(9).fill('')]));
      setIsDisabled(false);
      setXorO('X')
      setTitle('next X');
    }
  };

  const clearHistory = function(){
    setHistory(history.splice(-1))
  }

  const hanldOnClick = (index: number) => {
    if (list[index] !== '') return;
    const ary = list.map((item, i) => {
      return i === index ? XorO : item;
    });
    const code = XorO === 'X' ? 'O' : 'X';
    setHistory(history.concat([ary]));
    setList(ary);
    setXorO(code);
    setTitle('next ' + code);
  };

  return (
    <div className={style.wrapper}>
      <h4 className={style.title}>{title}</h4>
      <div className={style.content}>
        <Board
          disabled={isDisabled}
          hanldOnClick={hanldOnClick}
          list={list}
        ></Board>
      </div>
      <div className={style['button-wrapper']}>
        <button className={style.oper} onClick={() => resetGame(-1)}>
          重置
        </button>
        <button className={style.oper} onClick={() => clearHistory()}>
          清除历史
        </button>
        <dl className={style['history-list']}>
          <dt>历史记录：</dt>
          {history.map((item, index) => {
            return (
              <dd key={index}>
                <button onClick={() => resetGame(index)}>{index}</button>
              </dd>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
