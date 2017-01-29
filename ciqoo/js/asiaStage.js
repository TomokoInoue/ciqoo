//  -------------------------- < アジアステージの時 > ----------------------------
// アジアステージ変数 ------------------------------------------------------------
// 鼓サウンド
var tsuzumiInstance1;
var tsuzumiInstance2;
var tsuzumiInstance3;
var tsuzumiInstance4;
// 笛子サウンド
var tekishiInstance1;
var tekishiInstance2;
var tekishiInstance3;
var tekishiInstance4;
// 二胡サウンド
var nikoInstance1;
var nikoInstance2;
var nikoInstance3;
var nikoInstance4;
// 琴サウンド
var kotoInstance1;
var kotoInstance2;
var kotoInstance3;
var kotoInstance4;

// アジアステージへ ---------------------------------------------------------------
function playAsia() {
	// 二度クリックできないようにする
	bitmapArr[8].removeAllEventListeners('click'); // アメリカの雲のクリックイベントを削除
	bitmapArr[9].removeAllEventListeners('click'); // アジアの雲のクリックイベントを削除
	// bitmapArr[10].removeAllEventListeners('click'); // ヨーロッパの雲のクリックイベントを削除
	// console.log('アジアだよ');

	stage.addChild(asiaContainer);
	asiaContainer.alpha = 0;
	createjs.Tween.get(titleContainer).wait(500).to({y:-100,alpha:0},1000);
	createjs.Tween.get(asiaContainer).wait(500).to({alpha:1},1000);
	asiaSound();
}



// サウンド再生 -----------------------------------------------------------------
function asiaSound() {
	// サウンドの登録 -----------------------------------------------------------
	// リズム音
	createjs.Sound.registerSound(manifest[37].src, 'rhythm');
	// 鼓サウンド
	createjs.Sound.registerSound(manifest[48].src, 'tsuzumi1');
	createjs.Sound.registerSound(manifest[71].src, 'tsuzumi2');
	createjs.Sound.registerSound(manifest[72].src, 'tsuzumi3');
	createjs.Sound.registerSound(manifest[73].src, 'tsuzumi4');
	// 笛子サウンド
	createjs.Sound.registerSound(manifest[51].src, 'tekishi1');
	createjs.Sound.registerSound(manifest[74].src, 'tekishi2');
	createjs.Sound.registerSound(manifest[75].src, 'tekishi3');
	createjs.Sound.registerSound(manifest[76].src, 'tekishi4');
	// 二胡サウンド
	createjs.Sound.registerSound(manifest[54].src, 'niko1');
	createjs.Sound.registerSound(manifest[77].src, 'niko2');
	createjs.Sound.registerSound(manifest[78].src, 'niko3');
	createjs.Sound.registerSound(manifest[79].src, 'niko4');
	// 琴サウンド
	createjs.Sound.registerSound(manifest[57].src, 'koto1');
	createjs.Sound.registerSound(manifest[80].src, 'koto2');
	createjs.Sound.registerSound(manifest[81].src, 'koto3');
	createjs.Sound.registerSound(manifest[82].src, 'koto4');

	// ゲームが始まった時の初期値 -------------------------------------------------
	// リズム音
	rhythmInstance = createjs.Sound.play('rhythm', {loop:-1});
	rhythmInstance.volume = 0;
	createjs.Tween.get(rhythmInstance).wait(2000).to({volume:0.5},1000);
	// 鼓サウンド
	tsuzumiInstance1 = createjs.Sound.play('tsuzumi1', {loop:-1});
	tsuzumiInstance2 = createjs.Sound.play('tsuzumi2', {loop:-1});
	tsuzumiInstance3 = createjs.Sound.play('tsuzumi3', {loop:-1});
	tsuzumiInstance4 = createjs.Sound.play('tsuzumi4', {loop:-1});
	tsuzumiInstance1.volume = 0;
	tsuzumiInstance2.volume = 0;
	tsuzumiInstance3.volume = 0;
	tsuzumiInstance4.volume = 0;
	// 笛子サウンド
	tekishiInstance1 = createjs.Sound.play('tekishi1', {loop:-1});
	tekishiInstance2 = createjs.Sound.play('tekishi2', {loop:-1});
	tekishiInstance3 = createjs.Sound.play('tekishi3', {loop:-1});
	tekishiInstance4 = createjs.Sound.play('tekishi4', {loop:-1});
	tekishiInstance1.volume = 0;
	tekishiInstance2.volume = 0;
	tekishiInstance3.volume = 0;
	tekishiInstance4.volume = 0;
	// 二胡サウンド
	nikoInstance1 = createjs.Sound.play('niko1', {loop:-1});
	nikoInstance2 = createjs.Sound.play('niko2', {loop:-1});
	nikoInstance3 = createjs.Sound.play('niko3', {loop:-1});
	nikoInstance4 = createjs.Sound.play('niko4', {loop:-1});
	nikoInstance1.volume = 0;
	nikoInstance2.volume = 0;
	nikoInstance3.volume = 0;
	nikoInstance4.volume = 0;
	// 琴サウンド
	kotoInstance1 = createjs.Sound.play('koto1', {loop:-1});
	kotoInstance2 = createjs.Sound.play('koto2', {loop:-1});
	kotoInstance3 = createjs.Sound.play('koto3', {loop:-1});
	kotoInstance4 = createjs.Sound.play('koto4', {loop:-1});
	kotoInstance1.volume = 0;
	kotoInstance2.volume = 0;
	kotoInstance3.volume = 0;
	kotoInstance4.volume = 0;

	startAsia();
}

