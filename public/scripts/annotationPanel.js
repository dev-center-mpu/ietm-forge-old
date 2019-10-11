function AnnotationPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.DockingPanel.call(this, container, id, title, options);

    // the style of the docking panel
    // use this built-in style to support Themes on Viewer 4+
    this.container.classList.add('docking-panel-container-solid-color-a');
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "false";

    // this is where we should place the content of our panel
    
    var div = document.createElement('div');
    div.style.margin = '20px';
    var nameLabel = document.createElement("label");
    nameLabel.innerText="Введите название аннотации";
    div.appendChild(nameLabel)
    var nameEditText = document.createElement("input");
    nameEditText.id="annotation-name-editText";
    div.appendChild(nameEditText)
    div.appendChild(document.createElement('br'))
    var textLabel = document.createElement("label");
    textLabel.innerText="Введите текст аннотации";
    div.appendChild(textLabel)
    var textEditText = document.createElement("input");
    textEditText.id="annotation-text-editText";
    div.appendChild(textEditText)
    this.container.appendChild(div);
    // and may also append child elements...

}
AnnotationPanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
AnnotationPanel.prototype.constructor = AnnotationPanel;