///////////////////////////////////////////////////////////////////
// Transform Tool viewer extension
// by Philippe Leefsma, August 2015
//
///////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.TransformTool = function (viewer, options) {

  ///////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////
  function TransformTool() {

    var _hitPoint = null;

    var _isDragging = false;

    var _transformMeshTx = null;
    var _transformMeshRx = null;

    var _modifiedFragIdMap = {};

    var _selectedFragProxyMap = {};

    var _transformControlTx = null;
    var _transformControlRx = null;

    ///////////////////////////////////////////////////////////////////////////
    // Creates a dummy mesh to attach control to
    //
    ///////////////////////////////////////////////////////////////////////////
    function createTransformMeshTx() {

      var material = new THREE.MeshPhongMaterial(
        { color: 0xff0000 });

      viewer.impl.matman().addMaterial(
        guid(),
        material,
        true);

      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.0001, 5),
        material);

      sphere.position.set(0, 0, 0);
      return sphere;
    }

    ///////////////////////////////////////////////////////////////////////////
    // on translation change
    //
    ///////////////////////////////////////////////////////////////////////////
    function onTransformChange() {
      for (var fragId in _selectedFragProxyMap) {
        var fragProxy = _selectedFragProxyMap[fragId];

        if (!fragProxy.offsetR) {
          fragProxy.offsetR = new THREE.Vector3(0, 0, 0);
        }
        let position = new THREE.Vector3(
          _transformControlTx.position.x,
          _transformControlTx.position.y,
          _transformControlTx.position.z);


        var quaternion = new THREE.Quaternion(
          _transformControlRx.quaternion.x,
          _transformControlRx.quaternion.y,
          _transformControlRx.quaternion.z,
          _transformControlRx.quaternion.w,
        )
        let euler = new THREE.Euler();
        euler.setFromQuaternion(quaternion);

        document.querySelector('input[name="part-pos-x"]').value = position.x;
        document.querySelector('input[name="part-pos-y"]').value = position.y;
        document.querySelector('input[name="part-pos-z"]').value = position.z;

        document.querySelector('input[name="part-rotation-x"]').value = THREE.Math.radToDeg(euler.x);
        document.querySelector('input[name="part-rotation-y"]').value = THREE.Math.radToDeg(euler.y);
        document.querySelector('input[name="part-rotation-z"]').value = THREE.Math.radToDeg(euler.z);

        transformTo(position, euler, fragProxy);
        _transformControlRx.setPosition(_transformControlTx.position);
        fragProxy.updateAnimTransform();
      }
      viewer.impl.sceneUpdated(true);
    }

    function transformTo(positionVector, eulerAngle, fragProxy) {
      if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
      }

      fragProxy.getAnimTransform();

      let worldMatrix = new THREE.Matrix4();
      fragProxy.getWorldMatrix(worldMatrix);

      let currentPosition = new THREE.Vector3();
      currentPosition.copy(worldMatrix.getPosition().clone());

      let currentPivot = new THREE.Vector3(); // PIVOT
      currentPivot.copy(currentPosition.clone())

      let currentRotation = new THREE.Quaternion(); // ROTATION
      currentRotation.copy(fragProxy.quaternion.clone())

      var geometry = new THREE.BoxGeometry(10, 10, 10);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var mesh = new THREE.Mesh(geometry, material);

      viewer.impl.scene.add(mesh);
      mesh.position.copy(positionVector.clone());
      mesh.position.sub(currentPivot.clone());
      mesh.setRotationFromEuler(eulerAngle);
      mesh.position.applyEuler(eulerAngle.clone());
      mesh.position.add(currentPivot.clone());

      viewer.impl.scene.remove(mesh);

      fragProxy.quaternion.copy(mesh.quaternion.clone());
      fragProxy.position.x = mesh.position.x;
      fragProxy.position.y = mesh.position.y;
      fragProxy.position.z = mesh.position.z;

      fragProxy.updateAnimTransform();
      fragProxy.getAnimTransform();

      let updatedWorldMatrix = new THREE.Matrix4();
      fragProxy.getWorldMatrix(updatedWorldMatrix);

      let newPosition = new THREE.Vector3();
      newPosition.copy(updatedWorldMatrix.getPosition().clone());

      fragProxy.position.x -= (newPosition.x - positionVector.x);
      fragProxy.position.y -= (newPosition.y - positionVector.y);
      fragProxy.position.z -= (newPosition.z - positionVector.z);

      fragProxy.updateAnimTransform();
      viewer.impl.sceneUpdated(true);
    }

    function getCenterOfNodeId(fragProxy) {
      if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
      }
      fragProxy.getAnimTransform();

      let worldMatrix = new THREE.Matrix4();
      fragProxy.getWorldMatrix(worldMatrix);
      let position = new THREE.Vector3();
      return position.setFromMatrixPosition(worldMatrix);
    }
    ///////////////////////////////////////////////////////////////////////////
    // on camera changed
    //
    ///////////////////////////////////////////////////////////////////////////
    function onCameraChanged() {

      _transformControlTx.update();
      _transformControlRx.update();
    }

    ///////////////////////////////////////////////////////////////////////////
    // item selected callback
    //
    ///////////////////////////////////////////////////////////////////////////
    function onItemSelected(event) {


      _selectedFragProxyMap = {};

      //component unselected

      if (!event.fragIdsArray.length) {

        _hitPoint = null;

        _transformControlTx.visible = false;
        _transformControlRx.visible = false;

        _transformControlTx.removeEventListener(
          'objectChange', onTransformChange);
        _transformControlRx.removeEventListener(
          'objectChange', onTransformChange);

        viewer.removeEventListener(
          Autodesk.Viewing.CAMERA_CHANGE_EVENT,
          onCameraChanged);

        return;
      }


      if (_hitPoint) {

        _transformControlTx.visible = true;
        _transformControlRx.visible = true;

        // _transformControlTx.setPosition(_hitPoint);
        // _transformControlRx.setPosition(_hitPoint);

        _transformControlTx.addEventListener(
          'objectChange', onTransformChange);
        _transformControlRx.addEventListener(
          'objectChange', onTransformChange);

        viewer.addEventListener(
          Autodesk.Viewing.CAMERA_CHANGE_EVENT,
          onCameraChanged);

        event.fragIdsArray.forEach(function (fragId) {

          var fragProxy = viewer.impl.getFragmentProxy(
            viewer.model,
            fragId);

          fragProxy.getAnimTransform();

          var offset = {
            x: getCenterOfNodeId(fragProxy).x - fragProxy.position.x,
            y: getCenterOfNodeId(fragProxy).y - fragProxy.position.y,
            z: getCenterOfNodeId(fragProxy).z - fragProxy.position.z,
          };

          fragProxy.offset = offset;

          _transformControlTx.setPosition(getCenterOfNodeId(fragProxy));
          _transformControlRx.setPosition(getCenterOfNodeId(fragProxy));
          _selectedFragProxyMap[fragId] = fragProxy;
          _modifiedFragIdMap[fragId] = {};
        });

        // _transformMesh.quaternion = new THREE.Quaternion(0,0,0,1)
        // _transformControlTx.quaternion = new THREE.Quaternion(0,0,0,1)

        _hitPoint = null;
      }
      else {

        _transformControlTx.visible = false;
        _transformControlRx.visible = false;
      }
    }

    ///////////////////////////////////////////////////////////////////////////
    // normalize screen coordinates
    //
    ///////////////////////////////////////////////////////////////////////////
    function normalize(screenPoint) {

      var viewport = viewer.navigation.getScreenViewport();

      var n = {
        x: (screenPoint.x - viewport.left) / viewport.width,
        y: (screenPoint.y - viewport.top) / viewport.height
      };

      return n;
    }

    ///////////////////////////////////////////////////////////////////////////
    // get 3d hit point on mesh
    //
    ///////////////////////////////////////////////////////////////////////////
    function getHitPoint(event) {
      var screenPoint = {
        x: event.clientX,
        y: event.clientY
      };

      var n = normalize(screenPoint);

      var hitPoint = viewer.utilities.getHitPoint(n.x, n.y);

      return hitPoint;
    }

    ///////////////////////////////////////////////////////////////////////////
    // returns all transformed meshes
    //
    ///////////////////////////////////////////////////////////////////////////
    this.getTransformMap = function () {

      var transformMap = {};

      for (var fragId in _modifiedFragIdMap) {

        var fragProxy = viewer.impl.getFragmentProxy(
          viewer.model,
          fragId);

        fragProxy.getAnimTransform();

        transformMap[fragId] = {
          position: fragProxy.position
        };

        fragProxy = null;
      }

      return transformMap;
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.getNames = function () {

      return ['Dotty.Viewing.Tool.TransformTool'];
    };

    this.getName = function () {

      return 'Dotty.Viewing.Tool.TransformTool';
    };

    ///////////////////////////////////////////////////////////////////////////
    // activates tool
    //
    ///////////////////////////////////////////////////////////////////////////
    this.activate = function () {
      viewer.select([]);

      var bbox = viewer.model.getBoundingBox();

      viewer.impl.createOverlayScene(
        'Dotty.Viewing.Tool.TransformTool');

      _transformControlTx = new THREE.TransformControls(
        viewer.impl.camera,
        viewer.impl.canvas,
        "translate");
      _transformControlRx = new THREE.TransformControls(
        viewer.impl.camera,
        viewer.impl.canvas,
        "rotate");

      _transformControlTx.setSize(
        bbox.getBoundingSphere().radius * 5);
      _transformControlRx.setSize(
        bbox.getBoundingSphere().radius * 5);

      _transformControlTx.visible = false;
      _transformControlRx.visible = false;

      viewer.impl.addOverlay(
        'Dotty.Viewing.Tool.TransformTool',
        _transformControlTx);

      viewer.impl.addOverlay(
        'Dotty.Viewing.Tool.TransformTool',
        _transformControlRx);

      _transformMeshTx = createTransformMeshTx();
      _transformMeshRx = createTransformMeshTx();

      _transformControlTx.attach(_transformMeshTx);
      _transformControlRx.attach(_transformMeshRx);

      viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        onItemSelected);
    };

    ///////////////////////////////////////////////////////////////////////////
    // deactivate tool
    //
    ///////////////////////////////////////////////////////////////////////////
    this.deactivate = function () {

      viewer.impl.removeOverlay(
        'Dotty.Viewing.Tool.TransformTool',
        _transformControlTx);
      viewer.impl.removeOverlay(
        'Dotty.Viewing.Tool.TransformTool',
        _transformControlRx);

      _transformControlTx.removeEventListener(
        'objectChange',
        onTransformChange);
      _transformControlRx.removeEventListener(
        'objectChange',
        onTransformChange);

      _transformControlTx = null;
      _transformControlRx = null;

      viewer.impl.removeOverlayScene(
        'Dotty.Viewing.Tool.TransformTool');

      viewer.removeEventListener(
        Autodesk.Viewing.CAMERA_CHANGE_EVENT,
        onCameraChanged);

      viewer.removeEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        onItemSelected);
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.update = function (t) {

      return false;
    };

    this.handleSingleClick = function (event, button) {


      return false;
    };

    this.handleDoubleClick = function (event, button) {

      return false;
    };


    this.handleSingleTap = function (event) {

      return false;
    };


    this.handleDoubleTap = function (event) {

      return false;
    };

    this.handleKeyDown = function (event, keyCode) {

      return false;
    };

    this.handleKeyUp = function (event, keyCode) {

      return false;
    };

    this.handleWheelInput = function (delta) {

      return false;
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.handleButtonDown = function (event, button) {

      _hitPoint = getHitPoint(event);

      _isDragging = true;

      if (_transformControlTx.onPointerDown(event))
        return true;
      if (_transformControlRx.onPointerDown(event))
        return true;

      //return _transRotControl.onPointerDown(event);
      return false;
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.handleButtonUp = function (event, button) {

      _isDragging = false;

      if (_transformControlTx.onPointerUp(event))
        return true;
      if (_transformControlRx.onPointerUp(event))
        return true;

      //return _transRotControl.onPointerUp(event);
      return false;
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.handleMouseMove = function (event) {

      if (_isDragging) {

        if (_transformControlTx.onPointerMove(event))
          return true;
        if (_transformControlRx.onPointerMove(event))
          return true;

        return false;
      }

      if (_transformControlTx.onPointerHover(event))
        return true;
      if (_transformControlRx.onPointerHover(event))
        return true;

      //return _transRotControl.onPointerHover(event);
      return false;
    };

    ///////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////////////
    this.handleGesture = function (event) {

      return false;
    };

    this.handleBlur = function (event) {

      return false;
    };

    this.handleResize = function () {

    };
  }

  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _self = this;

  _self.tool = null;


  ///////////////////////////////////////////////////////
  // extension load callback
  //
  ///////////////////////////////////////////////////////
  _self.load = function () {

    _self.tool = new TransformTool();

    viewer.toolController.registerTool(_self.tool);

    viewer.toolController.activateTool(_self.tool.getName());

    console.log('Autodesk.ADN.Viewing.Extension.TransformTool loaded');
    return true;
  };

  ///////////////////////////////////////////////////////
  // extension unload callback
  //
  ///////////////////////////////////////////////////////
  _self.unload = function () {

    viewer.toolController.deactivateTool(_self.tool.getName());

    console.log('Autodesk.ADN.Viewing.Extension.TransformTool unloaded');

    return true;
  };

  ///////////////////////////////////////////////////////
  // new random guid
  //
  ///////////////////////////////////////////////////////
  function guid() {

    var d = new Date().getTime();

    var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });

    return guid;
  };
};

Autodesk.ADN.Viewing.Extension.TransformTool.prototype =
  Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.TransformTool.prototype.constructor =
  Autodesk.ADN.Viewing.Extension.TransformTool;

Autodesk.Viewing.theExtensionManager.registerExtension(
  'Autodesk.ADN.Viewing.Extension.TransformTool',
  Autodesk.ADN.Viewing.Extension.TransformTool);

