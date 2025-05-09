import { Button, Div } from "$/comps";
import { useObject, useSignal, useComputedStyle, useStyle } from "$/utils";

export default function Test() {
  const divStyle = useStyle({
    color: "red",
  });

  function changeColor() {
    divStyle.update({
      "font-size": Math.max(14, 100 * Math.random()) + "px",
    });
  }
  let a = {};
  return (
    <>
      <Button {...Button.init()} onClick={changeColor} baseClass="">
        调整样式
      </Button>
      <Div {...Div.init()} style={divStyle}>
        测试页
      </Div>
      <div style={a}></div>
    </>
  );
}
