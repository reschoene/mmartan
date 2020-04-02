import { isProduction } from './environment.js';

export const getBaseUrl = function(){
    if (isProduction)
        return 'http://vps6174.publiccloud.com.br/mmartanApi/';
    else
        return 'http://localhost:7001/';
};