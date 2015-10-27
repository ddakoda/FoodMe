var ListView = React.createClass({
  getInitialState: function() {
    return {
      items: []
    }
  },
  addItem: function(e) {
    e.preventDefault();

    var currentItems = this.state.items;
    var newItem = React.findDOMNode(this.refs.item).value;

    currentItems.push(newItem);

    this.setState({
      items: currentItems
    });
  },
  deleteItem: function(i) {
    var currentItems = this.state.items;
    var updatedItems = currentItems.splice(i, 1);

    this.setState({
      items: currentItems
    });
  },
  editItem: function(i, newText) {       //---> var newText = "Hi";
                                         //---> var i = 1;
    var currentItems = this.state.items; //---> [1, 2, 3]
    console.log(currentItems);
    console.log(currentItems[i]);

    currentItems[i] = newText;          //---> currentItems[1] == 'Hi'
                                        //---> currentItems == [1, 'Hi', 3]
    console.log(currentItems);
    this.setState({
      items: currentItems
    });
  },
  render: function() {
    var listItems = this.state.items;

    return (
      <div className='whatever'>
        <h3>Grocery List</h3>
        <input ref="item" defaultValue="Enter item" /> <a href="#" onClick={this.addItem}>Add Item</a>
        <ul>
          {
            listItems.map(function(item, index) {
              return <GroceryItem deleteItem={this.deleteItem} editItem={this.editItem} item={item} index={index} key={index} />;
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

var GroceryItem = React.createClass({
  removeItem: function(i) {
    this.props.deleteItem(i);

  },
  edit: function(i) {
    var newText = React.findDOMNode(this.refs.editBox).value;
      this.props.editItem(i, newText);
      React.findDOMNode(this.refs.editBox).value = ''

  },
  render: function() {
    var index = this.props.index;
    console.log(index);

    return (
      <li>
        {this.props.item} <input type="text" ref="editBox" /> <a href="#" onClick={this.removeItem.bind(null, index)}>REMOVE</a> &nbsp;
        <a href="#" onClick={this.edit.bind(null, index)}>EDIT</a>
      </li>
      );
  }
});

React.render(<ListView />, document.getElementById('page'));