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
        <p>Корпус предназначен для размещения в нем деталей узла, для обеспечения смазки передач и подшипников,
        а также для предохранения деталей от загрязнения и для восприятия усилий, возникающих при работе.</p>
        <p> Он должен быть достаточно прочным и жестким, так как при деформациях корпуса возможен перекос валов,который приводит к неравномерности распределения нагрузки.</p>
        <img src='https://www.oborudunion.ru/l2390650/images/photocat/1000x1000/1000128537.jpg' width='80%'/> 
        <p>Для удобства монтажа деталей корпус обычно делают разъемным. В горизонтальных редукторах плоскость разъема проходит по осям валов. В вертикальных цилиндрических 
        одноступенчатых редукторах обычно делают разъемы по двум горизонтальным плоскостям, проходящим через оси валов, а в двухступенчатых даже по трем. <a href="#" class="highlightLink" nodeId="6">Нижнюю</a> часть корпуса
         с одной плоскостью разъема называют основанием или корпусом, а <a href="#" class="highlightLink" nodeId="4">верхнюю</a> крышкой корпуса. 
        В коробках передач, в отдельных конструкциях червячных редукторов, легких зубчатых редукторах и в мотор-редукторах применяют цельные корпуса со съемными крышками.</p>
        <img src='https://sc02.alicdn.com/kf/HTB1H_aEX5rxK1RkHFCcq6AQCVXag/Vertical-Iron-shell-gearbox-wpa-gear-reducer.jpg' width='70%' />
        <p>В серийном производстве широко распространены стандартизованные литые корпуса редукторов. Чаще всего в тяжёлой промышленности и машиностроении применяются корпуса
         из литейного чугуна, реже из литейных сталей. Когда требуется максимально облегчить конструкцию применяют легкосплавные корпуса. На корпусе редуктора чаще всего имеются места 
         крепления — лапы и/или уши, за которые перемещают и/или крепят редукторы к основанию. На выходе валов располагают уплотнения для предотвращения вытекания масла.
         На корпусах редукторов зачастую располагают конструкционные элементы, предотвращающие увеличение давления внутри редуктора, возникающее от нагрева редуктора при его работе.</p>
       
        <hr>
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
        <p>Меньшее из них называют <a href="#" class="highlightLink" nodeId="76">шестерней</a>, а большее —  <a href="#" class="highlightLink" nodeId="35">колесом</a>.</p>
        <p>Принцип работы передачи основан на зацеплении зубчатых колес, когда зубья одного из них входят во впадины другого.</p>
        <p>Зубчатые передачи служат для передачи вращательного движения с одного вала на другой, и изменения частоты вращения.</p>
        <p>В двухступенчатых редукторах применяются уже три шестеренки с промежуточным валом.</p>
        <img src="https://www.ttaars.ru/upload/iblock/39c/39cb4b57b51517f720a9bbb2816e4dac.png"/>
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
        <p>Электрический двигатель -  машина, с помощью которой электрическая энергия преобразуется 
        в механическую, для приведения в движение различных механизмов. 
        Электродвигатель является основным элементом электропривода.</p>
        <p>По виду создаваемого механического движения электродвигатели бывают вращающиеся, 
        линейные и др. Под электродвигателем чаще всего 
        подразумевается вращающийся электродвигатель, так как он получил наибольшее применение.</p>
        <img src="http://www.weg.kiev.ua/img/ac_motors.jpg" width="90%"/>
        <h4>Виды электродвигателей</h4>
        <p>Сегодня существуют довольно много электродвигателей разных конструкций и типов. Их можно разделить <b>по типу электропитания</b>:</p>
        <ul>
            <li><b>Переменного тока</b>, работающие напрямую от электросети.</li>
            <li><b>Постоянного тока</b>, которые работают от батареек, АКБ, блоков питания или других источников постоянного тока.</li>
        </ul>
        <ul>
            <p><b>По принципу работы</b>:</p>
            <li><b>Синхронные</b>, , в которых есть обмотки на роторе и щеточный механизм для подачи на них электрического тока.</li>
            <li><b>Асинхронные</b>, самый простой и распространенный вид мотора. В них нет щеток и обмоток на роторе.</li>
        </ul>
        <hr>
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
        <p>Вал редуктора, через который осуществляется выход потока мощности на исполнительную машину.
        </p>
        <img src='./img/val1.png'>
        <p>В зависимости от технологии вал может быть: быстроходным, тихоходным и промежуточным. Для редуктора 
        (понижающего количество оборотов) быстроходный вал соединён с приводным механизмом. У мультипликатора 
        (повышающего количество оборотов) с приводом соединён тихоходный вал. Как правило, для механического соединения 
        вала редуктора с приводным устройством используется муфтовое соединение.
        На приводной вал насажено главное приводное зубчатое колесо, которое в зависимости от количества ступеней находится в 
        зацеплении с шестерней промежуточного или тихоходного вала.
        </p>
        <img src='./img/val2.png'>
        <p>Как правило валы редукторов изготовляются из стали марки 40 или её зарубежного аналога. Имеет форму цилиндра с разными 
        диаметрами по всей длине и шпоночными пазами в местах посадки зубчатых валов или других технологических компонентов (например, 
            рабочее колесо насоса или компрессора). 
        Устанавливается в редукторе на подшипниках, которые, в свою очередь, размещаются в посадочных местах в корпусе редуктора.</p>
        <hr>
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
        <p><b>Подшипники</b> - это технические устройства, являющиеся частью опор вращающихся осей и валов.
        Они воспринимают радиальные и осевые нагрузки, приложенные к валу или оси, и передают их на раму, 
        корпус или иные части конструкции. При этом они должны также удерживать вал в пространстве, обеспечивать вращение,
        качание или линейное перемещение с минимальными энергопотерями. От качества подшипников в значительной мере зависит коэффициент полезного действия,
        работоспособность и долговечность машины.</p>
        <img src="https://realbassparts.ru/wa-data/public/shop/products/46/19/1946/images/2032/2032.750x0.jpg" width="70%" title="Подшипник качения"/>
        <p><b>По виду трения различают</b>:</p>
        <ul>
            <li>Подшипники скольжения, в которых опорная поверхность оси или вала скользит по рабочей поверхности подшипника.</li>
            <li>Подшипники качения, в которых используется трение качения благодаря установке шариков или роликов между подвижным и неподвижным кольцами подшипника.</li>
        </ul>
        <img src="https://kz.all.biz/img/kz/catalog/more/2291611_podshipniki_skolzheniya.jpeg" width="70%" title="Подшипник скольжения"/>
        <p><b>Основные параметры подшипников</b>:</p>
        <ul>
            <li>Максимальная динамическая и статическая нагрузка (радиальная и осевая).</li>
            <li>Максимальная скорость (оборотов в минуту для радиальных подшипников).</li>
            <li>Посадочные размеры.</li>
            <li>Класс точности подшипников.</li>
            <li>Требования к смазке.</li>
            <li>Ресурс подшипника до появления признаков усталости, в оборотах.</li>
            <li>Шумы подшипника</li>
            <li>Вибрации подшипника</li>
        </ul>
        <hr>
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
        <p>Принцип работы механического редуктора основан на передаче вращательного момента от одного вала другому посредством
         взаимодействия зубчатых деталей, неподвижно закрепленных на них. Линейная скорость зубьев одинаковая. Она не может быть разной, поскольку контакт жесткий.</p>
         <p>Принципом действия редуктора является давление зуба на поверхность аналогичного со смежной детали и передача при этом усилия,
          двигающего <a href="#" class="highlightLink" nodeId="35">ведомое колесо</a>. В 
         результате скорость вращения уменьшается. На <a href="#" class="highlightLink" nodeId="66">выходном валу<a>
          создается усилие, которое способно привести в движение исполняющий механизм.</p>
         <p>Главная пара всегда первая, быстроходная <a href="#" class="highlightLink" nodeId="76">шестерня<a> или червяк, соединенный с 
         <a href="#" class="highlightLink" nodeId="72">двигателем</a> и соответствующее ему колесо.
          По ее типу определяется и весь узел.
         Количество ступеней равно количеству зацеплений, имеющих передаточное число больше 1.</p>
         <p>Кроме рабочих шестерен могут использоваться паразитки – шестерни, которые не изменяют крутящий момент,
          только направление вращения колеса и соответственно вала, на котором оно расположено.</p>
        `
    },
    'item6': {
        init: function () {
            NOP_VIEWER.isolate(0);
            NOP_VIEWER.fitToView(0);
            console.log('item6 loaded')
        },
        content: `
        
      <div data-role="master" data-effect="slide" id="test">
        <div class="page">
        <h2>Тест</h2>  
          <div id="q1" class="card">
            <p class="card-header questionNum"><b>Вопрос №1</b></p>
            <div class="card-content p-2">
              <p class="question">Как называется зубчатое колесо с меньшим числом зубьев?</p>
              <input class="form-check-input" type="radio" name="q1_rad" id="opt1_1" data-role="radio" data-style="2"
                data-caption="Подшипник"> <br>
              <input class="form-check-input" type="radio" name="q1_rad" id="opt1_2" data-role="radio" data-style="2"
                data-caption="Колесо"> <br>
              <input class="form-check-input" type="radio" name="q1_rad" id="opt1_3" data-role="radio" data-style="2"
                data-caption="Шестерня"> <br>
              <input class="form-check-input" type="radio" name="q1_rad" id="opt1_4" data-role="radio" data-style="2"
                data-caption="Вал"> <br>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-sm" onclick="checkQuestionRadio(1,3)">Подтвердить</button>
            </div>
          </div>
        </div>
        <div class="page">
          <div id="q2" class="card">
            <p class="card-header"><b>Вопрос №2</b></p>
            <div class="card-content p-2">
              <img style="float:right; height:200px; margin-bottom:10px; margin-right:50px"
                src="./img/Ball_Bearing.png" />
              <p class="question">
                Подшипник какого типа показан на картинке?
              </p>
              <input class="form-check-input" type="radio" name="q2_rad" id="opt2_1" data-role="radio" data-style="2"
                data-caption="Качения"><br>
              <input class="form-check-input" type="radio" name="q2_rad" id="opt2_2" data-role="radio" data-style="2"
                data-caption="Скольжения"><br>
            </div>
            <div class="card-footer" style="clear:both">
              <button class="btn btn-danger btn-sm" onclick="back(1)">Назад</button>  
              <button class="btn btn-primary btn-sm" onclick="checkQuestionRadio(2,1)">Подтвердить</button>
            </div>
          </div>
        </div>
        <div class="page">
          <div id="q3" class="card">
            <p class="card-header"><b>Вопрос №3</b></p>
            <div class="card-content p-2">
              <p class="question">В окне вьювера выберите ведомое зубчатое колесо</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger btn-sm" onclick="back(2)">Назад</button>  
            </div>
          </div>
        </div>
        <div class="page">
          <div id="q4" class="card">
            <p class="card-header questionNum"><b>Вопрос №4</b></p>
            <div class="card-content p-2">
              <p class="question">Какой из перечисленных элементов <b>не</b> входит в конструкцию редуктора, представленного в
                окне вьювера</p>
              <input class="form-check-input" type="radio" name="q4_rad" id="opt4_1" data-role="radio" data-style="2"
                data-caption="Электродвигатель"> <br>
              <input class="form-check-input" type="radio" name="q4_rad" id="opt4_2" data-role="radio" data-style="2"
                data-caption="Подшипник"> <br>
              <input class="form-check-input" type="radio" name="q4_rad" id="opt4_3" data-role="radio" data-style="2"
                data-caption="Зубчатое колесо"> <br>
              <input class="form-check-input" type="radio" name="q4_rad" id="opt4_4" data-role="radio" data-style="2"
                data-caption="Промежуточный вал"> <br>
            </div>
            <div class="card-footer">
              <button class="btn btn-danger btn-sm" onclick="back(3)">Назад</button>  
              <button class="btn btn-primary btn-sm" onclick="checkQuestionRadio(4,4)">Подтвердить</button>
            </div>
          </div>
        </div>
        <div class="page">
          <div id="q5" class="card">
            <p class="card-header"><b>Вопрос №5</b></p>
            <img src="http://gendocs.ru/gendocs/docs/36/35112/conv_1/file1_html_17f394a2.gif"
              style="float:right; height:200px; margin-bottom:10px; margin-right:50px" />
            <div class="card-content p-2">
              <p class="question">
                Если <i>z<sub>1</sub></i> - число зубьев ведущего звена, а <i>z<sub>2</sub></i> - ведомого, то что
                обозначает <i>u</i> в данной формуле
              </p>
              <input class="form-check-input" type="radio" name="q5_rad" id="opt5_1" data-role="radio" data-style="2"
                data-caption="Модуль"> <br>
              <input class="form-check-input" type="radio" name="q5_rad" id="opt5_2" data-role="radio" data-style="2"
                data-caption="Передаточное отношение"> <br>
              <input class="form-check-input" type="radio" name="q5_rad" id="opt5_3" data-role="radio" data-style="2"
                data-caption="Вращающий момент на ведущем валу"> <br>
              <input class="form-check-input" type="radio" name="q5_rad" id="opt5_4" data-role="radio" data-style="2"
                data-caption="Мощность на ведущем валу"> <br>
              <input class="form-check-input" type="radio" name="q5_rad" id="opt5_5" data-role="radio" data-style="2"
                data-caption="Коэффициент динамической нагрузки">
            </div>
            <div class="card-footer">
              <button class="btn btn-danger btn-sm" onclick="back(4)">Назад</button>  
              <button class="btn btn-primary btn-sm" onclick="checkQuestionRadio(5,2)">Подтвердить</button>
            </div>
          </div>
        </div>
        <div class="page">
          <div id="q5" class="card">
            <p class="card-header"><b>Вопрос №6</b></p>
            <div class="card-content p-2">
              <p class="question">В окне вьювера выберите электродвигатель</p>
              <div class="card-footer">
                <button class="btn btn-danger btn-sm" onclick="back(5)">Назад</button>  
              </div>
            </div>
          </div>
        </div>
        <div class="page">
          <div class="social-box" id="final">
            <div class="header bg-cyan fg-white">
              <div class="title" id="testResult"></div>
            </div>
            <ul class="skills">
              <li>
                <div class="text-bold" id="rightAns"></div>
                <div>Правильные ответы</div>
              </li>
              <li>
                <button class="btn btn-outline-primary" onclick="restartTest()" id="btnQ1">Перепройти</button>
              </li>
              <li>
                <div class="text-bold" id="wrongAns"></div>
                <div>Неправильные ответы</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
        `
    },
}