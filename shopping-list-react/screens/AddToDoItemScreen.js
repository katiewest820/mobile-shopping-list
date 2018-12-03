import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default class NewToDoListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListDate: '',
      currentListItem: '',
      currentListNotes: '',
      newItem: this.props.navigation.state.params.newItemBoolean
    };

    console.log(props.navigation.state.params.listName)
  }

  static navigationOptions = {
    title: 'Edit To-do List',
  };

  componentDidMount(){
    if(!this.state.newItem){
      console.log(this.props.navigation.state.params)
      this.setState({
        currentListItem: this.props.navigation.state.params.currentListItemToEdit, 
        currentListDate: this.props.navigation.state.params.currentListItemDate,
        currentListNotes: this.props.navigation.state.params.currentListItemNotes
      })
    }
    console.log(this.props.navigation.state.params.id)
  }

  submitItem(){
    if(this.state.newItem){
      newItem = 
        {
          item: this.state.currentListItem, 
          dueDate: this.state.currentListDate,
          notes: this.state.currentListNotes,
          active: true,
          toDoListId: this.props.navigation.state.params.id
        }
      axios.post(`http://localhost:8080///addToDoItem`, newItem).then((res) => {
        console.log(res.data)
        this.backToHome()
      }).catch((err) => {
        console.log(err)
      })
    }else{
      editedItem = 
        {
          id: this.props.navigation.state.params.currentListItemIdToEdit,
          item: this.state.currentListItem, 
          dueDate: this.state.currentListDate,
          notes: this.state.currentListNotes,
          active: true,
          toDoListId: this.props.navigation.state.params.id
        }
      axios.put(`http://localhost:8080///editOneToDoItem/${editedItem.id}`, editedItem).then((res) => {
        console.log(res.data)
        this.backToHome()
      }).catch((err) => {
        console.log(err)
      })
    }
    console.log(this.state)
  }

  // matchHistoricalItemsToString(text){
  //   console.log(text)
  //   if(text == ''){
  //     this.componentDidMount()
  //   }else{
  //     let searchString = text.toLowerCase()
  //     console.log(searchString)

  //     this.setState({currentListItem: searchString})
  //     axios.get(`http://localhost:8080///allMatchingItems/${searchString}`).then((res) => {
  //       console.log(res)
  //       this.setState({historicalItems: res.data})
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }

  backToHome(){
    const { navigate } = this.props.navigation;
    navigate('EditList', 
        {
          listName: this.props.navigation.state.params.listName,
          id: this.props.navigation.state.params.id,
          listType: 'To-do List'
        }
      )
  }

  
   render() {
    
    let currentListItem = this.state.newItem ? "To-do Item" : this.state.currentListItem
    console.log(currentListItem)
    let currentListNotes = this.state.newItem ? "To-do Item Notes" : `${this.state.currentListNotes}`
    console.log(currentListNotes)
    let currentListDate = this.state.newItem ? "Select Date" : `${this.state.currentListDate}`
    console.log(currentListDate)
    return (
      <ScrollView style={{flex: 1, padding: 40}}>
        <TouchableOpacity onPress={this.backToHome.bind(this)}>
          <Ionicons name="md-arrow-back" size={22} />        
        </TouchableOpacity>
        <View style={{padding: 10}}>
          
          <TextInput
            style={{height: 40}}
            placeholder={currentListItem}
            onChangeText={(text) => this.setState({currentListItem: text})}            
          />
          <DatePicker
            style={{width: 200}}
            date={this.state.currentListDate}
            mode="date"
            placeholder={currentListDate}
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2050-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({currentListDate: date})}}
          />
          <TextInput
            style={{height: 40}}
            placeholder={currentListNotes}
            onChangeText={(text) => this.setState({currentListNotes: text})}
            
          />
          <Button
            onPress={this.submitItem.bind(this)}
            title="Save"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          
        </View>
      </ScrollView>
    );
  }
}

