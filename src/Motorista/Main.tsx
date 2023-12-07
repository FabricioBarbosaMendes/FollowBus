import React, { useEffect, useState, useRef } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Pressable,Alert, Linking, Text, View, TouchableOpacity } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
  LatLng, 
  MapPressEvent
} from "react-native-maps";
import { RectButton, TextInput } from "react-native-gesture-handler";
import * as Location from "expo-location";
import styles from "./styles";
import { RNCamera } from "react-native-camera";

const App = () => {
    const [link,setLink] = useState("")
    const handleLink = () => {
        Linking.openURL(link).catch(()=>{
            console.log("Houve um erro")
        })
    }
    return  (
        <QRCodeScanner 
        onRead={({ data }) => setLink(data)}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
            <View>
                <Text>
                    {link}
                </Text>
            </View>
        }
        bottomContent={
            <View>
                <TouchableOpacity style={{padding:12,backgroundColor:"#0277BD",marginTop:20}} onPress={()=>handleLink()}>
                    <Text style={{color:"#FFFFFF"}}>
                        Ir para link
                    </Text>
                </TouchableOpacity>
            </View>
        }

        />
        )
}
