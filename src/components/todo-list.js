import React from 'react';
import { Text, View, TextInput, FlatList, Button, AsyncStorage } from 'react-native';
import CheckBox from 'react-native-checkbox';


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
          items={this.state.items}
          onItemCompleted={this.markItemCompleted}
          onDeleteItem={this.handleDeleteItem}
        />
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
          color="#841584"
          accessibilityLabel="Add item"
          disabled={this.state.text.length === 0}
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
          style={{height: 200}}
          scrollEnabled={true}
          renderItem={({item}) =>
            <TodoListItem
              id={item.id}
              text={item.text}
              done={item.done}
              onItemCompleted = {this.props.onItemCompleted}
              onDeleteItem = {this.props.onDeleteItem}
            />
          }
        />
      </View>
    )
  }

}

class TodoListItem extends React.Component {

   markCompleted = checked => {
     this.props.onItemCompleted(this.props.id);
   }

   deleteItem = event => {
     this.props.onDeleteItem(this.props.id);
   }


  render() {
    return (
      <View>
        <CheckBox
          label={this.props.text}
          labelStyle={{color: "black"}}
          checked={this.props.done}
          onChange={this.markCompleted}
        />
        <Button
          onPress={this.deleteItem}
          title="X"
          accessibilityLabel="Delete item"
        />
      </View>
    );
  }

}

export default TodoContainer;
