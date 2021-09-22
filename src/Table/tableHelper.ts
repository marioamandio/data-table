import { Data, DataEntry } from "../useData";
import { parseDate, sortData } from "../utils";
import { SortDirection } from "./TableReducer";

const defaultToString = (name: string | undefined) => name ?? "";

export const dataSorter = (
  data: Data,
  column: keyof DataEntry,
  direction: SortDirection
) => {
  if (column === "date_of_birth") {
    return data.sort((a, b) =>
      sortData(
        parseDate(a["date_of_birth"]),
        parseDate(b["date_of_birth"]),
        direction
      )
    );
  }

  return data.sort((a, b) => {
    return sortData(a[column], b[column], direction);
  });
};

export const getSuggestedFields = (data: Data) => {
  return data.map((item) => `${item.first_name} ${item.last_name}`);
};

export const filterByName = (lookupName: string, data: Data) => {
  if (!lookupName) return data;
  return data.filter((item) => {
    const loweredCaseLookup = lookupName.toLocaleLowerCase().replace(" ", "");
    const fullName = `${defaultToString(item.first_name)}${defaultToString(
      item.first_name
    )}`.replace(" ", "");
    return fullName.toLocaleLowerCase().includes(loweredCaseLookup);
  });
};

export const dataSlicer = (
  data: Data,
  currentPage: number,
  itemsPerPage: number
) => {
  const currentPageDataIndex = currentPage * itemsPerPage;
  return data.slice(currentPageDataIndex, currentPageDataIndex + itemsPerPage);
};

export const getNumericOptions = () =>
  Array.from({ length: 21 }).map((_, idx) => ({
    key: idx + 5,
    value: idx + 5,
    text: idx + 5,
  }));
