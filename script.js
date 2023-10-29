
let counter=0;





class task{
    
     task_done=false;
     task_name= "";

     constructor(name){
        this.task_done=false;
        this.task_name=name;
     }

     set_done(){
        this.task_done=true;

     }


}



const node = document.getElementsByClassName("input-text")[0];
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
       // localStorage.setItem(node.value,"false");
       const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
       itemOrder.push(node.value);
       console.log(itemOrder);
        buildliitem(node.value);
        updateLocalStorageOrder();
                node.value="";
                
        // Do work
        
    }
});


document.getElementById("item-list").addEventListener("click", function (event) {
    
    const target = event.target;
   
   
    if (target.classList.contains("inside")) {
        
        const listItem = target.closest("section");
        if (!listItem) return;
        const checkbox = listItem.querySelector(".item-check");
      
        const labelForCheckbox = document.querySelector(`label[for="${checkbox.id}"]`);


        // Check if the "Complete" button was clicked
        if (target.textContent === "Complete") {
            const checkbox = listItem.querySelector(".item-check");
            checkbox.checked = true;
            const labelElement = target.closest("label");
            const labelText = labelForCheckbox.textContent;
            
            updateLocalStorageOrder() ;
        }

        // Check if the "Delete" button was clicked
        if (target.textContent === "Delete") {
            // Find the label element within the list item
        const labelElement = listItem.querySelector(".item-label");
        const labelValue = labelElement.textContent;
            // const listItemValue = listItem.querySelector(".item-label").textContent;

            // // Remove the item from local storage
            // const items = JSON.parse(localStorage.getItem("items")) || [];
            // const updatedItems = items.filter((item) => item !== listItemValue);
            // localStorage.setItem("items", JSON.stringify(updatedItems));
            //localStorage.removeItem(labelValue);

            // Remove the list item from the DOM
            listItem.remove();
            const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
const indexToRemove = itemOrder.indexOf(labelValue);

if (indexToRemove !== -1) {
    // Remove the item from the item order array
    itemOrder.splice(indexToRemove, 1);

    // Update the item order in local storage
    localStorage.setItem("itemOrder", JSON.stringify(itemOrder));

    // Remove the item from the list
    // You might need to add code to remove the HTML element from the DOM
}
        }
        const menu = target.closest('.item').querySelector('.menu');
        menu.style.display = "none";
    }
});

const menuButtons = document.querySelectorAll('.menu-button');

// Add click event listener to each menu button
menuButtons.forEach((button) => {
    button.addEventListener('click', function() {
        // Find the corresponding menu for this button
        const menu = this.nextElementSibling; // Assumes the menu is always a sibling of the button
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.placeContent = 'center';
    });
});

document.getElementById("item-list").addEventListener("change", function (event) {
    const target = event.target;
   
    if (target.classList.contains("item-check")) {
        // Get the label for this checkbox
        const labelValue = target.id;
        

        // Update the value in local storage based on the checkbox state
        localStorage.setItem(labelValue, target.checked.toString());
    }
});

document.querySelectorAll(".tab label").forEach((tabLabel) => {
    tabLabel.addEventListener("click", function () {
       
        const filter = this.getAttribute("for").replace("tab-", "");
        filterItems(filter);
    });
});
// const list = document.getElementById("item-list");

// let draggedItem = null;

// list.addEventListener("dragstart", (e) => {
//     if (e.target.tagName === "I" && e.target.classList.contains("fa-grip-vertical")) {
//         const listItem = e.target.closest("li");
//         if (listItem) {
//             draggedItem = listItem;
//             draggedItem.classList.add("dragging");
        
//             e.dataTransfer.setData("text/plain", draggedItem.dataset.index);
//         }
//     }else {
        
//         e.preventDefault(); // Prevent dragging other elements
//     }
// });
// const icons = document.querySelectorAll(".fa-grip-vertical");

// icons.forEach((icon) => {
//     icon.addEventListener("dragstart", (e) => {
//         const listItem = icon.closest("li");
//         listItem.style.display = "none"; // Hide the list item
//         e.dataTransfer.setDragImage(listItem, 0, 0); // Set the drag image to the entire list item
//     });
// });
// list.addEventListener("dragend", (e) => {
//     const draggedItem = document.querySelector(".dragging");
//         draggedItem.classList.remove("dragging");
// });

