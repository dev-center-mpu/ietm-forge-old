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
    'item2': {
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
                    properties: [
                        {
                            for: 'camera',
                            params: {
                                target: new THREE.Vector3(0, 0, 0),
                                position: new THREE.Vector3(333, 333, 333),
                                up: new THREE.Vector3(0, 1.0, 0)
                            }
                        },
                        {
                            for: 'node', nodeId: [66],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [68],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [72],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [6],
                            for: 'node', params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [4],
                            for: 'node', params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64], // подшипник верхний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33], // подшипник нижний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [160, 162, 164, 166], // болты двигателя
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [152, 154, 156, 158], // шайбы болтов двигателя
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [94, 98, 102, 106, 110, 114, 118], // болты нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [92, 96, 100, 104, 108, 112, 116], // шайбы болтов нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [74],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [78], // верхняя прокладка шестерни
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [122, 124, 128, 132, 136, 140, 144, 148], // болты верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [120, 126, 130, 134, 138, 142, 146, 150], // шайбы болтов верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [70], // верхняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [86], // нижняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [37], // толстая прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [80], // крепеж
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [168], // болт крепежа
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                    ]
                },
                {
                    at: 1000 * 1,
                    properties: [
                        {
                            for: 'camera',
                            params: {
                                target: new THREE.Vector3(-30, 60, -30),
                                position: new THREE.Vector3(666 * 0.95, 666 * 0.95, 666 * 0.95),
                                up: new THREE.Vector3(-0.365, -0.415, 0.833)
                            }
                        },
                        {
                            for: 'node', nodeId: [66], // вал
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 430, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [122, 124, 128, 132, 136, 140, 144, 148], // болты верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 420, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [120, 126, 130, 134, 138, 142, 146, 150], // шайбы болтов верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 390, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [68], // крышка вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 380, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [70], // верхняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 310, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64], // подшипник верхний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 270, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [4], // верхняя крышка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 200, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [168], // болт крепежа
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 70, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [37], // толстая прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 50, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [80], // крепени 
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 40, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [78], // верхняя прокладка шестерни
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 20, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [74], // нижняя прокладка шестерни
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -20, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33], // подшипник нижний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -100, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [86], // нижняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -110, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [6], // нижняя крышка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -150, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [92, 96, 100, 104, 108, 112, 116], // шайбы болтов нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -158, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [94, 98, 102, 106, 110, 114, 118], // болты нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -200, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [72], // двигатель
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -260, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [152, 154, 156, 158], // шайбы болтов двигателя
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -330, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [160, 162, 164, 166], // болты двигателя
                            params: {
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
                    at: 1000 * 1,
                    properties: [
                        {
                            for: 'camera',
                            params: {
                                target: new THREE.Vector3(0, 0, 0),
                                position: new THREE.Vector3(333, 333, 333),
                                up: new THREE.Vector3(0, 1.0, 0)
                            }
                        },
                        {
                            for: 'node', nodeId: [66],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [68],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [72],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [6],
                            for: 'node', params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            nodeId: [4],
                            for: 'node', params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64], // подшипник верхний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33], // подшипник нижний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [160, 162, 164, 166], // болты двигателя
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [152, 154, 156, 158], // шайбы болтов двигателя
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [94, 98, 102, 106, 110, 114, 118], // болты нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [92, 96, 100, 104, 108, 112, 116], // шайбы болтов нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [74],
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [78], // верхняя прокладка шестерни
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [122, 124, 128, 132, 136, 140, 144, 148], // болты верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [120, 126, 130, 134, 138, 142, 146, 150], // шайбы болтов верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [70], // верхняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [86], // нижняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [37], // толстая прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [80], // крепеж
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [168], // болт крепежа
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 0, 0),
                                scale: undefined
                            }
                        },
                    ]
                },
                {
                    at: 0,
                    properties: [
                        {
                            for: 'camera',
                            params: {
                                target: new THREE.Vector3(-30, 60, -30),
                                position: new THREE.Vector3(666 * 0.95, 666 * 0.95, 666 * 0.95),
                                up: new THREE.Vector3(-0.365, -0.415, 0.833)
                            }
                        },
                        {
                            for: 'node', nodeId: [66], // вал
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 430, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [122, 124, 128, 132, 136, 140, 144, 148], // болты верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 420, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [120, 126, 130, 134, 138, 142, 146, 150], // шайбы болтов верхней крышки вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 390, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [68], // крышка вала
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 380, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [70], // верхняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 310, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64], // подшипник верхний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 270, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [4], // верхняя крышка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 200, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [168], // болт крепежа
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 70, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [37], // толстая прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 50, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [80], // крепени 
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 40, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [78], // верхняя прокладка шестерни
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, 20, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [74], // нижняя прокладка шестерни
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -20, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33], // подшипник нижний
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -100, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [86], // нижняя прокладка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -110, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [6], // нижняя крышка
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -150, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [92, 96, 100, 104, 108, 112, 116], // шайбы болтов нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -158, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [94, 98, 102, 106, 110, 114, 118], // болты нижней крышки
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -200, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [72], // двигатель
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -260, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [152, 154, 156, 158], // шайбы болтов двигателя
                            params: {
                                rotation: undefined,
                                position: new THREE.Vector3(0, -330, 0),
                                scale: undefined
                            }
                        },
                        {
                            for: 'node', nodeId: [160, 162, 164, 166], // болты двигателя
                            params: {
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
            { id: 1, point: new THREE.Vector3(100, 0, 0), text: 'Text1', hide: true },
            { id: 2, point: new THREE.Vector3(-100, 0, 100), text: 'Text2', hide: false },
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
                        {
                            for: 'annotation', annotationId: 2,
                            params: {
                                opacity: 0
                            }
                        },
                    ]
                },
                {
                    at: 1000 * 2,
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
                    at: 9990,
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
                    at: 1000 * 18,
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
                    at: 1000 * 20,
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