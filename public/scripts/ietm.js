var ietm = {
    'item1': {
        init: function () {
            NOP_VIEWER.isolate(0);
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
    'item2_1': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([4, 6]);
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
        },
        content: `
        <h2>Зубчатая передача</h2>
        <p>Описание детали</p>
        `
    },
    'item2_3': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([72, 76]);
        },
        content: `
        <h2>Двигатель</h2>
        <p>Описание детали</p>
        `
    },
    'item2_4': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([35, 66]);
        },
        content: `
        <h2>Тихоходный вал</h2>
        <p>Описание детали</p>
        `
    },
    'item2_5': {
        init: function () {
            NOP_VIEWER.setGhosting(true);
            NOP_VIEWER.isolate([9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66]);
        },
        content: `
        <h2>Подшипники</h2>
        <p>Описание детали</p>
        `
    },
}