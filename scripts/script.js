function hello(){
	var message = "Hello!"; 
	alert(message);
}
// Define the generateOptions function
function generateOptions(selectElement) {
    for (let i = 0; i <= 255; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      selectElement.appendChild(option);
    }
  }

function decimalToBinary(decimal) {
  return decimal.toString(2).padStart(8, '0');
}

// Attach event listener to convert button
document.addEventListener("DOMContentLoaded", function() {
  const octet1Select = document.getElementById("octet1");
  const octet2Select = document.getElementById("octet2");
  const octet3Select = document.getElementById("octet3");
  const octet4Select = document.getElementById("octet4");
  const nOctet1Select = document.getElementById("nOctet1");
  const nOctet2Select = document.getElementById("nOctet2");
  const nOctet3Select = document.getElementById("nOctet3");
  const nOctet4Select = document.getElementById("nOctet4");
  const convertBtn = document.getElementById("convertBtn");
  const resultDiv = document.getElementById("result");
  const resultDiv2 = document.getElementById("result2");
  const resultDiv3 = document.getElementById("result3");
  
  generateOptions(octet1Select);
  generateOptions(octet2Select);
  generateOptions(octet3Select);
  generateOptions(octet4Select);
  generateOptions(nOctet1Select);
  generateOptions(nOctet2Select);
  generateOptions(nOctet3Select);
  generateOptions(nOctet4Select);

  convertBtn.addEventListener("click", function() {
    const octet1Value = octet1Select.value;
    const octet2Value = octet2Select.value;
    const octet3Value = octet3Select.value;
    const octet4Value = octet4Select.value;
	const nOctet1Value = nOctet1Select.value;
    const nOctet2Value = nOctet2Select.value;
    const nOctet3Value = nOctet3Select.value;
    const nOctet4Value = nOctet4Select.value;
	
    const binaryOctet1 = decimalToBinary(parseInt(octet1Value));
    const binaryOctet2 = decimalToBinary(parseInt(octet2Value));
    const binaryOctet3 = decimalToBinary(parseInt(octet3Value));
    const binaryOctet4 = decimalToBinary(parseInt(octet4Value));
	const nBinaryOctet1 = decimalToBinary(parseInt(nOctet1Value));
    const nBinaryOctet2 = decimalToBinary(parseInt(nOctet2Value));
    const nBinaryOctet3 = decimalToBinary(parseInt(nOctet3Value));
    const nBinaryOctet4 = decimalToBinary(parseInt(nOctet4Value));

    const binaryIP = `${binaryOctet1}.${binaryOctet2}.${binaryOctet3}.${binaryOctet4}`;
	const binaryNetworkMask = `${nBinaryOctet1}.${nBinaryOctet2}.${nBinaryOctet3}.${nBinaryOctet4}`;

	const networkBinaryOctet1 = decimalToBinary(parseInt(octet1Value) & parseInt(nOctet1Value));
	const networkBinaryOctet2 = decimalToBinary(parseInt(octet2Value) & parseInt(nOctet2Value));
	const networkBinaryOctet3 = decimalToBinary(parseInt(octet3Value) & parseInt(nOctet3Value));
	const networkBinaryOctet4 = decimalToBinary(parseInt(octet4Value) & parseInt(nOctet4Value));
	
	const networkBinaryIP = `${networkBinaryOctet1}.${networkBinaryOctet2}.${networkBinaryOctet3}.${networkBinaryOctet4}`;


    resultDiv.textContent = `Binary IP Address: ${binaryIP}`;
	resultDiv2.textContent = `Binary IP Address: ${binaryNetworkMask}`;
	resultDiv3.textContent = `Binary Network Address: ${networkBinaryIP}`;
  });
});

function playVideo() {
  var video = document.getElementById("myVideo");
  var playButton = document.getElementById("playButton");
  var pauseButton = document.getElementById("pauseButton");
  var stopButton = document.getElementById("stopButton");

  video.play();
  playButton.classList.add("active");
  pauseButton.classList.remove("active");
  stopButton.classList.remove("active");
}

function pauseVideo() {
  var video = document.getElementById("myVideo");
  var playButton = document.getElementById("playButton");
  var pauseButton = document.getElementById("pauseButton");
  var stopButton = document.getElementById("stopButton");

  video.pause();
  playButton.classList.remove("active");
  pauseButton.classList.add("active");
  stopButton.classList.remove("active");
}

function stopVideo() {
  var video = document.getElementById("myVideo");
  var playButton = document.getElementById("playButton");
  var pauseButton = document.getElementById("pauseButton");
  var stopButton = document.getElementById("stopButton");

  video.pause();
  video.currentTime = 0;
  playButton.classList.remove("active");
  pauseButton.classList.remove("active");
  stopButton.classList.add("active");
}



window.addEventListener("scroll", function() {
  var button = document.querySelector(".scroll-top-button");
  if (window.pageYOffset > 200) {
    button.classList.add("show");
  } else {
    button.classList.remove("show");
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


