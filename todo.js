var data=[]; //tasklari yazmaq ucun array
var count=0; //id vermek ucun


function AddTask()
{
    var taskValue=document.getElementById("task").value; //textareaya daxil edilen text

    var task= //bu obyekt data arrayinin elementidir
    {
        id:count,
        task:taskValue,
        statu:"to-do",
    } 
    data.push(task); //task obyektini data arrayina push etdik

    document.getElementById("task").value=null; //value add olunduqdan sonra textareanin icini sifirlayir
    FillData();
    count++;

}


//ekranda gostermek ucun method
function FillData()
{
    var tempHTML="";
    var tempHTMLComleted="";
    for(var i=0;i<data.length;i++)
    {
        if(data[i].statu=="to-do")
        {
            tempHTML+='   <div class="input-group mb-3">'+
            ' <div class="input-group-prepend">'+
             ' <div class="input-group-text">'+
              '<input type="checkbox" aria-label="Checkbox for following text input" onclick="ClickCheck('+data[i].id+');">'+
                '</div>'+
              ' </div>'+
            ' <p class="form-control" aria-label="Text input with checkbox">'+data[i].task+'</p>'+
            '<div class="input-group-append">'+
            ' <button  class="btn btn-outline-primary" type="button" onclick="ClickEdit('+data[i].id+');"><i class="fa-solid fa-pen-to-square"></i></button>'+
                ' <button  class="btn btn-outline-danger" type="button" onclick="DeleteTask('+data[i].id+');"><i class="fa-solid fa-trash"></i></button>'+
            
                '</div>'+

            '</div>'
        
            
        } 
        else 
        {
            tempHTMLComleted+='   <div class="input-group mb-3">'+
            
            ' <p class="form-control" aria-label="Text input with checkbox">'+data[i].task+'</p>'+
            '<div class="input-group-append">'+
            ' <button  class="btn btn-outline-primary" type="button" onclick="UndoTask('+data[i].id+');"><i class="fas fa-undo"></i></button>'+
                ' <button  class="btn btn-outline-danger" type="button" onclick="DeleteTask('+data[i].id+');"><i class="fa-solid fa-trash"></i></button>'+
            
                '</div>'+

            '</div>'

        }
    }

    document.getElementById("to-do").innerHTML=tempHTML;
    document.getElementById("compeleted").innerHTML=tempHTMLComleted;
}

function ClickCheck(id)
{
    var index=data.findIndex(x=>x.id==id);
    data[index].statu='completed';
    setTimeout(function()
    {
        FillData();
    },500)
}

function DeleteTask(id)
{
    var index=data.findIndex(x=>x.id==id);
    data.splice(index,1); // arraydan element silir

    FillData();
}
function UndoTask(id)
{
    var index=data.findIndex(x=>x.id==id);
    data[index].statu='to-do';
    FillData();

}

function ClickEdit(id)
{
    document.getElementById("task-edit").value=data[id].task;

    $('#editTaskModal').modal('show'); //jquery bootstrap
    var element=document.getElementById("btn-save");
    element.onclick=function()
    {
        Edit(id);

        $('#editTaskModal').modal('hide');
    }
}
function Edit(id)
{
    var index=data.findIndex(x=>x.id==id);
    data[index].task=document.getElementById("task-edit").value;
    FillData();

}


//Enter Event 
// button yerine entere basdiqda add elesin deye 
var input=document.getElementById("task");
input.addEventListener("keyup",function(event) //keyup butun klaviatura klavislerini goturur
{
    if(event.keyCode===13) //keycodu 13 olan enterdir
    {
        event.preventDefault();
        document.getElementById("add").click();
    }
});