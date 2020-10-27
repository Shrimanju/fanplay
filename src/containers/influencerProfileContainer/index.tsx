import React, { useEffect, Fragment, useState, useRef } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// importing images & icons
import profilePicture from '../../assets/sergio-de-paula-c_GmwfHBDzk-unsplash.png';
// import viewsIcon from '../../assets/group.svg';
// import showsIcon from '../../assets/group.svg';
// import fansIcon from '../../assets/group.svg';
// components import
import Button from '../../components/button';
import UpcomingQuizCard from '../../components/upcomingQuizCard';
// import PreviosQuizCard from '../../components/previousQuizCard';
//import actions
import { getHostEvents } from '../../actions/events';
import {
  hostUpdateProfilePicture,
  getHostDetails,
} from '../../actions/profile';
import UpdateProfileModal from '../../components/updateProfileModal';
import Loading from '../../components/Loading';

const InfluencerProfileContainer = (props: any) => {
  //update Profile
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(
    false
  );
  useEffect(() => {
    props.getHostDetails();
    props.getHostEvents();
  }, []);

  // reference
  const inputRef = useRef(null);
  const imageBrowse = (inputRef: any) => {
    inputRef.current.click();
  };

  const onChangeImage = (e: any) => {
    console.log(e.target.files[0]);
    var imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    props.hostUpdateProfilePicture(imageFormData);
  };

  return (
    <Fragment>
      {props.hostDetails ? (
        <div className='influencerProfileContainer'>
          <div className='influencerProfileTop'>
            <div className='influencerProfileTop__influencerProfileInfo'>
              <div className='influencerProfileTop__influencerProfileInfo__left'>
                <div className='profileGreet'>Hi,</div>
                <div className='influencerProfileName'>
                  <div className='proFileNameFont'>
                    {/* {localStorage.getItem('hostName')} */}
                    {props.hostDetails.hostName}
                  </div>
                  {/* <div className='proFileNameFont'>
                {localStorage.getItem('last_name')}
              </div> */}
                </div>
                <div className='profileGreet'>Welcome!</div>

                {/* Temporary button added */}
                <button
                  className='updateProfileBtn'
                  onClick={() => setIsUpdateProfileModalOpen(true)}
                >
                  Update Profile
                </button>
              </div>
              <div className='influencerProfileTop__influencerProfileInfo__right'>
                <div className='influencerProfileTop__influencerProfileInfo__right__image'>
                  <img
                    src={
                      props.hostDetails.hostImage
                        ? props.hostDetails.hostImage
                        : profilePicture
                      // props.hostDetails.hostImage
                    }
                    alt='Profile Display'
                    onClick={() => imageBrowse(inputRef)}
                  />
                  <input
                    type='file'
                    ref={inputRef}
                    onChange={onChangeImage}
                    // id='selectImage'
                    style={{ display: 'none' }}
                  />
                </div>
                <div className='influencerProfileTop__influencerProfileInfo__right__button'>
                  <Link to='/viewProfile'>
                    <Button
                      btnTitle='View Profile'
                      background='#A22F47 0% 0% no-repeat padding-box'
                      width='120px'
                    />
                  </Link>
                  {/* <button onClick={() => setIsUpdateProfileModalOpen(true)}>
                Update Profile
              </button> */}
                </div>
              </div>
            </div>
            <div className='influencerProfileTop__divider'>
              <UpdateProfileModal
                isUpdateProfileModalOpen={isUpdateProfileModalOpen}
                setIsUpdateProfileModalOpen={setIsUpdateProfileModalOpen}
              />
            </div>
          </div>
          <div className='influencerProfileContainer__influencerProfileBottom'>
            <div className='influencerProfileContainer__influencerProfileBottom__createQuizContainer'>
              <Link to='/createQuiz'>
                <Button
                  btnTitle='Create Quiz'
                  width='200px'
                  background='#265083 0% 0% no-repeat padding-box'
                />
              </Link>
            </div>

            {/* <div className='statisticsContainer'>
          <div className='statisticsContainer__heading'>
            <div className='statisticsContainer__heading__text'>Statistics</div>
          </div>

          <div className='statisticsContainer__details'>
            <div className='statisticsContainer__details__info spaceBetween'>
              <div className='verticalAlign'>
                <img
                  className='inlineBlock'
                  src={viewsIcon}
                  alt='Total Views'
                />
                <div className='statsFont inlineBlock'>Total Views</div>
              </div>
              <div className='statsFont inlineBlock'>300</div>
            </div>
            <div className='statisticsContainer__details__info spaceBetween'>
              <div className='verticalAlign'>
                <img
                  className='inlineBlock'
                  src={showsIcon}
                  alt='Shows Hosted'
                />
                <div className='statsFont inlineBlock'>Shows Hosted</div>
              </div>
              <div className='statsFont inlineBlock'>10</div>
            </div>
            <div className='statisticsContainer__details__info spaceBetween'>
              <div className='verticalAlign'>
                <img className='inlineBlock' src={fansIcon} alt='Fans' />
                <div className='statsFont inlineBlock'>fans</div>
              </div>
              <div className='statsFont inlineBlock'>2000</div>
            </div>
          </div>
        </div> */}
            <div className='upcomingQuizzesContainer'>
              <div className='upcomingQuizzesContainer__heading'>
                <div className='upcomingQuizzesContainer__heading__text'>
                  Upcoming Quizzes
                </div>
              </div>
              <div className='upcomingQuizzesContainer__cardList'>
                {props.hostEvents.hostEvents &&
                  props.hostEvents.hostEvents.upcomingEvents &&
                  props.hostEvents.hostEvents.upcomingEvents.length > 0 ? (
                    <Fragment>
                      {props.hostEvents.hostEvents.upcomingEvents.map(
                        (upcomingEvent: any) => (
                          <div key={upcomingEvent._id}>
                            <UpcomingQuizCard
                              eventName={upcomingEvent.eventName}
                              eventTime={upcomingEvent.eventTime}
                              eventId={upcomingEvent._id}
                            />
                          </div>
                        )
                      )}
                    </Fragment>
                  ) : (
                    <h4>No Upcoming Events scheduled</h4>
                  )}
              </div>
            </div>
            {/* <div className='previousQuizzesContainer'>
          <div className='previousQuizContainer__heading'>
            <div className='previousQuizContainer__heading__text'>
              Previous Quizzes
            </div>
          </div>
          <div className='previousQuizzesContainer__cardList'>
            <PreviosQuizCard />
            <PreviosQuizCard />
            <PreviosQuizCard />
          </div>
        </div> */}
          </div>
        </div>
      ) : (
          <Loading name='Loading' />
        )}
    </Fragment>
  );
};

InfluencerProfileContainer.propTypes = {
  hostEvents: PropTypes.object,
  getHostEvents: PropTypes.func,
  hostUpdateProfilePicture: PropTypes.func,
  profilePhotoURL: PropTypes.string,
  getHostDetails: PropTypes.func,
};

const mapStateToProps = (state: any) => ({
  hostEvents: state.events,
  user: state.auth.user,
  profilePhotoURL: state.profile.profilePhotoURL,
  hostDetails: state.profile.hostDetails,
});

export default connect(mapStateToProps, {
  getHostEvents,
  hostUpdateProfilePicture,
  getHostDetails,
})(InfluencerProfileContainer);
