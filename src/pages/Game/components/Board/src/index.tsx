/*
 * @Description:
 * @Author: Friends233
 */
import Square from '../../Square';
interface MyProps {
  list: string[];
  hanldOnClick(index: number): void;
  disabled:boolean;
}
export default function Board(props: MyProps) {
  const renderSquare = (i: string, index: number) => {
    return (
      <Square
        hanldOnClick={() => props.hanldOnClick(index)}
        key={index}
        state={i}
        disabled={props.disabled}
      ></Square>
    );
  };
  return (
    <div>
      {props.list.map((item, index) => {
        return renderSquare(item, index);
      })}
    </div>
  );
}
