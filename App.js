/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
export default function App() {
  const [password, setpasword] = useState('');
  const [result, setresult] = useState('');
  const resultTrue = '輸入正確';
  const resultFalse = '輸入錯誤請重新輸入';
  const confirm = () => {
    if (password === 'A12345678') {
      setresult(resultTrue)
    } else {
      setresult(resultFalse)
    }
  }
  return (
    <View style={styles.container}>
      <Swiper
        height={300}
        loop={true}
        autoplay={true}
        autoplayTimeout={4}
        removeClippedSubviews={false}
        horizontal={true}
        paginationStyle={{ bottom: 10 }}
        showsButtons={false}
        dot={<View style={{           //未选中的圆点样式
          backgroundColor: 'rgba(0,0,0,.2)',
          width: 18,
          height: 18,
          borderRadius: 6,
          marginLeft: 10,
          marginRight: 6,
          marginTop: 6,
          marginBottom: 6,
        }} />}
        activeDot={<View style={{    //选中的圆点样式
          backgroundColor: '#3C3C3C',
          width: 18,
          height: 18,
          borderRadius: 8,
          marginLeft: 10,
          marginRight: 6,
          marginTop: 6,
          marginBottom: 6,
        }} />}>
        <Image resizeMode="cover" source={require('./src/img/fox.jpg')} style={styles.img} />
        <Image resizeMode="cover" source={require('./src/img/leopard.jpg')} style={styles.img} />
        <Image resizeMode="cover" source={require('./src/img/lion.jpg')} style={styles.img} />
      </Swiper>
      <Text style={styles.text}>身分證字號:A12345678</Text>
      <TextInput
        style={{ height: 50, width: 300, borderRadius: 2, borderColor: 'gray', borderWidth: 5, backgroundColor: 'gray', color: 'white', fontSize: 28, textAlign: 'center' }}
        onChangeText={(text) => setpasword(text)}
        value={password}
        maxLength={10}
        placeholder='set your idcard'
        keyboardType={"numbers-and-punctuation"}
        secureTextEntry={true}//密碼形式
        editable={true}//設置權限
        autoFocus={true}
      />
      <Text style={styles.text}>您輸入的身分證字號是{password}</Text>
      <Button
        title="confirm"
        onPress={() => confirm()}
      />
      <Text>{setresult}</Text>
      <Text>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25
  },
  swiper: {},
  img: {
    width: width,
    flex: 1,
  },
});
