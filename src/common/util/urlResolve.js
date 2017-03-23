export function anysicUrl(url,params) {
    let urlArrays = [];
    urlArrays = getNewUrl(url,urlArrays);
    let urlObj = getNoMatchParams(url,urlArrays,params);
    let noMatch = urlObj.noMatchParams;
    //获取替换和拼接后的URL
    let newUrl = this.keyOperator(urlObj.url,noMatch);
    //匹配出Url中{}包裹的变量
    return {
        url: newUrl,params: noMatch
    };
}
export function getNewUrl(url,urlArrays) {
    let newUrls = url.match(/\{([^\{\}]+)\}|([^\{\}]+)/g);
    newUrls.forEach(function (key) {
        if (key && key.indexOf('{') > -1) {
            key = key.replace('{','').replace('}','');
            urlArrays.push(key);
        }
    });
    //拆分{}包裹的变量的集合
    return urlArrays;
}
//拆分匹配参数
export function getNewParams(params) {
    let variables = [];
    if (params) {
        //params = JSON.parse
        for (let key in params) {
            let param = {};
            param['' + key + ''] = params[key];
            variables.push(param);
        }
    }
    // console.log('variables',variables);
    return variables;
}

//匹配参数替换  不被匹配的参数重新作为一个集合
export function getNoMatchParams(url,urlArrays,params) {
    let noMatch = [],
        diffArray = [];

    if (urlArrays && params) {
        for (let paramKey in params) {
            diffArray.push(paramKey);
        }
        let diffParams = diffArray.diff(urlArrays);

        if(diffParams && diffParams.length > 0){
            for(let k = 0 ; k < diffParams.length; k++) {
                let param = {};
                param['' + diffParams[k] + ''] = params[diffParams[k]];
                noMatch.push(param);
            }
        }
        for (let paramKey in params) {
            for (let key in urlArrays) {
                if (urlArrays[key] === paramKey) {
                    url = url.replace('{' + urlArrays[key] + '}',paramKey);
                    break;
                }
            }
        }
    }
    // console.log('noMatch',noMatch);
    let urlObj = {url: url,noMatchParams: noMatch};
    return urlObj;
}

//拼接url
export function keyOperator(url,noMatch) {
    let hasParameter = false;
    if (!(url.indexOf('?') > -1)) {
        url += '?';
        hasParameter = true;
    }
    return joinUrl(url,noMatch ,hasParameter);
}

export function joinUrl(url,noMatch ,hasParameter) {
    for(let k = 0 ; k<noMatch.length;k++){
        for(let key in noMatch[k]){
            let data = noMatch[k];
            if(hasParameter){
                url += key + '=' + data[key];
                hasParameter = false;
            }else{
                url += '&' + key + '=' + data[key];
            }
        }
    }
    return url;
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};
