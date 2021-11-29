/*
 * @Description:
 * @Author: Friends233
 */

export default function Square(props: {
  state: string;
  hanldOnClick(): void;
  disabled:boolean;
}) {
  return (
    <button disabled={props.disabled} onClick={() => props.hanldOnClick()}>
      {props.state}
    </button>
  );
}
