import { useState } from "react";
import Logo from "./Logo";
// import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import Form from "./Form";

export default function App() {
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
