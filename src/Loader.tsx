import React from "react";
import { Segment, Loader } from "semantic-ui-react";

const LocalLoader = () => {
  return (
    <Segment>
      <Loader size="large">Loading</Loader>
    </Segment>
  );
};

export default LocalLoader;
