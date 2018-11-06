import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button, TouchableOpacity, } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default class NewListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      listName: this.props.navigation.state.params.listName,
      editListName: false,
      listType: this.props.navigation.state.params.listType
    };

    console.log(props.navigation.state.params)
  }

  static navigationOptions = {
    title: 'Edit List',
  };

  componentDidMount(){
    console.log(this.props.navigation.state.params.id)
    let listUrl;
    let itemUrl;
    if(this.state.listType == 'To-do List'){
      listUrl = 'oneToDoList';
      itemUrl = 'allToDoItemsByList';
    }else{
      listUrl = 'oneGroceryList';
      itemUrl = 'allItemsByList';
    }
    axios.get(`http://localhost:8080///${listUrl}/${this.props.navigation.state.params.id}`).then((res) => {
      this.setState({listName: res.data.name})
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:8080///${itemUrl}/${this.props.navigation.state.params.id}`).then((res) => {
      console.log(res)
      for(let i = 0; i < res.data.length; i++){
        if(res.data[i].active){
          this.setState({listItems: this.state.listItems.concat([res.data[i]])})
        }
      }
    }).catch((err) => {
      console.log(err)
    })

  }

  addItem(){
    console.log('in testSubmit')
    const { navigate } = this.props.navigation;

    navigate('AddList', 
        {
          listName: this.props.navigation.state.params.listName,
          id: this.props.navigation.state.params.id,
          newItemBoolean: true
        }
      )
  }

  editItem(item){
    console.log('edit me pleaseeeeeee')
    console.log(item)
    const { navigate } = this.props.navigation;
    if(this.state.listType == 'To-do List'){
      navigate('AddToDoList', 
        {
          listName: this.props.navigation.state.params.listName,
          id: this.props.navigation.state.params.id,
          newItemBoolean: false,
          currentListItemToEdit: item.item,
          currentListItemDate: item.dueDate,
          currentListItemNotes: item.notes,
          currentListItemIdToEdit: item.id
        }
      )
    }else{
    navigate('AddList', 
        {
          listName: this.props.navigation.state.params.listName,
          id: this.props.navigation.state.params.id,
          newItemBoolean: false,
          currentListItemToEdit: item.item,
          currentListItemQuantityToEdit: item.quantity,
          currentListItemIdToEdit: item.id
        }
      )
    }
  }

  backToHome(){
    const { navigate } = this.props.navigation;
    navigate('Home')
  }

   saveNewListName(){
    console.log(this.props.navigation.state.params.listName)
    console.log(this.state.listName)
    this.setState({editListName: false})
    let editUrl;
    if(this.state.listType == 'To-do List'){
      editUrl = 'editOneToDoItem';
    }else{
      editUrl = 'editGroceryList';
    }
    axios.put(`http://localhost:8080///${editUrl}/${this.props.navigation.state.params.id}`, {
      active: true,
      id: this.props.navigation.state.params.id,
      name: this.state.listName
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  deleteItem(item){
    let deleteUrl;
    if(this.state.listType == 'To-do List'){
      deleteUrl = 'deleteOneToDoItem';
    }else{
      deleteUrl = 'deleteOne'
    }
    console.log(item)
    axios.delete(`http://localhost:8080///${deleteUrl}/${item.id}`).then((res) => {
      console.log(res.data)
      this.setState({listItems: res.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  
   render() {
    console.log(this.state)
    let listNameDisplay;
    if(this.state.editListName){
      listNameDisplay = (
        <View>
          <TextInput
              style={{padding: 10, fontSize: 42}}
              placeholder={this.state.listName}
              onChangeText={(text) => this.setState({listName: text})}
          />
          <TouchableOpacity onPress={this.saveNewListName.bind(this)}>
            <Ionicons name="md-checkmark" size={22} />
          </TouchableOpacity>
        </View>
      )
    }else{
      listNameDisplay = (
        <View>
          <Text style={{padding: 10, fontSize: 42}}>
              {this.state.listName}
          </Text>
          <TouchableOpacity onPress={() => this.setState({editListName: true})}>
            <Ionicons name="md-create" size={22} />
          </TouchableOpacity>
        </View>
      )
    }
    
    return (
      <ScrollView style={styles.container}>
        <View style={{padding: 10}}>
          <Button
            onPress={this.addItem.bind(this)}
            title="Add"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          {listNameDisplay}

          
          <FlatList
            data={this.state.listItems}
            renderItem={({item}) => <TouchableOpacity key={item.id}><Text onPress={() => this.editItem(item)} >{item.quantity} {item.item}</Text><Ionicons name="md-checkmark" size={20} onPress={() => this.deleteItem(item)}/></TouchableOpacity>}
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
