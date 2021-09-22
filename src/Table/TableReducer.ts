import { DataEntry } from "../useData";

export type SortDirection = "ascending" | "descending";

export const changeSort = (column: keyof DataEntry) => ({
  type: "CHANGE_SORT" as "CHANGE_SORT",
  column,
});

export const lookupNameChanged = (name: string) => ({
  type: "LOOKUP_NAME_CHANGED" as "LOOKUP_NAME_CHANGED",
  name,
});

export const numberOfItemsPerPageChanged = (itemsPerPage: number) => ({
  type: "NUMBER_OF_ITEMS_PER_PAGE_CHANGED" as "NUMBER_OF_ITEMS_PER_PAGE_CHANGED",
  itemsPerPage,
});

export const currentPageChanged = (currentPage: number) => ({
  type: "CURRENT_PAGE_CHANGED" as "CURRENT_PAGE_CHANGED",
  currentPage,
});

type State = {
  direction: SortDirection;
  column: keyof DataEntry;
  lookupName: string;
  currentPage: number;
  itemsPerPage: number;
};

type Actions =
  | ReturnType<typeof changeSort>
  | ReturnType<typeof lookupNameChanged>
  | ReturnType<typeof numberOfItemsPerPageChanged>
  | ReturnType<typeof currentPageChanged>;

function tableReducer(state: State, action: Actions): State {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        ...state,
        column: action.column,
        direction: "ascending",
      };

    case "LOOKUP_NAME_CHANGED":
      return {
        ...state,
        lookupName: action.name,
      };

    case "NUMBER_OF_ITEMS_PER_PAGE_CHANGED":
      return {
        ...state,
        itemsPerPage: action.itemsPerPage,
      };

    case "CURRENT_PAGE_CHANGED":
      return {
        ...state,
        currentPage: action.currentPage,
      };

    default:
      throw new Error(`action ${action} is not supported`);
  }
}

export default tableReducer;
