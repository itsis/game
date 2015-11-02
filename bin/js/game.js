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
            this.load.image('problem', 'assets/images/headache-32.png');
            this.game.load.json('guiobj', 'assets/gui/guiobj.json');
            this.game.load.json('missions', 'assets/missions/mission.json');
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
// /// <reference path="../tsDefinitions/astar.js" />
var Itsis;
(function (Itsis) {
    (function (State) {
        State[State["home"] = 0] = "home";
        State[State["working"] = 1] = "working";
        State[State["lunch"] = 2] = "lunch";
        State[State["breaktime"] = 3] = "breaktime";
        State[State["goToDesk"] = 4] = "goToDesk";
        State[State["goToExit"] = 5] = "goToExit";
        State[State["problem"] = 6] = "problem";
    })(Itsis.State || (Itsis.State = {}));
    var State = Itsis.State;
    ;
    var LocationToGo = (function () {
        function LocationToGo() {
        }
        return LocationToGo;
    })();
    var CharacterOS = (function () {
        function CharacterOS(name, game, isoPlugin, group) {
            // super();
            this.desk = null;
            this.entree = null;
            this.path = null;
            this.lastUpdate = 0;
            this.id = 0;
            for (var _i = 0, _a = CharacterOS.charJSON.characters; _i < _a.length; _i++) {
                var ch = _a[_i];
                if (ch.name == name) {
                    this.name = name;
                    this.startingHour = ch.startinghour;
                    this.endingHour = ch.endinghour;
                    this.enduranceMax = ch.endurance;
                    this.endurance = this.enduranceMax;
                    this.productivity = ch.productivity;
                    this.motivation = ch.motivation;
                    this.entree = this.findObjInOS("entree");
                    this.sprite = isoPlugin.addIsoSprite(this.entree.sprite.isoX, this.entree.sprite.isoY, 0, name, 0, group);
                    this.problemSprite = game.add.sprite(0, -38, "problem");
                    this.problemSprite.visible = false;
                    this.sprite.addChild(this.problemSprite);
                    this.arcade = new Phaser.Plugin.Isometric.Arcade(game);
                    this.arcade.setBoundsToWorld();
                    this.arcade.enable(this.sprite);
                    this.sprite.anchor.set(0.5);
                    this.sprite.frame = 0;
                    var itAnim = 0;
                    var tab = [ch.animationstep];
                    for (var i = 0; i < ch.animationstep; i++) {
                        tab[i] = itAnim;
                        itAnim += 1;
                    }
                    this.sprite.animations.add("down", tab, 10, true);
                    for (var i = 0; i < ch.animationstep; i++) {
                        tab[i] = itAnim;
                        itAnim += 1;
                    }
                    this.sprite.animations.add("left", tab, 10, true);
                    for (var i = 0; i < ch.animationstep; i++) {
                        tab[i] = itAnim;
                        itAnim += 1;
                    }
                    this.sprite.animations.add("right", tab, 10, true);
                    for (var i = 0; i < ch.animationstep; i++) {
                        tab[i] = itAnim;
                        itAnim += 1;
                    }
                    this.sprite.animations.add("up", tab, 10, true);
                    this.sprite.visible = false;
                }
            }
            this.state = State.home;
            this.speed = 200;
            this.locationToGo = null;
            // console
            CharacterOS.listOfCharacter.push(this);
            this.id = CharacterOS.listOfCharacter.length;
        }
        CharacterOS.prototype.setSprite = function (sprite) {
            this.sprite = sprite;
            this.sprite.anchor.set(0.5);
            this.sprite.frame = 0;
            this.sprite.animations.add("down", [0, 1, 2, 3], 10, true);
            this.sprite.animations.add("left", [4, 5, 6, 7], 10, true);
            this.sprite.animations.add("right", [8, 9, 10, 11], 10, true);
            this.sprite.animations.add("up", [12, 13, 14, 15], 10, true);
            this.sprite.visible = false;
        };
        CharacterOS.prototype.findListObjInOs = function (typeItem) {
            var objToReturn = [];
            for (var objOs in Itsis.ObjInOpenSpace.listOfObj) {
                if (Itsis.ObjInOpenSpace.listOfObj[objOs].typeItem == typeItem) {
                    objToReturn.push(Itsis.ObjInOpenSpace.listOfObj[objOs]);
                }
            }
            return objToReturn;
        };
        CharacterOS.prototype.findObjInOS = function (typeItem) {
            var objToReturn = null;
            for (var objOs in Itsis.ObjInOpenSpace.listOfObj) {
                if (Itsis.ObjInOpenSpace.listOfObj[objOs].typeItem == typeItem) {
                    objToReturn = Itsis.ObjInOpenSpace.listOfObj[objOs];
                }
            }
            return objToReturn;
        };
        CharacterOS.prototype.moveOnPath = function () {
            if (this.path.length > 0) {
                var posx = this.path[0].x * 38;
                var posy = this.path[0].y * 38;
                // let width=this.locationToGo.width/2;
                var width = 16;
                var endX = 0;
                var endY = 0;
                if (posx < this.sprite.isoX + width) {
                    if ((posx - this.sprite.isoX - width) < -20) {
                        this.sprite.body.velocity.x = -this.speed;
                        this.sprite.body.velocity.y = 0;
                        if (this.sprite.animations.name != "left") {
                            this.sprite.animations.play("left");
                        }
                    }
                    else {
                        endX = 1;
                    }
                }
                else {
                    if (posx - this.sprite.isoX + width > 20) {
                        this.sprite.body.velocity.x = this.speed;
                        this.sprite.body.velocity.y = 0;
                        if (this.sprite.animations.name != "right") {
                            this.sprite.animations.play("right");
                        }
                    }
                    else {
                        endX = 1;
                    }
                }
                if (endX == 1) {
                    if (posy < this.sprite.isoY + width) {
                        if ((posy - this.sprite.isoY - width) < -20) {
                            this.sprite.body.velocity.y = -this.speed;
                            this.sprite.body.velocity.x = 0;
                            if (this.sprite.animations.name != "up") {
                                this.sprite.animations.play("up");
                            }
                        }
                        else {
                            endY = 1;
                        }
                    }
                    else {
                        if (posy - this.sprite.isoY + width > 20) {
                            this.sprite.body.velocity.y = this.speed;
                            this.sprite.body.velocity.x = 0;
                            if (this.sprite.animations.name != "down") {
                                this.sprite.animations.play("down");
                            }
                        }
                        else {
                            endY = 1;
                        }
                    }
                    if (endY == 1) {
                        this.path.shift();
                        if (this.path.length == 0) {
                            this.sprite.body.velocity.x = 0;
                            this.sprite.body.velocity.y = 0;
                            switch (this.locationToGo.orientation) {
                                case "w":
                                    this.sprite.animations.play("right");
                                    break;
                                case "e":
                                    this.sprite.animations.play("left");
                                    break;
                                case "n":
                                    this.sprite.animations.play("right");
                                    break;
                                case "s":
                                    this.sprite.animations.play("left");
                                    break;
                            }
                            this.sprite.animations.stop();
                        }
                    }
                }
            }
        };
        CharacterOS.prototype.updateAtHome = function (timeInOpenSpace) {
            // let entree = null;
            if (timeInOpenSpace > this.startingHour && timeInOpenSpace < this.endingHour) {
                if (this.entree == null) {
                    this.entree = this.findObjInOS("entree");
                }
                if (this.entree != null) {
                    this.sprite.visible = true;
                    this.sprite.x = this.entree.sprite.isoX;
                    this.sprite.y = this.entree.sprite.isoY;
                    // console.log(this.sprite);
                    this.state = State.goToDesk;
                }
            }
        };
        ;
        CharacterOS.prototype.createPath = function (ObjGoTo, openSpace) {
            if (ObjGoTo != null) {
                if (this.locationToGo == null) {
                    this.locationToGo = new LocationToGo();
                    this.locationToGo.x = ObjGoTo.sprite.isoX;
                    this.locationToGo.y = ObjGoTo.sprite.isoY;
                    this.locationToGo.width = ObjGoTo.sprite.width;
                    this.locationToGo.orientation = ObjGoTo.orientation;
                }
            }
            if (this.path == null) {
                var graph = new Graph(openSpace);
                var isoX = Math.round(this.sprite.isoX / 38);
                var isoY = Math.round(this.sprite.isoY / 38);
                var destX = Math.round(this.locationToGo.x / 38);
                var destY = Math.round(this.locationToGo.y / 38);
                var step = 1 + Math.round(this.locationToGo.width / 2) / 38;
                switch (this.locationToGo.orientation) {
                    case "s":
                        destX += 1;
                        break;
                    case "w":
                        destY += 1;
                        break;
                    case "n":
                        destX -= 1;
                        break;
                    case "e":
                        destY -= 1;
                        break;
                }
                var start = graph.grid[isoX][isoY];
                var end = graph.grid[destX][destY];
                this.path = astar.search(graph, start, end);
            }
        };
        CharacterOS.prototype.updateGoToDesk = function (openSpace) {
            if (this.desk == null) {
                var listOfDesk = this.findListObjInOs("desk");
                for (var _i = 0; _i < listOfDesk.length; _i++) {
                    var itDesk = listOfDesk[_i];
                    if (itDesk.owner == null) {
                        this.desk = itDesk;
                        this.desk.owner = this;
                        break;
                    }
                }
            }
            if (this.desk != null) {
                this.createPath(this.desk, openSpace);
                if (this.path != null) {
                    this.moveOnPath();
                    if (this.path.length == 0) {
                        this.state = State.working;
                        this.path = null;
                        this.locationToGo = null;
                    }
                }
            }
        };
        //At end
        CharacterOS.prototype.updateWorking = function (timeInOpenSpace, ticks) {
            if (timeInOpenSpace > this.endingHour) {
                this.state = State.goToExit;
            }
            else {
                if (this.lastUpdate > 0) {
                    var dt = ticks - this.lastUpdate;
                    if (dt > 0.1) {
                        var val = Math.random();
                        if (val > 0.8) {
                            this.state = State.problem;
                            this.problemSprite.visible = true;
                        }
                        else {
                            Itsis.Mission.instance.currentProductivityProgression += Math.round(this.productivity * dt);
                        }
                        this.lastUpdate = ticks;
                    }
                }
                else {
                    this.lastUpdate = ticks;
                }
            }
            // TODO : gestion des temps de pause
            // TODO : gestion du lunch time
        };
        CharacterOS.prototype.updateProblem = function (timeInOpenSpace, ticks) {
            if (timeInOpenSpace > this.endingHour) {
                this.state = State.goToExit;
            }
            else {
                var dt = ticks - this.lastUpdate;
                if (dt > 0.1) {
                    var val = Math.random();
                    if (val > 0.5) {
                        this.problemSprite.visible = false;
                        this.state = State.working;
                    }
                    this.lastUpdate = ticks;
                }
            }
        };
        CharacterOS.prototype.updateGoToExit = function (openSpace) {
            this.problemSprite.visible = false;
            if (this.entree == null) {
                this.entree = this.findObjInOS("entree");
            }
            if (this.entree != null) {
                this.createPath(this.entree, openSpace);
                if (this.path != null) {
                    this.moveOnPath();
                    if (this.path.length == 0) {
                        this.state = State.home;
                        this.path = null;
                        this.locationToGo = null;
                        this.sprite.visible = false;
                    }
                }
            }
        };
        CharacterOS.prototype.update = function (timeInOpenSpace, openSpace, ticks) {
            switch (this.state) {
                case State.home:
                    this.updateAtHome(timeInOpenSpace);
                    break;
                case State.goToDesk:
                    this.updateGoToDesk(openSpace);
                    break;
                case State.working:
                    this.updateWorking(timeInOpenSpace, ticks);
                    break;
                case State.goToExit:
                    this.updateGoToExit(openSpace);
                    break;
                case State.problem:
                    this.updateProblem(timeInOpenSpace, ticks);
                default:
                    break;
            }
        };
        ;
        CharacterOS.listOfCharacter = [];
        CharacterOS.charJSON = null;
        return CharacterOS;
    })();
    Itsis.CharacterOS = CharacterOS;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var ChooseMission = (function (_super) {
        __extends(ChooseMission, _super);
        function ChooseMission() {
            _super.apply(this, arguments);
        }
        ChooseMission.prototype.create = function () {
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;
            this.add.tween(background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //Title
            var itsisTextStyle = {
                font: "bold 72px Arial",
                fill: "#00f",
                align: "center"
            };
            var itsisText = this.game.add.text(this.game.world.centerX, this.game.height / 10, "Choose your mission", itsisTextStyle);
            itsisText.anchor.set(0.5);
            //Buttons
            var buttonTextStyle = {
                font: "32px Arial",
                fill: "#f00"
            };
            var playButton = this.game.add.button(this.game.world.centerX, 5 * this.game.height / 10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            playButton.anchor.set(0.5);
            var playButtonText = this.game.add.text(this.game.world.centerX, 5 * this.game.height / 10, "Mission 1", buttonTextStyle);
            playButtonText.anchor.set(0.5);
        };
        ChooseMission.prototype.startPlay = function () {
            if (Itsis.Mission.instance) {
                Itsis.Mission.instance.reset();
            }
            Itsis.Mission.chooseMission(1);
            this.game.state.start("Loaderjeu", true, false);
        };
        return ChooseMission;
    })(Phaser.State);
    Itsis.ChooseMission = ChooseMission;
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
    var EndMission = (function (_super) {
        __extends(EndMission, _super);
        function EndMission() {
            _super.apply(this, arguments);
        }
        EndMission.prototype.create = function () {
            var background = this.add.sprite(0, 0, 'mainmenu_background');
            background.alpha = 0;
            this.add.tween(background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //Title
            var itsisTextStyle = {
                font: "bold 72px Arial",
                fill: "#00f",
                align: "center"
            };
            var itsisText = this.game.add.text(this.game.world.centerX, this.game.height / 10, "Mission is Over", itsisTextStyle);
            itsisText.anchor.set(0.5);
            //Buttons
            var buttonTextStyle = {
                font: "32px Arial",
                fill: "#f00"
            };
            var playButton = this.game.add.button(this.game.world.centerX, 5 * this.game.height / 10, 'mainmenu_button', this.startPlay, this, 'over', 'out', 'down');
            playButton.anchor.set(0.5);
            var label = "";
            if (Itsis.Mission.instance.status == Itsis.MissionStatus.success) {
                label = "You win";
            }
            else {
                label = "you loose";
            }
            var playButtonText = this.game.add.text(this.game.world.centerX, 5 * this.game.height / 10, label, buttonTextStyle);
            playButtonText.anchor.set(0.5);
        };
        EndMission.prototype.startPlay = function () {
            Itsis.Mission.chooseMission(1);
            this.game.state.start("ChooseMission", true, false);
        };
        return EndMission;
    })(Phaser.State);
    Itsis.EndMission = EndMission;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    var ItsisGame = (function (_super) {
        __extends(ItsisGame, _super);
        function ItsisGame() {
            _super.call(this, 1600, 900, Phaser.AUTO, 'content', null);
            // Main Menu
            this.state.add('Boot', Itsis.Boot, true);
            this.state.add('Preloader', Itsis.Preloader, false);
            this.state.add('MainMenu', Itsis.MainMenu, false);
            this.state.add('ChooseMission', Itsis.ChooseMission, false);
            this.state.add("Credits", Itsis.Credits, false);
            this.state.add("EndMission", Itsis.EndMission, false);
            // Actual game
            this.state.add("Loaderjeu", Itsis.Loaderjeu, false);
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
            this.ticks = 0;
            this.nbDay = 1;
            this.listOfTiles = [];
        }
        Jeu.prototype.preload = function () {
            // Add and enable the plug-in.
            this.isoPlugin = new Phaser.Plugin.Isometric(this.game);
            this.game.plugins.add(this.isoPlugin);
            this.isoPlugin.projector.anchor.setTo(0.5, 0.2);
            // tihs.guiContainer= new Object[10];
            this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
            // Load assets & level data
            this.levelJSON = this.game.cache.getJSON('level');
            this.charJSON = this.game.cache.getJSON('characters');
            this.sceneryJSON = this.game.cache.getJSON('scenery');
            // Load level images
            // Load floor
            this.game.load.image('floor', 'assets/scenery/' + this.levelJSON.openSpace.floor);
            this.game.load.image('entree', 'assets/scenery/tile_entree.png');
            // Load assets
            // Retrieve image and image type
            for (var _i = 0, _a = this.charJSON.characters; _i < _a.length; _i++) {
                var ch = _a[_i];
                this.load.spritesheet(ch.name, ch.sprite, ch.sizex, ch.sizey, ch.nbanim);
            }
            Itsis.CharacterOS.charJSON = this.charJSON;
            for (var _b = 0, _c = this.levelJSON.openSpace.objInOpenSpace; _b < _c.length; _b++) {
                var obj = _c[_b];
                var idObj = obj.id;
                for (var scen in this.sceneryJSON) {
                    if (scen.toString() == idObj) {
                        var sceneryInfo = this.sceneryJSON[scen][0];
                        var urlObj = 'assets/scenery/' + sceneryInfo.url;
                        // Load image according to image typpe
                        if (sceneryInfo.spritetype == "spritesheet") {
                            // Case Spritesheet
                            this.game.load.spritesheet(idObj, urlObj, sceneryInfo.width, sceneryInfo.height);
                        }
                        else {
                            // Case single image
                            this.game.load.image(idObj, urlObj);
                        }
                    }
                }
            }
        };
        Jeu.prototype.create = function () {
            EZGUI.tilingRenderer = this.game.renderer;
            //   var guiObj = this.game.cache.getJSON('guiobj')guiObj ;
            //
            var persoGuiJSON = this.game.cache.getJSON('persogui');
            var listOfGui = new Array(10);
            EZGUI.Theme.load(['./assets/gui/kenney-theme/kenney-theme.json'], function () {
                var guiContainer = EZGUI.create(persoGuiJSON, 'kenney');
                guiContainer.visible = false;
                listOfGui[0] = guiContainer;
                EZGUI.components.btn1.on('click', function (event, me) {
                    guiContainer.visible = false;
                });
                EZGUI.components.btn2.on('click', function (event, me) {
                    for (var _i = 0, _a = Itsis.CharacterOS.listOfCharacter; _i < _a.length; _i++) {
                        var tempChar_1 = _a[_i];
                        if (tempChar_1.name == EZGUI.components.nameperso.text) {
                            tempChar_1.productivity -= 10;
                            EZGUI.components.productivity.text = tempChar_1.productivity;
                        }
                    }
                });
            });
            var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false, align: "center" };
            this.text = this.game.add.text(0, 0, "hello", style);
            this.but = this.game.add.text(200, 0, "hello", style);
            this.lastTicksHour = this.game.time.time;
            this.actualDate = 7.00;
            // Create groups for assets
            this.floorGroup = this.game.add.group();
            this.decorGroup = this.game.add.group();
            // Floor building
            this.spawnTilesFloor(this.levelJSON.openSpace.sizex, this.levelJSON.openSpace.sizey);
            // Sprite in openspace
            // Creation
            for (var _i = 0, _a = this.levelJSON.openSpace.objInOpenSpace; _i < _a.length; _i++) {
                var obj = _a[_i];
                var idObj = obj.id;
                for (var scen in this.sceneryJSON) {
                    if (scen.toString() == idObj) {
                        var newObj = new Itsis.ObjInOpenSpace();
                        var objScenery = this.sceneryJSON[scen][0];
                        newObj.typeItem = objScenery.type;
                        newObj.id = idObj;
                        newObj.locationX = obj.posx * 38;
                        newObj.locationY = obj.posy * 38;
                        newObj.spriteType = objScenery.spritetype;
                        newObj.orientation = objScenery.orientation;
                        if (newObj.spriteType == "spritesheet") {
                            newObj.frame = objScenery.frame;
                        }
                        else {
                            newObj.frame = 0;
                        }
                    }
                }
            }
            function dragStop(sprite, pointer) {
                var cursorPos = new Phaser.Plugin.Isometric.Point3();
                this.isoPlugin.projector.unproject(this.game.input.activePointer.position, cursorPos);
                this.listOfTiles.forEach(function (tile) {
                    var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
                    if (inBounds) {
                        sprite.isoX = tile.isoX;
                        sprite.isoY = tile.isoY;
                    }
                });
                for (var _i = 0, _a = Itsis.CharacterOS.listOfCharacter; _i < _a.length; _i++) {
                    var ch = _a[_i];
                    if (ch.desk != null && ch.desk.sprite == sprite) {
                        ch.state = Itsis.State.goToDesk;
                    }
                }
            }
            // Drawing
            for (var _b = 0, _c = Itsis.ObjInOpenSpace.listOfObj; _b < _c.length; _b++) {
                var objToOpenspace = _c[_b];
                objToOpenspace.sprite = this.isoPlugin.addIsoSprite(objToOpenspace.locationX, objToOpenspace.locationY, 0, objToOpenspace.id, objToOpenspace.frame, this.decorGroup);
                objToOpenspace.sprite.anchor.set(0.5);
                objToOpenspace.sprite.inputEnabled = true;
                objToOpenspace.sprite.input.enableDrag();
                //objToOpenspace.sprite.events.onDragStart.add(dragStrat, this);
                objToOpenspace.sprite.events.onDragStop.add(dragStop, this);
            }
            var tempObjEntree = new Itsis.ObjInOpenSpace();
            tempObjEntree.sprite = this.isoPlugin.addIsoSprite(494, 0, 0, "entree", 0, this.floorGroup);
            tempObjEntree.sprite.anchor.set(0.5, 0.2);
            tempObjEntree.typeItem = "entree";
            function onDown(event, tempChar) {
                listOfGui[0].visible = true;
                EZGUI.components.nameperso.text = this.char.name;
                EZGUI.components.productivity.text = this.char.productivity;
            }
            ;
            var tempChar = new Itsis.CharacterOS("rose", this.game, this.isoPlugin, this.decorGroup);
            tempChar.group = this.game.add.group();
            tempChar.sprite.inputEnabled = true;
            tempChar.sprite.events.onInputDown.add(onDown, { "char": tempChar });
            var tempChar2 = new Itsis.CharacterOS("persofille", this.game, this.isoPlugin, this.decorGroup);
            tempChar2.group = this.game.add.group();
            tempChar2.sprite.inputEnabled = true;
            tempChar2.sprite.events.onInputDown.add(onDown, { "char": tempChar });
            this.mapOpenSpace = [this.levelJSON.openSpace.sizex];
            for (var x = 0; x < this.levelJSON.openSpace.sizex; x++) {
                this.mapOpenSpace[x] = [this.levelJSON.openSpace.sizey];
            }
            for (var x = 0; x < this.levelJSON.openSpace.sizex; x++) {
                for (var y = 0; y < this.levelJSON.openSpace.sizey; y++) {
                    this.mapOpenSpace[x][y] = 1;
                }
            }
            // Construction de la map de l'openspace servant plus tard dans les astar (pathfinding) des CharacterOS
            // centralisé ici pour l'instant
            for (var _d = 0, _e = Itsis.ObjInOpenSpace.listOfObj; _d < _e.length; _d++) {
                var it = _e[_d];
                var isoX = it.sprite.isoX / 38;
                var isoY = it.sprite.isoY / 38;
                if (it.typeItem != "entree") {
                    if (it.sprite.width > 38) {
                        switch (it.orientation) {
                            case "w":
                                this.mapOpenSpace[isoX - 1][isoY] = 0;
                                break;
                            case "e":
                                this.mapOpenSpace[isoX + 1][isoY] = 0;
                                break;
                            case "s":
                                this.mapOpenSpace[isoX][isoY - 1] = 0;
                                break;
                            case "n":
                                this.mapOpenSpace[isoX][isoY + 1] = 0;
                                break;
                        }
                    }
                    this.mapOpenSpace[isoX][isoY] = 0;
                }
            }
            // console.log(this.mapOpenSpace);
        };
        Jeu.prototype.spawnCube = function () {
            var cube = this.isoPlugin.addIsoSprite(38, 38, 0, 'cube', 0, this.cubeGroup);
            cube.anchor.set(0.5);
        };
        Jeu.prototype.spawnTilesFloor = function (sizeX, sizeY) {
            sizeX *= 38;
            sizeY *= 38;
            var tileFloor;
            for (var xx = 0; xx < sizeX; xx += 38) {
                for (var yy = 0; yy < sizeY; yy += 38) {
                    tileFloor = this.isoPlugin.addIsoSprite(xx, yy, 0, 'floor', 0, this.floorGroup);
                    tileFloor.anchor.set(0.5, 0);
                    this.listOfTiles.push(tileFloor);
                }
            }
        };
        Jeu.prototype.formatHour = function () {
            if ((this.game.time.time - this.lastTicksHour) >= 1000) {
                this.ticks += 0.10;
                this.lastTicksHour = this.game.time.time;
                this.actualDate += 0.10;
                var tempHour = Math.floor(this.actualDate);
                var tempMin = Math.round((this.actualDate - tempHour) * 100);
                if (tempMin >= 60) {
                    this.actualDate = tempHour + 1;
                    if (this.actualDate >= 24) {
                        this.actualDate -= 24;
                        this.nbDay += 1;
                    }
                }
                tempHour = Math.round(this.actualDate);
                tempMin = Math.round((this.actualDate - tempHour) * 100);
                this.text.setText(((tempHour >= 10 ? tempHour : "0" + tempHour) + ":" + (tempMin >= 10 ? tempMin : "0" + tempMin)));
            }
        };
        Jeu.prototype.startMainMenu = function () {
            this.game.state.start("MainMenu", true, false);
        };
        Jeu.prototype.render = function () {
            this.formatHour();
            // console.log(CharacterOS.listOfCharacter);
            for (var _i = 0, _a = Itsis.CharacterOS.listOfCharacter; _i < _a.length; _i++) {
                var itChar = _a[_i];
                itChar.update(this.actualDate, this.mapOpenSpace, this.ticks);
            }
            this.but.setText(Itsis.Mission.instance.currentProductivityProgression + " Produits / " + Itsis.Mission.instance.aproduire + " a faire");
            if (this.nbDay < Itsis.Mission.instance.timeTarget || Itsis.Mission.instance.timeTarget == -1) {
                if (Itsis.Mission.instance.currentProductivityProgression >= Itsis.Mission.instance.aproduire) {
                    Itsis.Mission.instance.state = Itsis.MissionStatus.success;
                    this.game.state.start("EndMission", true, false);
                }
            }
            else {
                Itsis.Mission.instance.state = Itsis.MissionStatus.failed;
                this.game.state.start("EndMission", true, false);
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
            //Json scenery declaration
            this.game.load.json('scenery', 'assets/scenery/scenery.json');
            this.game.load.json('characters', 'assets/characters/characters.json');
            this.game.load.json('persogui', 'assets/gui/perso.json');
            // this.game.load.json('wingui', 'assets/gui/winpopup.json');
            //Json level data
            this.game.load.json('level', 'assets/maps/level_1.json');
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
        MainMenu.prototype.preload = function () {
            var missionJSON = this.game.cache.getJSON('missions');
            Itsis.Mission.missionJSON = missionJSON;
            for (var _i = 0, _a = missionJSON.missions; _i < _a.length; _i++) {
                var m = _a[_i];
                new Itsis.Mission(m.id);
            }
        };
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
            //   EZGUI.renderer = this.game.renderer;
            //   var guiObj = this.game.cache.getJSON('guiobj')guiObj ;
            //
            //  EZGUI.Theme.load(['./assets/gui/kenney-theme/kenney-theme.json'], function () {
            //
            //      var guiContainer = EZGUI.create(guiObj , 'kenney');
            //
            //      EZGUI.components.btn1.on('click', function (event) {
            //              console.log('clicked', event);
            //          });
            //
            //  });
        };
        MainMenu.prototype.startCredits = function () {
            this.game.state.start("Credits", true, false);
        };
        MainMenu.prototype.startPlay = function () {
            // this.game.state.start("Loaderjeu", true, false);
            this.game.state.start("ChooseMission", true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Itsis.MainMenu = MainMenu;
})(Itsis || (Itsis = {}));
var Itsis;
(function (Itsis) {
    (function (MissionStatus) {
        MissionStatus[MissionStatus["notStarted"] = 0] = "notStarted";
        MissionStatus[MissionStatus["inProgres"] = 1] = "inProgres";
        MissionStatus[MissionStatus["failed"] = 2] = "failed";
        MissionStatus[MissionStatus["success"] = 3] = "success";
    })(Itsis.MissionStatus || (Itsis.MissionStatus = {}));
    var MissionStatus = Itsis.MissionStatus;
    ;
    var Mission = (function () {
        function Mission(id) {
            this.currentProductivityProgression = 0;
            for (var _i = 0, _a = Mission.missionJSON.missions; _i < _a.length; _i++) {
                var mi = _a[_i];
                if (mi.id == id) {
                    this.id = mi.id;
                    this.name = mi.name;
                    this.aproduire = mi.aproduire;
                    this.timeTarget = mi.time;
                }
            }
            Mission.listOfMission.push(this);
        }
        Mission.prototype.reset = function () {
            this.currentProductivityProgression = 0;
            this.status = MissionStatus.notStarted;
            Mission.instance = null;
        };
        Mission.chooseMission = function (id) {
            for (var _i = 0, _a = Mission.listOfMission; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.id == id) {
                    Mission.instance = m;
                }
            }
        };
        Mission.missionJSON = null;
        Mission.instance = null;
        Mission.listOfMission = [];
        return Mission;
    })();
    Itsis.Mission = Mission;
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
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
            this.preloadBar.x = this.game.world.centerX - this.preloadBar.texture.width / 2;
            this.preloadBar.y = this.game.world.centerY - this.preloadBar.texture.height / 2;
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our assets
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
