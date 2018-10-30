import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button } from 'react-native';
import axios from 'axios';

export default class NewListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historicalItems: [],
      currentListQuantity: '',
      currentListItem: '',
      newItem: this.props.navigation.state.params.newItemBoolean
    };

    console.log(props.navigation.state.params.listName)
  }

  static navigationOptions = {
    title: 'Edit List',
  };

  componentDidMount(){
    if(!this.state.newItem){
      console.log(this.props.navigation.state.params)
      this.setState({currentListItem: this.props.navigation.state.params.currentListItemToEdit, currentListQuantity: this.props.navigation.state.params.currentListItemQuantityToEdit})
    }
    console.log(this.props.navigation.state.params.id)
    axios.get(`http://localhost:8080///allItemsFromHistory`).then((res) => {
      this.setState({historicalItems: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  submitItem(){
    if(this.state.newItem){
      newItem = 
        {
          item: this.state.currentListItem, 
          quantity: this.state.currentListQuantity,
          active: true,
          starred: true,
          groceryListId: this.props.navigation.state.params.id
        }
      axios.post(`http://localhost:8080///addItem`, newItem).then((res) => {
        console.log(res.data)
        axios.post(`http://localhost:8080///addItemHistory`, {item: this.state.currentListItem})
      }).then((res) => {
        console.log(res)
        this.backToHome()
      }).catch((err) => {
        console.log(err)
      })
    }else{
      editedItem = 
        {
          item: this.state.currentListItem, 
          id: this.props.navigation.state.params.currentListItemIdToEdit,
          quantity: this.state.currentListQuantity,
          active: true,
          starred: true,
          groceryListId: this.props.navigation.state.params.id
        }
      axios.put(`http://localhost:8080///editOne/${editedItem.id}`, editedItem).then((res) => {
        console.log(res.data)
      //   axios.post(`http://localhost:8080///addItemHistory`, {item: this.state.currentListItem})
      // }).then((res) => {
      //   console.log(res)
        this.backToHome()
      }).catch((err) => {
        console.log(err)
      })
    }
    console.log(this.state)
  }

  matchHistoricalItemsToString(text){
    console.log(text)
    if(text == ''){
      this.componentDidMount()
    }else{
      let searchString = text.toLowerCase()
      console.log(searchString)

      this.setState({currentListItem: searchString})
      axios.get(`http://localhost:8080///allMatchingItems/${searchString}`).then((res) => {
        console.log(res)
        this.setState({historicalItems: res.data})
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  backToHome(){
    const { navigate } = this.props.navigation;
    
    navigate('EditList', 
        {
          listName: this.props.navigation.state.params.listName,
          id: this.props.navigation.state.params.id
        }
      )
  }

  
   render() {
    
    let currentListItem = this.state.newItem ? "List Item" : this.state.currentListItem
    console.log(currentListItem)
    let currentListQuantity = this.state.newItem ? "List Item Quantity" : `${this.state.currentListQuantity}`
    console.log(currentListQuantity)
    return (
      <ScrollView>
        <View style={{padding: 10}}>
          
          <TextInput
            style={{height: 40}}
            placeholder={currentListItem}
            onChangeText={(text) => this.matchHistoricalItemsToString(text)}
            
          />
          <TextInput
            style={{height: 40}}
            placeholder={currentListQuantity}
            onChangeText={(text) => this.setState({currentListQuantity: text})}
            
          />
          <Button
            onPress={this.submitItem.bind(this)}
            title="Add"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <FlatList 
            data={this.state.historicalItems}
            renderItem={({item}) => <Text key={item.id}>{item.item}</Text>}
          />
        </View>
      </ScrollView>
    );
  }
}

