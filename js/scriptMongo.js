const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card">'+
                    '<div class="card-image">'+
                        '<h3>'+item.title+'</h3>'+
                        '<img src="'+item.path+'" alt="Cute Puppy" height="400px">'+
                    '</div>'+
                    '<div class="card-content">'+
                        '<p>Dogs are known for their loyalty and companionship. They come in various breeds, sizes, and colors. Dogs are often referred to as mans best friend due to their friendly and protective nature.</p>'+
                    '</div>'+
                    '<div class="card-action">'+
                        '<a href="https://en.wikipedia.org/wiki/Dog" target="_blank">Learn more about dogs</a>'+
                    '</div>'+
                '</div>'+
                '</div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCat(formData);
}

function postCat(dog){
    $.ajax({
        url:'/api/dog',
        type:'POST',
        data:dog,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Dog Post Success');
            }
        }
    });
}

function getAllCats() {
    $.get('/api/dog',(result)=>{
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    });
}

let socket = io();
socket.on('number', (data) => {
    console.log(`User ID: ${data.id}, Random Number: ${data.number}`);
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats();
});

