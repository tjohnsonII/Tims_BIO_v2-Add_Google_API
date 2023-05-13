document.addEventListener('DOMContentLoaded', function() {
    // Function to send form data to the server
    function sendFormData(event) {
      event.preventDefault(); // Prevent form submission
  
      // Retrieve form data
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var message = document.getElementById('message').value;
  
      // Prepare payload
      var payload = {
        name: name,
        email: email,
        message: message
      };
  
      // Send form data to the server
      fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function(response) {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to send email.');
        }
      })
      .then(function(data) {
        console.log(data); // Display success message
      })
      .catch(function(error) {
        console.error(error); // Display error message
      });
    }
  
    // Attach event listener to the form submit event
    //var form = document.getElementById('contact-form');
    //form.addEventListener('submit', sendFormData);
  });
  