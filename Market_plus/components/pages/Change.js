import { StyleSheet, Text, TextInput, View, Button, Modal, Image, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Destroy, GetN, Store, Update } from "../Send/Send";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { USER_ID, date_time } from '../Send/As';

const Change = () => {
    const [ondeletid,  onDeletId] = useState('');
    const [onid,  onID] = useState('');

    const [catigoria,  onCatigor] = useState('');

    const [search,  onSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [setshowmodaldel, setShowModaldel] = useState(false);
    const [showopen, showOpenModal] = useState(false);
    const [showopen2, showOpenModal2] = useState(false);

    const [getdata,  setData] = useState([]);
    const [getdata3,  setData3] = useState([]);

    const [correntPage,  setCorrentPage] = useState(0);

    const TuggleModal = (typa) => {
        onID('');
        onDeletId('');
        onCatigor('');
        setShowModal(typa);
    }

    const TuggleModal2 = () => {
        onDeletId('');
        onCatigor('');
        setShowModaldel(false);
    }

    setColum = async (data) => {
        return {
            userId: await USER_ID(),
            items: data,
            sana1: await date_time()
        };
    }
    const insertdb = async (data) => {
        var result = await Store('POST','insertdb', await this.setColum(data));
        result.status === 201 ? await CLears() : null;
    }

    const CLears = async () => {
        onCatigor('');
        await getList(correntPage);
        setShowModal(false);
    }

    const edit = (data) => {
        onID(data.id);
        onCatigor(data.catigoria + '');
        setShowModal(true);
    }

    const delet = (id) => {
        onDeletId(id);
        setShowModaldel(true);
    }

    const clerdel = async () => {
        await getList(correntPage);
        onDeletId('');
        setShowModaldel(false);
    }

    const delete_tavar = async () => {
        var data = await Destroy('DELETE',`delete_catigoria/${ondeletid}`);
        data.status === 201 ? await clerdel() : null;
    }

    const getList = async () => {
        setData(await GetN(await USER_ID(), 'getchange', correntPage, search || null));
    }

    const renderItem = () => {
        return (
            getdata ? getdata.map((items, key) => {
            return <View
                className="bg-white border border-slate-300 mt-2 p-2 rounded-md shadow"
                key={key}
                >
                <View className="flex-row">
                    <View className="grow">
                        <Text className="text-lg">{ items.userId }</Text>
                        <Text className="text-lg">{items.name}</Text>
                        <View style={styles.flx}>
                            <TouchableOpacity className="mx-1 bg-green-800 rounded-md px-4 pt-1 pb-1" onPress={() => showOpenOkno(items)}>
                                <Text className="text-white font-bold">Info</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="mx-1 bg-green-800 rounded-md px-4 pt-1 pb-1" onPress={() => insertdb(items)}>
                                <Text className="text-white font-bold">Qabul qilish</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </View>
            </View>
            }) : []
        );
    }

    const showOpenOkno = (data) => {
        setData3(data.Chang2s);
        showOpenModal(true);
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

    useEffect(() => {
        getList();
    }, [])

  return (
    <View className="m-1" style={{
        flex: 1
      }}>

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
            animationType={'fade'}
            transparent={false}
            visible={setshowmodaldel}
            >
            <View style={styles.modaldisagin}>
                <Text className="text-center p-2 text-3xl">O`chirish</Text>
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
            visible={showopen}
            >
            <View className="border-b-0.5 border-slate-400 p-1.5">
                <View className="flex-row">
                    <View className="grow">
                        <Text style={styles.cretavarred} onPress={() => showOpenModal(false)}>X</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollVi} >
                {
                    getdata3 ? getdata3.map((item, key) => {
                        return <View key={key} className="flex-row border-b-0.5 p-1">
                            <View className="">
                                <Image 
                                // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                                source={require('../../images/imag.png')} 
                                style={{ width: 100, height: 100 }}
                                />
                            </View>
                            <View className="grow pl-3 pt-2">
                                <Text className="text-lg font-bold">{ item.name }</Text>
                                <Text className="">{ item.soni }</Text>
                                <Text className="">{ item.olinish }</Text>
                                {/* <Text className="text-right">
                                    <View className="flex-row">
                                        <Text className="pl-2" onPress={() => delet(item.id)}>
                                            <AntDesign name="delete" size={25} color="red" />
                                        </Text>
                                        <Text className="px-2" onPress={() => edit(item)}>
                                            <FontAwesome name="edit" size={26} color="green" />
                                        </Text>
                                    </View>
                                </Text> */}
                            </View>
                        </View>
                    }) : []
                }
            </ScrollView>
        </Modal>

    </View>
  )
}

export default Change

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
        borderRadius: 8
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
    dele: {
        marginHorizontal: 20
    },

    scrollVi: {
        height: 500
      },
})