import React from 'react';
import { Animated ,StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

function Navbar(props){

    return (
        <View style={[props.style, styles.cont]}>
            <View style={styles.upper}></View>
            <View style={styles.lower}>
                <TouchableOpacity onPress={props.openModalFunction} style={[styles.lowerBarBtn]}><Text style={{color:'whitesmoke',   textShadowColor: 'rgba(0, 0, 0, 0.3)',  textShadowOffset: {width: -1, height: 1},  textShadowRadius: 10}}>Players</Text></TouchableOpacity>
                <TouchableOpacity onPress={props.openSetsModalFunction} style={[styles.lowerBarBtn, {borderLeftWidth:1, borderRightWidth:1, borderColor:'#acb88a'}]}><Text style={{color:'whitesmoke',   textShadowColor: 'rgba(0, 0, 0, 0.3)',  textShadowOffset: {width: -1, height: 1},  textShadowRadius: 10}}>Sets</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.lowerBarBtn]}><Text style={{color:'whitesmoke',   textShadowColor: 'rgba(0, 0, 0, 0.3)',  textShadowOffset: {width: -1, height: 1},  textShadowRadius: 10}}>Credits</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    upper:{height:'0%', width:'100%'},
    cont:{display:'flex'},
    lower:{display:'flex', flexDirection:'row',width:'100%', justifyContent:'space-between',height:'100%'},
    lowerBarBtn:{backgroundColor:'#c2cf9b',flexGrow:1,width:'33.333%', height:'100%', display:'flex', justifyContent:"center", alignItems:"center"}
});

export default Navbar;