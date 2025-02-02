import { useState } from "react";

export default function NewTask({ onAdd }) {

    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {

        if(enteredTask.trim() === ''){
            return;
        }

        onAdd(enteredTask);
        setEnteredTask('');
    }

    return <div className="flex gap-4 items-center">
        <input onChange={handleChange}
            type="text"
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            value={enteredTask} />
        <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add task</button>
    </div>
}