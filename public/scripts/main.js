
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

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(10); // Сделать фон серым
        viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);
        viewer.setGroundShadow(0);
        //viewer.hide(4)

        let animation = {
            loop: true,
            duration: 1000 * 0.2,
            frames: [
                {
                    at: 0,
                    data: [
                        {
                            nodeId: 'camera',
                            transform: {
                                target: new THREE.Vector3(0, 0, 0),
                                position: new THREE.Vector3(333, 333, 333),
                                up: new THREE.Vector3(0, 1.0, 0)
                            }
                        },
                        {
                            nodeId: 66,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 68,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 72,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 6,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 4,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64], // подшипник верхний
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33], // подшипник нижний
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [160, 162, 164, 166], // болты двигателя
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [152, 154, 156, 158], // шайбы болтов двигателя
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [94, 98, 102, 106, 110, 114, 118], // болты нижней крышки
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [92, 96, 100, 104, 108, 112, 116], // шайбы болтов нижней крышки
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 74,
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 78, // верхняя прокладка шестерни
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [122, 124, 128, 132, 136, 140, 144, 148], // болты верхней крышки вала
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [120, 126, 130, 134, 138, 142, 146, 150], // шайбы болтов верхней крышки вала
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 70, // верхняя прокладка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 86, // нижняя прокладка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 37, // толстая прокладка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 80, // крепеж
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 168, // болт крепежа
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                    ]
                },
                {
                    at: 1000 * 1,
                    data: [
                        {
                            nodeId: 'camera',
                            transform: {
                                target: new THREE.Vector3(0, 0, 0),
                                position: new THREE.Vector3(566, 966, 666),
                                up: new THREE.Vector3(-0.365, -0.415, 0.833)
                            }
                        },
                        {
                            nodeId: 66, // вал
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 430, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [122, 124, 128, 132, 136, 140, 144, 148], // болты верхней крышки вала
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 420, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [120, 126, 130, 134, 138, 142, 146, 150], // шайбы болтов верхней крышки вала
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 390, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 68, // крышка вала
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 380, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 70, // верхняя прокладка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 310, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64], // подшипник верхний
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 270, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 4, // верхняя крышка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 200, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 168, // болт крепежа
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 70, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 37, // толстая прокладка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 50, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 80, // крепени 
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 40, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 78, // верхняя прокладка шестерни
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 20, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 74, // нижняя прокладка шестерни
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -20, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33], // подшипник нижний
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -100, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 86, // нижняя прокладка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -110, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 6, // нижняя крышка
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -150, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [92, 96, 100, 104, 108, 112, 116], // шайбы болтов нижней крышки
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -158, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [94, 98, 102, 106, 110, 114, 118], // болты нижней крышки
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -200, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: 72, // двигатель
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -260, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [152, 154, 156, 158], // шайбы болтов двигателя
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -330, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [160, 162, 164, 166], // болты двигателя
                            transform: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -400, 0),
                                scale: undefined
                            }
                        },
                    ]
                }
            ]
        }

        let animation2 = {
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

let loop = false;
var currentTime = 0;
var totalDuration = 1000 * 1; // 1 minute
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