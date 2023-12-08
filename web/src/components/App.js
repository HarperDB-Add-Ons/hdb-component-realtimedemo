import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import useAsyncEffect from 'use-async-effect';

import Publish from './shared/Publish';
import HarperDB from './shared/HarperDB';
import Client from './shared/Client';
import Pricing from './shared/Pricing';

import config from '../config';

let controller;

function App() {
  const [publishState, setPublishState] = useState({ loading: false, time: 0 });
  const [subscribeState, setSubscribeState] = useState({ origin_insert_time: 0, updated_time: 0 });
  const [recordTimestamp, setRecordTimestamp] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

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

  useAsyncEffect(async () => {
    try {
      controller = new AbortController();
      const url = `http${config.hdbSSL ? 's' : ''}://${config.hdbUrl}/${config.hdbResource}`;
      const response = await fetch(url, {
        signal: controller.signal,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: config.hdbAuth },
      });
      await response.json();
      setAuthenticated(true);
    } catch (e) {
      // eslint-disable-next-line
      console.log('error getting records');
    }
    return () => controller.abort();
  }, []);

  return (
    <>
      <div id="app">
        <Navbar id="app-nav" dark fixed="top" expand="xs">
          <NavbarBrand>
            <div id="logo" title="Go to Organizations Home" />
          </NavbarBrand>
          <h5 className="text-white text-nowrap">EdgeTL Demo</h5>
        </Navbar>
        <div id="app-container">
          <Pricing />
          <Publish publishState={publishState} setPublishState={setPublishState} />
          <HarperDB />
          <Client setSubscribeState={setSubscribeState} recordTimestamp={recordTimestamp} authenticated={authenticated} />
        </div>
      </div>
      <div id="app-bg-color" />
      <div id="app-bg-dots" />
    </>
  );
}

export default App;
