import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
const dateObj = new Date();
const day     = dateObj.getUTCDate();
const month   = dateObj.getUTCMonth() + 1;
const year    = dateObj.getUTCFullYear();

export const setData = async (navigation, value) => {
    try {
        AsyncStorage.setItem("token", value);
        await getData(navigation)
    } catch (error) {
        console.error(error);
    }
};

export const getData = async (navigation) => {
    await AsyncStorage.getItem('token') === null ?
    navigation.navigate('Login') :
    navigation.navigate('Dashboard');
};

export const getTokenAuth = async () => {
    return await AsyncStorage.getItem('token');
};

export const setcontrol = async (value) => {
    await AsyncStorage.setItem("control", value);
};

export const getcontrol = async () => {
    return await AsyncStorage.getItem('control');
};

export const clearAll = async (navigation) => {
    try {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    } catch (error) {
        console.error(error);
    }
};

export const Set_USER_ID = async (foo) => {
   await AsyncStorage.setItem("user", JSON.stringify(foo));
}

export const Set_USER_DB = async (name, foo) => {
    await AsyncStorage.setItem(name, JSON.stringify(foo));
}

export const USER_ID = async () => {
    return JSON.parse(await AsyncStorage.getItem('user')).id;
}

export const USER_DB = async (name) => {
    return JSON.parse(await AsyncStorage.getItem(name));
}

export const date_time = async () => {
    return moment(new Date()).format('DD.MM.YYYY');
}

export const removeData = async (useName) => {
    try {
       return await AsyncStorage.removeItem(useName);
    } catch (error) {
        console.log(error);
    }
};