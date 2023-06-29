async function getList(){
    const response = await fetch('/api/getusers');
    const data = await response.json();
    //console.log(data.message[0]['name']);
    
    const users = data;
    console.log(data);
    users.forEach(i => {

        console.log(i['name']);
        var table= document.getElementById("usertable");
        table.innerHTML += "<tr><td> " + i['name'] + "</td><td>"
         +i['phone'] + "</td><td>"
         +i['email'] + "</td></tr>";
         

    //     <tr>
    //     <th>Name</th>
    //     <th>Phone</th>
    //     <th>Email</th>
    //   </tr>
    });
}
getList();