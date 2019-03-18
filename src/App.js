import React, { Component } from 'react';
import produce from 'immer';
import './App.css';
import Header from './sections/Header';
import Menu from './sections/Menu';
import ArmyBasics from './sections/ArmyBasics';
import AddWarband from './sections/AddWarband';
import Warband from './sections/Warband';
import Stats from './sections/Stats';
import Data from './data.json';

const _ = require('lodash');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      side: '',
      factions: Data.factions,
      unitdata: Data.units,
      warbands: [],
    };
    this.selectAlign = this.selectAlign.bind(this);
    this.selectPoints = this.selectPoints.bind(this);
    this.addWarband = this.addWarband.bind(this);
    this.deleteWarband = this.deleteWarband.bind(this);
    this.addUnit = this.addUnit.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.addWarrior = this.addWarrior.bind(this);
    this.deleteWarrior = this.deleteWarrior.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.toggleOption = this.toggleOption.bind(this);
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.exportToPdf = this.exportToPdf.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentWillMount() {
    const demo = localStorage.getItem('demo');
    this.setState(JSON.parse(demo));
  }

  selectAlign(event) {
    this.setState({ side: event.target.value });
  }

  selectPoints(event) {
    this.setState({ points: Number(event.target.value) });
  }

  addWarband(event) {
    this.setState({
      warbands: [
        ...this.state.warbands,
        { warbandId: _.uniqueId('warbandId_'), faction: Number(event.target.value), units: [] },
      ],
    });
  }

  deleteWarband(event) {
    const { warbands } = this.state;
    const filteredArray = warbands.filter((item, index) => index !== Number(event.target.value));
    this.setState({ warbands: filteredArray });
  }

  addUnit(event) {
    const warband = event.target.dataset.id;
    const { unitdata } = this.state;
    const unit = unitdata.filter(item => item.uid === Number(event.target.value));
    const options = [];
    for (let i = 0; i < unit[0].options.length; i += 1) {
      options.push(0);
    }
    this.setState(
      produce(draft => {
        draft.warbands[warband].units.push({
          unitId: _.uniqueId('unitId_'),
          uid: unit[0].uid,
          number: 1,
          options,
        });
      })
    );
  }

  deleteUnit(event) {
    const warband = event.target.dataset.id;
    const unit = event.target.value;
    this.setState(
      produce(draft => {
        delete draft.warbands[warband].units[unit];
      })
    );
  }

  addWarrior(event) {
    const warband = event.target.dataset.id;
    const unit = event.target.value;
    this.setState(
      produce(draft => {
        if (draft.warbands[warband].units[unit].number < 16) {
          draft.warbands[warband].units[unit].number += 1;
        }
      })
    );
  }

  deleteWarrior(event) {
    const warband = event.target.dataset.id;
    const unit = event.target.value;
    this.setState(
      produce(draft => {
        if (draft.warbands[warband].units[unit].number > 1) {
          draft.warbands[warband].units[unit].number -= 1;
        }
      })
    );
  }

  addOption(event) {
    const warbandIndex = event.target.dataset.warbandindex;
    const unitIndex = event.target.dataset.unitindex;
    const optionIndex = event.target.value;
    this.setState(
      produce(draft => {
        draft.warbands[warbandIndex].units[unitIndex].options[optionIndex] += 1;
      })
    );
  }

  deleteOption(event) {
    const warbandIndex = event.target.dataset.warbandindex;
    const unitIndex = event.target.dataset.unitindex;
    const optionIndex = event.target.value;
    this.setState(
      produce(draft => {
        draft.warbands[warbandIndex].units[unitIndex].options[optionIndex] -= 1;
      })
    );
  }

  toggleOption(event) {
    const warbandIndex = event.target.dataset.warbandindex;
    const unitIndex = event.target.dataset.unitindex;
    const optionIndex = event.target.value;
    this.setState(
      produce(draft => {
        if (draft.warbands[warbandIndex].units[unitIndex].options[optionIndex] === 0) {
          draft.warbands[warbandIndex].units[unitIndex].options[optionIndex] += 1;
        } else {
          draft.warbands[warbandIndex].units[unitIndex].options[optionIndex] -= 1;
        }
      })
    );
  }

  load(event) {
    const key = localStorage.getItem(event.target.load.value);
    this.setState(JSON.parse(key));
  }

  save(event) {
    event.preventDefault();
    // const key = 'save_'.concat(event.target.name.value);
    const key = event.target.name.value;
    localStorage.setItem(key, JSON.stringify(this.state));
  }

  copyToClipboard() {
    console.log(this.state);
  }

  exportToPdf() {
    console.log(this.state);
  }

  clearState() {
    this.setState({
      points: 0,
      side: undefined,
      warbands: [],
    });
  }

  render() {
    const { factions, points, side, unitdata, warbands } = this.state;

    const armyModels = warbands.reduce(function armyModels(a, b) {
      b.units.forEach(function warbandModels(c) {
        a += c.number;
      });
      return a;
    }, 0);

    const armyPoints = warbands.reduce(function armyPoints(a, b) {
      b.units.forEach(function warbandModels(c) {
        const filteredUnitData = unitdata.filter(item => item.uid === c.uid)[0];
        a += c.number * filteredUnitData.points;
      });
      return a;
    }, 0);

    const armyBowCount = warbands.reduce(function armyOptionPoints(a, b) {
      b.units.forEach(function warbandOptionPoints(c) {
        const filteredUnitData = unitdata.filter(item => item.uid === c.uid)[0];
        c.options.forEach(function unitOptionPoints(d, index) {
          const e = filteredUnitData.options[index].name === 'Bow' ? 1 : 0;
          a += d * e;
        });
      });
      return a;
    }, 0);

    const armyOptionPoints = warbands.reduce(function armyOptionPoints(a, b) {
      b.units.forEach(function warbandOptionPoints(c) {
        const filteredUnitData = unitdata.filter(item => item.uid === c.uid)[0];
        c.options.forEach(function unitOptionPoints(d, index) {
          const e = filteredUnitData.options[index].points;
          a += d * e;
        });
      });
      return a;
    }, 0);

    return (
      <div className="container">
        <Header header="Army Builder" subheader="Middle Earth" />
        <Menu
          load={this.load}
          save={this.save}
          copyToClipboard={this.copyToClipboard}
          exportToPdf={this.exportToPdf}
          clearState={this.clearState}
          army={this.state}
        />
        <ArmyBasics
          side={side}
          points={points}
          warbands={warbands}
          selectAlign={this.selectAlign}
          selectPoints={this.selectPoints}
        />
        <div className="warbands">
          {warbands.map((warband, warbandIndex) => {
            return (
              <div key={warband.warbandId}>
                <Warband
                  warbandIndex={warbandIndex}
                  factions={factions}
                  unitdata={unitdata}
                  warband={warband}
                  deleteWarband={this.deleteWarband}
                  addUnit={this.addUnit}
                  deleteUnit={this.deleteUnit}
                  addWarrior={this.addWarrior}
                  deleteWarrior={this.deleteWarrior}
                  addOption={this.addOption}
                  deleteOption={this.deleteOption}
                  toggleOption={this.toggleOption}
                />
              </div>
            );
          })}
        </div>
        <AddWarband
          factions={factions}
          side={side}
          addWarband={this.addWarband}
          text="Add warband"
        />
        <Stats
          armyModels={armyModels}
          armyBowCount={armyBowCount}
          armyPoints={armyPoints}
          armyOptionPoints={armyOptionPoints}
          points={points}
        />
      </div>
    );
  }
}

export default App;
