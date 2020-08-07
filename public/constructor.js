var viewer;
var navTool;
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTA3LTA3LTU3LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXI1LmYzZA'
var options = {
    env: 'AutodeskProduction',
    accessToken: '',
    api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
}

function showPartProperies() {
    let selected = viewer.getSelection()[0];
    document.querySelector('#partName').innerHTML = 'Свойство детали ' + selected;

    document.querySelector('#cameraSettings').style.display = 'none';
    document.querySelector('#partSettings').style.display = 'block';

    const data = getPartData(selected);

    document.querySelector('input[name="part-pos-x"]').value = data.position.x;
    document.querySelector('input[name="part-pos-y"]').value = data.position.y;
    document.querySelector('input[name="part-pos-z"]').value = data.position.z;

    document.querySelector('input[name="part-rotation-x"]').value = THREE.Math.radToDeg(data.rotation.x);
    document.querySelector('input[name="part-rotation-y"]').value = THREE.Math.radToDeg(data.rotation.y);
    document.querySelector('input[name="part-rotation-z"]').value = THREE.Math.radToDeg(data.rotation.z);

    document.querySelector('input[name="part-anchor-x"]').value = 0;
    document.querySelector('input[name="part-anchor-y"]').value = 0;
    document.querySelector('input[name="part-anchor-z"]').value = 0;
}

function showCameraProperies() {
    document.querySelector('#cameraSettings').style.display = 'block';
    document.querySelector('#partSettings').style.display = 'none';
}

document.querySelector('input[name="part-pos-x"]').oninput = function (e) { let s = viewer.getSelection()[0]; const p = getPartData(s).position; const r = getPartData(s).rotation; let vec = new THREE.Vector3(); vec.set(parseFloat(e.target.value), p.y, p.z); transformTo(vec, r, s); }
document.querySelector('input[name="part-pos-y"]').oninput = function (e) { let s = viewer.getSelection()[0]; const p = getPartData(s).position; const r = getPartData(s).rotation; let vec = new THREE.Vector3(); vec.set(p.x, parseFloat(e.target.value), p.z); transformTo(vec, r, s); }
document.querySelector('input[name="part-pos-z"]').oninput = function (e) { let s = viewer.getSelection()[0]; const p = getPartData(s).position; const r = getPartData(s).rotation; let vec = new THREE.Vector3(); vec.set(p.x, p.y, parseFloat(e.target.value)); transformTo(vec, r, s); }

document.querySelector('input[name="part-rotation-x"]').oninput = function (e) { let s = viewer.getSelection()[0]; const p = getPartData(s).position; const r = getPartData(s).rotation; let eul = new THREE.Euler(); eul.set(THREE.Math.degToRad(parseFloat(e.target.value)), r.y, r.z); transformTo(p, eul, s); }
document.querySelector('input[name="part-rotation-y"]').oninput = function (e) { let s = viewer.getSelection()[0]; const p = getPartData(s).position; const r = getPartData(s).rotation; let eul = new THREE.Euler(); eul.set(r.x, THREE.Math.degToRad(parseFloat(e.target.value)), r.z); transformTo(p, eul, s); }
document.querySelector('input[name="part-rotation-z"]').oninput = function (e) { let s = viewer.getSelection()[0]; const p = getPartData(s).position; const r = getPartData(s).rotation; let eul = new THREE.Euler(); eul.set(r.x, r.y, THREE.Math.degToRad(parseFloat(e.target.value))); transformTo(p, eul, s); }


function getPartData(nodeId) {
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

    let rot = new THREE.Euler();
    rot.setFromQuaternion(fragProxy.quaternion);

    return {
        position: worldMatrix.getPosition().clone(),
        rotation: rot
    }
}

////////////////////////////////////////////////////////////////
////////////// TRANSFORM FUNCTIONS
////////////////////////////////////////////////////////////////

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

var recordButton = document.getElementById('recBtn');
recordButton.onclick = toggleRecordMode;
let recordMode = false;
function toggleRecordMode() {
    recordMode = !recordMode;
    if (recordMode) recordButton.className = 'text-danger';
    else recordButton.className = 'text-secondary';
}

