// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition. Try using Chrome.');
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const micButton = document.getElementById('mic-button');
    const voiceInput = document.getElementById('voice-input');
    const expenseTable = document.getElementById('expense-table').querySelector('tbody');
    const voiceAssistantButton = document.getElementById('voice-assistant-button');

    let totalBalance = 0;
    let totalExpenditure = 0;

    micButton.addEventListener('click', () => {
        recognition.start();
        voiceInput.textContent = 'Listening...';
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        voiceInput.textContent = `You said: "${transcript}"`;

        // Extract amount and category from the transcript
        const expenseData = extractExpenseData(transcript);
        console.log('Extracted Data:', expenseData);

        if (expenseData.amount && expenseData.category && expenseData.type) {
            if (expenseData.type === 'debit') {
                totalExpenditure += expenseData.amount;
                totalBalance -= expenseData.amount;
            } else if (expenseData.type === 'credit') {
                totalBalance += expenseData.amount;
            }
            addExpenseToTable(expenseData.amount, expenseData.category, expenseData.type);
        } else {
            alert('Could not extract amount and category. Please try again.');
        }

        updateSummary();

        recognition.stop();
    };

    recognition.onerror = (event) => {
        alert('Error occurred in recognition: ' + event.error);
    };

    voiceAssistantButton.addEventListener('click', () => {
        const voiceAssistantText = 'Please say the amount and category of your expense. For example, "I spent 10 rupees on food."';
        voiceInput.textContent = voiceAssistantText;
        recognition.start();
    });

    /**
     * Extracts expense data from a transcript.
     * 
     * @param {string} transcript The transcript to extract data from.
     * @returns {object} An object containing the extracted amount, category, and type.
     */
    function extractExpenseData(transcript) {
        const words = transcript.split(' ');
        let amount = null;
        let category = '';
        let type = null;

        for (let i = 0; i < words.length; i++) {
            if (!isNaN(words[i])) {
                amount = parseFloat(words[i]);
            } else if (words[i].toLowerCase() === 'debit' || words[i].toLowerCase() === 'withdrawn' || words[i].toLowerCase() === 'spent') {
                type = 'debit';
            } else if (words[i].toLowerCase() === 'credit' || words[i].toLowerCase() === 'received') {
                type = 'credit';
            } else if (words[i].toLowerCase() === 'on' || words[i].toLowerCase() === 'for') {
                category = words.slice(i + 1).join(' ');
                break;
            }
        }

        console.log('Extracted Amount:', amount);
        console.log('Extracted Category:', category);
        console.log('Extracted Type:', type);

        return { amount, category, type };
    }

    /**
     * Adds an expense to the expense table.
     * 
     * @param {number} amount The amount of the expense.
     * @param {string} category The category of the expense.
     * @param {string} type The type of the expense (debit or credit).
     */
    function addExpenseToTable(amount, category, type) {
        const row = document.createElement('tr');
        const amountCell = document.createElement('td');
        const categoryCell = document.createElement('td');
        const typeCell = document.createElement('td');

        amountCell.textContent = `Rs${amount.toFixed(2)}`;
        categoryCell.textContent = category;
        typeCell.textContent = type.charAt(0).toUpperCase() + type.slice(1);

        row.appendChild(amountCell);
        row.appendChild(categoryCell);
        row.appendChild(typeCell);

        expenseTable.appendChild(row);
    }

    /**
     * Updates the summary with the current total balance and total expenditure.
     */
    function updateSummary() {
        document.getElementById('totalBalance').textContent = `Rs${totalBalance.toFixed(2)}`;
        document.getElementById('totalExpenditure').textContent = `Rs${totalExpenditure.toFixed(2)}`;
    }
}