import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Notification from '../../../assets/images/notification.png';
import userProfile from '../../../assets/images/profileImg.png';

import {
  FilterIcon,
  HeaderLogo,
  NotificationIcon,
  ScanIcon,
  SearchIcon,
} from '../../../assets/icons';
import {GetShipment} from '../../../services/User.service';
import {
  colors,
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';
import Card from '../../component/Card';
import CustomCheckbox from '../../component/CustomButtom';
import CustomButton from '../../component/CustomButton';
import CustomText from '../../component/CustomText';
import WithAauthenticatedWrapper from "../../component/HOC's/withAuthenticatedWrapper";
import CustomTextInput from '../../component/Input/CustomTextInput';
import {useUser} from '../../context/UserContext';

const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>No shipments found!</Text>
    <CustomButton
      text="Refresh"
      bgColor={colors.semi_very_light_blue}
      onPress={() => {}}
    />
  </View>
);

const Shipments = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [shipmentData, setShipmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>(
    {},
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [filteredShipments, setFilteredShipments] = useState<any[]>([]);
  const {userData} = useUser();

  const shipmentStatuses = Array.from(
    new Set(shipmentData?.message.map((item: any) => item.status)),
  );

  const handleStatusFilter = (status: string | null) => {
    setFilteredStatus(status);
    if (status) {
      const filtered = shipmentData.message.filter(
        (item: any) => item.status === status,
      );
      setFilteredShipments(filtered);
    } else {
      setFilteredShipments(shipmentData.message); // Reset filter
    }
    setModalVisible(false); // Close the modal after filtering
  };

  console.log('====================================');
  console.log('USER', userData);
  console.log('====================================');

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const data = await GetShipment();
        setShipmentData(data);
      } catch (error) {
        console.error('Error fetching shipment data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, []);

  useEffect(() => {
    if (shipmentData?.message) {
      handleStatusFilter(null);
    }
  }, [shipmentData?.message]);

  useEffect(() => {
    if (shipmentData?.message.length > 0) {
      // Update all items to be checked/unchecked based on the 'Mark All' checkbox
      const newCheckedItems = shipmentData?.message?.reduce((acc, item) => {
        acc[item.modified] = isCheckedAll; // Use 'modified' as unique identifier
        return acc;
      }, {} as {[key: string]: boolean});
      setCheckedItems(newCheckedItems);
    }
  }, [isCheckedAll, shipmentData?.message]);

  const handleItemCheck = (modified: string, checked: boolean) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [modified]: checked,
    }));
  };

  const handleMarkAll = () => {
    setIsCheckedAll(prev => !prev);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Images container */}
      <View style={styles.imageRow}>
        <Image source={userProfile} style={styles.image} />
        <HeaderLogo />
        <TouchableOpacity activeOpacity={0.7} style={styles.iconContainer}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Header Text */}
      <View style={styles.headerbox}>
        <View>
          <CustomText
            text="hello,"
            size={14}
            weight={400}
            width={300}
            color={colors.text_grey}
          />
          <CustomText
            text={userData?.full_name || 'Ibrahim Shaker'}
            size={28}
            weight={700}
            width={300}
            color={colors.dark_grey}
            style={styles.space}
          />
        </View>
      </View>

      {/* Search Input */}
      <View>
        <CustomTextInput
          placeholder="Search"
          height={55}
          icon={<SearchIcon />}
        />
      </View>

      {/* Filters and Add Scan Buttons */}
      <View style={styles.ListHeaderRow}>
        <View style={styles.button}>
          <CustomButton
            bgColor={colors.light_grey}
            color={colors.dark_grey}
            text="Filters"
            style={styles.button}
            icon={<FilterIcon />}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            bgColor={colors.dark_blue}
            text="Add Scan"
            style={styles.button}
            icon={<ScanIcon />}
            onPress={() => {
              navigation.navigate('Scan');
            }}
          />
        </View>
      </View>

      {/* Shipment Title and Checkbox */}
      <View style={styles.buttonRow}>
        <CustomText
          text="Shipments"
          size={22}
          weight={700}
          width={300}
          color={colors.dark_grey}
        />

        <CustomCheckbox
          checked={isCheckedAll}
          onChange={handleMarkAll}
          size={20}
          color={colors.dark_blue}
          label="Mark All"
        />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          // data={shipmentData?.message}
          data={filteredShipments}
          renderItem={({item}) => (
            <Card
              data={item}
              isChecked={!!checkedItems[item.modified]} // Pass the checked state
              setIsChecked={(checked: boolean) =>
                handleItemCheck(item.modified, checked)
              } // Toggle individual check
            />
          )}
          keyExtractor={item => item.modified.toString()}
          ListEmptyComponent={<EmptyState />}
          contentContainerStyle={shipmentData.length === 0 && styles.emptyList}
        />
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleStatusFilter(null)}>
                <CustomText
                  text="Clear"
                  size={16}
                  weight={500}
                  width={300}
                  color={colors.dark_blue}
                />
              </TouchableOpacity>
              <CustomText
                text="Filters"
                size={18}
                weight={700}
                width={300}
                color={colors.dark_grey}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}>
                <CustomText
                  text="Done"
                  size={16}
                  weight={500}
                  width={300}
                  color={colors.dark_blue}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <FlatList
                data={shipmentStatuses}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleStatusFilter(item)}
                    style={styles.modalItem}>
                    <CustomText
                      text={item || ''}
                      size={16}
                      weight={500}
                      width={300}
                      color={colors.text_grey}
                    />
                  </TouchableOpacity>
                )}
                numColumns={3}
                keyExtractor={item => item}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ShipmentWithAuthenticatedWrapper = WithAauthenticatedWrapper(
  Shipments,
  false,
);
export default ShipmentWithAuthenticatedWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertical
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  headerbox: {
    marginVertical: pixelSizeVertical(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    // marginVertical: pixelSizeVertical(10),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(10),
  },
  ListHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginHorizontal: pixelSizeHorizontal(5), // Adjust space between buttons
  },
  boxx2: {
    paddingVertical: pixelSizeVertical(20),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardContainer: {
    marginVertical: pixelSizeVertical(10),
    padding: pixelSizeHorizontal(10),
    borderRadius: 12,
    backgroundColor: colors.white, // Background color for the card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // For Android shadow
  },
  cardHeader: {
    flexDirection: 'column', // Stack children vertically
    justifyContent: 'space-between', // Space between children
    alignItems: 'flex-start', // Align items to start
  },
  cardInfo: {
    flexDirection: 'column', // Ensure card info stacks vertically
  },
  iconContainer: {
    backgroundColor: colors.light_grey,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: pixelSizeVertical(20),
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.dark_grey,
    marginBottom: pixelSizeVertical(10),
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: colors.white,
    // padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%', // Limit modal height
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 20,
    borderBottomColor: colors.very_light_grey,
  },
  modalBody: {
    padding: 20,
  },
  modalItem: {
    backgroundColor: colors.light_grey,
    paddingVertical: 9,
    paddingHorizontal: 14,
    margin: 5,
    borderRadius: 10,
  },
});
