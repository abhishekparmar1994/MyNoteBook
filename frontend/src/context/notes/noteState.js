import {React, useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "67e4e73539b0e524b7981606",
            "user": "67e4e2075168b412ca72ded3",
            "title": "Union Bank of India",
            "content": "This is a sample note to get information of Union Bank of India Account Details.",
            "tags": [
                "Saving Acc",
                "Current Acc"
            ],
            "date": "2025-03-27T05:50:45.937Z",
            "__v": 0
        },
        {
            "_id": "67ed22932421094959b76b6a",
            "user": "67e4e2075168b412ca72ded3",
            "title": "State Bank of India",
            "content": "1234a6d54as65da111",
            "tags": [
                "Unionbank111",
                "Bank111"
            ],
            "date": "2025-04-02T11:42:11.530Z",
            "__v": 0
        },
        {
            "_id": "67ed22932421094959b76b6a",
            "user": "67e4e2075168b412ca72ded3",
            "title": "State Bank of India",
            "content": "1234a6d54as65da111",
            "tags": [
                "Unionbank111",
                "Bank111"
            ],
            "date": "2025-04-02T11:42:11.530Z",
            "__v": 0
        },
        {
            "_id": "67ed22932421094959b76b6a",
            "user": "67e4e2075168b412ca72ded3",
            "title": "State Bank of India",
            "content": "1234a6d54as65da111",
            "tags": [
                "Unionbank111",
                "Bank111"
            ],
            "date": "2025-04-02T11:42:11.530Z",
            "__v": 0
        },
        {
            "_id": "67e4e73539b0e524b7981606",
            "user": "67e4e2075168b412ca72ded3",
            "title": "Union Bank of India",
            "content": "This is a sample note to get information of Union Bank of India Account Details.",
            "tags": [
                "Saving Acc",
                "Current Acc"
            ],
            "date": "2025-03-27T05:50:45.937Z",
            "__v": 0
        },{
            "_id": "67e4e73539b0e524b7981606",
            "user": "67e4e2075168b412ca72ded3",
            "title": "Union Bank of India",
            "content": "This is a sample note to get information of Union Bank of India Account Details.",
            "tags": [
                "Saving Acc",
                "Current Acc"
            ],
            "date": "2025-03-27T05:50:45.937Z",
            "__v": 0
        },{
            "_id": "67e4e73539b0e524b7981606",
            "user": "67e4e2075168b412ca72ded3",
            "title": "Union Bank of India",
            "content": "This is a sample note to get information of Union Bank of India Account Details.",
            "tags": [
                "Saving Acc",
                "Current Acc"
            ],
            "date": "2025-03-27T05:50:45.937Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(notesInitial); 
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    );

}

export default NoteState