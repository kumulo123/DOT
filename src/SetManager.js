import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import SetEditor from './SetEditor';
import UseOrEdit from './UseOrEdit';
function SetManager(props){
    async function logStorage(){
        await AsyncStorage.removeItem('sets');
        await AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
              stores.map((result, i, store) => {
                console.log({ [store[i][0]]: store[i][1] });
                return true;
                });
            });
        });
        props._createViewListForSetManager();
    }
    return (
        <Modal transparent={true} animationType="slide" visible={props.visible}>
            <View style={[styles.container, styles.shadowBx]}>
                <View style={styles.modalStyle}>
                    <View style={[styles.innerViewsSyle, {height:'15%', display:'flex',justifyContent:"center", alignItems:"center"}]}>
                        <Text style={{fontSize:32}}>Your sets</Text>
                    </View>
                    <Text style={{display:'none'}}></Text>
                    <View style={[styles.scrollViewStyle, styles.innerShadowBx]}>
                        <ScrollView>
                            {props.setArrViews}
                            <TouchableOpacity onPress={props._createNewSet}><Text>Create a new set !</Text></TouchableOpacity>
                            <TouchableOpacity /*style={{display:'none'}}*/ onPress={logStorage}><Text>Log moi ca</Text></TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={[styles.innerViewsSyle, {height:'15%', backgroundColor: 'lightgreen'}]}>
                        <TouchableOpacity onPress={props._closeModalFunction} style={{height:'100%', width:'100%', display:'flex', justifyContent:"center", alignItems:"center"}}><Text style={{fontSize:24, color:'white'}}>Exit</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
            <SetEditor
                viewsForEdit={props.viewsForEdit}
                leSet={props.clickedSet}
                modalMode={props.modalMode} 
                visible={props.setsModal2Visible}
                _modal2Close={props._modal2Close}
                _setSetsModal2Visible={props._setSetsModal2Visible}
            />
            <UseOrEdit
                _editSetBtn={props._editSetBtn}
                leSet={props.clickedSet}
                useOrEditVisible={props.useOrEditVisible} 
                style={{display:'none'}}
                _setUseOrEditVisible={props._setUseOrEditVisible}
                _setUsedSet={props._setUsedSet}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    scrollViewStyle:{height:'60%', width:'90%', padding:15},
    container:{height:'100%', width:'100%', flex:1, justifyContent:"center", alignItems:"center"},
    modalStyle:{height:'80%', width:'90%', backgroundColor:'white', borderRadius:10, padding:20, paddingTop:50, paddingBottom:50, flexDirection:'column', display:'flex', justifyContent:"space-between", alignItems:'center'},
    innerViewsSyle:{width:'90%', backgroundColor:'beige', borderRadius:5, borderWidth: 1, borderColor:'rgba(0,0,0,0.2)', fontSize:48},
    shadowBx:{ shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius:50, elevation: 2},
    innerShadowBx: { backgroundColor: 'transparent', borderColor: 'white', borderWidth: 5, overflow: 'hidden', shadowColor: 'black', shadowRadius: 10, shadowOpacity: 0.7}
});

export default SetManager;