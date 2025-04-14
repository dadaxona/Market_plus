import { StyleSheet, Text, TextInput, View, Button, Modal, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Destroy, GetN, Store, Update } from "../Send/Send";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { USER_ID } from '../Send/As';

const Clent = () => {
    const [ondeletid,  onDeletId] = useState('');
    const [onid,  onID] = useState('');

    const [name,  onName] = useState('');
    const [tel,  onTel] = useState('');
    const [uniqueid,  onUniqueid] = useState('');

    const [search,  onSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [setshowmodaldel, setShowModaldel] = useState(false);
    
    const [getdata,  setData] = useState([]);
    const [correntPage,  setCorrentPage] = useState(0);

    const TuggleModal = (typa) => {
        onID('');
        onDeletId('');
        onName('');
        onTel('');
        onUniqueid('');
        setShowModal(typa);
    }

    const TuggleModal2 = () => {
        onDeletId('');
        onName('');
        onUniqueid('');
        setShowModaldel(false);
    }

    setColum = async () => {
        return {
            userId: await USER_ID(),
            name: name,
            tel: tel,
            uniqeId: uniqueid,
        };
    }
    const createData = async () => {
        var data = !onid ? await Store('POST','create_clent',
            await this.setColum()
        ) : await Update('PUT',`update_clent/${onid}`,
            await this.setColum()
        )
        data.status === 201 ? await CLears() : null;
    }

    const CLears = async () => {
        onName('');
        onTel('');
        onUniqueid('');
        await getList(correntPage);
        setShowModal(false);
    }

    const edit = (data) => {
        onID(data.id);
        onName(data.name + '');
        onTel(data.tel + '');
        onUniqueid(data.uniqeId + '');
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
        var data = await Destroy('DELETE',`delete_clent/${ondeletid}`);
        data.status === 201 ? await clerdel() : null;
    }

    const getList = async (correntPage = 0) => {
        onID('');
        setData(await GetN(await USER_ID(), 'getlist_clent', correntPage, search || null));
    }

    const renderItem = () => {
        return (
            getdata ? getdata.map((items, key) => {
            return <View
                style={items.uniqeId ?{
                    backgroundColor: '#60a5fa'
                } : {}}
                className="border border-slate-300 mt-2 p-2 rounded-md shadow"
                key={key}
                >
                <Text className="text-lg">{items.uniqeId}</Text>
                <Text className="text-lg">{items.name}</Text>
                <View className="flex-row">
                    <View className="grow">
                        <Text style={styles.texSts}>{items.tel}</Text>
                    </View>
                    <View className="grow">
                        <View style={styles.flx}>
                        <TouchableOpacity style={styles.dele} onPress={() => delet(items.id)}>
                            <AntDesign name="delete" size={25} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => edit(items)}>
                            <FontAwesome name="edit" size={28} color="green" />
                        </TouchableOpacity>
                        </View>                        
                    </View>
                </View>
            </View>
            }) : []
        );
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

        <View  style={{
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
            <View>
                <View className="border-b-0.5 border-slate-400 p-3">
                  <Text style={styles.cretavarred} onPress={() => TuggleModal(false)}>X</Text>
                </View>

                <Text style={styles.titler}>
                    Mijozlar
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
                    <Button title='Saqlash' onPress={() => createData()}/>
                </View>
            </View>
        </Modal>

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
    </View>
  )
}

export default Clent

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