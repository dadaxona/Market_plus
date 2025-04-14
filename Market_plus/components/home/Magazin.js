import { StyleSheet, Text, Modal, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetUserFilter } from '../Send/Send';
import { Set_USER_DB } from '../Send/As';
var formattet = new Intl.NumberFormat('en-US');

const Magazin = ({navigation}) => {
    const [search,  onSearch] = useState('');
    const [getdata,  setData] = useState([]);
    const [getdata2,  setData2] = useState([]);
    const [getdata3,  setData3] = useState([]);
    const [correntPage,  setCorrentPage] = useState(0);

    const [getmod, setmod] = useState(false);
    const [getmodal, setmodal] = useState(false);
    const lengg = [
        {'item': ' ', 'item2': ' '},
        {'item': '1', 'item2': '1'},
        {'item': '2', 'item2': '2'},
        {'item': '3', 'item2': '3'},
        {'item': '4', 'item2': '4'},
        {'item': '5', 'item2': '5'},
        {'item': '6', 'item2': '6'},
        {'item': '7', 'item2': '7'},
        {'item': '8', 'item2': '8'},
        {'item': '9', 'item2': '9'},
        {'item': '0', 'item2': '0'},
        {'item': 'a', 'item2': 'a'},
        {'item': 'b', 'item2': 'b'},
        {'item': 'c', 'item2': 'c'},
        {'item': 'd', 'item2': 'd'},
        {'item': 'e', 'item2': 'e'},
        {'item': 'f', 'item2': 'f'},
        {'item': 'g', 'item2': 'g'},
        {'item': 'h', 'item2': 'h'},
        {'item': 'i', 'item2': 'i'},
        {'item': 'j', 'item2': 'j'},
        {'item': 'k', 'item2': 'k'},
        {'item': 'l', 'item2': 'l'},
        {'item': 'm', 'item2': 'm'},
        {'item': 'n', 'item2': 'n'},
        {'item': 'o', 'item2': 'o'},
        {'item': 'p', 'item2': 'p'},
        {'item': 'q', 'item2': 'q'},
        {'item': 'r', 'item2': 'r'},
        {'item': 's', 'item2': 's'},
        {'item': 't', 'item2': 't'},
        {'item': 'u', 'item2': 'u'},
        {'item': 'v', 'item2': 'v'},
        {'item': 'w', 'item2': 'w'},
        {'item': 'x', 'item2': 'x'},
        {'item': 'y', 'item2': 'y'},
        {'item': 'z', 'item2': 'Z'},
        {'item': 'o`', 'item2': 'o`'},
        {'item': 'g`', 'item2': 'g`'},
        {'item': 'а', 'item2': 'a'},
        {'item': 'б', 'item2': 'b'},
        {'item': 'в', 'item2': 'v'},
        {'item': 'г', 'item2': 'g'},
        {'item': 'д', 'item2': 'd'},
        {'item': 'е', 'item2': 'e'},
        {'item': 'ё', 'item2': 'yo'},
        {'item': 'ж', 'item2': 'j'},
        {'item': 'з', 'item2': 'z'},
        {'item': 'и', 'item2': 'i'},
        {'item': 'й', 'item2': 'y'},
        {'item': 'к', 'item2': 'k'},
        {'item': 'л', 'item2': 'l'},
        {'item': 'м', 'item2': 'm'},
        {'item': 'н', 'item2': 'n'},
        {'item': 'о', 'item2': 'o'},
        {'item': 'п', 'item2': 'p'},
        {'item': 'р', 'item2': 'r'},
        {'item': 'с', 'item2': 'c'},
        {'item': 'т', 'item2': 't'},
        {'item': 'у', 'item2': 'u'},
        {'item': 'ф', 'item2': 'f'},
        {'item': 'х', 'item2': 'x'},
        {'item': 'ц', 'item2': 'ts'},
        {'item': 'ч', 'item2': 'ch'},
        {'item': 'ш', 'item2': 'sh'},
        {'item': 'щ', 'item2': 'sha'},
        {'item': 'ъ', 'item2': ''},
        {'item': 'Ы', 'item2': ''},
        {'item': 'ь', 'item2': ''},
        {'item': 'э', 'item2': 'e'},
        {'item': 'ю', 'item2': 'yu'},
        {'item': 'я', 'item2': 'ya'},
    ];
    const onSearchfunstion = (data) => {
        onSearch(data);
    }
    const SendData = () => {
        var logat = '';
        for (let p = 0; p < search.length; p++) {
            for (let i = 0; i < lengg.length; i++) {
                search[p] === lengg[i]['item'] ? logat += lengg[i]['item2'] : null;
            }
        }
        onSearch(logat);
    }

    const getList = async () => {
        const data = await GetUserFilter('home_main');
        setData(data.data);
        setData3(data.items);
    }

    const sendPage = (data) => {
        setData2(data.Catigoria);
        setmodal(true);
    }
    
    const sendPage2 = (data) => {
        Set_USER_DB('Product', {'id': data.id});
        navigation.navigate('Product');
        setmod(false);
        setmodal(false);
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
        <View className="flex-1 bg-white">
            <View className="flex-row p-2">
                <TextInput
                    className="border border-slate-400 rounded-md grow p-1 basis-1/2 pl-2 mr-1"
                    // style={styles.input}
                    value={search}
                    onChangeText={(search) => onSearchfunstion(search)}
                    placeholder="Izlash"
                />
                <TouchableOpacity className="grow rounded-md border border-slate-400 text-center pt-1.5 mx-1" onPress={() => SendData()}>
                    <Text className="text-center">
                        <AntDesign className="" name="search1" size={25}/>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="grow rounded-md border border-slate-400 text-center pt-1.5" onPress={() => setmod(true)}>
                    <Text className="text-center">
                        <MaterialCommunityIcons className="" name="filter-outline" size={25}/>
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollVi} className="px-3">
            {
                getdata3 ? getdata3.map((item, key) => {
                    return <View key={key}>
                        <Text className="text-2xl font-bold pt-2 pb-2">{item.items[0].Catigorium.catigoria}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {                                
                                item.items ? item.items.map((item, key) => {
                                    return <View 
                                        key={key}
                                        >
                                        <TouchableOpacity onPress={() => setPage2(item)}>
                                            <View  className="text-center border border-slate-300 rounded-md pt-2 pb-2 mr-1">
                                                <View className="">
                                                    <Image 
                                                    // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                                                        source={require('../../images/imag.png')} 
                                                        style={{ width: 180, height: 170 }}
                                                    />
                                                </View>
                                                <View className="">
                                                    <Text className="px-2 text-lg">{item.name}</Text>
                                                    <Text className="px-2 text-sm">{formattet.format(item.sotilish)} { item.Kur ? item.Kur.kurs : 'UZS' }</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }) : []
                            }     
                        </ScrollView>
                    </View>
                }) : []
           }
           </ScrollView>
            


            <View className="bg-white px-1">
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

            <Modal
               animationType={'fade'}
               transparent={false}
               visible={getmod}
               >
                   <View className="flex-row border-b-0.5 border-slate-400 p-3">
                       <View className="grow">
                           <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                           onPress={() => setmod(false)}>X</Text>
                       </View>
                   </View>
                <ScrollView style={styles.scrollVi}>
                    {
                        getdata ? getdata.map((items, key) => {
                            return <TouchableOpacity key={key} onPress={() => sendPage(items)}>
                                <Text className="border-b-0.5 border-slate-300">
                                    <View
                                        className="p-2"
                                        >
                                        <View className="flex-row">
                                            {/* <View className=" basis-1/1">
                                                <Image 
                                                // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                                                source={require('../../images/images.png')} 
                                                style={{ width: 100, height: 100 }}
                                                />
                                                
                                            </View> */}
                                            <View className="grow mx-4">
                                                <Text className="text-lg">{items.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Text>
                            </TouchableOpacity>
                        }) : []
                    }
                </ScrollView>
            </Modal>

            <Modal
                animationType={'fade'}
                transparent={false}
                visible={getmodal}
                >
                    <View className="flex-row border-b-0.5 border-slate-400 p-3">
                        <View className="grow">
                            <Text className="grow bg-red-500 text-white text-lg text-center rounded-md w-7 h-7" 
                            onPress={() => setmodal(false)}>X</Text>
                        </View>
                    </View>
                    <View className="p-3">
                        <ScrollView className="h-5/6">
                            {
                                getdata2 ? getdata2.map((items, key) => {
                                    return <TouchableOpacity key={key} 
                                            onPress={() => sendPage2(items)}
                                        >
                                        <Text className="border-b-0.5 text-lg">
                                                { items.catigoria }
                                        </Text>
                                    </TouchableOpacity>
                                }) : []
                            }
                        </ScrollView>
                    </View>
            </Modal>
        </View>
    )
}
export default Magazin

const styles = StyleSheet.create({
    scrollVi: {
        height: 600
    },
});