import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MessageList from "./MessageList";
import EmptyComponent from "./common/EmptyComponent";
import AddButton from "./common/AddButton";
import ClearButton from "./common/ClearButton";
import { red, gray, white } from "../utils/color";
import { HamStorageKey } from "../utils/keyStorage";

class Messages extends Component {
  state = {
    loading: false,
    messages: []
  };
  static navigationOptions = () => {
    let tabBarLabel = "Messages";
    let tabBarIcon = ({ tintColor }) => (
      <MaterialIcons name="message" size={25} color={tintColor} />
    );
    return {
      tabBarLabel,
      tabBarIcon
    };
  };
  handleHamMount = async () => {
    this.setState({ loading: true });
    try {
      const hamData = await AsyncStorage.getItem(HamStorageKey);
      const hamMessage = JSON.parse(hamData);
      if (hamMessage === null) {
        this.setState({ messages: [], loading: false });
      }
      this.setState({
        messages: hamMessage,
        loading: false
      });
    } catch (err) {
      alert("Error Listing Ham Messages.");
    }
  };
  componentDidMount() {
    this.handleHamMount();
  }
  renderMessageItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.1}
        onPress={() =>
          this.props.navigation.navigate("MessageDetails", {
            message: item,
            titleName: "Message"
          })
        }
      >
        <MessageList message={item} />
      </TouchableOpacity>
    );
  };
  messageSeparator = () => {
    return <View style={styles.separator} />;
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.handleHamMount().then(() => this.setState({ refreshing: false }));
  };
  handleClear = async () => {
    await AsyncStorage.clear();
    alert("Cleared All Messages.");
  };

  render() {
    const { messages, loading, refreshing } = this.state;
    if (loading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator color={red} size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={this.renderMessageItem}
          keyExtractor={item => item.message}
          ListEmptyComponent={<EmptyComponent />}
          ItemSeparatorComponent={this.messageSeparator}
          ListHeaderComponent={<View style={styles.headerSeparator} />}
          ListFooterComponent={
            <View style={{ height: 5, backgroundColor: white }} />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("TestMessage")}
          style={styles.addbuttonContainer}
        >
          <AddButton />
        </TouchableOpacity>
        {messages && (
          <TouchableOpacity
            onPress={this.handleClear}
            style={styles.clearbuttonContainer}
          >
            <ClearButton />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Messages;

const styles = StyleSheet.create({
  addbuttonContainer: {
    position: "absolute",
    right: 20,
    bottom: 10
  },
  clearbuttonContainer: {
    position: "absolute",
    right: 20,
    bottom: 85
  },
  separator: {
    height: 2,
    backgroundColor: gray,
    width: "94%",
    marginLeft: 9
  },
  headerSeparator: {
    height: 6,
    backgroundColor: white,
    width: "94%",
    marginLeft: 9
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
