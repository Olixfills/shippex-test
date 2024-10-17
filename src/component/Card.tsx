import React, {ReactNode, SetStateAction, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Notification from '../../assets/images/notification.png';
import {
  colors,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../common/GlobalStyles';
import CustomCheckbox from './CustomButtom';
import CustomText from './CustomText';
import {getLighterColor} from './GetLighterColor';
import CustomButton from './CustomButton';
import CloseIcon from '../../assets/images/CollapseClose.png';
import OpenIcon from '../../assets/images/CollaspseOpen.png';
import {BoxIcon} from '../../assets/icons';

type CardProps = {
  data: {
    _assign: any;
    _comments: any;
    _liked_by: any;
    _user_tags: any;
    color: string;
    creation: string;
    docstatus: number;
    idx: number;
    modified: string;
    modified_by: string;
    name: string;
    owner: string;
    status: string;
  };
  isChecked: boolean;
  setIsChecked: SetStateAction<any>;
};

const makePhoneCall = (phoneNumber: string) => {
  const phoneUrl = `tel:${phoneNumber}`;
  Linking.canOpenURL(phoneUrl)
    .then(supported => {
      if (supported) {
        Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Your device does not support making calls.');
      }
    })
    .catch(err => console.error('An error occurred', err));
};

// Function to handle WhatsApp message
const openWhatsApp = (phoneNumber: string) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  Linking.canOpenURL(whatsappUrl)
    .then(supported => {
      if (supported) {
        Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          'Error',
          'WhatsApp is not installed on your device, or the link is not supported.',
        );
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const Card = ({data, isChecked, setIsChecked}: CardProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));
  const phoneNumber = '+2347089244479';
  const toggleCollapse = () => {
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setCollapsed(!collapsed);
  };

  // Interpolating height and opacity
  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 130], // Change to your desired expanded height
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <CustomCheckbox
          checked={isChecked}
          onChange={setIsChecked}
          size={20}
          color={colors.dark_blue}
        />
        <BoxIcon />
        <View style={styles.cardInfo}>
          <CustomText size={16} weight={400} text={data.name} />
          <CustomText
            size={18}
            color={colors.dark_grey}
            weight={700}
            text="45566768"
          />
          <CustomText size={16} weight={400} text="cairo - alexandra" />
        </View>
        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: getLighterColor(data?.color || '', 0.5),
            },
          ]}>
          <CustomText
            size={11}
            weight={400}
            text={data.status}
            style={{
              color: data.color,
              textTransform: 'uppercase',
              minWidth: pixelSizeHorizontal(66),
              textAlign: 'center',
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={toggleCollapse}>
          <Image
            source={collapsed ? CloseIcon : OpenIcon}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={{
          height: heightInterpolate,
          opacity: opacityInterpolate,
          overflow: 'hidden',
        }}>
        <View>
          <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
              <CustomText
                size={16}
                weight={400}
                text="Origin"
                color={colors.dark_blue}
              />
              <CustomText
                size={16}
                color={colors.dark_grey}
                weight={700}
                text={data.name}
              />
              <CustomText size={16} weight={400} text="cairo - alexandra" />
            </View>
            <CustomText text=">" />
            <View style={styles.cardInfo}>
              <CustomText
                size={16}
                weight={400}
                text="Destination"
                color={colors.dark_blue}
              />
              <CustomText
                size={16}
                color={colors.dark_grey}
                weight={700}
                text={data.owner}
              />
              <CustomText size={14} weight={400} text="cairo - alexandra" />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <CustomButton
                bgColor={colors.semi_very_light_blue}
                text="Call"
                onPress={() => makePhoneCall(phoneNumber)}
              />
            </View>
            <View style={styles.button}>
              <CustomButton
                bgColor={colors.semi_very_light_green}
                text="WhatsApp"
                onPress={() => openWhatsApp(phoneNumber)}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

// Add styles for the status text and container
const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: pixelSizeVertical(10),
    padding: pixelSizeHorizontal(10),
    borderRadius: 12,
    backgroundColor: colors.light_grey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: 'column',
    // width: '50%',
  },
  statusContainer: {
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(5),
    borderRadius: 8, // Rounded corners for the status background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the end
    marginTop: pixelSizeVertical(10), // Add some space above the buttons
    marginLeft: pixelSizeHorizontal(50), // Add some space above the buttons
  },
  button: {
    flex: 1,
    marginHorizontal: pixelSizeHorizontal(5), // Adjust space between buttons
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Card;
