/**
* @author Evgenios Skitsanos, (evgenios@skitsanos.com)
* @copyright Skitsanos.com 
* 
* Based on Microsoft Windows Media Player APIs:
* .player - http://msdn.microsoft.com/en-us/library/bb249349(VS.85).aspx
* .player.settings: http://msdn.microsoft.com/en-us/library/bb262907(VS.85).aspx
*/

if (!Waml) { alert('waml.core.js missing'); }
if (!Waml.Browser) { alert('waml.browser.js missing'); }
if (!Waml.Media) { Waml.Media = {}; }
if (!jQuery) {
    alert('jQuery must be installed. Can\'t continue.');
}
else {

    Waml.Media.GUID = {};
    Waml.Media.GUID.WM = "6BF52A52-394A-11D3-B153-00C04F79FAA6";

    Waml.Media.MediaPlayerManager = function() { hash = {}; uniqueID = 1; }
    Waml.Media.MediaPlayerManager.addPlayer = function(player) { hash[++uniqueID] = player; return uniqueID; }
    Waml.Media.MediaPlayerManager.getPlayer = function(id) { return hash[id]; }
    Waml.Media.MediaPlayerManager.callMethod = function(id, methodName) {
        var player = Waml.Media.MediaPlayerManagerInstance.getPlayer(id);
        if (player == null) { alert("Player with id: " + id + " not found"); }
        if (player[methodName] == null) { alert("Method " + methodName + " Not found"); }

        var args = new Array();
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        player[methodName].apply(player, args);
    }

    if (!Waml.Media.MediaPlayerManagerInstance) { Waml.Media.MediaPlayerManagerInstance = new Waml.Media.MediaPlayerManager(); }

    Waml.Media.MediaPlayer = function(containerId, width, height) {
        //todo: plugin detect    
        this.id = Waml.Media.MediaPlayerManager.addPlayer(this);
        this.container = containerId;
        this.htmlObjectId = "mediaPlayer_" + containerId;
        this.showControls = false;
        this.width = width;
        this.height = height;
        this.fullScreen = false;
        this.stretchToFit = true;
        if (version != null) {
            this.version = Waml.Media.GUID.WM;
        }
        else {
            this.version = Waml.Media.GUID.WM;
        }

        $('#' + containerId).html();

        if (Waml.Browser.isIe()) {
            var _object = $('<object id="' + this.htmlObjectId + '" width="' + this.width + '" height="' + this.height + '" uiMode="mini" classid="clsid:' + this.version + '" type="application/x-oleobject"/>');
            this.player = _object;
            $('#' + containerId).append(_object);
        }
        else {
            var _embed = $('<embed id="' + this.htmlObjectId + '" name="' + this.htmlObjectId + '" width="' + this.width + '" height="' + this.height + '"/>');
            this.player = _embed;
            $('#' + containerId).append(_embed);
        }
    }

    Waml.Media.MediaPlayer.prototype.setUiMode = function(mode) {
        var ____player = document[Waml.Media.MediaPlayerManager.getPlayer(this.id).player.attr('id')];
        ____player.uiMode = mode;
    }

    Waml.Media.MediaPlayer.prototype.play = function(url) {
        var ____player = document[Waml.Media.MediaPlayerManager.getPlayer(this.id).player.attr('id')];
        if (this.version == Waml.Media.GUID.WM && Waml.Browser.isIe()) {
            ____player.enableErrorDialogs = "true";
            ____player.URL = url;
        }
        else {
            ____player.src = url;
        }
    }

    Waml.Media.MediaPlayer.uiMode = {};
    Waml.Media.MediaPlayer.uiMode.MINI = "mini";
    Waml.Media.MediaPlayer.uiMode.NONE = "none";
    Waml.Media.MediaPlayer.uiMode.FULL = "full";
}
