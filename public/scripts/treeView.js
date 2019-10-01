var toggler = document.getElementsByClassName("caret");
var i;
var lastItem;

for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}

for (const item of document.querySelectorAll(".treeItem")) {
    item.onclick = onTreeItemCLick;
}

function onTreeItemCLick() {
    alert(this.id);
    if (lastItem) {
        lastItem.style.backgroundColor = "white";
    }
    this.style.backgroundColor = "grey";
    lastItem = this;
}