window.addEventListener('load', init);
// htmlの<body onload="init()">の新しい書き方
// jQueryは$(function(){
//		ここに書く
// });

//  -------------------------- < グローバル変数 > -----------------------------
// タイトル変数 ---------------------------------------------------------------
var stage;

var titleContainer;
var americaContainer;
var asiaContainer;

var bitmapArr = [];
var spaceArr = [];
var spriteSheetArr = [];
var spriteCnt = 0;

// 各ステージのリズム音
var rhythmInstance = null;


//  --------------------- < DOMを読み込んだら(初期値) > ---------------------------
function init() {
	stage = new createjs.Stage('canvasEl');
	createjs.Touch.enable(stage);
	titleContainer = new createjs.Container();
	americaContainer = new createjs.Container();
	asiaContainer = new createjs.Container();

	var loader = new createjs.LoadQueue(false);
	// サウンドのプラグイン
	loader.installPlugin(createjs.Sound);
	// 読み込み開始
	loader.loadManifest(manifest);
	// 読み込み状況
	loader.addEventListener('progress', function(evt) {
		// console.log(evt.progress);
	});
	// ひとつ読み込み終わったら
	loader.addEventListener('fileload', function(evt) {
		// console.log(evt);
	});
	// 全部読み込み終わったら
	loader.addEventListener('complete', function(evt) {
		addTitle();
	});
}


//  ------------------ < マニフェストをbitmapArrに格納 > -------------------------
function addTitle() {
	for(var i = 0; i < manifest.length; i++) {
		// ビットマップの場合 ---------------------------------------------------
		if(manifest[i].spriteData == null) {
			// bitmapArrの一個一個をbitmapする
			bitmapArr[i] = new createjs.Bitmap(manifest[i].src);
			bitmapArr[i].x = manifest[i].x;
			bitmapArr[i].y = manifest[i].y;
			bitmapArr[i].alpha = manifest[i].alpha;
			bitmapArr[i].id = manifest[i].id;
			bitmapArr[i].name = manifest[i].name;
			bitmapArr[i].group = manifest[i].group;
			bitmapArr[i].type = manifest[i].type;

			// bitmapのみをコンテナーに格納
			if(bitmapArr[i].group == 'title') {
				titleContainer.addChild(bitmapArr[i]);
			} else if(bitmapArr[i].group == 'america') {
				americaContainer.addChild(bitmapArr[i]);
			} else if(bitmapArr[i].group == 'asia') {
				asiaContainer.addChild(bitmapArr[i]);
			}

			// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
			var setImg = bitmapArr[i].image;
			bitmapArr[i].regX = setImg.width / 2;
			bitmapArr[i].regY = setImg.height / 2;
			stage.addChild(titleContainer);


		// スプライトの場合 ----------------------------------------------
		} else {
			spriteSheetArr[spriteCnt] = new createjs.SpriteSheet(manifest[i].spriteData);
			bitmapArr[i] = new createjs.Sprite(spriteSheetArr[spriteCnt], 'play');
			stage.addChild(bitmapArr[i]);
			if(bitmapArr[i].group == 'america'){
				bitmapArr[i].x = americaObj[spriteCnt].posX;
				bitmapArr[i].y = americaObj[spriteCnt].posY;
			}

			if(bitmapArr[i].group == 'asia'){
				bitmapArr[i].x = asiaObj[spriteCnt].posX;
				bitmapArr[i].y = asiaObj[spriteCnt].posY;
			}

			bitmapArr[i].id = manifest[i].id;
			bitmapArr[i].name = manifest[i].name;
			bitmapArr[i].group = manifest[i].group;
			bitmapArr[i].alpha = 0;

			// スプライトのみをコンテナに格納
			if(bitmapArr[i].group == 'title') {
				// console.log(bitmapArr[i]);
				titleContainer.addChild(bitmapArr[i]);
			} else if(bitmapArr[i].group == 'america'){
				americaContainer.addChild(bitmapArr[i]);
			} else if(bitmapArr[i].group == 'asia') {
				asiaContainer.addChild(bitmapArr[i]);
			}
			spriteCnt++;
		}
	}


//  -------------------------- < 配置場所の生成 > ------------------------------
	for(var cnt = 0; cnt < americaObj.length; cnt++) {
		spaceArr[cnt] = new createjs.Shape();
		spaceArr[cnt].graphics.beginFill('DeepSkyBlue').drawRect(0, 0, americaObj[cnt].width, americaObj[cnt].height);
		spaceArr[cnt].x = americaObj[cnt].x;
		spaceArr[cnt].y = americaObj[cnt].y;
		spaceArr[cnt].alpha = 0;
		stage.addChild(spaceArr[cnt]);
	}


//  -------------------------- < 各ボタンのイベント > ------------------------------
	// プレイボタン -------------------------------------------------------------
	bitmapArr[5].addEventListener('click', playGame);

	// アメリカステージへ ----------------------------------------------------------
	bitmapArr[8].addEventListener('click', playAmerica);
	// メニューを押して、サウンドの停止
	bitmapArr[13].addEventListener('click',backAmerica);
	americaContainer.alpha = 0;

	// アジアステージへ -------------------------------------------------------------
	bitmapArr[9].addEventListener('click', playAsia);
	// メニューを押して、サウンドの停止
	bitmapArr[36].addEventListener('click',backAsia);
	asiaContainer.alpha = 0;
}


