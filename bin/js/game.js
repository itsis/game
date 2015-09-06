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
    var ObjInOpenSpaceTemplate = (function () {
        function ObjInOpenSpaceTemplate() {
        }
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
            ObjInOpenSpace.listOfObj.push(this);
        }
        ObjInOpenSpace.listOfObj = [];
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
    var CharacterOS = (function (_super) {
        __extends(CharacterOS, _super);
        function CharacterOS() {
            _super.call(this);
            this.desk = null;
            this.entree = null;
            this.state = State.home;
            this.startingHour = 8;
            this.endingHour = 9;
            this.enduranceMax = 100;
            this.endurance = this.enduranceMax;
            this.productivity = 100;
            this.motivation = 70;
            this.speed = 100;
            CharacterOS.listOfCharacter.push(this);
        }
        ;
        CharacterOS.prototype.findObjInOS = function (typeItem) {
            var objToReturn = null;
            for (var objOs in Itsis.ObjInOpenSpace.listOfObj) {
                if (Itsis.ObjInOpenSpace.listOfObj[objOs].typeItem == typeItem) {
                    objToReturn = Itsis.ObjInOpenSpace.listOfObj[objOs];
                }
            }
            return objToReturn;
        };
        CharacterOS.prototype.goToLocation = function (location) {
            var posx = location.sprite.isoX;
            var posy = location.sprite.isoY;
            var width = location.sprite.width / 2;
            if ((posx - width - this.sprite.isoX) > 25 || (posx - width - this.sprite.isoX) < -25) {
                if ((posx - width) > this.sprite.isoX) {
                    this.sprite.body.velocity.x = this.speed;
                    this.sprite.body.velocity.y = 0;
                    if (this.sprite.animations.name != "right") {
                        this.sprite.animations.play("right");
                    }
                }
                else {
                    this.sprite.body.velocity.x = -this.speed;
                    this.sprite.body.velocity.y = 0;
                    if (this.sprite.animations.name != "left") {
                        this.sprite.animations.play("left");
                    }
                }
            }
            else {
                if ((posy - this.sprite.isoY) > 25 || (posy - this.sprite.isoY) < -25) {
                    if (posy > this.sprite.isoY) {
                        this.sprite.body.velocity.y = this.speed;
                        this.sprite.body.velocity.x = 0;
                        if (this.sprite.animations.name != "down") {
                            this.sprite.animations.play("down");
                        }
                    }
                    else {
                        this.sprite.body.velocity.y = -this.speed;
                        this.sprite.body.velocity.x = 0;
                        if (this.sprite.animations.name != "up") {
                            this.sprite.animations.play("up");
                        }
                    }
                }
                else {
                    this.sprite.body.velocity.x = 0;
                    this.sprite.body.velocity.y = 0;
                    this.sprite.animations.stop();
                    return true;
                }
            }
            return false;
        };
        CharacterOS.prototype.goToLocation2 = function (location) {
            if (this.sprite.isoX > location.sprite.isoX) {
                this.sprite.body.velocity.y = -100;
            }
        };
        CharacterOS.prototype.updateAtHome = function (timeInOpenSpace) {
            if (timeInOpenSpace > this.startingHour && timeInOpenSpace < this.endingHour) {
                if (this.entree == null) {
                    this.entree = this.findObjInOS("entree");
                }
                if (this.entree != null) {
                    this.sprite.visible = true;
                    this.sprite.x = this.entree.sprite.isoX;
                    this.sprite.y = this.entree.sprite.isoY;
                    this.state = State.goToDesk;
                }
            }
        };
        ;
        CharacterOS.prototype.updateGoToDesk = function () {
            if (this.desk == null) {
                this.desk = this.findObjInOS("desk");
            }
            if (this.desk != null) {
                var ret = this.goToLocation(this.desk);
                if (ret)
                    this.state = State.working;
            }
        };
        CharacterOS.prototype.updateWorking = function (timeInOpenSpace) {
            if (timeInOpenSpace > this.endingHour) {
                this.state = State.goToExit;
            }
        };
        CharacterOS.prototype.updateGoToExit = function () {
            if (this.entree == null) {
                this.entree = this.findObjInOS("entree");
            }
            if (this.entree != null) {
                var ret = this.goToLocation(this.entree);
                if (ret) {
                    this.state = State.home;
                    this.sprite.visible = false;
                }
            }
        };
        CharacterOS.prototype.update = function (timeInOpenSpace) {
            switch (this.state) {
                case State.home:
                    this.updateAtHome(timeInOpenSpace);
                    break;
                case State.goToDesk:
                    this.updateGoToDesk();
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
        CharacterOS.listOfCharacter = [];
        return CharacterOS;
    })(Itsis.ObjInOpenSpace);
    Itsis.CharacterOS = CharacterOS;
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
            this.state.add("Loaderjeu", Itsis.Loaderjeu, false);
            this.state.add("Jeu", Itsis.Jeu, false);
        }
        return ItsisGame;
    })(Phaser.Game);
    Itsis.ItsisGame = ItsisGame;
})(Itsis || (Itsis = {}));
/// <reference path="../tsDefinitions/phaser.plugin.isometric.d.ts" />
var Itsis;
(function (Itsis) {
    var Jeu = (function (_super) {
        __extends(Jeu, _super);
        function Jeu() {
            _super.apply(this, arguments);
        }
        Jeu.prototype.preload = function () {
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            var isoPlugin = new Phaser.Plugin.Isometric(this.game);
            this.game.plugins.add(isoPlugin);
            this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
            this.game.iso.anchor.setTo(0.5, 0.2);
            this.game.load.image('cube', 'assets/scenery/cube.png');
            this.game.load.image('desk', 'assets/scenery/deskcomp.png');
            this.game.load.image('entree', 'assets/scenery/tile_entree.png');
            this.level1JSON = this.game.cache.getJSON('level_1');
            var floorTileName = this.level1JSON.floor.tileName;
            this.game.load.image(floorTileName, 'assets/scenery/' + floorTileName + '.png');
            this.load.spritesheet('perso', 'assets/characters/perso.png', 64, 64, 16);
        };
        Jeu.prototype.create = function () {
            this.lastTicksHour = this.game.time.time;
            this.actualDate = 7.00;
            var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false, align: "center" };
            this.text = this.game.add.text(0, 0, "hello", style);
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();
            this.persoGroup = this.game.add.group();
            this.spawnTilesFloor(this.level1JSON.floor.levelSize);
            this.spawnCube();
            var tempChar = new Itsis.CharacterOS();
            var entree = null;
            for (var it in Itsis.ObjInOpenSpace.listOfObj) {
                if (Itsis.ObjInOpenSpace.listOfObj[it].typeItem == "entree") {
                    entree = Itsis.ObjInOpenSpace.listOfObj[it];
                }
            }
            tempChar.sprite = this.game.add.isoSprite(entree.sprite.isoX, entree.sprite.isoY, 0, 'perso', 0, this.persoGroup);
            tempChar.sprite.anchor.set(0.5);
            tempChar.sprite.frame = 0;
            tempChar.sprite.animations.add("down", [0, 1, 2, 3], 10, true);
            tempChar.sprite.animations.add("left", [4, 5, 6, 7], 10, true);
            tempChar.sprite.animations.add("right", [8, 9, 10, 11], 10, true);
            tempChar.sprite.animations.add("up", [12, 13, 14, 15], 10, true);
            tempChar.sprite.visible = false;
            this.game.physics.isoArcade.enable(tempChar.sprite);
        };
        Jeu.prototype.spawnCube = function () {
            var cube = this.game.add.isoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
            cube.anchor.set(0.5);
            var tmpdesk = this.game.add.isoSprite(152, 152, 0, 'desk', 0, this.decorGroup);
            tmpdesk.anchor.set(0.5);
            var tempObjDesk = new Itsis.ObjInOpenSpace();
            tempObjDesk.sprite = tmpdesk;
            tempObjDesk.typeItem = "desk";
            var tempObjEntree = new Itsis.ObjInOpenSpace();
            tempObjEntree.sprite = this.game.add.isoSprite(494, 0, 0, "entree", 0, this.floorGroup);
            tempObjEntree.sprite.anchor.set(0.5, 0);
            tempObjEntree.typeItem = "entree";
        };
        Jeu.prototype.spawnTilesFloor = function (taille) {
            taille *= 38;
            var tileFloor;
            for (var xx = 0; xx < taille; xx += 38) {
                for (var yy = 0; yy < taille; yy += 38) {
                    tileFloor = this.game.add.isoSprite(xx, yy, 0, this.level1JSON.floor.tileName, 0, this.floorGroup);
                    tileFloor.anchor.set(0.5, 0);
                }
            }
        };
        Jeu.prototype.startMainMenu = function () {
            this.game.state.start("MainMenu", true, false);
        };
        Jeu.prototype.formatHour = function () {
            if ((this.game.time.time - this.lastTicksHour) >= 1000) {
                this.actualDate += 0.10;
                var tempHour = parseInt(this.actualDate);
                var tempMin = parseInt((this.actualDate - tempHour) * 100);
                if (tempMin >= 60) {
                    this.actualDate = tempHour + 1;
                }
                if (this.actualDate > 24) {
                    this.actualDate -= 24;
                }
                this.lastTicksHour = this.game.time.time;
                tempHour = parseInt(this.actualDate);
                tempMin = parseInt((this.actualDate - tempHour) * 100);
                this.text.setText(((tempHour > 10 ? tempHour : "0" + tempHour) + ":" + (tempMin > 10 ? tempMin : "0" + tempMin)));
            }
        };
        Jeu.prototype.render = function () {
            this.formatHour();
            for (var itChar in Itsis.CharacterOS.listOfCharacter) {
                tempChar = Itsis.CharacterOS.listOfCharacter[itChar];
                tempChar.update(this.actualDate);
            }
        };
        return Jeu;
    })(Phaser.State);
    Itsis.Jeu = Jeu;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var Loaderjeu = (function (_super) {
        __extends(Loaderjeu, _super);
        function Loaderjeu() {
            _super.apply(this, arguments);
        }
        Loaderjeu.prototype.preload = function () {
            this.game.load.json('level_1', 'assets/maps/level_1.json');
        };
        Loaderjeu.prototype.create = function () {
            this.game.state.start('Jeu', true, false);
        };
        return Loaderjeu;
    })(Phaser.State);
    Itsis.Loaderjeu = Loaderjeu;
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
            this.game.state.start("Loaderjeu", true, false);
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
