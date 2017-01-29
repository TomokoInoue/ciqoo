// 配置場所のオブジェクト -----------------------------------------------------
var americaObj = [
	// アメリカステージの配置場所オブジェクト
	{ // 左上
		isHit:false,
		current:'',
		id:'1',
		x:0,
		y:400,
		posX:310,
		posY:680,
		width:770,
		height:1000
	},
	{ // 右上
		isHit:false,
		current:'',
		id:'2',
		x:770,
		y:400,
		posX:810,
		posY:680,
		width:770,
		height:1000
	},
	{ // 左下
		isHit:false,
		current:'',
		id:'3',
		x:0,
		y:1400,
		posX:80,
		posY:990,
		width:770,
		height:400
	},
	{ // 右下
		isHit:false,
		current:'',
		id:'4',
		x:770,
		y:1400,
		posX:1010,
		posY:990,
		width:770,
		height:400
	},
];

var asiaObj = [
	// アジアステージの配置場所オブジェクト
	{ // 左上
		isHit:false,
		current:'',
		id:'1',
		x:0,
		y:400,
		posX:310,
		posY:660,
		width:770,
		height:1000
	},
	{ // 右上
		isHit:false,
		current:'',
		id:'2',
		x:770,
		y:400,
		posX:790,
		posY:660,
		width:770,
		height:1000
	},
	{ // 左下
		isHit:false,
		current:'',
		id:'3',
		x:0,
		y:1400,
		posX:80,
		posY:960,
		width:770,
		height:400
	},
	{ // 右下
		isHit:false,
		current:'',
		id:'4',
		x:770,
		y:1400,
		posX:1010,
		posY:960,
		width:770,
		height:400
	},
];


