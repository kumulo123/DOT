import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Animated } from 'react-native';

function Quote(props){

  return (
    <View style={[props.style, {padding:30}]}>
      <ScrollView>
        <Text style={{fontSize:36, textAlign:'center'}}>{props.quoteText}</Text>
      </ScrollView>
    </View>
  )
}

export default Quote;