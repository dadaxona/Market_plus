import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GetUserInfo } from '../Send/Send';
import { Set_USER_DB, USER_ID } from '../Send/As';

const Users = ({navigation}) => {
    const [onuuid,  onUuid] = useState('');
    const [search,  onSearch] = useState('');
    const [getdata,  setData] = useState([]);
    const [correntPage,  setCorrentPage] = useState(0);

    const getList = async (correntPage = 0) => {
        setData(await GetUserInfo('all_userinfo', correntPage, search || null));
        onUuid(await USER_ID());
    }

    const getListClick = () => {
        setCorrentPage(0);
        getList(0);
    }

    const sendPage = (data) => {
        Set_USER_DB('Malumotlar', {'id': data.id, 'name': data.login});
        navigation.navigate('Malumotlar');
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
    }, []);

    return (
        <View className="flex-1">
            <View className="flex-row p-2">
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
            <ScrollView style={styles.scrollVi}>
                {
                    getdata ? getdata.map((items, key) => {
                        return <Text key={key} style={ onuuid === items.id ? {
                                backgroundColor: '#60a5fa'
                            } : {}} onPress={() => sendPage(items)}>
                            <View className="border-b-0.5 border-slate-300 p-2"
                                >
                                <View className="flex-row">
                                    <View className=" basis-1/1">
                                        <Image 
                                        // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                                        source={require('../../images/imag.png')} 
                                        style={{ width: 100, height: 100 }}
                                        />
                                        
                                    </View>
                                    <View className="grow mx-4">
                                        <Text className="text-lg">{items.email}</Text>
                                        <Text className="text-lg">{items.login}</Text>
                                        <Text className="text-lg">{items.parol}</Text>
                                    </View>
                                </View>
                            </View>
                        </Text>
                    }) : []
                }
            </ScrollView>
            <View>
                <View className="flex-row mt-2 mb-2">
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
            </View>
        </View>
    )
}
export default Users

const styles = StyleSheet.create({
    scrollVi: {
        height: 600
    },
});