import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import Publish from './shared/Publish';
import HarperDB from './shared/HarperDB';
import Client from './shared/Client';

function App() {
  const [publishState, setPublishState] = useState({ loading: false, time: 0 });
  const [subscribeState, setSubscribeState] = useState({ origin_insert_time: 0, updated_time: 0 });
  const [recordTimestamp, setRecordTimestamp] = useState(false);

  useEffect(() => {
    if (publishState.loading) {
      setRecordTimestamp(false);
    }
  }, [publishState.loading]);

  useEffect(() => {
    if (subscribeState.origin_insert_time !== 0 && (subscribeState.origin_insert_time < recordTimestamp || !recordTimestamp)) {
      setRecordTimestamp(subscribeState.origin_insert_time);
    }
    // eslint-disable-next-line
  }, [subscribeState.origin_insert_time, setRecordTimestamp]);

  return (
    <>
      <div id="app">
        <Navbar id="app-nav" dark fixed="top" expand="xs">
          <NavbarBrand>
            <div id="logo" title="Go to Organizations Home" />
          </NavbarBrand>
          <h5 className="text-white text-nowrap">ActiveSync Demo</h5>
        </Navbar>
        <div id="app-container">
          <Publish publishState={publishState} setPublishState={setPublishState} />
          <HarperDB />
          <Client setSubscribeState={setSubscribeState} recordTimestamp={recordTimestamp} />
        </div>
      </div>
      <div id="app-bg-color" />
      <div id="app-bg-dots" />
    </>
  );
}

export default App;
