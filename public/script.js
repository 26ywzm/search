document.getElementById('searchButton').addEventListener('click', function() {
    const questionBank = document.getElementById('questionBankSelect').value;
    const questionType = document.getElementById('questionTypeSelect').value;
    const keyword = document.getElementById('searchInput').value.trim();

    if (!keyword) {
        alert('请输入内容，进行搜索');
        return;
    }

    fetch(`/search?bank=${questionBank}&type=${questionType}&keyword=${keyword}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('resultsContainer');
            resultsContainer.innerHTML = '';

            if (data.length === 0) {
                resultsContainer.innerHTML = '没有数据源';
            } else {
                data.forEach(question => {
                    const questionDiv = document.createElement('div');
                    questionDiv.classList.add('question');
                    
                    const questionText = document.createElement('p');
                    questionText.innerText = `Question: ${question.question}`;
                    questionDiv.appendChild(questionText);

                    if (question.options) {
                        const optionsList = document.createElement('ul');
                        question.options.forEach(option => {
                            const optionItem = document.createElement('li');
                            optionItem.innerText = option;
                            optionsList.appendChild(optionItem);
                        });
                        questionDiv.appendChild(optionsList);
                    }

                    const answerText = document.createElement('p');
                    answerText.innerText = `Answer: ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}`;
                    questionDiv.appendChild(answerText);

                    resultsContainer.appendChild(questionDiv);
                });
            }
        });
});