$.get('/ietm-forge-old/auth', (data) => {
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

function load() {
    viewer.loadExtension("Autodesk.ADN.Viewing.Extension.TransformTool");
    ext = viewer.getExtension("Autodesk.ADN.Viewing.Extension.TransformTool");
}

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);

    //load();

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(10); // Сделать фон серым
        viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
        viewer.setGroundShadow(0);

        player.addEventListener('frame', function (e) {
            document.querySelector('button[name="record-camera"]').style.display = 'block';
            document.querySelector('button[name="save-camera"]').style.display = 'none';
            document.querySelector('button[name="remove-camera"]').style.display = 'none';

            document.querySelector('button[name="record-camera"]').innerHTML = 'Записать кадр на ' + fancyTimeFormat(e.detail.currentTime);
            document.querySelector('button[name="record-part"]').innerHTML = 'Записать кадр на ' + fancyTimeFormat(e.detail.currentTime);

            let currentTime = e.detail.currentTime;

            //let key = getLerpKey(currentTime);
            let lerpFrames = getLerpFrames(currentTime);
            for (let frame of lerpFrames) {
                if (frame.for === 'camera') {

                    navTool.setCameraUpVector(frame.key.props.up);
                    navTool.setPosition(frame.key.props.position);
                    navTool.setTarget(frame.key.props.target);
                } else if (frame.for.includes('node')) {
                    transformTo(frame.key.props.position, frame.key.props.rotation, parseInt(frame.for.slice(4)));
                }
            }

        })

        navTool = new Autodesk.Viewing.Navigation(viewer.getCamera());

        document.querySelector('input[name="camera-target-x"]').oninput = function (e) { const t = navTool.getTarget().clone(); navTool.setTarget(new THREE.Vector3(parseFloat(e.target.value), t.y, t.z)); }
        document.querySelector('input[name="camera-target-y"]').oninput = function (e) { const t = navTool.getTarget().clone(); navTool.setTarget(new THREE.Vector3(t.x, parseFloat(e.target.value), t.z)); }
        document.querySelector('input[name="camera-target-z"]').oninput = function (e) { const t = navTool.getTarget().clone(); navTool.setTarget(new THREE.Vector3(t.x, t.y, parseFloat(e.target.value))); }

        document.querySelector('input[name="camera-position-x"]').oninput = function (e) { const p = navTool.getPosition().clone(); navTool.setPosition(new THREE.Vector3(parseFloat(e.target.value), p.y, p.z)); }
        document.querySelector('input[name="camera-position-y"]').oninput = function (e) { const p = navTool.getPosition().clone(); navTool.setPosition(new THREE.Vector3(p.x, parseFloat(e.target.value), p.z)); }
        document.querySelector('input[name="camera-position-z"]').oninput = function (e) { const p = navTool.getPosition().clone(); navTool.setPosition(new THREE.Vector3(p.x, p.y, parseFloat(e.target.value))); }

        document.querySelector('input[name="camera-up-x"]').oninput = function (e) { const u = navTool.getCameraUpVector().clone(); navTool.setCameraUpVector(new THREE.Vector3(parseFloat(e.target.value), u.y, u.z)); }
        document.querySelector('input[name="camera-up-y"]').oninput = function (e) { const u = navTool.getCameraUpVector().clone(); navTool.setCameraUpVector(new THREE.Vector3(u.x, parseFloat(e.target.value), u.z)); }
        document.querySelector('input[name="camera-up-z"]').oninput = function (e) { const u = navTool.getCameraUpVector().clone(); navTool.setCameraUpVector(new THREE.Vector3(u.x, u.y, parseFloat(e.target.value))); }
    })

    viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели    
        const t = navTool.getTarget().clone(), p = navTool.getPosition().clone(), u = navTool.getCameraUpVector().clone();
        document.querySelector('input[name="camera-target-x"]').value = t.x.toFixed(2);
        document.querySelector('input[name="camera-target-y"]').value = t.y.toFixed(2);
        document.querySelector('input[name="camera-target-z"]').value = t.z.toFixed(2);

        document.querySelector('input[name="camera-position-x"]').value = p.x.toFixed(2);
        document.querySelector('input[name="camera-position-y"]').value = p.y.toFixed(2)
        document.querySelector('input[name="camera-position-z"]').value = p.z.toFixed(2);

        document.querySelector('input[name="camera-up-x"]').value = u.x.toFixed(2);
        document.querySelector('input[name="camera-up-y"]').value = u.y.toFixed(2);
        document.querySelector('input[name="camera-up-z"]').value = u.z.toFixed(2);
    })

    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели    
        let selected = viewer.getSelection()[0];
        if (selected) showPartProperies();
        else showCameraProperies();
    })
}

