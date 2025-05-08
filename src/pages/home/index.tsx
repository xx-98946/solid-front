import { For, onMount, Show } from "solid-js";
import * as api from "$/api/index.ts";
import { ILinkItem } from "./type";
import { useClass, useComputed, useSignal } from "$/utils";
import { Button, Div, P, Loading, Blur } from "$/comps";
import { ClassNameValue } from "tailwind-merge";

export default function Nav() {
  const links = useSignal([] as ILinkItem[]);
  const showClose = useSignal(false);
  const loading = useSignal(false);

  async function init() {
    loading.set(true);
    const data = await api.apiKvQueryAll();
    loading.set(false);
    links.set(data);
  }

  async function handleDelete(e: MouseEvent, key: string[]) {
    e.stopImmediatePropagation();
    const res = await api.apiKvRemove(key);
    links.set((values) => {
      const newValues = values.filter((item) => item.key != key);
      return newValues;
    });

    console.log(res);
  }

  function toProxyUrl(url: string) {
    const param = encodeURI(url);
    return `/api/proxy?url=` + param;
  }

  function handleGoLink(url: string) {
    window.open(url, "_blank");
  }

  function handleShowClose() {
    showClose.set(true);
  }

  function handleHideClose() {
    showClose.set(false);
  }

  function toRollClass(length: number) {
    if (length > 20) {
      return "roll-20";
    }
    if (length > 10) {
      return "roll-10";
    }
    return "";
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  }

  onMount(init);
  return (
    <>
      <Show
        when={!loading.get()}
        fallback={
          <Div
            {...Div.init()}
            class="size-full flex justify-center items-center h-[60vh] text-center"
          >
            <Loading {...Loading.init()}></Loading>
          </Div>
        }
      >
        <div>{showClose.get()}</div>
        <Blur
          {...Blur.init()}
          src={
            "https://picx.zhimg.com/v2-1d69c904759f7e5085873840922dba35_r.jpg?source=1def8aca"
          }
          class="w-screen h-screen flex flex-col"
        >
          {/* 快捷方式 */}
          <Div
            {...Div.init()}
            class=" overflow-auto flex-11/12"
            onDblClick={toggleFullscreen}
          >
            <Div
              {...Div.init()}
              class="grid grid-cols-7 gap-x-8 gap-y-6 p-2"
              onClickSelf={handleHideClose}
            >
              <For each={links.get()}>
                {(item) => {
                  return (
                    <Div
                      {...Div.init()}
                      class={[
                        "p-2 inline-flex flex-col gap-2 whitespace-nowrap overflow-hidden items-center",
                      ]}
                      title={item.key[1]}
                    >
                      <Div
                        {...Div.init()}
                        baseClass="relative p-2 inline-flex cursor-pointer"
                        class={useClass(() => (showClose.get() ? "shake" : ""))}
                        onClick={() => handleGoLink(item.value.link)}
                        onPress={handleShowClose}
                      >
                        <img
                          class="size-16 rounded-xl"
                          alt=""
                          src={item.value.icon}
                        />
                        <Show when={showClose.get()}>
                          <Button
                            {...Button.init()}
                            class={[
                              "absolute right-0 top-0 bg-white rounded-full border size-4 flex items-center justify-center p-1 text-xs cursor-pointer",
                            ]}
                            onClick={(e) => handleDelete(e, item.key)}
                          >
                            X
                          </Button>
                        </Show>
                      </Div>
                      <P
                        {...P.init()}
                        class={[
                          toRollClass(item.key[1].length),
                          "px-2 text-white",
                        ]}
                      >
                        {item.key[1]}
                      </P>
                    </Div>
                  );
                }}
              </For>
            </Div>
          </Div>
        </Blur>
      </Show>
    </>
  );
}
