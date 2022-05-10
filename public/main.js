const socket = io('http://localhost:3001');

const productsInfo = document.getElementById('productsInfo');
const addProductForm = document.getElementById('addProductForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('imageUrl');

const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const userLastName = document.getElementById('userLastName');
const userAge = document.getElementById('userAge');
const userNickname = document.getElementById('userNickname');
const userAvatar = document.getElementById('userAvatar');
const userMessage = document.getElementById('userMessage');
const sendMessage = document.getElementById('sendMessage');
const sendMessageButton = document.getElementById('send-message-button');
const authorSchema = new normalizr.schema.Entity('author');
const messageSchema =  new normalizr.schema.Entity('message', {
    author: authorSchema
}, {idAttribute: '_id'});
const messageArraySchema = new normalizr.schema.Entity('messageArray', {
    messages: [messageSchema]
});
const compressionPercentage = document.getElementById('compressionPercentage');

socket.on('products', (products) => {
        fetch('http://localhost:8080/list.hbs')
        .then(data => data.text())
        .then(data => {
            const template = Handlebars.compile(data);
            const embeddedTemplate = template({ products: products, list: products.length > 0})

            productsInfo.innerHTML = embeddedTemplate;
        });
});

userEmail.addEventListener('input', (e) => {
    if(userEmail.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)){
        sendMessageButton.removeAttribute("disabled");
    }else{
        sendMessageButton.setAttribute("disabled", "");
    }
})

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        name: nameInput.value,
        price: priceInput.value,
        imageUrl: imageUrlInput.value,
        created_at: moment()
    };

    socket.emit('new-product', newProduct);
    nameInput.value = '';
    priceInput.value = '';
    imageUrlInput.value = '';
});

const renderMessage = (newMessage) => {
    const div = document.createElement('div');
    if(newMessage){
        html=`<div class="my-messages">
                <span style="color: brown;"><span class="font-weight-bold text-primary">${newMessage.author.id}</span> [${newMessage.timestamp}]: <span class="font-italic text-success">${newMessage.text}</span></span><img src="${newMessage.author.avatar}" style="width: 40px; height: 40px;"><br/>
            </div>`;
    };

    div.innerHTML = html;
    document.getElementById('chat-list').appendChild(div);
};

socket.on('messages', (messages) => {

    const denormalizeMessages = normalizr.denormalize(messages.result, messageArraySchema, messages.entities);

    let percentage = JSON.stringify(denormalizeMessages.messages).length / JSON.stringify(messages).length;

    compressionPercentage.innerHTML = `Porcentaje de compresión: ${percentage.toFixed(2)}%`

    if(denormalizeMessages.messages && denormalizeMessages.messages.length){
        denormalizeMessages.messages.map(message => {
            renderMessage(message);
        });
    }
})


sendMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(userMessage.value){
        const newMessage = {
            author: {
                id: userEmail.value,
                name: userName.value,
                lastName: userLastName.value,
                age: userAge.value,
                nickname: userNickname.value,
                avatar: userAvatar.value,
            },
            text: userMessage.value,
            timestamp: moment().format('DD/MM/YYYY  HH:mm:ss')
        };

        socket.emit('new-message', newMessage);
        userMessage.value = '';

    } else {
        alert('Debes escribir un mensaje');
    }

});

socket.on('messages-to-everyone', (newMessage) => {
    renderMessage(newMessage);
});