//  ------------------------ << マニフェスト >> ----------------------------
var manifest = [
//  ------------------------ < タイトル画面 > ---------------------------
	{ // 背景 #0
		src:'img/title/titleBackground.png',
		x:768,
		y:1530,
		alpha:1,
		id:'titleBackground',
		group:'title'
	},
	{ // タイトル #1
		src:'img/title/title.png',
		x:768,
		y:500,
		alpha:1,
		id:'title',
		group:'title'
	},
	{ // 金星 #2
		src:'img/title/kinsei.png',
		x:180,
		y:950,
		alpha:1,
		id:'kinsei',
		group:'title'
	},
	{ // 土星 #3
		src:'img/title/dosei.png',
		x:1300,
		y:200,
		alpha:1,
		id:'dosei',
		group:'title'
	},
	{ // 地球 #4
		src:'img/menu/earth.png',
		x:768,
		y:3000,
		alpha:1,
		id:'earth',
		group:'title'
	},
	{ // プレイボタン #5
		src:'img/title/playBtn.png',
		x:768,
		y:1200,
		alpha:1,
		id:'playBtn',
		group:'title'
	},


//  -------------------------- < メニュー画面 > ----------------------------
	{ // 左ボタン #6
		src:'img/menu/backBtn.png',
		x:144,
		y:800,
		alpha:0,
		id:'backBtn',
		group:'title'
	},
	{ // 右ボタン #7
		src:'img/menu/nextBtn.png',
		x:1392,
		y:800,
		alpha:0,
		id:'nextBtn',
		group:'title'
	},
	{ // アメリカの雲 #8
		src:'img/menu/americaCloud.png',
		x:768,
		y:400,
		alpha:0,
		group:'title'
	},
	{ // アジアの雲 #9
		src:'img/menu/asiaCloud.png',
		x:768,
		y:400,
		alpha:0,
		group:'title'
	},
	{ // ヨーロッパの雲 #10
		src:'img/menu/europeCloud.png',
		x:768,
		y:400,
		alpha:0,
		group:'title'
	},
	{ // アフリカの雲 #11
		src:'img/menu/africaCloud.png',
		x:768,
		y:400,
		alpha:0,
		group:'title'
	},


//  -------------------------- < アメリカステージ > ----------------------------
	{	// 背景 #12
		src:'img/americaStage/background.png',
		x:768,
		y:1024,
		group:'america',
		alpha:1
	},
	{ // メニューボタン #13
		src:'img/menu/menuBtn.png',
		x:100,
		y:100,
		group:'america',
		name:'menuBtn',
		alpha:1
	},
	{ // ステージサウンド #14
		src:'sound/americaStage/rythm.wav',
		group:'america'
	},


//  ---------------- < アメリカの配置スペースポジション > ----------------------------
	{ // 赤・off #15
		src:'img/positions/redPositionOff.png',
		x:530,
		y:1295,
		alpha:1,
		group:'america'
	},
	{ // 赤・on #16
		src:'img/positions/redPositionOn.png',
		x:530,
		y:1295,
		alpha:0,
		group:'america'
	},
	{ // 黄色・off #17
		src:'img/positions/yellowPositionOff.png',
		x:1010,
		y:1295,
		alpha:1,
		group:'america'
	},
	{ // 黄色・on #18
		src:'img/positions/yellowPositionOn.png',
		x:1010,
		y:1295,
		alpha:0,
		group:'america'
	},
	{ // 青・off #19
		src:'img/positions/bluePositionOff.png',
		x:300,
		y:1600,
		alpha:1,
		group:'america'
	},
	{ // 青・on #20
		src:'img/positions/bluePositionOn.png',
		x:300,
		y:1600,
		alpha:0,
		group:'america'
	},
	{ // 緑・off #21
		src:'img/positions/greenPositionOff.png',
		x:1240,
		y:1600,
		alpha:1,
		group:'america'
	},
	{ // 緑・on #22
		src:'img/positions/greenPositionOn.png',
		x:1240,
		y:1600,
		alpha:0,
		group:'america'
	},


	// ベース -------------------------------------------------------
	{	// ベースアイコン #23
		src:'img/americaStage/icon/bassIcon.png',
		x:240,
		y:1880,
		name:'bass',
		id:'bass',
		group:'america',
		alpha:1
	},
	{	// ベーススプライト #24
		src:'img/americaStage/sp/bassSp.png',
		name:'bassSp',
		id:'bassSp',
		group:'america',
		alpha:0,
		spriteData:{
			images:['img/americaStage/sp/bassSp.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,19]
			}
		}
	},
	{ // ベースサウンド #25
		src:'sound/americaStage/bass1.wav',
		group:'america'
	},


	// ドラム ------------------------------------------------------------
	{ // ドラムアイコン #26
		src:'img/americaStage/icon/drumsIcon.png',
		x:580,
		y:1880,
		name:'drums',
		id:'drums',
		group:'america',
		alpha:1
	},
	{	// ドラムスプライト #27
		src:'img/americaStage/sp/drumsSp.png',
		name:'drumsSp',
		id:'drumsSp',
		group:'america',
		alpha:0,
		spriteData:{
			images:['img/americaStage/sp/drumsSp.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,9]
			}
		}
	},
	{ // ドラムサウンド #28
		src:'sound/americaStage/drums1.wav',
		group:'america'
	},


	// キーボード -------------------------------------------------------
	{	// キーボードアイコン #29
		src:'img/americaStage/icon/keyboardIcon.png',
		x:950,
		y:1880,
		name:'keyboard',
		id:'keyboard',
		group:'america',
		alpha:1
	},
	{	// キーボードスプライト #30
		src:'img/americaStage/sp/keyboardSP.png',
		name:'keyboardSp',
		id:'keyboardSp',
		group:'america',
		alpha:0,
		spriteData:{
			images:['img/americaStage/sp/keyboardSP.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,19]
			}
		}
	},
	{ // キーボードサウンド #31
		src:'sound/americaStage/keyboard1.wav',
		group:'america'
	},


	// ギター ---------------------------------------------------------
	{	// ギターアイコン #32
		src:'img/americaStage/icon/guitarIcon.png',
		x:1300,
		y:1880,
		name:'guitar',
		id:'guitar',
		group:'america',
		alpha:1
	},
	{	// ギタースプライト #33
		src:'img/americaStage/sp/guitarSp.png',
		name:'guitarSp',
		id:'guitarSp',
		group:'america',
		alpha:0,
		spriteData:{
			images:['img/americaStage/sp/guitarSp.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,15]
			}
		}
	},
	{ // ギターサウンド #34
		src:'sound/americaStage/guitar1.wav',
		group:'america'
	},


//  -------------------------- < アジアステージ > ----------------------------
	{ // 背景 #35
		src:'img/asiaStage/background.png',
		x:768,
		y:1024,
		group:'asia',
		alpha:1
	},
	{ // メニューボタン #36
		src:'img/menu/menuBtn.png',
		x:100,
		y:100,
		group:'asia',
		name:'menuBtn',
		alpha:1
	},
	{ // ステージサウンド #37
		src:'sound/asiaStage/mokugyo.wav',
		group:'asia'
	},


	// ------------------ < アジアの配置スペースポジション > ------------------------
	{ // 赤・off #38
		src:'img/positions/redPositionOff.png',
		x:530,
		y:1295,
		alpha:1,
		group:'asia'
	},
	{ // 赤・on #39
		src:'img/positions/redPositionOn.png',
		x:530,
		y:1295,
		alpha:0,
		group:'asia'
	},
	{ // 黄色・off #40
		src:'img/positions/yellowPositionOff.png',
		x:1010,
		y:1295,
		alpha:1,
		group:'asia'
	},
	{ // 黄色・on #41
		src:'img/positions/yellowPositionOn.png',
		x:1010,
		y:1295,
		alpha:0,
		group:'asia'
	},
	{ // 青・off #42
		src:'img/positions/bluePositionOff.png',
		x:300,
		y:1600,
		alpha:1,
		group:'asia'
	},
	{ // 青・on #43
		src:'img/positions/bluePositionOn.png',
		x:300,
		y:1600,
		alpha:0,
		group:'asia'
	},
	{ // 緑・off #44
		src:'img/positions/greenPositionOff.png',
		x:1240,
		y:1600,
		alpha:1,
		group:'asia'
	},
	{ // 緑・on #45
		src:'img/positions/greenPositionOn.png',
		x:1240,
		y:1600,
		alpha:0,
		group:'asia'
	},


	// 鼓 -------------------------------------------------------
	{	// 鼓アイコン #46
		src:'img/asiaStage/icon/tsuzumiIcon.png',
		x:240,
		y:1880,
		name:'tsuzumi',
		id:'tsuzumi',
		group:'asia',
		alpha:1
	},
	{	// 鼓スプライト #47
		src:'img/asiaStage/sp/tsuzumiSp.png',
		name:'tsuzumiSp',
		id:'tsuzumiSp',
		group:'asia',
		alpha:0,
		spriteData:{
			images:['img/asiaStage/sp/tsuzumiSp.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,59]
			}
		}
	},
	{ // 鼓サウンド #48
		src:'sound/asiaStage/tsuzumi1.wav',
		group:'asia'
	},


	// 笛子 ------------------------------------------------------------
	{	// 笛子アイコン #49
		src:'img/asiaStage/icon/tekishiIcon.png',
		x:580,
		y:1880,
		name:'tekishi',
		id:'tekishi',
		group:'asia',
		alpha:1
	},
	{	// 笛子スプライト #50
		src:'img/asiaStage/sp/tekishiSP.png',
		name:'tekishiSp',
		id:'tekishiSp',
		group:'asia',
		alpha:0,
		spriteData:{
			images:['img/asiaStage/sp/tekishiSP.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,49]
			}
		}
	},
	{ // 笛子サウンド #51
		src:'sound/asiaStage/tekishi1.wav',
		group:'asia'
	},


	// 二胡 -------------------------------------------------------
	{	// 二胡アイコン #52
		src:'img/asiaStage/icon/nikoIcon.png',
		x:950,
		y:1880,
		name:'niko',
		id:'niko',
		group:'asia',
		alpha:1
	},
	{	// 二胡スプライト #53
		src:'img/asiaStage/sp/nikoSp.png',
		name:'nikoSp',
		id:'nikoSp',
		group:'asia',
		alpha:0,
		spriteData:{
			images:['img/asiaStage/sp/nikoSp.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,79]
			}
		}
	},
	{ // 二胡サウンド #54
		src:'sound/asiaStage/niko1.wav',
		group:'asia'
	},


	// 琴 ---------------------------------------------------------
	{	// 琴アイコン #55
		src:'img/asiaStage/icon/kotoIcon.png',
		x:1300,
		y:1880,
		name:'koto',
		id:'koto',
		group:'asia',
		alpha:1
	},
	{	// 琴スプライト #56
		src:'img/asiaStage/sp/kotoSp.png',
		name:'kotoSp',
		id:'kotoSp',
		group:'asia',
		alpha:0,
		spriteData:{
			images:['img/asiaStage/sp/kotoSp.png'],
			frames:{width:450, height:650},
			animations:{
				play:[0,29]
			}
		}
	},
	{ // 琴サウンド #57
		src:'sound/asiaStage/koto1.wav',
		group:'asia'
	},


// アメリカステージの追加サウンド(今だけここに置かせて) -----------------------------------------------
{ // ベースサウンド2 #58
	src:'sound/americaStage/bass2.wav'
},
{ // ベースサウンド3 #59
	src:'sound/americaStage/bass3_1.wav'
},
{ // ベースサウンド4 #60
	src:'sound/americaStage/bass4.wav'
},


{ // ドラムサウンド2 #61
	src:'sound/americaStage/drums2.wav'
},
{ // ドラムサウンド3 #62
	src:'sound/americaStage/drums3.wav'
},
{ // ドラムサウンド4 #63
	src:'sound/americaStage/drums4.wav'
},


{ // キーボードサウンド2 #64
	src:'sound/americaStage/keyboard2.wav'
},
{ // キーボードサウンド2 #65
	src:'sound/americaStage/keyboard3.wav'
},
{ // キーボードサウンド3 #66
	src:'sound/americaStage/keyboard4.wav'
},


{ // ギターサウンド2 #67
	src:'sound/americaStage/guitar2.wav'
},
{ // ギターサウンド3 #68
	src:'sound/americaStage/guitar3.wav'
},
{ // ギターサウンド4 #69
	src:'sound/americaStage/guitar4.wav'
},

// アジアステージの追加サウンド(今だけここに置かせて) -----------------------------------------------
{ // 拍子木の音 #70
	src:'sound/asiaStage/hyoushigi.wav'
},
{ // 鼓サウンド2 #71
	src:'sound/asiaStage/tsuzumi2.wav'
},
{ // 鼓サウンド3 #72
	src:'sound/asiaStage/tsuzumi3.wav'
},
{ // 鼓サウンド4 #73
	src:'sound/asiaStage/tsuzumi4.wav'
},

{ // 笛子サウンド2 #74
	src:'sound/asiaStage/tekishi2.wav'
},
{ // 笛子サウンド3 #75
	src:'sound/asiaStage/tekishi3.wav'
},
{ // 笛子サウンド4 #76
	src:'sound/asiaStage/tekishi4.wav'
},

{ // 二胡サウンド2 #77
	src:'sound/asiaStage/niko2.wav'
},
{ // 二胡サウンド3 #78
	src:'sound/asiaStage/niko3.wav'
},
{ // 二胡サウンド4 #79
	src:'sound/asiaStage/niko4.wav'
},

{ // 琴サウンド2 #80
	src:'sound/asiaStage/koto2.wav'
},
{ // 琴サウンド3 #81
	src:'sound/asiaStage/koto3.wav'
},
{ // 琴サウンド4 #82
	src:'sound/asiaStage/koto4.wav'
}

// 変更

//  -------------------------- < ヨーロッパステージ > ----------------------------
	// { // 背景 #29
	// 	src: 'img/europeStage/background.png',
	// 	group: 'europe',
	// 	alpha: 0
	// }
];
