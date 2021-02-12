import React, {Component} from "react";

class Item extends Component {
  state = { 
    val: 0,
    name: this.props.item.name,
  } 

  handleNameChange = (e) => {
      this.setState({name: e.target.value})
  }

  render() { 
    return (  
      <div className = "item">
        <input className = "item-name shopping-list-item-name" value = {this.state.name} onChange = {this.handleNameChange}/>
        <p className = "item-display">{this.props.item.val === 0 ? "zero" : this.props.item.val}</p>
        <button className = "increment-btn list-btn" onClick = {() => this.props.onIncrement(this.props.item.id)}>  +  </button>
        <button className = "decrement-btn list-btn" onClick = {() => this.props.onDecrement(this.props.item.id)}>  -  </button>
        <button className = "delete-btn list-btn" onClick = {() => this.props.onDelete(this.props.item.id)}>Delete</button>
      </div>
    );
  }
}
 
export default Item;