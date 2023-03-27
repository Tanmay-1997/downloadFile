// Library Imports
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';

type Props = {
  onPress: () => void;
  title: string;
  textStyle?: TextStyle;
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  isDisabled?: boolean;
};

export const Button = (props: Props) => {
  const {containerStyle = {}, isDisabled = false} = props;
  return (
    <Pressable
      style={[
        styles.mainContainer,
        containerStyle,
        {
          opacity: isDisabled ? 0.5 : 1,
        },
      ]}
      onPress={isDisabled ? null : props.onPress}>
      <Text style={[styles.titleText, props.textStyle]}>{props.title}</Text>
      {props.icon && <Image source={props.icon} style={styles.iconImg} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    letterSpacing: 1,
    color: 'black',
  },
  iconImg: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
});
