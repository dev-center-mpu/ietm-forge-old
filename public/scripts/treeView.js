var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}

for (const item of document.querySelectorAll(".treeItem")) {
    item.onclick = () => {
        if (ietm[item.id]) {
            ietm[item.id].init();
            document.querySelector('#right').innerHTML = ietm[item.id].content;
        } else console.error('Paragraph not found. Check ietm.js')
        //alert(item.id);
    }
}