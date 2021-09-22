import React, { useEffect, useMemo } from "react";
import {
  Dropdown,
  Label,
  Menu,
  Pagination,
  Search,
  Table,
} from "semantic-ui-react";
import { Data } from "../useData";
import ListItem from "./ListItem";
import {
  dataSlicer,
  dataSorter,
  filterByName,
  getNumericOptions,
} from "./tableHelper";
import tableReducer, {
  changeSort,
  currentPageChanged,
  lookupNameChanged,
  numberOfItemsPerPageChanged,
} from "./TableReducer";

const TablePage: React.VoidFunctionComponent<{ data: Data }> = ({ data }) => {
  const [state, dispatch] = React.useReducer(tableReducer, {
    direction: "ascending",
    column: "date_of_birth",
    lookupName: "",
    currentPage: 0,
    itemsPerPage: 10,
  });

  const filteredByLookupSearch = useMemo(
    () => filterByName(state.lookupName, data),
    [data, state.lookupName]
  );

  const sortedData = useMemo(
    () => dataSorter(filteredByLookupSearch, state.column, state.direction),
    [state.column, state.direction, filteredByLookupSearch]
  );

  const totalAmountOfPages = useMemo(() => {
    return Math.ceil(filteredByLookupSearch.length / state.itemsPerPage);
  }, [state.itemsPerPage, filteredByLookupSearch]);

  const slicedByPageAllowance = useMemo(
    () => dataSlicer(sortedData, state.currentPage, state.itemsPerPage),
    [
      state.itemsPerPage,
      state.currentPage,
      state.column,
      state.direction,
      sortedData,
    ]
  );

  useEffect(() => {
    dispatch(currentPageChanged(0));
  }, [sortedData, state.itemsPerPage]);

  return (
    <>
      <Menu>
        <Menu.Item>
          <Search
            // onResultSelect={(e, selectedResult) => {
            //   console.log(e, selectedResult);
            //   dispatch(
            //     lookupNameChanged(
            //       `${selectedResult.result.first_name} ${selectedResult.result.last_name}` ??
            //         ""
            //     )
            //   );
            // }}
            onSearchChange={(_, searchQuery) => {
              dispatch(lookupNameChanged(searchQuery.value ?? ""));
            }}
            resultRenderer={(props) => (
              <Label content={`${props.first_name} ${props.last_name}`} />
            )}
            results={filteredByLookupSearch.slice(0, 5)}
            value={state.lookupName}
          />
        </Menu.Item>
        <Menu.Item>
          <Pagination
            activePage={state.currentPage + 1}
            onPageChange={(e, { activePage }) => {
              if (typeof activePage === "number") {
                dispatch(currentPageChanged(activePage - 1));
              }
            }}
            totalPages={totalAmountOfPages}
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Dropdown
            value={state.itemsPerPage}
            onChange={(e, option) => {
              if (typeof option.value === "number") {
                dispatch(numberOfItemsPerPageChanged(option.value));
              }
            }}
            options={getNumericOptions()}
          />
        </Menu.Item>
      </Menu>

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
              sorted={
                state.column === "first_name" ? state.direction : undefined
              }
              onClick={() => {
                dispatch(changeSort("first_name"));
              }}
            >
              first name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                state.column === "last_name" ? state.direction : undefined
              }
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
          {slicedByPageAllowance.map((item) => (
            <Table.Row key={item.id}>
              <ListItem item={item} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default TablePage;
