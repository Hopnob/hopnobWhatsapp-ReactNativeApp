import WardrobePage from './wardrobe';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState,useRef,useEffect} from 'react';
import {FlatList,StyleSheet,Text,View,Image, Button, Touchable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const clothsArray = [
{ id: '0', image: require('./assets/images/wardrobe/allcloth.png') },

];
const clothsArrayRA = [
  { id: '0', image: require('./assets/images/wardrobe/allcloth.png') },
];


const Wardrobe = ({route})=>{
  const [value, setValue] = useState(null);
  const [listItems, setListItems] = useState(clothsArray);
  const [listItemsRA, setListItemsRA] = useState(clothsArrayRA);
  
  const currURL = JSON.stringify(route.params, 5);
  
   

  var parsedURLarr = currURL.match(/(\d+)/);
  var mobileNumber = parsedURLarr[0];
  
  console.log(currURL)
  console.log(mobileNumber)
  let [fontsLoaded] = useFonts({
     'Open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
   });

   const [newarray, setNewarray] = useState([]);

   useEffect(() => {
    const expensesListResp = async () => {
      await axios.get(`https://hopnob-backend-cctjhm4vha-uc.a.run.app/api/v1/apparel/${mobileNumber}`)
      .then(
        response =>{
          setNewarray(response.data.apparels)
        }
        ).catch(err =>
          alert(err)
          )
    }
    expensesListResp();
  }, []);
 
    // console.log(newarray);
    newarray.map((map,index)=>{
      // console.log(map.url,index)
      clothsArray.push(
        {id: index, image: map.url}
      )
      
      clothsArrayRA.push({
        id: index, image: map.url
      })
    })

   clothsArrayRA.reverse();

   if (!fontsLoaded) {
     return <AppLoading />;
   }
   
   function itemviewHandler(){
    console.log('pressed');
   }
   function recentlyaddedViewHandler(){
    console.log('pressed');
   }
   const ItemView = ({ item }) => {
    return (
            <>
            <TouchableOpacity onPress={itemviewHandler} >
            <View style={{backgroundColor:'#F5F5F5',borderRadius:20, justifyContent:'space-around',alignItems:'center', width:wp(30)-10,height:wp(35)-10, marginBottom:5, marginRight:5}}>
                <Image style={{height:'100%',width:wp(30)-15 }}   source= {{uri: item.image }} />  
            </View>
            </TouchableOpacity>
            </>
    );
  };

  const recentlyaddedView = ({ item }) => {
    return (
            <>
            <TouchableOpacity  onPress={recentlyaddedViewHandler}>

           
            <View style={{backgroundColor:'#F5F5F5',borderRadius:20, justifyContent:'space-around',alignItems:'center', width:wp(30)-10,height:wp(35)-10, marginBottom:5, marginRight:5}}>
                <Image style={{height:'100%',width:wp(30)-15 }}   source= {{uri: item.image }} />  
            </View>
            </TouchableOpacity>
            </>
    );
  };

  return(
    <View
    style={{ flex:1, paddingLeft:25,paddingRight:25,paddingTop:0,backgroundColor:'white',paddingTop:15}}>
  
    <View style={{marginBottom:20, flexDirection:'row',width:wp(100)-50,backgroundColor:'white',}}>
        <View style={{width:wp(50)-20,justifyContent:'space-around', backgroundColor:'white', alignItems:'flex-start'}}> 
        
        <Text
        style={{
            fontSize:16,
            color: '#2D3791',
            fontFamily:'Open-sans'
        }}>WARDROBE
        </Text>  
        </View>
        <View style={{width:wp(30)-10,flexDirection:'row', alignItems:'flex-end', backgroundColor:'white'}}>
         
          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Sort by"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
          setValue(item.value);
          }}
      />
         
        </View>
        <View style={{width:wp(20)-20, alignItems:'flex-end', backgroundColor:'white'}}>
        <Image style={{width:35 ,height:'100%', }}  source={require('./assets/images/wardrobe/Arrowbutton.png')}/>
        </View>
    </View>
    {/* <Text >
  {route.params ? JSON.stringify(route.params, 5) : "No Params Passed"}
  </Text> */}
    <View style={{marginTop:16}}>
        <Text style={{  fontSize:12, fontWeight:'700' ,
            fontFamily:'Open-sans'
      }}>RECENTLY ADDED</Text>

        <View style={{marginTop:5}}>
        <FlatList
  horizontal
  data={listItemsRA}
    //data
    defined="defined"
    in="in"
    constructor="constructor"
    //Item
    Separator="Separator"
    View="View"
    renderItem={recentlyaddedView}
    keyExtractor={(item, index) => index.toString()}/>

          
            </View>      
        </View>
    <Text style={{marginVertical:10,  fontSize:12, fontWeight:'700' ,
            fontFamily:'Open-sans'}}>All CLOTHES</Text>
       <FlatList
    numColumns={3}
    data={listItems}
    //data
    defined="defined"
    in="in"
    constructor="constructor"
    //Item
    Separator="Separator"
    View="View"
    renderItem={ItemView}
    keyExtractor={(item, index) => index.toString()}/>
</View>
  )
}


const Screen = ({ route }) => {
 
  return (
  <View style={{flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",}}>
  <Text >
  <Text >Screen Route: </Text>
  {route.name}
  </Text>
  <Text >
  <Text >Params: </Text>
  {route.params ? JSON.stringify(route.params, 5) : "No Params Passed"}
  </Text>
  </View>
  );
};

const linking = {
    config: {
        screens: {
          // Wardrobe: ':mobile?',
          Wardrobe: ':mobile',
        }
    },
  };
 
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer linking={linking} >
      <Stack.Navigator 
       initialRouteName="Wardrobe"
        screenOptions={{
          headerShown: false,
       }}>
        {/* <Stack.Screen name="Home" component={Screen} /> */}
        <Stack.Screen name="Wardrobe" component={Wardrobe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    padding:24,
    paddingRight:24,
    paddingBottom:91,
  },
  dropdown: {
     width:'100%',
     backgroundColor:'#F3F3F3',
     borderRadius:5,
     alignItems:'center'
  
   },
   icon: {
     marginRight: 5,
   },
   placeholderStyle: {
     fontSize: 12,
     fontWeight:'600',
     paddingLeft:10,
     paddingRight:10,
   },
   selectedTextStyle: {
     fontSize: 16,
   },
   iconStyle: {
     width: 20,
     height: 20,
   },
   inputSearchStyle: {
     height: 40,
     fontSize: 16,
   },
  
});
