import React, { useState, useEffect } from 'react';
import { Animated ,StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

function Msg(props){
  const [opacity] = useState(new Animated.Value(0));
  const [leText, setleText] = useState();
  function fadeInMsg(){
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  function fadeOutMsg(){
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    
  }
  fadeInMsg();
  return (
    <View>
      <Animated.View style={[props.style,{opacity}]}>
        <Text style={{fontSize:18, textAlign:'center'}}>{props.msgText}</Text>
      </Animated.View>
    </View>
  )
}

export default Msg;