

//adding new tasks 


const node = document.getElementsByClassName("input-text")[0];
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      
       const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
       itemOrder.push(node.value);
       console.log(itemOrder);
        buildliitem(node.value);
        updateLocalStorageOrder();
                node.value="";   
    }
});




//handling menu buttons

document.getElementById("item-list").addEventListener("click", function (event) {
    
    const target = event.target;

    //chick if one of menu buttons pressed

    if (target.classList.contains("inside")) {
        
        const listItem = target.closest("section");
        if (!listItem) return;
        const checkbox = listItem.querySelector(".item-check");
        const labelForCheckbox = document.querySelector(`label[for="${checkbox.id}"]`);


       
        if (target.textContent === "Complete") {
            const checkbox = listItem.querySelector(".item-check");
            checkbox.checked = true;
            const labelElement = target.closest("label");
            const labelText = labelForCheckbox.textContent;
            updateLocalStorageOrder() ; 
        }

       
        if (target.textContent === "Delete") {
            const labelElement = listItem.querySelector(".item-label");
            const labelValue = labelElement.textContent;
          
            listItem.remove();
            const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
            const indexToRemove = itemOrder.indexOf(labelValue);

                if (indexToRemove !== -1) {
   
                itemOrder.splice(indexToRemove, 1);//remove from itemorder and update localstorage
                localStorage.setItem("itemOrder", JSON.stringify(itemOrder));
                }
        }

        const menu = target.closest('.item').querySelector('.menu');
        menu.style.display = "none"; // hide the menu after pressing and handling
    }
});




//change the menu visibility 

const menuButtons = document.querySelectorAll('.menu-button');
menuButtons.forEach((button) => {
    button.addEventListener('click', function() {
       
        const menu = this.nextElementSibling; 
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.placeContent = 'center';
    });
});



//change the task value

document.getElementById("item-list").addEventListener("change", function (event) {
    const target = event.target;
   
    if (target.classList.contains("item-check")) {
   
        const labelValue = target.id;
        localStorage.setItem(labelValue, target.checked.toString());
        updateLocalStorageOrder();
    }
});


//moving between tabs

document.querySelectorAll(".tab label").forEach((tabLabel) => {
    tabLabel.addEventListener("click", function () {
       
        const filter = this.getAttribute("for").replace("tab-", "");
        filterItems(filter);
    });
});



//handling drag and drop

const list = document.getElementById("item-list");



let draggingEle;
let placeholder;
let isDraggingStarted = false;

    
let x = 0;
let y = 0;
   
   
    const swap = function (first, sec) {
        const parentA = first.parentNode;
        const siblingA = first.nextSibling === sec ? first : first.nextSibling;

        
        sec.parentNode.insertBefore(first, sec);
        parentA.insertBefore(sec, siblingA);
    };

    
    

    list.addEventListener("mousedown", (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName === "I" && e.target.classList.contains("fa-grip-vertical")) {
        draggingEle= e.target.closest("li");
        

    
    const rect = draggingEle.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);}
    else{
        e.preventDefault(); 
    }
});


const isAbove = function (first, sec) {
       
    const rectA = first.getBoundingClientRect();
    const rectB = sec.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};
const mouseMoveHandler = function (e) {
    const draggingRect = draggingEle.getBoundingClientRect();

    if (!isDraggingStarted) {
        isDraggingStarted = true;
       
    
        placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
        placeholder.style.height = draggingRect.height + 'px';
    }

   
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = (e.pageY - y) + 'px';
    draggingEle.style.left = (e.pageX - x) + 'px';

    
    const prev = draggingEle.previousElementSibling;
    const nextel = placeholder.nextElementSibling;


    if (prev && isAbove(draggingEle, prev)) {
       
        swap(placeholder, draggingEle);
        swap(placeholder, prev);
        return;
    }

    if (nextel && isAbove(nextel, draggingEle)) {
        
        swap(nextel, placeholder);
        swap(nextel, draggingEle);
    }
};



const mouseUpHandler = function () {
    
    placeholder && placeholder.parentNode.removeChild(placeholder);

    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    x = null;
    y = null;
    draggingEle = null;
    isDraggingStarted = false;

    
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    updateLocalStorageOrder();
    window.location.reload();
};

