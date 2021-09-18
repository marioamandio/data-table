import React, { ComponentType } from "react";
import ErrorComp from "./Error";
import LocalLoader from "./Loader";
import useData, { Data } from "./useData";

function withData<T>(Comp: ComponentType<T>) {
  return (hocProps: Omit<T, "data">) => {
    const { data, loading, error } = useData();

    if (error) {
      return <ErrorComp />;
    }

    if (loading) {
      return <LocalLoader />;
    }

    return <Comp {...(hocProps as T)} data={data} />;
  };
}

export default withData;
