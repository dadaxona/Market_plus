import { StyleSheet, Text, TextInput, View, Modal, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetN, Store } from "../Send/Send";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { date_time, USER_ID } from "../Send/As";
import AsyncStorage from "@react-native-async-storage/async-storage";
var formattet = new Intl.NumberFormat('en-US');
// getCard
const Savdo = () => {
    const [search,  onSearch] = useState('');
    const [correntkurspage,  correntKurspage] = useState(0);
    const [onkurs, onKurs] = useState([]);

    const [onidkurs, onIdkurs] = useState(0);
    const [onkursv, onKursV] = useState('UZS');
    const [onkurssum, onKursSum] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [count, onCount] = useState(0);

    const [onsumma, onSumma] = useState('');
    const [olinish, onOlinish] = useState('');
    const [chegirma, onChegirma] = useState('');
    const [chegirma2, onChegirma2] = useState('');
    
    const [sana, onSana] = useState('');
    const [info, onInfo] = useState('');
    
    const [getdata,  setData] = useState([]);
    const [getdatalist,  getDataList] = useState([]);
    
    const [correntPage,  setCorrentPage] = useState(0);    

    const addCard = async (data) => {
      var info = {}
      if (data.kursId === 0 && onidkurs === 0) {
        info = {
          'userId': data.userId,
          'sqladId': data.id,
          'catigoria': data.Catigorium.catigoria,
          'adresname': data.Adre.name,
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
          // 'image': data.image,
        }
      }
      if (data.kursId !== 0 && onidkurs === 0) {
        info = {
          'userId': data.userId,
          'sqladId': data.id,
          'catigoria': data.Catigorium.catigoria,
          'adresname': data.Adre.name,
          'name': data.name,
          'soni': 1,
          'soni2': data.soni,
          'razmer': data.razmer,
          'olinin': parseFloat(data.olinish) * parseFloat(data.summa),
          'olinish': parseFloat(data.olinish) * parseFloat(data.summa),
          'sotilish': parseFloat(data.sotilish) * parseFloat(data.summa),
          'sotilish2': parseFloat(data.sotilish) * parseFloat(data.summa),
          'kursId': onidkurs,
          'kurs': onkursv,
          'summa': onkurssum,
          // 'image': data.image,
        }
      }
      if (data.kursId === 0 && onidkurs !== 0) {
        info = {
          'userId': data.userId,
          'sqladId': data.id,
          'catigoria': data.Catigorium.catigoria,
          'adresname': data.Adre.name,
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
          // 'image': data.image,
        }
      }
      if (data.kursId !== 0 && onidkurs !== 0) {
        info = {
          'userId': data.userId,
          'sqladId': data.id,
          'catigoria': data.Catigorium.catigoria,
          'adresname': data.Adre.name,
          'name': data.name,
          'soni': 1,
          'soni2': data.soni,
          'razmer': data.razmer,
          'olinin': parseFloat(data.olinish) * parseFloat(data.summa) / onkurssum,
          'olinish': parseFloat(data.olinish) * parseFloat(data.summa) / onkurssum,
          'sotilish': parseFloat(data.sotilish) * parseFloat(data.summa) / onkurssum,
          'sotilish2': parseFloat(data.sotilish) * parseFloat(data.summa) / onkurssum,
          'kursId': onidkurs,
          'kurs': onkursv,
          'summa': onkurssum,
          // 'image': data.image,
        }
      }
      await addCard2(info)
    }
    
    const addCard2 = async (info) => {
      var card = JSON.parse(await AsyncStorage.getItem('addCard'));
      if (card) {
        var pushCard = card.find(item => { return item.sqladId === info.sqladId });
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
    
    const TuggleModal = (typa) => {
      setShowModal(typa);
    }

    const removeCard = async () => {
      await AsyncStorage.removeItem('addCard');
      await AsyncStorage.removeItem('addsumma');
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

    const getList = async () => {
      setData(await GetN(await USER_ID(), 'getlist', correntPage, search || null));
    }

    const selectKurs2 = (row) => {
      onIdkurs(row.id);
      onKursV(row.kurs);
      onKursSum(parseFloat(row.summa));
    }

    const selectKurs = (row) => {
      onIdkurs(row.id);
      onKursV(row.kurs);
      onKursSum(parseFloat(row.summa));
      selectAsync(row)
    }

    const selectAsync = async (row) => {
      var card = JSON.parse(await AsyncStorage.getItem('addCard'));
      if (card) {
        for (let i = 0; i < card.length; i++) {
          if (card[i].kursId === 0 && row.id === 0) {
          }
          if (card[i].kursId === 0 && row.id !== 0) {
            card[i].olinin = parseFloat(card[i].olinin) / parseFloat(row.summa);
            card[i].olinish = parseFloat(card[i].olinish) / parseFloat(row.summa);
            card[i].sotilish = parseFloat(card[i].sotilish) / parseFloat(row.summa);
            card[i].sotilish2 = parseFloat(card[i].sotilish2) / parseFloat(row.summa);
          }
          if (card[i].kursId !== 0 && row.id === 0) {
            card[i].olinin = parseFloat(card[i].olinin) * parseFloat(card[i].summa);
            card[i].olinish = parseFloat(card[i].olinish) * parseFloat(card[i].summa);
            card[i].sotilish = parseFloat(card[i].sotilish) * parseFloat(card[i].summa);
            card[i].sotilish2 = parseFloat(card[i].sotilish2) * parseFloat(card[i].summa);
          }
          if (card[i].kursId !== 0 && row.id !== 0) {
            card[i].olinin = parseFloat(card[i].olinin) * parseFloat(card[i].summa) / parseFloat(row.summa);
            card[i].olinish = parseFloat(card[i].olinish) * parseFloat(card[i].summa) / parseFloat(row.summa);
            card[i].sotilish = parseFloat(card[i].sotilish) * parseFloat(card[i].summa) / parseFloat(row.summa);
            card[i].sotilish2 = parseFloat(card[i].sotilish2) * parseFloat(card[i].summa) / parseFloat(row.summa);
          }
          card[i].kursId = row.id;
          card[i].kurs = row.kurs;
          card[i].summa = parseFloat(row.summa);
        }
        
        AsyncStorage.setItem("addCard", JSON.stringify(card));
        await pm(card)
      } else {}
    }

    const plus_minus = async (id, i, ty) => {
      var card = JSON.parse(await AsyncStorage.getItem('addCard'));
      var pushCard = card.find(item => { return item.sqladId === id });
      if (ty === 1) {
        if (pushCard.soni < pushCard.soni2) {
          pushCard.soni += 1;
          pushCard.olinish = pushCard.soni * parseFloat(pushCard.olinin);
          pushCard.sotilish = pushCard.soni * parseFloat(pushCard.sotilish2);
          await pm(card)
        } else {}
      } else {
        if (pushCard.soni <= pushCard.soni2) {
          pushCard.soni -= 1;
          if (pushCard.soni === 0) {
            await deler_storeg(i);
          } else {
            pushCard.olinish = pushCard.soni * parseFloat(pushCard.olinin);
            pushCard.sotilish = pushCard.soni * parseFloat(pushCard.sotilish2);
            await pm(card)
          }
        } else {}
      }
    }

    const deler_storeg = async (i) => {
      var card = JSON.parse(await AsyncStorage.getItem('addCard'));
      card.splice(i, 1);
      await pm(card)
      onChegirma2(0 + '');
    }

    const pm = async (card) => {
      await AsyncStorage.setItem("addCard", JSON.stringify(card));
      await allSumma(card);
      await getStor();
    }

    const allSumma = async (card) => {
      var foo = 0;
      var foo2 = 0;
      for (let i = 0; i < card.length; i++) {
        foo += parseFloat(card[i].sotilish);
        foo2 += parseFloat(card[i].olinish);
      }
      await AsyncStorage.setItem("addsumma", JSON.stringify({'summa': foo, 'olinish': foo2}));
      await sum();
    }

    const sum = async () => {
      const sum = JSON.parse(await AsyncStorage.getItem('addsumma'));
      onSumma(sum.summa);
      onChegirma(sum.summa + '');
      onOlinish(sum.olinish + '');
    }

    const Counter = async () => {
      var count = JSON.parse(await AsyncStorage.getItem('addCard'));
      onCount(count ? count.length : 0);
    }

    const getStor = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('addCard'));
      await Counter();
      getDataList(data);
    }

    const getCard = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('addCard'));
      await getStor();
      await allSumma(data || []);
      onChegirma2(0 + '');
      setShowModal(true);
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
      setShowModal(false);
    }

    const renderItem = () => {
      return (
        getdata ? getdata.map((items, key) => {
          return <View
            className="border-b-0.5 border-slate-300 p-2"
            key={key}
            >
            <View className="flex-row">
              <View className=" basis-1/1">
                <Image 
                  // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                  source={require('../../images/images.png')} 
                  style={{ width: 100, height: 100 }}
                />
                
              </View>
              <View className="grow mx-4">
                <Text className="text-2xl">{items.name}</Text>
                <Text className="text-md">{items.soni} {items.razmer}</Text>
                <Text className="text-md">{formattet.format(items.sotilish)} </Text>
                <Text className="text-md">{ formattet.format(items.summa)} { items.kurs || 'UZS' } </Text>
                <View style={styles.flx}>
                  <TouchableOpacity className="mr-2" onPress={() => addCard(items)}>
                    <Fontisto name="shopping-basket" size={22} color="#475569" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
                <Text className="text-2xl text-right mr-2">{items.name}</Text>
                <Text className="text-lg text-right mr-2"> {formattet.format(items.sotilish)} { items.kurs || 'UZS' } </Text>
                <Text className="text-sm text-right mr-2">1 dona {formattet.format(items.sotilish2)} { items.kurs || 'UZS' }</Text>
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

  const listKurs2 = () => {
      return <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={ count === 0 ? onidkurs === 0 ? {
                    backgroundColor: 'blue'
                } : {
                    backgroundColor: 'green'
                } : onidkurs === 0 ? { 
                    backgroundColor: 'blue'
                } : {
                    backgroundColor: '#64748b'
                }} 
          className="bg-slate-200 p-2 rounded-md ml-1 shadow">
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
                className="p-2 rounded-md ml-1 shadow" key={key}>
                    <Text className="text-white" onPress={ () => count === 0 ? selectKurs2(items) : null }>{formattet.format(items.summa)} {items.kurs}</Text>
                </View>
            }) : []
        }
      </ScrollView>
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

    // const renderFootrer = (i) => {
    //     return (
    //         i == 1 ?
    //         <View>
    //             <ActivityIndicator size="large"/>
    //         </View> : null
    //     )
    // }

    const pageLinkView = () => {
      return (
          <View className="flex-row mt-2">
              <TouchableOpacity className="p-2 mr-1 text-cyan-600 border border-red-600 grow rounded-md" onPress={() => backpage(10)}>
              <Text className="text-center text-red-600">
                  <AntDesign name="banckward" size={25} />
              </Text>
              </TouchableOpacity>
              <Text className="grow text-3xl text-center text-blue-500 border border-blue-500 rounded-md pt-1"> 
              {correntPage / 10} / {correntPage}
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
    getList();
    }

    const backpage = (count) => {
        var a = correntPage - count;
        if (a === 0 || a < 0) {
            setCorrentPage(0);
            getList();
        } else {
            setCorrentPage(a);
            getList();
        }
    }

    useEffect(() => {
        getList();
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
            <TextInput
                className="border border-slate-400 rounded-md grow p-1 basis-1/2 pl-2 mr-1"
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
            flex: 9
          }}>
          <ScrollView style={{ flex: 9 }}>
            { renderItem() }
          </ScrollView>
        </View>

        <View style={{
            flex: 1
          }}>
          <View className="pt-3">
              { listKurs2() }
          </View>
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
            <Text className="text-2xl font-medium text-right p-2 border-t-0.5 border-b-0.5 rounded-t-md border-slate-400">Olinish: { formattet.format(olinish) } { onkursv } </Text>
            <Text className="text-2xl font-medium text-right p-2 border-t-0.5 border-b-0.5 rounded-t-md border-slate-400">Jami: { formattet.format(onsumma) } { onkursv } </Text>
            <View className="flex-row">
              <TextInput className="grow border-b-0.5 border-r-0.5 border-slate-400 p-2 basis-1/1 text-right text-lg"
                value={chegirma2}
                onChangeText={(chegirma2) => onChegirmaFun2(chegirma2)}
                placeholder="Chegirma narx"
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
    </View>
  )
}

export default Savdo

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