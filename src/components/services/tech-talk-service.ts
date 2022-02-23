import axios from 'axios';
import { TechTalk } from '../../types';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"

export const GetAllTechTalks = (): Promise<TechTalk[]> => {
    return axios.get(`${BACKEND_URL}/tech-talks/`)
        .then(res => {
            return Promise.resolve((res && res.data && res.data.data) || [])
        })
        .catch(function (error) {
            console.error(error);
            return Promise.reject(error)
        })

}


export const CreateTechTalks = (data: TechTalk) => {
    return axios.post(`${BACKEND_URL}/tech-talks/`, data)
        .then((res) => {
            console.log(res.data)
            return Promise.resolve(res.data)
        }).catch((error) => {
            console.log(error)
            return Promise.reject(error)
        });
}