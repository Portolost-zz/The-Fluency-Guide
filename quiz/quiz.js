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

let questions = [{
        question: "My city is (old) _______ than yours",
        choice1: 'Order',
        choice2: 'Older',
        choice3: 'Old',
        choice4: 'Others',
        answer: 2,
    },
    {
        question: "Jane is (tall) _______ than Melissa.",
        choice1: "taller",
        choice2: "tellers",
        choice3: "tallest",
        choice4: "tally",
        answer: 1,
    },
    {
        question: "Dogs are usually (heavy) _______ than cats.",
        choice1: "heave",
        choice2: "heal",
        choice3: "heavier",
        choice4: "heap",
        answer: 3,
    },
    {
        question: "Watching a film in DVD is (cheap) _______ than going to the theatre.",
        choice1: "cheaper",
        choice2: "cheep",
        choice3: "cheeper",
        choice4: "cheat",
        answer: 1,
    },
    {
        question: "This brand of pastry is (good) _______ than the brand I usually buy.",
        choice1: "gooder",
        choice2: "better",
        choice3: "gooded",
        choice4: "beth",
        answer: 2,
    },
    {
        question: "The book I'm reading is much (interesting) _______ than all the books I've read in the past.",
        choice1: "interesting",
        choice2: "insterester",
        choice3: "much interesreing",
        choice4: "more interesting",
        answer: 4,
    },
    {
        question: "_______ a post-office near the house.",
        choice1: "is there",
        choice2: "there are",
        choice3: "there is",
        choice4: "are there",
        answer: 3,
    },
    {
        question: "_______ a few eggs in the fridge.",
        choice1: "is there",
        choice2: "there are",
        choice3: "there is",
        choice4: "are there",
        answer: 2,
    },
    {
        question: "______ a good movie on TV later.",
        choice1: "there is",
        choice2: "there was",
        choice3: "were",
        choice4: "is there",
        answer: 1,
    },
    {
        question: "_______  two universities in this city. There's also a small college.",
        choice1: "has",
        choice2: "there is",
        choice3: "there are",
        choice4: "there was",
        answer: 3,
    },
    {
        question: "_______ so much meat in the fridge! Let's have some of that for dinner.",
        choice1: "there is",
        choice2: "there was",
        choice3: "has",
        choice4: "hasn't",
        answer: 1,
    },
    {
        question: "______ several kinds of toys to choose from.",
        choice1: "is there",
        choice2: "are there",
        choice3: "there will",
        choice4: "there are",
        answer: 4,
    },
    {
        question: "I saw Joe this morning. (He, go) _______ to the supermarket.",
        choice1: "He is going",
        choice2: "He goes",
        choice3: "He was going",
        choice4: "He are going",
        answer: 3,
    },
    {
        question: "(It, rain) _______ this morning, so we had to take an umbrella with us.",
        choice1: "Were raining",
        choice2: "It rains",
        choice3: "It was raining",
        choice4: "It was not raining",
        answer: 3,
    },
    {
        question: "Tom was home yesterday. (He, fix) _______ the computer.",
        choice1: "He was fixing",
        choice2: "He is fixing",
        choice3: "He fixed",
        choice4: "He doesn't fixed",
        answer: 1,
    },
    {
        question: "(you, park) _______ your car just ten minutes ago? I think I saw you at the parking garage.",
        choice1: "Are you parking",
        choice2: "Were you parking",
        choice3: "Where are you parking",
        choice4: "you parked",
        answer: 2,
    },
    {
        question: "Linda always wears skirts, but yesterday (she, not, wear) _______ one.",
        choice1: "were wasn't wearing",
        choice2: "she is wearing",
        choice3: "she was",
        choice4: "she wasn't wearing",
        answer: 4,
    },
    {
        question: "I saw Mark at the theater. (He, talk) _______ to our friends.",
        choice1: "He had talked",
        choice2: "He was talked",
        choice3: "He talked",
        choice4: "He was talking",
        answer: 4,
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
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('pagfinal.html')
    }

    questionCounter++
    progressText.innerText = `Pergunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

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
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
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
    score += num
    scoreText.innerText = score
}

startGame()