let timeContainer = document.getElementById('time');
let messageContainer = document.getElementById('message-container')
let toggleDisplay = document.getElementById('toggle__display');
let inputForMessage = document.getElementById('input-for-message');
let btnForMessage = document.getElementById('input__btn')

setInterval(function(){
    let d = new Date();
    timeContainer.innerHTML = d.getHours() + ':' + d.getMinutes();          // обновляет время
  }, 950);


  class Message{
      constructor(text){
          this.text = text;
          
      }
      generateHTML(){                       // метод запиливает темплейт и выводит в HTML см. :34
          return `<li class="chat-item__from-me">
                    <p class="message-content">
                         ${this.text}
                     </p>
                 </li>`
      }
  }
  
  let myMessages = ['Привет', 'Я', 'Разработчик']     // arr для текстов сообщений

 


function createMessageFromMe(){
    return new Promise((resolve, reject)=>{
        toggleDisplay.classList.remove('toggle__display')
        myMessages.forEach((e, index)=>{
            setTimeout(function() {
            textes = new Message(e)                                     // цикл с таймаутом для создания сообщений
            messageContainer.innerHTML += textes.generateHTML()  }, 2000*(index+1))   // index нужен из за особенности setTimeout()   
        });
        setTimeout(() => {
            resolve(toggleDisplay.classList.add('toggle__display'),messageContainer.scrollIntoView({block: 'end', behavior:'smooth'}))             // settimeout для toggleClass 
        }, 2000*myMessages.length);                             // общая длительность отправки сообщений
        myMessages = [];                                        // обнуление массива чтобы добавлять сообщения в будущем
    })
    
}

createMessageFromMe().then( (resMessage) => {
    resMessage
} );


// ЧТОБЫ СОЗДАТЬ НОВОЕ СООБЩЕНИЕ ДОБАВЬ В МАССИВ myMessages строку и запусти createMessageFromMe()

inputForMessage.addEventListener('keydown', function(e){
    if(e.key === 'Enter' ){
        if(inputForMessage.value != ''){
            messageContainer.innerHTML += `<li class="chat-item__from-person">
                                                <p class="message-content">
                                                     ${inputForMessage.value}
                                                 </p>
                                             </li>`
        }
        inputForMessage.value = ''
        messageContainer.scrollIntoView({block: 'end', behavior:'smooth'})  // опускает скролл в конец
    }
})

btnForMessage.addEventListener('click', ()=>{
    if(inputForMessage.value != ''){
        messageContainer.innerHTML += `<li class="chat-item__from-person">
                                            <p class="message-content">
                                                 ${inputForMessage.value}
                                             </p>
                                         </li>`
    }
    inputForMessage.value = ''
    messageContainer.scrollIntoView({block: 'end', behavior:'smooth'})  // опускает скролл в конец
})