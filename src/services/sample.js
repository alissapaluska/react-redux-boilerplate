import {getObjWithValues} from '../utilities'
const axios = require('axios')

export default class SampleService {
    constructor(baseURL, version) {
        this.baseURL = baseURL;
        this.version = version;
    }

    async sample(input) {
        const params = getObjWithValues(input);

        try {
            return await axios.get(this.baseURL, {params});
        } catch (e) {
            return e.message;
        }
    }
};