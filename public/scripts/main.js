
var viewer;
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTAxLTE2LTI5LTU0LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXIyLmYzZA';
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

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(10); // Сделать фон серым
        viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
        viewer.setGroundShadow(0);
        viewer.hide(4)

        let animation = {
            loop: true,
            duration: 1000 * 60,
            frames: [
                {
                    at: 0,
                    data: [
                        {
                            nodeId: 35,
                            transform: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(360 * 0), THREE.Math.degToRad(0)),
                                position: undefined,
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 76,
                            transform: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(0), 0),
                                position: undefined,
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 164,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        }
                    ]
                },
                {
                    at: 1000 * 60,
                    data: [
                        {
                            nodeId: 35,
                            transform: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(360 * 10), THREE.Math.degToRad(0)),
                                position: undefined,
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 76,
                            transform: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(-360 * 20), THREE.Math.degToRad(0)),
                                position: undefined,
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 164,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -100, 0),
                                scale: undefined
                            }
                        }
                    ]
                }
            ]
        }

        player.addEventListener('frame', function (e) {
            let currentTime = e.detail.currentTime;
            let prevFrame = animation.frames[0];
            let nextFrame = animation.frames[animation.frames.length - 1];

            for (let i = 0; i < animation.frames.length; i++) {
                let frameTime = animation.frames[i].at;
                if (frameTime <= currentTime && frameTime > prevFrame.at) prevFrame = animation.frames[i];
                if (frameTime > currentTime && frameTime < nextFrame.at) nextFrame = animation.frames[i];
            }

            let intersection = prevFrame.data.map(d => {
                for (let i = 0; i < nextFrame.data.length; i++) {
                    if (d.nodeId === nextFrame.data[i].nodeId) return {
                        nodeId: d.nodeId,
                        from: d.transform,
                        to: nextFrame.data[i].transform
                    }
                }
            })

            if (intersection[0]) {
                for (let i = 0; i < intersection.length; i++) {
                    console.log(intersection[i])
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
                        setPosition(vector, intersection[i].nodeId);
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

var isPlaying = false;

var player = document.getElementById('player');
var playButton = document.getElementById('playBtn');
var pauseButton = document.getElementById('pauseBtn');
var timeline = document.getElementById('customRange1');
var time = document.getElementById('time');

let loop = true;
var currentTime = 0;
var totalDuration = 1000 * 60; // 1 minute
time.innerHTML = `${fancyTimeFormat(currentTime)} / ${fancyTimeFormat(totalDuration)}`;

function fancyTimeFormat(ms) {
    var mins = ~~(((ms / 1000) % 3600) / 60);
    var secs = ~~(ms / 1000) % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
}

timeline.oninput = function (e) {
    let precent = e.target.value / 100.0;
    currentTime = totalDuration * precent;
    time.innerHTML = `${fancyTimeFormat(currentTime)} / ${fancyTimeFormat(totalDuration)}`;
    player.dispatchEvent(new CustomEvent('frame', {
        detail: { value: currentTime / totalDuration, currentTime }
    }));
}

var interval = {};

playButton.onclick = function () {
    let start = Date.now();
    let oldTime = Date.now();

    interval = setInterval(function () {
        oldTime = start;
        start = Date.now();
        let dt = start - oldTime;
        if (isPlaying) {
            currentTime += dt;
            player.dispatchEvent(new CustomEvent('frame', {
                detail: { value: currentTime / totalDuration, currentTime, dt }
            }));
            if (currentTime >= totalDuration) {
                if (loop) {
                    currentTime = 0;
                } else {
                    pauseButton.onclick();
                    clearInterval(interval)
                }
            }
            timeline.value = (currentTime / totalDuration) * 100.0;
            time.innerHTML = `${fancyTimeFormat(currentTime)} / ${fancyTimeFormat(totalDuration)}`;
        }
    }, 4)

    isPlaying = true;
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
}

pauseButton.onclick = function () {
    isPlaying = false;
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}