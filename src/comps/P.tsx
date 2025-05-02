import { Base, IBaseProps } from "./Base";

interface IPProps extends IBaseProps {}
export function P(props: IPProps) {
  return <Base {...props} component={"p"}></Base>;
}

export default P;
