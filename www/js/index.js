var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        window.sshConnect = window.cordova.plugins.sshConnect;
        initBasicButtons();
    }
};

app.initialize();

function initBasicButtons() {
    $("#close").on('click', function() {
        disconnect();
    });

    $("#connect").on('click', function() {
        window.sshConnect.connect(sshParrams['name'], sshParrams['password'], sshParrams['domain'], sshParrams['port'], function(success) {
            $("#connect").remove();
            $("#allButtons").prepend(
                `<div id="actionButtons">
                    <button id="upgrade">Upgrade</button><br />
                    <button id="reboot">Reboot</button><br />
                    <button id="shutdown">Shutdown</button><br />
                </div>`
            );
            initActionButtons();
        }, function(failure) {
            showFailure(failure);
            window.cordova.plugins.exit();
        });
    });
}

function initActionButtons() {
    $("#upgrade").on('click', function() {
        executeCommand(actionButtonsParams[$(this).attr('id')]);
    });

    $("#reboot").on('click', function() {
        executeCommand(actionButtonsParams[$(this).attr('id')]);
    });

    $("#shutdown").on('click', function() {
        executeCommand(actionButtonsParams[$(this).attr('id')]);
    });
}

function executeCommand(cmd) {
    sshConnect.executeCommand(cmd, function(success) {
        disconnect();
    }, function(failure) {
        showFailure(failure);
    });
}

function disconnect() {
    sshConnect.disconnect(function(success) {
        window.close()
        window.cordova.plugins.exit();
    }, function(failure) {
        showFailure(failure);
        window.close()
        window.cordova.plugins.exit();
    });
}

function showFailure(msg) {
    console.log(msg);
}
