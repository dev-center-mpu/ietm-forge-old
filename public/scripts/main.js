var viewer;
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTA3LTA3LTU3LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXI1LmYzZA'
var options = {
    env: 'AutodeskProduction',
    accessToken: '',
    api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
}

$.get('/auth', (data) => {
    options.accessToken = JSON.parse(data).access_token;
    Autodesk.Viewing.Initializer(options, function onInitialized() {
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
})

function onDocumentLoadSuccess(doc) {
    // A document contains references to 3D and 2D geometries.
    var geometries = doc.getRoot().search({ 'type': 'geometry' });
    if (geometries.length === 0) {
        console.error('Document contains no geometries.');
        return;
    }

    // Choose any of the avialable geometries
    var initGeom = geometries[0];

    // Create Viewer instance
    var viewerDiv = document.getElementById('viewer');
    var config = {
        extensions: []
    };
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, config);

    // Load the chosen geometry
    var svfUrl = doc.getViewablePath(initGeom);
    var modelOptions = {
        sharedPropertyDbPath: doc.getPropertyDbPath()
    };
    viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);


    isStarted = true;
    annotationsInit();

}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
}

function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};
function iterationCopy(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            // if the value is a nested object, recursively copy all it's properties
            if (isObject(src[prop])) {
                target[prop] = iterationCopy(src[prop]);
            } else {
                target[prop] = src[prop];
            }
        }
    }
    return target;
}

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(10); // Сделать фон серым
        viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
        viewer.setGroundShadow(0);

        for (let nodeId of viewer.impl.model.getData().fragments.fragId2dbId) {
            addObject(nodeId)
        }

        for (let i = 0; i < viewer.impl.model.getFragmentList().materialids.length; i++) {
            //viewer.impl.model.getFragmentList().materialids[i] = i;
        }


        player.addEventListener('frame', function (e) {
            let currentTime = e.detail.currentTime;
            let lerpKeys = [];

            for (let i = 0; i < clipProps.length; i++) lerpKeys.push(getLerpKey(i, currentTime));

            for (let key of lerpKeys) {
                switch (key.for) {
                    case 'node':
                        if (key.params.position) for (let node of key.nodeId) setPosition(key.params.position, node);
                        if (key.params.rotation) for (let node of key.nodeId) setRotation(key.params.rotation, node);
                        if (key.params.opacity !== undefined) for (let node of key.nodeId) setOpacity(node, key.params.opacity);
                        break;
                    case 'annotation':
                        if (key.params.opacity !== undefined) setAnnotationOpacity(key.annotationId, key.params.opacity);
                        break;
                    case 'camera':
                        let navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());
                        navTool.setCameraUpVector(key.params.up);
                        navTool.setPosition(key.params.position);
                        navTool.setTarget(key.params.target);
                        break;
                }
            }
        })
    })
}

function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

////////////////////////////////////////////////////////////////
////////////// TRANSFORM FUNCTIONS
////////////////////////////////////////////////////////////////

var objects = {};

function addObject(nodeId) {
    objects[nodeId] = {
        position: getCenterOfNodeId(nodeId),
        rotation: new THREE.Euler(0, 0, 0),
        pivot: getCenterOfNodeId(nodeId)
    }
}

function getObject(nodeId) {
    return objects[nodeId];
}


function getFragProxy(nodeId) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);

    if (fragId == -1) {
        console.error(`nodeId ${rotatedNodeId} not found`);
        return;
    }

    let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, fragId);

    return fragProxy;
}

