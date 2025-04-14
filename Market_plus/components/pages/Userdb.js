import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GetUserDB } from '../Send/Send';
import { USER_DB } from '../Send/As';
var formattet = new Intl.NumberFormat('en-US');

const Userdb = () => {
    const [search,  onSearch] = useState('');
    const [getname,  setName] = useState('');

    const [getdata,  setData] = useState([]);

    const [correntPage,  setCorrentPage] = useState(0);
    
    const getList = async (correntPage = 0) => {
        var data = await USER_DB('Malumotlar');
        setName(data.name);
        setData(await GetUserDB(data.id, 'all_userdb', correntPage, search || null));
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
            <Text className="text-center text-lg font-bold bg-white p-2">{getname}</Text>
            <View className="flex-1 p-1">
                <ScrollView style={{ height: 500 }}>
                    {
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                getdata ? getdata.map((items, key) => {
                                    return (
                                        <View style={{ width: '33.3%', alignItems: 'center'}}
                                            className="bg-white border border-slate-300 rounded-md"
                                            key={key}
                                            >
                                            <Text className="text-center pt-1 pb-1 m-1">
                                                <View className="">
                                                    <Image 
                                                    source={require('../../images/imag.png') } 
                                                    // source={ items.image ? require('../../../Node/static/imag.png') : require('../../images/imag.png') } 
                                                    style={{ width: 100, height: 100 }}
                                                    />
                                                </View>
                                                <View className="">
                                                    <Text className="">{items.name}</Text>
                                                    <Text className="">{formattet.format(items.sotilish)} { items.Kur ? items.Kur.kurs : 'UZS' }</Text>
                                                </View>
                                            </Text>
                                        </View>
                                    )
                                }) : []
                            }
                        </View>
                    }
                </ScrollView>
                <View className="p-2 bg-white">
                    {
                        <View className="flex-row mt-2">
                            <TouchableOpacity className="p-2 mr-1 text-cyan-600 border border-red-600 grow rounded-md" onPress={() => backpage(33)}>
                                <Text className="text-center text-red-600">
                                    <AntDesign name="banckward" size={25} />
                                </Text>
                            </TouchableOpacity>
                            <Text className="grow text-3xl text-center text-blue-500 border border-blue-500 rounded-md pt-1"> 
                                {correntPage / 33 + 1}
                            </Text>
                            <TouchableOpacity className="p-2 ml-1 border border-green-600 grow rounded-md" onPress={() => nextpage(33)}>
                                <Text className="text-center text-green-700">
                                    <AntDesign name="forward" size={25} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}
export default Userdb

const styles = StyleSheet.create({});