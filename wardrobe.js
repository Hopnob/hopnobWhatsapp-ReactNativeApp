import React, {useState,useRef,useEffect} from 'react';
import {FlatList,StyleSheet,Text,View,Image, Button} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import axios from 'axios';

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

 
export default function WardrobePage( ) {
  const [value, setValue] = useState(null);
  const [listItems, setListItems] = useState(clothsArray);
  const [listItemsRA, setListItemsRA] = useState(clothsArrayRA);
  
  const currURL = "https://wardrobehn.netlify.app/919997793031";
  var parsedURLarr = currURL.match(/(\d+)/);
  var mobileNumber = parsedURLarr[0];

  // alert("Mobile Number is ");


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
   
   
   const ItemView = ({ item }) => {
    return (
            <>
            <View style={{backgroundColor:'#F5F5F5',borderRadius:20, justifyContent:'space-around',alignItems:'center', width:wp(30)-10,height:wp(35)-10, marginBottom:5, marginRight:5}}>
                <Image style={{height:'100%',width:wp(30)-15 }}   source= {{uri: item.image }} />  
            </View>
            </>
    );
  };

  const recentlyaddedView = ({ item }) => {
    return (
            <>
            <View style={{backgroundColor:'#F5F5F5',borderRadius:20, justifyContent:'space-around',alignItems:'center', width:wp(30)-10,height:wp(35)-10, marginBottom:5, marginRight:5}}>
                <Image style={{height:'100%',width:wp(30)-15 }}   source= {{uri: item.image }} />  
            </View>
            </>
    );
  };

  return (
  <View
                    style={{ flex:1, paddingLeft:25,paddingRight:25,paddingTop:0,backgroundColor:'white',paddingTop:15
                }}>
                  
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
