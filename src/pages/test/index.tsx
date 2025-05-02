import { Button, Div } from "$/comps";
import Base from "$/comps/Base";
import { useComputed, useSignal } from "$/utils";
export default function Test() {
  const count = useSignal(1);
  const double = useComputed(() => count.get() * 2);
  const trible = useComputed(() => count.get() + double.get());

  function handleClick(e: MouseEvent) {
    console.log(e);
    count.set(count.get() + 1);
  }

  function handlePress() {
    console.log("??press");
  }

  function handleClickChild(e: MouseEvent) {
    e.stopImmediatePropagation();
    console.log("??child", e);
  }

  return (
    <div>
      <Div onClick={handleClick} class="inline-block  shake">
        count:{count.get()}
        <Button onClickSelf={handleClickChild}>按钮2</Button>
      </Div>
      <div>double:{double.get()}</div>
      <div>trible:{trible.get()}</div>
      <Base class="border p-2" onClick={handleClick} onPress={handlePress}>
        测试组件
      </Base>
    </div>
  );
}
