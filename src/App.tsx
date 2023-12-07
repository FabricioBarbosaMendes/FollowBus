import React, { useEffect, useState, useRef, useCallback } from "react";
import { Alert, Text, View, Modal,Image  } from "react-native";
import Dropdown, { DropdownOptionsProps } from "./componentes"
import Statusbar from "./componentes/statusbar"
import {getVehicleLocation} from "../src/api/apiService"
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  LatLng
} from "react-native-maps";
import { LocationObject } from "expo-location";
import styles from "../src/styles";
import stylinho from "../src/SearchBar"
import * as Location from "expo-location";
//import Loading from "./componentes/loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
const busImage = require("./imagens/MarkerOnibusFinal.png");

function guidGenerator(){
  var S4 = function(){
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const submit = () => {
  setTimeout(() => {
    console.log("teste2")
}, 5000)
}
interface Bus{
  IsActive : boolean;
  latitude: number;
  longitude: number;
  buskey : any;
}

let initialRegion = {
  latitude: -21.425300,
  longitude: -45.949712,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

let initialPoint = {
  coords:{
    latitude: -21.425300,
    longitude: -45.949712,
  }
}

export default function App() {
  //#region constantes
const mapViewRef = useRef<MapView>(null);
const [Busmarkers, setBusMarkers] = useState<LatLng[]>([]);
const [showAlert, setShowAlert] = useState(false);
const [selectedOption, setSelectedOption] = useState<string>();
const [vehicleLocation, setVehicleLocation] = useState<any| null>(null);
//#endregion

const clearMarkers = () => {
  setBusMarkers([]);
};

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }
  };

  getCurrentPosition();

  const handleValueChange = useCallback<DropdownOptionsProps["onValueChange"]>(
    async (value :string) => {
      setSelectedOption(value);
      //console.log('option:' + selectedOption)
      await setShowAlert(true);
    },
    [selectedOption]
  );

    const attBus = useCallback(
      () => {
        clearMarkers();
        let {
          coords: { latitude, longitude }
        } = initialPoint;

        if (!(vehicleLocation === null)) {
          latitude = parseFloat(vehicleLocation.latitude);
          longitude = parseFloat(vehicleLocation.longitude);
        }

        let busmarker = {
          latitude,
          longitude
        };

        if(Busmarkers.length > 0){
          let lastBusMarker = Busmarkers[Busmarkers.length - 1];
          if(lastBusMarker.latitude == busmarker.latitude && lastBusMarker.longitude == busmarker.longitude){
            return;
          }
        }

        setBusMarkers([busmarker]);
      },
      [vehicleLocation]  
  );


    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      if (showAlert) {
        setShowAlert(true);

        timeoutId = setTimeout(() => {
          setShowAlert(false); 
        }, 6000);
      }
      attBus();
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [showAlert]);

   useEffect(() => {
      const intervalId = setInterval(async () => {
      const vehicleId = selectedOption; 
      const newLocation = JSON.stringify(await getVehicleLocation(vehicleId));
      //console.log(newLocation);
      if(!(newLocation===undefined || newLocation==JSON.stringify(vehicleLocation))){
        await setVehicleLocation(JSON.parse(newLocation));
        await attBus();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [selectedOption,vehicleLocation]);

  return (
    <SafeAreaProvider>
      <View style={stylinho.content}>
        <Statusbar/>
        <View style={{width:"100%",paddingHorizontal:8,paddingTop:8,position:"absolute",zIndex:100,backgroundColor:'#403D38',height:'15%',alignItems:'center'}}>
        <Text style={{
        fontSize: 24, 
        fontWeight: 'bold', 
         color: '#FF6000', 
         marginBottom: '1%', 
         textShadowColor: '#FF6000', 
         textShadowOffset: { width: 1.5, height: 1.5 }, 
         textShadowRadius: 20, 
        }}>FollowBus</Text>
          <Dropdown selectedOption={selectedOption} onValueChange={handleValueChange} />
        </View>
        <MapView
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          mapPadding={{top: 60, right: 0, bottom: 0, left: 0}}
          showsIndoorLevelPicker={true}
          zoomControlEnabled={true}
          followsUserLocation={true}
          loadingEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onUserLocationChange={()=>{}}
          onMapLoaded={submit}
        >
           
          {Busmarkers.map((marker) => (
            <Marker
              tracksViewChanges={true}
              key={guidGenerator()}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              <Image source={busImage} style={{ width: 70, height: 70 }} />
            </Marker>
          ))}
          
        </MapView>
        
        <Modal visible={showAlert} onRequestClose={() => {}}>
          <View style={{flex: 1,width:"100%",alignItems:'center',justifyContent:'center',height:"100%"}}>
            <Text style={{textAlign:'center'}}>Carregando</Text>
          </View>
        </Modal>        
      </View>
    </SafeAreaProvider>
  )}
