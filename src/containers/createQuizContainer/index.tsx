import './index.scss';
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
// components import
import TopHeader from '../../components/topHeader';
import Button from '../../components/button';
//import actions
import { createEvent } from '../../actions/events';
import {
  Input,
  Select,
  TimePicker,
  DatePicker,
  Upload,
  Button as AntDButton,
  Popover,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import moment from 'moment';
//images
import quizImage from '../../assets/images.png';
import { time } from 'console';
import Loading from '../../components/Loading';

//Date Picker
const format = 'HH:mm';

//multi select button
const { Option } = Select;

const CreateQuizContainer = (props: any) => {
  const [formValid, setFormValid] = useState(false);
  const [isLoadingSpinnerOpen, setIsLoadingSpinnerOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    eventTags: [],
    // timePerQues: '',
    eventTime: '',
    // eventDate: '',
    eventImage: '',
    // eventLink: '',
    // tagLine: '',
    // entryFee: '',
  });
  const {
    eventName,
    eventTags,
    // timePerQues,
    // eventTime,
    // eventDate,
    eventImage,
    // eventLink,
    // tagLine,
    // entryFee,
  } = formData;
  useEffect(() => {
    if (formData.eventTime && formData.eventImage) {
      console.log(formData);
      setFormValid(true);
    }
  }, [formData]);

  var bodyFormData = new FormData();
  bodyFormData.append('eventName', formData.eventName);
  bodyFormData.append('eventTags', formData.eventTags.toString());
  bodyFormData.append('eventTime', formData.eventTime);
  bodyFormData.append('eventImage', formData.eventImage);

  const history = useHistory();

  const formSubmit = () => {
    if (formValid === true && formData.eventImage) {
      console.log(formData);
      setIsLoadingSpinnerOpen(true);
      props.createEvent(bodyFormData, history, setIsLoadingSpinnerOpen);
    }
  };

  useEffect(formSubmit, [formValid]);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  // handleEventTags
  function handleChangeTags(value: any) {
    setFormData({ ...formData, eventTags: value });
  }

  // Date and time
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  // Date picker
  function onChangeDate(dateMoment: any, dateString: any) {
    setDate(dateString);
  }
  // Time picker
  function onChangeTime(timeMoment: any, timeString: string) {
    setTime(timeString);
  }
  // Concat date and time
  const concatDateTime = (date: string, time: string) => {
    setFormData({
      ...formData,
      eventTime: Date.parse(date + ' ' + time).toString(),
    });
  };
  const onSubmit = (e: any) => {
    concatDateTime(date, time);
    e.preventDefault();
    // formSubmit();
    // props.createEvent(formData);
  };

  const onChangeImage = (e: any) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, eventImage: e.target.files[0] });
  };

  return (
    <Fragment>
      {props.loading ? (
        <Loading name='Loading' />
      ) : (
          <div className='createQuizCotainer'>
            <TopHeader
              headerText='Create Quiz'
              background='#265083 0% 0% no-repeat padding-box'
              link='/influencerProfile'
            />
            <form
              className='createQuizCotainer__form'
              onSubmit={(e) => onSubmit(e)}
            >
              <div className='createQuizCotainer__form__quizName'>
                <div className='labelFont'>Quiz Name:</div>
                <div>
                  <Input
                    placeholder='Enter Quiz Name'
                    name='eventName'
                    value={eventName}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='createQuizCotainer__form__areaOfInterest'>
                <div className='labelFont'>Area of Interest:</div>
                <div className='boxSize'>
                  <Select
                    mode='multiple'
                    style={{ width: '100%' }}
                    placeholder='Select Interests'
                    // name='eventTags'
                    onChange={handleChangeTags}
                    optionLabelProp='label'
                  // value={eventTags}
                  >
                    <Option value='Bollywood&OTT' label='Bollywood&OTT'>
                      <div className='demo-option-label-item'>Bollywood&OTT</div>
                    </Option>
                    <Option value='G.K' label='G.K'>
                      <div className='demo-option-label-item'>G.K</div>
                    </Option>
                    <Option value='Tourism' label='Tourism'>
                      <div className='demo-option-label-item'>Tourism</div>
                    </Option>
                    <Option value='Sports' label='Sports'>
                      <div className='demo-option-label-item'>Sports</div>
                    </Option>
                    <Option value='Food' label='Food'>
                      <div className='demo-option-label-item'>Food</div>
                    </Option>
                    <Option value='Trending' label='Trending'>
                      <div className='demo-option-label-item'>Trending</div>
                    </Option>
                    <Option value='Nutrition' label='Nutrition'>
                      <div className='demo-option-label-item'>Nutrition</div>
                    </Option>
                    <Option value="Women'sFashion" label="Women'sFashion">
                      <div className='demo-option-label-item'>Women'sFashion</div>
                    </Option>
                    <Option value='Beauty' label='Beauty'>
                      <div className='demo-option-label-item'>Beauty</div>
                    </Option>
                    <Option value='Applications' label='Applications'>
                      <div className='demo-option-label-item'>Applications</div>
                    </Option>
                    <Option value='Gaming' label='Gaming'>
                      <div className='demo-option-label-item'>Gaming</div>
                    </Option>
                    <Option value='Yoga' label='Yoga'>
                      <div className='demo-option-label-item'>Yoga</div>
                    </Option>
                    <Option value="Men'sFashion" label="Men'sFashion">
                      <div className='demo-option-label-item'>Men'sFashion</div>
                    </Option>
                    <Option value='Appliances' label='Appliances'>
                      <div className='demo-option-label-item'>Appliances</div>
                    </Option>
                    <Option value='Gyming' label='Gyming'>
                      <div className='demo-option-label-item'>Gyming</div>
                    </Option>
                    <Option value='Cars' label='Cars'>
                      <div className='demo-option-label-item'>Cars</div>
                    </Option>
                  </Select>
                </div>
              </div>
              <div className='createQuizCotainer__form__timePerQues'>
                <div className='labelFont'>Time Per Question:</div>
                <div className='createQuizCotainer__form__timePerQues__div'>
                  <Input
                    placeholder='_ _'
                    name='timePerQues'
                  // value={timePerQues}
                  // onChange={(e) => onChange(e)}
                  />
                  <span>secs</span>
                </div>
              </div>
              <div className='createQuizCotainer__form__startsAt'>
                <div className='createQuizCotainer__form__startsAt__heading labelFont'>
                  Starts At:
              </div>
                <div className='createQuizCotainer__form__startsAt__timeDate'>
                  <div className='createQuizCotainer__form__startsAt__timeDate__time'>
                    <div className='timeDateMargin labelFont'>Time:</div>
                    <div className='boxSize'>
                      <TimePicker
                        // defaultValue={moment('12:00', 'HH:mm')}
                        format='HH:mm'
                        name='eventTime'
                        onChange={onChangeTime}
                      />
                    </div>
                  </div>
                  <div className='createQuizCotainer__form__startsAt__timeDate__date'>
                    <div className='timeDateMargin labelFont'>Date:</div>
                    <div className='boxSize'>
                      <DatePicker
                        name='eventDate'
                        onChange={onChangeDate}
                      // format='DD-MM-YYYY'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='createQuizCotainer__form__addQuizImage'>
                <div className='labelFont'>Add Quiz Image:</div>
                <div className='dFlex createQuizCotainer__form__addQuizImage__browse'>
                  {/* <Button btnTitle='Browse' background='#E9E9E9' width='128px' />
              <input className='imgSelector' type='file' />
              <img src={quizImage} alt='Quiz Poster' className='imgMargin' /> */}
                  {/* <Upload
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                listType='picture'
                defaultFileList={fileList}
                onChange={onChangeImage}
              >
                <AntDButton>Browse</AntDButton>
              </Upload> */}
                  <label
                    htmlFor='selectedFile'
                    className='createQuizCotainer__form__addQuizImage__browse'
                  >
                    Browse
                </label>
                  <input
                    // className='uploadButton'
                    type='file'
                    onChange={onChangeImage}
                    id='selectedFile'
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              <div className='createQuizCotainer__form__quizLink'>
                <div className='labelFont'>Quiz Link:</div>
                <div>
                  <Popover
                    content={<AntDButton onClick={hide}>Close</AntDButton>}
                    title='Title'
                    trigger='click'
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <AntDButton type='primary'>Click me</AntDButton>
                  </Popover>
                </div>
              </div>
              <Button btnTitle='Preview' background='#265083' width='168px' />
              <Link to='/selectQuestions'>
                {/* <Button btnTitle='Finish' background='#265083' width='152px' /> */}
              </Link>
              <div className='submitBtn'>
                <button type='submit' className='finishBtn'>
                  Finish
              </button>
              </div>
            </form>
            {isLoadingSpinnerOpen && <Loading name='Creating Quiz' />}
          </div>
        )}
    </Fragment>
  );
};

// export default CreateQuizContainer;
CreateQuizContainer.propTypes = {
  createEvent: PropTypes.func,
};

const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { createEvent })(CreateQuizContainer);
