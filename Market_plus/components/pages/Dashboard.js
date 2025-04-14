import { ScrollView, StatusBar, StyleSheet, Text, View, Button, TouchableOpacity, Modal, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { clearAll, date_time, getData, getTokenAuth, removeData, Set_USER_ID, USER_ID } from '../Send/As'
import { GetN, getObj, Store } from '../Send/Send';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Sqlad from './Sqlad';
import Sotuv from './Sotuv';
import Xarajat from './Xarajat';
import Statistik from './Statistik';
import Valyuta from "./Valyuta";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Catigotia from './Catigotia';
import Adres from './Adres';
import Clent from './Clent';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Maintip from './Maintip';
// import { RNCamera } from 'react-native-camera';

var formattet = new Intl.NumberFormat('en-US');
const Dashboard = ({navigation}) => {

    const [getid, getId] = useState('');
    const [getemail, getEmail] = useState('');
    const [getparol, getParol] = useState('');

    const [aktiv, onAktiv] = useState(1);
    const [count, onCount] = useState(0);
    
    const [search,  onSearch] = useState('');
    
    const [getpage, getPage] = useState([]);
    const [onkurs, onKurs] = useState([]);
    const [getdata,  setData] = useState([]);
    const [getdatalist,  getDataList] = useState([]);
    const [dataclent,  setDataClent] = useState([]);
    const [getkarzina,  setKarzina] = useState([]);

    const [onsumma, onSumma] = useState('');
    const [olinish, onOlinish] = useState('');
    const [chegirma, onChegirma] = useState('');
    const [chegirma2, onChegirma2] = useState('');
    const [sana, onSana] = useState('');
    const [info, onInfo] = useState('');

    const [onidkurs, onIdkurs] = useState(0);
    const [onkursv, onKursV] = useState('UZS');
    const [onkurssum, onKursSum] = useState(1);

    const [name,  onName] = useState('');
    const [tel,  onTel] = useState('');
    const [uniqueid,  onUniqueid] = useState('');
    const [uniqueid2,  onUniqueid2] = useState('');

    const [correntPage,  setCorrentPage] = useState(0);
    const [correntkurspage,  correntKurspage] = useState(0);
    const [correntnamepage,  correntNamepage] = useState(0);

    const [scancode,  setScancode] = useState('');

    const [scan,  setScan] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pradacha, setPradacha] = useState(false);
    const [qarzopen, setQarzopen] = useState(false);
    const [modalclent, setmodalClent] = useState(false);
    const [showmodalcl, showModalCl] = useState(false);
    const [selectmodal, selectModalCard] = useState(false);
    const [showmodalcldb, showModalClentDB] = useState(false);
    const [showmodalcldb2, showModalClentDB2] = useState(false);    

    const Autharize = async () => { await setAxiosDB(await getTokenAuth()) }
    
    const getList = async (correntPage = 0) => {
        setData(await GetN(await USER_ID(), 'getlist', correntPage, search || null));
    }

    const getListClent = async () => {
        setDataClent(await GetN(await USER_ID(), 'getlist_clent', correntnamepage, search || null));
    }

    const getKurs = async () => {
        onKurs(await GetN(await USER_ID(), 'getlist_kurs', correntkurspage, search || null));
    }

    const putKurs = async (card, typId) => {
        setKarzina(card);
        onIdkurs(typId.kursId);
        onKursV(typId.kursName);
        onKursSum(typId.kursSumma);
    }

    const startId = async () => {
        var data = JSON.parse(await AsyncStorage.getItem('addId'));
        if (data) {
            if (!data.length) {
                await AsyncStorage.setItem("addId", JSON.stringify([{'id': 1, 'status': true, 'kursId': 0, 'kursName': 'UZS', 'kursSumma': 1}]));
                const card = JSON.parse(await AsyncStorage.getItem('addId'));
                var typId = card.find(item => { if (item.status === true) return item; });
                await putKurs(card, typId);
            } else {
                var typId = data.find(item => { if (item.status === true) return item; });
                await putKurs(data, typId);
            }
        } else {
            await AsyncStorage.setItem("addId", JSON.stringify([{'id': 1, 'status': true, 'kursId': 0, 'kursName': 'UZS', 'kursSumma': 1}]));
            const card = JSON.parse(await AsyncStorage.getItem('addId'));
            var typId = card.find(item => { if (item.status === true) return item; });
            await putKurs(card, typId);
        }
    }

    const addCardPlus = async () => {
        var card = JSON.parse(await AsyncStorage.getItem('addId'));
        card.sort(function(a, b) {
            return parseFloat(b.id) - parseFloat(a.id);
        }).map((item, key) => {
            item.status = false
            key === 0 ? card.push({'id': item.id + 1, 'status': true, 'kursId': 0, 'kursName': 'UZS', 'kursSumma': 1}) : item.status = false;
        });
        card.sort(function(a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        });
        AsyncStorage.setItem("addId", JSON.stringify(card));
        await startId();
        await Counter();
        onIdkurs(0);
        onKursV('UZS');
        onKursSum(1);
    }

    const selectCard = async (row) => {
        onIdkurs(row.kursId);
        onKursV(row.kursName);
        onKursSum(row.kursSumma);
        var card = JSON.parse(await AsyncStorage.getItem('addId'));
        card.find(item => {
            item.id === row.id ? item.status = true : item.status = false;
        });        
        await AsyncStorage.setItem("addId", JSON.stringify(card));
        await startId();
        await getStor();
        await Counter();
    }
    
    const deletCard = async (i) => {
        var card = JSON.parse(await AsyncStorage.getItem('addId'));
        card.splice(i, 1);
        card.sort(function(a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        }).map((item, key) => {
            if (key === 0) {
                item.status = true;
            } else {
                item.status = false;
            }
        });
        AsyncStorage.setItem("addId", JSON.stringify(card));
        await startId();
        await Counter();
    }

    const sendUserCard = async (row) => {
        var card = JSON.parse(await AsyncStorage.getItem('addId'));
        card.find(item => {
           if (item.status === true) {
               item.kursId = row.id;
               item.kursName = row.kurs;
               item.kursSumma = row.summa;
           } else {}
        });        
        await AsyncStorage.setItem("addId", JSON.stringify(card));
        await startId();
    }

    const addCard = async (data) => {
        const card = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = card.find(item => { if (item.status === true) return item; });
        var info = {}
        if (data.Kur) {
            if (data.Kur.id === 0 && onidkurs === 0) {
                info = {
                    'karzinaId': typId.id,
                    'userId': data.userId,
                    'sqladId': data.id,
                    'catigoria': data.Catigorium ? data.Catigorium.catigoria : '',
                    'adresname': data.Adre ? data.Adre.name : '',
                    'name': data.name,
                    'soni': 1,
                    'soni2': data.soni,
                    'razmer': data.razmer,
                    'olinin': parseFloat(data.olinish),
                    'olinish': parseFloat(data.olinish),
                    'sotilish': parseFloat(data.sotilish),
                    'sotilish2': parseFloat(data.sotilish),
                    'kursId': onidkurs,
                    'kurs': onkursv,
                    'summa': onkurssum,
                    'image': data.image,
                    'qrcode': data.qrcode,
                }
            }
            if (data.Kur.id !== 0 && onidkurs === 0) {
                info = {
                    'karzinaId': typId.id,
                    'userId': data.userId,
                    'sqladId': data.id,
                    'catigoria': data.Catigorium ? data.Catigorium.catigoria : '',
                    'adresname': data.Adre ? data.Adre.name : '',
                    'name': data.name,
                    'soni': 1,
                    'soni2': data.soni,
                    'razmer': data.razmer,
                    'olinin': parseFloat(data.olinish) * parseFloat(data.Kur.summa),
                    'olinish': parseFloat(data.olinish) * parseFloat(data.Kur.summa),
                    'sotilish': parseFloat(data.sotilish) * parseFloat(data.Kur.summa),
                    'sotilish2': parseFloat(data.sotilish) * parseFloat(data.Kur.summa),
                    'kursId': onidkurs,
                    'kurs': onkursv,
                    'summa': onkurssum,
                    'image': data.image,
                    'qrcode': data.qrcode,
                }
            }
            if (data.Kur.id === 0 && onidkurs !== 0) {
                info = {
                    'karzinaId': typId.id,
                    'userId': data.userId,
                    'sqladId': data.id,
                    'catigoria': data.Catigorium ? data.Catigorium.catigoria : '',
                    'adresname': data.Adre ? data.Adre.name : '',
                    'name': data.name,
                    'soni': 1,
                    'soni2': data.soni,
                    'razmer': data.razmer,
                    'olinin': parseFloat(data.olinish) / onkurssum,
                    'olinish': parseFloat(data.olinish) / onkurssum,
                    'sotilish': parseFloat(data.sotilish) / onkurssum,
                    'sotilish2': parseFloat(data.sotilish) / onkurssum,
                    'kursId': onidkurs,
                    'kurs': onkursv,
                    'summa': onkurssum,
                    'image': data.image,
                    'qrcode': data.qrcode,
                }
            }
            if (data.Kur.id !== 0 && onidkurs !== 0) {
                info = {
                    'karzinaId': typId.id,
                    'userId': data.userId,
                    'sqladId': data.id,
                    'catigoria': data.Catigorium ? data.Catigorium.catigoria : '',
                    'adresname': data.Adre ? data.Adre.name : '',
                    'name': data.name,
                    'soni': 1,
                    'soni2': data.soni,
                    'razmer': data.razmer,
                    'olinin': parseFloat(data.olinish) * parseFloat(data.Kur.summa) / onkurssum,
                    'olinish': parseFloat(data.olinish) * parseFloat(data.Kur.summa) / onkurssum,
                    'sotilish': parseFloat(data.sotilish) * parseFloat(data.Kur.summa) / onkurssum,
                    'sotilish2': parseFloat(data.sotilish) * parseFloat(data.Kur.summa) / onkurssum,
                    'kursId': onidkurs,
                    'kurs': onkursv,
                    'summa': onkurssum,
                    'image': data.image,
                    'qrcode': data.qrcode,
                }
            }
        } else {
            if (onidkurs === 0) {
                info = {
                    'karzinaId': typId.id,
                    'userId': data.userId,
                    'sqladId': data.id,
                    'catigoria': data.Catigorium ? data.Catigorium.catigoria : '',
                    'adresname': data.Adre ? data.Adre.name : '',
                    'name': data.name,
                    'soni': 1,
                    'soni2': data.soni,
                    'razmer': data.razmer,
                    'olinin': parseFloat(data.olinish),
                    'olinish': parseFloat(data.olinish),
                    'sotilish': parseFloat(data.sotilish),
                    'sotilish2': parseFloat(data.sotilish),
                    'kursId': onidkurs,
                    'kurs': onkursv,
                    'summa': onkurssum,
                    'image': data.image,
                    'qrcode': data.qrcode,
                }
            }
            if (onidkurs !== 0) {
                info = {
                    'karzinaId': typId.id,
                    'userId': data.userId,
                    'sqladId': data.id,
                    'catigoria': data.Catigorium ? data.Catigorium.catigoria : '',
                    'adresname': data.Adre ? data.Adre.name : '',
                    'name': data.name,
                    'soni': 1,
                    'soni2': data.soni,
                    'razmer': data.razmer,
                    'olinin': parseFloat(data.olinish) / onkurssum,
                    'olinish': parseFloat(data.olinish) / onkurssum,
                    'sotilish': parseFloat(data.sotilish) / onkurssum,
                    'sotilish2': parseFloat(data.sotilish) / onkurssum,
                    'kursId': onidkurs,
                    'kurs': onkursv,
                    'summa': onkurssum,
                    'image': data.image,
                    'qrcode': data.qrcode,
                }
            }
        }
        await addCard2(info)
      }
      
    const addCard2 = async (info) => {
        var card = JSON.parse(await AsyncStorage.getItem('addCard'));
        const data = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = data.find(item => { if (item.status === true) return item; });
        if (card) {
            var pushCard = card.find(item => { return item.karzinaId === typId.id && item.sqladId === info.sqladId });
        if (pushCard) {

        } else {
            card.push(info);
        }
            AsyncStorage.setItem("addCard", JSON.stringify(card));
        } else {
            AsyncStorage.setItem("addCard", JSON.stringify([info]));
        }
        await Counter();
    }

    const setAxiosDB = async (auth_token) => {
        if (!auth_token) {
            navigation.navigate('Login')
        } else {
            var foo = await getObj('verify', auth_token, navigation)
            await Set_USER_ID(foo);
            getId(foo.id)
            getEmail(foo.email)
            getParol(foo.parol)
        }
    }

    const TuggleModal = (typa) => {
        setShowModal(typa);
    }

    setColumCl = async () => {
        return {
            userId: await USER_ID(),
            name: name,
            tel: tel,
            uniqeId: uniqueid
        };
    }

    const createclent = async () => {
        var data = await Store('POST','create_clent', await this.setColumCl());
        data.status === 201 ? await CLearsCl() : null;
    }

    const CLearsCl = async () => {
        await getListClent();
        onName('');
        onTel('');
        onUniqueid('');
        showModalCl(false);
    }

    const sell = async (ty) => {
        if (ty === 1) {
            setQarzopen(true);
            sana && info ? await setSell(ty) : null; 
        } else {
            await setSell(ty);
        }
    }
    
    const setSell = async (ty) => {
        const data = JSON.parse(await AsyncStorage.getItem('addCard'));
        const sum = JSON.parse(await AsyncStorage.getItem('addsumma'));
        if (sum.summa === 0) {
        
        } else {
            var result = await Store('POST','sell_sotuv', {
                typ: ty,
                userId: await USER_ID(),
                items: data,
                all: sum.summa,
                olinish: olinish,
                summa: chegirma,
                chegirma: chegirma2,
                info: info,
                uniqeId: Number(uniqueid2),
                sana: sana,
                kursId :onidkurs,
                kurs :onkursv,
                summak :onkurssum,
                newDate: await date_time()
            });
            result.status === 201 ? await finish() : null;
        }
    }

    const finish = async () => {
        await getList();
        await removeCard();
        await Counter();
        setPradacha(false);
        setShowModal(false);
    }

    const getCard = async () => {
        await getStor();
        onChegirma2(0 + '');
        setShowModal(true);
    }

    const plus_minus = async (row, ty) => {
        var card = JSON.parse(await AsyncStorage.getItem('addCard'));
        const data = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = data.find(item => { if (item.status === true) return item; });
        var pushCard = card.find(item => { return item.karzinaId === typId.id && item.sqladId === row.sqladId });
        if (ty === 1) {
            if (pushCard.soni < pushCard.soni2) {
                pushCard.soni += 1;
                pushCard.olinish = pushCard.soni * Number(pushCard.olinin);
                pushCard.sotilish = pushCard.soni * Number(pushCard.sotilish2);
                await pm(card)
            } else {}
        } else {
            if (pushCard.soni <= pushCard.soni2) {
                pushCard.soni -= 1;
                if (pushCard.soni === 0) {
                    await deler_storeg(row);
                } else {
                    pushCard.olinish = pushCard.soni * Number(pushCard.olinin);
                    pushCard.sotilish = pushCard.soni * Number(pushCard.sotilish2);
                    await pm(card)
                }
            } else {}
        }
    }

    const removeCard = async () => {
        const data = JSON.parse(await AsyncStorage.getItem('addCard'));
        await AsyncStorage.removeItem('addCard');
        const card = JSON.parse(await AsyncStorage.getItem('addId'));
        const typId = card.find(item => { if (item.status === true) return item; });
        const data2 = data.filter((item) => { return item.karzinaId !== typId.id });
        card.map((item, key) => {
            if (item.status === true) {
                deletCard(key);
            } else {}
        });
        await removeCard2(data2);
    }

    const removeCard2 = async (data) => {
        onSumma('');
        onOlinish('');
        onChegirma('');
        onChegirma2('');
        onInfo('');
        onUniqueid2('');
        onSana('');
        await pm(data);
        setQarzopen(false);
    }

    const deler_storeg = async (row) => {
        const data = JSON.parse(await AsyncStorage.getItem('addCard'));
        const card = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = card.find(item => { if (item.status === true) return item; });
        data.map((item, key) => {
            if (item.karzinaId === typId.id && item.sqladId === row.sqladId) {                
                data.splice(key, 1);
            } else {}
        });
        await pm(data);
        onChegirma2(0 + '');
    }

    const pm = async (card) => {
        await AsyncStorage.setItem("addCard", JSON.stringify(card));
        await getStor();
    }

    const getStor = async () => {
        var data = JSON.parse(await AsyncStorage.getItem('addCard'));
        const card = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = card.find(item => { if (item.status === true) return item; });
        var data2 = data ? data.filter((item) => { return item.karzinaId === typId.id }) : null;
        getDataList(data2);
        await allSumma();
    }

    const allSumma = async () => {
        var foo = 0;
        var foo2 = 0;
        var data = JSON.parse(await AsyncStorage.getItem('addCard'));
        const card = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = card.find(item => { if (item.status === true) return item; });
        var data2 = data ? data.filter((item) => { return item.karzinaId === typId.id }) : null;
        if (data2) {
            for (let i = 0; i < data2.length; i++) {
              foo += Number(data2[i].sotilish);
              foo2 += Number(data2[i].olinish);
            }
            await AsyncStorage.setItem("addsumma", JSON.stringify({'summa': foo, 'olinish': foo2}));
            await sum();
        } else {}
    }

    const sum = async () => {
        const sum = JSON.parse(await AsyncStorage.getItem('addsumma'));
        onSumma(sum.summa);
        onChegirma(sum.summa + '');
        onOlinish(sum.olinish + '');
    }
    
    const Counter = async () => {
        var counters = [];
        const card = JSON.parse(await AsyncStorage.getItem('addId'));
        if (card) {
            var typId = card.find(item => { if (item.status === true) return item; });
            if (typId) {
                var count = JSON.parse(await AsyncStorage.getItem('addCard'));
                counters = count ? count.filter((item) => { return item.karzinaId === typId.id }) : null;
            } else {}
        } else {}
        onCount(counters ? counters.length : 0);
    }

    const setPages = (page, i) => {
        onAktiv(i); 
        getPage(page);
    }

    const ochiska = async () => {
        await clearAll(navigation);
    }
    
    const setPage = (data) => {
        navigation.navigate(data);
    }
    
    const onChegirmaFun = async (summa) => {
        var sum = onsumma - summa;
        onChegirma2(sum + '');
        onChegirma(summa + '');
    }

    const onChegirmaFun2 = async (summa) => {
        var sum = onsumma - summa;
        onChegirma2(summa + '');
        onChegirma(sum + '');
    }

    const selectKurs2 = (row) => {
        sendUserCard(row);
        onIdkurs(row.id);
        onKursV(row.kurs);
        onKursSum(parseFloat(row.summa));
    }
      
    const selectKurs = (row) => {
        sendUserCard(row);
        onIdkurs(row.id);
        onKursV(row.kurs);
        onKursSum(parseFloat(row.summa));
        selectAsync(row);
    }

    const selectClent = (row) => {
        onInfo(row.name);
        onUniqueid2(row.uniqeId);
        setmodalClent(false);
    }
    

    const selectAsync = async (row) => {
        var data = JSON.parse(await AsyncStorage.getItem('addCard'));
        const user = JSON.parse(await AsyncStorage.getItem('addId'));
        var typId = user.find(item => { if (item.status === true) return item; });
        var card = data ? data.filter((item) => { return item.karzinaId === typId.id }) : null;
        if (card) {
          for (let i = 0; i < card.length; i++) {
            if (card[i].kursId === 0 && row.id === 0) {
            }
            if (card[i].kursId === 0 && row.id !== 0) {
              card[i].olinin = Number(card[i].olinin) / Number(row.summa);
              card[i].olinish = Number(card[i].olinish) / Number(row.summa);
              card[i].sotilish = Number(card[i].sotilish) / Number(row.summa);
              card[i].sotilish2 = Number(card[i].sotilish2) / Number(row.summa);
            }
            if (card[i].kursId !== 0 && row.id === 0) {
              card[i].olinin = Number(card[i].olinin) * Number(card[i].summa);
              card[i].olinish = Number(card[i].olinish) * Number(card[i].summa);
              card[i].sotilish = Number(card[i].sotilish) * Number(card[i].summa);
              card[i].sotilish2 = Number(card[i].sotilish2) * Number(card[i].summa);
            }
            if (card[i].kursId !== 0 && row.id !== 0) {
              card[i].olinin = Number(card[i].olinin) * Number(card[i].summa) / Number(row.summa);
              card[i].olinish = Number(card[i].olinish) * Number(card[i].summa) / Number(row.summa);
              card[i].sotilish = Number(card[i].sotilish) * Number(card[i].summa) / Number(row.summa);
              card[i].sotilish2 = Number(card[i].sotilish2) * Number(card[i].summa) / Number(row.summa);
            }
            card[i].kursId = row.id;
            card[i].kurs = row.kurs;
            card[i].summa = Number(row.summa);
          }
          
          AsyncStorage.setItem("addCard", JSON.stringify(data));
          await pm(data)
        } else {}
    }

    const getListClick = () => {
        setCorrentPage(0);
        getList(0);
    }

    const nextpage = (count) => {
        var a = correntPage + count;
        setCorrentPage(a);
        getList(a);
    }
    
    const backpage = (count) => {
        var a = correntPage - count;
        if (a === 0 || a < 0) {
            setCorrentPage(0);
            getList(0);
        } else {
            setCorrentPage(a);
            getList(a);
        }
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            setScancode(e)
        }
    }

    const sendPage = () => {
        navigation.navigate('Jonatma');
    }
    
    useEffect(() => {
        Autharize();
        startId();
        getList();
        getKurs();
        Counter();
        getListClent();
        getData(navigation);
    }, []);

    return (
        <View style={{
                flex: 1,
                backgroundColor: "white"
            }}>
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"}/>
            <View className="flex-row border-b-0.5 rounded-b-sm">
                <Text className="grow mt-2 h-14 pl-3" onPress={() => setPage('Profile')}>
                    <View>
                        <Image 
                            source={ require('../../images/user.png') } 
                            className="w-8 h-8"
                        />
                       <Text>
                            { getemail }
                       </Text>
                    </View>
                </Text>
                <Text className="grow text-right">
                    <View className="flex-row w-full pr-2 pt-4">
                        <Text className="grow text-xl text-right mr-4">
                            UZ
                        </Text>
                        <Text className="grow text-lg text-right mr-4 mt-0.5"  
                            onPress={() => sendPage()}>
                            <MaterialIcons name="sms" size={28} color="#475569" />
                        </Text>
                        <View className="mt-2">
                            { 
                                getkarzina && getkarzina.length > 0 ?
                                <Text onPress={() => selectModalCard(true)}
                                    className="w-5 rounded-full text-center justify-center bg-red-600 text-white"
                                    style={{
                                        position: 'absolute',
                                        zIndex: 2
                                    }}
                                >
                                    { getkarzina.length }
                                </Text> : null
                            }
                        </View>
                        <Text className="grow text-right mr-4 mt-0.5"
                            onPress={() => selectModalCard(true)}
                        >
                            <Fontisto name="shopping-bag" size={22} color="#475569" />
                        </Text>
                        <Text className="grow text-center text-lg font-bold bg-green-800 text-white w-6 h-7 rounded-md"
                                onPress={() => addCardPlus()}
                            >
                                +
                        </Text>

                    </View>
                </Text>
            </View>
            <View className="flex-row mt-3 mb-1 mx-1">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text onPress={() => setPages(1, 1)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 1 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Sotuv </Text>
                    <Text onPress={() => setPages(<Adres/>, 2)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 2 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Yetkazuvchi </Text>
                    <Text onPress={() => setPages(<Maintip/>, 3)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 3 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Tip </Text>
                    <Text onPress={() => setPages(<Catigotia/>, 4)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 4 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Catigotia </Text>
                    <Text onPress={() => setPages(<Valyuta/>, 5)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 5 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Valyuta </Text>
                    <Text onPress={() => setPages(<Sqlad/>, 6)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 6 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Sqald </Text>
                        <Text onPress={() => setPages(<Clent/>, 7)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 7 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Clent </Text>
                    <Text onPress={() => setPages(<Sotuv/>, 8)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 8 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Sotuvlar </Text>
                    <Text onPress={() => setPages(<Xarajat/>, 9)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 9 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Xarajatlar </Text>
                        <Text onPress={() => setPages(<Statistik/>, 10)} className="p-1 px-2 rounded-sm mr-1 text-white shadow" 
                        style={ aktiv === 10 ? { backgroundColor: 'blue' } : { backgroundColor: 'green'}}
                    >Statistika</Text>
                </ScrollView>
            </View>
                {
                    aktiv === 1 ?
                        <View className="m-1" style={{
                          flex: 1,
                        }}>
                            <View className="flex-row">
                                <TextInput
                                    className="border border-slate-400 rounded-md grow p-1 basis-1/2 pl-2 mr-1"
                                    // style={styles.input}
                                    value={search}
                                    onChangeText={(search) => onSearch(search)}
                                    placeholder="Izlash"
                                />
                    
                                <Text className="grow rounded-md border border-slate-400 text-center pt-1.5" onPress={() => getListClick()}>
                                    <AntDesign className="" name="search1" size={25}/>
                                </Text>
                            </View>
                    
                        <ScrollView>
                            { 
                                getdata ? getdata.map((items, key) => {
                                    return <View
                                        className="border-b-0.5 border-slate-300 p-2"
                                        key={key}
                                        >
                                        <View className="flex-row">
                                            <View className=" basis-1/1">
                                                <Image 
                                                source={{uri: 'http://localhost:3333/images/' + items.image }}
                                                style={{ width: 100, height: 100 }}
                                                />
                                                
                                            </View>
                                            <View className="grow mx-4">
                                                <Text className="text-2xl">{items.name}</Text>
                                                <Text className="text-md">{items.soni} {items.razmer}</Text>
                                                <Text className="text-md">{formattet.format(items.sotilish)} </Text>
                                                <Text className="text-md">{ formattet.format(items.Kur ? items.Kur.summa : 1)} { items.Kur ? items.Kur.kurs : 'UZS' } </Text>
                                                <View style={styles.flx}>
                                                    <TouchableOpacity className="mr-2" onPress={() => addCard(items)}>
                                                        <Fontisto name="shopping-bag" size={22} color="#475569" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                }) : []
                            }
                        </ScrollView>
            
                            <View className="pt-3 bottom-3">
                                { 
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View style={ count === 0 ? onidkurs === 0 ? {
                                                    backgroundColor: 'blue'
                                                } : {
                                                    backgroundColor: 'green'
                                                } : onidkurs === 0 ? { 
                                                    backgroundColor: 'blue'
                                                } : {
                                                    backgroundColor: '#64748b'
                                                }} 
                                        className="bg-slate-200 p-1 px-2 rounded-sm ml-1 shadow">
                                            <Text className="text-white" onPress={() => count === 0 ? selectKurs2({ "id": 0, "kurs":"UZS", "summa": 1}) : null }>  1 UZS  </Text>
                                        </View>
                                        {
                                        onkurs ? onkurs.map((items, key) => {
                                                return <View style={ count === 0 ? onidkurs === items.id ? {
                                                    backgroundColor: 'blue'
                                                } : {
                                                    backgroundColor: 'green'
                                                } : onidkurs === items.id ? { 
                                                    backgroundColor: 'blue'
                                                } : {
                                                    backgroundColor: '#64748b'
                                                }} 
                                                className="p-1 px-2 rounded-sm ml-1 shadow" key={key}>
                                                    <Text className="text-white" onPress={ () => count === 0 ? selectKurs2(items) : null }>{formattet.format(items.summa)} {items.kurs}</Text>
                                                </View>
                                            }) : []
                                        }
                                    </ScrollView>
                                }
                            </View>
                            <View>
                                <View className="flex-row mt-2 bottom-3">
                                    <TouchableOpacity className="p-1 mr-1 text-cyan-600 border border-red-600 grow rounded-md" onPress={() => backpage(10)}>
                                        <Text className="text-center text-red-600">
                                            <AntDesign name="banckward" size={25} />
                                        </Text>
                                    </TouchableOpacity>
                                    <Text className="grow text-2xl text-center text-blue-500 border border-blue-500 rounded-md pt-1"> 
                                        {correntPage / 10 + 1}
                                    </Text>
                                    <TouchableOpacity className="p-1 ml-1 border border-green-600 grow rounded-md" onPress={() => nextpage(10)}>
                                        <Text className="text-center text-green-700">
                                            <AntDesign name="forward" size={25} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </View> : getpage
                }

                <View className="flex-row bottom-2">
                    <Text className="grow text-center" onPress={() => setPages(1, 1)}>
                        <FontAwesome name="home" size={35} color="#52525b"/>
                    </Text>
                    <Text className="grow text-center mt-0.5">
                        <TouchableOpacity onPress={() => getCard()}>
                            { count > 0 ?
                                <Text
                                    className="w-5 ml-4 rounded-full text-center justify-center bg-red-600 text-white "
                                    style={{
                                    position: 'absolute',
                                    zIndex: 2
                                    }}
                                >
                                    { count }
                                </Text> : null
                            }
                            <Fontisto name="shopping-bag" size={28} color="#52525b" />
                        </TouchableOpacity>
                    </Text>
                    <Text className="grow text-center" onPress={() => setScan(true)}>
                        <AntDesign name="scan1" size={34} color="#52525b"/>
                    </Text>
                    <Text className="grow text-center" onPress={() => setPage('Users')}>
                        <AntDesign name="addusergroup" size={34} color="#52525b"/>
                    </Text>
                    <Text className="grow text-center mt-0.5" onPress={() => ochiska()}>
                        <MaterialIcons name="logout" size={30} color="#52525b"/>
                    </Text>
                </View>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            >
            <View className="border-b-0.5 border-slate-400 p-1.5">
                <View className="flex-row">
                    <View className="grow">
                        <Text style={styles.cretavarred} onPress={() => TuggleModal(false)}>X</Text>
                    </View>
                    <View className="grow">
                        {
                            count ?
                                <Text className="text-right" onPress={() => removeCard()}>
                                    <MaterialIcons name="cleaning-services" size={26} color="red" />
                                </Text> 
                            :  null
                        }
                    </View>
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-1">
                        {
                            getkarzina ? getkarzina.map((item, key)=> {
                                return <View style={ item.status === true ? {
                                    backgroundColor: 'blue'
                                } : {
                                    backgroundColor: 'red'
                                }} className="p-1 px-2 rounded-sm ml-1 shadow" key={key}>
                                    <Text className="text-white text-xs font-bold" onPress={() => selectCard(item)}>
                                        User { item.id } / { item.status === true ? 'Aktive' : 'No Aktive'} / {item.kursName}
                                        {/* { 
                                             getdatalist ? getdatalist.filter((rom) => {
                                                return rom.karzinaId === item.id;
                                            }).length : 0
                                        } */}
                                    </Text>
                                </View>
                            }) : []
                        }
                    </ScrollView>
                </View>
            </View>

          <ScrollView style={styles.scrollVi} >
            { 
                getdatalist ? getdatalist.map((items, key) => {
                    return <View
                        className="border-b-0.5 border-slate-400 mt-2  p-2"
                        key={key}
                        >
                        <View className="flex-row">
                            <View className=" basis-1/1">
                                <Image 
                                    // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                                    source={require('../../images/imag.png')} 
                                    style={{ width: 110, height: 110 }}
                                />
                            </View>
                            <View className="grow pl-4">
                            <Text className="text-xl text-right mr-2">{items.name}</Text>
                            <Text className="text-md text-right mr-2"> {formattet.format(items.sotilish)} { items.kurs || 'UZS' } </Text>
                            <Text className="text-sm text-right mr-2">1 {items.razmer} {formattet.format(items.sotilish2)} { items.kurs || 'UZS' }</Text>
                            <View className="flex-row">
                                <View className="flex-row grow">
                                    <TouchableOpacity className="mt-1" onPress={() => plus_minus(items, 0)}>
                                        <AntDesign name="minuscircleo" size={22} color="red" />
                                    </TouchableOpacity>
                                <Text className="text-xl mx-4 p-0.5">{formattet.format(items.soni)}</Text>
                                    <TouchableOpacity className="mr-2 mt-1" onPress={() => plus_minus(items, 1)}>
                                        <AntDesign name="pluscircleo" size={22} color="blue" />
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row grow basis-1/3"></View>
                                <View className="grow">
                                    <TouchableOpacity className="mr-2 mt-1" onPress={() => deler_storeg(items)}>
                                        <AntDesign name="delete" size={22} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                }) : []
            }
            

           { count > 0 ? <View className="">
            <View className="flex-row">
                <Text className="grow text-xl font-medium p-2 border-t-0.5 border-b-0.5 rounded-t-md border-slate-400">Jami</Text>
                <Text className="grow text-xl font-medium text-right p-2 border-t-0.5 border-b-0.5 rounded-t-md border-slate-400">{ formattet.format(onsumma) } { onkursv } </Text>
            </View>
            { 
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
                    <View style={ onidkurs === 0 ? {
                                backgroundColor: 'blue'
                            } : {
                                backgroundColor: 'green'
                            }}
                        className="bg-slate-200 p-1 px-2 rounded-sm ml-1 shadow">
                        <Text className="text-white" onPress={() => selectKurs({ "id": 0, "kurs":"UZS", "summa": 1})}>  1 UZS  </Text>
                    </View>
                    {
                        onkurs.map((items, key) => {
                            return <View style={ onidkurs === items.id ? {
                                backgroundColor: 'blue'
                            } : {
                                backgroundColor: 'green'
                            }} className="p-1 px-2 rounded-sm ml-1 shadow" key={key}>
                                <Text className="text-white" onPress={ () => selectKurs(items) }>{formattet.format(items.summa)} {items.kurs}</Text>
                            </View>
                        })
                    }
                </ScrollView>
            }
            <View className="flex-row">
                <Text 
                    onPress={() => setPradacha(true)}
                    className="grow bg-green-800 text-slate-200 text-center text-lg font-bold p-3 rounded m-1 mt-2">
                    Sotish
                </Text>
            </View>
          </View> : null }
          </ScrollView>
        </Modal>


        <Modal
            animationType={'slide'}
            transparent={false}
            visible={pradacha}
            >
            <View className="flex-row border-b-0.5 border-slate-400 p-3">
                <View className="grow">
                    <Text style={styles.cretavarred} onPress={() => setPradacha(false)}>X</Text>
                </View>
                <View className="grow">
                    <Text className="text-right text-lg font-bold">{ onkursv }</Text>
                </View>
               
            </View>
            <ScrollView style={styles.scrollVi}>
                <Text className="text-center"> Naqt pul yoki Karta orqali </Text>
                <TextInput className="border border-slate-400 rounded-md p-2 text-right text-lg m-1"
                    value={chegirma}
                    onChangeText={(chegirma) => onChegirmaFun(chegirma)}
                    placeholder="Sotuv narx"
                />
                <TextInput className="border border-slate-400 rounded-md p-2 text-right text-lg m-1"
                    value={chegirma2}
                    onChangeText={(chegirma2) => onChegirmaFun2(chegirma2)}
                    placeholder="Chegirma yoki Qarz"
                />
                <View className="">
                    <Text className="text-center"> Qarzga savdo </Text>

                    <View className="flex-row border rounded-md text-right text-md m-1"
                        style={ qarzopen ? info ? {
                            borderColor: '#64748b'
                        } : {
                            borderColor: 'red'
                        } : {
                            borderColor: '#64748b'
                        }}>
                        <TextInput className="grow basis-1/2 pl-2"
                            value={info}
                            onChangeText={(info) => onInfo(info)}
                            placeholder="Mijoz ismi yoki tel.."
                        />
                        <Text className="grow text-right mt-3 mr-3" onPress={() => setmodalClent(true)}>
                            <AntDesign name="down" size={22} />
                        </Text>
                    </View>

                    <TextInput className="border rounded-md p-2 text-right text-md m-1"
                        value={sana}
                        onChangeText={(sana) => onSana(sana)}
                        placeholder="Qarz muddati"
                        style={ qarzopen ? sana ? {
                            borderColor: '#64748b'
                        } : {
                            borderColor: 'red'
                        } : {
                            borderColor: '#64748b'
                        }}
                    />
                </View>
                <Text className="text-center mt-1"> To`lov turi </Text>
                <View className="flex-row mt-1">
                    <Text className="grow text-center border rounded-md mx-1">
                        <Feather name="user-minus" size={70} color="red" onPress={() => sell(1)}/>
                    </Text>
                    <Text className="grow text-center border rounded-md">
                        <AntDesign name="creditcard" size={70} color="blue" onPress={() => sell(2)}/>
                    </Text>
                    <Text className="grow text-center border rounded-md mx-1" >
                        <FontAwesome name="money" size={70} color="green" onPress={() => sell(3)}/>
                    </Text>
                </View>
            </ScrollView>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={selectmodal}
            >
            <View className="flex-row border-b-0.5 border-slate-400 p-3">
                <View className="grow">
                    <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                    onPress={() => selectModalCard(false)}>X</Text>
                </View>
            </View>
            <View className="p-3">
                <ScrollView className="h-5/6">
                    {
                        getkarzina ? getkarzina.map((item, key) => {
                            return <View className="flex-row" key={key}>
                                <Text className="grow mt-1"
                                    onPress={() => selectCard(item)}
                                    >
                                    <Fontisto name="shopping-bag" size={22} color="#475569" /> 
                                    <View className="flex-row">
                                        <Text className="grow text-md font-bold mx-2" >
                                            User
                                        </Text>
                                        <Text className="grow text-md font-bold">
                                            { item.id } / { item.status === true ? 'Aktive' : 'No Aktive' } / {item.kursId } / {item.kursName} / {item.kursSumma}
                                        </Text>
                                    </View>
                                </Text>
                                <Text 
                                    className="grow mt-1 text-right"
                                    onPress={() => deletCard(key)}
                                    >
                                        <AntDesign name="delete" size={22} color="red" />
                                </Text> 
                            </View>
                        }) : []
                    }
                </ScrollView>
            </View>
        </Modal>
        <Modal
            animationType={'fade'}
            transparent={false}
            visible={modalclent}
            >
               
                <View className="flex-row border-b-0.5 border-slate-400 p-3">
                        <View className="grow">
                            <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                            onPress={() => setmodalClent(false)}>X</Text>
                        </View>
                        <View className="text-right">
                            <Text className="text-center text-lg font-bold bg-green-800 text-white w-7 h-7 rounded-md"
                                onPress={() => showModalCl(true)}
                            >
                                +
                            </Text>
                        </View>
                </View>
                <View className="p-3">
                    <ScrollView className="h-5/6">
                        {
                            dataclent ? dataclent.map((items, key) => {
                                return <Text className="border-b-0.5 text-lg"
                                    key={key} onPress={ () => selectClent(items) }>
                                        { items.name }
                                </Text>
                            }) : []
                        }
                    </ScrollView>
                </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showmodalcl}
            >
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => showModalCl(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                    Mijoz qo'shish
                </Text>
                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={name}
                    onChangeText={(name) => onName(name)}
                    placeholder="Ism familiya"
                />
                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={tel}
                    onChangeText={(tel) => onTel(tel)}
                    placeholder="Telefon"
                />

                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={uniqueid}
                    onChangeText={(uniqueid) => onUniqueid(uniqueid)}
                    placeholder="User ID"
                />

                <View>
                    <Button title='Saqlash' onPress={() => createclent()}/>
                </View>
            </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showmodalcldb}
            >
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => showModalClentDB(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                    Sorovlar
                </Text>


            </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showmodalcldb2}
            >
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => showModalClentDB2(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                    Sorovlar 2
                </Text>
                
            </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={scan}
            >
            <QRCodeScanner
                reactivate={true}
                showMarker={true}
                ref={(node) => { this.scanner = node }}
                onRead={this.onSuccess}
                bottomContent={
                    <View className="flex-row">
                        <Text onPress={() => setScan(false)} className="grow bg-red-600 p-2 rounded-md text-center ml-1  text-white">Stop Scan</Text>
                        <Text onPress={() => this.scanner.reactivate()} className="grow bg-green-600 p-2 rounded-md mx-1 text-center text-white">Screen</Text>
                    </View>
                }
            />
        </Modal>
    </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    aut: {
        textAlign: 'center',
        fontSize: 25
    },
    butt: {
        paddingTop: 20,
        width: 300,
    },
    fon2: {
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    fon: {
        fontSize: 50,
    },

    cretavar: {
        backgroundColor: 'green',
        width: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        marginHorizontal: 4,
        borderRadius: 8
    },
    cretavarred: {
        backgroundColor: 'red',
        width: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 4,
        borderRadius: 5,
    },
    modaldisagin: {
        padding: 5
    },
    titler: {
        textAlign: 'center',
        fontSize: 25
    },

    input: {
        display: 'flex',
        height: 40,
        margin: 2,
        borderWidth: 1,
        marginBottom: 5
    },

    fotostil: {
        height: 100,
        borderTopWidth : 2,
        boderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth : 2,
        borderWidth: 2,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    texStn: {
        fontSize: 25
    },
    texSts: {
        fontSize: 15
    },
    flx: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    scrollVi: {
        height: 500
    },

})