//  ------------------------- < プレイボタンを押したら > ---------------------------
function playGame() {
	createjs.Tween.get(bitmapArr[1]).to({alpha:0}, 500); // タイトル
	createjs.Tween.get(bitmapArr[5]).to({alpha:0}, 500); // プレイボタン
	createjs.Tween.get(bitmapArr[0]).to({y:800}, 2000, createjs.Ease.getPowInOut(4)); // 背景
	createjs.Tween.get(bitmapArr[2]).to({y:-200}, 2000, createjs.Ease.getPowInOut(4)); // 金星
	createjs.Tween.get(bitmapArr[3]).to({y:-300}, 2000, createjs.Ease.getPowInOut(4)); // 土星
	createjs.Tween.get(bitmapArr[4]).to({y:2550}, 2000, createjs.Ease.getPowInOut(4)); // 地球
	goToMenu();
}


//  --------------------- < メニュー画面まで下がってきたら > -------------------------
function goToMenu() {
	createjs.Tween.get(bitmapArr[4]).wait(2000).to({rotation:60},1500, createjs.Ease.getPowInOut(3)); // 地球
	createjs.Tween.get(bitmapArr[6]).wait(3000).to({alpha:1},500); // 左ボタン
	createjs.Tween.get(bitmapArr[7]).wait(3000).to({alpha:1},500); // 右ボタン
	createjs.Tween.get(bitmapArr[8]).wait(3000).to({alpha:1},500); // アメリカの雲
	bitmapArr[6].addEventListener('click', rotateEarth);
	bitmapArr[7].addEventListener('click', rotateEarth);
}


//  ----------------------------- < 地球の回転 > ---------------------------------
currentRotation = 60;
var rotateCnt = 0; // 外に変数を書かないとゼロのままでカウントされない

