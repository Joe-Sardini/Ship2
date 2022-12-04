var deltaX = 0;
var deltaY = 0;
var TriangleArray = [];
var CircleArray = [];
var canvas = document.getElementById('DrawArea');
var ctx = canvas.getContext('2d');
var animationStarted = false;
var DAMAGE_THRESHOLD = 1000;
document.getElementById("DrawArea").style.background = "url('images/star-field-2294797_960_720.jpg')"; 

class Shape{
    constructor(size){
        this._Size = size;
        this._Canvas = document.getElementById('DrawArea');
        this._DeltaX = 0;
        this._DeltaY = 0;
        this._CTXContext = this.Canvas.getContext('2d');
        this._MidX = 0;
        this._MidY = 0;
        this._Rotation = 0.1;
        this._Points = [];
        this.SetPoints = this.SetPoints.bind(this);
        this._Color = "rgba(255, 204, 0, 1)";
        this._Damage = 0;
        this.CheckDamage = this.CheckDamage.bind(this);
        this._Destroyed = false;
    }
    get Size(){
        return this._Size;
    }
    set Size(value){
        this._Size = value;
    }
    get Destroyed(){
        return this._Destroyed;
    }
    set Destroyed(value){
        this._Destroyed = value;
    }
    get Damage(){
        return this._Damage;
    }
    set Damage(value){
        this._Damage = value;
    }
    get Color(){
        return this._Color;
    }
    set Color(value){
        this._Color = value;
    }
    get Points(){
        return this._Points;
    }
    set Points(value){
        this._Points = value;
    }
    get Rotation(){
        return this._Rotation;
    }
    set Rotation(value){
        this._Rotation = value;
    }
    get Velocity(){
        return this._Velocity;
    }
    set Velocity(value){
        this._Velocity = value;    
    }
    get deltaX(){
        return this._DeltaX;
    }
    set deltaX(value){
        this._DeltaX = value;    
    }
    get deltaY(){
        return this._DeltaY;
    }
    set deltaY(value){
        this._DeltaY = value;    
    }
    get ctx(){
        return this._CTXContext;
    }
    set ctx(value){
        this._CTXContext = value;    
    }
    get MidX(){
        return this._MidX;
    }
    set MidX(value){
        this._MidX = value;
    }
    get MidY(){
        return this._MidY;
    }
    set MidY(value){
        this._MidY = value;
    }
    get Canvas(){
        return this._Canvas;
    }
    set Canvas(value){
        this._Canvas = value;
    }
}

class StarShip extends Shape{
    constructor(size){
       super(size);
    }
}

class Triangle extends Shape{
    constructor(size,velocity){
        super(size);
        this._Velocity = velocity;
        this.MakeTriangle = this.MakeTriangle.bind(this);
        this.drawTriangle = this.drawTriangle.bind(this);
    }
    get Velocity(){
        return this._Velocity;
    }
    set Velocity(value){
        this._Velocity = value;    
    }
    draw(e) {
        if (this.Canvas.getContext) {
            this.ctx.beginPath();
            this.ctx.moveTo((e.clientX+this.Size) + deltaX, (e.clientY+this.Size+20) + deltaY);
            this.ctx.lineTo((e.clientX + deltaX), (e.clientY + deltaY));
            this.ctx.lineTo(((e.clientX+this.Size+30) + deltaX), (e.clientY + deltaY));
            this.ctx.closePath();

            this.MidX = ((e.clientX*3) + 90 + (deltaX*3))/3;
            this.MidY = ((e.clientY*3) + 50 + (deltaY*3))/3;

            this.deltaX = e.clientX;
            this.deltaY = e.clientY;

            // the outline
            this.ctx.lineWidth = 10;
            this.ctx.strokeStyle = "rgba(102, 102, 102, 1)";
            this.ctx.stroke();

            // the fill color
            this.ctx.fillStyle = "rgba(255, 204, 0, 1)";
            this.ctx.fill();
            //this.drawMid();
        }
    }

    SetPoints(x1, y1, x2, y2, x3, y3){
        this.Points = [];
        this.Points = [x1, y1, x2, y2, x3, y3];
    }

