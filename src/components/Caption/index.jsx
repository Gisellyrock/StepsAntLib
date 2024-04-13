import './style.css';
import { FaCircle } from 'react-icons/fa';

const Caption = () => {
  return (
    <>
      <div className="caption-box">
        <div className="caption-text-box">
          <FaCircle color="#01b96b" className="icon-caption" />
          <p className="caption-finish">Concluído</p>
        </div>
        <div className="caption-gray">
          <FaCircle color="#aeaeae" className="caption-icon-unfinished" />
          <p className="caption-unfinished">Não Concluído</p>
        </div>
      </div>
    </>
  );
};

export default Caption;
