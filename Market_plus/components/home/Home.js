import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react';

import { getTokenAuth } from '../Send/As'
import { getObj } from '../Send/Send';

const Home = ({navigation}) => {

  const Autharize = async () => { await setAxiosDB(await getTokenAuth()) }
    
  const setAxiosDB = async (auth_token) => {
    if (!auth_token) {
      navigation.navigate('Magazin')
    } else {
      var foo = await getObj('verify', auth_token, navigation)
      foo.id ? navigation.navigate('Dashboard') :
      navigation.navigate('Magazin');
    }
  }

  useEffect(() => {
    Autharize();
  }, []);

  return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.butt}>
        <Button
          title="Biznes Profil"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={styles.butt}>
        <Button
          title="Magazin"
          onPress={() => navigation.navigate('Magazin')}
        />
      </View>
    </View>
  )
}

export default Home
const styles = StyleSheet.create({
  butt: {
    paddingTop: 20,
    width: 300,
  }
});