function setRotation(eulerAngle, rotatedNodeId, pivot = getCenterOfNodeId(rotatedNodeId)) {
    getFragProxy(rotatedNodeId);

    // Reset Transform to default

    fragProxy.updateAnimTransform();
    fragProxy.getAnimTransform();

    // Get World matrix
    let worldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(worldMatrix);

    // Get position from world matrix
    let position = new THREE.Vector3();
    position.copy(worldMatrix.getPosition().clone());

    // Rotating quartenion
    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(eulerAngle.clone());

    // Rotate avatar around pivot

    var mesh = new THREE.Object3D();

    viewer.impl.scene.add(mesh);
    mesh.parent.localToWorld(mesh.position.clone());
    mesh.position.copy(position.clone());
    mesh.position.sub(pivot.clone()); // remove the offset
    mesh.position.applyEuler(eulerAngle.clone()); // rotate the POSITION
    mesh.position.add(pivot.clone()); // re-add the offset
    mesh.parent.worldToLocal(mesh.position.clone());
    mesh.setRotationFromEuler(eulerAngle);
    viewer.impl.scene.remove(mesh);

    fragProxy.quaternion.copy(mesh.quaternion.clone());

    fragProxy.updateAnimTransform();
    fragProxy.getAnimTransform();

    let updatedWorldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(updatedWorldMatrix);

    let newPosition = new THREE.Vector3();
    newPosition.copy(updatedWorldMatrix.getPosition().clone());

    // let offsetR = new THREE.Vector3();
    // offsetR.set(
    //     newPosition.x - position.x,
    //     newPosition.y - position.y,
    //     newPosition.z - position.z,
    // );

    // fragProxy.offsetR = offsetR;

    fragProxy.position.x += (position.x - newPosition.x) + (mesh.position.x - position.x);
    fragProxy.position.y += (position.y - newPosition.y) + (mesh.position.y - position.y);
    fragProxy.position.z += (position.z - newPosition.z) + (mesh.position.z - position.z);

    fragProxy.updateAnimTransform();
    viewer.impl.sceneUpdated(true);
}

function getCenterOfNodeId(nodeId) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);
    if (fragId == -1) {
        console.error(`nodeId ${nodeId} not found`);
        return;
    }

    let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, fragId);
    fragProxy.getAnimTransform();

    let worldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(worldMatrix);

    return worldMatrix.getPosition().clone();
}

function transformTo(positionVector, eulerAngle, nodeId) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);
    if (fragId == -1) {
        console.error(`nodeId ${nodeId} not found`);
        return;
    }

    let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, fragId);
    fragProxy.getAnimTransform();

    let worldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(worldMatrix);

    let currentPosition = new THREE.Vector3();
    currentPosition.copy(worldMatrix.getPosition().clone());

    let currentPivot = new THREE.Vector3(); // PIVOT
    currentPivot.copy(currentPosition.clone())
    //currentPivot.set(0, 0, 0);

    let currentRotation = new THREE.Quaternion(); // ROTATION
    currentRotation.copy(fragProxy.quaternion.clone())

    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh( geometry, material );

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

function setPosition(positionVector, eulerAngle, nodeId) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);
    if (fragId == -1) {
        console.error(`nodeId ${nodeId} not found`);
        return;
    }

    let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, fragId);
    fragProxy.getAnimTransform();

    let worldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(worldMatrix);

    let currentPosition = new THREE.Vector3();
    currentPosition.copy(worldMatrix.getPosition().clone());

    let currentPivot = new THREE.Vector3(); // PIVOT
    currentPivot.copy(currentPosition.clone())
    //currentPivot.set(0, 0, 0);

    let currentRotation = new THREE.Quaternion(); // ROTATION
    currentRotation.copy(fragProxy.quaternion.clone())

    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh( geometry, material );

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

function getPosition(nodeId) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);
    if (fragId == -1) {
        console.error(`nodeId ${nodeId} not found`);
        return;
    }

    let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, fragId);
    fragProxy.getAnimTransform();

    // Get World matrix
    let worldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(worldMatrix);

    // Get position from world matrix
    let position = new THREE.Vector3();
    position.copy(worldMatrix.getPosition().clone());

    return position;
}

function setOpacity(nodeId, opacity) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);

    if (fragId == -1) {
        console.error(`nodeId ${nodeId} not found`);
        return;
    }

    let fragList = viewer.impl.model.getFragmentList();

    //console.log(viewer.impl.getFragmentProxy(viewer.impl.model, fragId))

    let m = fragList.getMaterial(fragId);
    m.transparent = true;
    m.opacity = opacity;

    fragList.setMaterial(fragId, m);
    viewer.impl.invalidate(true);
    viewer.impl.sceneUpdated(true);
}

function setColor(nodeId, color) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(nodeId);
    if (fragId == -1) {
        console.error(`nodeId ${nodeId} not found`);
        return;
    }

    let fragList = viewer.impl.model.getFragmentList();

    let m = fragList.getMaterial(fragId);
    m.opaque_albedo = color;

    fragList.setMaterial(fragId, m);
    viewer.impl.invalidate(true);
    viewer.impl.sceneUpdated(true);
}

///////////////////////////////////////////////////////
/////////   PLAYER
///////////////////////////////////////////////////////

var activeClip = undefined;

var player = document.getElementById('player');
var playButton = document.getElementById('playBtn');
var pauseButton = document.getElementById('pauseBtn');
var timeline = document.getElementById('customRange1');
var time = document.getElementById('time');

