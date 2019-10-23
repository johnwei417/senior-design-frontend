class MUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                contentType:                       'application/json',
                data        : param.data        || null,
                success     : res => {
                    //data request success
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    //not login status, force login with status code: 10
                    else if(10 === res.status){
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });  
    }
    //jump to login
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    //get URL parameter
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    //success tips
    successTips(successMsg){
        alert(successMsg || 'Success!');
    }
    // error tips
    errorTips(errMsg){
        alert(errMsg || 'Failed!');
    }
    // localstorage
    setStorage(name, data){
        let dataType = typeof data;
        // json object
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        //basic types
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        //other not supported types
        else{
            alert('This type cannot be used as local storage');
        }
    }

    //get local storage context
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    //delete local storage
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;