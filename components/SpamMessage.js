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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SpamStorageKey } from "../utils/keyStorage";
import EmptyComponent from "./common/EmptyComponent";
import AddButton from "./common/AddButton";
import ClearButton from "./common/ClearButton";
import MessageList from "./MessageList";
import { gray, red, white } from "../utils/color";

class SpamMessage extends Component {
  static navigationOptions = () => {
    let tabBarLabel = "Spam Messages";
    let tabBarIcon = ({ tintColor }) => (
      <MaterialCommunityIcons
        name="message-alert"
        size={25}
        color={tintColor}
      />
    );
    return { tabBarLabel, tabBarIcon };
  };

  state = {
    loading: false,
    spamMessages: []
  };
  handleComponentMount = async () => {
    this.setState({ loading: true });
    try {
      const spamData = await AsyncStorage.getItem(SpamStorageKey);
      const spamMessage = JSON.parse(spamData);
      if (spamMessage === null) {
        this.setState({ spamMessages: [], loading: false });
      }
      this.setState({ spamMessages: spamMessage, loading: false });
    } catch (error) {
      alert("Error Listing Spam Messages.");
    }
  };

  componentDidMount() {
    this.handleComponentMount();
  }

  renderSpamMessages = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("MessageDetails", {
            message: item,
            titleName: "Spam"
          })
        }
      >
        <MessageList message={item} />
      </TouchableOpacity>
    );
  };
  spamMessageSeparator = () => {
    return <View style={styles.separator} />;
  };
  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.handleComponentMount().then(() =>
      this.setState({ refreshing: false })
    );
  };
  handleClear = async () => {
    await AsyncStorage.clear();
    alert("Cleared All Messages.");
  };

  render() {
    const { spamMessages, loading, refreshing } = this.state;
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
          data={spamMessages}
          renderItem={this.renderSpamMessages}
          keyExtractor={item => item.message}
          ItemSeparatorComponent={this.spamMessageSeparator}
          ListHeaderComponent={<View style={styles.headerSeparator} />}
          ListEmptyComponent={<EmptyComponent />}
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
        {spamMessages && (
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

export default SpamMessage;
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
