


let emplist = 0;

const emptydiv = document.querySelector(".empty");
const elempp = emptydiv.parentNode;
//used in any change 

let myTask = {
    value: "",
    check: ""
};

function updateLocalStorageOrder() {
    localStorage.clear();
    const items = document.querySelectorAll(".fa-ul > li");
    const updatedOrder = Array.from(items).map((item) => {
        const label = item.querySelector('.item-label').textContent;
        const isChecked = item.querySelector('.item-check').checked;
        return {
            value: label,
            check: isChecked
        };
    });
    emplist = updatedOrder.length;
    console.log(emplist);
    console.log(updatedOrder);

    if (emplist == 0) {
        emptydiv.style.display = "block"; // Set display property to "block"
        elempp.append(emptydiv);
    } else {
        emptydiv.style.display = "none"; // Set display property to "none"
    }

    localStorage.setItem("itemOrder", JSON.stringify(updatedOrder));

    updatedOrder.forEach((task) => {
        localStorage.setItem(task.value, task.check.toString());
    });
}






function loadItemsFromLocalStorage() {
    const itemOrder = JSON.parse(localStorage.getItem("itemOrder"));
    console.log("itemOrder");
    console.log(itemOrder);

    if (itemOrder) {
        if (itemOrder.length === 0) {
            emptydiv.style.display = "block";
        } else {
            emptydiv.style.display = "none";

            itemOrder.forEach((task) => {
                const storedValue = localStorage.getItem(task.value);
                if (task.value !== null) {
                    buildliitem(task);
                    
                }
            });
        }
    }
}







document.addEventListener("DOMContentLoaded", loadItemsFromLocalStorage);


function clearlist() {
    var userConfirmed = window.confirm("Are you sure you want to delete all tasks?");

    if (userConfirmed) {


        const mainlist = document.getElementsByClassName("fa-ul")[0];
        localStorage.clear();
        while (mainlist.firstChild) {
            mainlist.removeChild(mainlist.firstChild);
        }
        updateLocalStorageOrder();

    }

}






function buildliitem(task) {
    const labelValue = task.value;
    const storedValue = localStorage.getItem(labelValue);
    const mainlist = document.getElementsByClassName("fa-ul")[0];
    const li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.classList.add("eachitem");

    li.innerHTML = `
        <section class="item">
            <span class="fa-li"><i class="fas fa-grip-vertical" draggable="true" style="cursor: pointer;"></i></span>
            <input type="checkbox" id="${labelValue}" class="item-check">
            <label for="${labelValue}" class="item-label">${labelValue}</label>
            <div class="menu-container">
                <button class="icon-button menu-button">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <ul class="menu">
                    <li class="comp"><i class="fa fa-check"></i> <button class="inside">Complete</button></li>
                    <li class="del"><i class="fas fa-trash"></i> <button class="inside">Delete</button></li>
                </ul>
            </div>
        </section>
    `;
    
    const checkbox = li.querySelector(".item-check");
    checkbox.checked = task.check === true;

    mainlist.appendChild(li);
}



//used when change the tab

function filterItems(filter) {
    let count = 0;
    const items = document.querySelectorAll(".fa-ul > li");

    items.forEach((item) => {

        const checkbox = item.querySelector(".item-check");

        const labelValue = checkbox.id;

        //const storedValue = localStorage.getItem(labelValue);
        const storedValue = checkbox.checked.toString();
        console.log(storedValue === "true");

        if (filter === "all" || (filter === "completed" && storedValue === "true") || (filter === "pending" && storedValue === "false")) {
            item.style.display = "list-item";
            count++;

        } else {

            item.style.display = "none";

        }
    });
    if (count == 0) {


        emptydiv.style.display = "block"; // Set display property to "block"
        elempp.append(emptydiv);

    }
    else {
        emptydiv.style.display = "none";

    }
}



const node = document.getElementsByClassName("input-text")[0];
node.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
        const newItem = {
            value: node.value,
            check: false // Default value for a new item
        };
        itemOrder.push(newItem);
        console.log(itemOrder);
        buildliitem(newItem);
        updateLocalStorageOrder();
        node.value = "";
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
            updateLocalStorageOrder();
        }


        if (target.textContent === "Delete") {
            var userConfirmed = window.confirm("Are you sure you want to delete this task?");

            if (userConfirmed) {

                const labelElement = listItem.querySelector(".item-label");
                const labelValue = labelElement.textContent;


                const listItemsec = listItem.parentNode;
                const ullistItem = listItemsec.parentNode;
                ullistItem.removeChild(listItemsec);
                const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
                const indexToRemove = itemOrder.indexOf(labelValue);

                if (indexToRemove !== -1) {

                    itemOrder.splice(indexToRemove, 1);//remove from itemorder and update localstorage
                    localStorage.setItem("itemOrder", JSON.stringify(itemOrder));
                }
                updateLocalStorageOrder();
            }

            const menu = target.closest('.item').querySelector('.menu');
            menu.style.display = "none"; // hide the menu after pressing and handling
        }

    }
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



const sortableList = document.querySelector(".sortable-list");
const sortitems = sortableList.querySelectorAll(".eachitem");
const list = document.getElementById("item-list");

 list.addEventListener("mousedown", (e) => {
   
     if (e.target.tagName === "I" && e.target.classList.contains("fa-grip-vertical")) {
        draggingEle = e.target.closest("li");
        setTimeout(() => draggingEle.classList.add("dragging"), 0);
        draggingEle.addEventListener("dragend", () => draggingEle.classList.remove("dragging"));
    }
    else{
        e.preventDefault();
    }
});


const finalsorting = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    
    let siblings = [...sortableList.querySelectorAll(".eachitem:not(.dragging)")];
  
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    
    sortableList.insertBefore(draggingItem, nextSibling);
    updateLocalStorageOrder();
      
}
sortableList.addEventListener("dragover", finalsorting);
sortableList.addEventListener("dragenter", e => e.preventDefault());








document.addEventListener('click', function (event) {
    const menuContainer = event.target.closest('.menu-container');
    const allMenus = document.querySelectorAll('.menu');



    if (!menuContainer) {
        allMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    }
    else {
        if (event.target.classList.contains('fa-ellipsis-h')) {
            const targetParent = event.target.parentNode;
            allMenus.forEach(menu => {
                menu.style.display = 'none';
            });

            const menu = targetParent.nextElementSibling;
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column';
            menu.style.placeContent = 'center';
            menu.classList.toggle('open');
        }
    }
});

const inputField = document.querySelector(".input-text");
const addbtn = document.querySelector(".add");

inputField.addEventListener('keyup', () => {
    addbtn.style.display = 'block';
    if (inputField.value == '') {
        addbtn.style.display = 'none';
    }
});

addbtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!inputField.value) {
        return;
    }

    const itemOrder = JSON.parse(localStorage.getItem("itemOrder")) || [];
    const newItem = {
        value: node.value,
        check: false // Default value for a new item
    };
    itemOrder.push(newItem);
    console.log(itemOrder);
    buildliitem(newItem);
    updateLocalStorageOrder();
    node.value = "";
});