// アイコンをドラッグできるようにするイベント
function startAsia() {
	bitmapArr[46].addEventListener('mousedown', asiaStartDrag); // 鼓アイコン
	bitmapArr[49].addEventListener('mousedown', asiaStartDrag); // 笛子アイコン
	bitmapArr[52].addEventListener('mousedown', asiaStartDrag); // 二胡アイコン
	bitmapArr[55].addEventListener('mousedown', asiaStartDrag); // 琴アイコン
}


// ドラッグする時 ---------------------------------------------------------------
function asiaStartDrag(evt) {
	var instance = evt.target;
	instance.offset = {x:instance.x - evt.stageX, y:instance.y - evt.stageY};
	instance.addEventListener('pressmove', asiaDrag);
	asiaContainer.setChildIndex(instance, asiaContainer.numChildren -1);
}

// ドラッグしてる時 ------------------------------------------------------------
function asiaDrag(evt) {
	var instance = evt.target;
	var offset = instance.offset;
	instance.x = evt.stageX + offset.x;
	instance.y = evt.stageY + offset.y;
	instance.addEventListener('pressup', asiaDrop);

	// 配置スペースポジションの点滅
	for(var cnt=0; cnt<asiaObj.length; cnt++){
		asiaObj[cnt].isHit = spaceArr[cnt].hitTest(evt.target.localToLocal(0, 0, spaceArr[cnt]).x, evt.target.localToLocal(0, 0, spaceArr[cnt]).y);
		// 赤のスペースに入ったら -----------------------------
		if(asiaObj[0].isHit === true) {
			bitmapArr[39].alpha = 1;
		} else {
			bitmapArr[39].alpha = 0;
		}
		// 黄色のスペースに入ったら ----------------------------
		if(asiaObj[1].isHit === true) {
			bitmapArr[41].alpha = 1;
		} else {
			bitmapArr[41].alpha = 0;
		}
		// 青のスペースに入ったら ------------------------------
		if(asiaObj[2].isHit === true) {
			bitmapArr[43].alpha = 1;
		} else {
			bitmapArr[43].alpha = 0;
		}
		// 緑のスペースに入ったら ------------------------------
		if(asiaObj[3].isHit === true) {
			bitmapArr[45].alpha = 1;
		} else {
			bitmapArr[45].alpha = 0;
		}
	}
}

