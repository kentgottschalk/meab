import React from 'react';
import PropTypes from 'prop-types';

const Modal = props => {
  const { show, children, toggleModal } = props;

  return (
    <div className={show === 'show' ? 'modal display-block' : 'modal hiddenModal'}>
      <section className="modal-main">
        {children}
        <button type="button" className="closeButton" onClick={toggleModal}>
          X
        </button>
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
