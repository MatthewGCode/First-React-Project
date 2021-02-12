import React, {Component} from "react";
import Item from "./Item.jsx";

class ShoppingList extends Component {
    state = {  
        currentId: 0,
        items: []
    }

    componentDidMount(){
        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowLeft") this.addItem();
        });
    }

    addItem = () => {
        let items = this.state.items;
        let name = "";
        name = window.prompt("Item name: ");
        name = typeof(name) === "string"? name.slice(0,10): null; //handle errors
        if(name === null) return; //handle errors

        items.push({id: this.state.currentId, name: name, val: 0});
        this.setState((state) => ({currentId: state.currentId + 1, items: items}));
    }

    incrementCounter = (counterId) => {
        const items = this.state.items.map((item) => {
            if(item.id === counterId) item.val++;
            return item;
        });
        this.setState({items: items});
    }

    decrementCounter = (counterId) => {
        const items = this.state.items.map((item) => {
            if(item.id === counterId) item.val = item.val > 0? item.val-1 : 0;
            return item;
        });
        this.setState({items: items});
    }

    deleteItem = (counterId) => {
        const items = this.state.items.filter((counter) => counter.id !== counterId);
        this.setState({items: items});
    }

    render() { 
        return (  
            <div className = "list">
                <h1 className = "list-title">Shopping List:</h1>
                <hr style = {{border: "3px solid #333", margin: "0 1rem"}}/>
                {this.state.items.map((item) => 
                <Item 
                item = {item}
                key = {item.id} 
                onIncrement = {this.incrementCounter} 
                onDecrement = {this.decrementCounter} 
                onDelete = {this.deleteItem} />)}
                <div className = "item" onClick = {this.addItem}>
                    <p> + Add Item</p>
                </div>
            </div>
        );
    }
}
 
export default ShoppingList;