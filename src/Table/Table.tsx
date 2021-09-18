import React, { useMemo } from "react";
import { Table } from "semantic-ui-react";
import { Data } from "../useData";
import { parseDate, sortData } from "../utils";
import withData from "../WithData";
import ListItem from "./ListItem";
import tableReducer, { changeSort } from "./TableReducer";

const TablePage: React.VoidFunctionComponent<{ data: Data }> = ({ data }) => {
  const [state, dispatch] = React.useReducer(tableReducer, {
    direction: "ascending",
    column: "date_of_birth",
  });

  const sortedData = useMemo(() => {
    if (state.column === "date_of_birth") {
      return data.sort((a, b) =>
        sortData(
          parseDate(a["date_of_birth"]),
          parseDate(b["date_of_birth"]),
          state.direction
        )
      );
    }

    return data.sort((a, b) => {
      return sortData(a[state.column], b[state.column], state.direction);
    });
  }, [state.column, state.direction, data]);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={state.column === "id" ? state.direction : undefined}
            onClick={() => {
              dispatch(changeSort("id"));
            }}
          >
            ID
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "email" ? state.direction : undefined}
            onClick={() => {
              dispatch(changeSort("email"));
            }}
          >
            Email
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={
              state.column === "date_of_birth" ? state.direction : undefined
            }
            onClick={() => {
              dispatch(changeSort("date_of_birth"));
            }}
          >
            Date of birth
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "first_name" ? state.direction : undefined}
            onClick={() => {
              dispatch(changeSort("first_name"));
            }}
          >
            first name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "last_name" ? state.direction : undefined}
            onClick={() => {
              dispatch(changeSort("last_name"));
            }}
          >
            last name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "salary" ? state.direction : undefined}
            onClick={() => {
              dispatch(changeSort("salary"));
            }}
          >
            salary
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "industry" ? state.direction : undefined}
            onClick={() => {
              dispatch(changeSort("industry"));
            }}
          >
            industry
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((item, idx) => (
          <Table.Row key={idx}>
            <ListItem item={item} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default withData(TablePage);
