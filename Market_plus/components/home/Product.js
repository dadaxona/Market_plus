import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { GetUserDB } from '../Send/Send';
import { Set_USER_DB, USER_DB } from '../Send/As';
var formattet = new Intl.NumberFormat('en-US');

const Product = ({navigation}) => {
    const [search,  onSearch] = useState('');
    const [getdata,  setData] = useState([]);
    const [correntPage,  setCorrentPage] = useState(0);

    const getList = async (correntPage = 0) => {
        const data = await USER_DB('Product');
        setData(await GetUserDB(data.id, 'getpraduct', correntPage, search || null));
    }

    const setPage2 = (data) => {
        Set_USER_DB('PraductDB', {'data': data});
        navigation.navigate('Products');
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
            <View className="flex-1 p-1">
                <ScrollView style={styles.scrollVi}>
                    {
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                getdata ? getdata.map((items, key) => {
                                    return (
                                        <View 
                                            key={key}
                                            style={{ width: '50%', alignItems: 'center'}}
                                            className="bg-white"
                                            >
                                            <Text 
                                                className="text-center border border-slate-300 rounded-md pt-2 pb-2 m-1"
                                                onPress={() => setPage2(items)}>
                                                <View className="">
                                                    <Image 
                                                    // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                                                    source={require('../../images/imag.png')} 
                                                    style={{ width: 180, height: 170 }}
                                                    />
                                                </View>
                                                <View className="">
                                                    <Text className="text-lg">{items.name}</Text>
                                                    <Text className="text-sm">{formattet.format(items.sotilish)} { items.Kur ? items.Kur.kurs : 'UZS' }</Text>
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
                    <View className="flex-row mt-2">
                        <TouchableOpacity className="p-2 mr-1 text-cyan-600 border border-red-600 grow rounded-md" onPress={() => backpage(22)}>
                            <Text className="text-center text-red-600">
                                <AntDesign name="banckward" size={25} />
                            </Text>
                        </TouchableOpacity>
                        <Text className="grow text-3xl text-center text-blue-500 border border-blue-500 rounded-md pt-1"> 
                            {correntPage / 22 + 1}
                        </Text>
                        <TouchableOpacity className="p-2 ml-1 border border-green-600 grow rounded-md" onPress={() => nextpage(22)}>
                            <Text className="text-center text-green-700">
                                <AntDesign name="forward" size={25} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row pt-2 pb-2">
                    <Text className="grow text-center" onPress={() => navigation.navigate('Magazin')}>
                        <FontAwesome name="home" size={35} color="#52525b"/>
                    </Text>
                    <Text className="grow text-center">
                        <AntDesign name="search1" size={34} color="#52525b"/>
                    </Text>
                    <Text className="grow text-center">
                        {/* heart */}
                        <AntDesign name="hearto" size={34} color="#52525b"/>
                    </Text>
                    <Text className="grow text-center mt-0.5">
                        <FontAwesome6 name="circle-user" size={30} color="#52525b"/>
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default Product

const styles = StyleSheet.create({
    scrollVi: {
        height: 500
    },
});