// ドロップした時 ---------------------------------------------------------------
function asiaDrop(evt) {
	// console.log('ドロップしてるよ' + evt.target);
	for(var cnt=0; cnt<asiaObj.length; cnt++){
		//配置場所に置けた時
		if(asiaObj[cnt].isHit === true) {
			// console.log(asiaObj);
			asiaObj[cnt].current = evt.target;
			saveArr = asiaObj[cnt].current;

			if(saveArr == "") {
				return;
			}

			// 鼓が置かれた時 ------------------------------------------------
			// 鼓アイコンをを配置した時
			if(saveArr.name === 'tsuzumi' || saveArr.name === 'tsuzumiSp') {
				// アイコンを元の場所に戻す、透明にする
				bitmapArr[46].x = manifest[46].x;
				bitmapArr[46].y = manifest[46].y;
				bitmapArr[46].alpha = 0;
				// 鼓スプライトの描画
				bitmapArr[47].alpha = 1;
				bitmapArr[47].x = asiaObj[cnt].posX;
				bitmapArr[47].y = asiaObj[cnt].posY;
				bitmapArr[47].addEventListener('mousedown', moveIconAsia);
				// 各配置場所に置いた時のサウンドの分岐
				if(asiaObj[0].isHit === true){
					createjs.Tween.get(tsuzumiInstance1).wait(0).to({volume:1},1000);
				} else if(asiaObj[1].isHit === true){
					createjs.Tween.get(tsuzumiInstance2).wait(0).to({volume:1},1000);
				} else if(asiaObj[2].isHit === true){
					asiaContainer.setChildIndex(bitmapArr[47], 21);
					createjs.Tween.get(tsuzumiInstance3).wait(0).to({volume:1},1000);
				} else if(asiaObj[3].isHit === true){
					asiaContainer.setChildIndex(bitmapArr[47], 21);
					createjs.Tween.get(tsuzumiInstance4).wait(0).to({volume:1},1000);
				}

			// 笛子が置かれた時 -------------------------------------------------
			} else if(saveArr.name === 'tekishi' || saveArr.name ==='tekishiSp'){
				bitmapArr[49].x = manifest[49].x;
				bitmapArr[49].y = manifest[49].y;
				bitmapArr[49].alpha = 0;
				// 笛子スプライトの描画
				bitmapArr[50].alpha = 1;
				bitmapArr[50].x = asiaObj[cnt].posX;
				bitmapArr[50].y = asiaObj[cnt].posY;
				bitmapArr[50].addEventListener('mousedown', moveIconAsia);
				// 各配置場所に置いた時のサウンドの分岐
				if(asiaObj[0].isHit === true){
					createjs.Tween.get(tekishiInstance1).wait(0).to({volume:1},1000);
				} else if(asiaObj[1].isHit === true){
					createjs.Tween.get(tekishiInstance2).wait(0).to({volume:1},1000);
				} else if(asiaObj[2].isHit === true){
					asiaContainer.setChildIndex(bitmapArr[50], 21);
					createjs.Tween.get(tekishiInstance3).wait(0).to({volume:1},1000);
				} else if(asiaObj[3].isHit === true){
					asiaContainer.setChildIndex(bitmapArr[50], 21);
					createjs.Tween.get(tekishiInstance4).wait(0).to({volume:1},1000);
				}

			// 二胡が置かれた時 ----------------------------------------------
			} else if(saveArr.name === 'niko' || saveArr.name === 'nikoSp'){
				bitmapArr[52].x = manifest[52].x;
				bitmapArr[52].y = manifest[52].y;
				bitmapArr[52].alpha = 0;
				// 二胡スプライトの描画
				bitmapArr[53].alpha = 1;
				bitmapArr[53].x = asiaObj[cnt].posX;
				bitmapArr[53].y = asiaObj[cnt].posY;
				bitmapArr[53].addEventListener('mousedown', moveIconAsia);
				// 各配置場所に置いた時のサウンドの分岐
				if(asiaObj[0].isHit === true){
					createjs.Tween.get(nikoInstance1).wait(0).to({volume:1},1000);
				} else if(asiaObj[1].isHit === true){
					createjs.Tween.get(nikoInstance2).wait(0).to({volume:1},1000);
				} else if(asiaObj[2].isHit ===true){
					asiaContainer.setChildIndex(bitmapArr[53], 21);
					createjs.Tween.get(nikoInstance3).wait(0).to({volume:1},1000);
				} else if(asiaObj[3].isHit ===true){
					asiaContainer.setChildIndex(bitmapArr[53], 21);
					createjs.Tween.get(nikoInstance4).wait(0).to({volume:1},1000);
				}

			// 琴が置かれた時 ------------------------------------------------
			} else if(saveArr.name === 'koto' || saveArr.name === 'kotoSp'){
				bitmapArr[55].x = manifest[55].x;
				bitmapArr[55].y = manifest[55].y;
				bitmapArr[55].alpha = 0;
				// 琴スプライトの描画
				bitmapArr[56].alpha = 1;
				bitmapArr[56].x = asiaObj[cnt].posX;
				bitmapArr[56].y = asiaObj[cnt].posY;
				bitmapArr[56].addEventListener('mousedown', moveIconAsia);
				// 各配置場所に置いた時のサウンドの分岐
				if(asiaObj[0].isHit === true){
					createjs.Tween.get(kotoInstance1).wait(0).to({volume:1},1000);
				} else if(asiaObj[1].isHit === true){
					createjs.Tween.get(kotoInstance2).wait(0).to({volume:1},1000);
				} else if(asiaObj[2].isHit ===true){
					asiaContainer.setChildIndex(bitmapArr[56], 21);
					createjs.Tween.get(kotoInstance3).wait(0).to({volume:1},1000);
				} else if(asiaObj[3].isHit ===true){
					asiaContainer.setChildIndex(bitmapArr[56], 21);
					createjs.Tween.get(kotoInstance4).wait(0).to({volume:1},1000);
				}
			}


		// どこにも配置してない時にトゥイーンで戻す(アイコンでの場合も考える)
		} else {
			if( asiaObj[0].isHit === false &&
				asiaObj[1].isHit === false &&
				asiaObj[2].isHit === false &&
				asiaObj[3].isHit === false){
				// ベースアイコンとスプライトの戻し
				if(evt.target.name === 'tsuzumi' || evt.target.name === 'tsuzumiSp'){
					createjs.Tween.get(bitmapArr[46]).to({x:manifest[46].x, y:manifest[46].y},500, createjs.Ease.getPowInOut(2));
				// ドラムアイコンとスプライトの戻し
				} else if(evt.target.name === 'tekishi' || evt.target.name === 'tekishiSp'){
						createjs.Tween.get(bitmapArr[49]).to({x:manifest[49].x, y:manifest[49].y},500, createjs.Ease.getPowInOut(2));
					// キーボードアイコンとスプライトの戻し
				} else if(evt.target.name === 'niko' || evt.target.name === 'nikoSp'){
						createjs.Tween.get(bitmapArr[52]).to({x:manifest[52].x, y:manifest[52].y},500, createjs.Ease.getPowInOut(2));
					// ギターアイコンとスプライトの戻し
				} else if(evt.target.name === 'koto' || evt.target.name === 'kotoSp'){
					createjs.Tween.get(bitmapArr[55]).to({x:manifest[55].x, y:manifest[55].y},500, createjs.Ease.getPowInOut(2));
				}
			}
		}
	}
}


