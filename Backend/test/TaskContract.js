const TaskContract = artifacts.require("TaskContract"); //Requiere the contract to test 

contract("TaskContract", () => //Our first testing
{
    before( async () => //Before any other test the this function is executed
    {
        this.taskContract = await TaskContract.deployed() //We display the contract and save it in a variable
        //this is for use the taskContract variable in other functions
    })

    //it is to describe a test (How should it work )
    //Verify if the migrate was deployed successfully
    it('migrate deploy successfully', async () => 
    {
        const address = this.taskContract.address
        assert.notEqual(address, null); // the contract address must not equal to null 
        assert.notEqual(address, undefined); //the address isn't undefined
        assert.notEqual(address, 0x0); //The address isn't an empty hexadecimal 
        assert.notEqual(address, ""); //The address does not have an empty hexadecimal  
    }) 

    it('get Task List', async () =>
    {
        const taskCounter = await this.taskContract.taskCounter() // Call the counter of task
        const task        = await this.taskContract.tasks(taskCounter - 1) // Call the task (struct) with the taskCounter as parameter
        assert.equal(task.id.toNumber(), taskCounter - 1) //the current id must be equal to current task 
        assert.equal(task.title,        "My first task") //the current title must be equal to "My first task" 
        assert.equal(task.description, "Example of task") //the current title must be equal to "Example of task" 
        assert.equal(task.done,         false) //the current done must be equal to false
        //assert.equal(task.taskCounter, 1) //the current taskCounter must be equal to 1
    }) 

    it('task created successfully', async () => 
    {
        const result    = await this.taskContract.createTask("Some Task", "Second Task")
        const TaskEvent = await result.logs.args[1].args;
        assert.equal(TaskEvent.id,toNumber(),   0);
        assert.equal(TaskEvent.title,           "Some Task");
        assert.equal(TaskEvent.description,     "Second Task");
        assert.equal(TaskEvent.done,            false);
    })

     
})