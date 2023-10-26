
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
        localStorage.setItem(node.value,"false");
       
        buildliitem(node.value)
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
            
            localStorage.setItem(labelText, checkbox.checked.toString());
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
            localStorage.removeItem(labelValue);

            // Remove the list item from the DOM
            listItem.remove();
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