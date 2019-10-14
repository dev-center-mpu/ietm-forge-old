var master;
var winId = -1;
var right;
var wrong;
var lastRight;
var lastWrong;


function checkQuestionRadio(questionId, winId) {
    if (questionId == 1) {
        right = 0;
        wrong = 0;
    }
    lastRight = right;
    lastWrong = wrong;
    master = $('#test').data('master');
    if (document.querySelector("#opt" + questionId + "_" + winId).checked) {
        right++;
        console.log(true)
    } else {
        wrong++;
        console.log(false)
    }
    if (questionId == 2) {
        checkQuestionViewer(35);
        viewer.hide([4]);
    }
    if (questionId == 5) {
        viewer.hide([4]);
        checkQuestionViewer(72);
    }

    master.next();
}

function checkQuestionViewer(id) {
    winId = id;
    document.querySelector("#viewer").addEventListener("click", questionViewerClick);
}


function questionViewerClick() {

    if (viewer.getSelection().length > 0) {
        if (winId == viewer.getSelection()) {
            right++;
            winId = -1;
        } else {
            wrong++;
        }
        document.querySelector("#viewer").removeEventListener("click", questionViewerClick);
        viewer.show([4]);
        master.next();
        document.querySelector("#rightAns").innerText = right;
        document.querySelector("#wrongAns").innerText = wrong;
        if (wrong == 0) {
            document.querySelector("#testResult").innerText = "Поздравляем, вы успешно прошли тест!";
        } else if (right == 0) {
            document.querySelector("#testResult").innerText = "Вы ответили неправильно на все вопросы, вам следует пройти тест еще раз!"
        } else {
            document.querySelector("#testResult").innerText = "Вы допустили несколько ошибок в тесте, рекомендуем пройти его еще раз!"
        }

    }
}

function back(id) {
    if (id == 3) {
        checkQuestionViewer(35);
        viewer.hide([4]);
    }
    if (id == 2 || id == 5) {
        viewer.show([4]);
        document.querySelector("#viewer").removeEventListener("click", questionViewerClick);
    }
    right = lastRight;
    wrong = lastWrong;
    master.prev();
    console.log(right + " " + wrong);
}

function restartTest() {
    master.toPage(0);
}