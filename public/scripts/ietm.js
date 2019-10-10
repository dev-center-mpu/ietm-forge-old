var ietm = {
    'item1': {
        init: function () {
            NOP_VIEWER.isolate(0);
            NOP_VIEWER.fitToView(0);
            NOP_VIEWER.hide(4);
            console.log('item1 loaded')
        },
        content: `
        <h2>Техническое описание</h2>
        <p>В данном руководстве Вы ознакомитесь с устройством одноступенчатого цилиндрического Редуктора 078.505.9.0100.00</p>
        <img width="400" src="media/reducer.gif" class="img-fluid">
        <p style="margin-top: 16px">Редуктор необходим для передачи мощности и регулирования скорости вращения валов, производящие крутящий момент.</p>
        `
    },
    'item2_0': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate(0)
        },
        animation: {
            loop: false,
            autoPlay: true,
            duration: 1000 * 1,
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
        },
        content: `
        <h2>Корпус</h2>
        <p>Описание детали</p>
        `
    },
    'item2_1': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([4, 6]);
            NOP_VIEWER.fitToView([4, 6]);
        },
        content: `
        <h2>Корпус</h2>
        <p>Описание детали</p>
        `
    },
    'item2_2': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([35, 76]);
            NOP_VIEWER.fitToView([35, 76]);
        },
        content: `
        <h2 style="margin-bottom: 16px">Зубчатая передача</h2>
        <p>В основе одноступенчатого редуктора лежит зубчатая передача, состоящая из пары зубчатых колес.</p>
        <p>Меньшее из них называют <a href="#" class="highlightLink" nodeId="76">шестерней</a>, а большее —  <a href="#" class="highlightLink" nodeId="35">шестерней</a>.</p>
        <p>Принцип работы передачи основан на зацеплении зубчатых колес, когда зубья одного из них входят во впадины другого.</p>
        <p>Зубчатые передачи служат для передачи вращательного движения с одного вала на другой, и изменения частоты вращения.</p>
        <p>В двухступенчатых редукторах применяются уже три шестеренки с промежуточным валом.</p>
        `
    },
    'item2_3': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([72, 76]);
            NOP_VIEWER.fitToView([72, 76]);
        },
        content: `
        <h2>Двигатель</h2>
        <p>Описание детали</p>
        `
    },
    'item2_4': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([66]);
            NOP_VIEWER.fitToView([66]);

        },
        content: `
        <h2>Тихоходный вал</h2>
        <p>Описание детали</p>
        `
    },
    'item2_5': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64]);
            NOP_VIEWER.fitToView([9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64]);
        },
        content: `
        <h2>Подшипники</h2>
        <p>Описание детали</p>
        `
    },
    'item3_1': {
        init: function () {
            NOP_VIEWER.isolate(0);
            NOP_VIEWER.setGhosting(false);
            NOP_VIEWER.hide(4);
            NOP_VIEWER.fitToView(0);
        },
        annotations: [
            { point: new THREE.Vector3(100, 0, 0), text: 'Text1', hide: true },
            { point: new THREE.Vector3(-100, 0, 100), text: 'Text2', hide: false },
        ],
        animation: {
            loop: true,
            autoPlay: true,
            duration: 1000 * 60,
            frames: [
                {
                    at: 0,
                    properties: [
                        {
                            for: 'node', nodeId: [35],
                            params: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(360 * 0), THREE.Math.degToRad(0)),
                            }
                        },
                        {
                            for: 'node', nodeId: [76],
                            params: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(0), 0),
                            }
                        },
                        {
                            for: 'node', nodeId: [66],
                            params: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(0), 0),
                            }
                        },
                        {
                            for: 'node', nodeId: [164],
                            params: {
                                position: new THREE.Vector3(0, 0, 0),
                            }
                        },
                        {
                            for: 'annotation', annotationId: 1,
                            params: {
                                opacity: 1
                            }
                        },
                    ]
                },
                {
                    at: 1000 * 5,
                    properties: [
                        {
                            for: 'annotation', annotationId: 1,
                            params: {
                                opacity: 0
                            }
                        }
                    ]
                },
                {
                    at: 1000 * 10,
                    properties: [
                        {
                            for: 'annotation', annotationId: 2,
                            params: {
                                opacity: 1
                            }
                        }
                    ]
                },
                {
                    at: 1000 * 15,
                    properties: [
                        {
                            for: 'annotation', annotationId: 2,
                            params: {
                                opacity: 0
                            }
                        }
                    ]
                },
                {
                    at: 1000 * 60,
                    properties: [
                        {
                            for: 'node', nodeId: [35],
                            params: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(360 * 5), THREE.Math.degToRad(0)),
                            }
                        },
                        {
                            for: 'node', nodeId: [76],
                            params: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(-360 * 20), THREE.Math.degToRad(0)),
                            }
                        },
                        {
                            for: 'node', nodeId: [66],
                            params: {
                                rotation: new THREE.Euler(0, THREE.Math.degToRad(360 * 5), 0),
                            }
                        },
                        {
                            for: 'node', nodeId: [164],
                            params: {
                                position: new THREE.Vector3(0, -100, 0),
                            }
                        }
                    ]
                }
            ]
        },
        content: `
        <h2>Как работает редуктор?</h2>
        <p>Описание детали</p>
        `
    },
}