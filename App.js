import React, { useState } from 'react';
import { StyleSheet, View, AsyncStorage, TouchableOpacity, Text } from 'react-native';
import Quote from './src/Quote.js';
import ButtonAOV from './src/ButtonAOV.js';
import Msg from './src/Msg.js';
import Navbar from './src/Navbar.js';
import AddPlayerView from './src/AddPlayerView.js';
import SetManager from './src/SetManager.js';
import CardFlip from 'react-native-card-flip';

let nextPlayer = 0;

export default function App() {
  const [arrPlayers, setarrPlayers] = useState([]);
  const [quoteText, setQuoteText] = useState(" Dare or truth ? ");
  const [MsgVar, setMsgVar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [setsModalVisible, setSetsModalVisible] = useState(false);
  const [arrSetsViews, setarrSetsViews] = useState([]);
  const [setInfos, setSetInfos] = useState();
  const [modalMode, setModalMode] = useState();
  const [setsModal2Visible, setSetsModal2Visible] = useState(false);
  const [clickedSet, setClickedSet] = useState('');
  const [useOrEditVisible, setUseOrEditVisible] = useState('none');
  const [viewsForEdit, setViewsForEdit] = useState([]);
  const [usedSet, setUsedSet] = useState(null);

  async function updateQuote(type){
    if(usedSet == null){
      setQuoteText(" Chargement.. ");
      let newText = await fetch("http://www.service-mutuelle.fr/actionv/API/aov_API.php?quote_type="+type);
      let msg = await newText.text();
      setQuoteText(JSON.stringify(msg).slice(1, -1));
    }else{
      let newText = fetchFromLocalSet(type);
      setQuoteText(newText);
    }
    if(arrPlayers.length != 0){
      displayNextPlayer();
    }
  }

  function fetchFromLocalSet(type){
    let allActions = [];
    let allVerites = [];
    for(var i = 0; i<usedSet.questions.length; i++){
      if(usedSet.questions[i] != null){
        if(usedSet.questions[i].qType == 'action'){
          allActions.push(usedSet.questions[i].qText);
        }
        if(usedSet.questions[i].qType == 'verite'){
          allVerites.push(usedSet.questions[i].qText);
        }
      }
    }
    let finalQuote = '';
    if(type == 1){
      finalQuote = allActions[Math.floor(Math.random() * allActions.length-1) + 1];
      if(allActions.length == 0){
        finalQuote = 'There are no dares in your set, but you can them from the Set tab';
      }
    }else{
      finalQuote = allVerites[Math.floor(Math.random() * allVerites.length-1) + 1];
      if(allVerites.length == 0){
        finalQuote = 'There are no truths in your set, but you can them from the Set tab';
      }      
    }
    return finalQuote;
  }

  function addPlayer(name){
    if(name != '' && !arrPlayers.includes(name)){
      let tmpArr = arrPlayers.slice();
      tmpArr.push(name);
      setarrPlayers(tmpArr);
      nextPlayer = 0;
    }
  }

  async function createViewListForSetManager(){
    let sets = await AsyncStorage.getItem('sets');
    sets = await JSON.parse(sets);
    let arrViews = [];
    if(sets == null){
        setarrSetsViews(null);
    }else{
        for(var i = 0; i<sets.length;i++){
            let name = sets[i].setName;
            let leSet = sets[i];
            arrViews.push(<TouchableOpacity style={[styles.setLine]} onPress={()=> clickOnSet(leSet)} key={i}><Text>{name}</Text></TouchableOpacity>);
        }
        setarrSetsViews(arrViews);
    }
  }

  function clickOnSet(leSet){
    setUseOrEditVisible('flex');
    setClickedSet(leSet);
    let tmpArr = [];
    for(var i = 0; i<leSet.questions.length; i++){
      if(leSet.questions[i] != null){
        tmpArr.push(<View key={i+1000} style={{borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,0.5)'}}><Text>{leSet.questions[i].qType +" - "+leSet.questions[i].qText}</Text></View>)
      }
    }
    setViewsForEdit(tmpArr);
  }

  function editSetBtn(){
    setModalMode('edit');
    setSetsModal2Visible(true);
  }

  function displayNextPlayer(){
    if(arrPlayers.length != 0){
      setMsgVar(<Msg msgText={"It's "+arrPlayers[nextPlayer%arrPlayers.length]+"'s turn !"} style={[styles.Msg, styles.shadowBx]}/>);
      nextPlayer++;
    }else{
      setMsgVar(<Msg msgText={"You can add players from the Players tab !"} style={[styles.Msg, styles.shadowBx]}/>);
      nextPlayer++;
    }
  }

  function openModal(){
    setModalVisible(true);
  }

  function closeModal(){
    setModalVisible(false);
  }  
  
  function openSetModal(){
    createViewListForSetManager();
    setSetsModalVisible(true);
  }

  function closeSetModal(){
    setSetsModalVisible(false);
  }

  function createNewSet(){
    setModalMode('create');
    setViewsForEdit([]);
    setSetsModal2Visible(true);
  }

  async function modal2Close(newSet){
    setSetsModal2Visible(false);
    await addSetToStorage(newSet);
    createViewListForSetManager();
    setClickedSet('');
    setViewsForEdit([]);

  }

  async function addSetToStorage(newSet){
    let set = newSet
    let sets = await AsyncStorage.getItem('sets');
    
    if(sets == null){
        sets = [];
        sets.push(set);
        await AsyncStorage.setItem('sets', JSON.stringify(sets));
    }else{
        sets = JSON.parse(sets);
        for(var i = 0; i<sets.length; i++){
          if(sets[i].setName == newSet.setName){
            sets.splice(i,1);
          }
        }
        sets.push(set);
        await AsyncStorage.removeItem('sets');;
        await AsyncStorage.setItem('sets', JSON.stringify(sets));
    }
  }

  if(nextPlayer  == 0){
    displayNextPlayer();
  }
  return (
    <View style={{height:'100%', backgroundColor:'#faebd7'}}>
      <Navbar style={styles.NavbarStyle} openModalFunction={openModal} openSetsModalFunction={openSetModal}/>
      <View style={styles.container}>
        <Quote quoteText={quoteText} style={[styles.Quote, styles.shadowBx]}/>
        {MsgVar}
        <View style={styles.ButtonAOVContainer}>
          <ButtonAOV type={"1"} style={[styles.ButtonAOV,{backgroundColor:'#89e8f6'}, styles.shadowBx]} func={updateQuote}/>
          <ButtonAOV type={"2"} style={[styles.ButtonAOV,{backgroundColor:'#ffb6c1'}, styles.shadowBx]} func={updateQuote}/>
        </View>
      </View>
      <AddPlayerView 
        addPlayerFunction={addPlayer} 
        playerList={arrPlayers} 
        visible={modalVisible} 
        closeModalFunction={closeModal}
      />
      <SetManager 
        _setUsedSet={setUsedSet}
        viewsForEdit={viewsForEdit}
        _editSetBtn={editSetBtn}
        setsModal2Visible={setsModal2Visible} 
        _setSetsModal2Visible={setSetsModal2Visible} 
        _setarrSetsViewsfunc={setarrSetsViews} 
        setArrViews={arrSetsViews} 
        visible={setsModalVisible} 
        _closeModalFunction={closeSetModal}
        _createNewSet={createNewSet}
        modalMode={modalMode}
        setsModal2Visible={setsModal2Visible}
        _modal2Close = {modal2Close}
        _createViewListForSetManager={createViewListForSetManager}
        clickedSet={clickedSet}
        useOrEditVisible={useOrEditVisible}
        _setUseOrEditVisible={setUseOrEditVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  NavbarStyle: {backgroundColor:'#D8E6AD', height:100},
  container: {padding: 30,paddingTop:50, height:'80%', display:'flex', justifyContent: 'space-between', alignItems:'center', backgroundColor:'#faebd7'},
  Quote:{height:'50%', width:'100%', backgroundColor:'white', borderRadius:10, borderColor:'white', borderWidth:10, display:'flex', justifyContent:'center'},
  ButtonAOV:{height:'100%', width:'45%', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:10},
  ButtonAOVContainer: {height: '20%',display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between'},
  shadowBx:{ shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2},
  Msg:{ backgroundColor:'#d9a7f5', borderColor:'#d9a7f5', borderWidth:15, width:'100%', display:'flex'},
  setLine: {borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,0.3)'}
});
