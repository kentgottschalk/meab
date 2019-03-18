import React from 'react';
import './App.css';
import Header from './sections/Header';
import Tabs from './components/Tabs';
import Documentation from './sections_backend/Documentation';
import EditFactions from './sections_backend/EditFactions';
import EditOptions from './sections_backend/EditOptions';
import EditUnits from './sections_backend/EditUnits';
import Statistics from './sections_backend/Statistics';

const Backend = () => {
  return (
    <div className="container">
      <Header header="Backend" subheader="Middle Earth" />
      <div>
        <Tabs>
          <div label="Factions">
            <EditFactions />
          </div>
          <div label="Units">
            <EditUnits />
          </div>
          <div label="Options">
            <EditOptions />
          </div>
          <div label="Statistics">
            <Statistics />
          </div>
          <div label="Documentation">
            <Documentation />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Backend;
