
App = 
{
    contracts: {},
    init: async () =>
    {
        await App.loadEthereum()
        await App.loadAccounts()
        await App.loadContract()
        App.render()
        await App.renderTask()
    },
    
    // verify if a wallet is installed on the navegator
    loadEthereum: async () =>
    {
        if (window.ethereum) //if the ethereum object exist (wallet instaled)
        {
            console.log('Ethereum exist')
            App.web3Provider = window.ethereum // Our provider will be metamask 
            await ethereum.request({ method: 'eth_requestAccounts' }); // Connect to the blockchain with metamask 

        }
        else if (window.web3)
        {
            web3 = new Web3(window.web3.currentProvider) // Connect to the blockchain with web3
        }
        else
        {
            console.log('No ethereum browser is installed. Try installing Metamask')
        }
    },

    loadContract: async () =>
    {
       const response       = await fetch('TaskContract.json') // Get the contract
       const TaskContract   = await response.json() // Convert the contract to json
       console.log(TaskContract)

       App.contracts.ContractTask = TruffleContract(TaskContract) //Contract instance

        App.contracts.ContractTask.setProvider(App.web3Provider)
        App.tasksContract = await App.contracts.ContractTask.deployed() // Final instance 
    },
    
    //Function to load the accouns from Metamask

    loadAccounts: async () =>
    {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0]
    },

    //Function to load the account
    render: () => 
    {
        document.getElementById('account').innerText = App.account
    },

    //Function to show the tasks
    renderTask: async () =>
    {
        const taskCounter       = await App.tasksContract.taskCounter() //Get the number of task
        const numberTaskCounter = taskCounter.toNumber() // Convert to int

        let html = ''
        
        for(let i = 1; i < numberTaskCounter; i++)
        {
            const task              = await App.tasksContract.tasks(i) // Get the data of each task
            //Get specific data 
            
            const taskId            = task[0]
            const taskTitle         = task[1]
            const taskDescription   = task[2]
            const taskDone          = task[2]
            const taskCreated       = task[4]

            //Create a html with the tasks data
            let taskElement = 
            `
            <div class="card bg-dark rounded-0 mb-2">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>${taskTitle}</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" data-id="${taskId}"type="checkbox" ${taskDone === true && "checked"} onchange="App.toggleDone(this)" />
                    </div>
                </div>

                <div class="card-body">
                    <span>${taskDescription}</span>
                    <p class="text-muted">Task was created ${new Date(taskCreated * 1000).toLocaleString()}</p>
                </div>
            </div>
            `

            html += taskElement;
        }

        document.querySelector('#tasksList').innerHTML = html;
    },

    
    //Function to create a task
    createTask: async (title, description) => 
    {
        const result = await App.tasksContract.createTask(title, description, {
            from: App.account
        }) //Function inside the contract to create a task 
        console.log(result.logs[0].args)

    },

    //Function to update task state 
    toggleDone: async (element) => 
    {
        const taskId = element.dataset.id
        await App.tasksContract.toggleDone(taskId, {from: App.account}) //Call the toggleDone function of the contract
        window.location.reload // refresh the page
    }
}

App.init()