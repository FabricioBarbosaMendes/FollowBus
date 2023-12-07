import React from "react";
import { Text,View,StatusBar } from "react-native";

export default statusBar=>{
    return(
        <View>
            <StatusBar 
                barStyle="light-content"
                hidden={false}
                backgroundColor="black"
            />
        </View>
    )
}