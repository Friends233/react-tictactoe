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
    if (index !== -1) {
      setList(history[index].splice(0));
      setHistory(history.concat([history[index].splice(0)]));
    } else {
      setList(Array(9).fill(''));
      setHistory(history.concat([Array(9).fill('')]));
      setIsDisabled(false);
      setTitle('next X');
    }
  };

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
        <input className={style.oper} type="text" />
        <button className={style.oper} onClick={() => resetGame(-1)}>重置</button>
        <button className={style.oper} >上一步</button>
        <button className={style.oper} >下一步</button>
        <dl className={style['history-list']}>
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
