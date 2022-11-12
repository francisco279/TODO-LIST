// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Contract that will handle the TODO list

contract TaskContract {

  //Counter of task
  uint public taskCounter = 0;

  //Struct of the tasks
  struct Task 
  {
    uint256 id;
    string  title;
    string  description;
    bool    done;
    uint256 createAt; //Creation time of the task
  }
  
  //Executed event when a task has been created
  event TaskCreated(
    uint256 id,
    string title,
    string description,
    bool done,
    uint256 createAt
  );

  // ToggleDone event
  event TasktoggleDone(
  uint id,
  bool done
  );


  //Mapping id to Task
  mapping (uint256 => Task) public tasks;

  constructor ()
  {
    createTask("My first task", "Example of task");
  }

  //Function to create a new task
  function createTask (string memory _title, string memory _description) public
  {
    tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
    emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    taskCounter++;
  }

  //Function to update the state of a task
  function toggleDone(uint _id) public
  {
    Task memory _task = tasks[_id]; //we create a variable of type task and we pass the id as parameter
    _task.done        = !_task.done; // Change from false to true, or true to false
    tasks[_id]        = _task; // Update the task with the new valor: done
    emit TasktoggleDone(_id, _task.done); // Emit the event
  }
}