// list.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     if (draggedItem) {
//         const dropTarget = e.target.closest("li");
//         if (dropTarget) {
//             // Remove the "dragged" class from any previously dragged item
//             const previouslyDragged = list.querySelector(".dragged");
//             if (previouslyDragged) {
//                 previouslyDragged.classList.remove("dragged");
//             }
//             dropTarget.classList.add("dragged");
//         }
//     }
// });
// list.addEventListener("dragleave", (e) => {
//     if (draggedItem) {
//         const dropTarget = e.target.closest("li");
//         if (dropTarget) {
//             dropTarget.classList.remove("dragged");
//         }
//     }
// });

// list.addEventListener("drop", (e) => {
    
//     e.preventDefault();
//     let dropTarget = e.target;

    
//         dropTarget = dropTarget.closest("li");
    
   


//     // Swap the positions of the dragged item and the drop target
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

//         const Stitems = document.querySelectorAll('.fa-ul > li');
//         const updatedOrder = Array.from(Stitems).map((item) => item.querySelector('.item-label').textContent);
       
//         // Step 3: Clear the old data from local storage
       
    
//         // Step 4: Store the updated data with the new order back into local storage
//         updatedOrder.forEach((value, index) => {
           
//           localStorage.setItem(value, Stitems[index].querySelector('.item-check').checked.toString());
//           console.log(value);
//         });
//         for (let i = 0; i < localStorage.length; i++) {
//             const key = localStorage.key(i);
//             const value = localStorage.getItem(key);
//             console.log(`Key: ${key}, Value: ${value}`);
//         }
//     }
//     dropTarget.classList.remove("dragged");
//     draggedItem.classList.remove("dragged");

//     draggedItem = null;
// });

// const icons = document.querySelectorAll(".fa-grip-vertical");

// icons.forEach((icon) => {
//     icon.addEventListener("dragstart", (e) => {
//         const listItem = icon.closest("li");
//         e.dataTransfer.setDragImage(listItem, 0, 0);
//         listItem.classList.add("dragged");
//         const clonedItem = listItem.cloneNode(true);
//         clonedItem.classList.add("clone");
//         document.body.appendChild(clonedItem);
//     });
// });

// document.body.addEventListener("dragend", () => {
//     const clonedItem = document.querySelector(".clone");
//     if (clonedItem) {
//         clonedItem.parentNode.removeChild(clonedItem);
//     }
//     const draggedItem = document.querySelector(".dragged");
//     if (draggedItem) {
//         draggedItem.classList.remove("dragged");
//     }
// });

// const itemList = document.getElementById("item-list");

// itemList.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     const draggedItem = document.querySelector(".dragged");
//     if (draggedItem) {
//         listItem.style.display = "none"; // Hide the list item
//         const li = document.elementFromPoint(e.clientX, e.clientY);
//         if (li && li.tagName === "LI" && !li.classList.contains("dragged")) {
//             itemList.insertBefore(draggedItem, li);
//         }

//     }
// });

const list = document.getElementById("item-list");

let draggedItem = null;

list.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "I" && e.target.classList.contains("fa-grip-vertical")) {
        const listItem = e.target.closest("li");
    if (listItem) {
        draggedItem = listItem;
        draggedItem.classList.add("dragged"); // Add the "dragged" class
        e.dataTransfer.setData("text/plain", listItem.id);
    }
    } else {
        
        e.preventDefault(); // Prevent dragging other elements
    }
});
list.addEventListener("dragend", (e) => {
    if (draggedItem) {
        draggedItem.classList.remove("dragged"); // Remove the "dragged" class
        draggedItem = null;
    }
});

list.addEventListener("dragover", (e) => {
    
    e.preventDefault(); // Allow drop event
   
});
list.addEventListener("dragleave", (e) => {
    // Handle drag leave as needed (e.g., removing the "dragged" class)
    if (draggedItem) {
        draggedItem.classList.remove("dragged");
    }
});

list.addEventListener("drop", (e) => {
    
    e.preventDefault();
    let dropTarget = e.target;

    
        dropTarget = dropTarget.closest("li");
    
   


    // Swap the positions of the dragged item and the drop target
    if (draggedItem && dropTarget && draggedItem !== dropTarget) {
        const items = list.querySelectorAll("li");
        const draggedIndex = Array.from(items).indexOf(draggedItem);
        const dropIndex = Array.from(items).indexOf(dropTarget);

        if (draggedIndex !== -1 && dropIndex !== -1) {
            if (draggedIndex < dropIndex) {
                list.insertBefore(draggedItem, dropTarget.nextSibling);
            } else {
                list.insertBefore(draggedItem, dropTarget);
            }
        }
    }
    localStorage.clear();
    draggedItem.classList.remove("dragged");
    updateLocalStorageOrder();

    draggedItem = null;
});