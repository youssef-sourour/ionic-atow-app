import {Component, OnInit, ElementRef} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {NavController, Platform, AlertController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {AuthService} from '../../../services/auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {DatabaseService} from '../../../services/database.service';
import {AlertService} from 'src/app/services/alert.service';
import {NgForm} from '@angular/forms';
import {TwirlAndTipService} from '../../../services/twirl-and-tip.service';
import {LoadingService} from '../../../services/loading.service';
import {ActivatedRoute} from '@angular/router';

const themes = {
    spring: {
        primary: '#F78154',
        secondary: '#4D9078',
        tertiary: '#B4436C',
        light: '#FDE8DF',
        medium: '#FCD0A2',
        dark: '#B89876'
    },
    summer: {
        primary: '#8CBA80',
        secondary: '#FCFF6C',
        tertiary: '#FE5F55',
        medium: '#BCC2C7',
        dark: '#F7F7FF',
        light: '#495867'
    },
    autumn: {
        primary: '#39BFBD',
        secondary: '#4CE0B3',
        tertiary: '#FF5E79',
        light: '#F4EDF2',
        medium: '#B682A5',
        dark: '#34162A'
    },
    winter: {
        primary: '#a1bf06',
        secondary: '#a8bde0',
        tertiary: '#a346ff',
        light: '#F4EDF2',
        medium: '#B682A5',
        dark: '#34162A'
    }
};

@Component({
  selector: 'app-hint',
  templateUrl: './hint.page.html',
  styleUrls: ['./hint.page.scss'],
})
export class HintPage implements OnInit {
    public totalGameLevelScores: any = 0;
    public limitScoreToUnlockNewGame: any = 0;
    public limitScoresArr: any;
    public gameLevel: any;
    public gameType: any;
    public disableBtn: any = 1;
    public gameTheme: any = null;
    public characters: any = 'abcdefghijklmnopqrstuvwxyz';
    public user: any;
    public iconSetting = 'md-settings';
    public iconCoins = 'logo-usd';
    public iconTwirlAndTip = 'md-disc';
    public twirlAndTipValue: any = 0;
    public off = false;
    public dot = false;
    public openMenu = false;
    public openKeyboard = false;
    public endGame = false;
    public continuousGame = false;
    public saveGameData = {
        savedGame: false,
        gameLevel: 1,
        gameType: '',
        score: 0,
        firstLastLetter: '',
        numGameWord: 0,
        numGameLetter: 0,
        wordGridResult: [[]],
        finalLetterOfRow: '',
        focusI: 0,
        focusJ: 0,
        hintString: '',
        gameTheme: '',
        wordLibArr: [],
        scoreLibArr: [],
        wordResult: '',
        wordRowResult: [],
        timeAt: '',
    };

    // generate game size
    public wordLibArr: any;
    public wordLibLastRowArr: any[] = [];
    public scoreLibArr: any;
    public numGameWord: any = 3;
    public numGameWordArr: any;
    public numGameLetter: any = 3;
    public numGameLetterArr: any;
    public firstLastLetter: any = '';
    public wordGridResult: any[][] = [[]];
    public wordRowResult: any[] = [];
    public wordResult: string;
    public letterSelected: any = '';
    public focusI: any = 0 ;
    public focusJ: any = 1;
    public finalLetterOfRow: any;
    public score: any = 0;
    public hintString: any = '';
    public isHintUse: any = false;
    public hintArr: any[] = [];
    public keyObj = {
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
        z: false,
    };


    constructor(
        private twirlAndTipService: TwirlAndTipService,
        private authService: AuthService,
        private navCtrl: NavController,
        private storage: Storage,
        private theme: ThemeService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private database: DatabaseService,
        private element: ElementRef,
        public alertCtrl: AlertController,
        private alertService: AlertService,
        public loading: LoadingService,
        private route: ActivatedRoute,
    ) {
        this.initializeApp();
    }
    ionViewWillEnter(){

        this.storage.get('user_info').then((data) => {
            this.user = data;
            this.twirlAndTipValue = data.twirl_tip;
        });
        //get game_level
        this.route.queryParams.subscribe(params => {
                if (params && params.data) {
                    this.gameLevel = JSON.parse(params.data).gameLevel;
                    this.gameType = JSON.parse(params.data).gameType;
                    this.continuousGame = JSON.parse(params.data).continueGame;
                    if(this.continuousGame === true)
                    {
                        this.storage.get('save_game').then((data) => {
                            this.saveGameData = data;
                            this.numGameWord = this.saveGameData.numGameWord;
                            this.numGameLetter = this.saveGameData.numGameLetter;
                            this.firstLastLetter = this.saveGameData.firstLastLetter.toUpperCase();
                            if(this.saveGameData.finalLetterOfRow) this.finalLetterOfRow = this.saveGameData.finalLetterOfRow.toUpperCase();
                            if(this.saveGameData.wordGridResult) this.wordGridResult = this.saveGameData.wordGridResult;
                            if(this.saveGameData.wordLibArr) this.wordLibArr = this.saveGameData.wordLibArr;
                            if(this.saveGameData.scoreLibArr) this.scoreLibArr = this.saveGameData.scoreLibArr;
                            if(this.saveGameData.focusI) this.focusI = this.saveGameData.focusI;
                            if(this.saveGameData.focusJ) this.focusJ = this.saveGameData.focusJ;
                            if(this.saveGameData.wordResult) this.wordResult = this.saveGameData.wordResult;
                            if(this.saveGameData.wordRowResult) this.wordRowResult = this.saveGameData.wordRowResult;
                            if(this.saveGameData.hintString) this.hintString = this.saveGameData.hintString;
                            this.toogleOpenKeyboard();
                            this.playWithTheme(this.saveGameData.gameTheme);
                        });
                    }
                    //get total score of user
                    this.database.getScores().subscribe((data) => {
                        for (let x in data) {
                            if (data[x].game_level === this.gameLevel) {
                                this.totalGameLevelScores += data[x].score;
                            }
                        }
                    });
                    //get limit_scores from storage
                    this.storage.get('limit_scores').then((data) => {
                        this.limitScoresArr = data;
                        for (let x in data) {
                            if (data[x].game_level === this.gameLevel) {
                                console.log(data[x]);
                                this.limitScoreToUnlockNewGame = data[x].score_to_unlock;

                            }
                        }
                    });
                }
            },
            () => {
            },
            () => {});
    }
    ionViewDidEnter (){
        //Set saved data to table game
        if(this.continuousGame === true)
        {
            for(let i = 0; i< this.numGameWord; i++)
            {
                for(let j=0; j<this.numGameLetter; j++)
                {
                    const label = this.element.nativeElement.querySelector('[id="c' + i + j + '"]');
                    label.innerHTML = this.wordGridResult[i][j];
                }
            }
            this.continuousGame = false;
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {
            console.log('render complete' + this.element.nativeElement.querySelector('[id="c' + 0 + 0 + '"]').innerHTML)
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        }).catch(() => {
        });
    }

    ngOnInit() {
    }

    async twirlAndTipModel() {
        this.navCtrl.navigateRoot('/twirl-and-tip');
    }

    togglePopupMenu() {
        return this.openMenu = !this.openMenu;
    }

    async  playWithTheme(theme) {
        // set theme when choose game by season
        this.gameTheme = theme;
        this.theme.setTheme(themes[theme]);
        this.numGameWordArr = Array(+this.numGameWord);
        this.numGameLetterArr = Array(+this.numGameLetter);
        this.createSaveGameData();
    }

    async createSaveGameData() {
        let date = new Date().toJSON().slice(0, 10);
        this.saveGameData.focusI = this.focusI;
        this.saveGameData.focusJ = this.focusJ;
        this.saveGameData.timeAt = date;
        this.saveGameData.savedGame = true;
        this.saveGameData.finalLetterOfRow = this.finalLetterOfRow;
        this.saveGameData.firstLastLetter = this.firstLastLetter;
        this.saveGameData.gameLevel = this.gameLevel;
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
        this.storage.set('save_game', this.saveGameData).then(function() {
            console.log('Save Game Data Stored');
        });
    }

    async updateSaveGameData() {
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
        this.storage.set('save_game', this.saveGameData).then(function() {
            console.log('Save Game Data Updated');
        });
    }

    async deleteSaveGameData() {
        this.storage.remove('save_game').then(function() {
            console.log('Save Game Data Removed');
        });
    }

    // get word lib by length and firstlastLetter
    getWordLibDBArr(numGameLetter, firstLastLetter, theme) {
        return new Promise((resolve, reject) => {
            this.database.getWordLibDBArr(numGameLetter, firstLastLetter).subscribe(
                data => {
                    // get Lib data
                    this.wordLibArr = data;
                    this.updateSaveGameData();
                    console.log(data);
                    if (theme !== -1) {
                        this.playWithTheme(theme);
                    }
                    if (this.focusI === this.numGameWord - 1) {
                        let noWordFlag = true;
                        for (let x = 0; x < this.wordLibArr.length; x++) {
                            let wordStr = this.wordLibArr[x];
                            if (wordStr[this.numGameLetter - 1] === this.firstLastLetter.toLowerCase()) {
                                this.wordLibLastRowArr.push(wordStr);
                                noWordFlag = false;
                            }
                        }
                        if (noWordFlag == true) {
                            this.endGame = true;
                            this.alertNoWord();
                        }
                    }
                }
            );
            resolve('Success!');
        });

    }

    // alert if no word with first and last letter
    async alertNoWord() {
        const alertNoWord = await this.alertCtrl.create({
            header: 'Sorry!',
            message: 'No word have last letter ' + this.firstLastLetter + '. Your current score is ' + this.score,
            buttons: [{
                text: 'Back To Level Map',
                handler: data => {
                    this.navCtrl.navigateRoot('/dashboard');
                }
            }],
            backdropDismiss: false
        });
        alertNoWord.present();
    }

    // alert when complete game
    async alertEndGame() {
        const alert = await this.alertCtrl.create({
            header: 'Congratulations!',
            message: 'Your current score is ' + this.score,
            buttons: [{
                text: 'Back To Level Map',
                handler: data => {
                    this.database.updateScores(this.gameLevel, this.score, 0).subscribe(
                        data => {
                            this.deleteSaveGameData();
                        },
                        error => {
                        },
                        () => {
                        }
                    );
                    this.navCtrl.navigateRoot('/dashboard');
                },
            }],
            backdropDismiss: false
        });
        await alert.present();
    }

    // alert when complete game
    async alertEndGameUnlockNewGame() {
        const alert = await this.alertCtrl.create({
            header: 'Congratulations!',
            message: 'You unlock new game',
            buttons: [{
                text: 'Back To Level Map',
                handler: data => {
                    this.database.updateScores(this.gameLevel, this.score, 1).subscribe(
                        data => {
                            this.deleteSaveGameData();
                            if (this.gameLevel == this.user.game_level_unlocked) {
                                this.user.game_level_unlocked = this.user.game_level_unlocked + 1;
                            }
                            this.storage.set('user_info', this.user).then(
                                () => {
                                    console.log('Game level unlocked update');
                                }
                            );
                        },
                        error => {
                        },
                        () => {
                            this.navCtrl.navigateRoot('/dashboard');
                        }
                    );
                },
            }],
            backdropDismiss: false
        });
        await alert.present();
    }

    // get score table from database
    getScoreLibArr() {
        return new Promise((resolve, reject) => {
            this.database.getScoreLibArr().subscribe(
                data => {
                    // get Lib data
                    this.scoreLibArr = data;
                }
            );
            resolve();
        });
    }

    // define multi array **Not use now
    defineGridResultArr() {
        for (let i = 0; i < this.numGameWord; i++) {
            this.wordGridResult[i] = [];
            for (let j = 0; j < this.numGameLetter; j++) {
                this.wordGridResult[i][j] = '';
            }
        }
        this.wordGridResult[0][0] = this.firstLastLetter;
        this.wordGridResult[this.numGameWord - 1][this.numGameWord - 1] = this.firstLastLetter;
    }

    // create random character for first last letter
    randomCharacter() {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }

    // get num word and num letter + set theme
    async selectGameData(form: NgForm) {
        this.disableBtn = 0;
        this.loading.present();
        this.numGameWord = form.value.numberWord;
        this.numGameLetter = form.value.numberLetter;
        while(this.firstLastLetter === 'J' || this.firstLastLetter ==='Q' || this.firstLastLetter === 'X' || this.firstLastLetter ==='')
        {
            this.firstLastLetter = this.randomCharacter().toUpperCase();
        }
        this.getWordLibDBArr(this.numGameLetter, this.firstLastLetter, 'spring').then(
            data => {
                console.log(data);
            },
            error => {
            }
        );
        this.getScoreLibArr().then(
            data => {
                this.defineGridResultArr();
                this.loading.dismiss();
            },
            error => {

            }
        );
    }

    // check result when enter a letter
    async checkResultOfRow() {
        // get word input
        // check if first row, push firstLastLetter to arr
        if (this.focusI === 0) {
            this.wordRowResult.push(this.firstLastLetter);
        } else if (this.focusI !== 0) {
            this.wordRowResult.push(this.finalLetterOfRow);
        }

        // Push input letter to arr
        for (let x = 1; x <= this.focusJ; x++) {
            this.wordRowResult.push(this.element.nativeElement.querySelector('[id="c' + this.focusI + x + '"]').innerHTML);
        }
        // check if last row, push firstLastLetter to arr
        if (this.focusI == this.numGameWord - 1 && this.focusJ == this.numGameLetter - 2) {
            this.wordRowResult.push(this.firstLastLetter);
        }
        // for (let j = 0; j < this.focusJ+1; j++) {
        //     this.wordRowResult.push(this.element.nativeElement.querySelector('[name="c' + this.focusI + j + '"]').value);
        // }

        // convert word arr to string
        this.wordResult = this.wordRowResult.toString();
        // change word to lowercase
        this.wordResult = this.wordResult.replace(/[^\w\s]/gi, '').toLowerCase();
        console.log('word result:' + this.wordResult);
        // // check if input word include in lib arr
        if (this.checkWordInLib(this.wordResult)) {
            //check if hint and update hintString
            if (this.isHintUse === true) {
                this.resetKey();
                this.hintString += this.letterSelected.toLowerCase();
                this.hintArr = [];
                this.isHintUse = false;
            } else {
                this.hintString += this.letterSelected.toLowerCase();
            }
            //put to grid resultArr
            this.wordGridResult[this.focusI][this.focusJ] = this.letterSelected;
            //update saved data
            this.updateSaveGameData();
            // check if final letter of row - get final letter of previous letter
            if (this.focusI === this.numGameWord - 1 && this.wordResult.length === this.numGameLetter) {
                this.endGame = true;
                if ((this.score + this.totalGameLevelScores) >= this.limitScoreToUnlockNewGame) {
                    this.alertEndGameUnlockNewGame();
                } else {
                    this.alertEndGame();
                }
            }
            if (this.focusJ === this.numGameLetter - 1) {
                this.loading.present();
                this.finalLetterOfRow = this.element.nativeElement.querySelector('[id="c' + this.focusI + (this.numGameLetter - 1) + '"]').innerHTML;
                //put to grid resultArr
                this.wordGridResult[this.focusI][this.numGameLetter - 1] = this.letterSelected;
                this.focusJ = 0;
                this.focusI++;
                this.hintString = '';
                this.letterSelected = this.finalLetterOfRow;
                //put to grid resultArr and wordResult
                this.wordGridResult[this.focusI][0] = this.letterSelected;
                this.getWordLibDBArr(this.numGameLetter, this.finalLetterOfRow, -1).then(
                    data => {
                        console.log(data);
                    },
                    error => {
                    }
                );
                this.setLetter();
                this.setFocus(this.focusI, this.focusJ);
                this.calcScore(this.wordRowResult).then(
                    () => {
                        this.wordRowResult = [];
                        this.wordResult = '';
                        //update saved data
                        this.updateSaveGameData();
                    }
                );
                console.log('ok, word exist on lib');
                this.loading.dismiss();
            }
        }
        //if input word not include in arr (reset row)
        else {
            if (this.focusI === this.numGameWord - 1) {
                for (let j = 1; j <= this.numGameLetter - 2; j++) {
                    this.focusJ = j;
                    this.setFocus(this.focusI, this.focusJ);
                    if (this.hintString[j - 1]) {
                        this.setLetterToLabel(this.hintString[j - 1].toUpperCase());
                    } else {
                        this.setLetterToLabel('');
                    }
                }
            } else {
                for (let j = 1; j <= this.numGameLetter - 1; j++) {
                    this.focusJ = j;
                    this.setFocus(this.focusI, this.focusJ);
                    if (this.hintString[j - 1]) {
                        console.log('j:' + j);
                        console.log('hint string:' + this.hintString);
                        this.setLetterToLabel(this.hintString[j - 1].toUpperCase());
                    } else {
                        this.setLetterToLabel('');
                    }
                }
            }
            this.focusJ = this.hintString.length;
            this.setFocus(this.focusI, this.focusJ);
            this.wordRowResult = [];
            this.wordResult = '';
            console.log('wrong word! please try again! focus ij:' + this.focusI + this.focusJ);
            this.alertService.presentToast('Incorrect. Please try again!');
        }
        this.wordRowResult = [];
        this.wordResult = '';
    }

    // check if word exist in lib
    checkWordInLib(wordNeedCheck) {
        for (let x = 0, len = this.wordLibArr.length; x < len; x++) {
            if (this.wordLibArr[x].indexOf(wordNeedCheck) == 0) {
                return true;
            }
        }
        return false;
    }

    // calc score when complete letter
    async calcScore(wordNeedCalc) {
        for (let x = 0, lenx = wordNeedCalc.length; x < lenx; x++) {
            for (let y = 0, leny = this.scoreLibArr.length; y < leny; y++) {
                if (wordNeedCalc[x].replace(/[^\w\s]/gi, '').toLowerCase() === this.scoreLibArr[y].letter) {
                    this.score += this.scoreLibArr[y].score;
                }
            }
        }
    }

    // function when click letter on keyboard
    async selectLetter(letterSelected) {
        this.letterSelected = letterSelected;
        this.setLetter();
    }

    // Function when click submit letter
    async setLetter() {
        if (this.letterSelected === '') {
            this.alertService.presentToast('Please select a letter from keyboard!');
            return false;
        }
        else {
            this.setLetterToLabel(this.letterSelected);
            if (this.focusJ == 0) {
                this.setFocus(this.focusI, this.focusJ);
            } else {
                if (this.focusI == this.numGameWord - 1) {
                    this.checkResultOfRow();
                    if (this.focusJ < this.numGameLetter - 2) {
                        this.focusJ++;
                        this.updateSaveGameData();
                        this.setFocus(this.focusI, this.focusJ);
                    }
                } else {
                    this.checkResultOfRow();
                    if (this.focusJ < this.numGameLetter - 1) {
                        this.focusJ++;
                        this.updateSaveGameData();
                        this.setFocus(this.focusI, this.focusJ);
                    }
                }
            }
            this.letterSelected = '';
        }
    }

    //Function when click Hint
    async chooseHint() {
        const chooseHint = await this.alertCtrl.create({
            header: 'HINT',
            message: 'You need 25 coins to get right next letter',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Confirm',
                    handler: () => {
                        this.useHint();
                    }
                }],
            backdropDismiss: false
        });
        chooseHint.present();
    }

    async disableKey(keyCode) {
        return this.keyObj[keyCode + ''] = true;
    }

    async resetKey() {
        for (let x = 97; x <= 122; x++) {
            let keyCode = String.fromCharCode(x);
            this.keyObj[keyCode + ''] = false;
        }
    }

    //Function when click hint
    async useHint() {
        if (this.twirlAndTipValue >= 25) {
            if (this.focusI === this.numGameWord - 1) {
                for (let j = 1; j <= this.numGameLetter - 2; j++) {
                    this.focusJ = j;
                    this.setFocus(this.focusI, this.focusJ);
                    if (this.hintString[j - 1]) {
                        this.setLetterToLabel(this.hintString[j - 1].toUpperCase());
                    } else {
                        this.setLetterToLabel('');
                    }
                }
            } else {
                for (let j = 1; j <= this.numGameLetter - 1; j++) {
                    this.focusJ = j;
                    this.setFocus(this.focusI, this.focusJ);
                    if (this.hintString[j - 1]) {
                        console.log('j:' + j);
                        console.log('hint string:' + this.hintString);
                        this.setLetterToLabel(this.hintString[j - 1].toUpperCase());
                    } else {
                        this.setLetterToLabel('');
                    }
                }
            }
            this.focusJ = this.hintString.length + 1;
            this.setFocus(this.focusI, this.focusJ);
            this.isHintUse = true;
            if (this.focusI === this.numGameWord - 1) {
                for (let x = 0; x < this.wordLibLastRowArr.length; x++) {
                    let word = this.wordLibLastRowArr[x];
                    let wordHint = '';
                    if (this.focusI === 0) {
                        wordHint = this.firstLastLetter.toLowerCase() + this.hintString;
                    } else {
                        wordHint = this.finalLetterOfRow.toLowerCase() + this.hintString;
                    }
                    console.log('word:' + word);
                    console.log('wordHint:' + wordHint);
                    console.log('word.indexOf(wordHint):' + word.indexOf(wordHint));
                    if (word.indexOf(wordHint) === 0 && this.hintArr.indexOf(word[this.focusJ]) === -1 && word[this.numGameLetter - 1]) {
                        this.hintArr.push(word[this.focusJ]);
                    }
                }
            } else {
                for (let x = 0; x < this.wordLibArr.length; x++) {
                    let word = this.wordLibArr[x];
                    let wordHint = '';
                    if (this.focusI === 0) {
                        wordHint = this.firstLastLetter.toLowerCase() + this.hintString;
                    } else {
                        wordHint = this.finalLetterOfRow.toLowerCase() + this.hintString;
                    }
                    console.log('word:' + word);
                    console.log('wordHint:' + wordHint);
                    console.log('word.indexOf(wordHint):' + word.indexOf(wordHint));
                    if (word.indexOf(wordHint) === 0 && this.hintArr.indexOf(word[this.focusJ]) === -1) {
                        this.hintArr.push(word[this.focusJ]);
                    }
                }
            }

            for (let x = 97; x <= 122; x++) {
                let keyCode = String.fromCharCode(x);
                if (this.hintArr.indexOf(keyCode) === -1) {
                    this.disableKey(keyCode);
                }
            }

            console.log(this.hintArr);
            this.twirlAndTipService.updateTAT('userCoins').subscribe(
                data => {
                    this.twirlAndTipValue += data['bonusTATPoint'];
                    this.user.twirl_tip += data['bonusTATPoint'];
                    this.storage.set('user_info', this.user).then(
                        () => {
                            console.log('Tips Updated: ' + data['bonusTATPoint']);
                        }
                    );
                },
                error => {
                    console.log(error);
                },
                () => {
                }
            );
        } else {
            this.alertService.presentToast('you dont have enough coins to use hint!');
        }


    }

    // Set letter to Input cij
    async setLetterToLabel(letterSelected) {
        const label = this.element.nativeElement.querySelector('[id="c' + this.focusI + this.focusJ + '"]');
        label.innerHTML = letterSelected;
    }

    // Display keyboard and est focus to c01
    displayKeyboard() {
        if (this.element.nativeElement.querySelector('[id="c01"]').innerHTML === '') {
            this.toogleOpenKeyboard();
            return this.setFocus(0, 1);
        }

    }

    // set focus to cij
    async setFocus(i, j) {
        console.log('i j:' + i + j);
        this.focusI = i;
        this.focusJ = j;
        this.element.nativeElement.querySelector('[id="c' + i + j + '"]').focus();
    }

    // Display Keyboard
    toogleOpenKeyboard() {
        return this.openKeyboard = true;
    }

}
