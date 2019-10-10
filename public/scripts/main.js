
var viewer;
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTA3LTA3LTU3LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXI1LmYzZA'
var documentId2 = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTAxLTE2LTI5LTU0LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXIyLmYzZA';

var isStarted = false;
var annotationMode = false;
var annotation;
var annotations = {};


var options = {
    env: 'AutodeskProduction',
    accessToken: '',
    api: 'derivativeV2'    // for models uploaded to EMEA change this option to 'derivativeV2_EU'
};

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
        extensions: initGeom.extensions() || []
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

/**
 * Autodesk.Viewing.Document.load() failure callback.
 */
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

/**
 * viewer.loadModel() success callback.
 * Invoked after the model's SVF has been initially loaded.
 * It may trigger before any geometry has been downloaded and displayed on-screen.
 */

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

document.querySelector("#viewer").addEventListener("click", onMouseClick);

function onMouseClick(e) {
    var x = e.clientX,
        y = e.clientY;
    var res = viewer.impl.castRay(x - document.querySelector("#left").clientWidth, y, true);

    if (res) {
        pos = viewer.impl.clientToWorld(e.clientX - document.querySelector("#left").clientWidth, e.clientY);
        console.log(pos.point)
        onItemClick(pos.point);
    }
}

document.addEventListener('mousemove', onMouseUpdate, false);

function onMouseUpdate(e) {
    if (isStarted) {
        update();
    }
}

function update() {
    for (const id in this.annotations) {
        let p2 = new THREE.Vector3(this.annotations[id].x, this.annotations[id].y, this.annotations[id].z);
        if (!viewer.impl.camera.position.equals(p2)) {
            // p2.project(viewer.impl.camera);
            clientPos = viewer.impl.worldToClient(p2, viewer.impl.camera);
            p2.x = clientPos.x;

            p2.y = clientPos.y;
            document.querySelector('#annotation-' + id).style.left = p2.x + "px";
            document.querySelector('#annotation-' + id).style.top = p2.y + "px";
            document.querySelector('#annotation-index-' + id).style.left = p2.x - 15 + "px";
            document.querySelector('#annotation-index-' + id).style.top = p2.y - 15 + "px";
        }
    }
    if (this.annotations.length > 0)
        this.changeVisibilityOfAnnotations();

}

function onItemClick(item) {

}

function setAnotationPosition(id) {
    let p2 = new THREE.Vector3(this.annotations[id].x, this.annotations[id].y, this.annotations[id].z);
    if (!viewer.impl.camera.position.equals(p2)) {
        // p2.project(viewer.impl.camera);
        clientPos = viewer.impl.worldToClient(p2, viewer.impl.camera);
        p2.x = clientPos.x;

        p2.y = clientPos.y;
        document.querySelector('#annotation-' + id).style.left = p2.x + "px";
        document.querySelector('#annotation-' + id).style.top = p2.y + "px";
        document.querySelector('#annotation-index-' + id).style.left = p2.x - 15 + "px";
        document.querySelector('#annotation-index-' + id).style.top = p2.y - 15 + "px";
    }
}

function addAnnotation(x, y, z, annotationText, id, flag) {

    this.annotations[id] = {
        x: x,
        y: y,
        z: z,
        text: annotationText
    }

    displayAnnotation(id);
    setAnotationPosition(id);

    let annotationNumber = document.querySelector("#annotation-index-" + id);
    annotationNumber.dispatchEvent(new Event("click"));
    if (!flag)
        setAnnotationOpacity(index, 0);
    return id;
}

function setAnnotationOpacity(id, opacity) {
    let idStyle = document.querySelector("#annotation-index-" + id).style;
    let anStyle = document.querySelector('#annotation-' + id).style;
    idStyle.opacity = opacity;
    anStyle.opacity = opacity;
}

function annotationsInit() {
    for (const id in this.annotations) {
        this.displayAnnotation(id);
    }

}

function displayAnnotation(id) {
    const annotation = document.createElement('div');
    annotation.id = 'annotation-' + id;
    annotation.classList.add('annotation', 'hidden');
    document.querySelector('#viewer').appendChild(annotation);
    const annotationText = document.createElement('p');
    annotationText.id = 'annotation-text-' + id;
    annotationText.innerText = this.annotations[id].text;
    annotationText.style.fontSize = "15px";
    annotation.appendChild(annotationText);
    const annotationNumber = document.createElement('div');
    annotationNumber.id = 'annotation-index-' + id;
    annotationNumber.innerText = + id;
    annotationNumber.classList.add('annotation-number');
    annotationNumber.addEventListener('click', () => this.hideAnnotation(id));
    document.querySelector('#viewer').appendChild(annotationNumber);
}

