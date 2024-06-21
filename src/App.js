import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    console.log(item);

    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckedItem(id) {
    console.log(`Started Checked! ${id}`);
    ///Return an array list of items, where the target item has status set to packed
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );

    console.log(`Checked! ${id}`);
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed === true) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckedItem={handleCheckedItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onCheckedItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "description") {
    sortedItems = items.toSorted((aItem, bItem) =>
      aItem.description.localeCompare(bItem.description)
    );
    console.log(sortedItems);
  }
  if (sortBy === "packed") {
    sortedItems = items.toSorted(
      (aItem, bItem) => Number(aItem.packed) - Number(bItem.packed)
    );
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((i) => (
          <PackingItem
            item={i}
            key={i.id}
            onDeleteItem={onDeleteItem}
            onCheckedItem={onCheckedItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status </option>
        </select>

        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}

function PackingItem({ item, onDeleteItem, onCheckedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckedItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;

  const percentPacked = Math.round(numPacked / numItems) * 100;
  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you already packed
        ${numPacked}(${percentPacked}%`}
      </em>
    </footer>
  );
}

export default App;
