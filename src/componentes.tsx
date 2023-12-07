import { View, Text, StyleSheet } from "react-native";
import styles from "./SearchBar";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import axios from "axios";

export interface DropdownOptionsProps {
  selectedOption: string | undefined;
  onValueChange: (value: string) => void;
}

const API_URL = 'https://buslive-database-api.onrender.com';

const Dropdown: React.FC<DropdownOptionsProps> = ({
  selectedOption,
  onValueChange,
}) => {
  const [options, setOptions] = useState<[string, string][]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const items = await getItems();
        setOptions(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  const getItems = async (): Promise<[string, string][]> => {
    try {
      const response = await axios.get(`${API_URL}/api/buses`);
      return response.data.map((item: any) => [item.rota, item._id]);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return (
    <Picker
      style={{width:"100%",backgroundColor:'#FFF',opacity:.9,borderWidth: 1, borderColor: 'gray'}}
      itemStyle={{borderWidth:10,borderColor:'red'}}
      selectedValue={selectedOption}
      onValueChange={(value) => onValueChange(value)}
    >
      {options.map((option) => (
        <Picker.Item label={option[0]} value={option[1]} key={option[1]} />
      ))}
    </Picker>
  );
};

export default Dropdown;
