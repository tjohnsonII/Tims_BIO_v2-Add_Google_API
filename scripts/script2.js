document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('subnetCalculator').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      
      // Get input values
      var ipAddress = document.getElementById('ipAddress').value;
      var subnetMask = document.getElementById('subnetMask').value;
      
      // Validate IP address and subnet mask
      if (validateIPAddress(ipAddress) && validateSubnetMask(subnetMask)) {
        var network = calculateNetwork(ipAddress, subnetMask);
        var broadcast = calculateBroadcast(network, subnetMask);
        var firstHost = calculateFirstHost(network);
        var lastHost = calculateLastHost(broadcast);
        var totalHosts = calculateTotalHosts(subnetMask);
        
        // Display the results
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = 'Network: ' + network + '<br>' +
                              'Broadcast: ' + broadcast + '<br>' +
                              'First Host: ' + firstHost + '<br>' +
                              'Last Host: ' + lastHost + '<br>' +
                              'Total Hosts: ' + totalHosts;
      } else {
        // Invalid input, display an error message
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = 'Invalid IP address or subnet mask';
      }
    });
    
    // Rest of your JavaScript functions...
    // Function to validate the IP address format
    function validateIPAddress(ipAddress) {
        var pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return pattern.test(ipAddress);
    }
    // Function to validate the subnet mask format
    function validateSubnetMask(subnetMask) {
        var pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        return pattern.test(subnetMask);
    }
    // Function to calculate the network address
    function calculateNetwork(ipAddress, subnetMask) {
        var ipOctets = ipAddress.split('.').map(Number);
        var maskOctets = subnetMask.split('.').map(Number);
        
        var networkOctets = [];
        for (var i = 0; i < 4; i++) {
        networkOctets.push(ipOctets[i] & maskOctets[i]);
        }
        
        return networkOctets.join('.');
    }
    // Function to calculate the broadcast address
    function calculateBroadcast(network, subnetMask) {
        var networkOctets = network.split('.').map(Number);
        var maskOctets = subnetMask.split('.').map(Number);
        
        var broadcastOctets = [];
        for (var i = 0; i < 4; i++) {
        broadcastOctets.push(networkOctets[i] | (255 - maskOctets[i]));
        }
        
        return broadcastOctets.join('.');
    }
    // Function to calculate the first host address
    function calculateFirstHost(network) {
        var networkOctets = network.split('.').map(Number);
        
        // Increment the last octet of the network address
        networkOctets[3]++;
        
        return networkOctets.join('.');
    }
    // Function to calculate the last host address
    function calculateLastHost(broadcast) {
        var broadcastOctets = broadcast.split('.').map(Number);
        
        // Decrement the last octet of the broadcast address
        broadcastOctets[3]--;
        
        return broadcastOctets.join('.');
    }
  
    // Function to calculate the total number of hosts in a subnet
    function calculateTotalHosts(subnetMask) {
        var maskOctets = subnetMask.split('.').map(Number);
        
        // Calculate the number of host bits in the subnet mask
        var hostBits = 32 - calculatePrefixLength(subnetMask);
        
        // Calculate the total number of hosts
        var totalHosts = Math.pow(2, hostBits) - 2;
        
        return totalHosts;
    }
    // Function to calculate the prefix length of a subnet mask
    function calculatePrefixLength(subnetMask) {
        var maskOctets = subnetMask.split('.').map(Number);
        var binaryMask = maskOctets.map(function (octet) {
        return decToBinary(octet);
        }).join('');
        
        return binaryMask.indexOf('0');
    }
  
    // Function to convert a decimal number to binary
    function decToBinary(number) {
        var binary = (number >>> 0).toString(2);
        while (binary.length < 8) {
        binary = '0' + binary;
        }
        
        return binary;
    }
  });
  