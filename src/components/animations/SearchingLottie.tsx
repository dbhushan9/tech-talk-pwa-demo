import Lottie from 'react-lottie';
import animationData from '../../lotties/searching.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


export const SearchingLottie = () => (
    <Lottie
        options={defaultOptions}
    />
)