function rotateEarth(evt) {
	var angle = -90; // ボタンを押した時の角度

	// もし戻るボタンを押したら
	if(evt.target.id == 'backBtn') {
		// 現在の角度に、現在から押した後の角度を引く
		currentRotation = currentRotation - angle;
		createjs.Tween.get(bitmapArr[4]).to({rotation:currentRotation},2000, createjs.Ease.getPowInOut(3));
		createjs.Tween.get(bitmapArr[6]).to({alpha:0},500).wait(1000).to({alpha:1},500);
		createjs.Tween.get(bitmapArr[7]).to({alpha:0},500).wait(1000).to({alpha:1},500);

		rotateCnt--;

		if(rotateCnt<0) {
			rotateCnt = 3;
		}
		showTitle(rotateCnt);

	// もし進むボタンを押したら
	} else if(evt.target.id == 'nextBtn') {

		rotateCnt++;

		if(rotateCnt>3) {
			rotateCnt = 0;
		}
		showTitle(rotateCnt);

		// 現在の角度に、現在から押した後の角度を足す
		currentRotation = currentRotation + angle;
		createjs.Tween.get(bitmapArr[4]).to({rotation:currentRotation},2000, createjs.Ease.getPowInOut(3));
		createjs.Tween.get(bitmapArr[6]).to({alpha:0},500).wait(1000).to({alpha:1},500);
		createjs.Tween.get(bitmapArr[7]).to({alpha:0},500).wait(1000).to({alpha:1},500);
	}


	// --------------------- < ステージタイトルの描画 > ---------------------------
	function showTitle(cnt) {
		if(cnt == 0) { // アメリカの雲の時
			createjs.Tween.get(bitmapArr[8]).wait(1500).to({alpha:1},500);
			createjs.Tween.get(bitmapArr[9]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[10]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[11]).to({alpha:0},500);
		} else if(cnt == 1) { // アフリカの雲の時
			createjs.Tween.get(bitmapArr[11]).wait(1500).to({alpha:1},500);
			createjs.Tween.get(bitmapArr[8]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[9]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[10]).to({alpha:0},500);
		} else if(cnt == 2) { // ヨーロッパの雲の時
			createjs.Tween.get(bitmapArr[10]).wait(1500).to({alpha:1},500);
			createjs.Tween.get(bitmapArr[8]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[9]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[11]).to({alpha:0},500);
		} else { // アジアの雲の時
			createjs.Tween.get(bitmapArr[9]).wait(1500).to({alpha:1},500);
			createjs.Tween.get(bitmapArr[8]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[10]).to({alpha:0},500);
			createjs.Tween.get(bitmapArr[11]).to({alpha:0},500);
		}
	}
}


//  -------------------------- < アメリカステージの時 > ----------------------------
// アメリカステージ変数 --------------------------------------------------------
// ベースサウンド
var bassInstance1;
var bassInstance2;
var bassInstance3;
var bassInstance4;
// ドラムサウンド
var drumsInstance1;
var drumsInstance2;
var drumsInstance3;
var drumsInstance4;
// キーボードサウンド
var keyboardInstance1;
var keyboardInstance2;
var keyboardInstance3;
var keyboardInstance4;
// ギターサウンド
var guitarInstance1;
var guitarInstance2;
var guitarInstance3;
var guitarInstance4;

//  アメリカステージへ -----------------------------------------------------------
function playAmerica() {
	// 二度クリックできないようにする
	bitmapArr[8].removeAllEventListeners('click'); // アメリカの雲のクリックイベントを削除
	bitmapArr[9].removeAllEventListeners('click'); // アジアの雲のクリックイベントを削除
	// bitmapArr[10].removeAllEventListeners('click'); // ヨーロッパの雲のクリックイベントを削除
	// console.log('アメリカだよ');

	stage.addChild(americaContainer);
	americaContainer.alpha = 0;
	createjs.Tween.get(titleContainer).wait(500).to({y:-100, alpha:0}, 1000);
	createjs.Tween.get(americaContainer).wait(500).to({alpha:1},1000);
	americaSound();
}


