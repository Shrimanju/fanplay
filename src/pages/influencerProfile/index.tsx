import React from 'react';
import './index.scss';
// components import
import InfluencerProfileContainer from '../../containers/influencerProfileContainer';
import Loading from '../../components/Loading';

const InfluencerProfile: React.FC = () => {
  return (
    <div>
      <InfluencerProfileContainer />
      {/* <Loading /> */}
    </div>
  );
};

export default InfluencerProfile;
