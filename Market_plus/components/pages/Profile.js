import { Text, TextInput, View, Button, Modal, ActivityIndicator, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import GetLocation from 'react-native-get-location'
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Destroy, FetchSend, Store, Update } from "../Send/Send";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { USER_ID } from '../Send/As';

const Profile = () => {
    const [ondeletid,  onDeletId] = useState('');
    const [search,  onSearch] = useState('');

    const [setimage,  setImage] = useState('');

    const [ onid, onID ] = useState('');
    const [ firstname, onUfirstname ] = useState('');
    const [ email, onUemail ] = useState('');
    const [ parol, onUparol ] = useState('');
    const [ city, onUcity ] = useState('');
    const [ busnes, onUbusnes ] = useState('');
    const [ status, onUstatus ] = useState('');
    const [ image, onUimage ] = useState('');
    const [ latetut, onUlatetut ] = useState('');
    const [ longetut, onUlongetut ] = useState('');
    const [ lastname, onUlastname ] = useState('');
    const [ login, onUlogin ] = useState('');
    const [ region, onUregion ] = useState('');
    const [ company, onUcompany ] = useState('');
    const [ phone, onUphone ] = useState('');
    const [ payment, onUpayment ] = useState('');
    const [ image2, onUimage2 ] = useState('');
    const [ imaget1, onUimaget1 ] = useState('');
    const [ imaget2, onUimaget2 ] = useState('');

    const CLears = async () => {
        onid ? await getList() : null;
        await getList();
        setShowModal(false);
    }

    const TuggleModal = (typa) => {
        onID('');
        setShowModal(typa);
    }

    const TuggleModal2 = () => {
        onDeletId('');
        setShowModaldel(false);
    }

    const delet = (id) => {
        onDeletId(id);
        setShowModaldel(true);
    }

    const clerdel = async () => {
        await getList();
        onDeletId('');
        setShowModaldel(false);
    }

    const delete_tavar = async () => {
        var data = await Destroy('DELETE',`delete_rasxod/${ondeletid}`);
        data.status === 201 ? await clerdel() : null;
    }

    const locat = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            onUlatetut(location.latitude);
            onUlongetut(location.longitude);
        })
        .catch(error => {
        });
    }


    const getList = async () => {
        const data = await Store('POST','get_profile', {'id': await USER_ID()});
        onUimaget1('');
        onUimaget2('');
        onID(data.id === await USER_ID() ? data.id || await USER_ID() : null);

        onUfirstname(data.firstname);
        onUlastname(data.lastname);
        onUphone(data.phone);

        onUemail(data.email);
        onUlogin(data.login);
        onUparol(data.parol);

        onUregion(data.region);
        onUcity(data.city);

        onUcompany(data.company);
        onUbusnes(data.busnes);
        
        onUlatetut(data.latetut);
        onUlongetut(data.longetut);

        onUpayment(data.payment);
        onUstatus(data.status);

        onUimage(data.image);
        onUimage2(data.image2);
    }
    
    setColum = async () => {
        return {
            firstname: firstname,
            email: email,
            parol: parol,
            city: city,
            busnes: busnes,
            status: status,
            latetut: latetut,
            longetut: longetut,
            lastname: lastname,
            login: login,
            region: region,
            company: company,
            phone: phone,
            payment: payment
        };
    }

    const updateUser = async () => {
        var data = imaget1 || imaget2 ? await FetchSend('PUT',`update_user/${onid}`,
            setimage
        ) : await Update('PUT',`update_user/${onid}`,
            await this.setColum()
        )
        data.status === 201 ? await getList() : null;
    } 
    
    const selectFC = async (typ) => {
        var formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('login', login);
        formData.append('parol', parol);
        formData.append('region', region);
        formData.append('city', city);
        formData.append('company', company);
        formData.append('busnes', busnes);
        formData.append('latetut', latetut);
        formData.append('longetut', longetut);
        formData.append('payment', payment);
        formData.append('status', status);
        const result = typ === 1 ? await launchCamera({mediaType: 'photo', quality: 0})
                                 : await launchImageLibrary({mediaType: 'photo', quality: 0})
        if (result && result.didCancel !== true) {
            formData.append('file', {
               uri: result.assets[0].uri,
               name: result.assets[0].fileName,
               type: result.assets[0].type
            });
            onUimaget1(result.assets[0].fileName);
            setImage(formData);
        } else {
            onUimaget1('');
        }
    }

    const selectFC2 = async (typ) => {
        var formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('login', login);
        formData.append('parol', parol);
        formData.append('region', region);
        formData.append('city', city);
        formData.append('company', company);
        formData.append('busnes', busnes);
        formData.append('latetut', latetut);
        formData.append('longetut', longetut);
        formData.append('payment', payment);
        formData.append('status', status);
        const result = typ === 1 ? await launchCamera({mediaType: 'photo', quality: 0})
                                 : await launchImageLibrary({mediaType: 'photo', quality: 0})
        if (result && result.didCancel !== true) {
            formData.append('file2', {
               uri: result.assets[0].uri,
               name: result.assets[0].fileName,
               type: result.assets[0].type
            });
            onUimaget2(result.assets[0].fileName);
            setImage(formData);
        } else {
            onUimaget2('');
        }
    }

    useEffect(() => {
        getList();
    }, [])

  return (
    <View className="bg-white" style={{
        flex: 1,
      }}>
        <ScrollView style={{ height: 400 }}>
            <Text className="text-center text-lg font-bold">Rasm qo`yish</Text>
            <Text className="text-center font-bold">{image}</Text>
            <Text className="text-center">
                <View>
                    <View className="rounded-full w-32 h-32">
                        <Image 
                            source={ require('../../images/user.png') } 
                            className="w-32 h-32"
                        />
                    </View>
                    <Text className="flex-row text-center mt-2">
                        <TouchableOpacity className="" onPress={() => selectFC(1)}>
                            <Image 
                                source={require('../../images/ddd.png')}
                                style={{ width: 40, height: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="" onPress={() => selectFC(2)}>
                            <Text className="ml-3">
                                <AntDesign name="edit" size={34} color="#52525b"/>
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </Text>
            <Text className="text-center text-lg font-bold mt-3">Ism Famiyiya</Text>
            <Text className="text-lg font-bold mt-2 mx-1">User ID: {onid}</Text>
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={firstname}
                onChangeText={(firstname) => onUfirstname(firstname)}
                placeholder="Ism"
            />
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={lastname}
                onChangeText={(lastname) => onUlastname(lastname)}
                placeholder="Familiya"
            />
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={phone}
                onChangeText={(phone) => onUphone(phone)}
                placeholder="Telefon"
            />

            <Text className="text-center text-lg font-bold">Ism Famiyiya</Text>
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={email}
                onChangeText={(email) => onUemail(email)}
                placeholder="Email"
            />
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={login}
                onChangeText={(login) => onUlogin(login)}
                placeholder="Login"
            />
             <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={parol}
                onChangeText={(parol) => onUparol(parol)}
                placeholder="Password"
            />

            <Text className="text-center text-lg font-bold">Yashash joyi</Text>
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={region}
                onChangeText={(region) => onUregion(region)}
                placeholder="Viloyat"
            />
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={city}
                onChangeText={(city) => onUcity(city)}
                placeholder="Tuman"
            />
            
            <Text className="text-center text-lg font-bold">Joylashgan o`rni</Text>
            <Text className="text-lg mx-2">Joylashuv: {latetut}</Text>
            <Text className="text-lg mx-2">Joylashuv: {longetut}</Text>
            <Text className="text-right mx-2">
                <TouchableOpacity className="" onPress={() => locat()}>
                    <MaterialIcons name="my-location" size={35} />
                </TouchableOpacity>
            </Text>

            <Text className="text-center text-lg font-bold">Biznes</Text>
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={company}
                onChangeText={(company) => onUcompany(company)}
                placeholder="Firma nomi"
            />
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={busnes}
                onChangeText={(busnes) => onUbusnes(busnes)}
                placeholder="Biznes turi"
            />
            <Text className="text-center text-lg font-bold">Rasm qo`yish</Text>
            <Text className="text-center font-bold">{image2}</Text>
            <Text className="text-center">
                <View>
                    <View className="rounded-md w-48 h-36">
                        <Image 
                            source={ require('../../images/imag.png') } 
                            className="w-44 h-36"
                        />
                    </View>
                    <Text className="flex-row text-center mt-2">
                        <TouchableOpacity className="" onPress={() => selectFC2(1)}>
                            <Image 
                                source={require('../../images/ddd.png')}
                                style={{ width: 40, height: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="" onPress={() => selectFC2(2)}>
                            <Text className="ml-3">
                                <AntDesign name="edit" size={34} color="#52525b"/>
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </Text>

            <Text className="text-center text-lg font-bold">To`lov xolati</Text>
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={payment}
                onChangeText={(payment) => onUpayment(payment)}
                placeholder="To`lov"
            />
            <TextInput className="border-b-0.5 border-slate-400 p-2 mb-1"
                value={status}
                onChangeText={(status) => onUstatus(status)}
                placeholder="To`lov xolati"
            />

            <TouchableOpacity onPress={() => updateUser()}>
                <Text className="bg-green-800 text-white text-center text-lg rounded-md p-3 m-2 m mb-4">Saqlash</Text>
            </TouchableOpacity>
        </ScrollView>

 
    </View>
  )
}

export default Profile