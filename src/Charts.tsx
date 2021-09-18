import React from "react";
import { Data } from "./useData";
import withData from "./WithData";

const Charts: React.VoidFunctionComponent<{ data: Data }> = () => {
  return <div>this is the charts component</div>;
};

export default withData(Charts);