// サウンド再生 -----------------------------------------------------------------
function americaSound() {
	// サウンドの登録 -----------------------------------------------------------
	// リズム音
	createjs.Sound.registerSound(manifest[14].src, 'rhythm');
	// ベースサウンド
	createjs.Sound.registerSound(manifest[25].src, 'bass1');
	createjs.Sound.registerSound(manifest[58].src, 'bass2');
	createjs.Sound.registerSound(manifest[59].src, 'bass3');
	createjs.Sound.registerSound(manifest[60].src, 'bass4');
	// ドラムサウンド
	createjs.Sound.registerSound(manifest[28].src, 'drums1');
	createjs.Sound.registerSound(manifest[61].src, 'drums2');
	createjs.Sound.registerSound(manifest[62].src, 'drums3');
	createjs.Sound.registerSound(manifest[63].src, 'drums4');
	// キーボードサウンド
	createjs.Sound.registerSound(manifest[31].src, 'keyboard1');
	createjs.Sound.registerSound(manifest[64].src, 'keyboard2');
	createjs.Sound.registerSound(manifest[65].src, 'keyboard3');
	createjs.Sound.registerSound(manifest[66].src, 'keyboard4');
	// ギターサウンド
	createjs.Sound.registerSound(manifest[34].src, 'guitar1');
	createjs.Sound.registerSound(manifest[67].src, 'guitar2');
	createjs.Sound.registerSound(manifest[68].src, 'guitar3');
	createjs.Sound.registerSound(manifest[69].src, 'guitar4');

	// ゲームが始まった時の初期値 -------------------------------------------------
	// リズム音
	rhythmInstance = createjs.Sound.play('rhythm', {loop:-1});
	rhythmInstance.volume = 0;
	createjs.Tween.get(rhythmInstance).wait(2000).to({volume:0.5},1000);
	// ベースサウンド
	bassInstance1 = createjs.Sound.play('bass1', {loop:-1});
	bassInstance2 = createjs.Sound.play('bass2', {loop:-1});
	bassInstance3 = createjs.Sound.play('bass3', {loop:-1});
	bassInstance4 = createjs.Sound.play('bass4', {loop:-1});
	bassInstance1.volume = 0;
	bassInstance2.volume = 0;
	bassInstance3.volume = 0;
	bassInstance4.volume = 0;
	// ドラムサウンド
	drumsInstance1 = createjs.Sound.play('drums1', {loop:-1});
	drumsInstance2 = createjs.Sound.play('drums2', {loop:-1});
	drumsInstance3 = createjs.Sound.play('drums3', {loop:-1});
	drumsInstance4 = createjs.Sound.play('drums4', {loop:-1});
	drumsInstance1.volume = 0;
	drumsInstance2.volume = 0;
	drumsInstance3.volume = 0;
	drumsInstance4.volume = 0;
	// キーボードサウンド
	keyboardInstance1 = createjs.Sound.play('keyboard1', {loop:-1});
	keyboardInstance2 = createjs.Sound.play('keyboard2', {loop:-1});
	keyboardInstance3 = createjs.Sound.play('keyboard3', {loop:-1});
	keyboardInstance4 = createjs.Sound.play('keyboard4', {loop:-1});
	keyboardInstance1.volume = 0;
	keyboardInstance2.volume = 0;
	keyboardInstance3.volume = 0;
	keyboardInstance4.volume = 0;
	// ギターサウンド
	guitarInstance1 = createjs.Sound.play('guitar1', {loop:-1});
	guitarInstance2 = createjs.Sound.play('guitar2', {loop:-1});
	guitarInstance3 = createjs.Sound.play('guitar3', {loop:-1});
	guitarInstance4 = createjs.Sound.play('guitar4', {loop:-1});
	guitarInstance1.volume = 0;
	guitarInstance2.volume = 0;
	guitarInstance3.volume = 0;
	guitarInstance4.volume = 0;

	startAmerica();
}

// アイコンをドラッグできるようにするイベント
function startAmerica() {
	bitmapArr[23].addEventListener('mousedown', americaStartDrag); // ベースアイコン
	bitmapArr[26].addEventListener('mousedown', americaStartDrag); // ドラムアイコン
	bitmapArr[29].addEventListener('mousedown', americaStartDrag); // キーボードアイコン
	bitmapArr[32].addEventListener('mousedown', americaStartDrag); // ギターアイコン
}


// ドラッグする時 ---------------------------------------------------------------
function americaStartDrag(evt) {
	var instance = evt.target;
	instance.offset = {x:instance.x - evt.stageX, y:instance.y - evt.stageY};
	instance.addEventListener('pressmove', americaDrag);
	americaContainer.setChildIndex(instance, americaContainer.numChildren -1);
	// console.log(americaContainer.numChildren -1);
}