// スプライト発生後、再びアイコンを動かす ---------------------------------------------------------------
function moveIconAsia(evt){
	var instance = evt.target;
	instance.offset = {x:instance.x - evt.stageX, y:instance.y - evt.stageY};
	instance.addEventListener('pressmove', dragIconAsia);
}

// スプライト発生後、再びアイコンをドラッグする ---------------------------------------------------------------
function dragIconAsia(evt){
	var instance = evt.target;
	var offset = instance.offset;
	instance.x = evt.stageX + offset.x;
	instance.y = evt.stageY + offset.y;
	// スプライトについたドラッグのイベントをアイコンのイベントへ変える
	// 鼓スプライト
	if(evt.target.id === 'tsuzumiSp'){
		bitmapArr[46].x = evt.stageX;
		bitmapArr[46].y = evt.stageY;

		createjs.Tween.get(bitmapArr[47]).to({alpha:0});
		createjs.Tween.get(bitmapArr[46]).to({alpha:1});
		createjs.Tween.get(tsuzumiInstance1).to({volume:0},1000);
		createjs.Tween.get(tsuzumiInstance2).to({volume:0},1000);
		createjs.Tween.get(tsuzumiInstance3).to({volume:0},1000);
		createjs.Tween.get(tsuzumiInstance4).to({volume:0},1000);
	// 笛子スプライト
} else if(evt.target.id === 'tekishiSp'){
		bitmapArr[49].x = evt.stageX;
		bitmapArr[49].y = evt.stageY;

		createjs.Tween.get(bitmapArr[50]).to({alpha:0});
		createjs.Tween.get(bitmapArr[49]).to({alpha:1});
		createjs.Tween.get(tekishiInstance1).to({volume:0},1000);
		createjs.Tween.get(tekishiInstance2).to({volume:0},1000);
		createjs.Tween.get(tekishiInstance3).to({volume:0},1000);
		createjs.Tween.get(tekishiInstance4).to({volume:0},1000);
	// 二胡スプライト
} else if(evt.target.id === 'nikoSp'){
		bitmapArr[52].x = evt.stageX;
		bitmapArr[52].y = evt.stageY;

		createjs.Tween.get(bitmapArr[53]).to({alpha:0});
		createjs.Tween.get(bitmapArr[52]).to({alpha:1});
		createjs.Tween.get(nikoInstance1).to({volume:0},1000);
		createjs.Tween.get(nikoInstance2).to({volume:0},1000);
		createjs.Tween.get(nikoInstance3).to({volume:0},1000);
		createjs.Tween.get(nikoInstance4).to({volume:0},1000);
	// 琴スプライト
} else if(evt.target.id === 'kotoSp'){
		bitmapArr[55].x = evt.stageX;
		bitmapArr[55].y = evt.stageY;

		createjs.Tween.get(bitmapArr[56]).to({alpha:0});
		createjs.Tween.get(bitmapArr[55]).to({alpha:1});
		createjs.Tween.get(kotoInstance1).to({volume:0},1000);
		createjs.Tween.get(kotoInstance2).to({volume:0},1000);
		createjs.Tween.get(kotoInstance3).to({volume:0},1000);
		createjs.Tween.get(kotoInstance4).to({volume:0},1000);
	}
	asiaDrag(evt);
}