    MakeTriangle(){
        if (this.Canvas.getContext) {
            ctx.beginPath();
            ctx.moveTo((this.deltaX + this.Size) + this.Velocity, (this.deltaY + this.Size + 20) + this.Velocity);
            ctx.lineTo((this.deltaX) + this.Velocity, (this.deltaY + this.Velocity));
            ctx.lineTo(((this.deltaX + this.Size + 30) + this.Velocity), (this.deltaY + this.Velocity));
            ctx.closePath();

            SetPoints((this.deltaX + this.Size) + this.Velocity, (this.deltaY + this.Size + 20) + this.Velocity,(this.deltaX) + this.Velocity, (this.deltaY + this.Velocity),((this.deltaX + this.Size + 30) + this.Velocity), (this.deltaY + this.Velocity));

            // the outline
            ctx.lineWidth = 10;
            ctx.strokeStyle = "rgba(102, 102, 102, 1)";
            ctx.stroke();

            // the fill color
            ctx.fillStyle = "rgba(255, 204, 0, 1)";
            ctx.fill();
        }
    }

    CheckDamage(){
        if (this.Damage > DAMAGE_THRESHOLD){
            this.Destroyed = true;
        }
    }

    drawTriangle(radius) {

        this.CheckDamage();

        if (this.Destroyed == true){
            startFireWorkDisplay(this.deltaX,this.deltaY);
            //deal with destroyed object
        }else{
            this.ctx.beginPath();
            this.Points = [];
            /* number of vertices for polygon */
            var sides = 3;
            /* angle between vertices of polygon */
            var a = ((Math.PI * 2) / sides);
        
            for (var i = 0; i < sides; i++) {
                this.ctx.lineTo(this.deltaX + radius * Math.cos(a*i+this.Rotation), this.deltaY + radius * Math.sin(a*i+this.Rotation));
                this.Points.push(this.deltaX + radius * Math.cos(a*i+this.Rotation));
                this.Points.push(this.deltaY + radius * Math.sin(a*i+this.Rotation));
            }

            this.ctx.lineWidth = 10;
            this.ctx.strokeStyle = "rgba(102, 102, 102, 1)";
            this.ctx.stroke();

            // the fill color
            this.ctx.fillStyle = this.Color;
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }

    drawMid(){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.MidX,this.MidY,5,5);
    }
}

var resize = function () {
    var canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// #region Events
window.addEventListener('click',mouseclick,false);

window.addEventListener('resize', resize);

window.addEventListener("keydown", moveSomething, false);

window.addEventListener('load', function (){
    resize();
});
// #endregion

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (index = 0;index < TriangleArray.length;index++)
    {
        var numX = Math.floor(Math.random()*TriangleArray[index].Velocity) + 1;
        numX *= Math.floor(Math.random()*4) == 1 ? 1 : -1;

        var numY = Math.floor(Math.random()*TriangleArray[index].Velocity) + 1;
        numY *= Math.floor(Math.random()*4) == 1 ? 1 : -1;

        TriangleArray[index].deltaX += numX; //Math.floor(Math.random()*TriangleArray[index].Velocity);
        TriangleArray[index].deltaY += numY; //Math.floor(Math.random()*TriangleArray[index].Velocity);
        if (TriangleArray[index].deltaX < 5 || TriangleArray[index].deltaX > canvas.width - 5){
           TriangleArray[index].Velocity *= -1; 
        }
        if (TriangleArray[index].deltaY < 5 || TriangleArray[index].deltaY > canvas.height - 5){
            TriangleArray[index].Velocity *= -1;
        }
        //TriangleArray[index].MakeTriangle();
        TriangleArray[index].Rotation += 0.1; //+= TriangleArray[index].Rotation;
        TriangleArray[index].drawTriangle(Math.floor(Math.random()*(40-35)+35));

        if (TriangleArray.length > 1){
            DetectCollision()
        }
    }
    drawCircle();
}

function GetRandomRGB(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);

    var color = "rgba(" + r + "," + g + "," + b + ", 1)";
    return color;
}

function DetectCollision()
{
    for (var outerLoop = 0;outerLoop < TriangleArray.length; outerLoop++ )
    {
        for (var innerLoop = 0;innerLoop < TriangleArray.length; innerLoop++ )
        {
            if (outerLoop != innerLoop)
            {
                var hit = polygonPolygon(TriangleArray[outerLoop].Points,TriangleArray[innerLoop].Points);
                if (hit){
                    TriangleArray[outerLoop].Color = GetRandomRGB();

                    TriangleArray[innerLoop].Color = GetRandomRGB();
                    TriangleArray[innerLoop].Velocity *= -1;
                    TriangleArray[innerLoop].Damage++;
                    if (TriangleArray[innerLoop].Destroyed){
                        TriangleArray.splice(innerLoop,1);
                    }
                }
                else{
                    //TriangleArray[outerLoop].Color = "rgba(255, 204, 0, 1)";
                    //TriangleArray[innerLoop].Color = "rgba(255, 204, 0, 1)"
                }
            }
        }
    }
}

