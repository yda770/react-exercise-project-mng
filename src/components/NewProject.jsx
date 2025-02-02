import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {

    const modalRef = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDesription = description.current.value;
        const entereddueDate = dueDate.current.value;

        // validate inputs
        if (enteredTitle.trim() === '' || enteredDesription.trim() === '' || entereddueDate.trim() === '') {
            modalRef.current.open();
            return;
        }
        onAdd({
            title: enteredTitle,
            description: enteredDesription,
            dueDate: entereddueDate
        });
    }


    return <>
        <Modal ref={modalRef} buttonCaption="Close">
            <h2 className='text-xl  font-bold text-stone-700 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Please enter a valid title, description and due date</p>
            <p className='text-stone-600 mb-4'>Please make sure you put the valid value</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
                        Cancel
                    </button>
                </li>
                <li>
                    <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        onClick={handleSave}>
                        Save
                    </button>
                </li>
            </menu>
            <div>
                <Input type="text" ref={title} label="Title" />
                <Input ref={description} label="Description" isTextArea />
                <Input type="date" ref={dueDate} label="Due Date" />
            </div>
        </div>
    </>
}
