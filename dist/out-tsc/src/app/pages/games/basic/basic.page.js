import * as tslib_1 from "tslib";
import { Component, ElementRef } from "@angular/core";
import { ThemeService } from "../../../services/theme.service";
import { NavController, Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { AuthService } from "../../../services/auth.service";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";
import { DatabaseService } from "../../../services/database.service";
import { AlertService } from "src/app/services/alert.service";
import { TwirlAndTipService } from "../../../services/twirl-and-tip.service";
import { LoadingService } from "../../../services/loading.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { Validators, FormBuilder } from '@angular/forms';
var themes = {
    spring: {
        primary: "#F78154",
        secondary: "#4D9078",
        tertiary: "#B4436C",
        light: "#FDE8DF",
        medium: "#FCD0A2",
        dark: "#B89876"
    },
    summer: {
        primary: "#8CBA80",
        secondary: "#FCFF6C",
        tertiary: "#FE5F55",
        medium: "#BCC2C7",
        dark: "#F7F7FF",
        light: "#495867"
    },
    autumn: {
        primary: "#39BFBD",
        secondary: "#4CE0B3",
        tertiary: "#FF5E79",
        light: "#F4EDF2",
        medium: "#B682A5",
        dark: "#34162A"
    },
    winter: {
        primary: "#a1bf06",
        secondary: "#a8bde0",
        tertiary: "#a346ff",
        light: "#F4EDF2",
        medium: "#B682A5",
        dark: "#34162A"
    }
};
var BasicPage = /** @class */ (function () {
    function BasicPage(twirlAndTipService, authService, navCtrl, storage, theme, platform, splashScreen, statusBar, database, element, alertCtrl, alertService, loading, route, formBuilder, router) {
        var _this = this;
        this.twirlAndTipService = twirlAndTipService;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.theme = theme;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.database = database;
        this.element = element;
        this.alertCtrl = alertCtrl;
        this.alertService = alertService;
        this.loading = loading;
        this.route = route;
        this.formBuilder = formBuilder;
        this.router = router;
        this.textarea = "../../../assets/imgs/gameplay/transparent_button.png";
        this.isActiveText = false;
        this.messageMinMaxLetter = '';
        this.messageWordRequired = '';
        this.messageLetterRequired = '';
        this.messageMinMaxWords = '';
        this.totalGameLevelScores = 0;
        this.disableBtn = 1;
        this.gameTheme = null;
        this.characters = "abcdefghijklmnopqrstuvwxyz";
        this.iconSetting = "md-settings";
        this.iconCoins = "logo-usd";
        this.iconTwirlAndTip = "md-disc";
        this.twirlAndTipValue = 0;
        this.off = false;
        this.dot = false;
        this.openMenu = false;
        this.openKeyboard = false;
        this.endGame = false;
        this.continuousGame = false;
        this.notHintString = "";
        this.saveGameData = {
            savedGame: false,
            gameLevel: 1,
            gameType: "",
            score: 0,
            firstLastLetter: "",
            numGameWord: 0,
            numGameLetter: 0,
            wordGridResult: [[]],
            finalLetterOfRow: "",
            focusI: 0,
            focusJ: 0,
            hintString: "",
            gameTheme: "",
            wordLibArr: [],
            scoreLibArr: [],
            wordResult: "",
            wordRowResult: [],
            timeAt: ""
        };
        this.notHint = "";
        this.wordLibLastRowArr = [];
        this.numGameWord = 3;
        this.numGameLetter = 3;
        this.firstLastLetter = "";
        this.wordGridResult = [[]];
        this.wordRowResult = [];
        this.letterSelected = "";
        this.focusI = 0;
        this.focusJ = 1;
        this.score = 0;
        this.hintString = "";
        this.isHintUse = false;
        this.hintArr = [];
        this.keyObj = {
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            f: false,
            g: false,
            h: false,
            i: false,
            j: false,
            k: false,
            l: false,
            m: false,
            n: false,
            o: false,
            p: false,
            q: false,
            r: false,
            s: false,
            t: false,
            u: false,
            v: false,
            w: false,
            x: false,
            y: false,
            z: false
        };
        this.getHeightWidth = function () {
            var glutterHorizontal = 5 * (_this.numGameLetter - 1);
            var glutterVertical = 5 * (_this.numGameWord - 1);
            _this.wrapperBoxWidth = $(window).width() - 100;
            _this.wrapperItemHeight = _this.deviceHeight - 330;
            _this.wiBoxWidth =
                (_this.wrapperBoxWidth - glutterHorizontal) / _this.numGameLetter;
            _this.wiBoxHeight =
                (_this.wrapperItemHeight - glutterVertical) / _this.numGameWord;
            console.log(_this.deviceHeight);
        };
        this.inputNumber = this.formBuilder.group({
            numberWord: ["Number of words can't be blank.", [Validators.max(8), Validators.min(3), Validators.required]],
            numberLetter: ['', [Validators.max(8), Validators.min(3), Validators.required]],
        });
        this.initializeApp();
    }
    BasicPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.deviceHeight = this.platform.height();
        this.authService.getUser().subscribe(function (data) {
            _this.user = data;
            _this.twirlAndTipValue = _this.user.twirl_tip;
            var modalContent = "<div id=\"myModal\" class=\"at-modal\">\n                <!-- Modal content -->\n                <div class=\"at-modal-content\">\n                  \n                  <h2 style=\"margin-top: 21px;\">YOUR COINS</h2>\n                  \n                  <p class=\"your-coin\">" + _this.twirlAndTipValue + "</p>\n                  <ion-img class=\"p-coin\" src=\"../../../assets/imgs/pop-up/p-coin.png\" ></ion-img>\n                  <br/>\n                  <br/><br/>\n                  <div>\n                      <button id=\"goToBuy\" class=\"bt-buy\">BUY COINS</button>\n                  </div>\n                 \n                </div>\n              </div>";
            $('body').after(modalContent);
        }, function (error) { }, function () { });
        //get game_level
        this.route.queryParams.subscribe(function (params) {
            if (params && params.data) {
                _this.gameLevel = JSON.parse(params.data).gameLevel;
                _this.gameType = JSON.parse(params.data).gameType;
                _this.continuousGame = JSON.parse(params.data).continueGame;
                if (_this.continuousGame === true) {
                    _this.storage.get("save_game").then(function (data) {
                        _this.saveGameData = data;
                        _this.numGameWord = _this.saveGameData.numGameWord;
                        _this.numGameLetter = _this.saveGameData.numGameLetter;
                        _this.firstLastLetter = _this.saveGameData.firstLastLetter.toUpperCase();
                        if (_this.saveGameData.finalLetterOfRow)
                            _this.finalLetterOfRow = _this.saveGameData.finalLetterOfRow.toUpperCase();
                        if (_this.saveGameData.wordGridResult)
                            _this.wordGridResult = _this.saveGameData.wordGridResult;
                        if (_this.saveGameData.wordLibArr)
                            _this.wordLibArr = _this.saveGameData.wordLibArr;
                        if (_this.saveGameData.scoreLibArr)
                            _this.scoreLibArr = _this.saveGameData.scoreLibArr;
                        if (_this.saveGameData.focusI)
                            _this.focusI = _this.saveGameData.focusI;
                        if (_this.saveGameData.focusJ)
                            _this.focusJ = _this.saveGameData.focusJ;
                        if (_this.saveGameData.wordResult)
                            _this.wordResult = _this.saveGameData.wordResult;
                        if (_this.saveGameData.wordRowResult)
                            _this.wordRowResult = _this.saveGameData.wordRowResult;
                        if (_this.saveGameData.hintString)
                            _this.hintString = _this.saveGameData.hintString;
                        _this.toogleOpenKeyboard();
                        _this.playWithTheme(_this.saveGameData.gameTheme);
                        _this.getHeightWidth();
                        var checkWiBoxDidMount = setInterval(function () {
                            var innerbox = $('.wi-box').filter(function (i, e) {
                                return i != 0 && i != $('.wi-box').length - 1;
                            }).filter(function (i, e) {
                                return $(e).find('label').text() != '';
                            });
                            if (innerbox.length) {
                                innerbox.each(function (i, e) {
                                    $(e).find('label').closest('div').addClass('selected-letter');
                                });
                                clearInterval(checkWiBoxDidMount);
                            }
                        }, 100);
                    });
                }
                //get total score of user
                _this.database.getScores().subscribe(function (data) {
                    for (var x in data) {
                        if (data[x].game_level === _this.gameLevel) {
                            _this.totalGameLevelScores += data[x].score;
                        }
                    }
                });
                //get limit_scores from storage
                _this.storage.get("limit_scores").then(function (data) {
                    _this.limitScoresArr = data;
                    for (var x in data) {
                        if (data[x].game_level === _this.gameLevel) {
                            console.log(data[x]);
                            _this.limitScoreToUnlockNewGame = data[x].score_to_unlock;
                        }
                    }
                });
            }
        }, function () { }, function () { });
    };
    BasicPage.prototype.ionViewDidEnter = function () {
        //Set saved data to table game
        if (this.continuousGame === true) {
            for (var i = 0; i < this.numGameWord; i++) {
                for (var j = 0; j < this.numGameLetter; j++) {
                    var label = this.element.nativeElement.querySelector('[id="c' + i + j + '"]');
                    label.innerHTML = this.wordGridResult[i][j];
                }
            }
            this.continuousGame = false;
        }
    };
    BasicPage.prototype.initializeApp = function () {
        var _this = this;
        this.platform
            .ready()
            .then(function () {
            console.log("render complete" +
                _this.element.nativeElement.querySelector('[id="c' + 0 + 0 + '"]')
                    .innerHTML);
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        })
            .catch(function () { });
    };
    BasicPage.prototype.ngOnInit = function () {
        this.hint = this.chooseHint.bind(this);
    };
    BasicPage.prototype.settingsModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot("/settings");
                this.router.navigate[("/settings")];
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.twirlAndTipModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot("/twirl-and-tip");
                this.router.navigate[('/twirl-and-tip')];
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.togglePopupMenu = function () {
        return (this.openMenu = !this.openMenu);
    };
    BasicPage.prototype.goToAccount = function () {
        alert("Account clicked.");
        this.togglePopupMenu();
    };
    BasicPage.prototype.goToCups = function () {
        alert("Cups clicked.");
        this.togglePopupMenu();
    };
    BasicPage.prototype.goToLeaderboard = function () {
        alert("Leaderboard clicked.");
        this.togglePopupMenu();
    };
    BasicPage.prototype.getFreeCoins = function () {
        // this.admobFreeService.RewardVideoAd();
    };
    BasicPage.prototype.goToShop = function () {
        // this.navCtrl.navigateRoot("/shops");
        this.router.navigate[('/shops')];
    };
    BasicPage.prototype.playWithTheme = function (theme) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // set theme when choose game by season
                this.gameTheme = theme;
                this.theme.setTheme(themes[theme]);
                this.numGameWordArr = Array(+this.numGameWord);
                this.numGameLetterArr = Array(+this.numGameLetter);
                this.createSaveGameData();
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.createSaveGameData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var date;
            return tslib_1.__generator(this, function (_a) {
                date = new Date().toJSON().slice(0, 10);
                this.saveGameData.timeAt = date;
                this.saveGameData.savedGame = true;
                this.saveGameData.finalLetterOfRow = this.finalLetterOfRow;
                this.saveGameData.firstLastLetter = this.firstLastLetter;
                this.saveGameData.gameLevel = this.gameLevel;
                this.saveGameData.focusI = this.focusI;
                this.saveGameData.focusJ = this.focusJ;
                this.saveGameData.gameType = this.gameType;
                this.saveGameData.numGameLetter = this.numGameWord;
                this.saveGameData.numGameWord = this.numGameWord;
                this.saveGameData.score = this.score;
                this.saveGameData.wordGridResult = this.wordGridResult;
                this.saveGameData.wordResult = this.wordResult;
                this.saveGameData.wordRowResult = this.wordRowResult;
                this.saveGameData.hintString = this.hintString;
                this.saveGameData.gameTheme = this.gameTheme;
                this.saveGameData.wordLibArr = this.wordLibArr;
                this.saveGameData.scoreLibArr = this.scoreLibArr;
                this.storage.set("save_game", this.saveGameData).then(function () {
                    console.log("Save Game Data Stored");
                });
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.updateSaveGameData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.saveGameData.score = this.score;
                this.saveGameData.wordGridResult = this.wordGridResult;
                this.saveGameData.focusI = this.focusI;
                this.saveGameData.focusJ = this.focusJ;
                this.saveGameData.score = this.score;
                this.saveGameData.wordLibArr = this.wordLibArr;
                this.saveGameData.wordResult = this.wordResult;
                this.saveGameData.wordRowResult = this.wordRowResult;
                this.saveGameData.hintString = this.hintString;
                this.saveGameData.finalLetterOfRow = this.finalLetterOfRow;
                this.storage.set("save_game", this.saveGameData).then(function () {
                    console.log("Save Game Data Updated");
                });
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.deleteSaveGameData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.storage.remove("save_game").then(function () {
                    console.log("Save Game Data Removed");
                });
                return [2 /*return*/];
            });
        });
    };
    // get word lib by length and firstlastLetter
    BasicPage.prototype.getWordLibDBArr = function (numGameLetter, firstLastLetter, theme) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database
                .getWordLibDBArr(numGameLetter, firstLastLetter)
                .subscribe(function (data) {
                var innerbox = $('.wi-box').filter(function (i, e) {
                    return i != 0 && i != $('.wi-box').length - 1;
                }).filter(function (i, e) {
                    return $(e).find('label').text() != '';
                });
                if (innerbox.length) {
                    innerbox.each(function (i, e) {
                        $(e).find('label').closest('div').addClass('selected-letter');
                    });
                }
                // get Lib data
                _this.wordLibArr = data;
                _this.updateSaveGameData();
                console.log(data);
                if (theme !== -1) {
                    _this.playWithTheme(theme);
                }
                if (_this.focusI === _this.numGameWord - 1) {
                    var noWordFlag = true;
                    for (var x = 0; x < _this.wordLibArr.length; x++) {
                        var wordStr = _this.wordLibArr[x];
                        if (wordStr[_this.numGameLetter - 1] ===
                            _this.firstLastLetter.toLowerCase()) {
                            _this.wordLibLastRowArr.push(wordStr);
                            noWordFlag = false;
                        }
                    }
                    if (noWordFlag == true) {
                        _this.endGame = true;
                        _this.alertNoWord();
                    }
                }
            });
            resolve("Success!");
        });
    };
    // alert if no word with first and last letter
    BasicPage.prototype.alertNoWord = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertNoWord;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "Sorry!",
                            message: "No word have last letter " +
                                this.firstLastLetter +
                                ". Your current score is " +
                                this.score,
                            buttons: [
                                {
                                    text: "Back To Level Map",
                                    handler: function (data) {
                                        _this.deleteSaveGameData();
                                        _this.navCtrl.navigateRoot("/dashboard");
                                    }
                                }
                            ],
                            backdropDismiss: false
                        })];
                    case 1:
                        alertNoWord = _a.sent();
                        alertNoWord.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    // alert when complete game
    BasicPage.prototype.alertEndGame = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "Congratulations!",
                            message: "Your current score is " + this.score,
                            buttons: [
                                {
                                    text: "Back To Level Map",
                                    handler: function (data) {
                                        _this.database.updateScores(_this.gameLevel, _this.score, 0).subscribe(function (data) {
                                            _this.deleteSaveGameData();
                                        }, function (error) { }, function () { });
                                        _this.navCtrl.navigateRoot("/dashboard");
                                    }
                                }
                            ],
                            backdropDismiss: false
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // alert when complete game
    BasicPage.prototype.alertEndGameUnlockNewGame = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "Congratulations!",
                            message: "You unlock new game",
                            buttons: [
                                {
                                    text: "Back To Level Map",
                                    handler: function (data) {
                                        _this.database.updateScores(_this.gameLevel, _this.score, 1).subscribe(function (data) {
                                            _this.deleteSaveGameData();
                                            if (_this.gameLevel == _this.user.game_level_unlocked) {
                                                _this.user.game_level_unlocked =
                                                    _this.user.game_level_unlocked + 1;
                                            }
                                            _this.storage.set("user_info", _this.user).then(function () {
                                                console.log("Game level unlocked update");
                                            });
                                        }, function (error) { }, function () {
                                            _this.navCtrl.navigateRoot("/dashboard");
                                        });
                                    }
                                }
                            ],
                            backdropDismiss: false
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // get score table from database
    BasicPage.prototype.getScoreLibArr = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database.getScoreLibArr().subscribe(function (data) {
                // get Lib data
                _this.scoreLibArr = data;
            });
            resolve();
        });
    };
    // define multi array **Not use now
    BasicPage.prototype.defineGridResultArr = function () {
        for (var i = 0; i < this.numGameWord; i++) {
            this.wordGridResult[i] = [];
            for (var j = 0; j < this.numGameLetter; j++) {
                this.wordGridResult[i][j] = "";
            }
        }
        this.wordGridResult[0][0] = this.firstLastLetter;
        this.wordGridResult[this.numGameWord - 1][this.numGameWord - 1] = this.firstLastLetter;
    };
    // create random character for first last letter
    BasicPage.prototype.randomCharacter = function () {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    };
    // get num word and num letter + set theme
    BasicPage.prototype.selectGameData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.disableBtn = 0;
                this.numGameWord = this.inputNumber.value.numberWord;
                this.numGameLetter = this.inputNumber.value.numberLetter;
                while (this.firstLastLetter === "J" ||
                    this.firstLastLetter === "Q" ||
                    this.firstLastLetter === "X" ||
                    this.firstLastLetter === "Z" ||
                    this.firstLastLetter === "") {
                    this.firstLastLetter = this.randomCharacter().toUpperCase();
                }
                if (this.inputNumber.invalid) {
                    if (!(this.inputNumber.value.numberLetter >= 3 && this.inputNumber.value.numberLetter <= 8)) {
                        this.messageLetterRequired = '';
                        this.messageMinMaxLetter = "The number of letters must be min 3 and max 8";
                    }
                    if (!(this.inputNumber.value.numberWord >= 3 && this.inputNumber.value.numberWord <= 8)) {
                        this.messageWordRequired = '';
                        this.messageMinMaxWords = "The number of words must be min 3 and max 8";
                    }
                    if (this.inputNumber.value.numberLetter === "" || this.inputNumber.value.numberLetter === null) {
                        this.messageMinMaxLetter = '';
                        this.messageLetterRequired = "The number of letters is required";
                    }
                    if (this.inputNumber.value.numberWord === "" || this.inputNumber.value.numberWord === null) {
                        this.messageMinMaxWords = '';
                        this.messageWordRequired = "The number of words is required";
                    }
                    console.log(this.inputNumber);
                }
                else {
                    $(".bt-submit").addClass("loading");
                    $(".fa").addClass("fa-refresh fa-spin");
                    // this.loading.present();
                    this.getWordLibDBArr(this.numGameLetter, this.firstLastLetter, "spring").then(function (data) {
                        console.log(data);
                    }, function (error) { });
                    this.getScoreLibArr().then(function (data) {
                        _this.defineGridResultArr();
                        // this.loading.dismiss();
                        _this.getHeightWidth();
                    }, function (error) { });
                }
                return [2 /*return*/];
            });
        });
    };
    // check result when enter a letter
    BasicPage.prototype.checkResultOfRow = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var x, label, j, j;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                // get word input
                // check if first row, push firstLastLetter to arr
                if (this.focusI === 0) {
                    this.wordRowResult.push(this.firstLastLetter);
                }
                else if (this.focusI !== 0) {
                    this.wordRowResult.push(this.finalLetterOfRow);
                }
                // Push input letter to arr
                for (x = 1; x <= this.focusJ; x++) {
                    this.wordRowResult.push(this.element.nativeElement.querySelector('[id="c' + this.focusI + x + '"]').innerHTML);
                }
                // check if last row, push firstLastLetter to arr
                if (this.focusI == this.numGameWord - 1 &&
                    this.focusJ == this.numGameLetter - 2) {
                    this.wordRowResult.push(this.firstLastLetter);
                }
                // for (let j = 0; j < this.focusJ+1; j++) {
                //     this.wordRowResult.push(this.element.nativeElement.querySelector('[name="c' + this.focusI + j + '"]').value);
                // }
                // convert word arr to string
                this.wordResult = this.wordRowResult.toString();
                // change word to lowercase
                this.wordResult = this.wordResult.replace(/[^\w\s]/gi, "").toLowerCase();
                console.log("word result:" + this.wordResult);
                // // check if input word include in lib arr
                if (this.checkWordInLib(this.wordResult)) {
                    label = $("#c" + this.focusI + this.focusJ);
                    label.closest("div").addClass("selected-letter");
                    //check if hint and update hintString
                    if (this.isHintUse === true) {
                        this.resetKey();
                        this.hintString += this.letterSelected.toLowerCase();
                        this.hintArr = [];
                        this.isHintUse = false;
                        console.log(this.hintString);
                    }
                    else {
                        // this.hintString += this.letterSelected.toLowerCase();
                        this.notHintString += this.letterSelected.toLowerCase();
                    }
                    //put to grid resultArr
                    this.wordGridResult[this.focusI][this.focusJ] = this.letterSelected;
                    //update saved data
                    this.updateSaveGameData();
                    // check if final letter of row - get final letter of previous letter
                    if (this.focusI === this.numGameWord - 1 &&
                        this.wordResult.length === this.numGameLetter) {
                        this.endGame = true;
                        if (this.score + this.totalGameLevelScores >=
                            this.limitScoreToUnlockNewGame &&
                            this.gameLevel === this.user.game_level_unlocked) {
                            this.alertEndGameUnlockNewGame();
                        }
                        else {
                            this.alertEndGame();
                        }
                    }
                    if (this.focusJ === this.numGameLetter - 1) {
                        // this.loading.present();
                        this.finalLetterOfRow = this.element.nativeElement.querySelector('[id="c' + this.focusI + (this.numGameLetter - 1) + '"]').innerHTML;
                        //put to grid resultArr
                        this.wordGridResult[this.focusI][this.numGameLetter - 1] = this.letterSelected;
                        this.focusJ = 0;
                        this.focusI++;
                        this.hintString = "";
                        this.notHintString = "";
                        this.letterSelected = this.finalLetterOfRow;
                        //put to grid resultArr and wordResult
                        this.wordGridResult[this.focusI][0] = this.letterSelected;
                        this.getWordLibDBArr(this.numGameLetter, this.finalLetterOfRow, -1).then(function (data) {
                            console.log(data);
                        }, function (error) { });
                        this.setLetter();
                        this.setFocus(this.focusI, this.focusJ);
                        this.calcScore(this.wordRowResult).then(function () {
                            _this.wordRowResult = [];
                            _this.wordResult = "";
                            //update saved data
                            _this.updateSaveGameData();
                        });
                        console.log("ok, word exist on lib");
                        // this.loading.dismiss();
                    }
                }
                //if input word not include in arr (reset row)
                else {
                    if (this.focusI === this.numGameWord - 1) {
                        for (j = 1; j <= this.numGameLetter - 2; j++) {
                            this.focusJ = j;
                            this.setFocus(this.focusI, this.focusJ);
                            if (this.notHintString[j - 1]) {
                                this.setLetterToLabel(this.notHintString[j - 1].toUpperCase());
                            }
                            else {
                                this.setLetterToLabel("");
                                this.removeClass();
                            }
                        }
                    }
                    else {
                        for (j = 1; j <= this.numGameLetter - 1; j++) {
                            this.focusJ = j;
                            this.setFocus(this.focusI, this.focusJ);
                            if (this.notHintString[j - 1]) {
                                console.log("j:" + j);
                                console.log("hint string:" + this.hintString);
                                this.setLetterToLabel(this.notHintString[j - 1].toUpperCase());
                            }
                            else {
                                this.setLetterToLabel("");
                                this.removeClass();
                            }
                        }
                    }
                    this.focusJ = this.hintString.length;
                    this.setFocus(this.focusI, this.focusJ);
                    this.wordRowResult = [];
                    this.wordResult = "";
                    console.log("wrong word! please try again! focus ij:" + this.focusI + this.focusJ);
                    this.alertService.presentToast("Incorrect. Please try again!");
                }
                this.wordRowResult = [];
                this.wordResult = "";
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.removeClass = function () {
        var innerbox = $('.wi-box').filter(function (i, e) {
            return i != 0 && i != $('.wi-box').length - 1;
        }).filter(function (i, e) {
            return $(e).find('label').text() == '';
        });
        if (innerbox.length) {
            innerbox.each(function (i, e) {
                $(e).find('label').closest('div').removeClass('selected-letter');
            });
        }
    };
    // check if word exist in lib
    BasicPage.prototype.checkWordInLib = function (wordNeedCheck) {
        for (var x = 0, len = this.wordLibArr.length; x < len; x++) {
            if (this.wordLibArr[x].indexOf(wordNeedCheck) == 0) {
                return true;
            }
        }
        return false;
    };
    // calc score when complete letter
    BasicPage.prototype.calcScore = function (wordNeedCalc) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var x, lenx, y, leny;
            return tslib_1.__generator(this, function (_a) {
                for (x = 0, lenx = wordNeedCalc.length; x < lenx; x++) {
                    for (y = 0, leny = this.scoreLibArr.length; y < leny; y++) {
                        if (wordNeedCalc[x].replace(/[^\w\s]/gi, "").toLowerCase() ===
                            this.scoreLibArr[y].letter) {
                            this.score += this.scoreLibArr[y].score;
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // function when click letter on keyboard
    BasicPage.prototype.selectLetter = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.letterSelected = event.letterSelected;
                this.setLetter();
                return [2 /*return*/];
            });
        });
    };
    // Function when click submit letter
    BasicPage.prototype.setLetter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.letterSelected === "") {
                    this.alertService.presentToast("Please select a letter from keyboard!");
                    return [2 /*return*/, false];
                }
                else {
                    this.setLetterToLabel(this.letterSelected);
                    if (this.focusJ == 0) {
                        this.setFocus(this.focusI, this.focusJ);
                    }
                    else {
                        if (this.focusI == this.numGameWord - 1) {
                            this.checkResultOfRow();
                            if (this.focusJ < this.numGameLetter - 2) {
                                this.focusJ++;
                                this.updateSaveGameData();
                                this.setFocus(this.focusI, this.focusJ);
                            }
                        }
                        else {
                            this.checkResultOfRow();
                            if (this.focusJ < this.numGameLetter - 1) {
                                this.focusJ++;
                                this.updateSaveGameData();
                                this.setFocus(this.focusI, this.focusJ);
                            }
                        }
                    }
                    this.letterSelected = "";
                }
                return [2 /*return*/];
            });
        });
    };
    // Show popup
    BasicPage.prototype.showPopup = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                modal = $("#myModal");
                // When the user clicks the button, open the modal 
                $(document).on("click", "#myBtn", function () {
                    console.log(11);
                    modal.show();
                    $("#blur").addClass("blur-bg");
                });
                // When the user clicks on <span> (x), close the modal
                $("document .at-close").click(function () {
                    modal.style.display = "none";
                });
                // When the user clicks anywhere outside of the modal, close it
                $(window).click(function (e) {
                    console.log(e.target.id);
                    if (e.target.id === "myModal") {
                        modal.hide();
                        $("#blur").removeClass("blur-bg");
                    }
                    if (e.target.id === "goToBuy") {
                        // this.navCtrl.navigateRoot("/shops");
                        _this.router.navigate(["/shops"]);
                        modal.hide();
                        $("#blur").removeClass("blur-bg");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    //Function when click Hint
    BasicPage.prototype.chooseHint = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var chooseHint;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "HINT",
                            message: "You need 25 coins to get right next letter",
                            buttons: [
                                {
                                    text: "Cancel",
                                    role: "cancel",
                                    cssClass: "secondary",
                                    handler: function () {
                                        console.log("Confirm Cancel");
                                    }
                                },
                                {
                                    text: "Confirm",
                                    handler: function () {
                                        _this.useHint();
                                    }
                                }
                            ],
                            backdropDismiss: false
                        })];
                    case 1:
                        chooseHint = _a.sent();
                        chooseHint.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BasicPage.prototype.resetKey = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var x, keyCode;
            return tslib_1.__generator(this, function (_a) {
                for (x = 97; x <= 122; x++) {
                    keyCode = String.fromCharCode(x);
                    this.keyObj[keyCode + ""] = false;
                }
                return [2 /*return*/];
            });
        });
    };
    BasicPage.prototype.disableKey = function (keyCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, (this.keyObj[keyCode + ""] = true)];
            });
        });
    };
    //Function when click hint
    BasicPage.prototype.useHint = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var j, j, x, word, wordHint, x, word, wordHint, x, keyCode;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this.twirlAndTipValue >= 25) {
                    if (this.focusI === this.numGameWord - 1) {
                        for (j = 1; j <= this.numGameLetter - 2; j++) {
                            this.focusJ = j;
                            this.setFocus(this.focusI, this.focusJ);
                            if (this.hintString[j - 1]) {
                                this.setLetterToLabel(this.hintString[j - 1].toUpperCase());
                            }
                            else {
                                this.setLetterToLabel("");
                                this.removeClass();
                            }
                        }
                    }
                    else {
                        for (j = 1; j <= this.numGameLetter - 1; j++) {
                            this.focusJ = j;
                            this.setFocus(this.focusI, this.focusJ);
                            if (this.hintString[j - 1]) {
                                this.setLetterToLabel(this.hintString[j - 1].toUpperCase());
                            }
                            else {
                                this.setLetterToLabel("");
                                this.removeClass();
                            }
                        }
                    }
                    this.focusJ = this.notHintString.length + 1;
                    this.setFocus(this.focusI, this.focusJ);
                    this.isHintUse = true;
                    if (this.focusI === this.numGameWord - 1) {
                        for (x = 0; x < this.wordLibLastRowArr.length; x++) {
                            word = this.wordLibLastRowArr[x];
                            wordHint = "";
                            if (this.focusI === 0) {
                                wordHint = this.firstLastLetter.toLowerCase() + this.hintString;
                            }
                            else {
                                wordHint = this.finalLetterOfRow.toLowerCase() + this.hintString;
                            }
                            console.log("word:" + word);
                            console.log("wordHint:" + wordHint);
                            console.log("word.indexOf(wordHint):" + word.indexOf(wordHint));
                            if (word.indexOf(wordHint) === 0 &&
                                this.hintArr.indexOf(word[this.focusJ]) === -1 &&
                                word[this.numGameLetter - 1]) {
                                this.hintArr.push(word[this.focusJ]);
                            }
                        }
                    }
                    else {
                        for (x = 0; x < this.wordLibArr.length; x++) {
                            word = this.wordLibArr[x];
                            wordHint = "";
                            if (this.focusI === 0) {
                                wordHint = this.firstLastLetter.toLowerCase() + this.hintString;
                            }
                            else {
                                wordHint = this.finalLetterOfRow.toLowerCase() + this.hintString;
                            }
                            console.log("word:" + word);
                            console.log("wordHint:" + wordHint);
                            console.log("word.indexOf(wordHint):" + word.indexOf(wordHint));
                            if (word.indexOf(wordHint) === 0 &&
                                this.hintArr.indexOf(word[this.focusJ]) === -1) {
                                this.hintArr.push(word[this.focusJ]);
                            }
                        }
                    }
                    for (x = 97; x <= 122; x++) {
                        keyCode = String.fromCharCode(x);
                        if (this.hintArr.indexOf(keyCode) === -1) {
                            this.disableKey(keyCode);
                        }
                    }
                    console.log(this.hintArr);
                    this.twirlAndTipService.updateTAT("userCoins").subscribe(function (data) {
                        _this.twirlAndTipValue += data["bonusTATPoint"];
                        _this.user.twirl_tip += data["bonusTATPoint"];
                        _this.storage.set("user_info", _this.user).then(function () {
                            console.log("Tips Updated: " + data["bonusTATPoint"]);
                        });
                    }, function (error) {
                        console.log(error);
                    }, function () { });
                }
                else {
                    this.alertService.presentToast("you dont have enough coins to use hint!");
                }
                return [2 /*return*/];
            });
        });
    };
    // Set letter to Input cij
    BasicPage.prototype.setLetterToLabel = function (letterSelected) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var label;
            return tslib_1.__generator(this, function (_a) {
                label = $("#c" + this.focusI + this.focusJ);
                label.text(letterSelected);
                return [2 /*return*/];
            });
        });
    };
    // Display keyboard and est focus to c01
    BasicPage.prototype.displayKeyboard = function () {
        if (this.element.nativeElement.querySelector('[id="c01"]').innerHTML === "") {
            this.toogleOpenKeyboard();
            return this.setFocus(0, 1);
        }
    };
    // set focus to cij
    BasicPage.prototype.setFocus = function (i, j) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log("i j:" + i + j);
                this.focusI = i;
                this.focusJ = j;
                this.element.nativeElement.querySelector('[id="c' + i + j + '"]').focus();
                return [2 /*return*/];
            });
        });
    };
    // Display Keyboard
    BasicPage.prototype.toogleOpenKeyboard = function () {
        return (this.openKeyboard = true);
    };
    BasicPage.prototype.goBack = function () {
        this.router.navigate(["/dashboard"]);
        // this.navCtrl.navigateRoot("/dashboard");
        // $("#btn-back button").trigger('click')
        // console.log($("#btn-back button").length)
    };
    BasicPage = tslib_1.__decorate([
        Component({
            selector: "app-basic",
            templateUrl: "./basic.page.html",
            styleUrls: ["./basic.page.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [TwirlAndTipService,
            AuthService,
            NavController,
            Storage,
            ThemeService,
            Platform,
            SplashScreen,
            StatusBar,
            DatabaseService,
            ElementRef,
            AlertController,
            AlertService,
            LoadingService,
            ActivatedRoute,
            FormBuilder,
            Router])
    ], BasicPage);
    return BasicPage;
}());
export { BasicPage };
//# sourceMappingURL=basic.page.js.map