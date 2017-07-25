import React from 'react';
import { Text, View, TextInput, FlatList, Button, AsyncStorage } from 'react-native';

class TodoContainer extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       items: [],
       text: ""
     };

  }

  componentDidUpdate(){
    this.saveState();
  }

  componentDidMount(){
    this.loadState();
  }

  saveState = () => {
    const serializedState = JSON.stringify(this.state.items);
    AsyncStorage.setItem('famhub-todo-items', serializedState);
  }

  loadState = () => {
    AsyncStorage.getItem('famhub-todo-items').then((items) => {
      if (items !== null) {
        const storedItems = JSON.parse(items);
        this.setState({
          items: storedItems
        });
      }
      return;
    })
 }

  handleAddItem = event => {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }

  markItemCompleted = itemId => {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    this.setState({
      items: [].concat(updatedItems)
    });
  }

  handleDeleteItem = itemId => {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({
      items: [].concat(updatedItems)
    });
  }

  render() {
    return (
      <View >
        <Text>MY TO DO LIST</Text>
        <TodoList
          items={this.state.items}/>
        <TextInput
          style={{height: 40,
                  backgroundColor: '#ffffff'}}
          placeholder="Add todo..."
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this.handleAddItem}
          title="Add"
          accessibilityLabel="Add item"
        />
      </View>
    )
  }
}

class TodoList extends React.Component {

  render() {
    return (
      <View>
      <FlatList
        data={this.props.items}
        renderItem={({item}) => <Text>{item.text}</Text>}
      />
      </View>
    )
  }

}

class TodoListItem extends React.Component {
  constructor(props) {
     super(props);
     this.markCompleted = this.markCompleted.bind(this);
     this.deleteItem = this.deleteItem.bind(this);
   }

   markCompleted(event) {
     this.props.onItemCompleted(this.props.id);
   }

   deleteItem(event) {
     this.props.onDeleteItem(this.props.id);
   }


  render() {
    return (
      <Text> {this.props.text} !</Text>
    );
  }

}

export default TodoContainer;
