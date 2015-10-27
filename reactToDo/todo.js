var ListView = React.createClass({
	getInitialState: function () {
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
	editItems: function(i, newText) {

		var currentItems = this.state.items;

		currentItems[i] = newText;

		this.setState({
			items: currentItems
		});
	},
	render: function() {
	var listItems= this.state.items;

		return (
			<div className='grocery'>
				<h3>Grocery List</h3>
				<input ref="item" defaultValue="get at me" /> <a href="#" onClick={this.addItem}>Add Item</a>
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
			React.findDOMNode(this.refs.editBox).value = '';

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