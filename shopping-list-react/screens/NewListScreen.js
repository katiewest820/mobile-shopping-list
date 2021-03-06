import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button } from 'react-native';
import axios from 'axios';
import { SegmentedControls } from 'react-native-radio-buttons'

export default class NewListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      selectedOption: '',
      options: ['To-do List', 'Shopping List']

    };
  }

  static navigationOptions = {
    title: 'Links',
  };

  submitList(){
    let postUrl;
    console.log(this.state.selectedOption)
    if(this.state.selectedOption == 'To-do List'){
      postUrl = 'addToDoList'
    }else{
      this.setState({selectedOption: 'Shopping List'})
      postUrl = 'addGroceryList'
    }
    console.log(postUrl)
    axios.post(`http://localhost:8080///${postUrl}`, {
      name: this.state.listName,
      active: true,

    }).then((res) => {
      console.log(res.data)
      const { navigate } = this.props.navigation;
      navigate('EditList', 
        {
          listName: this.state.listName,
          id: res.data.id,
          listType: this.state.selectedOption
        }
      )
    }).catch(function (error) {
    console.log(error);
  })
    
  }

  setSelectedOption(selectedOption){

    this.setState({
      selectedOption: selectedOption
    });
    console.log(this.state.selectedOption)
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
          <SegmentedControls
            options={ this.state.options }
            onSelection={ this.setSelectedOption.bind(this) }
            selectedOption={ this.state.selectedOption }
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
