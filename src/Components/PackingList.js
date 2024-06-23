import { useState } from "react";
import PackingItem from "./PackingItem";

export default function PackingList({
  items,
  onDeleteItem,
  onCheckedItem,
  onClearItems,
}) {
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
