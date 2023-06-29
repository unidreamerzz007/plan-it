let eventList;

async function register(id){
console.log(id);
const response = await fetch(`/api/addusertoevent?value=${id}`);
    console.log(response.status);
    if(response.status==202)
    alert('Registered Successfully');
    else if(response.status==204){
    alert('please login to continue');
    window.location.href = 'login.html';
    }
    else
    alert('You are already Registered for the event')
}


async function getList(){
    const response = await fetch('/api/getevents');
    const data = await response.json();

    const events = data;
    console.log(data);
    eventList = events;
    events.forEach(i => {
        //console.log(i['image']['filename']);
        console.log(i['title']);
        var table= document.getElementById("cardsection");
        table.innerHTML += `<div id = \"${i[name]}\" class=\"card\">
        <img  src = "uploads/${i['image']['filename']}"
        >
        <h3 >${i['title']}</h3>
        <p class=\"organizer\" >Organizer : ${i['organizer']}</p>
        <p class=\"time\" >Venue : ${i['location']}\n
        date : ${i['date']}\n
        time : ${i['time']}</p>
        <button id=\"${i['title']}\" class = \"buttonjoin\" align="center" type = \"button\" value = \"Join\">Register</button>
        </div>`;
        var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        console.log(this.id);
        register(this.id);
    });
}
    });

}
getList();
