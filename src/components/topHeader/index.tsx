import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface ITopHeaderProps {
  headerText: string;
  // showBackArrow: boolean;
  background: any;
  link?: any;
}
//props: ITopHeaderProps  {props.headerText}
const TopHeader: React.FC<ITopHeaderProps> = ({
  headerText,
  background,
  link,
}) => {
  return (
    <div className='topHeader' style={{ background }}>
      <Link to={link}>
        <div className='topHeader__backArrow'>
          <i className='fas fa-angle-left fa-2x'></i>
        </div>
      </Link>
      <div className='topHeader__headerText'>{headerText}</div>
    </div>
  );
};

export default TopHeader;
