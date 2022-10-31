import React, { useState } from "react";
import * as ethers from "ethers";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getPairHourData } from "../utils/subgraph";
import { formatTimestampToUtc } from "../utils/time";
import { formatNumber } from "../utils/number";

const UniV2PairInfo = () => {
  const [pairAddr, setPairAddr] = useState(
    "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
  );
  const [startTime, setStartTime] = useState(1655230230);
  const [records, setRecords] = useState([]);
  const [fetching, setFetchingEvents] = useState(false);

  const fetchData = async (startTime) => {
    return await getPairHourData({
      pairAddr,
      hourStart: startTime,
    });
  };

  const onSync = async () => {
    // before sync
    setRecords([]);
    setFetchingEvents(true);

    // sync handling
    const currentTime = Date.now();
    const interval = 3600 * 1000;
    let recordsList = [];
    for (let i = Number(startTime); i <= currentTime / 1000; i += interval) {
      recordsList = [...recordsList, fetchData(i)];
    }

    let _records = [];
    (await Promise.all(recordsList)).map((item) => {
      _records = [..._records, ...item];
      return item;
    });

    // after sync
    setFetchingEvents(false);
    setRecords([..._records]);
  };

  const onChangePairAddr = (e) => {
    setPairAddr(e.target.value);
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  return (
    <Container className="p-0">
      <h3 className="header">Fetch pair data from The Graph</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          Uniswap LP Pair address
        </InputGroup.Text>
        <Form.Control
          disabled={fetching}
          placeholder="for i.e: 0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
          aria-label="pairAddr"
          aria-describedby="basic-addon1"
          value={pairAddr}
          onChange={onChangePairAddr}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          Start time to fetch from
        </InputGroup.Text>
        <Form.Control
          disabled={fetching}
          placeholder="for i.e: 1665210947"
          aria-label="startTime"
          aria-describedby="basic-addon2"
          value={startTime}
          onChange={onChangeStartTime}
        />
      </InputGroup>
      <Button
        variant="primary"
        disabled={!ethers.utils.isAddress(pairAddr) || Number(startTime) <= 0}
        onClick={onSync}
      >
        {fetching ? "Syncing ..." : "Sync"}
      </Button>

      <Container className="mt-3 px-0">
        {records.length > 0 && (
          <ListGroup>
            <ListGroup.Item>
              <Row
                className="align-items-center"
                style={{ textAlign: "center" }}
              >
                <Col xs={1}>No</Col>
                <Col xs={1}>Time</Col>
                <Col xs={2}>Reserve0</Col>
                <Col xs={1}>Reserve1</Col>
                <Col xs={1}>Reserve USD</Col>
                <Col xs={2}>Hourly Volume Token0</Col>
                <Col xs={2}>Hourly Volume Token1</Col>
                <Col xs={1}>Hourly Volume USD</Col>
                <Col xs={1}>Hourly Txs</Col>
              </Row>
            </ListGroup.Item>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {!fetching &&
                records
                  .sort((a, b) => (a.hourStartUnix > b.hourStartUnix ? 1 : -1))
                  .map((record, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row style={{ textAlign: "center" }}>
                        <Col xs={1}>{idx + 1}</Col>
                        <Col xs={1}>
                          {formatTimestampToUtc(record.hourStartUnix)}
                          {/* {record.hourStartUnix} */}
                        </Col>
                        <Col xs={2}>{formatNumber(record.reserve0)}</Col>
                        <Col xs={1}>{formatNumber(record.reserve1)}</Col>
                        <Col xs={1}>{formatNumber(record.reserveUSD)}</Col>
                        <Col xs={2}>
                          {formatNumber(record.hourlyVolumeToken0)}
                        </Col>
                        <Col xs={2}>
                          {formatNumber(record.hourlyVolumeToken1)}
                        </Col>
                        <Col xs={1}>{formatNumber(record.hourlyVolumeUSD)}</Col>
                        <Col xs={1}>{record.hourlyTxns}</Col>
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

export default UniV2PairInfo;
