var master;
var winId = -1;
var right;
var wrong;
var questionsInfo = [];


function checkQuestionRadio(questionId, winId) {
    if (questionId == 1) {
        right = 0;
        wrong = 0;
        questionsInfo = [];
    }
    master = $('#test').data('master');
    if (document.querySelector("#opt" + questionId + "_" + winId).checked) {
        right++;
        questionsInfo.push(true);
        console.log("right: " + right + " wrong: " + wrong);
    } else {
        wrong++;
        questionsInfo.push(false);
        console.log("right: " + right + " wrong: " + wrong);
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
            questionsInfo.push(true);
            winId = -1;
            console.log("right: " + right + " wrong: " + wrong);
        } else {
            questionsInfo.push(false);
            wrong++;
            console.log("right: " + right + " wrong: " + wrong);
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
        checkQuestionViewer(72);
        document.querySelector("#viewer").removeEventListener("click", questionViewerClick);
    }
    if (questionsInfo.pop()) {
        right--;
    } else {
        wrong--;
    }
    master.prev();
    console.log("right: " + right + " wrong: " + wrong);
}

function restartTest() {
    master.toPage(0);
}