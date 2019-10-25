let isStarted = false;
let annotations = {};

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
    for (const id in annotations) {
        let p2 = new THREE.Vector3(annotations[id].x, annotations[id].y, annotations[id].z);
        if (!viewer.impl.camera.position.equals(p2)) {
            clientPos = viewer.impl.worldToClient(p2, viewer.impl.camera);
            p2.x = clientPos.x;

            p2.y = clientPos.y;
            document.querySelector('#annotation-' + id).style.left = p2.x + "px";
            document.querySelector('#annotation-' + id).style.top = p2.y + "px";
            document.querySelector('#annotation-index-' + id).style.left = p2.x - 15 + "px";
            document.querySelector('#annotation-index-' + id).style.top = p2.y - 15 + "px";
        }
    }
    if (annotations.length > 0)
        this.changeVisibilityOfAnnotations();

}

function onItemClick(item) {
}

function setAnotationPosition(id) {
    let p2 = new THREE.Vector3(annotations[id].x, annotations[id].y, annotations[id].z);
    if (!viewer.impl.camera.position.equals(p2)) {
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

    annotations[id] = {
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
    for (const id in annotations) {
        this.displayAnnotation(id);
    }

}

function onMouseMove() {
    console.log(isStarted)
    if (isStarted) {
        update();
    }
}

document.addEventListener('mousemove', onMouseMove, false);

function displayAnnotation(id) {
    const annotation = document.createElement('div');
    annotation.id = 'annotation-' + id;
    annotation.classList.add('annotation', 'hidden');
    document.querySelector('#viewer').appendChild(annotation);
    const annotationText = document.createElement('p');
    annotationText.id = 'annotation-text-' + id;
    annotationText.innerText = annotations[id].text;
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
    document.querySelector('#annotation-text-' + id).innerHTML = hidden ? annotations[id].text : '';
    if (hidden) {
        annotation.classList.remove('hidden');
    } else
        annotation.classList.add('hidden');
}

function getClosestAnnotation() {
    let indexOfClosest;
    let distToClosest = Math.pow(2, 32);
    for (const id in annotations) {
        const camPos = this.viewer.impl.camera.position;
        const pPos = annotations[id];
        const dist = Math.sqrt(Math.pow((camPos.x - pPos.x), 2) + Math.pow((camPos.y - pPos.y), 2) + Math.pow((camPos.z - pPos.z), 2));
        if (distToClosest > dist) {
            distToClosest = dist;
            indexOfClosest = +id;
        }
    }
    return indexOfClosest;
}

function changeVisibilityOfAnnotations() {
    for (const id in annotations) {
        document.querySelector('#annotation-' + id).style.zIndex = this.getClosestAnnotation() == id ? 2 : 1;
        document.querySelector('#annotation-index-' + id).style.zIndex = this.getClosestAnnotation() == id ? 2 : 1;
    }
}

function deleteAllAnnotations() {
    for (const id in annotations) {
        delete annotations[id];
        document.querySelector("#annotation-index-" + id).remove();
        document.querySelector("#annotation-" + id).remove();
    }
}