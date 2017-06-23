// For server, need to add + ":8081" to address until we figure
// out WTF is going on with socket.io
var address = window.location.origin + ":8081";

var Client = {};
Client.socket = io.connect(address);

Client.askNewPlayer = function () {
    Client.socket.emit('newplayer');
    //console.log("Sending new player");
};

Client.updatePosition = function (data) {
    Client.socket.emit('move', data);
};

Client.speak = function () {
    Client.socket.emit('speak');
};

Client.sendPhrase = function (data) {
    console.log("client" + data[0]);
    Client.socket.emit('phrase', data);
};


Client.socket.on('newplayer', function (data) {
    mainGameState.addNewPlayer(data.id, data.x, data.y);
});


Client.socket.on('allplayers', function (data) {
    for (var i = 0; i < data.length; i++) {
        mainGameState.addNewPlayer(data[i].id, data[i].x, data[i].y)
    }
});


Client.socket.on('you', function (data) {
    mainGameState.setID(data);
});

Client.socket.on('move', function (data) {
    mainGameState.updateOtherPlayer(data.id, data.x, data.y);
});

Client.socket.on('speak', function (data) {
    mainGameState.updateSpeak(data.id);
});

Client.socket.on('phrase', function (data) {
    console.log("client info " +
        data.id, data.phrase);
    mainGameState.sayPhrase(data.id, data.phrase);
});

Client.socket.on('remove', function (id) {
    mainGameState.removePlayer(id);
});