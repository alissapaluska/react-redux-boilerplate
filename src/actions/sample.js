import {batch} from 'react-redux';
import SampleService from '../services/sample';

export const GET_SAMPLE = "GET_SAMPLE";

export function getSample(request, data) {
    return { type: GET_SAMPLE, paylod: {request, data} };
}

export const GET_SAMPLE_REQUEST_ERROR = "GET_SAMPLE_REQUEST_ERROR";

export function getSampleRequestError(error) {
    return { type: GET_SAMPLE_REQUEST_ERROR, pyalod: { error } };
}

export function getSampleService(input) {
    return async (dispatch, getState) => {
        const state = getState();
        const {baseURL} = state.environment;
        const service = new SampleService(baseURL);

        const params = {
            query: input.query,
            'Accept-Language-Header': input.acceptLanguageHeader
        }

        const results = await service.sample(params);

        if(typeof results === 'string'){
            dispatch(getSampleRequestError(results));
        } else {
            const { request, data } = results;
            const response = data && data.results ? data.results : {};

            batch(() => {
                dispatch(getSample(request, response));
            })
        }
    }
}