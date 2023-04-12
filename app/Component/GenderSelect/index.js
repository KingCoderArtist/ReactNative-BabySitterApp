/* import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { ListItem, Icon, Left, Right } from "native-base";
import Modal from "react-native-modal";
import styles from '../style/app'

const GenderModel = props => {
  return (
    <Modal
      animationIn={"slideInUp"}
      animationInTiming={100}
      isVisible={props.isVisible}
      onBackButtonPress={() => props.onDismiss()}
      hasBackdrop={true}
      onBackdropPress={() => props.onDismiss()}
      onSwipe={() => {
        console.log("onSwipeComplete");
        props.onDismiss();
      }}
      //swipeDirection="down"
      style={{
        justifyContent: "flex-end",
        margin: 0
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          borderRadius: 4,
          height: 195,
          borderColor: "rgba(0, 0, 0, 0.1)"
        }}
      >
        <View
          style={{
            height: 195,
            backgroundColor: "#FFFFFF",
            paddingVertical: 10
          }}
        >
          <ListItem
            onPress={() => {
              let data ="male";
              props.onGenderSelection(data);
            }}
          >
            <Left>
              <Text style={styles.textStyle_Oswald_Light}>{"Male"}</Text>
            </Left>
            <Right>
              <Icon
                name={props.gender === "male" ? "checkcircle" : "checkcircleo"}
                type="AntDesign"
                style={{ color: "red" }}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={() => {
              let data ="female";
              props.onGenderSelection(data);
            }}
          >
            <Left>
              <Text style={styles.textStyle_Oswald_Light}>{"Female"}</Text>
            </Left>
            <Right>
              <Icon
                name={
                  props.gender === "female" ? "checkcircle" : "checkcircleo"
                }
                type="AntDesign"
                style={{ color: "red" }}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={() => {
              let data ="Prefer not to disclose";
              props.onGenderSelection(data);
            }}
          >
            <Left>
              <Text style={styles.textStyle_Oswald_Light}>{"Prefer not to disclose"}</Text>
            </Left>
            <Right>
              <Icon
                name={props.gender === "Prefer not to disclose" ? "checkcircle" : "checkcircleo"}
                type="AntDesign"
                style={{ color: "red" }}
              />
            </Right>
          </ListItem>

        </View>
      </View>
    </Modal>
  );
};

export default GenderModel;
 */