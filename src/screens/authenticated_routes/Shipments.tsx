import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Notification from '../../../assets/images/notification.png';

import UserImage from '../../../assets/images/userImage.png';
import {
  colors,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';
import CustomCheckbox from '../../component/CustomButtom';
import CustomButton from '../../component/CustomButton';
import CustomText from '../../component/CustomText';
import WithAauthenticatedWrapper from "../../component/HOC's/withAuthenticatedWrapper";
import CustomTextInput from '../../component/Input/CustomTextInput';
import Card from '../../component/Card';
import {FilterIcon, ScanIcon} from '../../../assets/icons';
import {GetShipment} from '../../../services/User.service';

const Shipments = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [shipmentData, setShipmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  console.log(shipmentData);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.container1}>
          {/* Images container */}
          <View style={styles.imageRow}>
            <Image source={UserImage} style={styles.image} />
            <Image source={Logo} style={styles.logo} />
            <Image source={Notification} style={styles.image} />
          </View>

          {/* Header Text */}
          <View style={styles.headerbox}>
            <View>
              <CustomText
                text="hello,"
                size={18}
                weight={400}
                width={300}
                color={colors.text_grey}
              />
              <CustomText
                text="Ibrahim Shaker"
                size={32}
                weight={700}
                width={300}
                color={colors.dark_grey}
                style={styles.space}
              />
            </View>
          </View>

          {/* Search Input */}
          <View>
            <CustomTextInput placeholder="Search" height={55} />
          </View>

          {/* Filters and Add Scan Buttons */}
          <View style={styles.buttonRow}>
            <View style={styles.button}>
              <CustomButton
                bgColor={colors.light_grey}
                color={colors.dark_grey}
                text="Filters"
                style={styles.button}
                icon={<FilterIcon />}
              />
            </View>
            <View style={styles.button}>
              <CustomButton
                bgColor={colors.dark_blue}
                text="Add Scan"
                style={styles.button}
                icon={<ScanIcon />}
              />
            </View>
          </View>

          {/* Shipment Title and Checkbox */}
          <View style={styles.buttonRow}>
            <CustomText
              text="Shipments"
              size={32}
              weight={700}
              width={300}
              color={colors.dark_grey}
            />
            <View style={styles.boxx2}>
              <View>
                <CustomCheckbox
                  checked={isChecked}
                  onChange={setIsChecked}
                  size={30}
                  color={colors.dark_blue}
                />
              </View>
              <View>
                <CustomText
                  text={'Mark all'}
                  size={24}
                  weight={500}
                  color={colors.dark_blue}
                />
              </View>
            </View>
          </View>

          <View>
            <Card statusColor={colors.dark_blue}>
              <Text>Content</Text>
            </Card>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const ShipmentWithAuthenticatedWrapper = WithAauthenticatedWrapper(
  Shipments,
  true,
);
export default ShipmentWithAuthenticatedWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container1: {
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(20),
    marginTop: pixelSizeVertical(10),
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertical
  },
  image: {
    width: 50, // Set a size for the images
    height: 50, // Adjust based on your image dimensions
    resizeMode: 'contain', // Ensure images maintain aspect ratio
  },
  logo: {
    width: 100, // Set a larger size for the logo
    height: 100,
    resizeMode: 'contain',
  },
  headerbox: {
    marginTop: pixelSizeVertical(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    marginVertical: pixelSizeVertical(10),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(10),
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
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
