import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendToken } from '../Send/Send';
import { setData } from '../Send/As';
const RegistratsiyaScreen = ({navigation}) => {

  const [ere, onErrorE] = useState('');
  const [er, onError] = useState('');
  const [email, onChangeEmail] = useState('');
  const [login, onChangeLogin] = useState('');
  const [parol, onChangePassword] = useState('');
  const [pparol, onChangePpassword] = useState('');

  const onPressSend = async () => {
    if (!login) {
      onErrorE('Login yozing');
    }
    if (!parol) {
      onError('Parol yozing');
    } 
    if (!pparol) {
      onError('Parolni qayta yozing');
    } 
    if (parol !== pparol ) {
      onError('Parol xato');
    }
    if (parol === pparol) {
      setData(navigation, await sendToken('post', 'rcreate', {email: email, login: login, parol: parol}));
      onErrorE('');
      onError('');
      onChangeEmail('');
      onChangeLogin('');
      onChangePassword('');
      onChangePpassword('');
    }
  };

  const loginnav = () => {
    navigation.navigate('Login');
  }


  // useEffect(() => {
  //    getData(navigation);
  // }, [])
  
  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <TextInput
        className="border border-slate-400 p-2 m-1 rounded-md"
        // style={ ere ? {

        // } : {

        // }}
        value={email}
        onChangeText={(email) => onChangeEmail(email)}
        placeholder="Email"
      />
      <TextInput
        className="border border-slate-400 p-2 m-1 rounded-md"
        value={login}
        onChangeText={(login) => onChangeLogin(login)}
        placeholder="Login"
      />
      <TextInput
        className="border border-slate-400 p-2 m-1 rounded-md"
        value={parol}
        onChangeText={(parol) => onChangePassword(parol)}
        placeholder="Parol"
      />
      <TextInput
        className="border border-slate-400 p-2 m-1 rounded-md"
        value={pparol}
        onChangeText={(pparol) => onChangePpassword(pparol)}
        placeholder="Parol takror"
      />
    <Text style={styles.ero}>{er}</Text>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressSend}>
        <Text style={styles.t}>Registeratsiya</Text>
      </TouchableOpacity>
      <Text className="mt-2  text-right text-lg" onPress={loginnav}>Login</Text>
    </View>
    {/* {data} */}
  </SafeAreaView>

  )
}

export default RegistratsiyaScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    marginTop: 5
  },
  button3: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    marginTop: 5
  },
  t: {
    color: '#fff'
  },
  ero: {
    color: 'red',
    marginHorizontal: 10,
    marginBottom: 10
  }
})