function fancyTimeFormat(ms) {
    var mins = ~~(((ms / 1000) % 3600) / 60);
    var secs = ~~(ms / 1000) % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
}

timeline.oninput = function (e) {
    let precent = e.target.value / 100.0;
    activeClip.currentTime = activeClip.duration * precent;
    time.innerHTML = `${fancyTimeFormat(activeClip.currentTime)} / ${fancyTimeFormat(activeClip.duration)}`;
    player.dispatchEvent(new CustomEvent('frame', {
        detail: { value: activeClip.currentTime / activeClip.duration, currentTime: activeClip.currentTime }
    }));
}

var interval = {};

playButton.onclick = function () {
    clearInterval(interval);

    let start = Date.now();
    let oldTime = Date.now();

    if (activeClip.currentTime >= activeClip.duration) {
        activeClip.currentTime = 0;
    }

    interval = setInterval(function () {
        oldTime = start;
        start = Date.now();
        let dt = start - oldTime;
        if (activeClip.isPlaying) {
            activeClip.currentTime += dt;
            player.dispatchEvent(new CustomEvent('frame', {
                detail: { value: activeClip.currentTime / activeClip.duration, currentTime: activeClip.currentTime, dt }
            }));
            if (activeClip.currentTime >= activeClip.duration) {
                if (activeClip.loop) {
                    activeClip.currentTime = 0;
                } else {
                    pauseButton.onclick();
                    clearInterval(interval);
                }
            }
            timeline.value = (activeClip.currentTime / activeClip.duration) * 100.0;
            time.innerHTML = `${fancyTimeFormat(activeClip.currentTime)} / ${fancyTimeFormat(activeClip.duration)}`;
        }
    }, 4)

    activeClip.isPlaying = true;
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
}

pauseButton.onclick = function () {
    activeClip.isPlaying = false;
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
}

var clipProps = [];

function getPropIndex(prop) {
    for (let i = 0; i < clipProps.length; i++) {
        if (clipProps[i].for === prop.for) {
            switch (prop.for) {
                case 'node':
                    if (arraysEqual(clipProps[i].nodeId, prop.nodeId)) return i;
                    break;
                case 'annotation':
                    if (clipProps[i].annotationId === prop.annotationId) return i;
                    break;
                case 'camera':
                    return i;
            }
        }
    }

    return -1;
}

function pushProp(prop) {
    switch (prop.for) {
        case 'node': return clipProps.push({ for: prop.for, nodeId: prop.nodeId, keys: [] }) - 1;
        case 'annotation': return clipProps.push({ for: prop.for, annotationId: prop.annotationId, keys: [] }) - 1;
        case 'camera': return clipProps.push({ for: prop.for, keys: [] }) - 1;
    }
}

function pushKey(propIndex, at, params) {
    clipProps[propIndex].keys.push({ at, params });
}

