var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Itsis;
(function (Itsis) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/images/preloader_progressbar.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            var gameWidth = 1600;
            var gameHeight = 900;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.game.scale.maxWidth = gameWidth;
                this.game.scale.maxHeight = gameHeight;
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Itsis.Boot = Boot;
})(Itsis || (Itsis = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var Itsis;
(function (Itsis) {
    var ObjInOpenSpaceTemplate = (function () {
        function ObjInOpenSpaceTemplate(id, name, posx, posy, width, height) {
            ObjInOpenSpaceTemplate.listOfTemplate.push(this);
            this.id = id;
            this.posx = posx;
            this.posy = posy;
            this.width = width;
            this.height = height;
            this.id = id;
            this.name = name;
        }
        ObjInOpenSpaceTemplate.listOfTemplate = [];
        return ObjInOpenSpaceTemplate;
    })();
    Itsis.ObjInOpenSpaceTemplate = ObjInOpenSpaceTemplate;
})(Itsis || (Itsis = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpaceTemplate.ts" />
var Itsis;
(function (Itsis) {
    var ObjInOpenSpace = (function () {
        function ObjInOpenSpace() {
        }
        return ObjInOpenSpace;
    })();
    Itsis.ObjInOpenSpace = ObjInOpenSpace;
})(Itsis || (Itsis = {}));
/// <reference path="./ObjInOpenSpace.ts"/>
var Itsis;
(function (Itsis) {
    (function (State) {
        State[State["home"] = 0] = "home";
        State[State["working"] = 1] = "working";
        State[State["lunch"] = 2] = "lunch";
        State[State["breaktime"] = 3] = "breaktime";
        State[State["goToDesk"] = 4] = "goToDesk";
        State[State["goToExit"] = 5] = "goToExit";
    })(Itsis.State || (Itsis.State = {}));
    var State = Itsis.State;
    ;
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character() {
            _super.apply(this, arguments);
        }
        Character.prototype.create = function () {
            this.state = State.home;
            this.startingHour = 8;
            this.endingHour = 18;
            this.enduranceMax = 100;
            this.endurance = this.enduranceMax;
            this.productivity = 100;
            this.motivation = 70;
        };
        ;
        Character.prototype.updateAtHome = function (timeInOpenSpace) {
            if (timeInOpenSpace > this.startingHour) {
                this.state = State.goToDesk;
            }
        };
        ;
        Character.prototype.updateGoToDesk = function (timeInOpenSpace) {
            // path to desk 
            //At end
            // this.state = State.working;
        };
        Character.prototype.updateWorking = function (timeInOpenSpace) {
            if (timeInOpenSpace > this.endingHour) {
                this.state = State.goToExit;
            }
            // TODO : gestion des temps de pause
            // TODO : gestion du lunch time
        };
        Character.prototype.updateGoToExit = function () {
            // path to Exit
            //at end
            this.state = State.home;
        };
        Character.prototype.update = function (timeInOpenSpace) {
            switch (timeInOpenSpace) {
                case State.home:
                    this.updateAtHome(timeInOpenSpace);
                    break;
                case State.goToDesk:
                    this.updateGoToDesk(timeInOpenSpace);
                    break;
                case State.working:
                    this.updateWorking(timeInOpenSpace);
                    break;
                case State.goToExit:
                    this.updateGoToExit();
                    break;
                default:
                    break;
            }
        };
        ;
        return Character;
    })(Itsis.ObjInOpenSpace);
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var Credits = (function (_super) {
        __extends(Credits, _super);
        function Credits() {
            _super.apply(this, arguments);
        }
        Credits.prototype.create = function () {
            var creditsTextStyle = {
                font: "bold 24px Arial",
                fill: "#f00",
                align: "center"
            };
            var creditsContent = "ITSIS - IT Services Industry Simulator";
            creditsContent += "\n\nHaut Bas Gauche Droite A Start";
            var creditsText = this.game.add.text(this.game.world.centerX, 0, creditsContent, creditsTextStyle);
            creditsText.anchor.set(0.5);
            var tween = this.add.tween(creditsText).to({ y: creditsText.height / 2 + this.game.height }, 10000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
            this.input.onDown.addOnce(this.startMainMenu, this);
        };
        Credits.prototype.startMainMenu = function () {
            this.game.state.start("MainMenu", true, false);
        };
        return Credits;
    })(Phaser.State);
    Itsis.Credits = Credits;
})(Itsis || (Itsis = {}));
/// <reference path="./ObjInOpenSpace.ts"/>
var Itsis;
(function (Itsis) {
    var OpenSpace = (function () {
        function OpenSpace() {
            OpenSpace.instance = this;
        }
        return OpenSpace;
    })();
    Itsis.OpenSpace = OpenSpace;
})(Itsis || (Itsis = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./ObjInOpenSpace.ts" />
/// <reference path="./OpenSpace.ts" />
var Itsis;
(function (Itsis) {
    var PlayInOpenSpace = (function (_super) {
        __extends(PlayInOpenSpace, _super);
        function PlayInOpenSpace() {
            _super.apply(this, arguments);
        }
        PlayInOpenSpace.prototype.preload = function () {
            var jsonData = JSON.parse(this.game.cache.getText("SpriteList"));
            for (var i = 0; i < jsonData.sprites.length; i++) {
                this.game.load.image(jsonData.sprites[i].id, jsonData.sprites[i].path);
            }
        };
        PlayInOpenSpace.prototype.create = function () {
            var jsonDataOS = JSON.parse(this.game.cache.getText("OSList"));
            for (var j = 0; j < jsonDataOS.openSpace.length; j++) {
                var tmpJsonOs = jsonDataOS.openSpace[j];
                var tmpOS = new Itsis.OpenSpace();
                for (var itObj = 0; itObj < jsonDataOS.openSpace[j].objInOpenSpace.length; itObj++) {
                    var obj = jsonDataOS.openSpace[j].objInOpenSpace[itObj];
                    var tmp = new Itsis.ObjInOpenSpace();
                    console.log(obj.id);
                    tmp.sprite = this.game.add.sprite(obj.posx, obj.posy, obj.id);
                }
            }
        };
        PlayInOpenSpace.prototype.update = function () {
        };
        PlayInOpenSpace.prototype.render = function () {
        };
        return PlayInOpenSpace;
    })(Phaser.State);
    Itsis.PlayInOpenSpace = PlayInOpenSpace;
})(Itsis || (Itsis = {}));
/// <reference path="./PlayInOpenSpace.ts" />
var Itsis;
(function (Itsis) {
    var ItsisGame = (function (_super) {
        __extends(ItsisGame, _super);
        function ItsisGame() {
            _super.call(this, 1600, 900, Phaser.AUTO, 'content', null);
            this.state.add('Boot', Itsis.Boot, true);
            this.state.add('Preloader', Itsis.Preloader, false);
            this.state.add('MainMenu', Itsis.MainMenu, false);
            this.state.add("Credits", Itsis.Credits, false);
            this.state.add("PlayInOpenSpace", Itsis.PlayInOpenSpace, false);
        }
        return ItsisGame;
    })(Phaser.Game);
    Itsis.ItsisGame = ItsisGame;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            //Background
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;
            this.add.tween(background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //Title
            var itsisTextStyle = {
                font: "bold 72px Arial",
                fill: "#f00",
                align: "center"
            };
            var itsisText = this.game.add.text(this.game.world.centerX, this.game.height / 10, "ITSIS\nIT Services Industry Simulator", itsisTextStyle);
            itsisText.anchor.set(0.5);
            //Buttons
            var buttonTextStyle = {
                font: "32px Arial",
                fill: "#f00"
            };
            var playButton = this.game.add.button(this.game.world.centerX, 5 * this.game.height / 10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            playButton.anchor.set(0.5);
            var playButtonText = this.game.add.text(this.game.world.centerX, 5 * this.game.height / 10, "Jouer", buttonTextStyle);
            playButtonText.anchor.set(0.5);
            var creditsButton = this.game.add.button(this.game.world.centerX, 6 * this.game.height / 10, 'mainmenu_button', this.startCredits, this, 'over', 'out', 'down');
            creditsButton.anchor.set(0.5);
            var creditsButtonText = this.game.add.text(this.game.world.centerX, 6 * this.game.height / 10, "Credits", buttonTextStyle);
            creditsButtonText.anchor.set(0.5);
        };
        MainMenu.prototype.startCredits = function () {
            this.game.state.start("Credits", true, false);
        };
        MainMenu.prototype.startPlay = function () {
            this.game.state.start("PlayInOpenSpace", true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Itsis.MainMenu = MainMenu;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
            this.preloadBar.x = this.game.world.centerX - this.preloadBar.texture.width / 2;
            this.preloadBar.y = this.game.world.centerY - this.preloadBar.texture.height / 2;
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our assets
            this.load.image('mainmenu_background', 'assets/images/mainmenu_background.jpg');
            this.game.load.atlas('mainmenu_button', 'assets/buttons/mainmenu_button.png', 'assets/buttons/mainmenu_button.json');
            // this.game.load.image('tileset','assets/images/office.png')
            this.game.load.text("SpriteList", "assets/scenery/Sprite.json");
            this.game.load.text("OSList", "assets/scenery/openspace1.json");
            // this.game.load.image('table', 'assets/images/table.png');
            // this.game.load.image('tableau', 'assets/images/tableau.png');
        };
        Preloader.prototype.create = function () {
            // var jsonData = JSON.parse(this.game.cache.getText("SpriteList"));
            // for(var i=0;i<jsonData.listOfObj.length;i++){
            //     var tmp = new ObjInOpenSpaceTemplate(jsonData.listOfObj[i].id,jsonData.listOfObj[i].name,jsonData.listOfObj[i].posx,jsonData.listOfObj[i].posy,jsonData.listOfObj[i].width,jsonData.listOfObj[i].height)
            // }
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Itsis.Preloader = Preloader;
})(Itsis || (Itsis = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path='./ItsisGame.ts' />
window.onload = function () {
    var game = new Itsis.ItsisGame();
};
