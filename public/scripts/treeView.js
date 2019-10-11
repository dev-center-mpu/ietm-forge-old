var defaultData = [
  {
    text: "Техническое описание",
    id: "item0"
  },
  {
    text: "Каталог деталей",
    id: "item1",

    nodes: [
      {
        text: "Корпус",
        id: "item1_1"
      },
      {
        text: "Колесо",
        id: "item1_2"
      },
      {
        text: "Шестерня",
        id: "item1_3"
      },
      {
        text: "Двигатель",
        id: "item1_4"
      },
      {
        text: "Выходной вал",
        id: "item1_5"
      },
      {
        text: "Подшипник",
        id: "item1_6"
      }
    ]
  },
  {
    text: "Принцип работы",
    id: "item2",
    nodes: [
      {
        text: "Корпус",
        id: "item2_1"
      }
    ]
  },
  {
    text: "Руководство по разработке",
    id: "item3",
    nodes: [
      {
        text: "Разборка корпуса",
        id: "item3_1"
      },
      {
        text: "Замена шестерней",
        id: "item3_2"
      }
    ]
  },
  {
    text: "Руководство по эксплуатации",
    id: "item4",
    nodes: [
      {
        text: "Смазывание компонентов",
        id: "item4_1"
      }
    ]
  }
];

function onItemSelected(id) {
  console.log(id + " is selected");
}

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
  console.log(id + " Show");
}

function onListHide(id) {
  console.log(id + " Hide");
}
//Для закрытия всех веток
function allNodesClose() {
  let arr = document.querySelectorAll("li");

  for (let j = 0; j < arr.length; j++) {
    $("#treeId")
      .data("treeview")
      .toggleNode(arr[j]);
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
  onItemSelected(this.id);
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
        icon: "https://image.flaticon.com/icons/svg/2181/2181596.svg"
      });
    el[0].id = defaultData[i].id;
    el[0].childNodes[1].classList.add("ul-hover");
    el[0].childNodes[1].onclick = nodeClick;
    el[0].childNodes[1].id = defaultData[i].id;
    branchFormer(defaultData[i], el);
  }

  // Ховеры на элементы вкладок
  $(".li-hover").hover(
    function() {
      onItemMouseEnter(this.id);
    },
    function() {
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
      let icon;
      if (obj.nodes[i].nodes != undefined) {
        icon = "https://image.flaticon.com/icons/svg/2181/2181596.svg";
      } else {
        icon = "https://image.flaticon.com/icons/svg/1063/1063388.svg";
      }

      let child = $("#treeId")
        .data("treeview")
        .addTo(parent, {
          caption: obj.nodes[i].text,
          icon: icon
        });

      child[0].id = obj.nodes[i].id;
      child[0].lastChild.classList.add("li-hover");
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
