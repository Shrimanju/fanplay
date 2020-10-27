import React, { Fragment } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopHeader from '../../components/topHeader';
import PreviousShowCard from '../../components/previousShowCard';

const PreviousShowsContainer = ({ hostEvents }) => {
  return (
    <div className='previousShowsContainer'>
      <div className='previousShowsContainer__header'>
        <TopHeader
          link='/viewProfile'
          background='#a22f47ad'
          headerText='Previous Shows'
        />
      </div>
      <div className='previousShowsContainer__banner'>
        <div className='previousShowsContainer__banner__title'>Quiz Name</div>
        <div style={{ display: 'flex' }}>
          <div className='previousShowsContainer__banner__date'>Date</div>
          <div className='previousShowsContainer__banner__divider'></div>
          <div className='previousShowsContainer__banner__views'>#Views</div>
        </div>
      </div>
      <div className='previousShowsContainer__list'>
        {hostEvents.hostEvents &&
        hostEvents.hostEvents.pastEvents &&
        hostEvents.hostEvents.pastEvents.length > 0 ? (
          <Fragment>
            {hostEvents.hostEvents.pastEvents.map((pastEvent) => (
              <div key={pastEvent._id}>
                <PreviousShowCard pastEvent = {pastEvent} />
              </div>
            ))}
          </Fragment>
        ) : (
          <h4>No Past Events available</h4>
        )}
        {/* <PreviousShowCard />
        <PreviousShowCard />
        <PreviousShowCard />
        <PreviousShowCard />
        <PreviousShowCard /> */}
      </div>
    </div>
  );
};

// export default PreviousShowsContainer;

PreviousShowsContainer.propTypes = {
  hostEvents: PropTypes.object,
};

const mapStateToProps = (state) => ({
  hostEvents: state.events,
});

export default connect(mapStateToProps, null)(PreviousShowsContainer);
