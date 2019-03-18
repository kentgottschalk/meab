import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ExportPdf from './ExportPdf';

const Menu = props => {
  const { army, load, save, copyToClipboard, clearState } = props;
  const [showHide, setShowHide] = useState(0);
  const [saveName, setSaveName] = useState('');
  const [pdfsavename, setPDFSaveName] = useState('');
  const [pdfplayername, setPDFPlayerName] = useState('');
  const [pdflistname, setPDFListName] = useState('');
  const [saveKeys, setSaveKeys] = useState(Object.keys(localStorage));

  useEffect(() => {
    const keys = Object.keys(localStorage);
    setSaveKeys(keys);
  });

  function toggleModal() {
    setShowHide('hidden');
  }

  function toogleResetModal(event) {
    event.preventDefault();
    setShowHide('hidden');
    setSaveName('');
    setPDFSaveName('');
    setPDFPlayerName('');
    setPDFListName('');
  }

  function deletesave(event) {
    console.log(event.target.value);
    localStorage.removeItem(event.target.value);
  }

  return (
    <div className="menu">
      <Modal show={showHide === 1 ? 'show' : 'hide'} toggleModal={toggleModal}>
        Load
        <form
          className="loadform"
          onSubmit={e => {
            toogleResetModal(e);
            load.call(this, e);
          }}
        >
          {saveKeys.map(key => (
            <Fragment key={key}>
              <input type="radio" name="load" value={key} className="loadinput" />
              <div className="loadlabel">{key}</div>
              <button value={key} onClick={deletesave} className="right" type="button">
                x
              </button>
            </Fragment>
          ))}
          <input type="submit" value="Load" className="floatright" />
        </form>
      </Modal>
      <Modal show={showHide === 2 ? 'show' : 'hide'} toggleModal={toggleModal}>
        Save
        <form
          onSubmit={e => {
            toogleResetModal(e);
            save.call(this, e);
          }}
          className="modalform"
        >
          <input
            type="text"
            value={saveName}
            name="name"
            placeholder="List name"
            onChange={event => {
              event.preventDefault();
              setSaveName(event.target.value);
            }}
          />
          <input type="submit" value="Save" />
        </form>
      </Modal>
      <Modal show={showHide === 3 ? 'show' : 'hide'} toggleModal={toggleModal}>
        <p>Copy</p>
        <Button onClick={copyToClipboard} text="Copy" />
      </Modal>
      <Modal show={showHide === 4 ? 'show' : 'hide'} toggleModal={toggleModal}>
        <p>Export to PDF</p>
        <div className="savetopdf">
          Savename
          <input
            type="text"
            value={pdfsavename}
            name="saveas"
            placeholder="middleearthlist"
            onChange={event => {
              event.preventDefault();
              setPDFSaveName(event.target.value);
            }}
          />
          Playername
          <input
            type="text"
            value={pdfplayername}
            name="playername"
            placeholder="optional"
            onChange={event => {
              event.preventDefault();
              setPDFPlayerName(event.target.value);
            }}
          />
          Listname
          <input
            type="text"
            value={pdflistname}
            name="listname"
            placeholder="optional"
            onChange={event => {
              event.preventDefault();
              setPDFListName(event.target.value);
            }}
          />
          <ExportPdf
            army={army}
            pdfsavename={pdfsavename}
            pdflistname={pdflistname}
            pdfplayername={pdfplayername}
            toogleResetModal={toogleResetModal}
          />
        </div>
      </Modal>
      <Button text="Load" onClick={() => setShowHide(1)} onKeyDown={() => setShowHide(1)} />
      <Button text="Save" onClick={() => setShowHide(2)} onKeyDown={() => setShowHide(2)} />
      <Button text="Copy" onClick={() => setShowHide(3)} onKeyDown={() => setShowHide(3)} />
      <Button text="Export" onClick={() => setShowHide(4)} onKeyDown={() => setShowHide(4)} />
      <Button onClick={clearState} text="Clear" />
    </div>
  );
};

Menu.propTypes = {
  load: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  army: PropTypes.instanceOf(Object).isRequired,
  clearState: PropTypes.func.isRequired,
};

export default Menu;