// ドラッグしてる時 ------------------------------------------------------------
function americaDrag(evt) {
	var instance = evt.target;
	var offset = instance.offset;
	instance.x = evt.stageX + offset.x;
	instance.y = evt.stageY + offset.y;
	instance.addEventListener('pressup', americaDrop);

	// 配置スペースポジションの点滅
	for(var cnt=0; cnt<americaObj.length; cnt++){
		americaObj[cnt].isHit = spaceArr[cnt].hitTest(evt.target.localToLocal(0, 0, spaceArr[cnt]).x, evt.target.localToLocal(0, 0, spaceArr[cnt]).y);
		// 赤のスペースに入ったら -----------------------------
		if(americaObj[0].isHit === true) {
			bitmapArr[16].alpha = 1;
		} else {
			bitmapArr[16].alpha = 0;
		}
		// 黄色のスペースに入ったら ----------------------------
		if(americaObj[1].isHit === true) {
			bitmapArr[18].alpha = 1;
		} else {
			bitmapArr[18].alpha = 0;
		}
		// 青のスペースに入ったら ------------------------------
		if(americaObj[2].isHit === true) {
			bitmapArr[20].alpha = 1;
		} else {
			bitmapArr[20].alpha = 0;
		}
		// 緑のスペースに入ったら ------------------------------
		if(americaObj[3].isHit === true) {
			bitmapArr[22].alpha = 1;
		} else {
			bitmapArr[22].alpha = 0;
		}
	}
}


