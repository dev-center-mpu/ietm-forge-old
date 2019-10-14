var defaultData = [
  {
    text: "Техническое описание",
    id: "item1",
    icon: "https://image.flaticon.com/icons/svg/1500/1500427.svg"
  },
  {
    text: "Каталог деталей",
    id: "item2",
    icon: "https://image.flaticon.com/icons/svg/2181/2181596.svg",
    nodes: [
      {
        text: "Корпус",
        id: "item2_1",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      },
      {
        text: "Зубчатая передача",
        id: "item2_2",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      },
      {
        text: "Двигатель",
        id: "item2_3",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      },
      {
        text: "Тихоходный вал",
        id: "item2_4",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      },
      {
        text: "Подшипники",
        id: "item2_5",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      }
    ]
  },
  {
    text: "Принцип работы",
    id: "item3",
    icon: "https://image.flaticon.com/icons/svg/2181/2181596.svg",
    nodes: [
      {
        text: "Работа редуктора",
        id: "item3_1",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      }
    ]
  },
  {
    text: "Руководство по разработке",
    id: "item4",
    icon: "https://image.flaticon.com/icons/svg/2181/2181596.svg",
    nodes: [
      {
        text: "Разборка корпуса",
        id: "item4_1",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      },
      {
        text: "Замена шестерней",
        id: "item4_2",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      }
    ]
  },
  {
    text: "Руководство по эксплуатации",
    id: "item5",
    icon: "https://image.flaticon.com/icons/svg/2181/2181596.svg",
    nodes: [
      {
        text: "Смазывание компонентов",
        id: "item5_1",
        icon: "https://image.flaticon.com/icons/svg/1063/1063388.svg"
      }
    ]
  },
  {
    text: "Тест",
    id: "item6",
    icon: "https://image.flaticon.com/icons/svg/1010/1010759.svg"
  }
];

function onItemSelected(item) {

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
            elem.onmouseenter = function () {
                NOP_VIEWER.select(parseInt(nodeId));
            }
            elem.onmouseleave = function () {
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

// console.log(id + " is selected");

// if (ietm[id]) {
//     let page = ietm[id];
//     if (id.match(/item2_?/) === null) {
//         revertChangesAfterAnimaton();
//     }
//     page.init();
//     if (page.content) {
//         document.querySelector('#right').innerHTML = page.content;
//     }
//     document.querySelectorAll('.highlightLink').forEach(elem => {
//         let nodeId = elem.getAttribute('nodeId');
//         elem.onmouseenter = function () {
//             NOP_VIEWER.select(parseInt(nodeId));
//         }
//         elem.onmouseleave = function () {
//             NOP_VIEWER.select(0);
//         }
//     })
//     unloadAnimation();
//     if (page.animation) {
//         loadAnimation(page.animation);
//         if (page.animation.autoPlay) playButton.onclick()
//     }
//     if (page.annotations) {
//         for (let a of page.annotations) {
//             addAnnotation(a.point.x, a.point.y, a.point.z, a.text, a.id, a.hide);
//         }
//     }

// }


function onItemUnselected(id) {
    console.log(id + " was unselected");
}

function onItemMouseEnter(id) {
    console.log(id + " MouseEnter");
}

function onItemMouseLeave(id) {
    console.log(id + " MouseLeft");
}
function onListShow(id) {
  //allNodesClose();
  let shownListPage = ietm[id];
  console.log(shownListPage)
  if (shownListPage.animation) {
    revertChangesAfterAnimaton();
    loadAnimation(shownListPage.animation)
    if (shownListPage.animation.autoPlay) playButton.onclick()
  }

}

function onListHide(id) {
  if (id === 'item2') {
    revertChangesAfterAnimaton();
    loadAnimation(ietm['item2_0'].animation);
    playButton.onclick();
  }
}

//Для закрытия всех веток
function allNodesClose(exceptionId) {
    let arr = document.querySelectorAll("li");

    for (let j = 0; j < arr.length; j++) {
        console.log($("#treeId").data("treeview"))
        $("#treeId").data("treeview").toggleNode(arr[j]);
    }
}

elements2 = document.querySelectorAll(".interaction-ul");
elements3 = document.querySelectorAll(".tree-node");

let lastItem;
// Запомнинание и оповещение о выделенном элементе и прошлом
function onTreeItemCLick() {
    if (lastItem) {
        lastItem.style.color = "black";
        lastItem.style.fontWeight = "normal";
        onItemUnselected(lastItem.id);
    }
    onItemSelected(this);
    this.style.color = "blue";
    this.style.fontWeight = "bold";
    lastItem = this;
}
// Уведомление при открытии/закрытии основной владки
function nodeClick() {
    if (
        this.offsetParent.classList[0] == "expanded" ||
        this.offsetParent.classList[1] == "expanded"
    ) {
        onListHide(this.offsetParent.id);
    } else {
        onListShow(this.offsetParent.id);
    }
}

treeFormer();

function treeFormer() {
    for (let i = 0; i < defaultData.length; i++) {
        let el = $("#treeId")
            .data("treeview")
            .addTo(null, {
                caption: defaultData[i].text,
                icon: defaultData[i].icon
            });
        if (defaultData[i].nodes != undefined) {
            el[0].childNodes[1].classList.add("ul-hover");
            el[0].childNodes[1].onclick = nodeClick;
        }
        else{
            el[0].childNodes[1].classList.add("li-hover");
        }
        el[0].id = defaultData[i].id;
        el[0].childNodes[1].id = defaultData[i].id;
        branchFormer(defaultData[i], el);
    }

    // Ховеры на элементы вкладок
    $(".li-hover").hover(
        function () {
            onItemMouseEnter(this.id);
        },
        function () {
            onItemMouseLeave(this.id);
        }
    );
    let elements = document.querySelectorAll(".node-toggle");
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = nodeClick;
    }
}

function branchFormer(obj, parent) {
    if (obj.nodes != undefined) {
        for (let i = 0; i < obj.nodes.length; i++) {
            let child = $("#treeId")
                .data("treeview")
                .addTo(parent, {
                    caption: obj.nodes[i].text,
                    icon: obj.nodes[i].icon
                });

            if (obj.nodes[i].nodes != undefined) {
                child[0].lastChild.classList.add("ul-hover");
                child[0].childNodes[1].onclick = nodeClick;
            }
            else{
                child[0].lastChild.classList.add("li-hover"); 
            }
            child[0].id = obj.nodes[i].id;
            child[0].lastChild.id = obj.nodes[i].id;
            branchFormer(obj.nodes[i], child);
        }
    }
    return;
}

function NodeToggle(name, bool) {
    nodeNotification(name, elements2[name[4] - 2].style.display);
}

for (const item of document.querySelectorAll(".li-hover")) {
    item.onclick = onTreeItemCLick;
}
