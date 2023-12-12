/*
参考:https://github.com/pentamania/ios-unlock-test
*/


let pic_pen = ["pen_13_black.png", "pen_1_blue.png", "pen_2_skyblue.png", "pen_3_water.png", "pen_4_greenblue.png",
             "pen_5_green.png", "pen_6_younggreen.png", " pen_7_yellow.png", " pen_8_orange.png",
            "pen_9_red.png", "pen_10_redpink.png", "pen_11_pink.png", "pen_12_pirple.png"];


let code_list = [ 'C.wav', 'Csh.wav',
            'D.wav', 'Dsh.wav', 'E.wav', 'F.wav','Fsh.wav',  
            'G.wav', 'Gsh.wav',  'A.wav', 'Ash.wav', 'B.wav'];

let singletone_list = ['01.wav', '02.wav', '03.wav', '04.wav', '05.wav', 
                    '06.wav', '07.wav', '08.wav', '09.wav', '10.wav', 
                    '11.wav', '12.wav', '13.wav']

let id_list = ["#1D2088", "#0068B7", "#00A0E9", "#009E96", "#009944",
             "#8FC31F", "#FFF100", "#F39800", "#E60012", "#E5004F",
              "#E4007F", "#920783"];




let pen_color = id_list[0];
let pen_weight = 8;
let IDs = [];
let CODEs = [];

let SINGLEs =  [];

let tone = CODEs[0];  // 今出している音

for (let i = 0; i < id_list.length; i++){
    CODEs[i] = new Audio(`./src/tone/tone_code/${code_list[i]}`);
    IDs[i] = document.getElementById(id_list[i]);
    IDs[i].addEventListener("touchstart", clicked_pen(id_list[i]));
}

for (let i = 0; i < singletone_list.length; i++){
    SINGLEs[i] = new Audio(`./src/tone/tone_single/${singletone_list[i]}`)
}


window.onload = function() {
    // ページ読み込みと同時にロード
    wa.loadFile("./src/tone/tone_single/01.wav", function(buffer) {
    });
}



// ボタンをクリックされたイベントのための関数

function clicked_pen(e){
    pen_code = e;
    pen_color = pen_code;
    tone = CODEs[id_list.indexOf(pen_color)];
}

// リセットボタンが押されたら白色にする
function clicked_reset(){
    clear();
    background(255);
}

// 太さを変える
function clicked_weight(e){
    pen_weight = e;
}

// 消しゴムがクリックされたら、ペンの色を白にする
function clicked_eraser(){
    pen_color = "#ffffff"
}




// キャンバスのための関数


// 起動されたら実行する
function setup(){
    let windowHeight;
    let windowWidth;
    // canvas = createCanvas(window.innerWidth * 2 / 3, window.innerHeight * 2 / 3);
    if (MediaQueryList.matches){  // 横幅より高さのほうが大きければ
        windowHeight = window.innerWidth * 3 / 4;
        windowWidth = window.innerHeight * 4 / 5;
    } else {
        windowWidth = window.innerWidth * 4 / 5;
        windowHeight = window.innerHeight * 3 / 4;
    }
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas");
    background(255);
}

const CANVAS = document.getElementById("canvas");
let num = 0;
let lastX = 0;
let lastY = 0;
let speed = 0;

let single_num = 0;


// 毎秒実行する
function draw(){

    
}


// ブラウザのウィンドウサイズを変更したら
function windowResized(){
    windowWidth = window.innerWidth * 4 / 5;
    windowHeight = window.innerHeight * 3 / 4;
    resizeCanvas(windowWidth, windowHeight);
    background(255);
}


// マウスが移動したら
function mouseDragged(){
    if (0 < mouseY && mouseY < windowHeight && 0 < mouseX && mouseX < windowWidth){


        stroke(pen_color);
        strokeWeight(pen_weight);
        line(pmouseX, pmouseY, mouseX, mouseY);

        if (pen_color != "#ffffff"){

            tone.play();

            if (single_num != Math.trunc(mouseY / ((windowHeight - 0) / 13 ))){
                SINGLEs[single_num].pause();
                single_num = Math.trunc(mouseY / ((windowHeight - 0) / 13 ));
                SINGLEs[single_num].play();
            }

        }

    }

    return false;

}

// マウスが離されたら
function touchEnded(){
    
    for(var i = 0; i < SINGLEs.length; i++){
        SINGLEs[i].pause();
        SINGLEs[i].currentTime = 0;
    }
    for(var i = 0; i < CODEs.length; i++){
        CODEs[i].pause();
        CODEs[i].currentTime = 0;
    }

    tone.pause();
    tone.currentTime = 0;

    return false;

}
