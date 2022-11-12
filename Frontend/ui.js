const taskForm = document.querySelector("#taskForm") //Form of the index.html

taskForm.addEventListener("submit", e => 
{
    e.preventDefault() // When clicked, prevent a refresh on the page 
    
    App.createTask(taskForm["title"].value, taskForm["description"].value); //Call the createTask function
})