// ドロップした時 ---------------------------------------------------------------
function americaDrop(evt) {
	// console.log('ドロップしてるよ' + evt.target);
	for(var cnt=0; cnt<americaObj.length; cnt++){
		//配置場所に置けた時
		if(americaObj[cnt].isHit === true) {
			// console.log(americaObj);
			americaObj[cnt].current = evt.target;
			saveArr = americaObj[cnt].current;

			if(saveArr == "") {
				return;
			}

			// ベースが置かれた時 ------------------------------------------------
			// ベースアイコンをを配置した時
			if(saveArr.name === 'bass' || saveArr.name === 'bassSp') {
				// アイコンを元の場所に戻す、透明にする
				bitmapArr[23].x = manifest[23].x;
				bitmapArr[23].y = manifest[23].y;
				bitmapArr[23].alpha = 0;
				// ベーススプライトの描画
				bitmapArr[24].alpha = 1;
				bitmapArr[24].x = americaObj[cnt].posX;
				bitmapArr[24].y = americaObj[cnt].posY;
				bitmapArr[24].addEventListener('mousedown', moveIconAmerica);
				// 各配置場所に置いた時のサウンドの分岐
				if(americaObj[0].isHit === true){
					createjs.Tween.get(bassInstance1).wait(0).to({volume:1},1000);
				} else if(americaObj[1].isHit === true){
					createjs.Tween.get(bassInstance2).wait(0).to({volume:1},1000);
				} else if(americaObj[2].isHit === true){
					americaContainer.setChildIndex(bitmapArr[24], 21);
					createjs.Tween.get(bassInstance3).wait(0).to({volume:1},1000);
				} else if(americaObj[3].isHit === true){
					americaContainer.setChildIndex(bitmapArr[24], 21);
					createjs.Tween.get(bassInstance4).wait(0).to({volume:1},1000);
				}

			// ドラムが置かれた時 -------------------------------------------------
			} else if(saveArr.name === 'drums' || saveArr.name === 'drumsSp') {
				bitmapArr[26].x = manifest[26].x;
				bitmapArr[26].y = manifest[26].y;
				bitmapArr[26].alpha = 0;
				// ドラムスプライトの描画
				bitmapArr[27].alpha = 1;
				bitmapArr[27].x = americaObj[cnt].posX;
				bitmapArr[27].y = americaObj[cnt].posY;
				bitmapArr[27].addEventListener('mousedown', moveIconAmerica);
				// 各配置場所に置いた時のサウンドの分岐
				if(americaObj[0].isHit === true){
					createjs.Tween.get(drumsInstance1).wait(0).to({volume:1},1000);
				} else if(americaObj[1].isHit === true){
					createjs.Tween.get(drumsInstance2).wait(0).to({volume:1},1000);
				} else if(americaObj[2].isHit === true){
					americaContainer.setChildIndex(bitmapArr[27], 21);
					createjs.Tween.get(drumsInstance3).wait(0).to({volume:1},1000);
				} else if(americaObj[3].isHit === true){
					americaContainer.setChildIndex(bitmapArr[27], 21);
					createjs.Tween.get(drumsInstance4).wait(0).to({volume:1},1000);
				}

			// キーボードが置かれた時 ----------------------------------------------
			} else if(saveArr.name === 'keyboard' || saveArr.name === 'keyboardSp') {
				bitmapArr[29].x = manifest[29].x;
				bitmapArr[29].y = manifest[29].y;
				bitmapArr[29].alpha = 0;
				// キーボードスプライトの描画
				bitmapArr[30].alpha = 1;
				bitmapArr[30].x = americaObj[cnt].posX;
				bitmapArr[30].y = americaObj[cnt].posY;
				bitmapArr[30].addEventListener('mousedown', moveIconAmerica);
				// 各配置場所に置いた時のサウンドの分岐
				if(americaObj[0].isHit === true){
					createjs.Tween.get(keyboardInstance1).wait(0).to({volume:1},1000);
				} else if(americaObj[1].isHit === true){
					createjs.Tween.get(keyboardInstance2).wait(0).to({volume:1},1000);
				} else if(americaObj[2].isHit ===true){
					americaContainer.setChildIndex(bitmapArr[30], 21);
					createjs.Tween.get(keyboardInstance3).wait(0).to({volume:1},1000);
				} else if(americaObj[3].isHit ===true){
					americaContainer.setChildIndex(bitmapArr[30], 21);
					createjs.Tween.get(keyboardInstance4).wait(0).to({volume:1},1000);
				}

			// ギターが置かれた時 ------------------------------------------------
			} else if(saveArr.name === 'guitar' || saveArr.name === 'guitarSp') {
				bitmapArr[32].x = manifest[32].x;
				bitmapArr[32].y = manifest[32].y;
				bitmapArr[32].alpha = 0;
				// ギタースプライトの描画
				bitmapArr[33].alpha = 1;
				bitmapArr[33].x = americaObj[cnt].posX;
				bitmapArr[33].y = americaObj[cnt].posY;
				bitmapArr[33].addEventListener('mousedown', moveIconAmerica);
				// 各配置場所に置いた時のサウンドの分岐
				if(americaObj[0].isHit === true){
					createjs.Tween.get(guitarInstance1).wait(0).to({volume:0.8},1000);
				} else if(americaObj[1].isHit === true){
					createjs.Tween.get(guitarInstance2).wait(0).to({volume:0.8},1000);
				} else if(americaObj[2].isHit ===true){
					americaContainer.setChildIndex(bitmapArr[33], 21);
					createjs.Tween.get(guitarInstance3).wait(0).to({volume:0.8},1000);
				} else if(americaObj[3].isHit ===true){
					americaContainer.setChildIndex(bitmapArr[33], 21);
					createjs.Tween.get(guitarInstance4).wait(0).to({volume:0.8},1000);
				}
			}


		// どこにも配置してない時にトゥイーンで戻す(アイコンでの場合も考える)
		} else {
			if( americaObj[0].isHit === false &&
				americaObj[1].isHit === false &&
				americaObj[2].isHit === false &&
				americaObj[3].isHit === false){
				// ベースアイコンとスプライトの戻し
				if(evt.target.name === 'bass' || evt.target.name === 'bassSp'){
					createjs.Tween.get(bitmapArr[23]).to({x:manifest[23].x, y:manifest[23].y},500, createjs.Ease.getPowInOut(2));
				// ドラムアイコンとスプライトの戻し
				} else if(evt.target.name === 'drums' || evt.target.name === 'drumsSp'){
					createjs.Tween.get(bitmapArr[26]).to({x:manifest[26].x, y:manifest[26].y},500, createjs.Ease.getPowInOut(2));
				// キーボードアイコンとスプライトの戻し
				} else if(evt.target.name === 'keyboard' || evt.target.name === 'keyboardSp'){
					createjs.Tween.get(bitmapArr[29]).to({x:manifest[29].x, y:manifest[29].y},500, createjs.Ease.getPowInOut(2));
				// ギターアイコンとスプライトの戻し
				} else if(evt.target.name === 'guitar' || evt.target.name === 'guitarSp'){
					createjs.Tween.get(bitmapArr[32]).to({x:manifest[32].x, y:manifest[32].y},500, createjs.Ease.getPowInOut(2));
				}
			}
		}
	}
}


