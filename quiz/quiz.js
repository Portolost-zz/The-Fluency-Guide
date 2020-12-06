const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Pergunta 1',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question:
            "Pergunta 2",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Pergunta 3",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33",
        answer: 3,
    },
    {
        question: "Pergunta 4",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 5",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 6",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 7",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 8",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 9",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 10",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 11",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 12",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 13",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 14",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 15",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 16",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 17",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    },
    {
        question: "Pergunta 18",
        choice1: "a",
        choice2: "b",
        choice3: "c",
        choice4: "d",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 18

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('pagfinal.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()