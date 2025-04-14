import axios from "axios";
import { Set_USER_ID } from "./As";
var urls = 'http://10.0.2.2:3333/api/';
export const sendToken = async (meth, urlnam, data) => {
    return await axios({
        method: meth,
        url: urls + urlnam,
        data: data
    }).then(function (response) {
        Set_USER_ID({ 'id': response.headers.tokenfast })
        return response.headers.x_auth_token;
    }).catch(function (error) {
        console.error(error);
    });
}

export const getObj = async (urlnam, token, navigation) => {
    return await axios.post(urls + urlnam, {
    },{
        headers: {
            "Content-Type": "application/json",
            "x_auth_token": token
        },
    }).then(function (response) {
       return response.data.status === 201 ? response.data.user.data : navigation.navigate('Login');
    }).catch(function (error) {
        console.error(error);
    });
}

export const GetN = async (id, urlnam, page, search) => {
    return await axios.get(urls + urlnam + `?id=${id}&page=${ search ? 0 : page }&search=${search}`)
    .then(function (data) {
       return data.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export const GetNM = async (urlnam, search) => {
    return await axios.get(urls + urlnam + `?&search=${search}`)
    .then(function (data) {
    return data.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export const StataFilter = async (id, urlnam, date1, date2) => {
    return await axios.get(urls + urlnam + `?id=${id}&date1=${date1}&date2=${date2}`)
     .then(function (data) {
        return data.data;
     }).catch(function (error) {
         console.error(error);
     });
 }

export const SotuvFilter = async (id, urlnam, page, search) => {
    return await axios.get(urls + urlnam + `?id=${id}&page=${ page }&search=${search}`)
    .then(function (data) {
    return data.data;
    }).catch(function (error) {
        console.error(error);
    });
}
 
export const GetUserDB = async (id, urlnam, page, search) => {
    return await axios.get(urls + urlnam + `?id=${id}&page=${ search ? 0 : page }&search=${search}`)
    .then(function (data) {
        return data.data;
    }).catch(function (error) {
        console.error(error);
    });
 }

export const GetUserInfo = async (urlnam, page, search) => {
    return await axios.get(urls + urlnam + `?page=${ search ? 0 : page }&search=${search}`)
    .then(function (data) {
        return data.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export const Store = async (meth, urlnam, data) => {
    return await axios({
        method: meth,
        url: urls + urlnam,
        data: data
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export const Update = async (meth, urlnam, data) => {
    return await axios({
        method: meth,
        url: urls + urlnam,
        data: data
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export const FetchSend = async (meth, urlnam, data) => {
    return await fetch(urls + urlnam, {
        method: meth,
        headers:{
            'Content-Type':'multipart/form-data',
            'Accept': 'application/json'
        },
        body: data,
    }).then((response) => response.json())
      .then((respon) => {
        return respon;
    }).catch((error) => {
        console.log(error);
    });
}

export const Destroy = async (meth, urlnam) => {
    return await axios({
        method: meth,
        url: urls + urlnam
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export const GetUserFilter = async (urlnam) => {
    return await axios.get(urls + urlnam)
    .then(function (data) {
        return data.data;
    }).catch(function (error) {
        console.error(error);
    });
}