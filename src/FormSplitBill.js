import { useState } from "react";
import Button from "./Button";
export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const paidByfriend = bill ? bill - userExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !userExpense) return;

    onSplitBill(whoIsPaying === "user" ? paidByfriend : -userExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) =>
          setUserExpense(+e.target.value > bill ? userExpense : +e.target.value)
        }
      />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByfriend} />
      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
