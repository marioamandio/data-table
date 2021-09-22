import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import Charts from "./Charts";
import Table from "./Table/Table";
import { Data } from "./useData";
import withData from "./WithData";

type Routes = "table" | "charts";

const App: React.VoidFunctionComponent<{ data: Data }> = ({ data }) => {
  let history = useHistory();

  function handleRouteChange(route: Routes) {
    history.push(`/${route}`);
  }

  return (
    <Container>
      <Menu secondary>
        <Menu.Item
          name="table"
          active
          onClick={() => handleRouteChange("table")}
        />
        <Menu.Item
          name="charts"
          active
          onClick={() => handleRouteChange("charts")}
        />
      </Menu>
      <Switch>
        <Route exact path="/charts" render={() => <Charts data={data} />} />
        <Route path="/" render={() => <Table data={data} />} />
      </Switch>
    </Container>
  );
};

export default withData(App);
