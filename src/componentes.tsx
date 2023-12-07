import ModalDropdown from 'react-native-modal-dropdown';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text } from 'react-native';
import styles from './styles';

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
  const [loading, setLoading] = useState(true);
  const [dropdownText, setdropdownText] = useState<string>()
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const items = await getItems();
        setOptions(items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
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

  const renderButtonText = (rowData : any) => {
    return rowData ? rowData : 'Selecione uma Rota'
  };

  if (loading) {
    return <Text>Carregando Rotas...</Text>;
  }

  return (
    <ModalDropdown
      style={{
        width: "100%",
        backgroundColor: '#F8F7F3',
        opacity: 0.9,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }}
      textStyle={{
        color: "#FF6000"
      }}
      renderButtonText={(rowData) => renderButtonText(rowData)} defaultIndex={0}
      defaultValue='Selecione uma Rota'
      dropdownStyle={{
        width: "95%",
        padding: 10,
        marginLeft: -10,
        marginTop: 10
      }}
      saveScrollPosition={false}
      options={options.map(option => option[0])}
      onSelect={(index, value) => {
        onValueChange(options[index][1]);
      }}
    />
  );
};

export default Dropdown;
