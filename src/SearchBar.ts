import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import style from "../src/styles"

export default StyleSheet.create({

    
    main:{
  
        borderRadius:25,
        backgroundColor: 'white',
        position:"absolute",
        width:"98%",
        left:"1%",
        top:"2%",
        paddingLeft:"2%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        zIndex:1,
    },
    content:{
        textAlign:"center",
        position:"relative",
        zIndex:99
    },
    label:{
        color:"#00000090",
        fontSize:20
    },
    labeloption:{
        color:"black",
        fontSize:18
    },
    center:{
        
    },
    
});

