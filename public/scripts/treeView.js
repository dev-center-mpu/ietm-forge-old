
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
            let page = ietm[item.id];
            if (item.id.match(/item2_?/) === null) {
                revertChangesAfterAnimaton();
            }
            page.init();
            if (page.content) {
                document.querySelector('#right').innerHTML = page.content;
            }
            document.querySelectorAll('.highlightLink').forEach(elem => {
                let nodeId = elem.getAttribute('nodeId');
                elem.onmouseenter = function() {
                    NOP_VIEWER.select(parseInt(nodeId));
                }
                elem.onmouseleave = function() {
                    NOP_VIEWER.select(0);
                }
            })
            unloadAnimation();
            if (page.animation) {
                loadAnimation(page.animation);
                if (page.animation.autoPlay) playButton.onclick()
            }
            if (page.annotations) {
                for (let a of page.annotations) {
                    addAnnotation(a.point.x, a.point.y, a.point.z, a.text, a.id, a.hide);
                }
            }
        } else console.error('Paragraph not found. Check ietm.js')
    }
}