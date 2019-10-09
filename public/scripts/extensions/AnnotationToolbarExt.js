function AnnotationToolbarExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null;
}

AnnotationToolbarExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
AnnotationToolbarExtension.prototype.constructor = AnnotationToolbarExtension;

AnnotationToolbarExtension.prototype.load = function () {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    return true;
};

AnnotationToolbarExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

AnnotationToolbarExtension.prototype.createUI = function () {
    var viewer = this.viewer;
    var panel = this.panel;

    // button to show the docking panel
    var toolbarButtonShowDockingPanel = new Autodesk.Viewing.UI.Button('showMyAwesomePanel');
    toolbarButtonShowDockingPanel.addClass("annotation-button");
    toolbarButtonShowDockingPanel.onClick = function (e) {
        // if null, create it
        annotationMode = !annotationMode;

        if (panel == null) {
            panel = new AnnotationPanel(viewer, viewer.container,
                'annotationPanel', 'Annotation extension');
        }
        // show/hide docking panel
        panel.setVisible(!panel.isVisible());
    };
    // myAwesomeToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    /* 
    .myAwesomeToolbarButton {
        background-image: url(/img/myAwesomeIcon.png);
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: center;
    }*/
    toolbarButtonShowDockingPanel.addClass('annotationBtn'); //myAwesomeToolbarButton
    toolbarButtonShowDockingPanel.setToolTip('Annotations');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('AnnotationToolbar');
    this.subToolbar.addControl(toolbarButtonShowDockingPanel);

    viewer.toolbar.addControl(this.subToolbar);
};

AnnotationToolbarExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('AnnotationToolbarExtension', AnnotationToolbarExtension);