import React, { useState } from "react";
import * as ethers from "ethers";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { trackEvents } from "../utils/covalent";

const TokenTxHistory = () => {
  const [walletAddr, setWalletAddr] = useState(
    "0xA557572933cA2b5f644A0fAa6383D78Ec3D4E153"
  );
  const [tokenAddr, setTokenAddr] = useState(
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  );
  const [fetching, setFetchingEvents] = useState(false);
  const [txs, setTxs] = useState([]);

  const onSync = async () => {
    // before sync
    setTxs([]);
    setFetchingEvents(true);

    const events = await trackEvents({ walletAddr, tokenAddr });

    // after sync
    setFetchingEvents(false);
    setTxs(events);
  };

  const onChangeWalletAddr = (e) => {
    setWalletAddr(e.target.value);
  };

  const onChangeTokenAddr = (e) => {
    setTokenAddr(e.target.value);
  };

  return (
    <Container className="p-0">
      <h3 className="header">Get ERC20 transfers</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Wallet address</InputGroup.Text>
        <Form.Control
          disabled={fetching}
          placeholder="Wallet address"
          aria-label="WalletAddress"
          aria-describedby="basic-addon1"
          value={walletAddr}
          onChange={onChangeWalletAddr}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Token address</InputGroup.Text>
        <Form.Control
          disabled={fetching}
          placeholder="Token address"
          aria-label="TokenAddress"
          aria-describedby="basic-addon2"
          value={tokenAddr}
          onChange={onChangeTokenAddr}
        />
      </InputGroup>
      <Button
        variant="primary"
        disabled={
          !ethers.utils.isAddress(walletAddr) ||
          !ethers.utils.isAddress(tokenAddr)
        }
        onClick={onSync}
      >
        {fetching ? "Syncing ..." : "Sync"}
      </Button>

      <Container className="mt-3 px-0">
        {txs.length > 0 && (
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col xs={1}>No</Col>
                <Col xs={4}>From</Col>
                <Col xs={4}>To</Col>
                <Col xs={3}>Amount</Col>
              </Row>
            </ListGroup.Item>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {txs.map((tx, idx) => (
                <ListGroup.Item key={idx}>
                  <Row>
                    <Col xs={1}>{idx + 1}</Col>
                    <Col xs={4}>{tx.from}</Col>
                    <Col xs={4}>{tx.to}</Col>
                    <Col xs={3}>{tx.amount}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </div>
          </ListGroup>
        )}
      </Container>
    </Container>
  );
};

export default TokenTxHistory;
