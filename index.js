console.log('this is prj 6');


function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    // console.log(div.firstElementChild);
    
    return div.firstElementChild;
}

let addedParamCount = 0;

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let deleteParam = document.getElementsByClassName('deleteParam');
    // console.log(deleteParam);
    // if(deleteParam == 0){
    //     addedParamCount = 0;
    //     console.log('hii');
        
    // }
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`;
    addedParamCount++;
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    for ( item of deleteParam) {
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        });
    }

});


let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    console.log(url,requestType, contentType);
    
    data = {};
    if (contentType == 'params') {
        for (let i = 0; i < addedParamCount+1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    }

    if (requestType == 'GET') {
        fetch(url, {
            method : "GET"
        })
        .then((Response) => Response.text())
        .then((text) => document.getElementById("responseJsonText").value = text);
    }
    else{
        fetch(url, {
            method : "POST",
            body : data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        .then((Response) => Response.text())
        .then((text) => document.getElementById("responseJsonText").value = text);
    }
    
});