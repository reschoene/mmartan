import { isProduction } from './environment.js';

/** Gets mmartan API's URL 
 * @return {string} returns the API's URL according to the current envirounment
*/
export const getBaseUrl = function(){
    //When in development enviroumnt, returns localhost API for backend development purposes
    if (isProduction)
        return 'http://vps6174.publiccloud.com.br/mmartanApi/';
    else
        return 'http://localhost:7001/';
};