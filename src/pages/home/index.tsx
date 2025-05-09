import { For, onMount, Show } from "solid-js";
import * as api from "$/api/index.ts";
import { ILinkItem } from "./type";
import { useComputedClass, useComputed, useSignal } from "$/utils";
import { Button, Div, P, Loading, Blur } from "$/comps";

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
            "https://uploadstatic.mihoyo.com/contentweb/20210922/2021092217442572336.png"
          }
          class="w-screen h-screen flex flex-col text-black"
        >
          {/* 快捷方式 */}
          <Div
            {...Div.init()}
            class="overflow-auto px-4"
            onDblClick={toggleFullscreen}
          >
            <Div
              {...Div.init()}
              class="grid grid-cols-6 gap-x-8 gap-y-6 p-2"
              onClickSelf={handleHideClose}
            >
              <For each={links.get()}>
                {(item) => {
                  const title = item.key[1];
                  return (
                    <Div
                      {...Div.init()}
                      class={[
                        "p-2 inline-flex flex-col gap-2 whitespace-nowrap overflow-hidden items-center ",
                      ]}
                    >
                      <Div
                        {...Div.init()}
                        baseClass="relative p-2 inline-flex cursor-pointer"
                        class={useComputedClass(() =>
                          showClose.get() ? "shake" : "",
                        )}
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
                            baseClass={[
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
                        title={title.length > 10 ? title : ""}
                        baseClass={[
                          "px-2 truncate w-full text-center select-none",
                        ]}
                      >
                        {title}
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
