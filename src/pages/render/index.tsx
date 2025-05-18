import * as compList from "$/comps";
import { Div, Button } from "$/comps";
import { useSignal } from "$/utils";
import { For } from "solid-js";

type IBlockKey = keyof typeof compList;
interface IBlock {
  key: IBlockKey; // 组件
  props: Object; // 属性
}
export default function Render() {
  // 左侧模版数据
  const templateList: IBlock[] = Object.entries(compList).map(([key, Comp]) => {
    return {
      props: Comp.init(),
      key: key as IBlockKey,
    };
  });

  //   中间渲染器数据
  const blockList = useSignal<IBlock[]>([]);

  function handleAddBlock(block: IBlock) {
    blockList.set([...blockList.get(), block]);
  }

  return (
    <section class="w-screen h-screen flex flex-col overflow-hidden border">
      <h1 class="text-2xl text-center flex-0 h-auto">渲染器</h1>
      <Div {...Div.init()} class="grid grid-cols-3 flex-1 min-h-0">
        <Div {...Div.init()} class="border">
          {/* @ts-ignore */}
          <For each={templateList}>
            {(item) => (
              <Button {...Button.init()} onClick={() => handleAddBlock(item)}>
                {item.key}
              </Button>
            )}
          </For>
        </Div>
        <Div {...Div.init()} class="border border-red-500 overflow-auto h-full">
          <Div {...Div.init()} class="h-full">
            <For each={blockList.get()}>
              {(item) => {
                // 组件
                const TempComp = compList[item.key] as any;
                return <TempComp {...item.props} />;
              }}
            </For>
          </Div>
        </Div>
        <Div {...Div.init()} class="border">
          右
        </Div>
      </Div>
    </section>
  );
}
