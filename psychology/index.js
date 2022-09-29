const ANIMATIONS_DURATION = 250;

let container = document.getElementById('question-container')
let header = document.getElementById('question-title')
let description = document.getElementById('question-description')
let input = document.getElementById('question-answer')
let continueButton = document.getElementById('question-continue')

let houseContainer = document.getElementById('house-container')

var house_data = {}

let questions = [
    {
        valueId: 'safety',
        title: 'Оцените от 0 до 10 безопасность домашней среды для вашего ребенка',
        description: 'Оцените, насколько вы считаете, что вашему ребенку дома эмоционально комфортно, что ему не приходится беспокоиться о личной безопасности, как физической, так и психологической.'
    },
    {
        valueId: 'physical',
        title: 'Оцените от 0 до 10 удовлетворенность физиологических потребностей ребенка',
        description: 'То есть, насколько вы считаете, что удовлетворяете все физиологические потребности ребенка (сон, еда и т.д.)'
    },
    {
        valueId: 'love',
        title: 'Оценить от 0 до 10 насколько ребенок получает любви.',
        description: 'То есть, насколько у ребенка удовлетворены потребности в здоровых, теплых, любящих отношениях с родителями и близкими.'
    },
    {
        valueId: 'respect',
        title: 'Оценить от 0 до 10 насколько в семье проявляют уважение к ребенку.',
        description: 'То есть, насколько у ребенка удовлетворена потребность ощущать себя ценимым, что его успехи и достижения признаны, одобрены.'
    },
    {
        valueId: 'selfactual',
        title: 'Оценить от 0 до 10 насколько в семье ребенок способен самоактуализироваться.',
        description: 'То есть, насколько в семье созданы условия для удовлетворения потребности ребенка в самореализации своего потенциала, целей, что он найдет поддержку и помощь со стороны родителей.'
    },
]

function setQuestionContainerVisibility(isVisible) {
    container.style.visibility = isVisible ? 'visible' : 'hidden'
    container.style.opacity = isVisible ? 1.0 : 0.0
}

function setHouseContainerVisibility(isVisible) {
    houseContainer.style.visibility = isVisible ? 'visible' : 'hidden'
    houseContainer.style.opacity = isVisible ? 1.0 : 0.0
}

function showQuestion(questionIndex) {
    setQuestionContainerVisibility(false)
    let question = questions[questionIndex]
    setTimeout(() => {
        header.innerText = question.title
        description.innerText = question.description
        input.type = 'number'
        input.placeholder = '0'
        input.value = ''
        input.min = 0
        input.max = 10
        continueButton.onclick = () => {
            let numericValue = parseInt(input.value)
            if (Number.isInteger(numericValue)) {
            house_data[question.valueId] = numericValue < 0 ? 0 : Math.min(numericValue, 10)
            } else {
                house_data[question.valueId] = 0
            }

            if (questionIndex == questions.length - 1) {
                showHouse()
            } else {
                showQuestion(questionIndex + 1)
            }
        }
        setQuestionContainerVisibility(true)
    }, ANIMATIONS_DURATION)
}

function showHouse() {
    drawHouse()
    setHouseContainerVisibility(true)
    setQuestionContainerVisibility(false)
}

function startApp() {
    setHouseContainerVisibility(false)
    setQuestionContainerVisibility(false)
    house_data = {
        name: '',
        love: 0,
        selfactual: 0,
        respect: 0,
        physical: 0,
        safety: 0
    }
    
    header.innerText = "Введите своё ФИО:"
    description.innerText = ""
    input.type = 'text'
    input.value = ''
    input.placeholder = 'Иванов Иван Иванович'
    continueButton.innerText = "Продолжить"
    continueButton.onclick = () => {
        house_data.name = input.value;
        showQuestion(0);
    }

    setTimeout(() => {
        setQuestionContainerVisibility(true)
     }, ANIMATIONS_DURATION);
}

startApp()



const WIDTH = document.getElementById('canvas-container').offsetWidth
const HEIGHT = WIDTH + 100
const HOME_SIZE = WIDTH - 100
const POINTS_IN_SECTION = HOME_SIZE / 2 / 10

const perfect_house_data = {
    love: 10,
    selfactual: 10,
    respect: 10,
    physical: 10,
    safety: 10
}

function init(canvas) {
    canvas.style.width = WIDTH
    canvas.style.height = HEIGHT
    canvas.width = WIDTH
    canvas.height = HEIGHT
}

function drawTextBG(ctx, txt, font, x, y) {

    /// lets save current state as we make a lot of changes        
    ctx.save();

    /// set font
    ctx.font = font;

    /// draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';

    /// color for background
    ctx.fillStyle = '#fff';
    
    /// get width of text
    var width = ctx.measureText(txt).width;

    /// draw background rect assuming height of font
    ctx.fillRect(x, y, width, parseInt(font, 10));
    
    /// text color
    ctx.fillStyle = '#000';

    /// draw text on top
    ctx.fillText(txt, x, y);
    
    /// restore original state
    ctx.restore();
}

