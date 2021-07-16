import Lottie from 'react-lottie';
import animationData from '../../lotties/registration.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


export const RegistrationLottie = () => (
    <Lottie
        options={defaultOptions}
    />
)