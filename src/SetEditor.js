import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
let i = 0;
function SetEditor(props){
    const [selectedValue, setSelectedValue] = useState("action");
    const [txtBxContent, settxtBxContent] = useState('');
    const [titreSet, settitreSet] = useState(props.leSet.setName);
    const [actionSelected, setactionSelected] = useState({borderWidth:1, borderColor:'rgba(0,0,0,0.5)', borderRadius:10});
    const [veriteSelected, setveriteSelected] = useState();
    const [questions, setQuestions] = useState([]);
    const [questionsViews, setQuestionsViews] = useState([]);

    function selectType(type){
        if(type == 'action'){
            setSelectedValue('action');
            setactionSelected({borderWidth:1, borderColor:'rgba(0,0,0,0.5)', borderRadius:10});
            setveriteSelected();
        }else{
            setSelectedValue('verite');
            setactionSelected();
            setveriteSelected({borderWidth:1, borderColor:'rgba(0,0,0,0.5)', borderRadius:10});
        }
    }

    function addQuestion(text, type){
        let tmpArr = questions;
        let questionObj = {
            qText : text,
            qType : type
        };
        tmpArr.push(questionObj);
        setQuestions(tmpArr);
    }

    function btnAjouter(){
        addQuestion(txtBxContent, selectedValue);
        let tmpArr = [];
        for(var i = 0; i<questions.length; i++){
            tmpArr.push(<View key={i} style={{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,0.5)'}}><Text>{questions[i].qType+" - "+questions[i].qText}</Text></View>)
        }
        setQuestionsViews(tmpArr);
        settxtBxContent('');
    }

    function valider(){
        if(questions.length == 0){
            console.log('null');
            props._setSetsModal2Visible(false);
            return;
        }
        let titreSofi = titreSet;
        if(titreSet == '' && props.modalMode == 'edit'){
            titreSofi = props.leSet.setName;
        }
        props._modal2Close({ setName : titreSofi, questions : [].concat(props.leSet.questions, questions)});
        settitreSet('');
        setQuestions([]);
        setQuestionsViews([]);
    }

    return (
        <Modal transparent={true} animationType="fade" visible={props.visible}>
            <View style={[styles.container, styles.shadowBx]}>
                <View style={styles.modalStyle}>
                    <View style={[styles.innerViewsSyle, {height:'15%', display:'flex',justifyContent:"center", alignItems:"center"}]}>
                        <TextInput placeholder='Set name' onChangeText={(text)=>settitreSet(text)} style={{fontSize:32}}></TextInput>
                    </View>
                    <View style={{width:'90%', display:'flex', height:'30%', justifyContent:"space-around", alignItems:'center'}}>
                        <Text style={{fontSize:18, textDecorationLine:'underline'}}>The question</Text>
                        <View style={{borderWidth:1, height:'30%', width:'100%', borderColor:'lightgrey'}}>
                            <TextInput placeholder="Ex : could you..." multiline={true} numberOfLines={4} onChangeText={(text)=>settxtBxContent(text)}>{txtBxContent}</TextInput>
                        </View>
                        <Text style={{fontSize:18, textDecorationLine:'underline'}}>Question type</Text>
                        <View style={{height:'20%', width:'100%', display:"flex", flexDirection:'row', justifyContent:"space-around", alignItems:"center"}}>
                            <TouchableOpacity onPress={()=>selectType('action')}>
                                <Text style={[{color:'lightblue', padding:5}, actionSelected]}>Dare</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>selectType('verite')}>
                                <Text style={[{color:'pink', padding:5}, veriteSelected]}>Truth</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={btnAjouter} style={{backgroundColor:'lightgreen', padding:5, borderRadius:5}}>
                                <Text style={{color:'white'}}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{height:'35%', width:'90%', padding:5}, styles.innerShadowBx]}>
                        <ScrollView>
                            {props.viewsForEdit}
                            {questionsViews}
                        </ScrollView>
                    </View>
                    <View style={[styles.innerViewsSyle, {height:'15%', backgroundColor: 'lightgreen'}]}>
                        <TouchableOpacity 
                            onPress={valider} 
                            style={{height:'100%', width:'100%', display:'flex', justifyContent:"center", alignItems:"center"}}>
                            <Text style={{fontSize:24, color:'white'}}>
                                Exit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    scrollViewStyle:{height:'60%', width:'90%', backgroundColor:'pink', padding:15},
    container:{height:'100%', width:'100%', display:'flex', justifyContent:"center", alignItems:"center"},
    modalStyle:{height:'80%', width:'90%', backgroundColor:'white', borderRadius:10, padding:20, paddingTop:50, paddingBottom:50, display:'flex', alignItems:'center', justifyContent:'space-between'},
    innerViewsSyle:{width:'90%', backgroundColor:'beige', borderRadius:5, borderWidth: 1, borderColor:'rgba(0,0,0,0.2)', fontSize:48},
    shadowBx:{ shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius:50, elevation: 2},
    innerShadowBx: { backgroundColor: 'transparent', borderColor: 'white', borderWidth: 5, overflow: 'hidden', shadowColor: 'black', shadowRadius: 10, shadowOpacity: 0.7}
});

export default SetEditor;