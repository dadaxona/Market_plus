import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendToken } from '../Send/Send';
import { getData, setData } from '../Send/As';

const LoginScreen = ({navigation}) => {

  const [ere, onErrorE] = useState('');
  const [er, onError] = useState('');
  const [login, onChangeLogin] = useState('');
  const [parol, onChangePassword] = useState('');

  const onPressSend = async () => {
    if (!login) {
      onErrorE('Login yozing')
    }
    if (!parol) {
      onError('Parol yozing')
    } 
    if (login && parol) {
      setData(navigation, await sendToken('post', 'identi', {login: login, parol: parol}));
      onErrorE('');
      onError('');
      onChangeLogin('');
      onChangePassword('');
    } 
  };

  const loginnav = () => {
    navigation.navigate('Registratsiya');
  }

  useEffect(() => {
    getData(navigation);
 }, [])

  return (
<SafeAreaView className="flex-1 bg-white p-3">
  <Text style={styles.ero}>{ere}</Text>
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
    <Text style={styles.ero}>{er}</Text>
    <View style={styles.container} >
      <TouchableOpacity style={styles.button} onPress={ onPressSend }>
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      <Text className="mt-2 text-right text-md" onPress={loginnav}>Registeratsiya</Text>
    </View>
    {/* {data} */}
  </SafeAreaView>
  )
}

export default LoginScreen


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
  ero: {
    color: 'red',
    marginHorizontal: 10,
    marginBottom: 10
  }
})