const reqFulfil = function (config) {
   const updatedHeader = {
      ...config,headers:{...config.headers,
                         'token':sessionStorage.getItem('token')}}
   return {
      ...updatedHeader
   }
}

const reqFulfilWithoutToken = function(config){
   return {
      ...config
   }
}

const reqError = function (error) {
   return Promise.reject(error);
}

const resFulfil = function (response) {
   return {
       ...response
   };
}

const resError = function (error) {
   return Promise.reject();
}

export {
   reqFulfil,
   reqError,
   resFulfil,
   resError,
   reqFulfilWithoutToken
}
