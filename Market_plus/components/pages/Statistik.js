import { SafeAreaView, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { USER_ID } from '../Send/As';
import { GetN, StataFilter } from '../Send/Send';
import PieChart from 'react-native-pie-chart'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
var formattet = new Intl.NumberFormat('en-US');

const Statistik = () => {
    const [onidkurs, onIdkurs] = useState(0);
    const [onkursv, onKursV] = useState('UZS');
    const [onkurssum, onKursSum] = useState(1);

    const [search,  onSearch] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    
    const [selectedDate2, setSelectedDate2] = useState(new Date());
    const [datePickerVisible2, setDatePickerVisible2] = useState(false);

    const [getall, setall] = useState(0);
    const [getolinish, setolinish] = useState(0);
    const [getchegirma, setchegirma] = useState(0);
    const [getsumma, setsumma] = useState(0);
    const [getqarz, setqarz] = useState(0);
    const [getfoyda, setfoyda] = useState(0);
    const [getrasxod, setrasxod] = useState(0);

    const [getall2, setall2] = useState(0);
    const [getolinish2, setolinish2] = useState(0);
    const [getchegirma2, setchegirma2] = useState(0);
    const [getsumma2, setsumma2] = useState(0);
    const [getqarz2, setqarz2] = useState(0);
    const [getfoyda2, setfoyda2] = useState(0);
    const [getrasxod2, setrasxod2] = useState(0);

    const [getary, setary] = useState([]);
    const [getary2, setary2] = useState([]);

    const [onkurs, onKurs] = useState([]);

    const [correntkurspage,  correntKurspage] = useState(0);

    const widthAndHeight = 250
    const series = [getall || 1, getsumma || 1, getolinish || 1, getfoyda || 1, getchegirma || 1, getqarz || 1, getrasxod || 1]
    const sliceColor = ['#1d4ed8', '#7c3aed', '#15803d', '#f97316', 'green', '#dc2626', '#dc2626']

    const selectKurs = (row) => {
        if (onidkurs === 0 && row.id  === 0 ) {
            setall(getall2);
            setolinish(getolinish2);
            setchegirma(getchegirma2);
            setsumma(getsumma2);
            setqarz(getqarz2);
            setfoyda(getfoyda2);
            setrasxod(getrasxod2);
        }
        if (onidkurs === 0 && row.id  !== 0 || onidkurs !== 0 && row.id === 0 || onidkurs !== 0 && row.id !== 0) {
            setall(getall2 / Number(row.summa));
            setolinish(getolinish2 / Number(row.summa));
            setchegirma(getchegirma2 / Number(row.summa));
            setsumma(getsumma2 / Number(row.summa));
            setqarz(getqarz2 / Number(row.summa));
            setfoyda(getfoyda2 / Number(row.summa));
            setrasxod(getrasxod2 / Number(row.summa));
        }
        onIdkurs(row.id)
        onKursV(row.kurs)
        onKursSum(row.summa)
    }

    const getKurs = async () => {
        onKurs(await GetN(await USER_ID(), 'getlist_kurs', correntkurspage, search || null));
    }

    const getList = async (date1 = null, date2 = null) => {
        var all = 0;
        var chegirma = 0;
        var olinish = 0;
        var summa = 0;
        var qarz = 0;
        var rasxod = 0;
        var ary = [];
        var ary2 = [];
        var ary3= [];
        var row = await StataFilter(await USER_ID(), 'get_state', date1, date2);
        row.sotuv.map(room => {
            if (room.kursId === 0) {
                all += parseFloat(room.all);
                olinish += parseFloat(room.olinish);
                summa += parseFloat(room.summa);
                room.typ === '1' ? qarz += parseFloat(room.chegirma) : chegirma += parseFloat(room.chegirma);
            }
            if (room.kursId !== 0) {
                all += parseFloat(room.all) * parseFloat(room.summak);
                chegirma += parseFloat(room.chegirma) * parseFloat(room.summak);
                olinish += parseFloat(room.olinish) * parseFloat(room.summak);
                summa += parseFloat(room.summa) * parseFloat(room.summak);
                room.typ === '1' ? qarz += parseFloat(room.chegirma) * parseFloat(room.summak) : chegirma += parseFloat(room.chegirma) * parseFloat(room.summak);
            }
            room.Sotuv2s.map((room2, index) => {
                var foo = ary.find(item => { return item.sqladId === room2.sqladId });
                if (foo) {
                foo.soni = Number(foo.soni) + Number(room2.soni);
                if (foo.kursId === 0) {
                    foo.summa = parseFloat(foo.summa) + parseFloat(room2.sotilish);
                }
                if (foo.kursId !== 0) {
                    foo.summa = parseFloat(foo.summa) + parseFloat(room2.sotilish) * parseFloat(room2.summa);
                }
                ary.concat(foo);
                } else {
                ary.push({
                    'sqladId': room2.sqladId,
                    'name': room2.name,
                    'soni': room2.soni,
                    'summa': room2.sotilish,
                });
                }
            });
        });
        row.rasxod.map(item => {
            rasxod += parseFloat(item.summa)
        });
        ary.sort(function(a, b) {
            return parseFloat(b.soni) - parseFloat(a.soni);
        }).map((item, key) => {
            ary2.push(item);
        });
        ary.sort(function(a, b) {
            return parseFloat(b.summa) - parseFloat(a.summa);
        }).map((item, key) => {
            ary3.push(item);
        });    
        setall(all);
        setsumma(summa);
        setchegirma(chegirma);
        setolinish(olinish);
        setfoyda(summa - olinish - qarz - rasxod);
        setqarz(qarz);
        setrasxod(rasxod);
        
        setall2(all);
        setsumma2(summa);
        setchegirma2(chegirma);
        setolinish2(olinish);
        setfoyda2(summa - olinish - qarz - rasxod);
        setqarz2(qarz);
        setrasxod2(rasxod);

        setary(ary2);
        setary2(ary3);
    }

    const chart_pie = () => {
        return <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
    }

    const listKurs = () => {
        return <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={ onidkurs === 0 ? {
                backgroundColor: 'blue'
            } : {
                backgroundColor: 'green'
            }}
            className="bg-slate-200 p-1 rounded-sm ml-1">
            <Text className="text-white" onPress={() => selectKurs({ "id": 0, "kurs":"UZS", "summa": 1})}>  1 UZS  </Text>
            </View>
            {
            onkurs.map((items, key) => {
                return <View style={ onidkurs === items.id ? {
                backgroundColor: 'blue'
                } : {
                backgroundColor: 'green'
                }} className="p-1 rounded-sm ml-1" key={key}>
                <Text className="text-white" onPress={ () => selectKurs(items) }>{formattet.format(items.summa)} {items.kurs}</Text>
                </View>
            })
            }
        </ScrollView>
    }

    const renderItem = () => {
        return (
        <View
            className="border border-slate-300 mt-1 p-2 rounded"
            >
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: '#1d4ed8'}}
                >
                <Text className="grow text-md text-slate-50">Jami:</Text>
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getall)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: '#7c3aed'}}
                >
                <Text className="grow text-md text-slate-50">Olinish:</Text>       
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getolinish)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: '#15803d'}}
                >
                <Text className="grow text-md text-slate-50">Soltilish: </Text>       
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getsumma)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: '#f97316'}}
                >
                <Text className="grow text-md text-slate-50">Chegirma:</Text>
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getchegirma)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: '#dc2626'}}
                >
                <Text className="grow text-md text-slate-50">Qarz:</Text> 
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getqarz)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: '#dc2626'}}
                >
                <Text className="grow text-md text-slate-50">Xarajat:</Text> 
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getrasxod)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
            <View className="flex-row rounded p-1 m-0.5" 
                style={styles={backgroundColor: 'green'}}
                >
                <Text className="grow text-md text-slate-50">Foyda:</Text>   
                <Text className="grow text-md text-right text-slate-50">{formattet.format(getfoyda)} { onidkurs === 0 ? 'UZS' : onkursv }</Text>
            </View>
        </View>
        );
    }

    const renderItem2 = () =>   {
        return (
            getary.map((items, key) => {
            return <View key={key}>
                <View 
                className="flex-row rounded p-1 m-0.5 " style={styles={
                backgroundColor:
                    key === 0 ? '#15803d' : 
                    key === 1 ? '#047857' :
                    key === 2 ? '#0f766e' :
                    key === 3 ? '#0e7490' :
                    key === 4 ? '#0369a1' :
                    key === 5 ? '#4f46e5' :
                    key === 6 ? '#9333ea' :
                    key === 7 ? '#c026d3' :
                    key === 8 ? '#db2777' :
                    key === 9 ? '#e11d48' :
                    null,
                width: `${
                    key === 0 ? 100 : 
                    key === 1 ? 95 :
                    key === 2 ? 90 :
                    key === 3 ? 85 :
                    key === 4 ? 80 :
                    key === 5 ? 75 :
                    key === 6 ? 70 :
                    key === 7 ? 65 :
                    key === 8 ? 60 :
                    key === 9 ? 55 :
                    0
                }%`

                }}
                key={key} >
                    <Text className="text-slate-50 grow">{items.name}</Text>
                    <Text className="text-slate-50 grow text-right">{formattet.format(items.soni)}</Text>
                </View>
            </View>
            })
        );
    }
    const renderItem3 = () =>   {
        return (
            getary2.map((items, key) => {
            return <View key={key}>
                <View 
                className="flex-row rounded p-1 m-0.5 " style={styles={
                backgroundColor:
                    key === 0 ? '#15803d' : 
                    key === 1 ? '#047857' :
                    key === 2 ? '#0f766e' :
                    key === 3 ? '#0e7490' :
                    key === 4 ? '#0369a1' :
                    key === 5 ? '#4f46e5' :
                    key === 6 ? '#9333ea' :
                    key === 7 ? '#c026d3' :
                    key === 8 ? '#db2777' :
                    key === 9 ? '#e11d48' :
                    null,
                width: `${
                    key === 0 ? 100 : 
                    key === 1 ? 95 :
                    key === 2 ? 90 :
                    key === 3 ? 85 :
                    key === 4 ? 80 :
                    key === 5 ? 75 :
                    key === 6 ? 70 :
                    key === 7 ? 65 :
                    key === 8 ? 60 :
                    key === 9 ? 55 :
                    0
                }%`
    
                }}
                key={key} >
                    <Text className="text-slate-50 grow">{items.name}</Text>
                    <Text className="text-slate-50 grow text-right">{formattet.format( onkurssum === 1 ? items.summa : items.summa / onkurssum )}</Text>
                </View>
            </View>
            })
        );
    }

    let date1 = moment(selectedDate).format('DD.MM.YYYY');
    let date2 = moment(selectedDate2).format('DD.MM.YYYY');

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setDatePickerVisible(false);
        setSelectedDate(date);
    };

    const showDatePicker2 = () => {
        setDatePickerVisible2(true);
    };

    const hideDatePicker2 = () => {
        setDatePickerVisible2(false);
    };

    const handleConfirm2 = (date) => {
        setDatePickerVisible2(false);
        setSelectedDate2(date);
    };

    const getFilter = () => {
        getList(date1, date2);
    };


    useEffect(() => {
        getList(date1, date2);
        getKurs();
    }, [])

  return (
    <View className="">
      { listKurs() }

        <View className="flex-row mt-2">
            <Text className="mx-2  text-lg">{date1}</Text>
            <Text className="mx-2" onPress={() => showDatePicker()}>
                <Fontisto className="" name="date" size={25}/>
            </Text>
            <Text className="mx-2 text-lg">{date2}</Text>
            <Text className="mx-2" onPress={() => showDatePicker2()}>
                <Fontisto className="" name="date" size={25}/>
            </Text>
            <Text className="bg-green-700 text-white font-bold rounded-md mx-2 px-4 pt-1" onPress={() => getFilter()}>
                Filter
            </Text>
        </View>

        <ScrollView className="mt-1" style={styles.scrollVi}>
            <Text className="text-center text-lg">Savdolar</Text>
        <View>
            <Text className="text-center">
              { chart_pie() }
            </Text>
          </View>
          { renderItem() }
          <View className="border border-slate-300 mt-1 p-2 rounded">
            <Text className="text-center text-lg">Tovar soni bo`icha</Text>
            { renderItem2() }
          </View>
          <View className="border border-slate-300 mt-1 p-2 rounded">
            <Text className="text-center text-lg">Tovar narxi bo`icha</Text>
            { renderItem3() }
          </View>
        </ScrollView>

        <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <DateTimePickerModal
            date={selectedDate2}
            isVisible={datePickerVisible2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
        />
    </View>
  )
}

export default Statistik

const styles = StyleSheet.create({
  scrollVi: {
      height: 200
    },
    texStn: {
      fontSize: 25
    },
    texSts: {
        fontSize: 15
    },
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#A8E9CA'
    },
    title: {
      textAlign: 'left',
      fontSize: 20,
      fontWeight: 'bold',
    },
    datePickerStyle: {
      width: 230,
    },
    text: {
      textAlign: 'left',
      width: 230,
      fontSize: 16,
      color : "#000"
    }
  })

// import React, { useState } from 'react';
// import { SafeAreaView, View, Text, Button } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment from 'moment';

// const Statistik = () => {

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{
//           padding: 20,
//           flex: 1,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Button title="Select a date" onPress={showDatePicker} />
     
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Statistik;