import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Modal, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GetLocation from 'react-native-get-location'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MapView, { PROVIDER_GOOGLE, Marker  }  from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'
import { GetN, GetUserDB } from '../Send/Send';
import { USER_DB } from '../Send/As';
const formattet = new Intl.NumberFormat('en-US');

const Products = ({navigation}) => {
    const [search, onSearch] = useState('');

    const [search2, onSearch2] = useState('');
    const [pname, Pname] = useState('');
    const [psotilish, Psotilish] = useState('');
    const [pkurs, Pkurs] = useState('');
    const [userlatetut, Userlatetut] = useState('');
    const [userlongetut, Userlongetut] = useState('');
    const [username, UserName] = useState('');
    
    const [getdata,  setData] = useState([]);
    const [correntPage,  setCorrentPage] = useState(0);
    
    const getList = async (correntPage = 0) => {
        const data = await USER_DB('PraductDB');
        Pname(data.data.name);
        Psotilish(data.data.sotilish);
        Pkurs(data.data.Kur ? data.data.Kur.kurs : 'UZS');
        Userlatetut(data.data.User ? data.data.User.latetut : '');
        Userlongetut(data.data.User ? data.data.User.longetut : '');
        UserName(data.data.User ? data.data.User.company : '');
        setData(await GetN(data.data.User.id, 'getlist', correntPage, search || null));
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

    const sendlocation = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
        })
        .then(location => {
            sendlocation2(location);
        })
        .catch(error => {
        });
    }
    
    const sendlocation2 = async (locat) => {
        const data = {
            source: {
                latitude: 41.55049933675403,
                longitude: 60.62984601100186
            },
            // destination: {
            //     latitude: 53.340405636734516,
            //     longitude: 28.005188744457087
            // },
            params: [
                {
                    key: "travelmode",
                    value: "driving"
                },
                // {
                //     key: "dir_action",
                //     value: "navigate"
                // }
            ],
            waypoints: [
                {
                    latitude: 41.550330034091985,
                    longitude: 60.621626399827164
                },
                // {
                //     latitude: 52.45474400012523,
                //     longitude: 20.07671403839288,
                // },
                // {
                //     latitude: 63.37488235351594,
                //     longitude: 32.899308933385896,
                // },
                // {
                //     latitude: 63.37488235351594,
                //     longitude: 32.899308933385896,
                // }
            ]
        }

        getDirections(data)
    }

    useEffect(() => {
        getList();
    }, []);

    return (
        <View className="flex-1">
            <View className="bg-white">
                <View style={{ alignItems: 'center', marginTop: 3 }}>
                    <Image 
                        // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                        source={require('../../images/imag.png')} 
                        style={{ width: '95%', height: 300 }}
                    />
                </View>
                <View className="mx-3">
                    <Text className="text-xl">{pname}</Text>
                    <Text className="">{psotilish} {pkurs}</Text>
                </View>
                <View className="flex-row">
                    <View className="">
                        <Image
                            // source={{uri: 'https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/512/JPEG.png'}} 
                            source={require('../../images/imag.png')} 
                            style={{ width: 60, height: 60, marginHorizontal: 5 }}
                        />
                    </View>
                    <View className="grow flex-row">
                        <Text className="grow px-2 pt-5">{username}</Text>
                        <TouchableOpacity onPress={() => sendlocation()}>
                            <Text className="p-3">
                                <FontAwesome6 name="location-arrow" size={35} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={{
                height: 600
            }}>
                    {
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                getdata ? getdata.map((items, key) => {
                                    return (
                                        <View 
                                            key={key}
                                            style={{ width: '50%', alignItems: 'center'}}
                                            className="bg-white"
                                            onPress={() => setPage2(items)}
                                            >
                                            <Text className="text-center border border-slate-300 rounded-md pt-2 pb-2 m-1">
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
        </View>
    )
}
export default Products

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
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
  });