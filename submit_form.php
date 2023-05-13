<?php
require_once __DIR__ . './vendor/autoload.php'; // Path to the Google API PHP client library

// Initialize the Google API client
$client = new Google_Client();
$client->setApplicationName('tims_bio_v2-add_google_api');
$client->setScopes(Google_Service_Gmail::MAIL_GOOGLE_COM);
$client->setAuthConfig('./client_secret.json'); // Path to your client credentials JSON file

// Create a new Gmail service instance
$service = new Google_Service_Gmail($client);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Collect form data
  $name = sanitizeInput($_POST["name"]);
  $email = sanitizeInput($_POST["email"]);
  $message = sanitizeInput($_POST["message"]);

  // Validate form data
  if (empty($name) || empty($email) || empty($message)) {
    echo "<p>Please fill in all the required fields.</p>";
    header("Location: index.html"); // Redirect to index.html
    exit();
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<p>Please enter a valid email address.</p>";
    header("Location: index.html"); // Redirect to index.html
    exit();
  }

  // Prepare the email message
  $emailSubject = "New Contact Form Submission";
  $emailContent = "Name: $name\nEmail: $email\nMessage: $message";
  $emailTo = "recipient@gmail.com"; // Replace with your desired recipient email address

  try {
    // Create a new Gmail message
    $message = new Google_Service_Gmail_Message();
    $email->setSubject($emailSubject);
    $email->setRaw(base64_encode("To: $emailTo\r\n" .
      "Subject: $emailSubject\r\n" .
      "Content-Type: text/plain; charset=utf-8\r\n\r\n" .
      $emailContent));

    // Send the email
    $service->users_messages->send("me", $message);

    echo "<p>Your message has been sent successfully. Thank you!</p>";
    header("Location: index.html"); // Redirect to index.html
    exit();
  } catch (Exception $e) {
    echo "<p>Sorry, there was an error sending your message. Please try again later.</p>";
    header("Location: index.html"); // Redirect to index.html
    exit();
  }
}

// Function to sanitize form input
function sanitizeInput($input) {
  $input = trim($input);
  $input = stripslashes($input);
  $input = htmlspecialchars($input);
  return $input;
}
?>