function carcas(canvas) {
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    ctx.beginPath();
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Draw carcas
    ctx.beginPath()

    ctx.lineWidth = 1.0

    ctx.lineTo(WIDTH / 2, HEIGHT / 2)
    ctx.lineTo(WIDTH / 2 - HOME_SIZE / 2, HEIGHT / 2)
    ctx.stroke()
    ctx.closePath()

    ctx.lineTo(WIDTH / 2, HEIGHT / 2)
    ctx.lineTo(WIDTH / 2, HEIGHT / 2 - HOME_SIZE / 2)
    ctx.stroke()
    ctx.closePath()

    ctx.lineTo(WIDTH / 2, HEIGHT / 2)
    ctx.lineTo(WIDTH / 2 + HOME_SIZE / 2, HEIGHT / 2)
    ctx.stroke()
    ctx.closePath()

    // Draw text
    const font = "12px sans-serif"
    for (let index = 0; index <= 10; index++) {
        const text = "" + index
        drawTextBG(ctx, text, font, WIDTH / 2 - (text.length * 3.5) - (POINTS_IN_SECTION * index), HEIGHT / 2 - 7)
        if (index > 0) {
            drawTextBG(ctx, text, font, WIDTH / 2 - (text.length * 3.5), HEIGHT / 2 - (text.length * 3.5) - (POINTS_IN_SECTION * index))
            drawTextBG(ctx, text, font, WIDTH / 2 - (text.length * 3.5) + (POINTS_IN_SECTION * index), HEIGHT / 2 - 7)
        }
        drawTextBG(ctx, text, font, WIDTH / 2 - (text.length * 3.5) - (POINTS_IN_SECTION * index), HEIGHT / 2 + HOME_SIZE / 2 - 7)
        if (index > 0) {
            drawTextBG(ctx, text, font, WIDTH / 2 - (text.length * 3.5) + (POINTS_IN_SECTION * index), HEIGHT / 2 + HOME_SIZE / 2 - 7)
        }
    }
    drawTextBG(ctx, "Любовь", font, WIDTH / 2 - HOME_SIZE / 2 - 20, HEIGHT / 2 + 8)
    drawTextBG(ctx, "Самоактуализация", font, WIDTH / 2 - 50, HEIGHT / 2 - HOME_SIZE / 2 - 24)
    drawTextBG(ctx, "Уважение", font, WIDTH / 2 + HOME_SIZE / 2 - 30, HEIGHT / 2 + 8)
    drawTextBG(ctx, "Физиологические", font, WIDTH / 2 + HOME_SIZE / 2 - 56, HEIGHT / 2 + HOME_SIZE / 2 + 8)
    drawTextBG(ctx, "Безопасность", font, WIDTH / 2 - HOME_SIZE / 2 - 30, HEIGHT / 2 + HOME_SIZE / 2 + 8)
    
    let nameFont = "18px sans-serif";
    ctx.font = nameFont
    let nameWidth = ctx.measureText(house_data.name).width;
    let nameHeight = parseInt(nameFont.substring(0, 2)); // gets the font size
    console.log(nameWidth, nameHeight)
    drawTextBG(ctx, house_data.name, nameFont, WIDTH / 2 - (nameWidth / 2), HEIGHT - 50)
}

function house(canvas, data, lineWidth, color) {
    const ctx = canvas.getContext('2d')

    ctx.beginPath()

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color

    ctx.lineTo(WIDTH / 2 - POINTS_IN_SECTION * data.love, HEIGHT / 2)
    ctx.lineTo(WIDTH / 2, HEIGHT / 2 - POINTS_IN_SECTION * data.selfactual)
    ctx.lineTo(WIDTH / 2 + POINTS_IN_SECTION * data.respect, HEIGHT / 2)
    ctx.lineTo(WIDTH / 2 + POINTS_IN_SECTION * data.physical, HEIGHT / 2 + HOME_SIZE / 2)
    ctx.lineTo(WIDTH / 2 - POINTS_IN_SECTION * data.safety, HEIGHT / 2 + HOME_SIZE / 2)
    ctx.lineTo(WIDTH / 2 - POINTS_IN_SECTION * data.love, HEIGHT / 2)

    ctx.stroke()

    ctx.closePath()
}

let canvas = document.getElementById('house')
init(canvas)

function drawHouse() {
    carcas(canvas)
    house(canvas, perfect_house_data, 1.0, 'black')
    house(canvas, house_data, 3.0, 'rgb(10, 88, 202)')
}

function downloadHouseImage() {
    if (window.navigator.msSaveBlob) {

    } else {
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = canvas.toDataURL()
        a.download = 'DOM.png'
        a.click()
    }
    // var image = canvas.toDataURL("image/jpeg")
    // window.location.href=image;
}