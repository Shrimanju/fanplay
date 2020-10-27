import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import TopHeader from '../../components/topHeader';

// Assets
import profilePicture from '../../assets/sergio-de-paula-c_GmwfHBDzk-unsplash@2x.png';
import userIcon from '../../assets/group.svg';
import videoCamIcon from '../../assets/video-camera.svg';
import money from '../../assets/money (1).svg';

function ViewProfileContainer(props) {
  return (
    <div className='viewProfileContainer'>
      <div className='viewProfileContainer__header'>
        <TopHeader link='/influencerProfile' background='#A22F47' />
      </div>
      <div className='viewProfileContainer__dp'>
        <img src={profilePicture} alt='Profile Display' />
        {/* <img
          src={
            props.hostDetails.hostImage
              ? props.hostDetails.hostImage
              : profilePicture
          }
          alt='Profile Display'
        /> */}
      </div>
      <div className='viewProfileContainer__name'>
        <div className='viewProfileContainer__name__text'>
          {props.hostDetails.hostName}
        </div>
      </div>
      <div className='viewProfileContainer__details'>
        <div className='viewProfileContainer__details__views'>
          <div style={{ display: 'flex' }}>
            <div className='viewProfileContainer__details__views__icon'>
              <img src={userIcon} alt='User Icon' />
            </div>
            <div className='viewProfileContainer__details__views__label'>
              Total Views
            </div>
          </div>
          <div className='viewProfileContainer__details__views__count'>
            2000
          </div>
        </div>
        <div className='viewProfileContainer__details__hosted'>
          <div style={{ display: 'flex' }}>
            <div className='viewProfileContainer__details__views__icon'>
              <img src={videoCamIcon} alt='Video Camera Icon' />
            </div>
            <div className='viewProfileContainer__details__hosted__label'>
              Shows Hosted
            </div>
          </div>
          <div className='viewProfileContainer__details__hosted__count'>10</div>
        </div>
        <div className='viewProfileContainer__details__show'>
          <div style={{ display: 'flex' }}>
            <div className='viewProfileContainer__details__views__icon'>
              <img src={money} alt='Next Show Icon' />
            </div>
            <div className='viewProfileContainer__details__show__label'>
              Next Show
            </div>
          </div>
          <div className='viewProfileContainer__details__show__details'>
            <div className='viewProfileContainer__details__show__details__name'>
              Show name
            </div>
            <div className='viewProfileContainer__details__show__details__time'>
              07:00PM, Sat, 12 July
            </div>
          </div>
        </div>
        <div className='viewProfileContainer__details__reminder'>
          <button>Set Reminder</button>
        </div>
        <Link to='/previousShows'>
          <div className='viewProfileContainer__details__prev'>
            <button> Previous Shows Hosted</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

// export default ViewProfileContainer;
ViewProfileContainer.propTypes = {
  getHostDetails: PropTypes.func,
};

const mapStateToProps = (state) => ({
  hostDetails: state.profile.hostDetails,
});

export default connect(mapStateToProps, null)(ViewProfileContainer);
