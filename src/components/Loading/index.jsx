import React from 'react';
import './index.scss';
// Assets
// import { Spin } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loading({ name }) {
  return (
    <div className='loading'>
      <div className='loading__box'>
        <div className='loading__box__text'>{name}...</div>
        <div className='loading__box__gif'>
          <LoadingOutlined style={{ fontSize: 24 }} spin />{' '}
        </div>
      </div>
    </div>
  );
}

export default Loading;
