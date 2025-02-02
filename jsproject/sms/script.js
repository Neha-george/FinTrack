document.getElementById('processButton').addEventListener('click', processSMS);

const bankNames = ["SBI", "HDFC", "ICICI", "AXIS", "KOTAK", "YES", "PNB", "BOB", "INDUSIND", "IDBI","FEDERAL"];
let totalBalance =100000;
let totalExpenditure = 100;

function processSMS() {
  const smsInput = document.getElementById('smsInput').value;
  const smsTable = document.getElementById('smsTable').querySelector('tbody');
  const smsList = document.getElementById('smsList');

  // Clear the input field for the next SMS
  document.getElementById('smsInput').value = '';

  // Process the SMS
  const cleanAmount = extractAmount(smsInput);
  const bank = bankNames.find(bank => smsInput.toUpperCase().includes(bank));

  if (cleanAmount && bank) {
    const isDebit = smsInput.toLowerCase().includes("debited") || smsInput.toLowerCase().includes("withdrawn") || smsInput.toLowerCase().includes("spent");
    const isCredit = smsInput.toLowerCase().includes("credited") || smsInput.toLowerCase().includes("received");

    if (isDebit) {
      totalExpenditure += cleanAmount;
      totalBalance -= cleanAmount;
      appendToTable(smsTable, smsInput, cleanAmount, 'Debit','Withdrawn','spent');
    } else if (isCredit) {
      totalBalance += cleanAmount;
      appendToTable(smsTable, smsInput, cleanAmount, 'Credit');
    }

    appendToList(smsList, smsInput);
  }

  document.getElementById('totalBalance').textContent = totalBalance.toFixed(2);
  document.getElementById('totalExpenditure').textContent = totalExpenditure.toFixed(2);
}

function extractAmount(sms) {
  const amountRegex = /(\d+[\.,]?\d*)/g;
  const amounts = sms.match(amountRegex);
  
  if (amounts) {
    return parseFloat(amounts[0].replace(',', ''));
  }
  return null;
}

function appendToTable(table, message, amount, type) {
  const row = document.createElement('tr');
  const messageCell = document.createElement('td');
  const amountCell = document.createElement('td');
  const typeCell = document.createElement('td');

  messageCell.textContent = message;
  amountCell.textContent = amount.toFixed(2);
  typeCell.textContent = type;

  row.appendChild(messageCell);
  row.appendChild(amountCell);
  row.appendChild(typeCell);

  table.appendChild(row);
}

function appendToList(list, message) {
  const listItem = document.createElement('li');
  listItem.textContent = message;
  list.appendChild(listItem);
}