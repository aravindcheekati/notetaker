const NoteList = ({ completedNote, item, deleteNote, editNote }) => {
  return (
    <div className="border px-4 py-3 rounded grid grid-cols-12 items-center gap-x-2 mt-2">
      <div className="col-span-1">
        <input
          type="checkbox"
          value={item.id}
          onChange={completedNote}
          checked={item.isCompleted}
        />
      </div>
      <p
        className="col-span-8 md:col-span-9"
        style={{ textDecoration: item.isCompleted && "line-through" }}
      >
        {item.text}
      </p>
      <div className="space-x-2 col-span-3 md:col-span-2 flex justify-end">
        <button 
          className="w-10 h-10 bg-blue-600 text-white rounded-lg"
          onClick={() => editNote(item.id)}
        >
          <i className="ri-edit-box-line"></i>
        </button>
        <button 
          className="w-10 h-10 bg-rose-600 text-white rounded-lg"
          onClick={() => deleteNote(item.id)}
        >
          <i className="ri-delete-bin-line"></i>
        </button>
      </div>
    </div>
  );
};

export default NoteList;
