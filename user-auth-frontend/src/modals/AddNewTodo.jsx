import React, { useRef } from "react";

export default function AddNewTodo({onClose}) {


    const listRef = useRef(null)




    const handleAddNewItems = () => {
        // add an input box
        console.log(listRef, "LIST REFERENCE");
        let itemInput = document.createElement('input');
        // itemInput.style.padding = "2px";
        listRef.current.appendChild(itemInput)

    }
    return (
        <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="border-0 h-96 w-3/12 bg-gray-900 rounded-xl p-4">
                        {/* title */}
                        <p>Make a new Todo</p>
                        <input placeholder="What are we planning?" className="mt-4 bg-gray-800 border-none focus:outline-none p-2 w-full rounded-lg"/>

                        <div ref={listRef} className="mt-2 flex flex-col gap-2  child:rounded-lg child:outline-none child:px-2 child:py-1 border border-red-400">
                        </div>

                        {/* create list of items (of todos) */}

                        <button onClick={handleAddNewItems} className="w-full border border-dotted border-gray-700 h-12 flex items-center justify-center mt-4 text-lg focus:outline-none"> + </button>







                        {/* close || save changes */}
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
