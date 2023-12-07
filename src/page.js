/*
参考:https://github.com/pentamania/ios-unlock-test
*/


pic_pen = ["pen_13_black.png", "pen_1_blue.png", "pen_2_skyblue.png", "pen_3_water.png", "pen_4_greenblue.png",
             "pen_5_green.png", "pen_6_younggreen.png", " pen_7_yellow.png", " pen_8_orange.png",
            "pen_9_red.png", "pen_10_redpink.png", "pen_11_pink.png", "pen_12_pirple.png"];


code_list = [ 'C.wav', 'Csh.wav',
            'D.wav', 'Dsh.wav', 'E.wav', 'F.wav','Fsh.wav',  
            'G.wav', 'Gsh.wav',  'A.wav', 'Ash.wav', 'B.wav'];

singletone_list = ['01.wav', '02.wav', '03.wav', '04.wav', '05.wav', 
                    '06.wav', '07.wav', '08.wav', '09.wav', '10.wav', 
                    '11.wav', '12.wav', '13.wav']

id_list = ["#1D2088", "#0068B7", "#00A0E9", "#009E96", "#009944",
             "#8FC31F", "#FFF100", "#F39800", "#E60012", "#E5004F",
              "#E4007F", "#920783"];




let pen_color = id_list[0];
let pen_weight = 5;
let IDs = [];
let CODEs = [];

let SINGLEs =  [];


for (let i = 0; i < id_list.length; i++){
    CODEs[i] = new Audio(`./src/tone/tone_code/${code_list[i]}`);
    IDs[i] = document.getElementById(id_list[i]);
}

for (let i = 0; i < singletone_list.length; i++){
    SINGLEs[i] = new Audio(`./src/tone/tone_single/${singletone_list[i]}`)
}


singletone = SINGLEs[0];

function makeSound(y, y_min = 0, y_max = 425){
    console.log(Math.trunc(y / ((y_max - y_min) / 13 )), y)
    singletone = SINGLEs[Math.trunc(y / ((y_max - y_min) / 13 ))]
    singletone.play();
}

let tone = CODEs[0];  // 今出している音



// スクロールさせないための関数

function cantScroll(event){
    event.preventDefault
}


window.onload = function() {
    // ページ読み込みと同時にロード
    wa.loadFile("./src/tone/tone_single/01.wav", function(buffer) {
    });
    document.addEventListener("touchmove", cantScroll, {passive: false});
    document.addEventListener("wheel", cantScroll, {passive: false});
}



// ボタンをクリックされたイベントのための関数

function clicked_pen(e){
    pen_code = e;
    pen_color = pen_code;
    tone = CODEs[id_list.indexOf(pen_color)];
    // SAMPLE_AUDIOs[id_list.indexOf(pen_color)].play();
}

function clicked_reset(){  // リセットボタンが押されたら
    clear();  // canvasをclearする
    background(255);  // 背景色も消されるため、白色にする
}

function clicked_weight(e){
    pen_weight = e;
}


function clicked_eraser(){
    pen_color = "#ffffff"
}



// キャンバスのための関数

function setup(){
    // canvas = createCanvas(window.innerWidth * 2 / 3, window.innerHeight * 2 / 3);
    canvas = createCanvas(800, 480);
    canvas.parent("canvas");
    // canvas.position((screen.width - 600) / 2, 0)
    background(255);
}

const CANVAS = document.getElementById("canvas");
let num = 0;
let lastX = 0;
let lastY = 0;
let speed = 0;

single_num = 0;

function draw(){

    stroke(pen_color);
    strokeWeight(pen_weight)

    CANVAS.addEventListener("mousemove", function(event){  // 速度
        // console.log(`X:${event.clientX}\nY:${event.clientY}`);
        num = 1;
        let deltaX = event.clientX - lastX;
        let deltaY = event.clientY - lastY;
        speed = Math.sqrt((deltaX * deltaX + deltaY * deltaY));
        lastX = event.clientX;
        lastY = event.clientY;
        // console.log(speed);
    })
    CANVAS.addEventListener("mouseout", function(){
        num = 0;
        tone.pause();
        tone.currentTime = 0;
        singletone.pause();
        singletone.currentTime = 0;
    })

    if (num == 1){

            
        if (mouseIsPressed){

            
        }else{
                    
            tone.pause();
            tone.currentTime = 0;
            singletone.pause();
            singletone.currentTime = 0;
        }


    }else {
        
    }
}


function mouseDragged(){

    line(pmouseX, pmouseY, mouseX, mouseY);

    if (pen_color != "#000000"){

        tone.play();

        if (single_num != Math.trunc(mouseY / ((450 - 0) / 13 ))){
            singletone.pause();
            single_num = Math.trunc(mouseY / ((450 - 0) / 13 ));
        }


        singletone = SINGLEs[single_num];
        singletone.play();
        // console.log(singletone);

    }

}


function mouseReleasd(){

    tone.pause();
    tone.currentTime = 0;
    singletone.pause();
    singletone.currentTime = 0;

}

/*
function makeSound(y, y_min = 0, y_max = 425){
    console.log(Math.trunc(y / ((y_max - y_min) / 13 )), y)
    singletone = SINGLEs[Math.trunc(y / ((y_max - y_min) / 13 ))]
    singletone.play();
} */