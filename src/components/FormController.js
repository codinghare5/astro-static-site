const setAttributes = (el, attrs) => {
    for(var key in attrs) {
        if(key === 'innerText')
            el.innerText = attrs[key];
        else if (key === 'classList') {
            attrs[key].map(classElement => {
                el.classList.add(classElement)
            })
        }
        else if (key === 'disabled')
            el.toggleAttribute('disabled', attrs[key]);
        else if (key === 'selected')
            el.toggleAttribute('selected', attrs[key]);
        else
            el.setAttribute(key, attrs[key]);
    }
}

const formController = (form) => {
    let currentIndex = 1;
    const questions = form.querySelectorAll('div.form-group');
    const formLength = questions.length;
    var questionsPerPart = 2;
    var formParts = formLength/questionsPerPart;
    
    const formNavContainer = document.createElement('section');
    setAttributes(formNavContainer, {'id': 'form-nav', 'classList': ['min-w-max', 'mb-3']});
    const formNavigation = document.createElement('div');
    setAttributes(formNavigation, {'classList': ['w-max', 'shadow-lg'], 'role': 'group'});
    const prevButton = document.createElement('button');
    setAttributes(prevButton, {'id': 'prev-button', 'classList': ['bg-pink-400', 'border-t', 'border-l', 'border-pink-200', 'rounded-l', 'p-1'], 'innerText': 'Previous part'});
    const progressBlock = document.createElement('button');
    setAttributes(progressBlock, {'id': 'progress', 'classList': ['bg-gray-100', 'border-t', 'p-1'], 'innerText': `${currentIndex}/${formParts}`});
    const nextButton = document.createElement('button');
    setAttributes(nextButton, {'id': 'next-button', 'classList': ['bg-purple-400', 'border-t', 'border-r', 'border-purple-200', 'rounded-r', 'p-1'], 'innerText': 'Next part'});

    [prevButton, progressBlock, nextButton].map(button => {
        formNavigation.appendChild(button);
    })
    formNavContainer.appendChild(formNavigation);
    form.querySelector('fieldset').appendChild(formNavContainer);

    function showFormPart(newIndex) {
        Array.from(questions).map((question, index) => {
            if( question.style.display === 'block' ) { question.style.display = 'none'; return;}
            if (((+newIndex * +questionsPerPart - +questionsPerPart) <= +index)&&( +index < (+newIndex * +questionsPerPart))) {
                question.style.display = 'block';
            } else question.style.display = 'none';
            progressBlock.innerText = `${currentIndex}/${formParts}`;
        })
    }

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex=== 1) return;
        --currentIndex;
        showFormPart(currentIndex);
    })
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex===formParts) return;
        ++currentIndex;
        showFormPart(currentIndex);
    })

    showFormPart(currentIndex);
}

formController(document.querySelector('form'));