function getLerpKey(propIndex, time) {
    let prop = clipProps[propIndex];
    let prevKey = prop.keys[0];
    let nextKey = prop.keys[prop.keys.length - 1];

    for (let key of prop.keys) {
        if (key.at <= time && key.at > prevKey.at) prevKey = key;
        if (key.at > time && key.at < nextKey.at) nextKey = key;
    }

    let relation = (time - prevKey.at) / (nextKey.at - prevKey.at);

    let lerpKey = { for: prop.for, params: {} };

    // TODO: Разрешить баги:
    // Нельзя совершать вращение и перемещение одновременно
    // Нельзя в разное время менять либо вращене либо позиционирование одного нода
    // Инициализация значений

    switch (prop.for) {
        case 'node':
            lerpKey.nodeId = prop.nodeId;

            if (prevKey.params.rotation !== undefined) {
                if (relation === Infinity) {
                    lerpKey.params.rotation = prevKey.params.rotation;
                } else if (relation === -Infinity || isNaN(relation)) {
                    lerpKey.params.rotation = nextKey.params.rotation;
                } else {
                    let euler = new THREE.Euler();
                    euler.set(
                        lerp(prevKey.params.rotation.x, nextKey.params.rotation.x, relation),
                        lerp(prevKey.params.rotation.y, nextKey.params.rotation.y, relation),
                        lerp(prevKey.params.rotation.z, nextKey.params.rotation.z, relation),
                    );
                    lerpKey.params.rotation = euler;
                }
            } else if (prevKey.params.position !== undefined) {
                if (relation === Infinity) {
                    lerpKey.params.position = prevKey.params.position;
                } else if (relation === -Infinity || isNaN(relation)) {
                    lerpKey.params.position = nextKey.params.position;
                } else {
                    let vector = new THREE.Vector3();
                    vector.set(
                        lerp(prevKey.params.position.x, nextKey.params.position.x, relation),
                        lerp(prevKey.params.position.y, nextKey.params.position.y, relation),
                        lerp(prevKey.params.position.z, nextKey.params.position.z, relation)
                    );
                    lerpKey.params.position = vector;
                }
            }

            if (prevKey.params.opacity !== undefined) {
                if (relation === Infinity) {
                    lerpKey.params.opacity = prevKey.params.opacity;
                } else if (relation === -Infinity || isNaN(relation)) {
                    lerpKey.params.opacity = nextKey.params.opacity;
                } else {
                    lerpKey.params.opacity = lerp(prevKey.params.opacity, nextKey.params.opacity, relation);
                }
            }
            break;
        case 'annotation':
            lerpKey.annotationId = prop.annotationId;

            if (prevKey.params.opacity !== undefined) {
                if (relation === Infinity) {
                    lerpKey.params.opacity = prevKey.params.opacity
                } else if (relation === -Infinity || isNaN(relation)) {
                    lerpKey.params.opacity = nextKey.params.opacity
                } else {
                    lerpKey.params.opacity = lerp(prevKey.params.opacity, nextKey.params.opacity, relation);
                }
            }
            break;
        case 'camera':
            if (relation === Infinity) {
                lerpKey.params = prevKey.params;
            } else if (relation === -Infinity || isNaN(relation)) {
                lerpKey.params = nextKey.params;
            } else {
                let upVec = new THREE.Vector3();
                upVec.set(
                    lerp(prevKey.params.up.x, nextKey.params.up.x, relation),
                    lerp(prevKey.params.up.y, nextKey.params.up.y, relation),
                    lerp(prevKey.params.up.z, nextKey.params.up.z, relation),
                );
                let posVec = new THREE.Vector3();
                posVec.set(
                    lerp(prevKey.params.position.x, nextKey.params.position.x, relation),
                    lerp(prevKey.params.position.y, nextKey.params.position.y, relation),
                    lerp(prevKey.params.position.z, nextKey.params.position.z, relation),
                );
                let tarVec = new THREE.Vector3();
                tarVec.set(
                    lerp(prevKey.params.target.x, nextKey.params.target.x, relation),
                    lerp(prevKey.params.target.y, nextKey.params.target.y, relation),
                    lerp(prevKey.params.target.z, nextKey.params.target.z, relation),
                );
                lerpKey.params.up = upVec;
                lerpKey.params.position = posVec;
                lerpKey.params.target = tarVec;
            }
            break;
    }

    return lerpKey;
}

function unloadAnimation() {
    clearInterval(interval);
    timeline.value = 0;
    if (activeClip) {
        activeClip.isPlaying = false;
        activeClip.currentTime = 0;
        delete activeClip.isPlaying;
        delete activeClip.currentTime;
    }
    //revertChangesAfterAnimaton();
    activeClip = undefined;
    player.style.display = 'none';
    clipProps = [];
}

function loadAnimation(clip) {
    unloadAnimation();
    activeClip = clip;

    timeline.value = 0;
    activeClip.isPlaying = false;
    activeClip.currentTime = 0;

    for (let frame of activeClip.frames) {
        for (let prop of frame.properties) {
            let index = getPropIndex(prop);
            if (index === -1) index = pushProp(prop);
            pushKey(index, frame.at, prop.params);
        }
    }

    player.style.display = 'block';
    time.innerHTML = `${fancyTimeFormat(activeClip.currentTime)} / ${fancyTimeFormat(activeClip.duration)}`;
}

function resetScene() {
    viewer.isolate(0);
    viewer.select(0);
    viewer.fitToView(0);
    revertChangesAfterAnimaton();
}

function revertChangesAfterAnimaton() {
    var navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());
    navTool.setCameraUpVector(new THREE.Vector3(0, 1, 0));
    new Autodesk.Viewing.Navigation(viewer.getCamera());

    let nodeIds = viewer.model.getData().fragments.fragId2dbId;

    for (let i = 0; i < nodeIds.length; i++) {
        let fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, i);

        fragProxy.getAnimTransform();
        fragProxy.position.set(0, 0, 0);
        fragProxy.quaternion.set(0, 0, 0, 1);
        fragProxy.updateAnimTransform();
    }

    viewer.impl.sceneUpdated(true);
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