//  -------------------------- < メニュー画面に戻る > -----------------------------
function backAsia(){
	console.log('メニューに戻るよ');
	// 音声の徐々に停止(サウンドはremoveChildでは消せないので、stopで消す)
	// リズム音
	createjs.Tween.get(rhythmInstance).to({volume:0},1000);
	// 鼓サウンド
	createjs.Tween.get(tsuzumiInstance1).to({volume:0},1000);
	createjs.Tween.get(tsuzumiInstance2).to({volume:0},1000);
	createjs.Tween.get(tsuzumiInstance3).to({volume:0},1000);
	createjs.Tween.get(tsuzumiInstance4).to({volume:0},1000);
	// 笛子サウンド
	createjs.Tween.get(tekishiInstance1).to({volume:0},1000);
	createjs.Tween.get(tekishiInstance2).to({volume:0},1000);
	createjs.Tween.get(tekishiInstance3).to({volume:0},1000);
	createjs.Tween.get(tekishiInstance4).to({volume:0},1000);
	// 二胡サウンド
	createjs.Tween.get(nikoInstance1).to({volume:0},1000);
	createjs.Tween.get(nikoInstance2).to({volume:0},1000);
	createjs.Tween.get(nikoInstance3).to({volume:0},1000);
	createjs.Tween.get(nikoInstance4).to({volume:0},1000);
	// 琴サウンド
	createjs.Tween.get(kotoInstance1).to({volume:0},1000);
	createjs.Tween.get(kotoInstance2).to({volume:0},1000);
	createjs.Tween.get(kotoInstance3).to({volume:0},1000);
	createjs.Tween.get(kotoInstance4).to({volume:0},1000)
			.call(function(){
				// リズム音
				rhythmInstance.stop();
				// 鼓サウンド
				tsuzumiInstance1.stop();
				tsuzumiInstance2.stop();
				tsuzumiInstance3.stop();
				tsuzumiInstance4.stop();
				// 笛子サウンド
				tekishiInstance1.stop();
				tekishiInstance2.stop();
				tekishiInstance3.stop();
				tekishiInstance4.stop();
				// 二胡サウンド
				nikoInstance1.stop();
				nikoInstance2.stop();
				nikoInstance3.stop();
				nikoInstance4.stop();
				// 琴サウンド
				kotoInstance1.stop();
				kotoInstance2.stop();
				kotoInstance3.stop();
				kotoInstance4.stop();
			});

	titleContainer.alpha = 1;
	createjs.Tween.get(titleContainer).wait(500).to({alpha:1, y:0},1000);
	createjs.Tween.get(asiaContainer).wait(500).to({alpha:0},1000).call(function(){
		bitmapArr[47].alpha = 0; // 鼓スプライト
		bitmapArr[50].alpha = 0; // 笛子スプライト
		bitmapArr[53].alpha = 0; // 二胡スプライト
		bitmapArr[56].alpha = 0; // 琴スプライト

		// 鼓アイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[46].alpha = 1;
		bitmapArr[46].x = manifest[46].x;
		bitmapArr[46].y = manifest[46].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[46].image;
		bitmapArr[46].regX = setImg.width / 2;
		bitmapArr[46].regY = setImg.height / 2;

		// 笛子アイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[49].alpha = 1;
		bitmapArr[49].x = manifest[49].x;
		bitmapArr[49].y = manifest[49].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[49].image;
		bitmapArr[49].regX = setImg.width / 2;
		bitmapArr[49].regY = setImg.height / 2;

		// 二胡アイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[52].alpha = 1;
		bitmapArr[52].x = manifest[52].x;
		bitmapArr[52].y = manifest[52].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[52].image;
		bitmapArr[52].regX = setImg.width / 2;
		bitmapArr[52].regY = setImg.height / 2;

		// 琴アイコンの描画位置を再設定 ------------------------------------------
		bitmapArr[55].alpha = 1;
		bitmapArr[55].x = manifest[55].x;
		bitmapArr[55].y = manifest[55].y;
		// それぞれのbitmapの幅と高さを1/2に設定し、基準点を真ん中に設定する
		var setImg = bitmapArr[55].image;
		bitmapArr[55].regX = setImg.width / 2;
		bitmapArr[55].regY = setImg.height / 2;


		// ステージのリムーブチャイルド ---------------------------------------------
		stage.removeChild(americaContainer);

	});


//  -------------------- < 各ステージをまた押せるようにする > ------------------------
	// アメリカステージへ
	bitmapArr[8].addEventListener('click', playAmerica);
	// アジア
	bitmapArr[9].addEventListener('click', playAsia);
	// ヨーロッパ
	// bitmapArr[10].addEventListener('click', playEurope);

}
