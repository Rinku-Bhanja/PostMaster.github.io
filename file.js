//Utility Functions:
// 1.utility function to get DOM element from string
function getElement(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//Initialize no. of parameters
let addedParamCount = 0;
//Hide parameters Box Initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
//If the user clicks on parameters box,hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
document.getElementById('requestJsonBox').style.display = 'none';
document.getElementById('parametersBox').style.display = 'block';
})
//If the user clicks on json box,hide the parameters box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
document.getElementById('parametersBox').style.display = 'none';
document.getElementById('requestJsonBox').style.display = 'block';
})
//If the user clicks on + Button, Add More parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
            <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
            </div>
            <button class="btn btn-primary deleteParam">-</button>
            </div>`;
//Convert the element string to DOM node
let paramElement = getElement(string);
params.appendChild(paramElement);
//Add an event listener to remove the parameter on clicking - button
let deleteParam = document.getElementsByClassName('deleteParam');
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })
}
addedParamCount ++;
})
//If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
//show please wait in the response box to equest patience from the user
// document.getElementById('responseJsonText').value = "Please Wait, Fetching Response.......";
document.getElementById('responsePrism').innerHTML = "Please Wait, Fetching Response.......";
//fetch all the values user has entered
let url = document.getElementById('url').value;
let requestType = document.querySelector("input[name='requestType']:checked").value;
let contentType = document.querySelector("input[name='contentType']:checked").value;
//If user has used Custom params option instead of json,collect all parameters in an object
if(contentType == 'params'){
 data = {};
 for(let i=0; i<addedParamCount + 1; i++){
    if(document.getElementById('parameterKey'+ (i + 1)) != undefined){
    let key = document.getElementById('parameterKey'+ (i + 1)).value;
    let value = document.getElementById('parameterValue'+ (i + 1)).value;
    data[key] = value;
}
}
     data = JSON.stringify(data);
}
else{
    data = document.getElementById('requestJsonText').value;
}
//Log all the values in the console for debugging
// console.log('url is', url);
// console.log('requestType is', requestType);
// console.log('contentType is', contentType);
// console.log('Data is', data);

//if the request type is get or post, invoke fetch api to create a get or post request
if(requestType == 'GET'){
    fetch(url,{
        method:'GET',
    })
    .then(response => response.text())
    .then((text)=>{
        // document.getElementById('responseJsonText').value = text;
        document.getElementById('responsePrism').innerHTML = text;
        Prism.highlightAll();
    });
}
    else{
        fetch(url,{
            method:'POST',
            body: data,
            headers:{
                "content-type" : "application/json; charset=utf-8"
            }
        })
        .then(response => response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
});