function hideAnnotation(id) {
    const annotation = document.querySelector('#annotation-' + id);
    const hidden = annotation.classList.contains('hidden');
    document.querySelector('#annotation-text-' + id).innerHTML = hidden ? this.annotations[id].text : '';
    if (hidden) {
        annotation.classList.remove('hidden');
    } else
        annotation.classList.add('hidden');
}

function getClosestAnnotation() {
    let indexOfClosest;
    let distToClosest = Math.pow(2, 32);
    for (const id in this.annotations) {
        const camPos = this.viewer.impl.camera.position;
        const pPos = this.annotations[id];
        const dist = Math.sqrt(Math.pow((camPos.x - pPos.x), 2) + Math.pow((camPos.y - pPos.y), 2) + Math.pow((camPos.z - pPos.z), 2));
        if (distToClosest > dist) {
            distToClosest = dist;
            indexOfClosest = +id;
        }
    }
    return indexOfClosest;
}

function changeVisibilityOfAnnotations() {
    for (const id in this.annotations) {
        document.querySelector('#annotation-' + id).style.zIndex = this.getClosestAnnotation() == id ? 2 : 1;
        document.querySelector('#annotation-index-' + id).style.zIndex = this.getClosestAnnotation() == id ? 2 : 1;
    }
}


function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(10); // Сделать фон серым
        viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
        viewer.setGroundShadow(0);
        //viewer.hide(4)

        player.addEventListener('frame', function (e) {
            let currentTime = e.detail.currentTime;
            let prevFrame = activeClip.frames[0];
            let nextFrame = activeClip.frames[activeClip.frames.length - 1];

            for (let i = 0; i < activeClip.frames.length; i++) {
                let frameTime = activeClip.frames[i].at;
                if (frameTime <= currentTime && frameTime > prevFrame.at) prevFrame = activeClip.frames[i];
                if (frameTime > currentTime && frameTime < nextFrame.at) nextFrame = activeClip.frames[i];
            }

            let intersection = prevFrame.data.map(d => {
                for (let i = 0; i < nextFrame.data.length; i++) {
                    if (Array.isArray(d.nodeId) && Array.isArray(nextFrame.data[i].nodeId)) {
                        if (arraysEqual(d.nodeId, nextFrame.data[i].nodeId)) {
                            return {
                                nodeId: d.nodeId,
                                from: d.transform,
                                to: nextFrame.data[i].transform
                            }
                        }
                    }
                    else if (d.nodeId === nextFrame.data[i].nodeId) return {
                        nodeId: d.nodeId,
                        from: d.transform,
                        to: nextFrame.data[i].transform
                    }
                }
            })

            if (intersection[0]) {
                for (let i = 0; i < intersection.length; i++) {
                    if (intersection[i].nodeId === 'camera') {
                        if (intersection[i].from.up && intersection[i].to.up) {
                            let upVec = new THREE.Vector3();
                            upVec.set(
                                lerp(intersection[i].from.up.x, intersection[i].to.up.x, e.detail.value),
                                lerp(intersection[i].from.up.y, intersection[i].to.up.y, e.detail.value),
                                lerp(intersection[i].from.up.z, intersection[i].to.up.z, e.detail.value),
                            );
                            var navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());
                            navTool.setCameraUpVector(upVec);
                        }
                        if (intersection[i].from.position && intersection[i].to.position) {
                            let posVec = new THREE.Vector3();
                            posVec.set(
                                lerp(intersection[i].from.position.x, intersection[i].to.position.x, e.detail.value),
                                lerp(intersection[i].from.position.y, intersection[i].to.position.y, e.detail.value),
                                lerp(intersection[i].from.position.z, intersection[i].to.position.z, e.detail.value),
                            );
                            var navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());
                            navTool.setPosition(posVec);
                        }
                        if (intersection[i].from.position && intersection[i].to.position) {
                            let tarVec = new THREE.Vector3();
                            tarVec.set(
                                lerp(intersection[i].from.target.x, intersection[i].to.target.x, e.detail.value),
                                lerp(intersection[i].from.target.y, intersection[i].to.target.y, e.detail.value),
                                lerp(intersection[i].from.target.z, intersection[i].to.target.z, e.detail.value),
                            );
                            var navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());
                            navTool.setTarget(tarVec);
                        }
                    } else {
                        if (intersection[i].from.rotation && intersection[i].to.rotation) {
                            let euler = new THREE.Euler();
                            euler.set(
                                lerp(intersection[i].from.rotation.x, intersection[i].to.rotation.x, e.detail.value),
                                lerp(intersection[i].from.rotation.y, intersection[i].to.rotation.y, e.detail.value),
                                lerp(intersection[i].from.rotation.z, intersection[i].to.rotation.z, e.detail.value),
                            );
                            setRotation(euler, intersection[i].nodeId);
                        } else if (intersection[i].from.position && intersection[i].to.position) {
                            let vector = new THREE.Vector3();
                            vector.set(
                                lerp(intersection[i].from.position.x, intersection[i].to.position.x, e.detail.value),
                                lerp(intersection[i].from.position.y, intersection[i].to.position.y, e.detail.value),
                                lerp(intersection[i].from.position.z, intersection[i].to.position.z, e.detail.value)
                            );

                            if (Array.isArray(intersection[i].nodeId)) {
                                console.log(intersection[i].nodeId, intersection[i].nodeId.length)
                                for (let j = 0; j < intersection[i].nodeId.length; j++) {
                                    setPosition(vector, intersection[i].nodeId[j]);
                                }
                            } else {
                                setPosition(vector, intersection[i].nodeId);
                            }
                        }
                    }
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

function setRotationAroundBody(eulerAngle, rotatedNodeId, aroundNodeId) {
    if (!viewer) {
        console.error(`Viewer is not initialized`);
        return;
    }

    let rotatedBody = { nodeId: rotatedNodeId };

    rotatedBody.fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(rotatedNodeId);
    if (rotatedBody.fragId == -1) {
        console.error(`nodeId ${rotatedBody.nodeId} not found`);
        return;
    }

    rotatedBody.fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, rotatedBody.fragId);
    rotatedBody.fragProxy.getAnimTransform();

    rotatedBody.worldMatrix = new THREE.Matrix4();
    rotatedBody.fragProxy.getWorldMatrix(rotatedBody.worldMatrix);

    rotatedBody.position = new THREE.Vector3();
    rotatedBody.position.copy(rotatedBody.worldMatrix.getPosition().clone());

    let axisBody = { nodeId: aroundNodeId };

    axisBody.fragId = viewer.impl.model.getData().fragments.fragId2dbId.indexOf(aroundNodeId);
    if (axisBody.fragId == -1) {
        console.error(`nodeId ${axisBody.nodeId} not found`);
        return;
    }

    axisBody.fragProxy = viewer.impl.getFragmentProxy(viewer.impl.model, axisBody.fragId);
    axisBody.fragProxy.getAnimTransform();

    axisBody.worldMatrix = new THREE.Matrix4();
    axisBody.fragProxy.getWorldMatrix(axisBody.worldMatrix);



    let distance = new THREE.Vector3();
    distance.set(

    );
}

