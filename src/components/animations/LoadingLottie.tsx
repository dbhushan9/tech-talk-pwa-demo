import Lottie from 'react-lottie';
import animationData from '../../lotties/loading-multicolor.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


export const LoadingLottie = () => (
    <Lottie
        options={defaultOptions}
    />
)