import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      groceryLists: [],
      toDoLists: []
    }
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    this.getAllGroceryLists();
    this.getAllToDoLists();
  }

  getAllGroceryLists(){
    axios.get('http://localhost:8080///allGroceryLists').then((res) => {
      console.log(res.data)
      this.setState({groceryLists: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  getAllToDoLists(){
    axios.get('http://localhost:8080///allToDoLists').then((res) => {
      console.log(res.data)
      this.setState({toDoLists: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  handleListPress(id, name, listType){
    console.log(id)
    console.log(name)
    const { navigate } = this.props.navigation;
      navigate('EditList', 
        {
          listName: name,
          id: id,
          listType: listType
        }
      )
  }

  deleteList(id, urlPath, stateVal){
    console.log(id)
    axios.delete(`http://localhost:8080///${urlPath}/${id}`).then((res) => {
      console.log(res)
      this.setState({[stateVal]: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
      let userGroceryLists;
      if(this.state.groceryLists.length > 0){
        userGroceryLists = this.state.groceryLists.map((item, index) => {
          return ( 
            <View key={item.id}>
              <TouchableOpacity onPress={() => {this.handleListPress(item.id, item.name, 'Shopping List')}}>
                <Text>{item.name} {item.itemCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.deleteList(item.id, 'deleteGroceryListById', 'groceryLists')}}>
                <Ionicons name="md-trash" size={22} color="red"/>
              </TouchableOpacity>
            </View>
          )
        })
      }

      let userToDoLists;
      if(this.state.toDoLists.length > 0){
        userToDoLists = this.state.toDoLists.map((item, index) => {
          return (
            <View key={item.id}>
              <TouchableOpacity onPress={() => {this.handleListPress(item.id, item.name, 'To-do List')}}>
                <Text>{item.name} {item.itemCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.deleteList(item.id, 'deleteToDoListById', 'toDoLists')}}>
                <Ionicons name="md-trash" size={22} color="red"/>
              </TouchableOpacity>
            </View>
          )
        })
      }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.listTitle}>Your Grocery Lists</Text>
          {userGroceryLists}
          <View style={styles.listTypeDivider} ></View>
          <Text style={styles.listTitle} >Your To-Do Lists</Text>
          {userToDoLists}
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  listTypeDivider: {
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    margin: 10
  },
  listTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
