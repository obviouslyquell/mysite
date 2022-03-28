let timeContainer = document.getElementById('time');
let messageContainer = document.getElementById('message-container')
let toggleDisplay = document.getElementById('toggle__display');
let inputForMessage = document.getElementById('input-for-message');
let btnForMessage = document.getElementById('input__btn')

setInterval(function () {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    timeContainer.innerHTML = hours + ':' + minutes; // обновляет время
}, 10);


class Message {
    constructor(text) {
        this.text = text;

    }
    generateHTML() { // метод запиливает темплейт и выводит в HTML см. :34
        return `<li class="chat-item__from-me">
                    <p class="message-content">
                         ${this.text}
                     </p>
                 </li>`
    }
}

let myMessages = ['Привет, я Ботяра, можешь пообщаться со мной или я расскажу тебе про своего хозяина'] // arr для текстов сообщений
let MessagesFromPerson = []



function createMessageFromMe() {
    return new Promise((resolve, reject) => {
        toggleDisplay.classList.remove('toggle__display')
        myMessages.forEach((e, index) => {
            setTimeout(function () {
                textes = new Message(e) // цикл с таймаутом для создания сообщений
                messageContainer.innerHTML += textes.generateHTML()
            }, 2000 * (index + 1)) // index нужен из за особенности setTimeout()   
        });
        setTimeout(() => {
            resolve(toggleDisplay.classList.add('toggle__display'), messageContainer.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            })) // settimeout для toggleClass 
        }, 2000 * myMessages.length); // общая длительность отправки сообщений
        myMessages = []; // обнуление массива чтобы добавлять сообщения в будущем
    })

}

createMessageFromMe().then((resMessage) => {
    resMessage
});


// ЧТОБЫ СОЗДАТЬ НОВОЕ СООБЩЕНИЕ ДОБАВЬ В МАССИВ myMessages строку и запусти createMessageFromMe()

inputForMessage.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault() // без этого не скроллится по нажатию на enter
        if (inputForMessage.value != '') {
            MessagesFromPerson.push(inputForMessage.value) // добавляет сообщение от пользователя в массив
            messageContainer.innerHTML += `<li class="chat-item__from-person">
                                                <p class="message-content">
                                                     ${inputForMessage.value}
                                                 </p>
                                             </li>`
        }
        inputForMessage.value = ''
        messageContainer.scrollIntoView({
            block: 'end',
            behavior: 'smooth'
        }) // опускает скролл в конец

        chatBot(MessagesFromPerson[0])
    }

})

btnForMessage.addEventListener('click', () => {
    if (inputForMessage.value != '') {
        MessagesFromPerson.push(inputForMessage.value) // добавляет сообщение от пользователя в массив
        messageContainer.innerHTML += `<li class="chat-item__from-person">
                                            <p class="message-content">
                                                 ${inputForMessage.value}
                                             </p>
                                         </li>`
    }
    inputForMessage.value = ''
    messageContainer.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
    }) // опускает скролл в конец

    chatBot(MessagesFromPerson[0])
})


function chatBot(message) {
    
    let arrMessage = message.split(' ');
    for (let i = 0; i < arrMessage.length; i++) {
        if (badWords.includes(arrMessage[i]) || badWords.includes(arrMessage[i][0].toUpperCase() + arrMessage[i].substring(1))) {
            myMessages.push('Не ругайся')
            break;
        }
        if (insults.includes(arrMessage[i]) || insults.includes(arrMessage[i][0].toUpperCase() + arrMessage[i].substring(1))) {
            myMessages.push('Сам ' + arrMessage[i])
            break;
        }
    }

    for (let i = 0; i < remessage.length; i++) {
        if (remessage[i].text.toUpperCase() === message) {
            myMessages.push('Не кричи, ' + remessage[i].response.toLowerCase()); // ответ на капс
            
            break;
        }else if (remessage[i].text === message || remessage[i].text.toLowerCase() === message) {
            myMessages.push(remessage[i].response);
            break;
        }

    }
    
    //for (let i = 0; i < arrMessage.length; i++) {
    //    for (let j = 0; j < remessage.length; j++) {
    //            let arrMessage = message.split(' ');
    //            if (arrMessage[i] === remessage[j].text) {
    //                myMessages.push(remessage[j].response);
    //                console.log('есть');
    //                break;
    //            }
    //        }
    //}

    
    createMessageFromMe()
    MessagesFromPerson = []
    
}

// детям ниже не смотреть
const badWords = ['Блядь', 'Блять', 'Бля', 'Хуй', 'Нахуй', 'Похуй']
const insults = ['Гондон', 'Сука', 'Чмо', 'Пидор', 'Гандон', 'Пидорас', 'Пидр', 'Щенок', 'Ублюдок', 'Обмудок', 'Чмоня']
// детям ниже смотреть

const remessage = [{
        text: 'Привет',
        response: 'Привет'
    },
    {
        text: 'Здравствуй',
        response: 'Привет'
    },
    {
        text: 'Хай',
        response: 'Привет'
    },
    {
        text: 'Ку',
        response: 'Привет'
    },
    {
        text: 'Здарова',
        response: 'Привет'
    },
    {
        text: 'Приветики',
        response: 'Привет'
    },
    {
        text: 'Как дела?',
        response: 'Пойдет'
    },
    {
        text: 'Как сам?',
        response: 'Как универсам'
    },
    {
        text: 'Ты кто?',
        response: 'Ботяра'
    },
    {
        text: 'Как тебя зовут?',
        response: 'Александр Третий(3(The Third))'
    },
    {
        text: 'Ты робот?',
        response: 'Да, я'
    },
    {
        text: 'Что ты умеешь?',
        response: 'Я ничего, буквально, а чел который написал меня что то может'
    },
    {
        text: 'Покажи',
        response: 'На'
    },
    {
        text: 'Расскажи',
        response: 'Еще что?'
    },
]
let hi = 'Привет'