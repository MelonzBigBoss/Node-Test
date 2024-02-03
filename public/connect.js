var state = 0;
var reconnectionAttempts = 0;
var socket;


function connect()	
{
    if (state === 1) {
        console.log("Already Connecting");
        return;
    }
    if (state === 2) {
        console.log("Already Connected");
        return;
    }

    //socket = new WebSocket("ws:localhost:5805");  
    socket = new WebSocket("ws:10.6.96.2:5805");
    //socket = new WebSocket("ws:roborio-696-frc.local:5805");

	state = 1;
    reconnectionAttempts--;

    Onattempt();

    socket.onopen = function (event) {
        console.log("Connected.")
        reconnectionAttempts = 2;
	    state = 2;
        Onopen();
    };

    socket.onmessage = function (event) {
        handleJsonData(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
        if (event.reason === "Client Disconnect") {
            reconnectionAttempts = 0;
        }
        console.log(`Closed Connection, reason:${event.reason}`);
        socket = null;
        state = 0;
        Onclose();


        if (reconnectionAttempts > 0) { 
            setTimeout(()=> {
                console.log("Attempting Reconnection");
                connect();
            }, 100);
        }
    };

	socket.onerror = function(event) {
	   // console.log("error", event);	
    }
}

function disconnect() {
    if (socket != null) {
        socket.close(1000, "Client Disconnect");
    }   
}

function toggleConnection() {
    if (state == 0) {
        connect();
    }
    if (state == 2) {
        disconnect();
    }
}

document.addEventListener('keydown', function() {
    if (state == 2) {
        socket.send(event.key +":down");
    }
})  

document.addEventListener('keyup', function(){
    if (state == 2) {
        socket.send(event.key +":up");
    }
})

//document.addEventListener('keypress', function(){
//    if (state == 2) {
//        socket.send(event.key +":press");
//    }
//})