// スプライト発生後、再びアイコンを動かす ---------------------------------------------------------------
function moveIconAmerica(evt){
	var instance = evt.target;
	instance.offset = {x:instance.x - evt.stageX, y:instance.y - evt.stageY};
	instance.addEventListener('pressmove', dragIconAmerica);
}

// スプライト発生後、再びアイコンをドラッグする ---------------------------------------------------------------
function dragIconAmerica(evt){
	var instance = evt.target;
	var offset = instance.offset;
	instance.x = evt.stageX + offset.x;
	instance.y = evt.stageY + offset.y;
	// スプライトについたドラッグのイベントをアイコンのイベントへ変える
	// ベーススプライト
	if(evt.target.id === 'bassSp'){
		bitmapArr[23].x = evt.stageX;
		bitmapArr[23].y = evt.stageY;

		createjs.Tween.get(bitmapArr[24]).to({alpha:0});
		createjs.Tween.get(bitmapArr[23]).to({alpha:1});
		createjs.Tween.get(bassInstance1).to({volume:0},1000);
		createjs.Tween.get(bassInstance2).to({volume:0},1000);
		createjs.Tween.get(bassInstance3).to({volume:0},1000);
		createjs.Tween.get(bassInstance4).to({volume:0},1000);
	// ドラムスプライト
	} else if(evt.target.id === 'drumsSp'){
		bitmapArr[26].x = evt.stageX;
		bitmapArr[26].y = evt.stageY;

		createjs.Tween.get(bitmapArr[27]).to({alpha:0});
		createjs.Tween.get(bitmapArr[26]).to({alpha:1});
		createjs.Tween.get(drumsInstance1).to({volume:0},1000);
		createjs.Tween.get(drumsInstance2).to({volume:0},1000);
		createjs.Tween.get(drumsInstance3).to({volume:0},1000);
		createjs.Tween.get(drumsInstance4).to({volume:0},1000);
	// キーボードスプライト
	} else if(evt.target.id === 'keyboardSp'){
		bitmapArr[29].x = evt.stageX;
		bitmapArr[29].y = evt.stageY;

		createjs.Tween.get(bitmapArr[30]).to({alpha:0});
		createjs.Tween.get(bitmapArr[29]).to({alpha:1});
		createjs.Tween.get(keyboardInstance1).to({volume:0},1000);
		createjs.Tween.get(keyboardInstance2).to({volume:0},1000);
		createjs.Tween.get(keyboardInstance3).to({volume:0},1000);
		createjs.Tween.get(keyboardInstance4).to({volume:0},1000);
	// ギタースプライト
	} else if(evt.target.id === 'guitarSp'){
		bitmapArr[32].x = evt.stageX;
		bitmapArr[32].y = evt.stageY;

		createjs.Tween.get(bitmapArr[33]).to({alpha:0});
		createjs.Tween.get(bitmapArr[32]).to({alpha:1});
		createjs.Tween.get(guitarInstance1).to({volume:0},1000);
		createjs.Tween.get(guitarInstance2).to({volume:0},1000);
		createjs.Tween.get(guitarInstance3).to({volume:0},1000);
		createjs.Tween.get(guitarInstance4).to({volume:0},1000);
	}
	americaDrag(evt);
}