function getNonZeroRandomNumberWithMathRound(range){
    var random = Math.round(Math.random()*(range*2)) - range;
    if(random==0) return getNonZeroRandomNumber();
    return random;
}

function drawCircle(e){
    var canvas = document.getElementById("DrawArea")
    var ctx=canvas.getContext("2d");
    ctx.beginPath();
    alert(typeof(e.clientX));
    ctx.arc(e.clientX,e.clientY,50,0,2*Math.PI);
    ctx.stroke();
}

function movingShip(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    e.clientX += 10;
    e.clientY += 7;
    drawShipToCanvas(e);
}

/*
function mouseclick(e){
    var oTriangle = new Triangle(Math.floor(Math.random()*100),Math.floor(Math.random()*8));
    oTriangle.draw(e);
    TriangleArray.push(oTriangle);
    drawCircle(e);
    if (animationStarted == false){
        setInterval(animate,3000/60);
        animationStarted = true;
    }
}
*/

function mouseclick(e){
    //drawCircle(e);
    //drawRect(e);
    drawShipToCanvas(e);
    if (animationStarted == false){
        setInterval(movingShip,3000/60);
        animationStarted = true;
    }
}

function drawShipToCanvas(e){
    var canvas = document.getElementById("DrawArea")
    var ctx=canvas.getContext("2d");
    const image = document.getElementById('source');
    var x = e.clientX;
    var y = e.clientY;
    ctx.drawImage(image, x, y, 100, 75);
}


function drawRect(e){
    var canvas = document.getElementById("DrawArea")
    var ctx=canvas.getContext("2d");
    ctx.strokeStyle = 'red';
    ctx.strokeRect(300, 300, 100, 100);
}

function moveSomething(e) {
    var canvas = document.getElementById("DrawArea")
    switch(e.keyCode) {
        case 37:
            deltaX -= 5;
            break;
        case 38:
            deltaY -= 5;
            break;
        case 39:
            deltaX += 5;
            break;
        case 40:
            deltaY += 5;
            break;
    }
    e.preventDefault();
    var ctx = canvas.getContext('2d');
    var PosX = 50;
    var PosY = 50;
    var radius = 40;
    drawTriangle(ctx, PosX, PosY, radius, Math.PI / 4);

}

function drawTriangle(context, PosX, PosY, radius, rotate) {
    context.beginPath();

    /* number of vertices for polygon */
    var sides = 3;
    /* angle between vertices of polygon */
    var a = ((Math.PI * 2) / sides);

    for (var i = 0; i < sides; i++) {
        context.lineTo(PosX + radius * Math.cos(a*i+rotate), PosY + radius * Math.sin(a*i+rotate));
    }

    context.closePath();
    context.stroke();

    return true;
}

var canvas = document.getElementById("DrawArea")
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var PosX = 50;
    var PosY = 50;
    var radius = 40;
    drawTriangle(ctx, PosX, PosY, radius, Math.PI / 4);
}

function polygonPolygon(points1, points2)
{
    var a = points1
    var b = points2
    var polygons = [a, b]
    var minA, maxA, projected, minB, maxB, j
    for (var i = 0; i < polygons.length; i++)
    {
        var polygon = polygons[i]
        for (var i1 = 0; i1 < polygon.length; i1 += 2)
        {
            var i2 = (i1 + 2) % polygon.length
            var normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] }
            minA = maxA = null
            for (j = 0; j < a.length; j += 2)
            {
                projected = normal.x * a[j] + normal.y * a[j + 1]
                if (minA === null || projected < minA)
                {
                    minA = projected
                }
                if (maxA === null || projected > maxA)
                {
                    maxA = projected
                }
            }
            minB = maxB = null
            for (j = 0; j < b.length; j += 2)
            {
                projected = normal.x * b[j] + normal.y * b[j + 1]
                if (minB === null || projected < minB)
                {
                    minB = projected
                }
                if (maxB === null || projected > maxB)
                {
                    maxB = projected
                }
            }
            if (maxA < minB || maxB < minA)
            {
                return false
            }
        }
    }
    return true
}

