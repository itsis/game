var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            var gameWidth = 1600;
            var gameHeight = 900;
            if (this.game.device.desktop) {
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
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character() {
            _super.apply(this, arguments);
        }
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
            this.state.add("Jeu", Itsis.Jeu, false);
        }
        return ItsisGame;
    })(Phaser.Game);
    Itsis.ItsisGame = ItsisGame;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var Jeu = (function (_super) {
        __extends(Jeu, _super);
        function Jeu() {
            _super.apply(this, arguments);
        }
        Jeu.prototype.preload = function () {
            var isoPlugin = new Phaser.Plugin.Isometric(this.game);
            this.game.plugins.add(isoPlugin);
            this.game.iso.anchor.setTo(0.5, 0.2);
            this.game.load.json('level_1', 'assets/maps/level_1.json');
            this.game.load.onFileComplete.add(this.onJSONComplete);
            this.game.load.image('cube', 'assets/scenery/cube.png');
        };
        Jeu.prototype.onJSONComplete = function () {
            this.level1JSON = this.game.cache.getJSON('level_1');
            console.log(this.level1JSON);
            var floorTileName = this.level1JSON.floor.tileName;
            this.game.load.image(floorTileName, this.level1JSON.floor.url);
        };
        Jeu.prototype.create = function () {
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();
            this.spawnTilesFloor();
            this.spawnCube();
        };
        Jeu.prototype.spawnCube = function () {
            var cube = this.game.add.isoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
            cube.anchor.set(0.5);
        };
        Jeu.prototype.spawnTilesFloor = function () {
            var taille = 15 * 38;
            var tileFloor;
            for (var xx = 0; xx < taille; xx += 38) {
                for (var yy = 0; yy < taille; yy += 38) {
                }
            }
        };
        Jeu.prototype.startMainMenu = function () {
            this.game.state.start("MainMenu", true, false);
        };
        return Jeu;
    })(Phaser.State);
    Itsis.Jeu = Jeu;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;
            this.add.tween(background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            var itsisTextStyle = {
                font: "bold 72px Arial",
                fill: "#f00",
                align: "center"
            };
            var itsisText = this.game.add.text(this.game.world.centerX, this.game.height / 10, "ITSIS\nIT Services Industry Simulator", itsisTextStyle);
            itsisText.anchor.set(0.5);
            var buttonTextStyle = {
                font: "32px Arial",
                fill: "#f00"
            };
            var creditsButton = this.game.add.button(this.game.world.centerX, 5 * this.game.height / 10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            creditsButton.anchor.set(0.5);
            var creditsButtonText = this.game.add.text(this.game.world.centerX, 5 * this.game.height / 10, "Jouer", buttonTextStyle);
            creditsButtonText.anchor.set(0.5);
            var creditsButton = this.game.add.button(this.game.world.centerX, 6 * this.game.height / 10, 'mainmenu_button', this.startCredits, this, 'over', 'out', 'down');
            creditsButton.anchor.set(0.5);
            var creditsButtonText = this.game.add.text(this.game.world.centerX, 6 * this.game.height / 10, "Credits", buttonTextStyle);
            creditsButtonText.anchor.set(0.5);
        };
        MainMenu.prototype.startCredits = function () {
            this.game.state.start("Credits", true, false);
        };
        MainMenu.prototype.startPlay = function () {
            this.game.state.start("Jeu", true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Itsis.MainMenu = MainMenu;
})(Itsis || (Itsis = {}));
/// <reference path="./ObjInOpenSpace.ts"/>
var Itsis;
(function (Itsis) {
    var OpenSpace = (function () {
        function OpenSpace() {
        }
        return OpenSpace;
    })();
    Itsis.OpenSpace = OpenSpace;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
            this.preloadBar.x = this.game.world.centerX - this.preloadBar.texture.width / 2;
            this.preloadBar.y = this.game.world.centerY - this.preloadBar.texture.height / 2;
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('mainmenu_background', 'assets/images/mainmenu_background.jpg');
            this.game.load.atlas('mainmenu_button', 'assets/buttons/mainmenu_button.png', 'assets/buttons/mainmenu_button.json');
        };
        Preloader.prototype.create = function () {
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
