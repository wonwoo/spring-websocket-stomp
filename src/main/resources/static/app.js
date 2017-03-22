let stompClient = null;

let setConnected = function(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messageList").html("");
}

let connect = function() {
    let socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/message', function (greeting) {
            showMessage(JSON.parse(greeting.body).content);
        });
    });
}

let disconnect = function() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

let sendMessage = function() {
    if(stompClient === null) {
        return;
    }
    let $message = $("#message");
    if($message.val() !== "") {
        stompClient.send("/message", {}, $message.val());
    }
}

let showMessage = function(message) {
    let messageBox =
    `
        <li class="message-list-item">
            <div class="message-time">
                ` + new Date().toLocaleTimeString() + `
            </div>
            <div class="message-text">
                ` + message + `
            </div>
        </li>
    `;
    let ul = $("#messageList");
    ul.append(messageBox);
    ul.scrollTop(ul.prop("scrollHeight"));
    $("#message").val("");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function() {
        connect();
    });
    $("#disconnect").click(function() {
        disconnect();
    });
    $("#send").click(function() {
        sendMessage();
    });
    $("#message").keydown(function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
});