import { Base, IBaseProps } from "./Base";

interface IDivProps extends IBaseProps {}
export function Div(props: IDivProps) {
  return <Base {...props} component={"div"}></Base>;
}

export default Div;
