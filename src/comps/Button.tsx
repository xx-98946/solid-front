import { Base, IBaseProps } from "./Base";

interface IButtonProps extends IBaseProps {}
export function Button(props: IButtonProps) {
  return <Base {...props} component={"button"}></Base>;
}

export default Button;
