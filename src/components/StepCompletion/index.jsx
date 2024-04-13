import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const StepCompletion = ({ receivedDate }) => {
  return (
    <>
      <div className="icon-box">
        <FontAwesomeIcon icon={faCircleCheck} />
      </div>
      <div className="step-box">
        <div className="text-box">
          <p>PROTOCOLO ENTREGUE</p>
          <p className="box-date">em {receivedDate}</p>
        </div>
      </div>
    </>
  );
};

export default StepCompletion;
