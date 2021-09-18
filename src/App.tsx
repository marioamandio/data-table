import React from "react";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import Charts from "./Charts";
import Table from "./Table/Table";
import useData from "./useData";
import withData from "./WithData";

type Routes = "table" | "charts";

function App() {
  let history = useHistory();

  function handleRouteChange(route: Routes) {
    history.push(`/${route}`);
  }

  return (
    <Container>
      <Menu secondary>
        <Menu.Item
          name="table"
          active={true}
          onClick={(params) => {
            handleRouteChange("table");
          }}
        />
        <Menu.Item
          name="charts"
          active={false}
          onClick={() => {
            handleRouteChange("charts");
          }}
        />
      </Menu>
      <Switch>
        <Route path="/charts" component={Charts} />
        <Route path="/" component={Table} />
      </Switch>
    </Container>
  );
}

export default App;
