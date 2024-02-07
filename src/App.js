import { useState } from "react";

const initialItems = [
  {id: 1, description: "Passports", quantity: 2, packed: true},
  {id: 2, description: "Socks", quantity: 12, packed: false},
  {id: 3, description: "Shirt", quantity: 32, packed: true}
]

export default function App() {

  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }


  function handleDeleteItem(id) {
    setItems((item) => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) => 
      items.map((item) => 
        item.id === id ? { ...item, packed: !item.packed} 
        : item
      )
    );
  }

  function handleClearList() {
    //alert("Do you want to clear everything?");
    const confirm = window.confirm("Are you sure you want to clear all items?");
    if(confirm) setItems([]);
  }

  return(
    <div className="app">
    <Logo />
    <Form onAddItems = {handleAddItems}/>
    <PackingList 
      items = {items}
      onDeleteItem = {handleDeleteItem} 
      onToggleItems = {handleToggleItem} 
      onClearList = {handleClearList}/>
    <Stats items = {items}/>
    </div>
  );
}

function Logo() {
  return <h1>🌴🌴 Far Away 💼💼</h1>
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
    
  function handleSubmit(e) {
      e.preventDefault();
      
      if (!description) return;

      const newItem = {description, quantity, package: false, id: Date.now()}
      console.log(newItem)

    onAddItems(newItem);

      setDescription("")
      setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form">
        <h3>What do you need for your 😍 trip??</h3>

        <select value ={quantity} onChange={(e) => setQuantity(Number(e.target.value))}> {Array.from({length: 20}, (_, i) => i + 1).map
        ((num) => (
          <option value ={num} key={num} >
            {num}
          </option>
        ))}</select>

        <input type="test" placeholder="item.." value={description} onChange={(e)=> setDescription(e.target.value)}></input>
        <button>Add</button>
      </div>
    </form>
  );
}

function PackingList({items, onDeleteItem, onToggleItems,onClearList}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
  <div className="list">
    <ul>
        {sortedItems.map((item) =>(
          <Item 
            item={item} 
            onDeleteItem = {onDeleteItem}
            onToggleItems={onToggleItems}
            onClearList={onClearList}
            key={item.id}/>
      ))}
    </ul>

  <div className="action">
    <select value = {sortBy} onChange={e => setSortBy(e.target.value)}>
      <option value="input">Sort by input order</option>
      <option value="description">Sort by description</option>
      <option value="packed">Sort by packed status</option>
    </select>
    <button onClick = {onClearList}>Clear List</button>

  </div>  
  </div>
      
  ); 
}

function Item({item, onDeleteItem, onToggleItems}) {
  return (
  <li>
    <input type='checkbox' 
    value={item.packed} 
    onChange={() => onToggleItems(item.id)} />
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      {item.description} {item.quantity} 
    </span>
    <button type="button" onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
  );
}

function Stats({items}) {
  if(!items.length) return(
    <p className="stats">
      <em className="">Add some items to the list🏃‍♂️🏃‍♂️💨💨</em>
    </p>
  )


  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const perPacked = Math.round(numPacked / numItems * 100)

  return(
    <footer className="stats">
      <em>
        {perPacked === 100 ? "You got everything! ready to go ✈️✈️" :
      `You have ${numItems} items in your list, and you already packed ${numPacked} (${perPacked}%)`}</em>
    </footer>
  );
}