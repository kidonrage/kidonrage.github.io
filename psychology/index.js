const WIDTH = document.getElementById('house-container').offsetWidth
const HEIGHT = WIDTH
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
    const house_data = {
        love: parseInt(document.getElementById('love').value),
        selfactual: parseInt(document.getElementById('selfactual').value),
        respect: parseInt(document.getElementById('respect').value),
        physical: parseInt(document.getElementById('physical').value),
        safety: parseInt(document.getElementById('safety').value),
    }
    house(canvas, house_data, 3.0, 'rgb(10, 88, 202)')
}
