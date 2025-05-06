import { Base, Div, IBaseAttrs, IBaseEvents } from "$/comps";
import { IType, useData } from "$/utils";

type IBlurType = IType<
  IBaseAttrs<{
    src: string;
  }>,
  IBaseEvents<{}>
>;

export function Blur(props: IBlurType["Props"]) {
  const data = useData<IBlurType["Attrs"], IBlurType["Events"]>(props);

  return (
    <Div {...data} baseClass={["relative"]}>
      <img src={data.src.get()} class="absolute w-full h-full" />
      {/* 蒙层 */}
      <Div
        {...Div.config}
        class="absolute size-full z-in backdrop-blur-sm bg-gray-200/10"
      ></Div>
      {/*  */}
      <Div {...Div.config} class="absolute size-full z-20  overflow-auto">
        {data.children.get()}
      </Div>
    </Div>
  );
}

Blur.config = {
  ...Base.config,
  src: "",
} as IBlurType["Props"];

// import { ISignalProp, useSignal } from "$/utils";
// import { splitProps } from "solid-js";
// import { Base, Div, IBaseProps } from "./";

// interface IBlurProps extends IBaseProps {
//   src: ISignalProp<string>;
// }
// export function Blur(props: IBlurProps) {
//   const [known, attrs] = splitProps(props, ["src", "class"]);
//   const src = useSignal(known.src);
//   return (
//     <Base {...attrs} class={["relative", known.class]}>
//       <img src={src.get()} class="absolute w-full h-full" />
//       <Div class="absolute size-full z-in backdrop-blur-sm bg-gray-200/10"></Div>
//       <Div class="absolute size-full z-20  overflow-auto">{attrs.children}</Div>
//     </Base>
//   );
// }
