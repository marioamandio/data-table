const uniDirectionalSort = <T extends unknown>(a: T, b: T): number => {
  // empty values always go to the bottom
  if (!a) return 1;
  if (!b) return 1;

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const sortData = <T extends unknown>(
  a: T,
  b: T,
  direction: "ascending" | "descending"
) => {
  if (direction === "ascending") {
    return uniDirectionalSort(a, b);
  }
  return uniDirectionalSort(b, a);
};

export const parseDate = (date: string): Date => {
  const [day, month, year] = date.split("/").map((item) => +item);
  return new Date(year, month - 1, day);
};
