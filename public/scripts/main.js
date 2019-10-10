var viewer;
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTAxLTE0LTU2LTE5LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL3JlZHVjZXIxMi5zdGVw';
var isStarted = false;
var annotationMode = false;
var annotation;
var options = {
    env: 'AutodeskProduction',
    accessToken: '',
    api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
}

var annotations = [];

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

//Annotations

document.querySelector("#viewer").addEventListener('click', onMouseClick, false);

function onMouseClick(e) {
    var x = e.clientX,
        y = e.clientY;
    console.log(x)
    var res = viewer.impl.castRay(x - document.querySelector("#left").clientWidth, y, true);

    if (res) {
        if (annotationMode) {
            pos = viewer.impl.clientToWorld(e.clientX - document.querySelector("#left").clientWidth, e.clientY);
            console.log(pos.point)
            onItemClick(pos.point);
        }
    }
}

document.addEventListener('mousemove', onMouseUpdate, false);

function onMouseUpdate(e) {
    if (isStarted) {
        update();
    }
}

function update() {
    for (let i = 0; i < this.annotations.length; i++) {
        let p2 = new THREE.Vector3(this.annotations[i].x, this.annotations[i].y, this.annotations[i].z);
        if (!viewer.impl.camera.position.equals(p2)) {
            // p2.project(viewer.impl.camera);
            clientPos = viewer.impl.worldToClient(p2, viewer.impl.camera);
            p2.x = clientPos.x;

            p2.y = clientPos.y;
            document.querySelector('#annotation-' + i).style.left = p2.x + "px";
            document.querySelector('#annotation-' + i).style.top = p2.y + "px";
            document.querySelector('#annotation-index-' + i).style.left = p2.x - 15 + "px";
            document.querySelector('#annotation-index-' + i).style.top = p2.y - 15 + "px";
        }
    }
    if (this.annotations.length > 0)
        this.changeVisibilityOfAnnotations();

}

function onItemClick(item) {

    let annotationNameEl = document.querySelector("#annotation-name-editText");
    let annotationTextEl = document.querySelector("#annotation-text-editText");
    let annotationName = "name";
    let annotationText = "text";

    console.log(annotationNameEl)
    console.log(annotationNameEl.value)

    if (annotationNameEl) {
        annotationName = annotationNameEl.value ? annotationNameEl.value : "name";
    }
    if (annotationTextEl) {
        annotationText = annotationTextEl.value ? annotationTextEl.value : "text";
    }

    this.annotations.push(
        {
            x: item.x,
            y: item.y,
            z: item.z,
            name: annotationName,
            text: annotationText
        }
    )
    displayAnnotation(this.annotations.length - 1);
    let i = this.annotations.length - 1;
    let p2 = new THREE.Vector3(this.annotations[i].x, this.annotations[i].y, this.annotations[i].z);
    if (!viewer.impl.camera.position.equals(p2)) {
        p2.project(viewer.impl.camera);
        clientPos = viewer.impl.worldToClient(item, viewer.impl.camera);
        p2.x = clientPos.x;
        console.log(p2.x)
        p2.y = clientPos.y;
        document.querySelector('#annotation-' + i).style.left = p2.x + "px";
        document.querySelector('#annotation-' + i).style.top = p2.y + "px";
        document.querySelector('#annotation-index-' + i).style.left = p2.x - 15 + "px";
        document.querySelector('#annotation-index-' + i).style.top = p2.y - 15 + "px";
    }
}


function addAnnotation(x, y, z, annotationName, annotationText, flag) {

    this.annotations.push(
        {
            x: x,
            y: y,
            z: z,
            name: annotationName,
            text: annotationText
        }
    )
    id = this.annotations.length - 1;
    displayAnnotation(id);

    let annotationNumber = document.querySelector("#annotation-index-" + id);
    if (flag)
        annotationNumber.dispatchEvent(new Event("click"));

    return id;
}

function annotationOpacity(id, opacity) {
    if (opacity == 0) {
        document.querySelector("#annotation-index-" + id).style.opacity = "0";
    } else {
        document.querySelector("#annotation-index-" + id).style.opacity = "1";
    }
    let style = document.querySelector('#annotation-' + id).style;
    style.opacity = opacity;
}

function annotationsInit() {
    for (const i = 0; i < this.annotations.length; i++) {
        this.displayAnnotation(i);
    }

}

function displayAnnotation(index) {
    const annotation = document.createElement('div');
    annotation.id = 'annotation-' + index;
    annotation.classList.add('annotation', 'hidden');
    document.querySelector('#viewer').appendChild(annotation);
    const annotationName = document.createElement('h4');
    annotationName.innerText = this.annotations[index].name;
    annotationName.id = 'annotation-name-' + index;
    annotation.appendChild(annotationName);
    const annotationText = document.createElement('p');
    annotationText.id = 'annotation-text-' + index;
    annotationText.innerText = this.annotations[index].text;
    annotation.appendChild(annotationText);
    const annotationNumber = document.createElement('div');
    annotationNumber.id = 'annotation-index-' + index;
    annotationNumber.innerText = + index + 1;
    annotationNumber.classList.add('annotation-number');
    annotationNumber.addEventListener('click', () => this.hideAnnotation(index));
    document.querySelector('#viewer').appendChild(annotationNumber);
}

function hideAnnotation(index) {
    const annotation = document.querySelector('#annotation-' + index);
    const hidden = annotation.classList.contains('hidden');
    document.querySelector('#annotation-name-' + index).innerHTML = hidden ? this.annotations[index].name : '';
    document.querySelector('#annotation-text-' + index).innerHTML = hidden ? this.annotations[index].text : '';
    if (hidden) {
        annotation.classList.remove('hidden');
    } else
        annotation.classList.add('hidden');
}

function getClosestAnnotation() {
    let indexOfClosest;
    let distToClosest = Math.pow(2, 32);
    for (const i in this.annotations) {
        const camPos = this.viewer.impl.camera.position;
        const pPos = this.annotations[i];
        const dist = Math.sqrt(Math.pow((camPos.x - pPos.x), 2) + Math.pow((camPos.y - pPos.y), 2) + Math.pow((camPos.z - pPos.z), 2));
        if (distToClosest > dist) {
            distToClosest = dist;
            indexOfClosest = +i;
        }
    }
    return indexOfClosest;
}

function changeVisibilityOfAnnotations() {
    for (let i = 0; i < this.annotations.length; i++) {
        document.querySelector('#annotation-' + i).style.zIndex = this.getClosestAnnotation() == i ? 2 : 1;
        document.querySelector('#annotation-index-' + i).style.zIndex = this.getClosestAnnotation() == i ? 2 : 1;
    }
}

//////////////

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

function checkQuestion1() {
    if (document.querySelector("#opt1_1").checked) {
        document.querySelector("#q1").style.display = "none";
        document.querySelector("#questionInfo").style.color = "black";
        document.querySelector("#q2").style.display = "block"
        document.querySelector("#questionInfo").style.display = "block"
    } else {
        document.querySelector("#questionInfo").style.color = "red";
    }
}
function checkQuestion2() {
    rads = document.getElementsByName("q2_rad")
    checked = false;
    for (rad of rads) {
        console.log(rad.value + " " + rad.checked)

        if (rad.checked && rad.value == "opt2_1") {
            checked = true;
        }
    }
    if (checked) {
        document.querySelector("#q1").style.display = "none";
        document.querySelector("#questionInfo").style.color = "black";
        document.querySelector("#q2").style.display = "block"
    } else {
        document.querySelector("#questionInfo").innerText = "Ответ неверный"
        document.querySelector("#questionInfo").style.color = "red";
    }
}
