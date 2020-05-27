import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

function BtnClick (props){
  let btnTxt = '';

  if(props.type == 1){
    btnTxt = 'Dare';
  }else{
    btnTxt = 'Truth';
  }

  function cliquage(){
    props.func(props.type);
   }

   return (
      <TouchableOpacity onPress={cliquage} style={props.style}>
        <Text style={{fontSize:24, color: 'white',   textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: {width: -1, height: 1},textShadowRadius: 1}}>{btnTxt}</Text>
      </TouchableOpacity>
    )

}


export default BtnClick;
