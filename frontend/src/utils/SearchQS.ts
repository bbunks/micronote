type SearchItem = "attachment" | "tag" | "contains";

interface SearchObject {
  type: SearchItem;
  value: string;
}

function toSearchString(input: SearchObject[]) {
  return input
    .reduce((p, i) => {
      return p + i.type + "=" + i.value + "&";
    }, "")
    .slice(0, -1);
}

function fromSearchString(input: string): SearchObject[] {
  const split = input.split("&");
  return split.map((i) => {
    const term = i.split("=");
    return {
      type: term[0] as SearchItem,
      value: term[1],
    };
  });
}
