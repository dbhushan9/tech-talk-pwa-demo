import Lottie from 'react-lottie';
import animationData from '../../lotties/login.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


export const LoginLottie = () => (
  <Lottie
    options={defaultOptions}
  />
)