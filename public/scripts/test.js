var master;
var info = document.querySelector("#questionInfo");
var winId = -1;
var right;
var wrong;

function checkQuestionRadio(questionId, winId) {
    if (questionId == 1) {
        right = 0;
        wrong = 0;
    }
    master = $('#test').data('master');
    let info = document.querySelector("#questionInfo");
    if (document.querySelector("#opt" + questionId + "_" + winId).checked) {
        info.style.display = "none";
        right++;
        console.log(true)
    } else {
        wrong++;
        console.log(false)
    }
    if (questionId == 2) {
        checkQuestionViewer(4);
    }
    if (questionId == 5) {
        checkQuestionViewer(6);
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
            console.log(true)
        } else {
            wrong++;
            console.log(false)
        }
        document.querySelector("#viewer").removeEventListener("click", questionViewerClick);
        master.next();
        document.querySelector("#rightAns").innerText = right;
        document.querySelector("#wrongAns").innerText = wrong;
        if (wrong == 0) {
            document.querySelector("#testResult").innerText = "Поздравляем, вы успешно прошли тест!";
        } else if (right == 0) {
            document.querySelector("#testResult").innerText = "Вы ответили неправильно на все вопросы, вам следует пройти тест еще раз!"
        } else {
            document.querySelector("#testResult").innerText = "Вы допустили несколько ошибок в тесте, рекомендуем поройти его еще раз!"
        }

    }
}

function restartTest() {
    master.toPage(0);
}