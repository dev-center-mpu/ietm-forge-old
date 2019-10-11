var viewer;
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTA3LTA3LTU3LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXI1LmYzZA'
var isStarted = false;
var annotationMode = false;
var annotation;
var annotations = {};
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
function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
}
/**
 * viewer.loadModel() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

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


//Annotations
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
/////////////////////////

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
            let lerpKeys = [];

            for (let i = 0; i < clipProps.length; i++) lerpKeys.push(getLerpKey(i, currentTime));

            console.log(currentTime, lerpKeys)

            for (let key of lerpKeys) {
                switch (key.for) {
                    case 'node':
                        if (key.params.position) for (let node of key.nodeId) setPosition(key.params.position, node);
                        if (key.params.rotation) for (let node of key.nodeId) setRotation(key.params.rotation, node);
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


//QUIZ////////////////////////////////
var master = $('#quiz').data('master');
var info = document.querySelector("#questionInfo");
var winId = -1;
function checkQuestionRadio(questionId, winId) {
    let info = document.querySelector("#questionInfo");
    if (document.querySelector("#opt" + questionId + "_" + winId).checked) {
        info.style.display = "none";
        if (questionId == 2) {
            checkQuestionViewer(4);
        }
        master.next();
    } else {
        info.style.display = "block";
        info.style.color = "red";
        info.innerText = "Ответ неверный";
    }
}

function checkQuestionViewer(id) {
    winId = id;
    document.querySelector("#viewer").addEventListener("click", questionViewerClick);
}


function questionViewerClick() {
    console.log(winId + "  " + viewer.getSelection());
    if (winId == viewer.getSelection()) {
        winId = -1;
        info.style.display = "block";
        info.style.color = "green";
        info.innerText = "Поздравляем, вы успешно прошли тест!!!!";
        document.querySelector("#viewer").removeEventListener("click", questionViewerClick);
    } else {
        info.style.display = "block";
        info.style.color = "red";
        info.innerText = "Вы выбрали не ту деталь";

    }
}
/////////////////////////////////////