function setRotation(eulerAngle, nodeId) {
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

    let oldPosition = new THREE.Vector3();
    oldPosition.copy(worldMatrix.getPosition().clone());

    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(eulerAngle.clone());
    fragProxy.quaternion.copy(quaternion.clone());

    fragProxy.updateAnimTransform();
    fragProxy.getAnimTransform();

    let updatedWorldMatrix = new THREE.Matrix4();
    fragProxy.getWorldMatrix(updatedWorldMatrix);

    let newPosition = new THREE.Vector3();
    newPosition.copy(updatedWorldMatrix.getPosition().clone());

    let offset = new THREE.Vector3();
    offset.x = oldPosition.x - newPosition.x;
    offset.y = oldPosition.y - newPosition.y;
    offset.z = oldPosition.z - newPosition.z;

    fragProxy.position.x += offset.x;
    fragProxy.position.y += offset.y;
    fragProxy.position.z += offset.z;

    fragProxy.updateAnimTransform();
    viewer.impl.sceneUpdated(true);
}

function setPosition(positionVector, nodeId) {
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

    fragProxy.position.x = positionVector.x;
    fragProxy.position.y = positionVector.y;
    fragProxy.position.z = positionVector.z;

    fragProxy.updateAnimTransform();
    viewer.impl.sceneUpdated(true);
}


///////////////////////////////////////////////////////
/////////   PLAYER
///////////////////////////////////////////////////////

var activeClip = { // Initial clip
    loop: false,
    autoPlay: false,
    duration: 0,
    frames: []
};

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

loadAnimation(activeClip);

function loadAnimation(clip) {
    clearInterval(interval);
    timeline.value = 0;
    activeClip.isPlaying = false;
    activeClip.currentTime = 0;
    delete activeClip.isPlaying;
    delete activeClip.currentTime;

    //revertChangesAfterAnimaton();
    activeClip = clip;

    timeline.value = 0;
    activeClip.isPlaying = false;
    activeClip.currentTime = 0;

    time.innerHTML = `${fancyTimeFormat(activeClip.currentTime)} / ${fancyTimeFormat(activeClip.duration)}`;
}

function revertChangesAfterAnimaton() {
    var navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());
    navTool.setCameraUpVector(new THREE.Vector3(0, 1, 0));

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