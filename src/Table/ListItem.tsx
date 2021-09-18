import React from "react";
import { Table } from "semantic-ui-react";
import { DataEntry } from "../useData";

const ListItem: React.VoidFunctionComponent<{ item: DataEntry }> = ({
  item,
}) => {
  return (
    <>
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>{item.email}</Table.Cell>
      <Table.Cell>{item.date_of_birth}</Table.Cell>
      <Table.Cell>{item.first_name}</Table.Cell>
      <Table.Cell>{item.last_name}</Table.Cell>
      <Table.Cell>{item.salary}</Table.Cell>
      <Table.Cell>{item.industry}</Table.Cell>
    </>
  );
};

export default ListItem;