//  -------------------------- < メニュー画面に戻る > -----------------------------
function backAmerica(){
	console.log('メニューに戻るよ');
	// 音声の徐々に停止(サウンドはremoveChildでは消せないので、stopで消す)
	// リズム音
	createjs.Tween.get(rhythmInstance).to({volume:0},1000);
	// ベースサウンド
	createjs.Tween.get(bassInstance1).to({volume:0},1000);
	createjs.Tween.get(bassInstance2).to({volume:0},1000);
	createjs.Tween.get(bassInstance3).to({volume:0},1000);
	createjs.Tween.get(bassInstance4).to({volume:0},1000);
	// ドラムサウンド
	createjs.Tween.get(drumsInstance1).to({volume:0},1000);
	createjs.Tween.get(drumsInstance2).to({volume:0},1000);
	createjs.Tween.get(drumsInstance3).to({volume:0},1000);
	createjs.Tween.get(drumsInstance4).to({volume:0},1000);
	// キーボードサウンド
	createjs.Tween.get(keyboardInstance1).to({volume:0},1000);
	createjs.Tween.get(keyboardInstance2).to({volume:0},1000);
	createjs.Tween.get(keyboardInstance3).to({volume:0},1000);
	createjs.Tween.get(keyboardInstance4).to({volume:0},1000);
	// ギターサウンド
	createjs.Tween.get(guitarInstance1).to({volume:0},1000);
	createjs.Tween.get(guitarInstance2).to({volume:0},1000);
	createjs.Tween.get(guitarInstance3).to({volume:0},1000);
	createjs.Tween.get(guitarInstance4).to({volume:0},1000)
			.call(function(){
				// リズム音
				rhythmInstance.stop();
				// ベースサウンド
				bassInstance1.stop();
				bassInstance2.stop();
				bassInstance3.stop();
				bassInstance4.stop();
				// ドラムサウンド
				drumsInstance1.stop();
				drumsInstance2.stop();
				drumsInstance3.stop();
				drumsInstance4.stop();
				// キーボードサウンド
				keyboardInstance1.stop();
				keyboardInstance2.stop();
				keyboardInstance3.stop();
				keyboardInstance4.stop();
				// ギターサウンド
				guitarInstance1.stop();
				guitarInstance2.stop();
				guitarInstance3.stop();
				guitarInstance4.stop();
			});

	titleContainer.alpha = 1;
	createjs.Tween.get(titleContainer).wait(500).to({alpha:1, y:0},1000);
	createjs.Tween.get(americaContainer).wait(500).to({alpha:0},1000).call(function(){
		bitmapArr[24].alpha = 0; // ベーススプライト
		bitmapArr[27].alpha = 0; // ドラムスプライト
		bitmapArr[30].alpha = 0; // キーボードスプライト
		bitmapArr[33].alpha = 0; // ギタースプライト

		// ベースアイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[23].alpha = 1;
		bitmapArr[23].x = manifest[23].x;
		bitmapArr[23].y = manifest[23].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[23].image;
		bitmapArr[23].regX = setImg.width / 2;
		bitmapArr[23].regY = setImg.height / 2;

		// ドラムアイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[26].alpha = 1;
		bitmapArr[26].x = manifest[26].x;
		bitmapArr[26].y = manifest[26].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[26].image;
		bitmapArr[26].regX = setImg.width / 2;
		bitmapArr[26].regY = setImg.height / 2;

		// キーボードアイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[29].alpha = 1;
		bitmapArr[29].x = manifest[29].x;
		bitmapArr[29].y = manifest[29].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[29].image;
		bitmapArr[29].regX = setImg.width / 2;
		bitmapArr[29].regY = setImg.height / 2;

		// ギターアイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[32].alpha = 1;
		bitmapArr[32].x = manifest[32].x;
		bitmapArr[32].y = manifest[32].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[32].image;
		bitmapArr[32].regX = setImg.width / 2;
		bitmapArr[32].regY = setImg.height / 2;


		// ステージのリムーブチャイルド ---------------------------------------------
		stage.removeChild(americaContainer);

	});



//  -------------------- < 各ステージをまた押せるようにする > ------------------------
	// アメリカステージへ
	bitmapArr[8].addEventListener('click', playAmerica);
	// アジアステージへ
	bitmapArr[9].addEventListener('click', playAsia);
	// ヨーロッパステージへ
	// bitmapArr[10].addEventListener('click', playEurope);

}




//  -------------------- < ティッカー > ------------------------
// フレームレート
createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Ticker.setFPS(30);

// ステージの更新
createjs.Ticker.addEventListener('tick', function() {
	stage.update();
});
