import React, { useEffect, useState } from 'react';
import './index.scss';
import {
  rtcClientCreate,
  rtcClientLeaveChannel,
} from '../../utils/agoraRTC-client';
// import { Slider, InputNumber, Row, Col } from 'antd';
const { REACT_APP_AGORA_RTC_APPID } = process.env;

const AgoraLiveStream = (props) => {
  // Image Enhacment settings
  // const [rtcLocalStreamCopy, setrtcLocalStreamCopy] = useState(null);
  // const [lighteningLevel, setlighteningLevel] = useState(0.7);
  // const [lighteningContrastLevel, setlighteningContrastLevel] = useState(1);
  // const [smoothnessLevel, setsmoothnessLevel] = useState(0.5);
  // const [rednessLevel, setrednessLevel] = useState(0.1);

  // var streamPublishedHandler = async function () {
  //   console.log('light level', lighteningLevel);
  //   await rtcLocalStreamCopy.setBeautyEffectOptions(true, {
  //     lighteningContrastLevel: parseInt(lighteningContrastLevel),
  //     lighteningLevel: parseFloat(lighteningLevel),
  //     smoothnessLevel: parseFloat(smoothnessLevel),
  //     rednessLevel: parseFloat(rednessLevel),
  //   });
  // };

  // useEffect(() => {
  //   if (rtcLocalStreamCopy !== null) streamPublishedHandler();
  // }, [lighteningLevel, lighteningContrastLevel, smoothnessLevel, rednessLevel]);

  useEffect(() => {
    //Launch AgoraRTC
    rtcClientCreate(REACT_APP_AGORA_RTC_APPID);
    return () => {
      rtcClientLeaveChannel();
    };
  }, []);

  return (
    <div>
      <div id='playerDiv'></div>
      {/* <Row>
      <span>Lightness</span>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={(value) => setlighteningLevel(value)}
            value={lighteningLevel}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={lighteningLevel}
            onChange={(value) => setlighteningLevel(value)}
          />
        </Col>
      </Row>
      <Row>
      <span>Smoothness</span>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={(value) => setsmoothnessLevel(value)}
            value={smoothnessLevel}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={smoothnessLevel}
            onChange={(value) => setsmoothnessLevel(value)}
          />
        </Col>
      </Row>
      <Row>
      <span>Redness</span>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={(value) => setrednessLevel(value)}
            value={rednessLevel}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: '0 16px' }}
            step={0.01}
            value={rednessLevel}
            onChange={(value) => setrednessLevel(value)}
          />
        </Col>
      </Row>
      <Row>
      <span>Contrast</span>
        <Col span={12}>
          <Slider
            min={0}
            max={2}
            onChange={(value) => setlighteningContrastLevel(value)}
            value={lighteningContrastLevel}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={2}
            style={{ margin: '0 16px' }}
            value={lighteningContrastLevel}
            onChange={(value) => setlighteningContrastLevel(value)}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default AgoraLiveStream;
