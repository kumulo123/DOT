import React, { useRef,useState } from 'react';
import { Animated, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

function UseOrEdit(props){

    function editBtn(leSet){
        props._setUseOrEditVisible('none');
        props._editSetBtn();
    }

    function useThisSetBtn(leSet){
        props._setUseOrEditVisible('none');
        props._setUsedSet(leSet);
    }
    
    return(
    <Animated.View style={[styles.UseOrEditContainer,{display:props.useOrEditVisible}]}>
            <View style={styles.UseOrEditWindow}>
                <TouchableOpacity onPress={()=>editBtn(props.leSet)} style={[styles.UseOrEditBtn]}>
                    <Text style={{fontSize:28, color:'white'}}>Edit</Text>
                </TouchableOpacity>                
                <TouchableOpacity onPress={()=>useThisSetBtn(props.leSet)} style={[styles.UseOrEditBtn]}>
                    <Text style={{fontSize:28, color:'white'}}>Use this set</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    UseOrEditContainer:{position:'absolute', backgroundColor:'rgba(0,0,0,0.8)', height:'100%', width:'100%', display:"none", justifyContent:"center", alignItems:'center'},
    UseOrEditWindow:{ height:'20%', width:'70%', display:'flex', justifyContent:'space-around', alignItems:'center' },
    UseOrEditBtn:{height:'45%', width:'100%', backgroundColor:'#708090', display:'flex', justifyContent:'center', alignItems:'center'}
});

export default UseOrEdit;