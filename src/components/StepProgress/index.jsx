import { Steps as AntdSteps, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import './style.css';
import Caption from '../Caption';
import { StepTitle } from './StepTitle';
import { StepDescription } from './StepDescription';

const StepProgress = ({ currentStep, states, direction, process }) => {
  if (!states || !states.length) {
    return null;
  }

  return (
    <div>
      <p className="title-step">
        <strong>ACOMPANHE O PROCESSO DE {process}</strong>
      </p>
      <div className="step-progress">
        <Steps
          current={currentStep}
          items={states.map((item) => {
            return {
              title: <StepTitle title={item.title} />,
              description: <StepDescription description={item.description} />,
            };
          })}
          direction={direction}
        />
      </div>
      <Caption />
    </div>
  );
};

StepProgress.propTypes = {
  currentStep: PropTypes.number.isRequired,
  states: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default StepProgress;

export const Steps = ({ ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextDescription: '#6F6F6F',
          fontFamily: "'Roboto', sans-serif",
          colorPrimary: '#00b96b',
        },
        steps: {
          activeStepColor: 'green',
        },
      }}
    >
      <div>
        <AntdSteps {...props} className="ant-steps ant-steps-label-vertical" />
      </div>
    </ConfigProvider>
  );
};
