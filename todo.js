const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos =[];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){   //로컬리스트 TODOS_LS에 toDos를 객체로 설정하는 함수
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){   // 실제로 하고자하는 작업을 실행하는 함수 
    const li = document.createElement("li");    //li생성
    const delBtn = document.createElement("button");    //삭제버튼생성
    const span = document.createElement("span");    //span생성
    const newId = toDos.length + 1; //순서별로 아이디 생성
    delBtn.innerText = "❌";    //button에 텍스트 할당
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;      //span의 텍스테 text할당
    li.appendChild(delBtn); //li에 delBtn 삽입
    li.appendChild(span);   //li에 sapn 삽입
    li.id = newId;  //li에 순서별 아이디 할당
    toDoList.appendChild(li);   //toDoObj에 텍스트와 아이디 할당
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    //toDos에 toDoObj 삽입
    saveToDos();    //saveToDos함수 실행
}

function handleSubmit(event){   //Submit시에 이벤트를 제어하는 함수
    event.preventDefault(); //Submit시 이벤트 제거
    const currentValue = toDoInput.value;   //currentValue에 toDoInput의 작성한 텍스트를 할당
    paintToDo(currentValue);    //currentValue를 paintToDo함수에 건내주며 실행
    toDoInput.value = "";   //toDoInput을 비움
}

function loadToDos(){   //
    const loadedToDos = localStorage.getItem(TODOS_LS); //loadedToDos에 loclaStorage에 있는 TODOS_LS를 할당
    if(loadedToDos !== null){   //localStorage가 비어있으면 if문 실행
        const parsedToDos = JSON.parse(loadedToDos);    //loadedToDos를 객체로 parsedToDos에 할당
        parsedToDos.forEach(function(toDo){ //(forEach - array에 담겨있는 것들을 각각에 한번씩 함수를 실행)
            paintToDo(toDo.text);   //toDo배열의 객체에대해 한번씩  paintToDo함수 실행
        });
    }
}

function init(){    //웹 실행시 초기화하는 함수
    loadToDos();    //loadToDos실행
    toDoForm.addEventListener("submit", handleSubmit);  //submit시에 handleSumit함수 실행
}

init(); //init 함수 실행