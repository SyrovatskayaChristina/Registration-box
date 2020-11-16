var thisYear = 2020,
    userName = document.getElementById("username"),
    userLastName = document.getElementById("userlastname"),
    bdDay = document.getElementById("bdday"),
    bdMonth = document.getElementById("bdmonth"),
    bdYear = document.getElementById("bdyear"),
    errorMessage = "Заполните все поля",
    окMessage = "Данные успешно отправлены",
    messageElement = document.getElementById('message'),
    buttonConfirm = document.getElementById('regBtn'),
    userCity = document.getElementById('city');
var userData = [];
var editLine;

/* Устанавливает поле красным*/
function setRedBorder(input) {
    input.style.border = "1px solid red ";
}

/* Устанавливает поле черным*/
function setBlackBorder(input) {
    input.style.border = "1px solid gray ";
}

//Проверка кол-во символов в имени
function checkName() {
    if (userName.value.length > 10) {
        setRedBorder(userName);
    } else {
        setBlackBorder(userName);
    }
}

//Проверка кол-во символов в фамилии
function checkLastName() {
    if (userLastName.value.length > 15) {
        setRedBorder(userLastName);
    } else {
        setBlackBorder(userLastName);
    }
}

// Устанавливает три поля дат красным
function setAllRedBorders(bdDay, bdMonth, bdYear) {
    setRedBorder(bdDay);
    setRedBorder(bdMonth);
    setRedBorder(bdYear);
}

// Устанавливает три поля дат черным
function setAllBlackBorders(bdDay, bdMonth, bdYear) {
    setBlackBorder(bdDay);
    setBlackBorder(bdMonth);
    setBlackBorder(bdYear);
}

//Проверка окна "день" дня рождения
function checkBdDay() {
    if (isNaN(bdDay.value) || bdDay.value.length > 2 || bdDay.value > 31) {
        setAllRedBorders(bdDay, bdMonth, bdYear);
    } else if (bdDay.value.length == 0) {
        setRedBorder(bdDay);
    } else {
        setAllBlackBorders(bdDay, bdMonth, bdYear);
    }
}

//Проверка окна "месяц" дня рождения
function checkBdMonth() {
    if (isNaN(bdMonth.value) || bdMonth.value.length > 2 || bdMonth.value > 12) {
        setAllRedBorders(bdDay, bdMonth, bdYear);
    } else if (bdMonth.value.length == 0) {
        setRedBorder(bdMonth);
    } else {
        setAllBlackBorders(bdDay, bdMonth, bdYear);
    }
}

//Проверка окна "год" дня рождения
function checkBdYear() {
    if (isNaN(bdYear.value) || bdYear.value.length !== 4 || bdYear.value >= thisYear) {
        setAllRedBorders(bdDay, bdMonth, bdYear);
    } else if (bdYear.value.length == 0) {
        setRedBorder(bdYear);
    } else {
        setAllBlackBorders(bdDay, bdMonth, bdYear);
    }
}


//вызов собития создания таблицы при нажатии на кнопку "Отправить"
buttonConfirm.onclick = function() {
    userData.push({
        "Id": 1 + userData.length,
        "Firstname": userName.value,
        "Lastname": userLastName.value,
        "Birthday": bdDay.value + "/" + bdMonth.value + "/" + bdYear.value,
        "City": userCity.options[userCity.selectedIndex].value
    });
    InitGrid();
};

//Редактирование в таблице
function editRow(id) {
    if (id && id !== editLine) {
        $("#jqGrid").jqGrid('restoreRow', editLine);
        $("#jqGrid").jqGrid('editRow', id, {
            keys: true,
            onEnter: function(rowid, options, event) {
                if (confirm("Save the row?") === true) {
                    $(this).jqGrid("saveRow", rowid, options);
                }
            }
        });
        editLine = id;
    }
}

//Создание таблицы
function InitGrid() {
    {
        $("#jqGrid").jqGrid({
            datatype: "local",
            editurl: 'clientArray',
            data: userData,
            mtype: "GET",
            colModel: [{
                    label: "Id",
                    name: 'Id',
                    key: true,
                    width: 75
                },
                {
                    label: "Firstname",
                    name: 'Firstname',
                    key: true,
                    width: 75,
                    editable: true,
                    edittype: "text"
                },
                {
                    label: "Lastname",
                    name: 'Lastname',
                    key: true,
                    width: 75,
                    editable: true,
                    edittype: "text"
                },
                {
                    label: "Birthday",
                    name: 'Birthday',
                    key: true,
                    width: 75,
                    editable: true,
                    edittype: "text"
                },
                {
                    label: "City",
                    name: 'City',
                    key: true,
                    width: 75,
                    editable: true,
                    edittype: "select",
                    editoptions: {
                        value: "Санкт-Петербург: Санкт-Петербург; Москва : Москва; Тула: Тула"
                    }
                }
            ],
            viewrecords: true,
            width: 780,
            height: 250,
            rowNum: 20,
            onSelectRow: editRow
        });
    }
    $('#jqGrid').trigger('reloadGrid'); //возможность добавления следующей строки
}