



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


document.getElementById("item-list").addEventListener("click", function (event) {
    
    const target = event.target;
   
   
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
   
    itemOrder.splice(indexToRemove, 1);

  
    localStorage.setItem("itemOrder", JSON.stringify(itemOrder));

    
   
}
        }
        const menu = target.closest('.item').querySelector('.menu');
        menu.style.display = "none";
    }
});

const menuButtons = document.querySelectorAll('.menu-button');


menuButtons.forEach((button) => {
    button.addEventListener('click', function() {
       
        const menu = this.nextElementSibling; 
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.placeContent = 'center';
    });
});

document.getElementById("item-list").addEventListener("change", function (event) {
    const target = event.target;
   
    if (target.classList.contains("item-check")) {
   
        const labelValue = target.id;
        

       
        localStorage.setItem(labelValue, target.checked.toString());
    }
});

document.querySelectorAll(".tab label").forEach((tabLabel) => {
    tabLabel.addEventListener("click", function () {
       
        const filter = this.getAttribute("for").replace("tab-", "");
        filterItems(filter);
    });
});


const list = document.getElementById("item-list");

//let draggedItem = null;

// list.addEventListener("dragstart", (e) => {
//     if (e.target.tagName === "I" && e.target.classList.contains("fa-grip-vertical")) {
//         const listItem = e.target.closest("li");
//     if (listItem) {
//         draggedItem = listItem;
//         draggedItem.classList.add("dragged"); 
//         e.dataTransfer.setData("text/plain", listItem.id);
//     }
//     } else {
        
//         e.preventDefault(); 
//     }
// });
// list.addEventListener("dragend", (e) => {
//     if (draggedItem) {
//         draggedItem.classList.remove("dragged"); 
//         draggedItem = null;
//     }
// });

// list.addEventListener("dragover", (e) => {
    
//     e.preventDefault(); 
   
// });
// list.addEventListener("dragleave", (e) => {
    
//     if (draggedItem) {
//         draggedItem.classList.remove("dragged");
//     }
// });

// list.addEventListener("drop", (e) => {
    
//     e.preventDefault();
//     let dropTarget = e.target;

    
//         dropTarget = dropTarget.closest("li");
    
   


    
//     if (draggedItem && dropTarget && draggedItem !== dropTarget) {
//         const items = list.querySelectorAll("li");
//         const draggedIndex = Array.from(items).indexOf(draggedItem);
//         const dropIndex = Array.from(items).indexOf(dropTarget);

//         if (draggedIndex !== -1 && dropIndex !== -1) {
//             if (draggedIndex < dropIndex) {
//                 list.insertBefore(draggedItem, dropTarget.nextSibling);
//             } else {
//                 list.insertBefore(draggedItem, dropTarget);
//             }
//         }
//     }
//     localStorage.clear();
//     draggedItem.classList.remove("dragged");
//     updateLocalStorageOrder();

//     draggedItem = null;
// });
let draggingEle;
    let placeholder;
    let isDraggingStarted = false;

    
    let x = 0;
    let y = 0;
   
   
    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        
        nodeB.parentNode.insertBefore(nodeA, nodeB);

     
        parentA.insertBefore(nodeB, siblingA);
    };

    
    const isAbove = function (nodeA, nodeB) {
       
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
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

    
    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;


    if (prevEle && isAbove(draggingEle, prevEle)) {
       
        swap(placeholder, draggingEle);
        swap(placeholder, prevEle);
        return;
    }

    if (nextEle && isAbove(nextEle, draggingEle)) {
        
        swap(nextEle, placeholder);
        swap(nextEle, draggingEle);
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
};