document.querySelector('button[name="record-camera"]').onclick = function (e) {
    e.preventDefault();
    recordCamera(activeClip.currentTime);
}

document.querySelector('button[name="record-part"]').onclick = function (e) {
    e.preventDefault();
    let position = new THREE.Vector3();
    position.set(
        parseFloat(document.querySelector('input[name="part-pos-x"]').value),
        parseFloat(document.querySelector('input[name="part-pos-y"]').value),
        parseFloat(document.querySelector('input[name="part-pos-z"]').value)
    );

    let rotation = new THREE.Euler();
    rotation.set(
        parseFloat(document.querySelector('input[name="part-rotation-x"]').value),
        parseFloat(document.querySelector('input[name="part-rotation-y"]').value),
        parseFloat(document.querySelector('input[name="part-rotation-z"]').value)
    );

    addFrame(activeClip.currentTime, 'node' + viewer.getSelection()[0], { position, rotation });
}

function addPawn(nodeId, key) {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>Деталь ${nodeId}</td><td style="padding: 12px;"><div style="position: relative;"></div></td>`
    document.querySelector('#content').append(tr);
}

function recordCamera(at) { // TODO: check for same 'at'
    let target = new THREE.Vector3();
    target.set(
        parseFloat(document.querySelector('input[name="camera-target-x"]').value),
        parseFloat(document.querySelector('input[name="camera-target-y"]').value),
        parseFloat(document.querySelector('input[name="camera-target-z"]').value)
    );

    let position = new THREE.Vector3();
    position.set(
        parseFloat(document.querySelector('input[name="camera-position-x"]').value),
        parseFloat(document.querySelector('input[name="camera-position-y"]').value),
        parseFloat(document.querySelector('input[name="camera-position-z"]').value)
    );

    let up = new THREE.Vector3();
    up.set(
        parseFloat(document.querySelector('input[name="camera-up-x"]').value),
        parseFloat(document.querySelector('input[name="camera-up-y"]').value),
        parseFloat(document.querySelector('input[name="camera-up-z"]').value)
    );

    addFrame(at, 'camera', { position, target, up })
}

document.querySelector('button[name="save-camera"]').onclick = function () {
    let target = new THREE.Vector3();
    target.set(
        parseFloat(document.querySelector('input[name="camera-target-x"]').value),
        parseFloat(document.querySelector('input[name="camera-target-y"]').value),
        parseFloat(document.querySelector('input[name="camera-target-z"]').value)
    );

    let position = new THREE.Vector3();
    position.set(
        parseFloat(document.querySelector('input[name="camera-position-x"]').value),
        parseFloat(document.querySelector('input[name="camera-position-y"]').value),
        parseFloat(document.querySelector('input[name="camera-position-z"]').value)
    );

    let up = new THREE.Vector3();
    up.set(
        parseFloat(document.querySelector('input[name="camera-up-x"]').value),
        parseFloat(document.querySelector('input[name="camera-up-y"]').value),
        parseFloat(document.querySelector('input[name="camera-up-z"]').value)
    );

    saveFrame(activeClip.currentTime, 'camera', { position, target, up })
}

document.querySelector('button[name="remove-camera"]').onclick = function () {
    console.log(removeFrame(activeClip.currentTime));
    document.querySelector(`div[at="${activeClip.currentTime}"]`).remove();
    document.querySelector('button[name="record-camera"]').style.display = 'block';
    document.querySelector('button[name="save-camera"]').style.display = 'none';
    document.querySelector('button[name="remove-camera"]').style.display = 'none';
}

function removeFrame(at) {
    for (let frame of activeClip.frames) {
        if (frame.for === 'camera') {
            for (let key of frame.keys) {
                if (key.at === at) return frame.keys.splice(frame.keys.indexOf(key), 1);
            }
        }
    }
}

function saveFrame(at, props) {
    for (let frame of activeClip.frames) {
        if (frame.for === 'camera') {
            for (let key of frame.keys) {
                if (key.at === at) key.props = props;
            }
        }
    }
}

function addFrame(at, for_what, props) {
    let frameIndex = -1;

    for (let frame of activeClip.frames) {
        if (frame.for == for_what) frameIndex = activeClip.frames.indexOf(frame);
    }

    if (frameIndex === -1) activeClip.frames.push({ for: for_what, keys: [{ at, props }] });
    else {
        activeClip.frames[frameIndex].keys.push({ at, props });

        for (let frame of activeClip.frames) {
            if (frame.for === for_what) {
                frame.keys.sort((a, b) => {
                    if (a.at < b.at) return -1;
                    else if (a.at > b.at) return 1;
                    else return 0;
                })
            }
        }
    }

    if (for_what === 'camera') {
        let frameCircle = document.createElement('div');
        frameCircle.className = 'frame';
        frameCircle.style.left = `${((at / activeClip.duration) * 100)}% `;
        frameCircle.setAttribute('at', at);
        frameCircle.onclick = function () {
            document.querySelector('button[name="record-camera"]').style.display = 'none';
            document.querySelector('button[name="save-camera"]').style.display = 'block';
            document.querySelector('button[name="remove-camera"]').style.display = 'block';
            navTool.setCameraUpVector(props.up);
            navTool.setPosition(props.position);
            navTool.setTarget(props.target);
            navTool.toOrthographic();
            timePicker.value = fancyTimeFormat(at);
            timeline.value = (at / activeClip.duration) * 100;
            activeClip.currentTime = at;
        }

        document.querySelector('#camera-frames').append(frameCircle);
    } else if (for_what.includes('node')) {
        let frameCircle = document.createElement('div');
        frameCircle.className = 'frame';
        frameCircle.style.left = `${((at / activeClip.duration) * 100)}% `;
        frameCircle.setAttribute('at', at);

        let framesField = document.querySelector(`div[nodeId="${for_what}"]`)
        if (framesField != undefined || framesField != null) {
            framesField.append(frameCircle);
        }
        else {
            let row = document.createElement('tr');
            row.innerHTML = `<td>Деталь ${for_what}</td><td style="padding: 12px;"><div nodeId="${for_what}" style="position: relative;"></div></td>`;
            document.querySelector('#content').append(row);
            framesField = row.querySelector(`div[nodeId="${for_what}"]`);
            framesField.append(frameCircle);
        }
    }

}

function getLerpFrames(time) {
    let lerpFrames = [];
    for (let frame of activeClip.frames) {
        let keys = frame.keys;
        let prevKey = keys[0];
        let nextKey = keys[keys.length - 1];

        for (let key of keys) {
            if (key.at <= time && key.at > prevKey.at) prevKey = key;
            if (key.at > time && key.at < nextKey.at) nextKey = key;
        }

        let relation = (time - prevKey.at) / (nextKey.at - prevKey.at);
        let lerpKey = { at: time, props: {} };

        if (relation === Infinity) {
            lerpKey.props = prevKey.props;
        } else if (relation === -Infinity || isNaN(relation)) {
            lerpKey.props = nextKey.props;
        } else {
            if (frame.for == 'camera') {
                let up = new THREE.Vector3();
                up.set(
                    lerp(prevKey.props.up.x, nextKey.props.up.x, relation),
                    lerp(prevKey.props.up.y, nextKey.props.up.y, relation),
                    lerp(prevKey.props.up.z, nextKey.props.up.z, relation),
                );
                let position = new THREE.Vector3();
                position.set(
                    lerp(prevKey.props.position.x, nextKey.props.position.x, relation),
                    lerp(prevKey.props.position.y, nextKey.props.position.y, relation),
                    lerp(prevKey.props.position.z, nextKey.props.position.z, relation),
                );
                let target = new THREE.Vector3();
                target.set(
                    lerp(prevKey.props.target.x, nextKey.props.target.x, relation),
                    lerp(prevKey.props.target.y, nextKey.props.target.y, relation),
                    lerp(prevKey.props.target.z, nextKey.props.target.z, relation),
                );
                lerpKey.props.up = up;
                lerpKey.props.position = position;
                lerpKey.props.target = target;
            } else if (frame.for.includes('node')) {
                let position = new THREE.Vector3();
                position.set(
                    lerp(prevKey.props.position.x, nextKey.props.position.x, relation),
                    lerp(prevKey.props.position.y, nextKey.props.position.y, relation),
                    lerp(prevKey.props.position.z, nextKey.props.position.z, relation)
                );

                let rotation = new THREE.Euler();
                rotation.set(
                    lerp(THREE.Math.degToRad(prevKey.props.rotation.x), THREE.Math.degToRad(nextKey.props.rotation.x), relation),
                    lerp(THREE.Math.degToRad(prevKey.props.rotation.y), THREE.Math.degToRad(nextKey.props.rotation.y), relation),
                    lerp(THREE.Math.degToRad(prevKey.props.rotation.z), THREE.Math.degToRad(nextKey.props.rotation.z), relation),
                );

                lerpKey.props.position = position;
                lerpKey.props.rotation = rotation;
            }

            lerpFrames.push({ for: frame.for, key: lerpKey });
        }
    }

    return lerpFrames;
}

function getLerpKey(time) {
    let keys = activeClip.frames[0].keys;
    let prevKey = keys[0];
    let nextKey = keys[keys.length - 1];

    for (let key of keys) {
        if (key.at <= time && key.at > prevKey.at) prevKey = key;
        if (key.at > time && key.at < nextKey.at) nextKey = key;
    }

    let relation = (time - prevKey.at) / (nextKey.at - prevKey.at);

    let lerpKey = { at: time, for: '', props: {} };

    if (relation === Infinity) {
        lerpKey.props = prevKey.props;
    } else if (relation === -Infinity || isNaN(relation)) {
        lerpKey.props = nextKey.props;
    } else {

        let up = new THREE.Vector3();
        up.set(
            lerp(prevKey.props.up.x, nextKey.props.up.x, relation),
            lerp(prevKey.props.up.y, nextKey.props.up.y, relation),
            lerp(prevKey.props.up.z, nextKey.props.up.z, relation),
        );
        let position = new THREE.Vector3();
        position.set(
            lerp(prevKey.props.position.x, nextKey.props.position.x, relation),
            lerp(prevKey.props.position.y, nextKey.props.position.y, relation),
            lerp(prevKey.props.position.z, nextKey.props.position.z, relation),
        );
        let target = new THREE.Vector3();
        target.set(
            lerp(prevKey.props.target.x, nextKey.props.target.x, relation),
            lerp(prevKey.props.target.y, nextKey.props.target.y, relation),
            lerp(prevKey.props.target.z, nextKey.props.target.z, relation),
        );
        lerpKey.props.up = up;
        lerpKey.props.position = position;
        lerpKey.props.target = target;
    }

    return lerpKey;
}

var activeClip = {
    duration: 1000 * 60,
    currentTime: 0,
    loop: false,
    isPlaying: false,
    frames: [
        {
            for: 'camera',
            keys: [

            ]
        }
    ]
};

var player = document.getElementById('player');
var playButton = document.getElementById('playBtn');
var pauseButton = document.getElementById('pauseBtn');
var timeline = document.getElementById('timeline-range');
var totalTime = document.getElementById('total-time');
var timePicker = document.getElementById('time-picker');

function fancyTimeFormat(ms) {
    var mins = ~~(((ms / 1000) % 3600) / 60);
    var secs = ~~(ms / 1000) % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
}

timeline.oninput = function (e) {
    let precent = e.target.value / 100.0;
    activeClip.currentTime = activeClip.duration * precent;

    totalTime.innerHTML = '/ ' + fancyTimeFormat(activeClip.duration);
    timePicker.value = fancyTimeFormat(activeClip.currentTime);

    if (!recordMode) {
        player.dispatchEvent(new CustomEvent('frame', {
            detail: { value: activeClip.currentTime / activeClip.duration, currentTime: activeClip.currentTime }
        }));
    }
}

var interval = {};

playButton.onclick = function () {
    clearInterval(interval);

    let start = Date.now();
    let oldTime = Date.now();

    if (activeClip.currentTime >= activeClip.duration) activeClip.currentTime = 0;

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
            totalTime.innerHTML = '/ ' + fancyTimeFormat(activeClip.duration);
            timePicker.value = fancyTimeFormat(activeClip.currentTime);

        }
    }, 4);

    activeClip.isPlaying = true;
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
}

pauseButton.onclick = function () {
    activeClip.isPlaying = false;
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}