import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

function ExitConfirmModal({
  exitConfirmModalIsOpen,
  setExitConfirmModalIsOpen,
}) {
  const customStyles = {
    content: {
      display: 'flex',
      justifyContent: 'center',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '216px',
      width: '216px',
      background:
        'transparent linear-gradient(90deg, #000000 0%, #102f54 100%) 0% 0%',
      borderRadius: '180px',
    },
    overlay: {
      background: '#4d4d4d80 0% 0% no-repeat padding-box',
      backdropFilter: 'blur(30px)',
    },
  };

  return (
    <div className='exitConfirmModal'>
      <Modal
        isOpen={exitConfirmModalIsOpen}
        onRequestClose={() => setExitConfirmModalIsOpen(false)}
        style={customStyles}
      >
        <div className='exitConfirmModal__box'>
          {/* <div className='exitConfirmModal__box__close'>+</div> */}
          <div className='exitConfirmModal__box__exit'>
            <div className='exitConfirmModal__box__exit__text'>Really ?</div>
            <Link to='/influencerProfile'>
              <div className='exitConfirmModal__box__exit__yes'>
                <button>Yes</button>
              </div>
            </Link>
            <div className='exitConfirmModal__box__exit__no'>
              <button
                onClick={() => {
                  setExitConfirmModalIsOpen(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ExitConfirmModal;
