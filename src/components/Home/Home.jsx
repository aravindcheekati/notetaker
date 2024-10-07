import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import Layout from "../Layout/Layout";
import NoteList from "../NoteList/NoteList";
import NotFound from "../NotFound/NotFound";

const Home = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  // Submit Items to Local Storage
  const submitForm = (event) => {
    event.preventDefault();
    const item = {
      id: uuid4(),
      text: text,
      isCompleted: false,
    };

    const updatedItems = [...items, item];
    setItems(updatedItems);
    storeItem(updatedItems);
    setText("");
  };

  // Handle Input Change
  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  // Store Items in Local Storage
  const storeItem = (updatedItems) => {
    localStorage.setItem("notes", JSON.stringify(updatedItems));
  };

  // Get Items From Local Storage
  const getItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("notes"));
    if (storedItems) {
      setItems(storedItems);
    }
  };

  // Check as Completed
  const completedNote = (event) => {
    const { value } = event.target;
    const completedItems = items.map((item) => {
      if (item.id !== value) return item;
      return {
        ...item,
        isCompleted: !item.isCompleted,
      };
    });
    storeItem(completedItems);
    getItems();
  };

  // Delete Note
  const deleteNote = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    storeItem(updatedItems);
    getItems();
  };

  // Edit Note
  const editNote = (id) => {
    setId(id);
    const task = items.filter((item) => item.id === id);
    if (task) {
      const [item] = task;
      setText(item.text);
    }
  };

  // Save Edited Note
  const saveEditedNote = (e) => {
    e.preventDefault();
    const updatedItems = items.map((item) => {
      if (item.id !== id) return item;
      return {
        ...item,
        text: text,
      };
    });
    storeItem(updatedItems);
    getItems();
    setText("");
    setId(null)
  };

  return (
    <Layout>
      <div>
        <form
          className="grid grid-cols-12 gap-2"
          onSubmit={id ? saveEditedNote : submitForm}
          autoComplete="off"
        >
          <input
            type="text"
            className="col-span-10 md:col-span-11 border outline-none px-4 rounded"
            placeholder="Enter Note"
            name="text"
            onChange={handleChange}
            value={text}
            required
          />
          <button className="col-span-2 md:col-span-1 px-2 py-3 flex justify-center items-center text-sm gap-x-1 bg-violet-600 text-white rounded text-center">
            <i className="ri-save-2-fill text-[20px]"></i>
          </button>
        </form>
      </div>
      <section className="mt-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <NoteList
              completedNote={completedNote}
              key={index}
              item={item}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          ))
        ) : (
          <NotFound />
        )}
      </section>
    </Layout>
  );
};

export default Home;
