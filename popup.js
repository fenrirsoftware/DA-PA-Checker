document.addEventListener('DOMContentLoaded', function () {
    const checkButton = document.getElementById('checkButton');
  
    checkButton.addEventListener('click', function () {
      const targetDomain = document.getElementById('targetDomain').value;
      if (targetDomain) {
        checkDomain(targetDomain);
      }
    });
  
    function checkDomain(targetDomain) {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
  
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          const resultDiv = document.getElementById('result');
          const response = JSON.parse(this.responseText);
  
          if (response.result === 'success') {
            displayResult(response.body);
          } else {
            resultDiv.innerHTML = 'Error: Unable to fetch data.';
          }
        }
      });
  
      xhr.open('GET', `https://domain-da-pa-check.p.rapidapi.com/?target=${targetDomain}`);
      xhr.setRequestHeader('X-RapidAPI-Key', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      xhr.setRequestHeader('X-RapidAPI-Host', 'domain-da-pa-check.p.rapidapi.com');
  
      xhr.send(null);
    }
  
    function displayResult(body) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '<h4>Result:</h4>';
  
      const table = document.createElement('table');
      table.innerHTML = `
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Target Domain</td>
          <td>${body.target}</td>
        </tr>
        <tr>
          <td>DA Score</td>
          <td>${body.da_score}</td>
        </tr>
        <tr>
          <td>PA Score</td>
          <td>${body.pa_score}</td>
        </tr>
        <tr>
          <td>Spam Score</td>
          <td>${body.spam_score}</td>
        </tr>
        <tr>
          <td>Total Backlinks</td>
          <td>${body.total_backlinks}</td>
        </tr>
      `;
  
      resultDiv.appendChild(table);
    }
  });
  