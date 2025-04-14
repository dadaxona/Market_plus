import { StyleSheet, Text, TextInput, View, Button, Linking, Modal, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Destroy, FetchSend, GetN, Store, Update } from "../Send/Send";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { USER_ID } from "../Send/As";
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const formattet = new Intl.NumberFormat('en-US');
const Sqlad = () => {
    // rasimlar
    const [image,  setImage] = useState('');
    const [image2,  setImage2] = useState('');
    // ID lar
    const [ondeletid, onDeletId] = useState('');
    const [onid, onID] = useState('');
    // Qatigoriyalar input ichi
    const [intip2, inTip2] = useState('Tip');
    const [incatigor2, inCatigor2] = useState('Catigoriya');
    const [inadress2, inAdress2] = useState('Yetkazuvchi');
    const [inkurs, inKurs] = useState('Valyuta');
    // Sqaner vs Qr codlar
    const [onqrcodetext, onqrCodetext] = useState('Qr code');
    const [onqrcode, onQrcode] = useState('');
    const [scan,  setScan] = useState(false);
    const [scancode,  setScancode] = useState('');
    // Formalar
    const [incatigor, inCatigor] = useState('');
    const [inadress, inAdress] = useState('');
    const [intip, inTip] = useState('');
    const [catigoria, onCatigor] = useState('');
    const [adress, onAdress] = useState('');
    const [nomi, onNomi] = useState('');
    const [soni, onSoni] = useState('');
    const [razmer, onRazmer] = useState('шт');
    const [olish, onOlish] = useState('');
    const [sotish, onSotish] = useState('');
    const [sana, onSana] = useState(new Date());
    const [opisaniya, setOpisaniya] = useState('');
    const [status, setStatus] = useState(0);
    // onCatigorStr
    const [intipid, inTipId] = useState('');
    const [catigoriastr, onCatigorStr] = useState('');
    // showModalAcreate
    const [namea, onNamea] = useState('');
    const [adressa, onAdressa] = useState('');
    const [phonea, onPhonea] = useState('');
    // Kurs create
    const [kurs,  onKur] = useState('');
    const [summa,  onSumma] = useState('');
    // Kurslar
    const [onidkurs, onIdkurs] = useState(0);
    const [onkursv, onKursV] = useState('UZS');
    const [onkurssum, onKursSum] = useState(1);
    // to`liq datalar keladigan joy
    const [getdata, setData] = useState([]);
    const [onitem, onItem] = useState([]);
    const [onitem2, onItem2] = useState([]);
    const [onitem3, onItem3] = useState([]);
    const [onitem4, onItem4] = useState([]);
    const [onkurs, onKurs] = useState([]);
    // izlash
    const [search, onSearch] = useState('');
    // Modal oynalar
    const [showModal, setShowModal] = useState(false);
    const [modaltip, setModalTip] = useState(false);
    const [setshowmodaldel, setShowModaldel] = useState(false);
    const [modalcatigor, setmodalCatigor] = useState(false);
    const [modaladress, setmodalAdress] = useState(false);
    const [modalKurs, setmodalKurs] = useState(false);
    const [showModalcot, showModalCcreate] = useState(false);
    const [showModalad, showModalAcreate] = useState(false);
    const [showModalku, showModalKu] = useState(false);
    const [setmodalname, setmodalName] = useState(false);
    // pagelar
    const [correntPage,  setCorrentPage] = useState(0);
    const [correntkurspage,  correntKurspage] = useState(0);
    // sana
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    var date1 = moment(sana).format('DD.MM.YYYY');

    const CLears = async () => {
        await getList(correntPage);
        onCatigor('');
        onAdress('');
        inCatigor('');
        inTip('');
        inTipId('');
        inAdress('');
        onIdkurs('');
        onKursV('');
        onKursSum('');
        onNomi('');
        onSoni('');
        onRazmer('');
        onOlish('');
        onSotish('');
        setOpisaniya('');
        onSana(new Date());
        onQrcode('');
        setImage('');
        setImage2('');
        setShowModal(false);
    }

    const TuggleModal = async (typa) => {
        onID('');
        onDeletId('');
        onCatigor('');
        inTip('');
        inTipId('');
        onAdress('');
        inCatigor('');
        inAdress('');
        onIdkurs(0);
        onKursV('UZS');
        onKursSum(1);
        onNomi('');
        onSoni('');
        onRazmer('шт');
        onOlish('');
        onSotish('');
        setImage2('');
        setOpisaniya('');
        onSana(new Date());
        onQrcode('');
        setShowModal(typa);
    }

    const TuggleModal2 = () => {
        onDeletId('');
        onNomi('');
        setShowModaldel(false);
    }

    const edit = (data) => {
        onID(data.id);
        inTipId(data.Catigorium ? onitem4.find(row => { return row.id === data.Catigorium.maintipId }).id : '');
        inTip(data.Catigorium ? onitem4.find(row => { return row.id === data.Catigorium.maintipId }).name : '');
        inCatigor(data.Catigorium ? data.Catigorium.catigoria : '');
        onCatigor(data.catigoriaId || '');
        inAdress(data.Adre ? data.Adre.name : '');
        onAdress(data.adresId || '');
        onIdkurs(data.Kur ? data.Kur.id : '');
        onKursV(data.Kur ? data.Kur.kurs : 'UZS');
        onNomi(data.name + '');
        onSoni(data.soni + '');
        onRazmer(data.razmer + '');
        onOlish(data.olinish + '');
        onSotish(data.sotilish + '');
        onSana(new Date() || '');
        onQrcode(data.qrcode || '');
        setOpisaniya(data.opisaniya || '');
        setImage2('');
        setStatus(data.status || '')
        setShowModal(true);
    }

    const delet = (id, name) => {
        onDeletId(id);
        onNomi(name + '');
        setShowModaldel(true);
    }

    const clerdel = async () => {
        await getList(correntPage);
        onDeletId('');
        onNomi('');
        setShowModaldel(false);
    }

    const delete_tavar = async () => {
        var data = await Destroy('DELETE',`delete_praduct/${ondeletid}`);
        data.status === 201 ? await clerdel() : null;
    }

    // const getKurs = async () => {
    //     onKurs(await GetN(await USER_ID(), 'getlist_kurs', correntkurspage, search || null));
    //     onItem(await GetN(await USER_ID(), 'getlist_catigoria', correntkurspage, search || null));
    //     onItem2(await GetN(await USER_ID(), 'getlist_adres', correntkurspage, search || null));
    // }

    const selectName = async (item) => {
        onNomi(item.name);
        setmodalName(false);
    }

    const selectTip = async (item) => {
        inTipId(item.id);
        inTip(item.name);
        getAllTipname(item.id);
        setModalTip(false);
    }

    const selectCatigor = async (item) => {
        onCatigor(item.id);
        inCatigor(item.catigoria);
        getAllname(item.id);
        setmodalCatigor(false);
    }

    const selectAdress = async (item) => {
        onAdress(item.id);
        inAdress(item.name);
        setmodalAdress(false)
    }

    const selectRazmer = async (item) => {
        onRazmer(item.name);
    }
    
    const getAllTipname = async (c_id) => {
        onItem(await GetN(await USER_ID(), 'getlist_alltipname', correntkurspage, c_id || null));
    }

    const getAllname = async (c_id) => {        
        onItem3(await GetN(await USER_ID(), 'getlist_allname', correntkurspage, c_id || null));
    }


    const getName = () => {
        var data = [];
        onitem3.Sqlads ? onitem3.Sqlads.map((item, key) => {
            if (data && data.length > 0) {
                var row = data.find((rows) => { return rows.name === item.name });
                if (row && item.name === row.name) {} else { data.push(item)}
            } else {data.push(item)}
        }) : []
        return <ScrollView className="h-5/6">
            {
                data ? data.map((items, key) => {
                    return <Text key={key} 
                        className="border-b-0.5 text-lg"
                        onPress={ () => selectName(items) }>
                            { items.name }
                        </Text>
                }) : []
            }
        </ScrollView>
    }

    const getTip = () => {
        return <ScrollView className="h-5/6">
            {
                onitem4 ? onitem4.map((items, key) => {
                    return <Text key={key} 
                        className="border-b-0.5 text-lg"
                        onPress={ () => selectTip(items) }>
                            { items.name }
                        </Text>
                }) : []
            }
        </ScrollView>
    }

    const getCatigor = () => {
        return <ScrollView className="h-5/6">
            {
                onitem.Catigoria ? onitem.Catigoria.map((items, key) => {
                    return <Text key={key} 
                        className="border-b-0.5 text-lg"
                        onPress={ () => selectCatigor(items) }>
                            { items.catigoria }
                        </Text>
                }) : []
            }
        </ScrollView>
    }
    
    const getAdress = () => {
        return  <ScrollView className="h-5/6">
                {
                    onitem2 ? onitem2.map((items, key) => {
                        return <Text className="border-b-0.5 text-lg"
                            key={key} onPress={ () => selectAdress(items) }>
                                { items.name }
                        </Text>
                    }) : []
                }
            </ScrollView>
    }

    const listKurs = () => {
        return <ScrollView className="h-5/6">
            <Text className="border-b-0.5 text-lg" onPress={() => selectKurs({ "id": 0, "kurs":"UZS", "summa": 1})}>1 UZS  </Text>
            {
                onkurs ? onkurs.map((items, key) => {
                    return <Text className="border-b-0.5 text-lg" key={key} onPress={ () => selectKurs(items) }>{formattet.format(items.summa)} {items.kurs}</Text>
                }) : []
            }
        </ScrollView>
    }

    const getRazmer = () => {
        const razmerarr = [
            { 'name': 'шт' },
            { 'name': 'кг' },
            { 'name': 'гр' },
            { 'name': 'мт' },
            { 'name': 'см' },
        ];
        return <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
            razmerarr.map((items, key) => {
                    return <View style={ razmer === items.name ? {
                        backgroundColor: 'blue'
                    } : {
                        borderColor: 'blue'
                    }} className="border p-2 rounded-md ml-1 shadow" key={key}>
                        <Text 
                            style={ razmer === items.name ? { 
                                color: 'white'
                            } : {
                                color: 'black' 
                            }}
                        onPress={ () => selectRazmer(items) }>{ items.name }</Text>
                    </View>
                })
            }
        </ScrollView>
    }

    const selectKurs = (row) => {
        onIdkurs(row.id);
        onKursV(row.kurs);
        onKursSum(row.summa);
        setmodalKurs(false);
    }

    const getList = async (correntPage = 0) => {
        onID('');
        setData(await GetN(await USER_ID(), 'getlist', correntPage, search || null));
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
    
    const updateTovar = async () => {
        var data = image2 ? await FetchSend('PUT',`update_praduct/${onid}`,
            image
        ) : await Update('PUT',`update_praduct/${onid}`,
            await this.setColum()
        )
        data.status === 201 ? await CLears() : null;
    }

    const createTavar = async () => {
        var data = image2 ? await FetchSend('POST','create_praduct',
            image
        ) : await Update('POST','create_praduct',
            await this.setColum()
        )
        data.status === 201 ? await CLears() : null;
    }

    setColum = async () => {
        return {
            userId: Number(await USER_ID()),
            catigoriaId: Number(catigoria),
            adresId: Number(adress),
            kursId: Number(onidkurs),
            name: nomi,
            soni: Number(soni),
            razmer: razmer,
            olinish: olish,
            sotilish: sotish,
            opisaniya: opisaniya,
            qrcode: onqrcode,
            sana: date1,
            status: Number(status),
         };
     }

    const selectFC = async (typ) => {
        var formData = new FormData();
        formData.append('userId', Number(await USER_ID()));
        formData.append('catigoriaId', Number(catigoria));
        formData.append('adresId', Number(adress));
        formData.append('kursId', Number(onidkurs));
        formData.append('name', nomi);
        formData.append('soni', Number(soni));
        formData.append('razmer', razmer);
        formData.append('olinish', olish);
        formData.append('sotilish', sotish);
        formData.append('sana', date1);
        formData.append('qrcode', onqrcode);
        formData.append('opisaniya', opisaniya);
        formData.append('status', Number(status));
        const result = typ === 1 ? await launchCamera({mediaType: 'photo', quality: 0})
                                 : await launchImageLibrary({mediaType: 'photo', quality: 0})
        if (result && result.didCancel !== true) {
            formData.append('file', {
               uri: result.assets[0].uri,
               name: result.assets[0].fileName,
               type: result.assets[0].type
            });
            setImage2(result.assets[0].fileName);
            setImage(formData);
        } else {
            setImage2('');
        }
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            setScancode(e)
        }
    }
    // Tip
    const getCot = async () => {
        onItem4(await GetN(await USER_ID(), 'getlist_maintip', correntkurspage, search || null));
    }
    
    setColumCot = async () => {
        return {
            maintipId: intipid,
            catigoria: catigoriastr,
        };
    }

    const createCot = async () => {
        var data = await Store('POST','create_catigoria', await this.setColumCot());
        data.status === 201 ? await CLearsCot() : null;
    }

    const CLearsCot = async () => {
        onCatigorStr('');
        await getCot();
        getAllTipname(intipid);
        showModalCcreate(false);
    }
    // Yetkazuvchi
    const getAd = async () => {
        onItem2(await GetN(await USER_ID(), 'getlist_adres', correntkurspage, search || null));
    }
    
    setColumAd = async () => {
        return {
            userId: await USER_ID(),
            name: namea,
            adress: adressa,
            phone: phonea,
        };
    }

    const createAd = async () => {
        var data = await Store('POST','create_adres', await this.setColumAd());
        data.status === 201 ? await CLearsAd() : null;
    }

    const CLearsAd = async () => {
        onNamea('');
        onAdressa('');
        onPhonea('');
        await getAd();
        showModalAcreate(false);
    }

    // Valyuta
    const getKu = async () => {
        onKurs(await GetN(await USER_ID(), 'getlist_kurs', correntkurspage, search || null));
    }
    
    setColumKu = async () => {
        return {
            userId: await USER_ID(),
            kurs: kurs,
            summa: summa,
        };
    }

    const createKu = async () => {
        var data = await Store('POST','create_kurs', await this.setColumKu());
        data.status === 201 ? await CLearsKu() : null;
    }

    const onNomifn = (row) => {
        onNomi(row);
        setOpisaniya(row);
    }

    const CLearsKu = async () => {
        onKur('');
        onSumma('');
        await getKu();
        showModalKu(false);
    }

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setDatePickerVisible(false);
        onSana(date);
    };

    useEffect(() => {
        getList();
        getCot();
        getAd();
        getKu();
        // getKurs();
    }, [])

  return (
    <View className="m-1" style={{
        flex: 1
      }}>

        <View style={{
            flex: 1
        }}>
            <View className="flex-row">
                <Text onPress={() => TuggleModal(true)} className="border border-slate-400 rounded-md px-3 py-1" style={{width: 50}}>
                    <Entypo
                        name="add-to-list" 
                        size={25} 
                        color="green"
                    />
                </Text>

                <TextInput
                    className="border border-slate-400 rounded-md grow p-1 basis-1/2 mx-1"
                    // style={styles.input}
                    value={search}
                    onChangeText={(search) => onSearch(search)}
                    placeholder="Izlash"
                />

                <Text className="grow rounded-md border border-slate-400 text-center pt-1.5" onPress={() => getList()}>
                    <AntDesign className="" name="search1" size={25}/>
                </Text>
            </View>

        </View>

        <View style={{
            flex: 10
          }}>
            <ScrollView style={{ flex: 10 }}>
                { 
                     getdata ? getdata.map((items, key) => {
                        return <View
                        className="border-b-0.5 border-slate-400 p-2"
                        key={key}
                        >
                        <View className="flex-row">
                            <View className=" basis-1/1">
                                <Image
                                    source={{uri: 'http://localhost:3333/images/' + items.image}}
                                    style={{ width: 100, height: 100 }}
                                />
                                <View className="flex-row">
                                    <Text className="grow text-center" onPress={() => delet(items.id, items.name)}>
                                        <AntDesign name="delete" size={25} color="red" />
                                    </Text>
                                    <Text className="grow text-center" onPress={() => edit(items)}>
                                        <FontAwesome name="edit" size={28} color="green" />
                                    </Text>
                                </View>
                            </View>
                            <View className="grow mx-4">
                                <Text className="text-lg">{items.name}</Text>
                                <View className="flex-row">
                                    <Text className="grow text-sm">Catigoria </Text>
                                    <Text className="grow text-sm text-right">{items.Catigorium ? items.Catigorium.catigoria : ''} </Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">Yetkazuvchi </Text>
                                    <Text className="grow text-sm text-right">{items.Adre ? items.Adre.name : ''} </Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">{items.razmer} </Text>
                                    <Text className="grow text-sm text-right">{formattet.format(items.soni)}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">Olinish </Text>
                                    <Text className="grow text-sm text-right">{formattet.format(items.olinish)}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">Soltilish </Text>
                                    <Text className="grow text-sm text-right">{formattet.format(items.sotilish)}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">{ items.Kur ? items.Kur.id !== 0 ? items.Kur.kurs : 'UZS' : 'UZS' } </Text>
                                    <Text className="grow text-sm text-right">{formattet.format( items.Kur ? items.Kur.id !== 0 ? items.Kur.summa : 1 : 1 )}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">Sana </Text>
                                    <Text className="grow text-sm text-right">{items.sana}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="grow text-sm">status </Text>
                                    <Text className="grow text-sm text-right">{items.status}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    }) : []
                }
            </ScrollView>
          </View>

          <View style={{
              flex: 1
            }}>
                <View>
                    {
                        <View className="flex-row mt-2">
                            <TouchableOpacity className="p-2 mr-1 text-cyan-600 border border-red-600 grow rounded-md" onPress={() => backpage(10)}>
                                <Text className="text-center text-red-600">
                                    <AntDesign name="banckward" size={25} />
                                </Text>
                            </TouchableOpacity>
                            <Text className="grow text-3xl text-center text-blue-500 border border-blue-500 rounded-md pt-1"> 
                                {correntPage / 10 + 1}
                            </Text>
                            <TouchableOpacity className="p-2 ml-1 border border-green-600 grow rounded-md" onPress={() => nextpage(10)}>
                                <Text className="text-center text-green-700">
                                    <AntDesign name="forward" size={25} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>

        {/* 
            <FlatList 
                data={getdata}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={renderFootrer}
                onEndReached={hendLoadMore}
                onEndReachedThreshold={0}
            /> 
        */}

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            >
            <View style={styles.modaldisagin}>
                <Text style={styles.cretavarred} onPress={() => TuggleModal(false)}>X</Text>
                <Text style={styles.titler}>
                    Tovar joylash
                </Text>
                <ScrollView style={{
                    height: '100%'
                }}>
                    <View className="flex-row border border-slate-400 rounded-md p-2">
                        <Text className="grow basis-1/4" onPress={() => setmodalAdress(true)}>
                            { adress ? inadress : inadress2 }
                        </Text>
                        <Text className="grow text-right" onPress={() => setmodalAdress(true)}>
                            <AntDesign name="down" size={18} />
                        </Text>
                    </View>
                    <View className="flex-row mt-1 mb-1">
                        <View className="grow basis-1/2 flex-row border border-slate-400 rounded-md p-2 mr-1">
                            <Text className="grow basis-1/4" onPress={() => setModalTip(true)}>
                                { intip ? intip : intip2 }
                            </Text>
                            <Text className="grow text-right" onPress={() => setModalTip(true)}>
                                <AntDesign name="down" size={18} />
                            </Text>
                        </View>
                        <View className="grow basis-1/2 flex-row border border-slate-400 rounded-md p-2">
                            <Text className="grow basis-1/4" onPress={() => setmodalCatigor(true)}>
                                { catigoria ? incatigor : incatigor2 } 
                            </Text>
                            <Text className="grow text-right" onPress={() => setmodalCatigor(true)}>
                                <AntDesign name="down" size={18} />
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row mb-1">
                        <View className="flex-row">
                            <TextInput
                                className="grow basis-1/2 border border-slate-400 rounded-md p-1 mr-1"
                                value={nomi}
                                onChangeText={(nomi) => onNomifn(nomi)}
                                placeholder="Tovar nomi"
                            />
                            <Text className="grow text-right" 
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: 10
                                }}
                                onPress={() => setmodalName(true)}>
                                <AntDesign name="down" size={18} />
                            </Text>
                        </View>
                        <View className="flex-row">
                            <TextInput
                                className="grow basis-1/2 border border-slate-400 rounded-md p-1"
                                value={soni}
                                onChangeText={(soni) => onSoni(soni)}
                                placeholder="Tovar soni"
                            />
                        </View>
                    </View>
                    {/* <Text className="text-right mb-1">
                        { getRazmer() }
                    </Text> */}
                    <View className="flex-row mb-1">
                        <TextInput
                            className="grow basis-1/2 border border-slate-400 rounded-md p-1 mr-1"
                            value={olish}
                            onChangeText={(olish) => onOlish(olish)}
                            placeholder="Olish narx"
                        />
                        <TextInput
                            className="grow basis-1/2 border border-slate-400 rounded-md p-1"
                            value={sotish}
                            onChangeText={(sotish) => onSotish(sotish)}
                            placeholder="Sotish narx"
                        />
                    </View>
                    <View className="flex-row mb-1">
                        <View className="grow basis-1/2 flex-row border border-slate-400 rounded-md p-2 mr-1">
                            <Text className="grow basis-1/4" onPress={() => setmodalKurs(true)}>
                                { onidkurs !== 0 ? onkursv : inkurs }
                            </Text>
                            <Text className="grow text-right" onPress={() => setmodalKurs(true)}>
                                <AntDesign name="down" size={18} />
                            </Text>
                        </View>
                        <View className="grow basis-1/2 flex-row border border-slate-400 rounded-md p-2">
                            <Text className="grow basis-1/4">
                                { date1 } 
                            </Text>
                            <Text className=" text-center" onPress={() => showDatePicker()}>
                                <Fontisto className="" name="date" size={18}/>
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row mb-1">
                        <View className="grow basis-1/2 flex-row border border-slate-400 rounded-md p-2 mr-1">
                            <Text className="grow basis-1/4" onPress={() => setScan(true)}>
                                { onqrcode || onqrcodetext }
                            </Text>
                            <Text className="grow text-right" onPress={() => setScan(true)}>
                                <AntDesign name="scan1" size={18} />
                            </Text>
                        </View>
                        <TextInput
                            className="grow border basis-1/2 border-slate-400 rounded-md p-1"
                            value={opisaniya}
                            onChangeText={(opisaniya) => setOpisaniya(opisaniya)}
                            placeholder="Qo`shimcha malumotlar"
                        />
                    </View>
                
                    <Text> { image2 } </Text>
                    <View className="flex-row grow border basis-1/2 border-slate-400 h-24 rounded-md text-center">
                        <Text className="grow w-50 h-50 text-center" onPress={() => selectFC(1)}>
                            <Image 
                                source={require('../../images/ddd.png')}
                                style={{ width: 50, height: 50 }}
                            />
                        </Text>
                        <Text className="grow w-50 h-50 text-center mt-1" onPress={() => selectFC(2)}>
                            <Image 
                                source={require('../../images/1038803.png')}
                                style={{ width: 50, height: 50 }}
                            />
                        </Text>
                    </View>
                        {
                        onid ? 
                            <View className="flex-row mt-1">
                                    <Text  
                                        className="grow bg-green-800 text-white text-center p-4 rounded-md mr-1"
                                        onPress={() => updateTovar()}>
                                        Yangilash
                                    </Text>
                                    <Text  
                                        className="grow bg-blue-800 text-white text-center p-4 rounded-md"
                                        onPress={() => createTavar()}>
                                        Saqlash
                                    </Text>
                            </View> :
                            <View className="flex-row mt-1">
                                <Text  
                                    className="grow bg-stone-500 text-white text-center p-4 rounded-md mr-1">
                                    Yangilash
                                </Text>
                                <Text  
                                    className="grow bg-blue-800 text-white text-center p-4 rounded-md"
                                    onPress={() => createTavar()}>
                                    Saqlash
                                </Text>
                            </View>
                        }
                </ScrollView>
            </View>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={setshowmodaldel}
            >
            <View style={styles.modaldisagin}>
                <Text className="text-center p-2 text-3xl">O`chirish</Text>
                <TextInput
                    className="border border-slate-400 rounded-md mb-2 p-1"
                    value={nomi}
                    onChangeText={(nomi) => onNomi(nomi)}
                    placeholder="Tovar nomi"
                />
                <View className="mb-2 flex-row text-center">
                    <TouchableOpacity className="bg-[#dc2626] p-2 mr-1 grow rounded-md" onPress={() => TuggleModal2()}>
                       <Text className="text-center text-white">Yo`q</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#0284c7] p-2 ml-1 grow rounded-md" onPress={() => delete_tavar()}>
                        <Text className="text-center text-white">O`chirish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={setmodalname}
            >
                <View className="flex-row border-b-0.5 border-slate-400 p-3">
                    <View className="grow">
                        <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                        onPress={() => setmodalName(false)}>X</Text>
                    </View>
                </View>
                <View className="p-3">
                    { getName() }
                </View>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={modaltip}
            >
                <View className="flex-row border-b-0.5 border-slate-400 p-3">
                    <View className="grow">
                        <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                        onPress={() => setModalTip(false)}>X</Text>
                    </View>
                </View>
                <View className="p-3">
                    { getTip() }
                </View>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={modalcatigor}
            >
                <View className="flex-row border-b-0.5 border-slate-400 p-3">
                    <View className="grow">
                        <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                        onPress={() => setmodalCatigor(false)}>X</Text>
                    </View>
                    <View className="text-right">
                        <Text className="text-center text-lg font-bold bg-green-800 text-white w-7 h-7 rounded-md"
                            onPress={() => showModalCcreate(true)}
                        >
                            +
                        </Text>
                    </View>
                </View>
                <View className="p-3">
                    { getCatigor() }
                </View>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={modaladress}
            >
                <View className="flex-row border-b-0.5 border-slate-400 p-3">
                    <View className="grow">
                        <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                        onPress={() => setmodalAdress(false)}>X</Text>
                    </View>
                    <View className="text-right">
                        <Text className="text-center text-lg font-bold bg-green-800 text-white w-7 h-7 rounded-md"
                            onPress={() => showModalAcreate(true)}
                        >
                            +
                        </Text>
                    </View>
                </View>
                <View className="p-3">
                    { getAdress() }
                </View>
        </Modal>

        <Modal
            animationType={'fade'}
            transparent={false}
            visible={modalKurs}
            >
                <View className="flex-row border-b-0.5 border-slate-400 p-3">
                    <View className="grow">
                        <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                        onPress={() => setmodalKurs(false)}>X</Text>
                    </View>
                    <View className="text-right">
                        <Text className="text-center text-lg font-bold bg-green-800 text-white w-7 h-7 rounded-md"
                            onPress={() => showModalKu(true)}
                        >
                            +
                        </Text>
                    </View>
                </View>
                <View className="p-3">
                    { listKurs() }
                </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModalcot}
            >
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => showModalCcreate(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                    Catigoriya
                </Text>
                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={catigoriastr}
                    onChangeText={(catigoriastr) => onCatigorStr(catigoriastr)}
                    placeholder="Catigoriya"
                />

                <View>
                    <Button title='Saqlash' onPress={() => createCot()}/>
                </View>
            </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModalad}
            >
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => showModalAcreate(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                    Yetkazuvchi
                </Text>
                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={namea}
                    onChangeText={(namea) => onNamea(namea)}
                    placeholder="Nomi"
                />
   
                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={adressa}
                    onChangeText={(adressa) => onAdressa(adressa)}
                    placeholder="Manzil"
                />

                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={phonea}
                    onChangeText={(phonea) => onPhonea(phonea)}
                    placeholder="Phone"
                />
                <View>
                    <Button title='Saqlash' onPress={() => createAd()}/>
                </View>
            </View>
        </Modal>

        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModalku}
            >
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => showModalKu(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                  Valyuta qo'shish
                </Text>
                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={kurs}
                    onChangeText={(kurs) => onKur(kurs)}
                    placeholder="Valyuta nomi"
                />

                <TextInput
                    className="border border-slate-400 rounded-md p-2 mb-2"
                    value={summa}
                    onChangeText={(summa) => onSumma(summa)}
                    placeholder="Valyuta summa"
                />

                <View>
                    <Button title='Saqlash' onPress={() => createKu()}/>
                </View>
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
                onRead={this.onSuccess}
                bottomContent={
                    <View className="flex-row">
                        <Text onPress={() => setScan(false)} className="grow bg-red-600 p-2 rounded-md text-center ml-1  text-white">Stop Scan</Text>
                        <Text onPress={() => this.scanner.reactivate()} className="grow bg-green-600 p-2 rounded-md mx-1 text-center text-white">Screen</Text>
                    </View>
                }
            />
        </Modal>

        <DateTimePickerModal
            date={sana}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    </View>
  )
}

export default Sqlad

const styles = StyleSheet.create({
    cretavarred: {
        backgroundColor: 'red',
        width: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 4,
        borderRadius: 8
    },
    modaldisagin: {
        padding: 5
    },
    titler: {
        textAlign: 'center',
        fontSize: 25
    },
    fon2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fon: {
        fontSize: 50,
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

    scrollVi: {
        height: 500
      },

})