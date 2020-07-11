/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
export default function App() {
  const [password, setpasword] = useState('');
  const [result, setresult] = useState('');
  const [Isclick, setIsclick] = useState(true);
  const [count, setcount] = useState(0);
  const [Btndisable, setBtndisable] = useState(false);
  const [Img, setImg] = useState(require('./src/img/login.png'));
  const [remainSecond, setRemainSecond] = useState(0)
  const [resultcolor, setResultcolor] = useState('red')
  const resultTrue = '輸入正確';
  const resultFalse = '輸入錯誤還可輸入';
  const confirm = () => {
    if (password === 'A12345678') {
      setresult(resultTrue)
      setcount(0)
      setResultcolor('green')
    } else if (count <= 10) {
      setresult(resultFalse + (9 - count) + '次')
      setcount(count + 1)
      setResultcolor('red')
    }
    console.log(count)
  }
  // effect
  useEffect(() => {
    const countDownSecond = 180
    if (count >= 10 && Isclick == true) {
      setIsclick(false);
      setBtndisable(true);
      setImg(require('./src/img/cancel.png'));
      Alert.alert('登入錯誤', '輸入錯誤超過10次\n請3分鐘後在試');
      // 產生 Timer
      console.log(`[timer] == start count down ${countDownSecond}s  ==`)
      const startTime = Date.now()
      const countDownTimer = setInterval(() => {//每幾毫秒執行一次
        // 計算剩餘秒數
        const pastSeconds = parseInt((Date.now() - startTime) / 1000)
        const remain = (countDownSecond - pastSeconds)
        setRemainSecond(remain < 0 ? 0 : remain)
        console.log('[timer] count down: ', remain)
        // 檢查是否結束
        setresult('於' + remain + '秒後嘗試重新登入')
        if (remain <= 0) {
          clearInterval(countDownTimer)
          setIsclick(true);
          setBtndisable(false);
          setresult('');
          setcount(0)
          setImg(require('./src/img/login.png'))
          console.log(`[timer] == stop count down ${countDownSecond}s  ==`)
        }


      }, 1000)
    }
  }, [count]) // 相依 prop / state 值的 Effect

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
        <Image resizeMode="cover" source={require('./src/img/elephant.jpg')} style={styles.img} />
        <Image resizeMode="cover" source={require('./src/img/cargo.jpg')} style={styles.img} />
      </Swiper>
      <Text style={styles.text}>IDCard:A12345678</Text>
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
      <Text style={styles.text}>Input IDCard:{password}</Text>
      <TouchableHighlight style={{ width: 50, height: 50, backgroundColor: 'white' }}
        disabled={Btndisable}
        onPress={() => confirm()}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={Img}
        />
      </TouchableHighlight>
      <Text style={{ color: (resultcolor), fontSize: 18 }}>{result}</Text>
      {/* <Text style={password === 'A12345678' ? styles.textresultTrue : styles.textresultFalse}>{result}</Text>三元運算即時判斷 */}
      {/* <Text>{remainSecond == 0 ? '' : remainSecond}</Text> */}
    </View >
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
  textresultTrue: {
    fontSize: 18,
    color: 'green'
  },
  textresultFalse: {
    fontSize: 18,
    color: 'red'
  },
  swiper: {},
  img: {
    width: width,
    flex: 1,
  },
});
