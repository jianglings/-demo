const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const passwd = document.getElementById('passwd');
const confirmPasswd = document.getElementById('confirmPasswd');

//事件监听
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([userName, email, passwd, confirmPasswd]);
    checkLength(userName, 3, 15);
    checkLength(passwd, 6, 12);
    checkEmail(email);
    checkPasswordsMatch(passwd, confirmPasswd);
})

//主要函数
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() == '') {
            showError(input, `${getKeyWords(input)}不能为空`)
        } else {
            showSuccess(input)
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getKeyWords(input)}需要至少${min}个字符`);
    } else if (input.value.length > max) {
        showError(input, `${getKeyWords(input)}应少于${max}个字符`);
    } else {
        showSuccess(input)
    }
}

function checkPasswordsMatch(passwd, confirmPasswd) {
    if (passwd.value !== confirmPasswd.value) {
        showError(confirmPasswd, '两次密码输入不一致')
    }
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// 辅助函数

function getKeyWords(input) {
    return input.placeholder.slice(3)
}

function checkEmail(email) {
    const re = /^([A - Za - z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (re.test(String(email))) {
        showSuccess(email)
    } else {
        showError(email, '邮箱格式错误')
    }
}