// #region fireworks
const c = document.getElementById("DrawArea")
const $ = c.getContext('2d')
const h = window.innerHeight;
const w = window.innerWidth;
//document.body.appendChild(c)

const GRAVITY = 0.04
const color = (h = 0, s = 100, l = 100, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`
const randomFloat = (min, max) => Math.random() * (max - min) + min
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const cleanFrame = (opacity) => {
  $.globalCompositeOperation = 'source-over'
  $.globalCompositeOperation = 'lighter'
}

class FireWork {
    constructor({
      x,
      y,
      vx,
      vy,
      size,
      hue
    }) {
      this.setPosition(x, y)
      this.setVelocity(vx, vy)
  
      this.size = size
  
      this.hue = hue || 0
      this.alpha = 1
    }
  
    setPosition(x, y) {
      this.x = x
      this.y = y
    }
  
    setVelocity(vx, vy) {
      this.vx = vx
      this.vy = vy
    }
  
    render() {
      $.fillStyle = color(this.hue, 50, 50, this.alpha)
      $.beginPath()
      $.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
      $.fill()
    }
  }

  class ExplodingFireWork extends FireWork {
    constructor(options) {
      super(options)
  
      this.exploded = false
      this.explodePoint = randomNumber(100, h / 2)
    }
  
    update() {
      this.x += this.vx
      this.y += this.vy
  
      if (this.y < h / 2) this.vy += GRAVITY
  
      if (!this.exploded) {
        if (this.vy >= 0 || this.y < this.explodePoint) {
          explode(this)
  
          this.alpha = 0
          this.exploded = true
        }
      }
    }
  }

  class FadingFireWork extends FireWork {
    constructor(options) {
      super(options)
    }
  
    update() {
      this.x += this.vx
      this.y += this.vy
  
      this.vy += GRAVITY
  
      if (this.alpha) {
        this.alpha -= 0.03
      }
    }
  }

  class FireWorkDisplay {
    constructor(limit = 5) {
        this.limit = limit
        this.fireworks = []
    }

    add(firework) {
        this.fireworks.push(firework)
    }

    remove(firework) {
        this.fireworks = this.fireworks.filter(x => x !== firework)
    }

    render() {
        this.fireworks.map(x => x.render())
    }

    update() {
        this.fireworks.map(x => {
            x.update()
            if (x.alpha <= 0) this.remove(x)
            if (x.exploded) this.remove(x)
        })
    }
}

const STAGE = new FireWorkDisplay(100)

function igniteNewFireWork(x,y) {
    const hues = [
        randomNumber(0, 20),
        randomNumber(10, 30),
        randomNumber(60, 80),
        randomNumber(250, 280)
    ]

    const firework = new ExplodingFireWork({
        x: x,
        y: y,
        vx: randomFloat(-1, 1),
        vy: randomFloat(2, 4) * -1,
        size: randomNumber(1, 3),
        hue: hues[randomNumber(0, hues.length - 1)]
    })

    STAGE.add(firework)
}

function explode(firework) {
    const embers = 10
    const radius = 4

    for (let i = 0; i < embers; ++i) {
        const ember = new FadingFireWork({
            x: firework.x,
            y: firework.y,
            vx: radius * Math.cos(2 * Math.PI * i / embers),
            vy: radius * Math.sin(2 * Math.PI * i / embers),
            size: firework.size + 1,
            hue: firework.hue
        })

        STAGE.add(ember)
    }
}

function draw(x,y) {
    requestAnimationFrame(draw)
    //cleanFrame(0.1)

    //if (STAGE.fireworks.filter(x => !x.exploded).length < STAGE.limit) {
        igniteNewFireWork(x,y)
    //}

    STAGE.update()
    STAGE.render()
    if (STAGE.fireworks.length > 500){
        STAGE.fireworks.length = 0;
    }
}

function startFireWorkDisplay(x,y) {
    //$.fillStyle = '#000'
    //$.fillRect(0, 0, w, h)

    // Add user input
    //const input = document.getElementById('fireWorkCount')

    //input.onchange = () => {
    STAGE.limit = 10;
   // }

    draw(x,y)
}
// #endregion

function ShowInfo()
{
    alert(STAGE.fireworks.length);
}
