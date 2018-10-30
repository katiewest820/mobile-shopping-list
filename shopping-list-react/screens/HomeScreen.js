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
      groceryLists: []
    }
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    this.getAllLists()
  }

  getAllLists(){
    axios.get('http://localhost:8080///allGroceryLists').then((res) => {
      console.log(res.data)
      this.setState({groceryLists: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  handleListPress(id, name){
    console.log(id)
    console.log(name)
    const { navigate } = this.props.navigation;
      navigate('EditList', 
        {
          listName: name,
          id: id
        }
      )
  }

  deleteList(id){
    console.log(id)
    axios.delete(`http://localhost:8080///deleteGroceryListById/${id}`).then((res) => {
      console.log(res)
      this.setState({groceryLists: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
      let userLists;
      if(this.state.groceryLists.length > 0){
        userLists = this.state.groceryLists.map((item, index) => {
          return ( 
            <View key={item.id}>
              <TouchableOpacity onPress={() => {this.handleListPress(item.id, item.name)}}>
                <Text>{item.name} {item.itemCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.deleteList(item.id)}}>
                <Ionicons name="md-trash" size={22} color="red"/>
              </TouchableOpacity>
            </View>
          )
        })
      }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>Your Lists</Text>
          {userLists}
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
