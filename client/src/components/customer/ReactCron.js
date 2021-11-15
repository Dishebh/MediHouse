import React from 'react';
import Cron from 'react-js-cron-mui';

function ReactCron({ value, customSetValue, onError }) {
  return <Cron value={value} setValue={customSetValue} onError={onError} />;
}

export default ReactCron;
