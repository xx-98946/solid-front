export async function apiKvQueryAll() {
  const res = await fetch("/api/kv/queryAll", {
    method: "POST",
    body: JSON.stringify({ key: [] }),
    headers: {
      "Accept-Encoding": "identity", // 明确不接受任何压缩
    },
  });
  const data = await res.json();
  return data;
}

export async function apiKvRemove(key: string[]) {
  const res = await fetch("/api/kv/remove", {
    method: "POST",
    body: JSON.stringify({ key }),
    headers: {
      "Accept-Encoding": "identity", // 明确不接受任何压缩
    },
  });
  const data = await res.json();
  return data;
}
