import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

function AddPlayerView(props){
    const [newName, setNewName] = useState('');
    let playerViewArr = [];

    function sendNewPlayerName(){
        props.addPlayerFunction(newName);
    }

    for(var i = 0; i<props.playerList.length; i++){
        playerViewArr.push(<View style={{padding:5}} key={i}><Text style={{fontSize:18}}>-{props.playerList[i]}</Text></View>);
    }
  return (
    <Modal transparent={true} animationType="slide" visible={props.visible}>
        <View style={[styles.container, styles.shadowBx]}>
            <View style={styles.modalStyle}>
                <View style={[styles.innerViewsSyle, {height:'15%', display:'flex',justifyContent:"center", alignItems:"center"}]}>
                    <Text style={{fontSize:32}}>Players</Text>
                </View>
                <View style={{ width:'90%', height:'10%', borderRadius:5, display:'flex', justifyContent:"space-between", flexDirection:'row',alignItems:'center'}}>
                    <View style={{ width:'75%', height:'80%', display:'flex', justifyContent:'center', borderColor:'rgba(0,0,0,0.2)', borderWidth:1, borderRadius:3, paddingLeft:5}}>
                        <TextInput id='test' style={{fontSize:18}} placeholder={'Player name'} value={newName} onChangeText={(text)=>setNewName(text)}></TextInput>
                    </View>
                    <TouchableOpacity onPress={sendNewPlayerName} style={{backgroundColor:'lightgreen', borderRadius:5, borderWidth:5, borderColor:'lightgreen', borderColor:'rgba(0,0,0,0.2)', borderWidth:1, height:'80%', width:'23%', display:'flex', justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>Add</Text></TouchableOpacity>
                </View>             
                <View style={[styles.innerViewsSyle, {height:'55%', padding: 10}]}>
                    {playerViewArr}
                </View>                
                <View style={[styles.innerViewsSyle, {height:'15%', backgroundColor: 'lightgreen'}]}>
                    <TouchableOpacity onPress={props.closeModalFunction} style={{height:'100%', width:'100%', display:'flex', justifyContent:"center", alignItems:"center"}}><Text style={{fontSize:24, color:'white'}}>Exit</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container:{height:'100%', width:'100%', flex:1, justifyContent:"center", alignItems:"center"},
    modalStyle:{height:'80%', width:'90%', backgroundColor:'white', borderRadius:10, padding:20, paddingTop:50, paddingBottom:50, flexDirection:'column', display:'flex', justifyContent:"space-between", alignItems:'center'},
    innerViewsSyle:{width:'90%', backgroundColor:'beige', borderRadius:5, borderWidth: 1, borderColor:'rgba(0,0,0,0.2)', fontSize:48},
    shadowBx:{ shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius:50, elevation: 2} 
});

export default AddPlayerView;