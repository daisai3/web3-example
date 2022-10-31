import React from "react";

import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TokenTxHistory from "./TokenTxHistory";
import UniV2PairInfo from "./UniV2PairInfo";

import "./index.css";

const App = () => {
  return (
    <Container className="mt-5">
      <Tabs
        defaultActiveKey="pairInfo"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="erc20" title="ERC20">
          <TokenTxHistory />
        </Tab>
        <Tab eventKey="pairInfo" title="PairInfo">
          <UniV2PairInfo />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
