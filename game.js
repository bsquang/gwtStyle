// BSQ GUITAR 2014
// Property of CHERRY
// LOOP
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
var interval = 1000 / 60,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

var bStartRandom = false;


function gameLoop() {
    
    window.requestAnimationFrame(gameLoop);
    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if (bStartRandom) {
        
        
        lastTime = currentTime - (delta % interval);
    }
}

var countRandom = 0;
var maxRandom = 10;

var classGOD = 0;
var imgGOD = 0;

function bsqRandom(){
    
    setTimeout(function(){
        
        if(countRandom < maxRandom){
            
            
            picShuffle();
            
            
            countRandom++;            
            
            if (countRandom >= maxRandom) {
                                
                nextState();
                
                console.log("Stop random");
                
            }else{
                
                bsqRandom();
                
            }
        }
        
        
    }, 300)
    
}

function picShuffle(){
    var imgs = $(".mImg");
    for(var i = 0; i < imgs.length ; i++){
        
        var randTop, randLeft;
        
        if ($(window).width() >= 1024) {
            randTop = Math.round((Math.random() * (500)));
            randLeft = Math.round((Math.random() * (700)));
        }else{
            randTop = Math.round((Math.random() * (300)));
            randLeft = Math.round((Math.random() * (400)));
        }
        
        
        
        $(imgs[i]).css("position","absolute");
        $(imgs[i]).animate({top:randTop,left:randLeft},300);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var arrVOICE = [];
var strSnd = [];
strSnd[0] = "res/SOUND/voice-1.mp3";
strSnd[1] = "res/SOUND/voice-2.mp3";
strSnd[2] = "res/SOUND/voice-3.mp3";

strSnd[3] = "res/SOUND/voice-4.mp3";
strSnd[4] = "res/SOUND/voice-5.mp3";
strSnd[5] = "res/SOUND/voice-6.mp3";

strSnd[6] = "res/SOUND/voice-7.mp3";
strSnd[7] = "res/SOUND/voice-8.mp3";



var currentId = 0;

var stateChoice = [];
stateChoice[0]=0;
stateChoice[1]=0;
stateChoice[2]=0;
stateChoice[3]=0;
stateChoice[4]=0;
stateChoice[5]=0;



if (bPHONEGAP) document.addEventListener("deviceready", onDeviceReady, false);
else {
    $(document).ready(function() {
        onDeviceReady();
    })
}



function onDeviceReady() {

    if (bPHONEGAP) {

        arrVOICE[0] = new Media(strSnd[0], function() {}, function() {});
        arrVOICE[1] = new Media(strSnd[1], function() {}, function() {});
        arrVOICE[2] = new Media(strSnd[2], function() {}, function() {});
        
        arrVOICE[3] = new Media(strSnd[3], function() {}, function() {});
        arrVOICE[4] = new Media(strSnd[4], function() {}, function() {});
        arrVOICE[5] = new Media(strSnd[5], function() {}, function() {});
        
        arrVOICE[6] = new Media(strSnd[6], function() {}, function() {});
        arrVOICE[7] = new Media(strSnd[7], function() {}, function() {});
        
    } else {

        arrVOICE[0] = new Audio(strSnd[0]);
        arrVOICE[1] = new Audio(strSnd[1]);
        arrVOICE[2] = new Audio(strSnd[2]);
        
        arrVOICE[3] = new Audio(strSnd[3]);
        arrVOICE[4] = new Audio(strSnd[4]);
        arrVOICE[5] = new Audio(strSnd[5]);
        
        arrVOICE[6] = new Audio(strSnd[6]);
        arrVOICE[7] = new Audio(strSnd[7]);

    }

    window.addEventListener("touchmove", function(e) {
        e.preventDefault();
    })



    introState();

    $(".posterStyle").bind('touchstart', function() {
        var tempID = $(this).attr('style-id');
        var stateID = $(this).attr('state-id');
        
        //stateChoice[stateID][tempID] = 1;
        
        stateChoice[stateID] = 1;
        
        choice(stateID,tempID);
        
        $(".buttonNext").fadeIn();
    })

    
    
    $(".buttonNext").bind('touchstart', function() {
        
        nextState();
        
    })
    
    $(".buttonPrevious").bind('touchstart', function() {
        
        currentId -= 1;
        
        console.log("back "+currentId);
        
        if (stateChoice[currentId] == 1) {
            $(".buttonNext").show();
        }
        
        if (currentId == 0) {
            $('.buttonPrevious').hide();
        }
        
        gotoScene(currentId+1);
        
    })


    $("#buttonCONFIG").bind('touchstart', function() {
        var tempPass = prompt("Input password");
        if (tempPass == "a") {
            $("#panelConfig").fadeIn();

            loadUser();

        }
    })
    
    $("#buttonQUIT").bind('touchstart', function() {
       reload();
    })
    
    
    picShuffle();
    
    //gameLoop();

}

var oldID = -1;
function choice(stateID,tempID){
    if (oldID != tempID) {
        
        if (oldID >= 0) {
            $(".posterStyle[state-id="+stateID+"]").removeClass("bounce-zoom");
            $(".posterStyle[state-id="+stateID+"]").addClass('show');
        }
        
        var tempArr = $(".posterStyle[state-id="+stateID+"]");
        for(var i=0;i<tempArr.length;i++){
            var tempObj = tempArr[i];
            if ($(tempObj).attr('style-id')==tempID) {
                
                $(tempObj).removeClass('show');
                $(tempObj).addClass('bounce-zoom');
                
                
            }
        }
        
        //$(".posterStyle[state-id="+stateID+"]").removeClass('show');
        //$(".posterStyle[state-id="+stateID+"]").addClass('bounce-zoom');
        
        
        oldID = tempID;
    }
    
}

function nextState(){
    
    

    currentId += 1;
    
    arrVOICE[currentId-1].pause();
    
    if (currentId == 1) {
        arrVOICE[1].play();
    }
    if (currentId == 2) {
        arrVOICE[2].play();
    }
    if (currentId == 3) {
        arrVOICE[3].play();
    }
    if (currentId == 4) {
        arrVOICE[4].play();
    }
    if (currentId == 5) {
        arrVOICE[5].play();
    }
    if (currentId == 6) {
        arrVOICE[6].play();
    }
    
    if (currentId > 0 && currentId < 6) {
        $('.buttonPrevious').fadeIn();
    }
    
    if (currentId == 6) {
        $('.buttonNext').fadeIn();
    }
    
    if (currentId == 5) {
        
        $('.buttonNext').hide(); 
        $('.buttonPrevious').hide();
        
        console.log("Action random state");
        
        bsqRandom();
        
        classGOD = getRandomInt(0,2);
        
        if(classGOD<2) imgGOD = getRandomInt(0,2);
        else imgGOD = getRandomInt(0,3);
        
        if (classGOD == 0) {
            $(".styleTextGOD").html("Sang trọng")
        }
        if (classGOD == 1) {
            $(".styleTextGOD").html("Hiện đại")
        }
        if (classGOD == 2) {
            $(".styleTextGOD").html("Toàn cầu")
        }
        
        var tempLink = "res/gold/god/god-"+classGOD+""+imgGOD+"1.jpg";
        $("#imageGOD")[0].src = tempLink;
    }
    
    gotoScene(currentId+1);
    
    if (stateChoice[currentId] == 0) {
        $(".buttonNext").hide();
    }
    
    if (currentId == 7) {
        $('.buttonNext').hide();        
    }     
        

    console.log("next "+currentId);
}

function introState() {
    gotoScene("0");
    setTimeout(function() {

        gotoScene("1");
        arrVOICE[0].play();

    }, 5000)
}

function sendState() {
    gotoScene("9");
    arrVOICE[7].play();
}

function sendAction() {
    var username = $("#userName").val();
    var useremail = $("#userEmail").val();
    var usertel = $("#userTel").val();

    if (username == "" || useremail == "" || usertel == "") {
        alert("Yêu cầu điền đầy đủ thông tin vào các ô trống");

        return;
    }

    var db = {
        
        "name": username,
        "email": useremail,
        "tel": usertel
        
    };
    
    localStorage.setItem(localStorage.length, JSON.stringify(db));
    thankState();
    
}


function thankState() {

    document.activeElement.blur();
    
    gotoScene("10");
    setTimeout(function() {

        window.location.href = "";

        //introState();

    }, 2000);
}

function confirmState(){
    gotoScene("#panelConfirm");
}

function gotoScene(id) {
    
    $(".panel").hide();
    $($(".panel")[id]).fadeIn();
}




function reload() {
    var temp = confirm("Do you want to reload ?");
    if (temp) window.location.href = "";
}


//////////////
function loadUser() {
    
    if (localStorage.length>0) {
        $("#buttonSendAjax").text("Send to server " + "("+localStorage.length+")");
    }   
    
}


function sendAjaxDB(){
    if (navigator.onLine) {
        var tempArray = [];
        for (var i = 0; i < localStorage.length; i++) {
            tempArray.push(JSON.parse(localStorage[i]));
        }
        
        $.ajax({
            type:'POST',
            url:'http://bsq.cherryvietnam.com/goldworld/ajax.php',
            data:{            
                'dbstyle':JSON.stringify(tempArray)            
            },
            success:function(msg){
               var temp = JSON.parse(msg);
                
               if (temp.result == "1") {
                
                    alert("Done to send server");
                    $("#buttonSendAjax").text("None");
                    
                    localStorage.clear();
               }
               
               
        }});
    }else{
        
        alert("Thiet bi hien tai chua ket noi vao internet !");
        
    }
    
}