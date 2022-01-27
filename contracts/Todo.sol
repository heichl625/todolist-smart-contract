// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Todo {

    address public owner;

    constructor(){
        owner = msg.sender;
    }

    struct Item {
        bytes32 description;
        bool isDone;
    }

    mapping(address => mapping(bytes32 => Item)) public todolist;

    function addItem(
        bytes32 _title,
        bytes32 _description
    ) external returns (bool) {

        require(todolist[msg.sender][_title].description == "", "Item exist");
        todolist[msg.sender][_title].description = _description;
        todolist[msg.sender][_title].isDone = false;

        return true;
    }

    function setDone(
        bytes32 _title
    ) external returns (bool) {
        require(todolist[msg.sender][_title].isDone == false, "Item Already done");
        todolist[msg.sender][_title].isDone = true;

        return true;
    }

}