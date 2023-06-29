

      async function submit() {
       

        const formData = new FormData(document.getElementById("event-form"));

        const response = await fetch('/api/events', {
          method: 'POST',
          body: formData
        });
        console.log(response.status);
        if(response.status==200){
          alert('Event registered successfully');
          window.location.href = 'orghome.html';
        }
        else
        alert('Event name is taken');
      }