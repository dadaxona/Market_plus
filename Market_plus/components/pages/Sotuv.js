import { StyleSheet, Text, TextInput, View, Modal, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Destroy, GetN, SotuvFilter, Update } from "../Send/Send";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { date_time, USER_ID } from "../Send/As";
import AsyncStorage from "@react-native-async-storage/async-storage";
var formattet = new Intl.NumberFormat('en-US');

const Sotuv = () => {
    const [search,  onSearch] = useState('');
    const [search2,  onSearch2] = useState('');
    const [count, onCount] = useState(0);
    
    const [onid, onID] = useState('');
    const [ondeletid, onDeletId] = useState('');
    const [nomi, onNomi] = useState('');
    const [sana, onSana] = useState('');
    const [info, onInfo] = useState('');
    const [onprise, onPrise] = useState('');

    const [onidkurs, onIdkurs] = useState(0);
    const [onkursv, onKursV] = useState('UZS');
    const [onkurssum, onKursSum] = useState(1);

    const [getfilter, setFilter] = useState(false);
    const [getfilterlink, setFilterlink] = useState(false);
    
    const [showModal, setShowModal] = useState(false);
    const [showModallist, setModalLIst] = useState(false);
    const [setshowmodaldel, setShowModaldel] = useState(false);
    
    const [onsumma, onSumma] = useState('');
    const [olinish, onOlinish] = useState('');
    const [chegirma, onChegirma] = useState('');
    const [chegirma2, onChegirma2] = useState('');
    
    const [onkurs, onKurs] = useState([]);
    const [getdata,  setData] = useState([]);
    const [getdatalist,  getDataList] = useState([]);
    const [sotuv2sdata,  sotuv2sData] = useState([]);
    
    const [correntPage,  setCorrentPage] = useState(0);
    const [correntkurspage,  correntKurspage] = useState(0);

    const setDataList = async (data) => {
        sotuv2sData(data);
        setModalLIst(true);
    }

    const deleteCard = (id, prise, typ) => {
        onDeletId(id);
        onPrise(prise);
        onNomi(typ === "1" ? 'Qarzga' : typ === "2" ? 'Karta' : 'Naqt');
        setShowModaldel(true);
    }

    const delete_tavar = async () => {
        var data = await Destroy('DELETE',`delete_sotuv/${ondeletid}`);
        data.status === 201 ? await clerdel() : null;
    }

    const clerdel = async () => {
        await getList();
        onDeletId('');
        onNomi('');
        onPrise('');
        setShowModaldel(false);
    }

    const TuggleModal2 = () => {
        onDeletId('');
        onNomi('');
        onPrise('');
        setShowModaldel(false);
    }
    
    const TuggleModal = (typa) => {
        setShowModal(typa);
    }

    const removeCard = async () => {
        await AsyncStorage.removeItem('addCard2');
        await AsyncStorage.removeItem('addsumma2');
        onID('');
        onSumma('');
        onOlinish('');
        onChegirma('');
        onChegirma2('');
        onIdkurs(0);
        onKursV('UZS');
        onKursSum(1);
        onSana('');
        Counter();
    }

    const getList = async (correntPage = 0, search = null) => {
        setData(await SotuvFilter(await USER_ID(), 'get_sotuv', correntPage, search));
    }

    const getList2 = async () => {
        setData(await SotuvFilter(await USER_ID(), 'get_sotuv', 0, search2));
    }

    const getFilter = async (bol) =>{
        setFilterlink(false);
        setFilter(bol);
        onSearch('');
        getList();
    }

    const filterLink = async (typ) => {
        setFilterlink(typ);
        onSearch(typ);
        setCorrentPage(0);
        getList(0, typ);
    }
     
    const selectKurs = (row) => {
        onIdkurs(row.id);
        onKursV(row.kurs);
        onKursSum(row.summa);
        selectAsync(row)
    }

    const selectAsync = async (row) => {
        var card = JSON.parse(await AsyncStorage.getItem('addCard2'));
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
            AsyncStorage.setItem("addCard2", JSON.stringify(card));
            onChegirma2(0 + '');
            await pm(card, 0)
        } else {}
    }

    const plus_minus = async (id, i, ty) => {
        var card = JSON.parse(await AsyncStorage.getItem('addCard2'));
        var pushCard = card.find(item => { return item.sqladId === id });
        if (ty === 1) {
            pushCard.soni += 1;
            pushCard.olinish = pushCard.soni * Number(pushCard.olinin);
            pushCard.sotilish = pushCard.soni * Number(pushCard.sotilish2);
            await pm(card, chegirma2);
        } else {
            pushCard.soni -= 1;
            if (pushCard.soni === 0) {
                await deler_storeg(i);
            } else {
                pushCard.olinish = pushCard.soni * Number(pushCard.olinin);
                pushCard.sotilish = pushCard.soni * Number(pushCard.sotilish2);
                await pm(card, chegirma2);
            }
        }
    }

    const deler_storeg = async (i) => {
        var card = JSON.parse(await AsyncStorage.getItem('addCard2'));
        card.splice(i, 1);
        await pm(card, chegirma2)
    }

    const EditeCard = async (data) => {
        AsyncStorage.setItem("addCard2", JSON.stringify(data.Sotuv2s));
        onID(data.id);
        onChegirma(data.summa + '');
        onChegirma2(data.chegirma + '');
        onSana(data.sana + '');
        onInfo(data.info + '');
        onIdkurs(data.kursId);
        onKursV(data.kurs);
        onKursSum(data.summak);
        await getCard(data.chegirma);
    }

    const getCard = async (chegirma2) => {
        await getStor(chegirma2);
        setShowModal(true);
    }

    const pm = async (card, chegirma2) => {
        await AsyncStorage.setItem("addCard2", JSON.stringify(card));
        await getStor(chegirma2);
    }

    const getStor = async (chegirma2) => {
        const data = JSON.parse(await AsyncStorage.getItem('addCard2'));
        await allSumma(data || [], chegirma2);
        getDataList(data);
        await Counter();
    }

    const allSumma = async (card, chegirma2) => {
        var foo = 0;
        var foo2 = 0;
        for (let i = 0; i < card.length; i++) {
            foo += Number(card[i].sotilish);
            foo2 += Number(card[i].olinish);
        }
        await AsyncStorage.setItem("addsumma2", JSON.stringify({'summa': foo, 'olinish': foo2}));
        await sum(chegirma2);
    }

    const sum = async (chegirma2) => {
        const sum = JSON.parse(await AsyncStorage.getItem('addsumma2'));
        onChegirma(sum.summa - chegirma2 + '');
        onSumma(sum.summa + '');
        onOlinish(sum.olinish + '');
    }

    const Counter = async () => {
        var count = JSON.parse(await AsyncStorage.getItem('addCard2'));
        onCount(count ? count.length : 0);
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

    const sell = async (ty) => {
        if (ty === 1) {
            sana && info ? await setSell(ty) : null;
        } else {
            await setSell(ty);
        }
    }

    const setSell = async (ty) => {
        const data = JSON.parse(await AsyncStorage.getItem('addCard2'));
        const sum = JSON.parse(await AsyncStorage.getItem('addsumma2'));
        if (sum.summa === 0) {
            
        } else {
            var result = await Update('PUT',`update_sotuv/${onid}`, {
                typ: ty,
                userId: await USER_ID(),
                items: data,
                all: sum.summa,
                olinish: olinish,
                summa: chegirma,
                chegirma: chegirma2,
                info: info,
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
      await getList(correntPage, search);
      await removeCard();
      setShowModal(false);
    }

    const renderItem = () => {
        return (
            getdata ? getdata.map((items, key) => {
            return <View
                className="border mt-1 p-2 rounded-md shadow"
                style={ items.typ === "1" ? {
                    borderColor: 'red'
                } : {
                    borderColor: '#a1a1aa'
                }}
                key={key}
                >
                <View className="flex-row">
                    <Text className="grow text-md font-bold">To`lov</Text>
                    <Text className="grow text-md font-bold text-right">{ items.typ === "1" ? 'Qarzga' : items.typ === "2" ? 'Karta' : 'Naqt' }</Text>
                </View>
                <View className="flex-row">
                    <Text className="grow text-md font-bold">Turi</Text>
                    <Text className="grow text-md font-bold text-right">{items.kurs}</Text>
                </View>
                <View className="flex-row">
                    <Text className="grow text-md font-bold">Jami</Text>
                    <Text className="grow text-md font-bold text-right">{formattet.format(items.all)}</Text>
                </View>
                <View className="flex-row">
                    <Text className="grow text-md font-bold">Summa</Text>
                    <Text className="grow text-md font-bold text-right">{formattet.format(items.summa)}</Text>
                </View>
                <View className="flex-row">
                    <Text className="grow text-md font-bold">Olinish</Text>
                    <Text className="grow text-md font-bold text-right">{formattet.format(items.olinish)}</Text>

                </View>
                {
                    parseFloat(items.chegirma) > 0 ? 
                    <View className="flex-row">
                        <Text className="grow text-md font-bold">Chegirma</Text>
                        <Text className="grow text-md font-bold text-right">{formattet.format(items.chegirma)}</Text>
                    </View> : null
                
                }
                {
                    items.sana ? <View className="flex-row">
                        <Text className="grow text-md font-bold">Sana</Text>
                        <Text className="grow text-md font-bold text-right">{items.sana}</Text>
                    </View> : null
                }
                {
                    items.info ? <View className="flex-row">
                        <Text className="grow text-md font-bold">Malumot</Text>
                        <Text className="grow text-md font-bold text-right">{items.info}</Text>
                    </View> : null
                }
                <Text className="text-right">
                    <View className="flex-row">
                        <TouchableOpacity className="p-1" onPress={() => setDataList(items.Sotuv2s)}>
                            <Text className="text-center text-blue-800">
                                <FontAwesome name="info" size={26} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mx-2 pt-1" onPress={() => deleteCard(items.id, items.all, items.typ)}>
                            <AntDesign name="delete" size={25} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-1" onPress={() => EditeCard(items)}>
                            <FontAwesome name="edit" size={28} color="green" /> 
                        </TouchableOpacity>
                    </View>
                </Text>
            </View>
            }) : []
        );
    }

    const renderItem2 = () => {
      return (
        getdatalist ? getdatalist.map((items, key) => {
          return <View
            className="border-b-0.5 border-slate-400 mt-2  p-2"
            key={key}
            >
            <View className="flex-row">
              <View className=" basis-1/1">
                <Image 
                  source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                  style={{ width: 90, height: 110 }}
                />
              </View>
              <View className="grow pl-4">
                <Text className="text-xl text-right mr-2">{items.name}</Text>
                <Text className="text-md text-right mr-2"> {formattet.format(Number(items.sotilish))} { items.kurs || 'UZS' } </Text>
                <Text className="text-sm text-right mr-2">1 {items.razmer} {formattet.format(Number(items.sotilish2))} { items.kurs || 'UZS' }</Text>
                <View className="flex-row">
                  <View className="flex-row grow">
                    <TouchableOpacity className="mt-1" onPress={() => plus_minus(items.sqladId, key, 0)}>
                      <AntDesign name="minuscircleo" size={22} color="red" />
                    </TouchableOpacity>
                    <Text className="text-xl mx-4 p-0.5">{formattet.format(items.soni)}</Text>
                    <TouchableOpacity className="mr-2 mt-1" onPress={() => plus_minus(items.sqladId, key, 1)}>
                      <AntDesign name="pluscircleo" size={22} color="blue" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row grow basis-1/3"></View>
                  <View className="grow">
                    <TouchableOpacity className="mr-2 mt-1" onPress={() => deler_storeg(key)}>
                      <AntDesign name="delete" size={22} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        }) : []
      );
    }

  const getKurs = async () => {
      onKurs(await GetN(await USER_ID(), 'getlist_kurs', correntkurspage, search || null));
  }

  const listKurs = () => {
        return <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={ onidkurs === 0 ? {
                        backgroundColor: 'blue'
                    } : {
                        backgroundColor: 'green'
                    }}
            className="bg-slate-200 p-2 rounded-md ml-1 shadow">
                <Text className="text-white" onPress={() => selectKurs({ "id": 0, "kurs":"UZS", "summa": 1})}>  1 UZS  </Text>
            </View>
            {
                onkurs.map((items, key) => {
                    return <View style={ onidkurs === items.id ? {
                        backgroundColor: 'blue'
                    } : {
                        backgroundColor: 'green'
                    }} className="p-2 rounded-md ml-1 shadow" key={key}>
                                <Text className="text-white" onPress={ () => selectKurs(items) }>{formattet.format(items.summa)} {items.kurs}</Text>
                            </View>
                })
            }
        </ScrollView>
    }
    const pageLinkView = () => {
        return (
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
        )
    }

    const nextpage = (count) => {
        var a = correntPage + count;
        setCorrentPage(a);
        getList(a, search);
    }

    const backpage = (count) => {
        var a = correntPage - count;
        if (a === 0 || a < 0) {
            setCorrentPage(0);
            getList(0, search);
        } else {
            setCorrentPage(a);
            getList(a, search);
        }
    }

    useEffect(() => {
        getList(correntPage, search);
        getKurs();
        Counter();
    }, [])

  return (
    <View className="m-1" style={{
        flex: 1,
      }}>
        <View style={{
              flex: 1
            }}>
            <View className="flex-row">
                <View className="grow flex-row border border-slate-400 rounded-md">
                    <TextInput
                        className=" grow p-1 basis-1/2 mr-1 pl-2"
                        // style={styles.input}
                        value={search2}
                        onChangeText={(search2) => onSearch2(search2)}
                        placeholder="Izlash"
                    />

                    <Text className="grow text-center pt-1.5" onPress={() => getList2()}>
                        <AntDesign className="" name="search1" size={25}/>
                    </Text>
                    { getfilter ?
                        <Text className="text-center pt-1.5 pr-2 tex" onPress={() => getFilter(false)}>
                            <MaterialCommunityIcons className="" name="filter-off-outline" size={25}/>
                        </Text> :
                        <Text className="text-center pt-1.5 pr-2" onPress={() => getFilter(true)}>
                            <MaterialCommunityIcons className="" name="filter-outline" size={25}/>
                        </Text>
                    }
                </View>
            </View>
        </View>
        {
            getfilter ?
                <View className="flex-row">
                    <Text className="grow p-1 text-center text-lg border-l-0.5" 
                    style={ getfilterlink === 3 ? {
                        backgroundColor: 'blue',
                        color: 'white'
                    } : {}}
                    onPress={() => filterLink(3)}>
                        Naqt
                    </Text>
                    <Text className="grow p-1 text-center text-lg border-r-0.5 border-l-0.5" 
                    style={ getfilterlink === 2 ? {
                        backgroundColor: 'blue',
                        color: 'white'
                    } : {}}
                    onPress={() => filterLink(2)}>
                        Karta
                    </Text>
                    <Text className="grow p-1 text-center text-lg border-r-0.5" 
                    style={ getfilterlink === 1 ? {
                        backgroundColor: 'blue',
                        color: 'white'
                    } : {}}
                    onPress={() => filterLink(1)}>
                        Qarz
                    </Text>
                </View> : 
            null
        }
        <View style={{
            flex: 10
        }}>
            <ScrollView style={{ flex: 10 }}>
                { renderItem() }
            </ScrollView>
        </View>

          <View style={{
              flex: 1
            }}>
            <View>
                { pageLinkView() }
            </View>
          </View>
        
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
        >

            <View className="flex-row border-b-0.5 border-slate-400 p-3">
              <View className="grow">
                <Text style={styles.cretavarred} onPress={() => TuggleModal(false)}>X</Text>
              </View>
              <View className="grow">
                <Text className="text-right" onPress={() => removeCard()}>
                  <MaterialIcons name="cleaning-services" size={26} color="red" />
                </Text>
              </View>
            </View>

            <ScrollView style={styles.scrollVi}>
            { renderItem2() }

            { count > 0 ? <View className="">
                <View className="flex-row">
                    <Text className="grow text-xl font-medium p-2 border-t-0.5 border-b-0.5 rounded-t-md border-slate-400">Jami</Text>
                    <Text className="grow text-xl font-medium text-right p-2 border-t-0.5 border-b-0.5 rounded-t-md border-slate-400">{ formattet.format(onsumma) } { onkursv } </Text>
                </View>
                <View className="flex-row">
                <TextInput className="grow border-b-0.5 border-r-0.5 border-slate-400 p-2 basis-1/1 text-right text-lg"
                    value={chegirma2}
                    onChangeText={(chegirma2) => onChegirmaFun2(chegirma2)}
                    placeholder="Chegirma yoki Qarz"
                />
                <TextInput className="grow border-b-0.5 border-slate-400 p-2 basis-1/2 text-right text-lg"
                    value={chegirma}
                    onChangeText={(chegirma) => onChegirmaFun(chegirma)}
                    placeholder="Sotuv narx"
                />
                </View>
                <View className="flex-row">
                <TextInput className="grow border-b-0.5 border-r-0.5 border-slate-400 p-2 basis-1/1 text-right text-md"
                    value={info}
                    onChangeText={(info) => onInfo(info)}
                    placeholder="Mijoz ismi yoki tel.."
                />

                <TextInput className="grow border-b-0.5 border-slate-400 p-2 basis-1/2 text-right text-md"
                    value={sana}
                    onChangeText={(sana) => onSana(sana)}
                    placeholder="Qarz muddati"
                />
                </View>
                { listKurs() }
                <View className="flex-row p-3 border-0.5 border-slate-400">
                <TouchableOpacity className="grow basis-1/3">
                    <Feather name="user-minus" size={70} color="red" onPress={() => sell(1)}/>
                </TouchableOpacity>
                <TouchableOpacity className="grow basis-1/3">
                    <AntDesign name="creditcard" size={70} color="blue" onPress={() => sell(2)}/>
                </TouchableOpacity>
                <TouchableOpacity className="grow" >
                    <FontAwesome name="money" size={70} color="green" onPress={() => sell(3)}/>
                </TouchableOpacity>
                </View>
            </View> : null }
          </ScrollView>
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
                <Text className="mb-2 text-lg">Jami: { formattet.format(onprise) }</Text>
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
            visible={showModallist}
            >
            <View style={styles.modaldisagin}>
                <View className="grow">
                    <Text style={styles.cretavarred} onPress={() => setModalLIst(false)}>X</Text>
                </View>
                <ScrollView style={{
                    height: '90%'
                }}>
                { 
                    sotuv2sdata ? sotuv2sdata.map((item, key) => {
                        return <View className="border border-slate-300 mt-2 p-2 rounded-md shadow"
                            key={key}>
                                { item.name ?
                                    <View className="flex-row">
                                        <Text className="grow text-sm">Nomi </Text>
                                        <Text className="grow text-sm text-right">{item.name} </Text>
                                    </View> : null
                                }
                                { item.catigoria ?
                                    <View className="flex-row">
                                        <Text className="grow text-sm">Catigoria </Text>
                                        <Text className="grow text-sm text-right">{item.catigoria} </Text>
                                    </View> : null
                                }
                                {  item.adresname ?
                                    <View className="flex-row">
                                        <Text className="grow text-sm">Yetkazuvchi </Text>
                                        <Text className="grow text-sm text-right">{item.adresname} </Text>
                                    </View> : null
                                }
                                { item.soni ?
                                    <View className="flex-row">
                                        <Text className="grow text-sm">{item.razmer} </Text>
                                        <Text className="grow text-sm text-right">{formattet.format(item.soni)}</Text>
                                    </View> : null
                                }
                                { item.sotilish ?
                                    <View className="flex-row">
                                        <Text className="grow text-sm">Sotilish </Text>
                                        <Text className="grow text-sm text-right">{formattet.format(item.sotilish)} </Text>
                                    </View> :null
                                }
                                { item.sana ? 
                                    <View className="flex-row">
                                        <Text className="grow text-sm">Sana </Text>
                                        <Text className="grow text-sm text-right">{item.sana} </Text>
                                    </View> : null
                                }
                        </View>
                    }) : []
                }
              </ScrollView>
            </View>
        </Modal>
    </View>
  )
}

export default Sotuv

const styles = StyleSheet.create({
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
    flx: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    scrollVi: {
        height: 500
      },

})