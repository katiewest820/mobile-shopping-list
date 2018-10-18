import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button } from 'react-native';
import axios from 'axios';

export default class NewListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: ''

    };
  }

  static navigationOptions = {
    title: 'Links',
  };

  submitList(){
    axios.post('http://localhost:8080///addGroceryList', {
      name: this.state.listName,
      active: true
    }).then((res) => {
      console.log(res.data)
      const { navigate } = this.props.navigation;
      navigate('EditList', 
        {
          listName: this.state.listName,
          id: res.data.id
        }
      )
    }).catch(function (error) {
    console.log(error);
  })
    
  }
  
   render() {
    console.log(this.state)
    
    return (
      <ScrollView style={styles.container}>
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="List Name"
            onChangeText={(text) => this.setState({listName: text})}
          />
          <Button
            onPress={this.submitList.bind(this)}
            title="Create"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"

          />


         
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
