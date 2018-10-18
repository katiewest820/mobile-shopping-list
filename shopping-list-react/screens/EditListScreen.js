import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button } from 'react-native';
import axios from 'axios';

export default class NewListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListItem: '',
      currentListQuantity: '',
      listItems: [],
      listName: ''
    };

    console.log(props.navigation.state.params.listName)
  }

  static navigationOptions = {
    title: 'Edit List',
  };

  componentDidMount(){
    console.log(this.props.navigation.state.params.id)
    axios.get(`http://localhost:8080///oneGroceryList/${this.props.navigation.state.params.id}`).then((res) => {
      this.setState({listName: res.data.name})
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:8080///allItemsByList/${this.props.navigation.state.params.id}`).then((res) => {
      console.log(res)
      this.setState({listItems: res.data})
    }).catch((err) => {
      console.log(err)
    })

  }

  submitItem(){
    console.log('in testSubmit')
    newItem = 
      {
        item: this.state.currentListItem, 
        quantity: this.state.currentListQuantity,
        active: true,
        starred: true,
        groceryListId: this.props.navigation.state.params.id
      }
    this.setState({listItems: this.state.listItems.concat([newItem])})

    axios.post(`http://localhost:8080///addItem`, newItem).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    console.log(this.state)
  }

  backToHome(){
    const { navigate } = this.props.navigation;
    navigate('Home')
  }

  
   render() {
    console.log(this.state)
    
    return (
      <ScrollView style={styles.container}>
        <View style={{padding: 10}}>
          
          <TextInput
            style={{height: 40}}
            placeholder="List Item"
            onChangeText={(text) => this.setState({currentListItem: text})}
            
          />
          <TextInput
            style={{height: 40}}
            placeholder="List Item Quantity"
            onChangeText={(text) => this.setState({currentListQuantity: text})}
            
          />
          <Button
            onPress={this.submitItem.bind(this)}
            title="Add"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.props.navigation.state.params.listName}
          </Text>
          <FlatList
            data={this.state.listItems}
            renderItem={({item}) => <Text key={item.id}>{item.quantity} {item.item}</Text>}
          />
        </View>

        <Button
            onPress={this.backToHome.bind(this)}
            title="Done"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
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
