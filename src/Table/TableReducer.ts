import { DataEntry } from "../useData";

type SortDirection = "ascending" | "descending";

export const changeSort = (column: keyof DataEntry) => ({
  type: "CHANGE_SORT" as "CHANGE_SORT",
  column: column,
});
type ChangeSort = ReturnType<typeof changeSort>;

type State = {
  direction: SortDirection;
  column: keyof DataEntry;
};

function tableReducer(state: State, action: ChangeSort): State {
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
        column: action.column,
        direction: "ascending",
      };
    default:
      throw new Error(`action ${action.type} is not supported`);
  }
}

export default tableReducer;
