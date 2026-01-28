////////////////////////////////////////////////////////////
// GAME v4.4
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

var screenSettings = {
	stageW:1080, //game width
	stageH:1980, //game height
	portraitW:380, //game portrait width
	portraitH:600, //game portrait height
	fitToScreen:true, //fit to browser screen
	maintainAspectRatio:true, //maintain aspect ratio
	viewportMode:{enable:true, viewport:"portrait", text:"Rotate your device <br/>to portrait"}, //device viewport mode, portrait or landscape
}

var categorySettings = {
	status:true, //show/hide category select page
	allOption:true, //add ALL category select option
	allText:"All", //text for all category select option
	sort:true, //sort category alphatically, except All option always at last
	breadcrumb:" > ",//symbol for breadcrumb
	breadcrumbTop:"Back" //breadcrumb top level name
};

//question settings
var questionSettings = {
	totalQuestionLimit:0, //set more than 0 to limit total questions,
	randomQuestion:true, //true or false to enable randomize questions
	revealAnswer:true, //enable reveal answer
	loader:"LOADING QUESTION...", //loader text display
	totalText:"[NUMBER]/[TOTAL]", //total question text display,
	showCorrectWrong:true, //enable show correct or wrong text
	explanation:true, //enable show explanation
	correctDisplayText:"That's Correct!",
	wrongDisplayText:"Incorrect!",
};

//answer settings
var answerSettings = {
	randomAnswer:true, //true or false to enable randomize answer
	lists:true, //enable answer list style
	listsText:["A) ","B) ","C) ","D) ","E) ","F) ","G) ","H) "], //answer list style format, maximum 8
	animation:true, //enable answer animation
};

//timer settings
var timerSettings = {
	status:false, //true or false to enable timer
	mode:"countdown", //default or countdown mode
	session:"single", //single for one questions, all for whole session
	timer:25000, //total timer for countdown mode
};

//question property
var questionProperty = {
	fontSize:50,
	lineHeight:58,
	color:"#fff",
	top:25,
	left:5,
	width:90,
	height:30,
	align:"center"
};

//video property
var videoProperty = {
	top:15,
	left:30,
	width:40,
	height:41,
	autoplay:true,
	controls:true
};

//answers property
var answersProperty = {
	fontSize:40,
	lineHeight:40,
	color:"#fff",
	align:"center",
	width:30,
	height:14,
	offsetTop:-15
};

var answersButtonProperty = {
	status:true, //toggle answer button background
	roundNumber:15, //answer button background round corner number
	color:"#a2cd4a", //answer button background colour
	shadowColor:"#6fad4e", //answer button background shadow colour
	answerdColor:"#f89a31", //answered button background colour
	answerdShadowColor:"#dc4832", //answered button background shadow colour
	wrongColor:"#989898", //answered button background colour
	wrongShadowColor:"#666", //answered button background shadow colour
};

//audio settings
var audioSettings = {
	questionDelay:300, //timer delay to play question audio
	answerDelay:100, //timer delay to play answer audio
};

//answers property
var inputProperty = {
	fontSize:40,
	lineHeight:40,
	color:"#333",
	background:"#fff",
	wrongColor:"#333",
	wrongBackground:"#999",
	align:"center",
	width:20,
	height:12,
	top:50,
	left:40,
	offsetTop:-15
};

//drag drop settings
var dragDropSettings = {
	revertSpeed:0.5, //revert speed
	listEnable:false, //enable drag answer list style
	droppedAnswerAgain:true, //enable drag answer again after dropped
	randomAnswer:true, //enable drag answer display in random sequence
	dragBorder:"#fff",
	dropStroke:3,
	dropBackground:""
};

//drag drop property
var dropLabelProperty = {
	fontSize:50,
	lineHeight:50,
	color:"#fff",
	align:"right",
	offsetTop:-15
};

//group drop property
var groupDropProperty = {
	border:"#fff",
	stroke:3,
	background:"",
	dropMax:4,
	dropWidth:40,
	dropHeight:30,
	dropOffLeft:1,
	dropOffTop:3,
	fontSize:50,
	lineHeight:50,
	color:"#fff",
	align:"right",
	offsetTop:-15
};

//correct or wrong property
var correctWrongProperty = {
	fontSize:50,
	lineHeight:50,
	color:"#fff",
	align:"center",
	top:30,
	left:5,
	width:90,
	height:30
};

//explanation property
var explanationProperty = {
	fontSize:35,
	lineHeight:35,
	color:"#fff",
	align:"center",
	top:45,
	left:5,
	width:90,
	height:10
};

//result settings
var resultSettings = {
	mode:"score", //display result by "score" or "timer"
	reverse:false, //display result in reverse
	scoreText: "YOUR SCORE : [NUMBER]", //score text display
	timerText: "BEST TIME : [NUMBER]" //timer text display
};

//Social share, [SCORE] will replace with game score
var shareSettings = {
	shareEnable:true, //toggle share
	options:['facebook','twitter','whatsapp','telegram','reddit','linkedin'],
	shareTitle:"Highscore on Quiz Game 2 Game is [SCORE]pts", //social share score title
	shareMessage:"[SCORE] is mine new highscore on Quiz Game 2 Game! Try it now!", //social share score message
	customScore:true, //share a custom score to Facebook, it use customize share.php (Facebook and PHP only)
	gtag:true //Google Tag
};

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
const playerData = {score:0, answered:false, answerType:'', answer_arr:[], category:0};
const gameData = {page:'', questionNum:0, sequenceNum:0, categoryNum:0, category_arr:[], categoryThumb_arr:[], sequence_arr:[], targetArray:null, targetAnswerSequence:null, mode:'landscape', oldMode:'landscape', build:false, settings:{}, paused:true};
const storeData = {status:false, timerDate:0};

var quesLandscape_arr = [];
var quesPortrait_arr = [];
var quesLandscapeSequence_arr = [];
var quesPortraitSequence_arr = [];
const categoryData = {page:1, total:0, thumb:16, max:3, level:0, parent:'', breadcrumb:[]};

var audioLandscape_arr = [];
var audioPortrait_arr = [];
const audioData = {audioNum:0, audioInterval:null};

const timeData = {enable:false, startDate:null, nowDate:null, timer:0};

const gameSettingsObjects = ['questionSettings','answerSettings','timerSettings','resultSettings','shareSettings'];
var gameSettingsData = {};

const build_id = 0xA9C94;
const cerify_key = 'AZRbAcwKAJG6mesb_XRSlxpfGL8';

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if($('#buttonSound').hasClass('buttonSoundOn')){
			toggleSoundInMute(false);
		}
	});
	
	$(window).blur(function() {
		if($('#buttonSound').hasClass('buttonSoundOn')){
			toggleSoundInMute(true);
		}
	});

	$('#buttonStart').click(function() {
		playSound('soundClick');
		
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			if(checkMemberProceed()){
				if(memberData.category){
					goPage('category');
				}else{
					postMemberQuestionStart();
				}
			}
		}else{
			if(categorySettings.status){
				goPage('category');
			}else{
				goPage('game');
			}
		}
    });
	
	$('#buttonNextCat').click(function() {
		playSound('soundClick');
		toggleCategory(true);
    });
	
	$('#buttonPrevCat').click(function() {
		playSound('soundClick');
		toggleCategory(false);
    });
	
	$('#buttonOk').click(function() {
		playSound('soundClick');
		togglePop(false);
		goPage('main');
		
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			goMemberPage();	
		}
    });
	
	$('#buttonCancel').click(function() {
		playSound('soundClick');
		togglePop(false);
    });
	
	$('#buttonNextQues').click(function() {
		playSound('soundClick');
		prepareNextQuestion();
    });
	
	$('#buttonPreviewQues').click(function() {
		playSound('soundClick');
		previewQuestion();
    });
	
	$('#buttonReplay').click(function() {
		playSound('soundClick');
		if(categorySettings.status){
			goPage('category');
		}else{
        	goPage('game');
		}
    });
	
	$('#buttonFacebook').click(function() {
        shareLinks('facebook');
    });
	
	$('#buttonTwitter').click(function() {
        shareLinks('twitter');
    });
	
	$('#buttonWhatsapp').click(function() {
        shareLinks('whatsapp');
    });

	$('#buttonTelegram').click(function() {
        shareLinks('telegram');
    });

	$('#buttonReddit').click(function() {
        shareLinks('reddit');
    });

	$('#buttonLinkedin').click(function() {
        shareLinks('linkedin');
    });
	
	$('#buttonOption').click(function() {
		playSound('soundClick');
        toggleGameOption();
    });
	
	$('#buttonSound').click(function() {
		playSound('soundClick');
        toggleGameMute();
    });
	
	$('#buttonFullscreen').click(function() {
		playSound('soundClick');
        toggleFullScreen();
    });
	
	$('#buttonExit').click(function() {
		playSound('soundClick');
		toggleGameOption();
        togglePop(true);
    });
	
	$(window).focus(function() {
        //resizeGameDetail();
    });
}

/*!
 * 
 * GAME SETTINGS - This is the function that runs to store game settings
 * 
 */
function storeSettings(){
	for(var n=0; n<gameSettingsObjects.length; n++){
		if(typeof window[gameSettingsObjects[n]] != 'undefined'){
			gameSettingsData[gameSettingsObjects[n]] = {};
			
			$.each(window[gameSettingsObjects[n]], function(objKey, objValue){
				gameSettingsData[gameSettingsObjects[n]][objKey] = objValue;
			});
		}
	}
}

/*!
 * 
 * GAME STYLE - This is the function that runs to build game style
 * 
 */
function buildGameStyle(){
	$('.preloadText').html(questionSettings.loader);
	
	$('.questionResultText').html(questionSettings.correctDisplayText);	
	$('.questionResultText').attr('data-fontSize', correctWrongProperty.fontSize);
	$('.questionResultText').attr('data-lineHeight', correctWrongProperty.lineHeight);
	$('.questionResultText').css('color', correctWrongProperty.color);
	
	$('.questionResultText').css('top', correctWrongProperty.top+'%');
	$('.questionResultText').css('left', correctWrongProperty.left+'%');
	
	$('.questionResultText').css('width', correctWrongProperty.width+'%');
	$('.questionResultText').css('height', correctWrongProperty.height+'%');
	$('.questionResultText').css('text-align', correctWrongProperty.align);
	
	togglePop(false);
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
function goPage(page){
	gameData.page = page;
	$('#logoHolder').hide();
	$('#categoryHolder').hide();
	$('#gameHolder').hide();
	$('#resultHolder').hide();
	$('#buttonExit').show();
	
	var targetContainer = '';
	switch(page){
		case 'main':
			targetContainer = $('#logoHolder');
			$('#buttonExit').hide();
		break;
		
		case 'category':
			targetContainer = $('#categoryHolder');
		break;
		
		case 'game':
			targetContainer = $('#gameHolder');
			startGame();
		break;
		
		case 'result':
			targetContainer = $('#resultHolder');
			if(!shareSettings.shareEnable){
				$('#shareOption').hide();	
			}
			
			playSound('soundResult');
			stopGame();
			if(resultSettings.mode == 'score'){
				$('#resultScore').html(resultSettings.scoreText.replace('[NUMBER]', playerData.score));

				if(categorySettings.status){
					saveGame(playerData.score, gameData.category_arr[gameData.categoryNum]);
				}else{
					saveGame(playerData.score, '');
				}
			}else if(resultSettings.mode == 'timer'){
				playerData.timer = timeData.timer;
				$('#resultScore').html(resultSettings.timerText.replace('[NUMBER]', millisecondsToTime(playerData.timer)));

				if(categorySettings.status){
					saveGame(playerData.timer, gameData.category_arr[gameData.categoryNum]);
				}else{
					saveGame(playerData.timer, '');
				}
			}
			
			goScorePage('');
			
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				toggleSaveButton(false);
			}else{
				toggleSaveButton(true);
			}
		break;
	}
	
	targetContainer.show();
	TweenMax.to(targetContainer, 0, {opacity:0, overwrite:true});
	TweenMax.to(targetContainer, 1, {opacity:1, overwrite:true});
	resizeGameDetail();
}

/*!
 * 
 * BUILD CATEGORY - This is the function that runs to build category page
 * 
 */
function buildCategory(){	
	categoryData.thumb = findCategoryLevel();
	resetCategory();
	
	$('#categoryList').empty();	
	for(var c=0; c<gameData.categoryThumb_arr.length; c++){
		var createThumbnail = false;
		var thumbSrc = 'assets/item_thumb.svg';
		
		if(categoryData.level == 0){
			if(gameData.categoryThumb_arr[c].parent ==''){
				createThumbnail = true;
				if(gameData.categoryThumb_arr[c].src != ''){
					thumbSrc = gameData.categoryThumb_arr[c].src;
				}
			}
		}else{
			if(gameData.categoryThumb_arr[c].parent == categoryData.breadcrumb[categoryData.breadcrumb.length-1]){
				createThumbnail = true;
				if(gameData.categoryThumb_arr[c].src != ''){
					thumbSrc = gameData.categoryThumb_arr[c].src;
				}
			}
		}
		
		if(createThumbnail){
			var catID = '';
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				catID = 'data-id="'+gameData.categoryThumb_arr[c].id+'"';
			}
			var categoryHTML = '<li class="categoryThumb buttonClick" '+catID+'><div><img src="'+thumbSrc+'" /></div><div class="categoryTitle fontCategory resizeFont" data-fontSize="30" data-lineHeight="30">'+gameData.categoryThumb_arr[c].name+'</div></li>';
			$('#categoryList').append(categoryHTML);
		}
	}
	
	$('#categoryNav').empty();
	var breadcrumbHTML = '';
	for(var c=0; c<categoryData.breadcrumb.length; c++){
		var activeClass = 'buttonClick active';
		if(categoryData.breadcrumb.length == 1 && c == 0){
			activeClass = '';
		}else if(c == categoryData.breadcrumb.length-1){
			activeClass = '';
		}
		
		if(c != 0){
			breadcrumbHTML += '<span class="fontCategoryNav resizeFont" data-fontSize="30" data-lineHeight="30">'+categorySettings.breadcrumb+'</span>';
		}
		
		breadcrumbHTML += '<span class="categoryNavName fontCategoryNav resizeFont '+activeClass+'" data-fontSize="30" data-lineHeight="30" data-parent="'+c+'">'+categoryData.breadcrumb[c]+'</span>';
		
		if(categoryData.breadcrumb.length == 1 && c == 0){
			breadcrumbHTML = '';	
		}
	}
	
	$('#categoryNav').append(breadcrumbHTML);
	$('.categoryThumb').click(function(){
		playSound('soundClick');
		
		if(gameData.categoryLevel_arr.indexOf($(this).text()) == -1){
			gameData.categoryNum = gameData.category_arr.indexOf($(this).text());
			
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				playerData.category = $(this).attr('data-id');
				postMemberQuestionStart();
			}else{
				if(categorySettings.allOption && $(this).text() == categorySettings.allText){
					if(gameData.targetArray.length > 0){
						goPage('game');
					}else{
						alert('There are no question in selected category!');
					}
				}else{
					var categoryExist = gameData.targetArray.findIndex(x => x.category === $(this).text());
					if(categoryExist != -1){
						goPage('game');
					}else{
						alert('There are no question in selected category!');
					}
				}
			}
		}else{
			categoryData.level++;
			categoryData.breadcrumb.push($(this).text());
			
			categoryData.page = 1;
			buildCategory();
			resizeGameDetail();
		}
	});
	
	$('.categoryNavName').click(function(){
		if($(this).hasClass('active')){
			playSound('soundClick');
			
			var parentLevel = Number($(this).attr('data-parent'));
			categoryData.breadcrumb.length = parentLevel+1;
			categoryData.level = parentLevel;
			
			categoryData.page = 1;
			buildCategory();
			resizeGameDetail();
		}
	});
	
	displayCategory();
}

function buildCategoryLevel(){
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){

	}else{
		if(categorySettings.sort){
			sortOnObject(gameData.categoryThumb_arr, 'name');
			for(var c=0; c<gameData.categoryThumb_arr.length; c++){
				if(gameData.categoryThumb_arr[c].name == categorySettings.allText){
					gameData.categoryThumb_arr.push({src:gameData.categoryThumb_arr[c].src, name:gameData.categoryThumb_arr[c].name, parent:gameData.categoryThumb_arr[c].parent, settings:{}});
					gameData.categoryThumb_arr.splice(c,1);
					c = gameData.categoryThumb_arr.length;
				}
			};
		}
	}
	
	categoryData.breadcrumb.push(categorySettings.breadcrumbTop);
	
	gameData.categoryLevel_arr = [];
	for(var c=0; c<gameData.categoryThumb_arr.length; c++){
		if(gameData.categoryThumb_arr[c].parent !=''){
			gameData.categoryLevel_arr.push(gameData.categoryThumb_arr[c].parent);
		}
	};
}

function findCategoryLevel(){
	var totalCategory = 0;
	for(var t=0; t<gameData.categoryThumb_arr.length; t++){
		if(categoryData.level == 0){
			if(gameData.categoryThumb_arr[t].parent ==''){
				totalCategory++;
			}
		}else{
			if(gameData.categoryThumb_arr[t].parent == categoryData.breadcrumb[categoryData.breadcrumb.length-1]){
				totalCategory++;
			}
		}
	}
	
	return totalCategory;
}

function resetCategory(){
	if(gameData.mode == 'portrait'){
		categoryData.max = 4;
	}else{
		categoryData.max = 3;
	}
	
	categoryData.total = categoryData.thumb/categoryData.max;
	if (String(categoryData.total).indexOf('.') > -1){
		categoryData.total=Math.floor(categoryData.total)+1;
	}
	
	displayCategory();
}

function toggleCategory(con){
	if(con){
		categoryData.page++;
		categoryData.page = categoryData.page > categoryData.total ? categoryData.total : categoryData.page;
	}else{
		categoryData.page--;
		categoryData.page = categoryData.page < 1 ? 1 : categoryData.page;
	}
	displayCategory();	
}

function displayCategory(){
	$('#buttonPrevCat').hide();
	$('#buttonNextCat').hide();
	
	var startPageNum = (categoryData.page-1) * categoryData.max;
	var endPageNum = startPageNum + categoryData.max;
	
	if(categoryData.page > 1){
		$('#buttonPrevCat').show();
	}
	
	if(categoryData.total > 1 && categoryData.page != categoryData.total){
		$('#buttonNextCat').show();
	}
	
	$('#categoryList li').hide();
	$('#categoryList li').each(function(index, element) {
        if(index >= startPageNum && index < endPageNum){
			$(this).show();
		}
    });
}

/*!
 * 
 * FILTER CATEGORY - This is the function that runs to filter category
 * 
 */
function filterCategoryQuestion(){
	gameData.sequence_arr = [];
	for(var n=0;n<gameData.targetArray.length;n++){
		gameData.sequence_arr.push(n);
	}
	
	if($.editor.enable){
		return;
	}
	
	//do nothing if category page is off
	if(!categorySettings.status){
		return;
	}
	
	//do nothing if category all is selected
	if(categorySettings.allOption && gameData.category_arr[gameData.categoryNum] == categorySettings.allText){
		return;
	}
	
	//filter the category
	gameData.sequence_arr = [];
	for(var n=0;n<gameData.targetArray.length;n++){
		if(gameData.category_arr[gameData.categoryNum] == gameData.targetArray[n].category){
			gameData.sequence_arr.push(n);
		}
	}
}

/*!
 * 
 * RETRIEVE CATEGORY SETTINGS - This is the function that runs to retrieve category settings
 * 
 */
function checkCategorySettings(){
	//reset
	for(var n=0; n<gameSettingsObjects.length; n++){
		$.each(gameSettingsData[gameSettingsObjects[n]], function(objKey, objValue){
			window[gameSettingsObjects[n]][objKey] = gameSettingsData[gameSettingsObjects[n]][objKey];
		});
	}

	//retrieve
	var categoryIndex = gameData.categoryThumb_arr.findIndex(x => x.id === String(playerData.category));
	if(categoryIndex != -1){
		var retrieveCategorySettings = gameData.categoryThumb_arr[categoryIndex].settings;
		$.each(retrieveCategorySettings, function(objSKey, objSValue){
			//exist settings
			if(gameSettingsObjects.indexOf(objSKey) != -1){
				//exist settings value
				$.each(objSValue, function(objKey, objValue){
					if(window[objSKey][objKey] != undefined){
						window[objSKey][objKey] = retrieveCategorySettings[objSKey][objKey];
					}
				});
			}
		});
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	checkCategorySettings();
	
	gameData.paused = setGameLaunch();
	gameData.questionNum = 0;
	gameData.sequenceNum = 0;
	playerData.score = 0;
	
	timeData.accumulate = 0;
	timeData.countdown = timerSettings.timer;
	updateTimerDisplay(true);
	$('.gameTimer').hide();
	
	$('#gameStatus .gameQuestionStatus').html('');
	toggleResult(true);
	
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		
	}else{
		filterCategoryQuestion();
		if(questionSettings.randomQuestion && !$.editor.enable){
			shuffle(gameData.sequence_arr);	
		}

		loadQuestion();
	}
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	TweenMax.killAll(false, true, false);
	$('.questionHolder').remove();
}

function saveGame(score, type){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * LOAD QUESTION - This is the function that runs to load new question
 * 
 */
function loadQuestion(){
	createjs.Sound.stop();
	
	$('#questionHolder').show();
	$('#questionResultHolder').hide();
	
	storeData.timerDate = 0;
	storeData.status = false;
	
	toggleQuestionLoader(true);
	removeSoundAssets();
	resetQuestion();
	fileFest=[];
	gameData.build = false;
	playerData.answered = false;
	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		gameData.sequenceNum = 0;
	}
		
	var randomAnswerLayout = false;
	if(answerSettings.randomAnswer && !$.editor.enable){
		randomAnswerLayout = true;
	}
	
	if(gameData.targetArray[gameData.sequenceNum].answers.drag == 'true' && dragDropSettings.randomAnswer && !$.editor.enable){
		randomAnswerLayout = true;	
	}
	
	//landscape & portrait
	quesLandscapeSequence_arr = [];
	quesPortraitSequence_arr = [];
	
	audioLandscape_arr=[];
	audioPortrait_arr=[];
	
	for(var t=0; t<2; t++){
		var loopTargetArray = t == 0 ? quesLandscape_arr : quesPortrait_arr;
		var loopTargetSeqArray = t == 0 ? quesLandscapeSequence_arr : quesPortraitSequence_arr;
		var loopAudioArray = t == 0 ? audioLandscape_arr : audioPortrait_arr;
		var thisMode = t == 0 ? 'landscape' : 'portrait';
		
		var submitButton = -1;
		for(var n=0;n<loopTargetArray[gameData.sequenceNum].answers.answer.length;n++){
			if(loopTargetArray[gameData.sequenceNum].answers.answer[n].submit == 'false' || loopTargetArray[gameData.sequenceNum].answers.answer[n].submit == undefined){
				loopTargetSeqArray.push(n);
			}else{
				submitButton = n;
			}
		}
		
		if(loopTargetArray[gameData.sequenceNum].background.text != '' && loopTargetArray[gameData.sequenceNum].background.text != undefined){
			fileFest.push({src:loopTargetArray[gameData.sequenceNum].background.text, id:thisMode+'backgroundImage', type: createjs.LoadQueue.IMAGE})
		}
		
		if(loopTargetArray[gameData.sequenceNum].type == 'image'){
			fileFest.push({src:loopTargetArray[gameData.sequenceNum].text, id:thisMode+'questionImage', type: createjs.LoadQueue.IMAGE})
		}
		
		var questionAudio = loopTargetArray[gameData.sequenceNum].audio;
		questionAudio = questionAudio == undefined ? '' : questionAudio;
		
		if(questionAudio != ''){
			loopAudioArray.push({type:'question', id:thisMode+'questionAudio', list:0});
			fileFest.push({src:loopTargetArray[gameData.sequenceNum].audio, id:thisMode+'questionAudio'})
		}
		
		if(randomAnswerLayout){
			shuffle(loopTargetSeqArray);
		}

		if(submitButton != -1){
			loopTargetSeqArray.push(submitButton);
		}
		
		for(var n=0;n<loopTargetArray[gameData.sequenceNum].groups.length;n++){
			var groupAudio = loopTargetArray[gameData.sequenceNum].groups[n].audio;
			groupAudio = groupAudio == undefined ? '' : groupAudio;
			
			if(groupAudio != ''){
				loopAudioArray.push({type:'group', id:thisMode+'groupAudio'+n, list:n});
				fileFest.push({src:loopTargetArray[gameData.sequenceNum].groups[n].audio, id:thisMode+'groupAudio'+n})
			}
		}
		
		for(var n=0;n<loopTargetArray[gameData.sequenceNum].answers.answer.length;n++){
			if(loopTargetArray[gameData.sequenceNum].answers.answer[n].type == 'image'){
				fileFest.push({src:loopTargetArray[gameData.sequenceNum].answers.answer[n].text, id:thisMode+'answerImage'+n, type: createjs.LoadQueue.IMAGE})
			}
			
			if(loopTargetArray[gameData.sequenceNum].answers.answer[n].dropLabelType == 'image'){
				fileFest.push({src:loopTargetArray[gameData.sequenceNum].answers.answer[n].dropLabelText, id:thisMode+'answerLabelImage'+n, type: createjs.LoadQueue.IMAGE})
			}
			
			var answerNum = loopTargetSeqArray[n];
			var answerAudio = loopTargetArray[gameData.sequenceNum].answers.answer[answerNum].audio;
			answerAudio = answerAudio == undefined ? '' : answerAudio;
			
			if(answerAudio != '' && checkBoolean(loopTargetArray[gameData.sequenceNum].answers.answer[answerNum].dragEnable)){
				loopAudioArray.push({type:'answer', id:thisMode+'answerAudio'+answerNum, list:n});
				fileFest.push({src:loopTargetArray[gameData.sequenceNum].answers.answer[answerNum].audio, id:thisMode+'answerAudio'+answerNum})
			}
		}
		
		for(var n=0;n<loopTargetArray[gameData.sequenceNum].inputs.length;n++){
			if(loopTargetArray[gameData.sequenceNum].inputs[n].type == 'image'){
				fileFest.push({src:loopTargetArray[gameData.sequenceNum].inputs[n].text, id:thisMode+'inputImage'+n, type: createjs.LoadQueue.IMAGE})
			}
		}
		
		if(loopTargetArray[gameData.sequenceNum].explanation.type == 'image'){
			fileFest.push({src:loopTargetArray[gameData.sequenceNum].explanation.text, id:thisMode+'explanationImage', type: createjs.LoadQueue.IMAGE})
		}
		
		var explanationAudio = loopTargetArray[gameData.sequenceNum].explanation.audio;
		explanationAudio = explanationAudio == undefined ? '' : explanationAudio;
		
		if(explanationAudio != ''){
			loopAudioArray.push({type:'explanation', id:thisMode+'explanationAudio', list:0});
			fileFest.push({src:loopTargetArray[gameData.sequenceNum].explanation.audio, id:thisMode+'explanationAudio'});
		}
	}
	
	
	if(fileFest.length > 0){
		loadQuestionAssets();	
	}else{
		buildQuestion();
	}
}

/*!
 * 
 * BUILD QUESTION - This is the function that runs to build question
 * 
 */
function buildQuestion(){
	
	toggleQuestionLoader(false);
	stopAudio();
	toggleAudioInterval(false);
	audioData.audioNum = 0;
	resetQuestion();
	
	if(gameData.mode == 'landscape'){
		gameData.targetArray = quesLandscape_arr;
		gameData.targetAnswerSequence = quesLandscapeSequence_arr;
		gameData.targetAudio = audioLandscape_arr;
	}else{
		gameData.targetArray = quesPortrait_arr;
		gameData.targetAnswerSequence = quesPortraitSequence_arr;
		gameData.targetAudio = audioPortrait_arr;	
	}
	
	//total display
	var curQuestionText = questionSettings.totalText.replace('[NUMBER]', (gameData.questionNum+1));
	var totalQuestionsLength = gameData.sequence_arr.length;
	
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		totalQuestionsLength = gameData.questionList.length;	
	}
	
	if(questionSettings.totalQuestionLimit != 0){
		var totalMax = questionSettings.totalQuestionLimit > totalQuestionsLength ? totalQuestionsLength : questionSettings.totalQuestionLimit;
		curQuestionText = curQuestionText.replace('[TOTAL]', totalMax);
	}else{	
		curQuestionText = curQuestionText.replace('[TOTAL]', totalQuestionsLength);
	}
	$('#gameStatus .gameQuestionStatus').html(curQuestionText);
	
	buildBackground();
	
	//questions
	var value = getArrayValue('question');
	if(value.type == 'image'){
		var questionHTML = '<div class="question fontQuestion fitImg" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].text+'" /></div>';
	}else{
		var questionHTML = '<div class="question fontQuestion resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+';  text-align:'+value.align+'; top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; height:'+value.height+'%; ">'+gameData.targetArray[gameData.sequenceNum].text+'</div>';
	}
	$('#questionHolder').append(questionHTML);
	
	playerData.answerRevealed = false;
	playerData.answerResult = false;

	buildGroups();
	buildAnswers();
	buildInputs();
	buildVideo();
	buildExplanation();
	gameData.build = true;
	resizeGameDetail();
	
	if(playerData.answered){
		presetAnswered();
		return;	
	}
	
	if(gameData.targetAudio.length == 0){
		initAnimateAnswers();
	}else if(gameData.targetAudio.length == 1 && gameData.targetAudio[0].type == 'question'){
		initAnimateAnswers();	
	}
	
	if($.editor.enable){
		if(edit.con == 'explanation'){
			$('#questionResultHolder').show();
			$('#questionHolder').hide();
			playerData.answered = true;
			playAudioLoop('explanation');
			$('#explanationHolder').show();
		}
		setBorderFocus();
	}
	
	if($.editor.enable && !edit.replay){
		return;	
	}
	
	updateTimerDisplay(false);
	$('#questionHolder').css('opacity', 0);
	TweenMax.to($('#questionHolder'), .5, {alpha:1, overwrite:true, onComplete:function(){
		if(gameData.targetAudio.length > 0){
			playAudioLoop();
		}
		
		toggleGameTimer(true);
		storeData.status = true;
	}});
}

function resetQuestion(){	
	$('#questionHolder').empty();	
	$('#explanationHolder').empty();
}

function buildBackground(){
	//questions
	var value = getArrayValue('background');
	if(value.image != ''){
		var bgHolderHTML = '<div id="bgHolder"></div>'
		$('#questionHolder').append(bgHolderHTML);
		
		var backgroundHTML = '<div class="background fitImg" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].background.text+'" /></div>';
		$('#bgHolder').append(backgroundHTML);
	}
}

/*!
 * 
 * GET ARRAY VALUE - This is the function that runs to get array value
 * 
 */
function getArrayValue(type, answerNum, n){
	var value = {type:'', submit:'', text:'', top:'', left:'', width:'', height:'', fontSize:'', lineHeight:'', color:'', background:'', align:'', correctAnswer:''};
	
	if(type == 'background'){
		value.image = !checkValue(gameData.targetArray[gameData.sequenceNum].background.text) ? '' : gameData.targetArray[gameData.sequenceNum].background.text;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].background.top) ? 0 : gameData.targetArray[gameData.sequenceNum].background.top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].background.left) ? 0 : gameData.targetArray[gameData.sequenceNum].background.left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].background.width) ? 100 : gameData.targetArray[gameData.sequenceNum].background.width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].background.height) ? 100 : gameData.targetArray[gameData.sequenceNum].background.height;
	}else if(type == 'question'){
		value.type = gameData.targetArray[gameData.sequenceNum].type;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].top) ? questionProperty.top : gameData.targetArray[gameData.sequenceNum].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].left) ? questionProperty.left : gameData.targetArray[gameData.sequenceNum].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].width) ? questionProperty.width : gameData.targetArray[gameData.sequenceNum].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].height) ? questionProperty.height : gameData.targetArray[gameData.sequenceNum].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].fontSize) ? questionProperty.fontSize : gameData.targetArray[gameData.sequenceNum].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].lineHeight) ? questionProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].color) ? questionProperty.color : gameData.targetArray[gameData.sequenceNum].color;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].align) ? questionProperty.align : gameData.targetArray[gameData.sequenceNum].align;
	}else if(type == 'video'){
		value.embed = gameData.targetArray[gameData.sequenceNum].videos[answerNum].embed;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].top) ? videoProperty.top : gameData.targetArray[gameData.sequenceNum].videos[answerNum].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].left) ? videoProperty.left : gameData.targetArray[gameData.sequenceNum].videos[answerNum].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].width) ? videoProperty.width : gameData.targetArray[gameData.sequenceNum].videos[answerNum].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].height) ? videoProperty.height : gameData.targetArray[gameData.sequenceNum].videos[answerNum].height;
		value.autoplay = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay) ? videoProperty.autoplay : gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay;
		value.controls = !checkValue(gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls) ? videoProperty.controls : gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls;
	}else if(type == 'answer'){
		value.submit = gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].submit;
		value.type = gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].type;
		value.text = gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].text;	
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].top) ? questionProperty.top : gameData.targetArray[gameData.sequenceNum].answers.answer[n].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].left) ? questionProperty.left : gameData.targetArray[gameData.sequenceNum].answers.answer[n].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].width) ? answersProperty.width : gameData.targetArray[gameData.sequenceNum].answers.answer[n].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].height) ? answersProperty.height : gameData.targetArray[gameData.sequenceNum].answers.answer[n].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].fontSize) ? answersProperty.fontSize : gameData.targetArray[gameData.sequenceNum].answers.answer[n].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].lineHeight) ? answersProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].answers.answer[n].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].color) ? answersProperty.color : gameData.targetArray[gameData.sequenceNum].answers.answer[n].color;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].align) ? answersProperty.align : gameData.targetArray[gameData.sequenceNum].answers.answer[n].align;
		value.offsetTop = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].offsetTop) ? answersProperty.offsetTop : gameData.targetArray[gameData.sequenceNum].answers.answer[n].offsetTop;
		
		value.dragEnable = gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].dragEnable == 'false' ? false : true;
		value.dropEnable = gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].dropEnable == 'false' ? false : true;
		value.dropLabelType = gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].dropLabelType;
		value.dropLabelText = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].dropLabelText) ? '' : gameData.targetArray[gameData.sequenceNum].answers.answer[answerNum].dropLabelText;	
		value.dropLabelTop = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelTop) ? 0 : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelTop;
		value.dropLabelLeft = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelLeft) ? 0 : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelLeft;
		value.dropLabelWidth = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelWidth) ? 0 : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelWidth;
		value.dropLabelHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelHeight) ? 0 : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelHeight;
		value.dropLabelFontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelFontSize) ? dropLabelProperty.fontSize : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelFontSize;
		value.dropLabelLineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelLineHeight) ? dropLabelProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelLineHeight;
		value.dropLabelColor = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelColor) ? dropLabelProperty.color : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelColor;
		value.dropLabelAlign = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelAlign) ? dropLabelProperty.align : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelAlign;
		value.dropLabelOffsetTop = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelOffsetTop) ? dropLabelProperty.offsetTop : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLabelOffsetTop;
		
		value.dropLeft = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLeft) ? questionProperty.left : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropLeft;
		value.dropTop = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropTop) ? questionProperty.top : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropTop;
		value.dropWidth = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropWidth) ? answersProperty.width : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropWidth;
		value.dropHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropHeight) ? answersProperty.height : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropHeight;
		
		value.dropOffLeft = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropOffLeft) ? 0 : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropOffLeft;
		value.dropOffTop = !checkValue(gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropOffTop) ? 0 : gameData.targetArray[gameData.sequenceNum].answers.answer[n].dropOffTop;
		
	}else if(type == 'input'){
		value.type = gameData.targetArray[gameData.sequenceNum].inputs[answerNum].type;
		value.submit = gameData.targetArray[gameData.sequenceNum].inputs[answerNum].submit;
		value.correctAnswer = gameData.targetArray[gameData.sequenceNum].inputs[answerNum].correctAnswer;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].top) ? inputProperty.top : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].left) ? inputProperty.left : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].width) ? inputProperty.width : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].height) ? inputProperty.height : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].fontSize) ? inputProperty.fontSize : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].lineHeight) ? inputProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].color) ? inputProperty.color : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].color;
		value.background = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].background) ? inputProperty.background : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].background;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].align) ? inputProperty.align : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].align;
		value.offsetTop = !checkValue(gameData.targetArray[gameData.sequenceNum].inputs[answerNum].offsetTop) ? inputProperty.offsetTop : gameData.targetArray[gameData.sequenceNum].inputs[answerNum].offsetTop;	
	}else if(type == 'explanation'){
		value.type = gameData.targetArray[gameData.sequenceNum].explanation.type;
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.top) ? explanationProperty.top : gameData.targetArray[gameData.sequenceNum].explanation.top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.left) ? explanationProperty.left : gameData.targetArray[gameData.sequenceNum].explanation.left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.width) ? explanationProperty.width : gameData.targetArray[gameData.sequenceNum].explanation.width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.height) ? explanationProperty.height : gameData.targetArray[gameData.sequenceNum].explanation.height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.fontSize) ? explanationProperty.fontSize : gameData.targetArray[gameData.sequenceNum].explanation.fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.lineHeight) ? explanationProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].explanation.lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.color) ? explanationProperty.color : gameData.targetArray[gameData.sequenceNum].explanation.color;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].explanation.align) ? explanationProperty.align : gameData.targetArray[gameData.sequenceNum].explanation.align;
	}else if(type == 'group'){
		value.correctAnswer = gameData.targetArray[gameData.sequenceNum].groups[n].correctAnswer;
		value.dropMax = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropMax) ? groupDropProperty.dropMax : gameData.targetArray[gameData.sequenceNum].groups[n].dropMax;
		value.dropTop = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropTop) ? 0 : gameData.targetArray[gameData.sequenceNum].groups[n].dropTop;
		value.dropLeft = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropLeft) ? 0 : gameData.targetArray[gameData.sequenceNum].groups[n].dropLeft;
		value.dropWidth = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropWidth) ? groupDropProperty.dropWidth : gameData.targetArray[gameData.sequenceNum].groups[n].dropWidth;
		value.dropHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropHeight) ? groupDropProperty.dropHeight : gameData.targetArray[gameData.sequenceNum].groups[n].dropHeight;
		
		value.dropOffLeft = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropOffLeft) ? groupDropProperty.dropOffLeft : gameData.targetArray[gameData.sequenceNum].groups[n].dropOffLeft;
		value.dropOffTop = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].dropOffTop) ? groupDropProperty.dropOffTop : gameData.targetArray[gameData.sequenceNum].groups[n].dropOffTop;
		
		value.type = gameData.targetArray[gameData.sequenceNum].groups[n].type;
		value.text = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].text) ? '' : gameData.targetArray[gameData.sequenceNum].groups[n].text;	
		value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].top) ? 0 : gameData.targetArray[gameData.sequenceNum].groups[n].top;
		value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].left) ? 0 : gameData.targetArray[gameData.sequenceNum].groups[n].left;
		value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].width) ? 0 : gameData.targetArray[gameData.sequenceNum].groups[n].width;
		value.height = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].height) ? 0 : gameData.targetArray[gameData.sequenceNum].groups[n].height;
		value.fontSize = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].fontSize) ? groupDropProperty.fontSize : gameData.targetArray[gameData.sequenceNum].groups[n].fontSize;
		value.lineHeight = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].lineHeight) ? groupDropProperty.lineHeight : gameData.targetArray[gameData.sequenceNum].groups[n].lineHeight;
		value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].color) ? groupDropProperty.color : gameData.targetArray[gameData.sequenceNum].groups[n].color;
		value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].align) ? groupDropProperty.align : gameData.targetArray[gameData.sequenceNum].groups[n].align;
		value.offsetTop = !checkValue(gameData.targetArray[gameData.sequenceNum].groups[n].offsetTop) ? groupDropProperty.offsetTop : gameData.targetArray[gameData.sequenceNum].groups[n].offsetTop;
	}
		
	return value;	
}

function checkValue(value){
	if(value == undefined || value == ''){
		return false;
	}else{
		return true;
	}
}

/*!
 * 
 * AUDIO - This is the function that runs to play question and answer audio
 * 
 */
function playAudioLoop(con){
	if(gameData.targetAudio.length <= 0){
		return;	
	}
	
	toggleAudioInterval(false);
	if(con == 'explanation'){
		audioData.audioNum = gameData.targetAudio.length-1;
		if(gameData.targetAudio[audioData.audioNum].type == 'explanation' && playerData.answered){
			TweenMax.to(audioData, 1, {overwrite:true, onComplete:function(){
				playAudio(gameData.targetAudio[audioData.audioNum].id);
			}});
		}
	}else{
		if(gameData.targetAudio[audioData.audioNum].type == 'question'){
			playAudio(gameData.targetAudio[audioData.audioNum].id);
		}else if(gameData.targetAudio[audioData.audioNum].type == 'group'){
			playAudio(gameData.targetAudio[audioData.audioNum].id);
		}else if(gameData.targetAudio[audioData.audioNum].type == 'answer'){
			playAudio(gameData.targetAudio[audioData.audioNum].id);
			animateAnswer(gameData.targetAudio[audioData.audioNum].list);
		}
	}
}

function playAudioComplete(){
	audioData.audioNum++;
	if(audioData.audioNum < gameData.targetAudio.length){
		toggleAudioInterval(true);
	}
}

function toggleAudioInterval(con){
	if(con){
		var audioTimer = audioSettings.answerDelay;
		if(gameData.targetAudio.length > 0 && gameData.targetAudio[audioData.audioNum].type == 'question'){
			audioTimer = audioSettings.questionDelay	
		}
		audioData.audioInterval = setInterval(function(){
			playAudioLoop();
		}, audioTimer);
	}else{
		TweenMax.killTweensOf(audioData);
		clearInterval(audioData.audioInterval);
		audioData.audioInterval = null;
	}
}

/*!
 * 
 * BUILD VIDEO - This is the function that runs to build video
 * 
 */
function buildVideo(){
	if(gameData.targetArray[gameData.sequenceNum].videos[0] == undefined){
		return;
	}
	if(gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0){
		return;
	}
	
	var value = getArrayValue('video', 0);
	var videoProperty = '';
	var videoWrapperHTML = '<div id="videoHolder" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; height:'+value.height+'%;">';
	
	if(value.embed == 'youtube'){
		for(var n=0; n<gameData.targetArray[gameData.sequenceNum].videos[0].types.length; n++){
			videoWrapperHTML += gameData.targetArray[gameData.sequenceNum].videos[0].types[n].src;
		}
		videoWrapperHTML += '</div>';
	}else{
		if(value.autoplay == 'true' || value.autoplay == true){
			videoProperty += ' autoplay';
		}
		if(value.controls == 'true' || value.controls == true){
			videoProperty += ' controls';
		}
		videoWrapperHTML += '<video width="100%" height="100%"'+videoProperty+'>';
		
		for(var n=0; n<gameData.targetArray[gameData.sequenceNum].videos[0].types.length; n++){
			videoWrapperHTML += '<source src="'+gameData.targetArray[gameData.sequenceNum].videos[0].types[n].src+'" type="'+gameData.targetArray[gameData.sequenceNum].videos[0].types[n].type+'">';
		}
		videoWrapperHTML += 'Your browser does not support the video tag.';
		videoWrapperHTML += '</video>';
		videoWrapperHTML += '</div>';
	}
	
	$('#questionHolder').append(videoWrapperHTML);
	if(value.embed == 'youtube'){
		$('#videoHolder iframe').attr('data-src',$('#videoHolder iframe').attr('src'));
	}
}

/*!
 * 
 * BUILD GROUP - This is the function that runs to build groups
 * 
 */
function buildGroups(){
	if(gameData.targetArray[gameData.sequenceNum].groups.length <= 0){
		return;	
	}
	
	var groupHolderHTML = '<div id="groupHolder"></div>'
	$('#questionHolder').append(groupHolderHTML);
	
	for(var n=0;n<gameData.targetArray[gameData.sequenceNum].groups.length;n++){
		var value = getArrayValue('group', n, n);
		
		//label
		if(value.type == 'image'){
			var groupLabelWrapperHTML = "<div id='groupLabel"+n+"' class='groupDropLabel fitImg' style='width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;'><img src='"+value.text+"' /></div>";
		}else{
			var groupLabelWrapperHTML = "<div id='groupLabel"+n+"' class='groupDropLabel fontAnswer resizeFont' data-fontSize='"+value.fontSize+"' data-lineHeight='"+value.lineHeight+"' style='width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%; font-size:"+value.fontSize+"px; line-height:"+value.lineHeight+"px; color:"+value.color+"; text-align:"+value.align+";'>"+value.text+"</div>";	
		}

		$('#groupHolder').append(groupLabelWrapperHTML);

		//drop group
		var dropLeft = Number(value.dropLeft) + Number(value.dropOffLeft);
		var dropTop = Number(value.dropTop) + Number(value.dropOffTop);

		var groupDropWrapperHTML = "<div id='groupDrop"+n+"' class='groupDrop resizeBorder' data-border-color="+groupDropProperty.border+" data-border-size="+groupDropProperty.stroke+" style='width:"+value.dropWidth+"%; height:"+value.dropHeight+"%; top:"+value.dropTop+"%; left:"+value.dropLeft+"%; border:"+groupDropProperty.border+" solid "+groupDropProperty.stroke+"px; background:"+groupDropProperty.background+";' data-left='"+dropLeft+"%' data-top='"+dropTop+"%' data-offleft='"+value.dropOffLeft+"%' data-offtop='"+value.dropOffTop+"%' data-width='"+value.dropWidth+"%' data-height='"+value.dropHeight+"%' data-max='"+value.dropMax+"' data-answer='"+value.correctAnswer+"' data-id='"+n+"'></div>";

		$('#groupHolder').append(groupDropWrapperHTML);
	}
}

/*!
 * 
 * BUILD ANSWERS - This is the function that runs to build answers
 * 
 */
function buildAnswers(){
	if(gameData.targetArray[gameData.sequenceNum].answers.answer.length <= 0){
		return;	
	}
	
	var answerHolderHTML = '<div id="answerHolder"></div>'
	$('#questionHolder').append(answerHolderHTML);
	playerData.answerType = 'select';
	if(gameData.targetArray[gameData.sequenceNum].answers.drag == 'true'){
		playerData.answerType = 'drag';
	}
	
	var answerArray = gameData.targetArray[gameData.sequenceNum].answers.correctAnswer.split(',').map(function(item) {
		return parseInt(item, 10);
	});
	
	playerData.correctAnswer = [];
	for(var n=0;n<gameData.targetArray[gameData.sequenceNum].answers.answer.length;n++){
		var answerNum = gameData.targetAnswerSequence[n];
		if(answerArray.indexOf((answerNum+1)) != -1 && playerData.answerType != 'drag'){
			playerData.correctAnswer.push(n+1);
		}
		
		var value = getArrayValue('answer', answerNum, n);
		var dragLabel = getArrayValue('answer', n, n);
		
		if(value.type == 'image'){
			var answerHTML = '<div id="answer'+n+'" class="answer fitImg buttonClick" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+value.text+'" /></div>';
			$('#answerHolder').append(answerHTML);
		}else{
			var curAnswerList = '';
			if(answerSettings.lists){
				curAnswerList = answerSettings.listsText[n];
			}
			if(value.submit == 'true'){
				curAnswerList = '';
			}
			
			if(playerData.answerType == 'drag' && !dragDropSettings.listEnable){
				curAnswerList = '';	
			}
			
			var answerWrapperHTML = "<div id='answer"+n+"' class='answer resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;'></div>";
			
			$('#answerHolder').append(answerWrapperHTML);
			
			if(answersButtonProperty.status){
				var backgroundShadowHTML = "<div class='shadow resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; background:"+answersButtonProperty.shadowColor+"; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
				$('#answer'+n).append(backgroundShadowHTML);
				
				var backgroundHTML = "<div class='background resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; background:"+answersButtonProperty.color+"; width:100%; height:85%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
				$('#answer'+n).append(backgroundHTML);
			}
			
			var answerHTML = '<div id="text'+n+'" class="fontAnswer resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="position:relative; font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+';  text-align:'+value.align+';">'+curAnswerList+value.text+'</div>';
			$('#answer'+n).append(answerHTML);
			
			var clickHTML = "<div class='buttonClick resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='position:absolute; border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%;'></div>";
			$('#answer'+n).append(clickHTML);
		}
		
		$('#answer'+n).attr('data-id', n);
		$('#answer'+n).attr('data-type', value.type);
		$('#answer'+n).attr('data-submit', value.submit);
		
		if(playerData.answerType == 'drag' && value.submit != 'true'){
			if(gameData.targetArray[gameData.sequenceNum].groups.length > 0){
				$('#answer'+n).attr('data-ori-id', answerNum+1);
				$('#answer'+n).attr('data-top', value.top+'%');
				$('#answer'+n).attr('data-left', value.left+'%');
				$('#answer'+n).addClass('groupDrag');
			}else{
				if(value.dragEnable){
					$('#answer'+n).addClass('dragActive');
				}else{
					$('#answer'+n).hide();
				}

				//drop label
				if(dragLabel.dropLabelType == 'image'){
					var answerDropLabelWrapperHTML = "<div id='dropLabel"+n+"' class='dropLabel fitImg' style='width:"+dragLabel.dropLabelWidth+"%; height:"+dragLabel.dropLabelHeight+"%; top:"+dragLabel.dropLabelTop+"%; left:"+dragLabel.dropLabelLeft+"%;'><img src='"+dragLabel.dropLabelText+"' /></div>";
				}else{
					var answerDropLabelWrapperHTML = "<div id='dropLabel"+n+"' class='dropLabel fontAnswer resizeFont' data-fontSize='"+dragLabel.dropLabelFontSize+"' data-lineHeight='"+dragLabel.dropLabelLineHeight+"' style='width:"+dragLabel.dropLabelWidth+"%; height:"+dragLabel.dropLabelHeight+"%; top:"+dragLabel.dropLabelTop+"%; left:"+dragLabel.dropLabelLeft+"%; font-size:"+dragLabel.dropLabelFontSize+"px; line-height:"+dragLabel.dropLabelLineHeight+"px; color:"+dragLabel.dropLabelColor+"; text-align:"+dragLabel.dropLabelAlign+";'>"+dragLabel.dropLabelText+"</div>";	
				}

				$('#answerHolder').append(answerDropLabelWrapperHTML);

				//drop group
				var dropLeft = Number(value.dropLeft) + Number(value.dropOffLeft);
				var dropTop = Number(value.dropTop) + Number(value.dropOffTop);

				var answerDropWrapperHTML = "<div id='drop"+n+"' class='drop resizeBorder' data-border-color="+dragDropSettings.dragBorder+" data-border-size="+dragDropSettings.dropStroke+" style='width:"+value.dropWidth+"%; height:"+value.dropHeight+"%; top:"+value.dropTop+"%; left:"+value.dropLeft+"%; border:"+dragDropSettings.dragBorder+" solid "+dragDropSettings.dropStroke+"px; background:"+dragDropSettings.dropBackground+";' data-left='"+dropLeft+"%' data-top='"+dropTop+"%'></div>";

				if(dragLabel.dropEnable){
					$('#answerHolder').append(answerDropWrapperHTML);
				}

				$('#answer'+n).attr('data-top', value.top+'%');
				$('#answer'+n).attr('data-left', value.left+'%');
				$('#answer'+n).attr('data-answer', answerNum);
				$('#answer'+n).addClass('drag');
			}
		}
		
		buildAnswerEvent('#answer'+n);
	}
	
	if(playerData.answerType == 'drag'){
		setDragIndex();
	}
}

/*!
 * 
 * BUILD INPUTS - This is the function that runs to build inputs
 * 
 */
function buildInputs(){
	if(gameData.targetArray[gameData.sequenceNum].inputs.length <= 0){
		return;	
	}
	
	var answerHolderHTML = '<div id="inputHolder"></div>'
	$('#questionHolder').append(answerHolderHTML);
	playerData.answerType = 'input';
	
	for(var n=0;n<gameData.targetArray[gameData.sequenceNum].inputs.length;n++){
		var value = getArrayValue('input', n);
		
		if(value.submit == 'true'){
			if(value.type == 'image'){
				var inputHTML = '<div id="input'+n+'" class="input fitImg buttonClick" data-submit="true" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].inputs[n].text+'" /></div>';
				$('#inputHolder').append(answerHTML);
				buildInputEvent('#input'+n);
			}else if(value.type == 'text'){
				var inputWrapperHTML = "<div id='input"+n+"' class='input resizeFont resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' data-submit='true' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;'></div>";
				
				$('#inputHolder').append(inputWrapperHTML);
				
				if(answersButtonProperty.status){
					var backgroundShadowHTML = "<div class='shadow resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; background:"+answersButtonProperty.shadowColor+"; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
					$('#input'+n).append(backgroundShadowHTML);
					
					var backgroundHTML = "<div class='background resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; background:"+answersButtonProperty.color+"; width:100%; height:85%; position:absolute; top:"+value.offsetTop+"%; left:0;'></div>";
					$('#input'+n).append(backgroundHTML);
				}
				
				var inputHTML = '<div id="text'+n+'" class="fontAnswer resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="position:relative; font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+'; text-align:'+value.align+';">'+gameData.targetArray[gameData.sequenceNum].inputs[n].text+'</div>';
				$('#input'+n).append(inputHTML);
				
				var clickHTML = "<div class='buttonClick resizeBorderRadius' data-border-radius='"+answersButtonProperty.roundNumber+"' style='border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -moz-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; -webkit-border-radius: "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px "+answersButtonProperty.roundNumber+"px; width:100%; height:100%; position:absolute; top:"+value.offsetTop+"%;'></div>";
				$('#input'+n).append(clickHTML);
				
				buildInputEvent('#input'+n);
			}
		}else{
			if(value.type == 'blank'){
				//input
				var inputWrapperHTML = "<input id='input"+n+"' class='input fontAnswerInput resizeFont resizeBorderRadius' type='text' data-fontSize='"+value.fontSize+"' data-lineHeight='"+value.lineHeight+"' style='font-size:"+value.fontSize+"px; line-height:"+value.lineHeight+"px; color:"+value.color+"; background:"+value.background+"; text-align:"+value.align+"; width:"+value.width+"%; height:"+value.height+"%; top:"+value.top+"%; left:"+value.left+"%;' placeholder='"+gameData.targetArray[gameData.sequenceNum].inputs[n].text+"'></input>";
				
				$('#inputHolder').append(inputWrapperHTML);	
			}	
		}
		
		$('#input'+n).attr('data-id', n);
		$('#input'+n).attr('data-type', value.type);
		$('#input'+n).attr('data-answer', value.correctAnswer);
	}	
}

/*!
 * 
 * INIT ANIMATE ANSWERS - This is the function that runs to animate answers
 * 
 */
function initAnimateAnswers(){
	var animateDelayNum = .5;
	for(var n=0;n<gameData.targetArray[gameData.sequenceNum].answers.answer.length;n++){
		if(answerSettings.animation){
			$('#answer'+n).css('opacity',0);
			TweenMax.to($('#answer'+n), 0, {delay:animateDelayNum, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut, onComplete:animateAnswer, onCompleteParams:[n]});
			animateDelayNum+=.3;
		}
	}
}

function animateAnswer(n){
	var scaleNum = .7;
	var speedNum = 1.3;
	TweenMax.to($('#answer'+n), 0, {scaleX:.5, scaleY:.5, overwrite:true});
	TweenMax.to($('#answer'+n), speedNum, {alpha:1, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
}

/*!
 * 
 * BUILD EXPLANATION - This is the function that runs to build explanation
 * 
 */

function buildExplanation(){
	var value = getArrayValue('explanation');
	if(value.type == 'image'){
		var explanationHTML = '<div class="explanation fontExplanation fitImg" style="top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; "><img src="'+gameData.targetArray[gameData.sequenceNum].explanation.text+'" /></div>';
		
	}else{
		var explanationHTML = '<div class="explanation fontExplanation resizeFont" data-fontSize="'+value.fontSize+'" data-lineHeight="'+value.lineHeight+'" style="font-size:'+value.fontSize+'px; line-height:'+value.lineHeight+'px; color:'+value.color+';  text-align:'+value.align+'; top:'+value.top+'%; left:'+value.left+'%; width:'+value.width+'%; height:'+value.height+'%; ">'+gameData.targetArray[gameData.sequenceNum].explanation.text+'</div>';
	}
	$('#explanationHolder').append(explanationHTML);
}

/*!
 * 
 * BUILD ANSWER EVENT - This is the function that runs to build answer event
 * 
 */
function buildAnswerEvent(obj){
	if(!$.editor.enable){
		if($(obj).hasClass('groupDrag')){
			$(".groupDrag").droppable({
				accept: ".groupDrag",
				greedy: true,
				drop: function(event, ui) {
					var targetDrop = $('#groupDrop' + $(this).attr('data-drop-id'));
					updateGroupID(targetDrop, $(this), false);
					revertPosition($(this));
				}
			});
			
			$( ".groupDrag" ).draggable({
				start: function(event, ui) {
					setDragIndex($(this));
				},
				stop: function() {
					setGroupPosition();
					revertPosition($(this));
				}
			});
			
			$(".groupDrop").droppable({
				accept: ".groupDrag",
				greedy: false,
				drop: function(event, ui) {
					updateGroupID($(this), $(ui.draggable), true);
				},
				out : function(event, ui) {
					updateGroupID($(this), $(ui.draggable), false);
				}
			});
		}else if($(obj).hasClass('drag')){
			$( ".drag" ).draggable({
				start: function() {
					if($(this).hasClass('occupied')){
						if(dragDropSettings.droppedAnswerAgain){
							$(this).removeClass('occupied');
							playerData.correctAnswer.splice(1,0);
							
							var currentID = $(this).attr('id');
							$('.drop').each(function(index, element) {
                                if($(this).attr('data-drag-id') == currentID){
									$(this).attr('data-drag-id', '');	
								}
                            });
						}else{
							return false;
						}
					}else{
						setDragIndex($(this));	
					}
					
					setDragIndex($(this));
				},
				stop: function() {
					revertPosition($(this));
				}
			});
			
			$(".drop").droppable({
				accept: ".drag",
				drop: function(event, ui) {
					if($(this).hasClass('occupied')){
						if($(this).attr('data-drag-id') != ''){
							var lastDrag = $('#'+$(this).attr('data-drag-id'));
							lastDrag.removeClass('occupied');
							revertPosition(lastDrag);
						}
					}else{
						playerData.correctAnswer.push(0);
					}
					
					$(ui.draggable).addClass('occupied');
					$(ui.draggable).attr('data-top-drop', $(this).attr('data-top'));
					$(ui.draggable).attr('data-left-drop', $(this).attr('data-left'));
					
					$(this).attr('data-drag-id', ui.draggable.attr('id'));
					$(this).addClass('occupied');
				}
			});
		}else{
			$(obj).click(function(){
				if(playerData.answerType == 'drag' && $('#groupHolder .groupDrop').length){
					//group drag
					var totalGroup = 0;
					var totalDrop = 0;

					$('#groupHolder .groupDrop').each(function(index, element) {
						var groupArray = $(this).attr('data-group');
						var dropMax = Number($(this).attr('data-max'));
						
						if(dropMax > 0){
							totalDrop++;
						}
						
						groupArray = groupArray == undefined ? [] : groupArray.split(',');
						if(groupArray.length > 0){
							totalGroup++;
						}
					});
					
					//alert(totalGroup+' : '+totalDrop);
					if(totalGroup > 0){
						$('.groupDrag').draggable('disable');
						$('.groupDrop').droppable('disable');
						focusTapAnswer($(this).attr('data-id'), $(this).attr('data-type'), 'true', true);
					}
				}else  if(playerData.answerType == 'drag'){
					//drag
					var totalDrop = $('.drop').length;
					var totalDrag = $('.dragActive').length;
					
					var proceedCon = false;
					if(totalDrag < totalDrop){
						if(playerData.correctAnswer.length == $('.dragActive').length){
							proceedCon = true;
						}
					}else{
						if(playerData.correctAnswer.length == $('.drop').length){
							proceedCon = true;
						}
					}
					
					if(proceedCon){
						$('.drag').draggable('disable');
						$('.drop').droppable('disable');
						focusTapAnswer($(this).attr('data-id'), $(this).attr('data-type'), 'true', true);
					}
				}else if(playerData.correctAnswer.length > 1){
					focusTapAnswer($(this).attr('data-id'), $(this).attr('data-type'), $(this).attr('data-submit'), true);
				}else{
					focusTapAnswer($(this).attr('data-id'), $(this).attr('data-type'), 'true', false);
				}
			});	
		}
	}
}

function updateGroupID(obj, target, con){
	var groupName = playerData.answered == true ? 'data-groupanswered' : 'data-group';
	var groupArray = obj.attr(groupName);
	groupArray = groupArray == undefined ? [] : groupArray.split(',');
	
	if(con){
		/*if(groupArray.length >= Number(obj.attr('data-max'))){
			return;
		}*/
		
		target.attr('data-drop-id', obj.attr('data-id'));
		target.addClass('occupied');
		groupArray.push(target.attr('data-id'));
	}else{
		target.removeAttr('data-drop-id');
		target.removeClass('occupied');
		var removeIndex = groupArray.indexOf(target.attr('data-id'));
		if(removeIndex != -1)
			groupArray.splice(removeIndex, 1);
	}
	
	groupArray = unique(groupArray);
	if(groupArray.length == 0){
		obj.removeAttr(groupName);
	}else{
		obj.attr(groupName,groupArray);
	}
}

function removeGroupID(index, target){
	var groupName = playerData.answered == true ? 'data-groupanswered' : 'data-group';
	$('#groupHolder .groupDrop').each(function(dropIndex, dropElement) {
		if(index != dropIndex){
			var groupArray = $(this).attr(groupName);
			groupArray = groupArray == undefined ? [] : groupArray.split(',');
			
			var removeIndex = groupArray.indexOf(target.attr('data-id'));
			if(removeIndex != -1){
				groupArray.splice(removeIndex, 1);
			}
			
			if(groupArray.length == 0){
				$(dropElement).removeAttr(groupName);
			}else{
				$(dropElement).attr(groupName,groupArray);
			}
		}
	});
}

function setGroupPosition(){
	var groupName = playerData.answered == true ? 'data-groupanswered' : 'data-group';
	$('#groupHolder .groupDrop').each(function(index, element) {
		var maxItem = Number($(this).attr('data-max'));
		var currentOffTop = Number($(this).attr('data-offtop').replace('%',''));
		var currentOffLeft = Number($(this).attr('data-offleft').replace('%',''));
		var currentTop = Number($(this).attr('data-top').replace('%',''));
		var currentLeft = Number($(this).attr('data-left').replace('%',''));
		var currentWidth = Number($(this).attr('data-width').replace('%',''));
		var currentHeight = Number($(this).attr('data-height').replace('%',''));
		
		var startTop = currentTop;
		var startLeft = currentLeft;

		var groupArray = $(this).attr(groupName);
		groupArray = groupArray == undefined ? [] : groupArray.split(',');
		groupArray = groupArray.filter(function(v){return v!==''});
		
		for(var n=0; n<groupArray.length;n++){
			if(n < maxItem){
				$('#answer'+groupArray[n]).attr('data-top-drop', startTop+'%');
				$('#answer'+groupArray[n]).attr('data-left-drop', startLeft+'%');
				revertPosition($('#answer'+groupArray[n]));

				startLeft += Number(($('#answer'+groupArray[n]).outerWidth()/$('#answerHolder').outerWidth() * 100).toFixed());
				startLeft += currentOffLeft;
				
				if(Number(startLeft + (10)) >= Number(currentLeft + currentWidth)){

					startLeft = currentLeft;
					startTop +=  Number(($('#answer'+groupArray[n]).outerHeight()/$('#answerHolder').outerHeight() * 100).toFixed());
					startTop += currentOffTop/2;
				}
			}else{
				var targetDrop = $('#groupDrop' + $('#answer'+groupArray[n]).attr('data-drop-id'));
				updateGroupID(targetDrop, $('#answer'+groupArray[n]), false);
			}
		}
    });
}

function setDragIndex(obj){
	$('.answer').each(function(index, element) {
        $(this).css('z-index',10);
    });	
	
	if(obj != undefined){
		obj.css('z-index',11);
	}
}

function revertPosition(obj){
	if(obj.hasClass('occupied')){
		TweenMax.to(obj, dragDropSettings.revertSpeed,{css:{left:obj.attr('data-left-drop'), top: obj.attr('data-top-drop')}});
	}else{
		TweenMax.to(obj, dragDropSettings.revertSpeed,{css:{left:obj.attr('data-left'), top: obj.attr('data-top')}});
	}
}


/*!
 * 
 * BUILD INPUT EVENT - This is the function that runs to build input event
 * 
 */
function buildInputEvent(obj){
	if(!$.editor.enable){
		$(obj).click(function(){
			checkInputAnswer();
		});
	}
}

/*!
 * 
 * FOCUS ANSWER ANIMATION - This is the function that runs to focus on answer animation
 * 
 */

function focusTapAnswer(n, type, submit, hide){
	if(!playerData.answered){
		stopAudio();
		toggleAudioInterval(false);
		playSound('soundSelectAnswer');
		
		if(submit == 'true'){
			//for draggable, input and multiple choice answers
			toggleGameTimer(false);
			playerData.answered = true;
			if(hide){
				$('#answer'+n).hide();
			}
		}
		
		
		//reset animation
		$('#answerHolder .answer').each(function(index, element) {
			TweenMax.to($(this), 0, {scaleX:1, scaleY:1, alpha:1, overwrite:true});	
		});
		
		//asnwer selected button colour
		var currentBgColor = answersButtonProperty.answerdColor;
		var currentBgShadowColor = answersButtonProperty.answerdShadowColor;
		var curScaleNum = .5;
		
		if($('#answer'+n).hasClass('answerFocus')){
			$('#answer'+n).removeClass('answerFocus');
			currentBgColor = answersButtonProperty.color;
			currentBgShadowColor = answersButtonProperty.shadowColor;
		}else{
			$('#answer'+n).addClass('answerFocus');
		}
		
		$('#answer'+n).find('.background').css('background', currentBgColor);
		$('#answer'+n).find('.shadow').css('background', currentBgShadowColor);
		
		//answer selected image effect
		if(playerData.answerType != 'drag'){
			$('#answerHolder .answer').each(function(index, element) {
				if($(this).attr('data-type') == 'image'){
					$(this).css('opacity',.5);
					if($(this).hasClass('answerFocus')){
						$(this).css('opacity',1);	
					}
				}
			});
		}

		//select animation
		TweenMax.to($('#answer'+n), 0, {scaleX:curScaleNum, scaleY:curScaleNum, overwrite:true});
		TweenMax.to($('#answer'+n), 1, {scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
			if(playerData.answered){
				playerData.answer_arr = [];

				if(playerData.answerType == 'drag' && $('.groupDrop').length){
					$('#answerHolder .answer').each(function(index, element) {
						if($(this).attr('data-type') == 'image'){
							$(this).css('opacity',1);
						}
					});

					$('#groupHolder .groupDrop').each(function(index, element) {
						var dragGroupArr = [];
						var groupArray = $(this).attr('data-group');
						groupArray = groupArray == undefined ? [] : groupArray.split(',');

						for(var n=0; n<groupArray.length; n++){
							var answerOriID = $('#answer'+groupArray[n]).attr('data-ori-id');
							dragGroupArr.push(answerOriID);
						}
			
						playerData.answer_arr.push(dragGroupArr);
					});
					
					checkDisplayQuestionResult();
				}else if(playerData.answerType == 'drag'){
					//drag
					$('#answerHolder .answer').each(function(index, element) {
						if($(this).attr('data-type') == 'image'){
							$(this).css('opacity',1);
						}
					});

					$('#answerHolder .drop').each(function(index, element) {
						var dragID = $('#'+$(this).attr('data-drag-id')).attr('data-answer');
						playerData.answer_arr.push(Number(dragID));
					});

					checkDisplayQuestionResult();
				}else {
					//others
					$('#answerHolder .answer').each(function(index, element) {
						if($(this).hasClass('answerFocus')){
							if($(this).attr('data-submit') == undefined || $(this).attr('data-submit') == 'false'){
								playerData.answer_arr.push(Number($(this).attr('data-id')));
							}
						}
					});
					checkDisplayQuestionResult();
				}
			}
		}});
	}
}

/*!
 * 
 * CHECK RIGHT ANSWER - This is the function that runs to check right answer
 * 
 */
 
function checkAnswerCorrect(){
	var correctAnswer = false;
	var correctAnswerCount = 0;
	
	playerData.answerArray = [];
	stopVideoPlayer(true);

	if(playerData.answerType == 'drag' && $('#groupHolder .groupDrop').length){
		var totalAnswerCount = 0;
		var correctAnswerCount = 0;
		var totalDragCount = 0;
		
		$('#groupHolder .groupDrop').each(function(index, element) {
			var groupAnswerArray = $(this).attr('data-answer')
			groupAnswerArray = groupAnswerArray == '' ? [] : groupAnswerArray.split(',');
			totalAnswerCount += groupAnswerArray.length;
			
			var groupArray = $(this).attr('data-group');
			groupArray = groupArray == undefined ? [] : groupArray.split(',');
			
			var dragGroupArr = [];
			var answerOriID = '';
			for(var n=0; n<groupArray.length; n++){
				var answerOriID = $('#answer'+groupArray[n]).attr('data-ori-id');
				if(groupAnswerArray.indexOf(answerOriID) != -1){
					correctAnswerCount++;
				}
				totalDragCount++;

				dragGroupArr.push(answerOriID);
			}

			playerData.answerArray += dragGroupArr.toString() + '|';
		});

		playerData.answerArray = playerData.answerArray.substring(0, playerData.answerArray.length-1);
		
		if(totalAnswerCount == correctAnswerCount && totalAnswerCount == totalDragCount){
		 	correctAnswer = true;  
		}
	}else if(playerData.answerType == 'drag'){
		//drag and drop question
		var totalDrop = $('#answerHolder .drop').length;
		var totalDrag = $('#answerHolder .dragActive').length;
		
		$('#answerHolder .drop').each(function(index, element) {
			var dropID = $(this).attr('id').substring(4, $(this).attr('id').length);
			var dragID = $('#'+$(this).attr('data-drag-id')).attr('data-answer');
			
			playerData.answerArray.push(Number(dragID)+1);
			if(dropID == dragID){
				correctAnswerCount++;
			}
		});

		playerData.answerArray = playerData.answerArray.toString();
		
		if(totalDrag < totalDrop){
			if(correctAnswerCount == totalDrag){
				correctAnswer = true;
			}
		}else{
			if(correctAnswerCount == totalDrop){
				correctAnswer = true;
			}
		}
	}else if(playerData.answerType == 'select'){
		for(var n=0; n<playerData.answer_arr.length; n++){
			playerData.answerArray.push(gameData.targetAnswerSequence[playerData.answer_arr[n]] + 1);
		}
		playerData.answerArray = playerData.answerArray.toString();
		
		//multiple choices select
		for(var n=0;n<playerData.answer_arr.length;n++){
			var currentAnswer = playerData.answer_arr[n]+1;
			if(playerData.correctAnswer.indexOf(currentAnswer) != -1){
				correctAnswerCount++;	
			}
		}
		
		if(correctAnswerCount == playerData.correctAnswer.length && playerData.answer_arr.length == playerData.correctAnswer.length){
			correctAnswer = true;
		}
	}else if(playerData.answerType == 'input'){
		//input question
		var totalInput = $('#inputHolder input').length;
		$('#inputHolder input').each(function(index, element) {
			var userAnswer = playerData.answer_arr[index];
			playerData.answerArray.push(userAnswer);

			var thisAnswer = $(this).attr('data-answer').split(",");
			if(thisAnswer.indexOf(userAnswer) != -1) {
				correctAnswerCount++;	
			}
		});	

		playerData.answerArray = playerData.answerArray.toString();
		
		if(correctAnswerCount == totalInput){
			correctAnswer = true;
		}
	}
	
	return correctAnswer;
}

function checkInputAnswer(){
	if(!playerData.answered){
		var proceedInput = false;

		var totalInput = $('#inputHolder input').length;
		var totalCount = 0;
		
		playerData.answer_arr = [];
		$('#inputHolder input').each(function(index, element) {
			if($(this).val() != ''){
				playerData.answer_arr.push($(this).val());
				totalCount++;
			}
		});
		
		if(totalInput == totalCount){
			proceedInput = true;
		}	
		
		if(proceedInput){
			//hide submit
			$('#inputHolder .input').each(function(index, element) {
				if($(this).attr('data-submit') == 'true'){
					$(this).hide();
				}
			});
			
			playSound('soundClick');
			toggleGameTimer(false);
			stopAudio();
			toggleAudioInterval(false);
			playerData.answered = true;
			
			$("#inputHolder input").prop('disabled', true);
			checkDisplayQuestionResult();
		}
	}
}

/*!
 * 
 * DISPLAY QUESTION RESULT - This is the function that runs to display question result
 * 
 */
function checkDisplayQuestionResult(){
	if(!playerData.answerRevealed){
		playerData.answerRevealed = true;
		playerData.answerCorrectStatus = checkAnswerCorrect();
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			postMemberProgress();
		}else{
			returnToQuestion();
		}
	}
}

function returnToQuestion(){
	if(playerData.answerResult){
		toggleResult(false);
		goPage('result');
	}else{
		animateCorrectAnswers();
	}
}

function animateCorrectAnswers(){
	var answerCorrectStatus = checkAnswerCorrect();
	var proceedAnimate = false;
	
	if(!answerCorrectStatus){
		if(questionSettings.revealAnswer){
			proceedAnimate = true;
		}
	}

	if(!proceedAnimate){
		displayQuestionResult();
		return;
	}

	if(playerData.answerType == 'input'){
		$('#inputHolder input').each(function(index, element) {
			var thisAnswer = $(this).attr('data-answer').split(",");
			if(thisAnswer.indexOf($(this).val()) == -1) {
				$(this).val(thisAnswer);
				$(this).css('background', inputProperty.wrongColor);
				$(this).css('background', inputProperty.wrongBackground);
			}

			TweenMax.to($(this), 0, {scaleX:.5, scaleY:.5, overwrite:true});
			TweenMax.to($(this), 1, {scaleX:1, scaleY:1, alpha:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
				TweenMax.to($(this), 0, {delay:1, overwrite:true, onComplete:function(){
					gameData.displayTween = true;
					displayQuestionResult();
				}});
			}});
		});
	}else if(playerData.answerType == 'drag' && $('.groupDrop').length){
		$('#groupHolder .groupDrop').each(function(dropIndex, dropElement) {
			var groupArray = $(this).attr('data-group');
			if(groupArray != undefined){
				$(this).attr('data-groupanswered', $(this).attr('data-group'));
			}
		});
		
		var revertPos = [];
		$('#answerHolder .answer').each(function(index, element) {
			var answerOriID = $(this).attr('data-ori-id');
			var answerID = $(this).attr('data-id');
			var targetAnswer = $(this);
			
			if(answerOriID != undefined){
				//not submit button
				
				var foundInGroup = false;
				$('#groupHolder .groupDrop').each(function(dropIndex, dropElement) {
					var groupAnswerArray = $(this).attr('data-answer').split(',');
					var groupArray = $(this).attr('data-groupanswered');
					groupArray = groupArray == undefined ? [] : groupArray.split(',');

					var answerInCorrectGroup = groupAnswerArray.indexOf(answerOriID);
					var answerInGroup = groupArray.indexOf(String(answerID));
					
					if(answerInCorrectGroup != -1 && !foundInGroup){
						foundInGroup = true;
						
						//is in the  group
						if(answerInGroup == -1){
							if(targetAnswer.attr('data-type') == 'image'){
								targetAnswer.css('opacity',.8);
							}
							targetAnswer.removeClass('answerFocus');
							targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
							targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
							
							targetAnswer.removeClass('occupied');
							removeGroupID(dropIndex, targetAnswer);
							updateGroupID($(dropElement), targetAnswer, true);
						}

					}
				});
				
				if(!foundInGroup){
					targetAnswer.removeClass('answerFocus');
					targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
					targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
					
					removeGroupID(-1, targetAnswer);
					targetAnswer.removeClass('occupied');
					revertPos.push(targetAnswer);
				}
				
				TweenMax.to(targetAnswer, 0, {delay:1, overwrite:true, onComplete:function(){
					displayQuestionResult();
				}});
			}
		});
		
		setGroupPosition();
		for(var n=0; n<revertPos.length; n++){
			revertPosition(revertPos[n]);
		}
	}else if(playerData.answerType == 'drag'){
		$('#answerHolder .answer').each(function(index, element) {
			var answerNum = $(this).attr('data-answer');
			if($('#drop'+answerNum).length == 0){
				var targetAnswer = $(this);
				if(targetAnswer.attr('data-type') == 'image'){
					targetAnswer.css('opacity',.8);
				}
				targetAnswer.removeClass('answerFocus');
				targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
				targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);		
			}
		});
		
		$('#answerHolder .drop').each(function(index, element) {
			var dropID = $(this).attr('id').substring(4, $(this).attr('id').length);
			var dragID = $('#'+$(this).attr('data-drag-id')).attr('data-answer');
			
			var targetAnswer = $('#'+$(this).attr('data-drag-id'));
			if(dropID != dragID){
				if(targetAnswer.attr('data-type') == 'image'){
					targetAnswer.css('opacity',.8);
				}
				targetAnswer.removeClass('answerFocus');
				targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
				targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
			}
			
			TweenMax.to(targetAnswer, 0, {delay:1, overwrite:true, onComplete:function(){
				displayQuestionResult();
			}});
		});
		
		$('#answerHolder .answer').each(function(index, element) {
			var answerNum = $(this).attr('data-answer');
			if($('#drop'+answerNum).length){
				$(this).addClass('occupied');
				$(this).attr('data-top-drop', $('#drop'+answerNum).attr('data-top'));
				$(this).attr('data-left-drop', $('#drop'+answerNum).attr('data-left'));
			}else{
				$(this).removeClass('occupied');
			}
			revertPosition($(this));
		});
	}else {
		//others

		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-type') == 'image'){
				$(this).css('opacity',.5);
			}
		});
		
		for(var n=0;n<playerData.answer_arr.length;n++){
			var currentAnswer = playerData.answer_arr[n];
			$('#answer'+currentAnswer).removeClass('answerFocus');
			$('#answer'+currentAnswer).find('.background').css('background', answersButtonProperty.wrongColor);
			$('#answer'+currentAnswer).find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
		}
		
		for(var n=0;n<playerData.correctAnswer.length;n++){
			var currentAnswer = playerData.correctAnswer[n]-1;
			$('#answer'+currentAnswer).addClass('answerFocus');
			$('#answer'+currentAnswer).find('.background').css('background', answersButtonProperty.answerdColor);
			$('#answer'+currentAnswer).find('.shadow').css('background', answersButtonProperty.answerdShadowColor);
			
			TweenMax.to($('#answer'+currentAnswer), 0, {scaleX:.5, scaleY:.5, overwrite:true});
			TweenMax.to($('#answer'+currentAnswer), 1, {scaleX:1, scaleY:1, alpha:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
				TweenMax.to($('#answer'+currentAnswer), 0, {delay:1, overwrite:true, onComplete:function(){
					displayQuestionResult();
				}});
			}});
		}
	}
}

function displayQuestionResult(){
	if(questionSettings.showCorrectWrong){
		if(playerData.answerCorrectStatus){
			playSound('soundAnswerCorrect');
			playerData.score++;
			$('.questionResultText').html(questionSettings.correctDisplayText);
		}else{
			playSound('soundAnswerWrong');
			$('.questionResultText').html(questionSettings.wrongDisplayText);
		}
		
		TweenMax.killTweensOf($('.questionResultText'));
		TweenMax.to($('.questionResultText'), 0, {scaleX:.8, scaleY:.8, alpha:0, overwrite:true});
		TweenMax.to($('.questionResultText'), 1, {delay:.2, scaleX:1, scaleY:1, alpha:1, ease:Elastic.easeOut, overwrite:true});
			
		if(questionSettings.explanation){
			playAudioLoop('explanation');
			$('#explanationHolder').show();	
		}else{
			$('#explanationHolder').hide();	
		}
		
		$('#questionHolder').hide();
		$('#questionResultHolder').show();
		$('#questionResultHolder').css('opacity',0);
		
		TweenMax.to($('#questionResultHolder'), 1, {alpha:1, overwrite:true, onComplete:function(){
			
		}});
	}else{
		prepareNextQuestion();
	}
}

function presetAnswered(){
	TweenMax.killAll();
	
	stopVideoPlayer(true)

	TweenMax.to($('.questionResultText'), 0, {scaleX:1, scaleY:1, overwrite:true});
	if(playerData.answerType == 'select'){
		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-submit') == 'true'){
				$(this).hide();
			}
		});
		
		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-type') == 'image'){
				$(this).css('opacity',.5);
			}
		});
		
		for(var n=0;n<playerData.answer_arr.length;n++){
			var currentAnswer = playerData.answer_arr[n];
			$('#answer'+currentAnswer).removeClass('answerFocus');
			$('#answer'+currentAnswer).find('.background').css('background', answersButtonProperty.wrongColor);
			$('#answer'+currentAnswer).find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
		}
		
		if(questionSettings.revealAnswer){
			for(var n=0;n<playerData.correctAnswer.length;n++){
				var currentAnswer = playerData.correctAnswer[n]-1;
				$('#answer'+currentAnswer).addClass('answerFocus');
				$('#answer'+currentAnswer).find('.background').css('background', answersButtonProperty.answerdColor);
				$('#answer'+currentAnswer).find('.shadow').css('background', answersButtonProperty.answerdShadowColor);
				
				TweenMax.to($('#answer'+currentAnswer), 0, {scaleX:.5, scaleY:.5, overwrite:true});
				TweenMax.to($('#answer'+currentAnswer), 1, {scaleX:1, scaleY:1, alpha:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
					TweenMax.to($('#answer'+currentAnswer), 0, {delay:1, overwrite:true});
				}});	
			}
		}
	}else if(playerData.answerType == 'input'){
		$('#inputHolder .input').each(function(index, element) {
			if($(this).attr('data-submit') == 'true'){
				$(this).hide();
			}
		});

		$('#inputHolder input').each(function(index, element) {
			$(this).val(playerData.answer_arr[index]);
			
			if(questionSettings.revealAnswer){
				var thisAnswer = $(this).attr('data-answer').split(",");
				if(thisAnswer.indexOf($(this).val()) == -1) {
					$(this).val(thisAnswer);
					$(this).css('background', inputProperty.wrongColor);
					$(this).css('background', inputProperty.wrongBackground);
				}
			}
		});
	}else if(playerData.answerType == 'drag' && $('.groupDrop').length){
		$('.groupDrag').draggable('disable');
		$('.groupDrop').droppable('disable');

		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-submit') == 'true'){
				$(this).hide();
			}
		});

		var tempAnswer = [];
		$('#groupHolder .groupDrop').each(function(dropIndex, dropElement) {
			var groupArr = [];
			for(var n =0; n<playerData.answer_arr[dropIndex].length; n++){
				$('#answerHolder .answer').each(function(aIndex, aElement) {
					if($(aElement).attr('data-ori-id') == String(playerData.answer_arr[dropIndex][n])){
						updateGroupID($(dropElement), $(aElement), true);
						groupArr.push($(aElement).attr('data-id'));
					}
				});
			}

			tempAnswer.push(groupArr);
			$(this).attr('data-groupanswered', groupArr.toString());
		});

		setGroupPosition();

		if(questionSettings.revealAnswer){
			var revertPos = [];
			$('#answerHolder .answer').each(function(index, element) {
				var answerOriID = $(this).attr('data-ori-id');
				var answerID = $(this).attr('data-id');
				var targetAnswer = $(this);
				
				if(answerOriID != undefined){
					//not submit button
					
					var foundInGroup = false;
					$('#groupHolder .groupDrop').each(function(dropIndex, dropElement) {
						var groupAnswerArray = $(this).attr('data-answer').split(',');
						var groupArray = tempAnswer[dropIndex];

						var answerInCorrectGroup = groupAnswerArray.indexOf(answerOriID);
						var answerInGroup = groupArray.indexOf(String(answerID));
						
						if(answerInCorrectGroup != -1 && !foundInGroup){
							foundInGroup = true;
							
							//is in the  group
							if(answerInGroup == -1){
								if(targetAnswer.attr('data-type') == 'image'){
									targetAnswer.css('opacity',.8);
								}
								targetAnswer.removeClass('answerFocus');
								targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
								targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
								
								targetAnswer.removeClass('occupied');
								removeGroupID(dropIndex, targetAnswer);
								updateGroupID($(dropElement), targetAnswer, true);
							}
						}
					});
					
					if(!foundInGroup){
						targetAnswer.removeClass('answerFocus');
						targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
						targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
						
						removeGroupID(-1, targetAnswer);
						targetAnswer.removeClass('occupied');
						revertPos.push(targetAnswer);
					}
				}
			});
			
			setGroupPosition();
			for(var n=0; n<revertPos.length; n++){
				revertPosition(revertPos[n]);
			}
		}
	}else if(playerData.answerType == 'drag'){
		$('.drag').draggable('disable');
		$('.drop').droppable('disable');

		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-submit') == 'true'){
				$(this).hide();
			}
		});

		$('#answerHolder .answer').each(function(index, element) {
			if($(this).attr('data-type') == 'image'){
				$(this).css('opacity',.5);
			}
		});
		
		$('#answerHolder .drop').each(function(index, element) {
			var dropID = $(this).attr('id').substring(4, $(this).attr('id').length);
			var targetAnswer = '';
			$('#answerHolder .answer').each(function(aIndex, aElement) {
				if($(aElement).attr('data-answer') == playerData.answer_arr[index]){
					targetAnswer = $(aElement);
				}
			});	

			if(questionSettings.revealAnswer){
				if(Number(dropID) != playerData.answer_arr[index]){
					if(targetAnswer.attr('data-type') == 'image'){
						targetAnswer.css('opacity',.8);
					}
					targetAnswer.removeClass('answerFocus');
					targetAnswer.find('.background').css('background', answersButtonProperty.wrongColor);
					targetAnswer.find('.shadow').css('background', answersButtonProperty.wrongShadowColor);
				}
			}
		});
		
		$('#answerHolder .answer').each(function(index, element) {
			var answerNum = Number($(this).attr('data-answer'));
			var dropNum = playerData.answer_arr.indexOf(answerNum);

			if(questionSettings.revealAnswer){
				var answerNum = $(this).attr('data-answer');
				dropNum = answerNum;
			}

			if($('#drop'+dropNum).length){
				$(this).addClass('occupied');
				$(this).attr('data-top-drop', $('#drop'+dropNum).attr('data-top'));
				$(this).attr('data-left-drop', $('#drop'+dropNum).attr('data-left'));
			}else{
				$(this).removeClass('occupied');
			}
			revertPosition($(this));
		});
	}

	if(playerData.answerCorrectStatus){
		$('.questionResultText').html(questionSettings.correctDisplayText);
	}else{
		$('.questionResultText').html(questionSettings.wrongDisplayText);
	}
		
	if(questionSettings.explanation){
		$('#explanationHolder').show();	
	}else{
		$('#explanationHolder').hide();	
	}
	
	$('#questionHolder').hide();
	$('#questionResultHolder').show();
	$('#questionResultHolder').css('opacity',1);
}

function previewQuestion(){
	$('#questionResultHolder').hide();
	$('#questionHolder').show();
	$('#questionHolder').css('opacity',0);
	
	playYoutubeVideo();
	TweenMax.to($('#questionHolder'), 1, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to($('#questionHolder'), 0, {delay:2, overwrite:true, onComplete:function(){
			stopVideoPlayer(true);
			$('#questionHolder').hide();
			$('#questionResultHolder').show();
			$('#questionResultHolder').css('opacity',0);
			
			TweenMax.to($('#questionResultHolder'), 1, {alpha:1, overwrite:true, onComplete:function(){
				
			}});
		}});
	}});
}

function playYoutubeVideo(){
	$('#videoHolder iframe').attr('src',$('#videoHolder iframe').attr('data-src'));	
}

function stopVideoPlayer(con){
	$("video").each(function(){
		$(this).get(0).pause();
	});	
	
	if(con){
		$('#videoHolder iframe').attr('src','');
	}
}

/*!
 * 
 * PREPARE NEXT QUESTION - This is the function that runs for next question
 * 
 */
function prepareNextQuestion(){
	toggleQuestionLoader(true);
	stopAudio();
	
	var totalQuestionsLength = gameData.sequence_arr.length;
	
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		totalQuestionsLength = gameData.questionList.length;	
	}
	
	if(questionSettings.totalQuestionLimit != 0){
		gameData.questionNum++;
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			gameData.questionIndex++;
		}
		
		var totalMax = questionSettings.totalQuestionLimit > totalQuestionsLength ? totalQuestionsLength : questionSettings.totalQuestionLimit;
		if(gameData.questionNum < totalMax){
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				loadMemberQuestion(gameData.questionList[gameData.questionIndex]);
			}else{
				loadQuestion();
			}
		}else{
			playSound('soundComplete');
			goPage('result');
		}
	}else{
		if(gameData.questionNum < totalQuestionsLength-1){
			gameData.questionNum++;
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				gameData.questionIndex++;
				loadMemberQuestion(gameData.questionList[gameData.questionIndex]);
			}else{
				loadQuestion();	
			}
		}else{
			playSound('soundComplete');
			goPage('result');
		}
	}
}

/*!
 * 
 * TOGGLE QUESTION LOADER - This is the function that runs to display question loader
 * 
 */
function toggleQuestionLoader(con){
	if(con){
		$('#questionLoaderHolder').show();
		$('#questionHolder').hide();
	}else{
		$('#questionLoaderHolder').hide();
		$('#questionHolder').show();	
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
function toggleGameTimer(con){
	$('.gameTimer').hide();
	
	if($.editor.enable){
		return;	
	}
	
	if(!timerSettings.status){
		return;	
	}
	
	$('.gameTimer').show();
	
	TweenMax.killTweensOf(timeData);
	if(con){
		if(storeData.status){
			timeData.startDate = storeData.timerDate;
		}else{
			timeData.startDate = storeData.timerDate = new Date();
		}
		loopTimer();
	}else{
		if(timerSettings.session){
			timeData.accumulate = timeData.timer;
			timeData.countdown = timeData.timer;
		}
	}
	timeData.enable = con;
}

function updateTimerDisplay(con){
	var resetDisplay = true;
	
	if(!con){
		if(timerSettings.session){
			resetDisplay = false;	
		}
	}
	
	if(resetDisplay){
		if(timerSettings.mode == 'countdown'){
			$('#gameStatus .gameTimerStatus').html(millisecondsToTime(timeData.countdown));
		}else{
			$('#gameStatus .gameTimerStatus').html('00:00');
		}
	}
}

function loopTimer(){
	TweenMax.to(timeData, .2, {overwrite:true, onComplete:updateTimer});		
}

function updateTimer(){
	timeData.nowDate = new Date();
	timeData.elapsedTime = Math.floor((timeData.nowDate.getTime() - timeData.startDate.getTime()));
	
	if(timerSettings.mode == 'default'){
		timeData.timer = timeData.elapsedTime + timeData.accumulate;
	}else if(timerSettings.mode == 'countdown'){
		timeData.timer = Math.floor(((timeData.countdown)) - (timeData.elapsedTime))
	}
	
	$('.gameTimerStatus').html(millisecondsToTime(timeData.timer));
	
	if(timeData.timer <= 0){
		playerData.answerResult = true;
		checkDisplayQuestionResult();
	}else{

		if(timeData.enable){
			loopTimer();
		}
	}
}

function toggleResult(con){
	if(con){
		$('.itemWinnerCup img').attr('src','assets/item_cup.svg');	
	}else{
		$('.itemWinnerCup img').attr('src','assets/item_cup_over.svg');
	}
}

/*!
 * 
 * XML - This is the function that runs to load word from xml
 * 
 */
function loadXML(src){
	$('.preloadText').show();
	$('#buttonStart').hide();
	
	$.ajax({
       url: src,
       type: "GET",
       dataType: "xml",
       success: function (result) {
			if($.editor.enable){
				edit.xmlFile = result;
			}
			
			$(result).find('thumb').each(function(catIndex, catElement){
				var parent = $(catElement).attr('parent') == undefined ? '' : $(catElement).attr('parent');
				gameData.categoryThumb_arr.push({src:$(catElement).text(), name:$(catElement).attr('name'), parent:parent, settings:{}});
			});
			
            $(result).find('item').each(function(questionIndex, questionElement){
				pushDataArray(questionIndex, questionElement);
			});
			
			loadXMLComplete();
       }
	});
}

function pushDataArray(questionIndex, questionElement){
	var curCategory = $(questionElement).find('category').text();
	if(curCategory != ''){
		gameData.category_arr.push($(questionElement).find('category').text());
	}
				
	//landscape
	$(questionElement).find('landscape').each(function(landscapeIndex, landscapeElement){
		quesLandscape_arr.push({category:curCategory, 
								text:$(landscapeElement).find('question').text(), 
								fontSize:$(landscapeElement).find('question').attr('fontSize'), 
								lineHeight:$(landscapeElement).find('question').attr('lineHeight'), 
								color:$(landscapeElement).find('question').attr('color'), 
								align:$(landscapeElement).find('question').attr('align'), 
								top:$(landscapeElement).find('question').attr('top'), 
								left:$(landscapeElement).find('question').attr('left'),
								width:$(landscapeElement).find('question').attr('width'),
								height:$(landscapeElement).find('question').attr('height'),
								type:$(landscapeElement).find('question').attr('type'), 
								groups:[],
								videos:[],
								answers:{
									correctAnswer:$(landscapeElement).find('answers').attr('correctAnswer'),
									drag:$(landscapeElement).find('answers').attr('drag'),
									answer:[]
								},
								inputs:[],
								audio:$(landscapeElement).find('question').attr('audio'),
								explanation:{
									text:$(landscapeElement).find('explanation').text(), 
									fontSize:$(landscapeElement).find('explanation').attr('fontSize'), 
									lineHeight:$(landscapeElement).find('explanation').attr('lineHeight'), 
									color:$(landscapeElement).find('explanation').attr('color'), 
									align:$(landscapeElement).find('explanation').attr('align'), 
									top:$(landscapeElement).find('explanation').attr('top'), 
									left:$(landscapeElement).find('explanation').attr('left'),
									width:$(landscapeElement).find('explanation').attr('width'),
									height:$(landscapeElement).find('explanation').attr('height'),
									type:$(landscapeElement).find('explanation').attr('type'),
									audio:$(landscapeElement).find('explanation').attr('audio'),
								},
							   background:{
									text:$(landscapeElement).find('background').text(), 
									top:$(landscapeElement).find('background').attr('top'), 
									left:$(landscapeElement).find('background').attr('left'),
									width:$(landscapeElement).find('background').attr('width'),
									height:$(landscapeElement).find('background').attr('height')
								}
							   });
								
		$(landscapeElement).find('videos').each(function(videosIndex, videosElement){
			quesLandscape_arr[questionIndex].videos.push({
															width:$(videosElement).attr('width'),
															height:$(videosElement).attr('height'),
															top:$(videosElement).attr('top'),
															left:$(videosElement).attr('left'),
															autoplay:$(videosElement).attr('autoplay'),
															controls:$(videosElement).attr('controls'),
															embed:$(videosElement).attr('embed'),
															types:[]
														});
														
			$(videosElement).find('video').each(function(videoIndex, videoElement){
				quesLandscape_arr[questionIndex].videos[videosIndex].types.push({
																					src:$(videoElement).text(),
																					type:$(videoElement).attr('type')
																				});
			});
		});
				
		$(landscapeElement).find('answers answer').each(function(answerIndex, answerElement){
			quesLandscape_arr[questionIndex].answers.answer.push({text:$(answerElement).text(),
															submit:$(answerElement).attr('submit'),
															type:$(answerElement).attr('type'),
															width:$(answerElement).attr('width'),
															height:$(answerElement).attr('height'),
															top:$(answerElement).attr('top'),
															left:$(answerElement).attr('left'),
															fontSize:$(answerElement).attr('fontSize'),
															lineHeight:$(answerElement).attr('lineHeight'),
															color:$(answerElement).attr('color'),
															align:$(answerElement).attr('align'),
															audio:$(answerElement).attr('audio'),
															offsetTop:$(answerElement).attr('offsetTop'),
															
															dropLabelText:$(answerElement).attr('dropLabelText'),
															dropLabelType:$(answerElement).attr('dropLabelType'),
															dropLabelWidth:$(answerElement).attr('dropLabelWidth'),
															dropLabelHeight:$(answerElement).attr('dropLabelHeight'),
															dropLabelTop:$(answerElement).attr('dropLabelTop'),
															dropLabelLeft:$(answerElement).attr('dropLabelLeft'),
															dropLabelFontSize:$(answerElement).attr('dropLabelFontSize'),
															dropLabelLineHeight:$(answerElement).attr('dropLabelLineHeight'),
															dropLabelColor:$(answerElement).attr('dropLabelColor'),
															dropLabelAlign:$(answerElement).attr('dropLabelAlign'),
															dropLabelOffsetTop:$(answerElement).attr('dropLabelOffsetTop'),
														  
															dragEnable:$(answerElement).attr('dragEnable'),
															dropEnable:$(answerElement).attr('dropEnable'),
															dropLeft:$(answerElement).attr('dropLeft'),
															dropTop:$(answerElement).attr('dropTop'),
															dropWidth:$(answerElement).attr('dropWidth'),
															dropHeight:$(answerElement).attr('dropHeight'),
															dropOffLeft:$(answerElement).attr('dropOffLeft'),
															dropOffTop:$(answerElement).attr('dropOffTop'),});
		});
		
		$(landscapeElement).find('inputs input').each(function(inputIndex, inputElement){
			quesLandscape_arr[questionIndex].inputs.push({text:$(inputElement).text(),
															submit:$(inputElement).attr('submit'),
															type:$(inputElement).attr('type'),
															width:$(inputElement).attr('width'),
															height:$(inputElement).attr('height'),
															top:$(inputElement).attr('top'),
															left:$(inputElement).attr('left'),
															fontSize:$(inputElement).attr('fontSize'),
															lineHeight:$(inputElement).attr('lineHeight'),
															correctAnswer:$(inputElement).attr('correctAnswer'),
															color:$(inputElement).attr('color'),
															bacgkround:$(inputElement).attr('bacgkround'),
															align:$(inputElement).attr('align'),
															audio:$(inputElement).attr('audio'),
															offsetTop:$(inputElement).attr('offsetTop')});
		});
		
		$(landscapeElement).find('groups group').each(function(groupIndex, groupElement){
			quesLandscape_arr[questionIndex].groups.push({text:$(groupElement).text(),
														type:$(groupElement).attr('type'),
														width:$(groupElement).attr('width'),
														height:$(groupElement).attr('height'),
														top:$(groupElement).attr('top'),
														left:$(groupElement).attr('left'),
														fontSize:$(groupElement).attr('fontSize'),
														lineHeight:$(groupElement).attr('lineHeight'),
														color:$(groupElement).attr('color'),
														align:$(groupElement).attr('align'),
														offsetTop:$(groupElement).attr('offsetTop'),
														correctAnswer:$(groupElement).attr('correctAnswer'),
														dropMax:$(groupElement).attr('dropMax'),
														dropWidth:$(groupElement).attr('dropWidth'),
														dropHeight:$(groupElement).attr('dropHeight'),
														dropTop:$(groupElement).attr('dropTop'),
														dropLeft:$(groupElement).attr('dropLeft'),
														dropOffLeft:$(groupElement).attr('dropOffLeft'),
														dropOffTop:$(groupElement).attr('dropOffTop'),
														audio:$(groupElement).attr('audio')});
		});
	});
	
	//portrait
	$(questionElement).find('portrait').each(function(portraitIndex, portraitElement){
		quesPortrait_arr.push({category:curCategory, 
								text:$(portraitElement).find('question').text(), 
								fontSize:$(portraitElement).find('question').attr('fontSize'), 
								lineHeight:$(portraitElement).find('question').attr('lineHeight'), 
								align:$(portraitElement).find('question').attr('align'), 
								top:$(portraitElement).find('question').attr('top'), 
								left:$(portraitElement).find('question').attr('left'),
								width:$(portraitElement).find('question').attr('width'), 
								height:$(portraitElement).find('question').attr('height'),
								type:$(portraitElement).find('question').attr('type'), 
								color:$(portraitElement).find('answers').attr('color'),
							    groups:[],
								videos:[],
								answers:{
									correctAnswer:$(portraitElement).find('answers').attr('correctAnswer'),
									drag:$(portraitElement).find('answers').attr('drag'),
									answer:[]
								},
								inputs:[],
								audio:$(portraitElement).find('question').attr('audio'),
								explanation:{
									text:$(portraitElement).find('explanation').text(), 
									fontSize:$(portraitElement).find('explanation').attr('fontSize'), 
									lineHeight:$(portraitElement).find('explanation').attr('lineHeight'), 
									color:$(portraitElement).find('explanation').attr('color'), 
									align:$(portraitElement).find('explanation').attr('align'), 
									top:$(portraitElement).find('explanation').attr('top'), 
									left:$(portraitElement).find('explanation').attr('left'),
									width:$(portraitElement).find('explanation').attr('width'),
									height:$(portraitElement).find('explanation').attr('height'),
									type:$(portraitElement).find('explanation').attr('type'),
									audio:$(portraitElement).find('explanation').attr('audio'),
								},
							   background:{
									text:$(portraitElement).find('background').text(), 
									top:$(portraitElement).find('background').attr('top'), 
									left:$(portraitElement).find('background').attr('left'),
									width:$(portraitElement).find('background').attr('width'),
									height:$(portraitElement).find('background').attr('height')
								}
							  });
		
		$(portraitElement).find('videos').each(function(videosIndex, videosElement){
			quesPortrait_arr[questionIndex].videos.push({
															width:$(videosElement).attr('width'),
															height:$(videosElement).attr('height'),
															top:$(videosElement).attr('top'),
															left:$(videosElement).attr('left'),
															autoplay:$(videosElement).attr('autoplay'),
															controls:$(videosElement).attr('controls'),
															embed:$(videosElement).attr('embed'),
															types:[]
														});
														
			$(videosElement).find('video').each(function(videoIndex, videoElement){
				quesPortrait_arr[questionIndex].videos[videosIndex].types.push({
																					src:$(videoElement).text(),
																					type:$(videoElement).attr('type')
																				});
			});

		});
								
		$(portraitElement).find('answers answer').each(function(answerIndex, answerElement){
			quesPortrait_arr[questionIndex].answers.answer.push({text:$(answerElement).text(),
															submit:$(answerElement).attr('submit'),
															type:$(answerElement).attr('type'),
															width:$(answerElement).attr('width'),
															height:$(answerElement).attr('height'),
															top:$(answerElement).attr('top'),
															left:$(answerElement).attr('left'),
															fontSize:$(answerElement).attr('fontSize'),
															lineHeight:$(answerElement).attr('lineHeight'),
															color:$(answerElement).attr('color'),
															align:$(answerElement).attr('align'),
															audio:$(answerElement).attr('audio'),
															offsetTop:$(answerElement).attr('offsetTop'),
															
															dropLabelText:$(answerElement).attr('dropLabelText'),
															dropLabelType:$(answerElement).attr('dropLabelType'),
															dropLabelWidth:$(answerElement).attr('dropLabelWidth'),
															dropLabelHeight:$(answerElement).attr('dropLabelHeight'),
															dropLabelTop:$(answerElement).attr('dropLabelTop'),
															dropLabelLeft:$(answerElement).attr('dropLabelLeft'),
															dropLabelFontSize:$(answerElement).attr('dropLabelFontSize'),
															dropLabelLineHeight:$(answerElement).attr('dropLabelLineHeight'),
															dropLabelColor:$(answerElement).attr('dropLabelColor'),
															dropLabelAlign:$(answerElement).attr('dropLabelAlign'),
															dropLabelOffsetTop:$(answerElement).attr('dropLabelOffsetTop'),
															
														 	dragEnable:$(answerElement).attr('dragEnable'),
															dropEnable:$(answerElement).attr('dropEnable'),
															dropLeft:$(answerElement).attr('dropLeft'),
															dropTop:$(answerElement).attr('dropTop'),
															dropWidth:$(answerElement).attr('dropWidth'),
															dropHeight:$(answerElement).attr('dropHeight'),
															dropOffLeft:$(answerElement).attr('dropOffLeft'),
															dropOffTop:$(answerElement).attr('dropOffTop'),});
		});
		
		$(portraitElement).find('inputs input').each(function(inputIndex, inputElement){
			quesPortrait_arr[questionIndex].inputs.push({text:$(inputElement).text(),
															submit:$(inputElement).attr('submit'),
															type:$(inputElement).attr('type'),
															width:$(inputElement).attr('width'),
															height:$(inputElement).attr('height'),
															top:$(inputElement).attr('top'),
															left:$(inputElement).attr('left'),
															fontSize:$(inputElement).attr('fontSize'),
															lineHeight:$(inputElement).attr('lineHeight'),
															correctAnswer:$(inputElement).attr('correctAnswer'),
															color:$(inputElement).attr('color'),
															bacgkround:$(inputElement).attr('bacgkround'),
															align:$(inputElement).attr('align'),
															audio:$(inputElement).attr('audio'),
															offsetTop:$(inputElement).attr('offsetTop')});
		});
		
		$(portraitElement).find('groups group').each(function(groupIndex, groupElement){
			quesPortrait_arr[questionIndex].groups.push({text:$(groupElement).text(),
														type:$(groupElement).attr('type'),
														width:$(groupElement).attr('width'),
														height:$(groupElement).attr('height'),
														top:$(groupElement).attr('top'),
														left:$(groupElement).attr('left'),
														fontSize:$(groupElement).attr('fontSize'),
														lineHeight:$(groupElement).attr('lineHeight'),
														color:$(groupElement).attr('color'),
														align:$(groupElement).attr('align'),
														offsetTop:$(groupElement).attr('offsetTop'),
														correctAnswer:$(groupElement).attr('correctAnswer'),
														dropMax:$(groupElement).attr('dropMax'),
														dropWidth:$(groupElement).attr('dropWidth'),
														dropHeight:$(groupElement).attr('dropHeight'),
														dropTop:$(groupElement).attr('dropTop'),
														dropLeft:$(groupElement).attr('dropLeft'),
														dropOffLeft:$(groupElement).attr('dropOffLeft'),
														dropOffTop:$(groupElement).attr('dropOffTop'),
														audio:$(groupElement).attr('audio')});
		});
	});	
}

function pushJSONDataArray(questionElement){
	var questionIndex = 0;
	quesLandscape_arr = [];
	quesPortrait_arr = [];

	questionElement.landscape.text = '';
	
	if (typeof questionElement.landscape.question.text == 'undefined') {
		questionElement.landscape.question.text = '';
	}
	
	if (typeof questionElement.landscape.explanation == 'undefined') {
		questionElement.landscape.explanation = {text:''};
	}
	
	if (typeof questionElement.landscape.background == 'undefined') {
		questionElement.landscape.background = {};
	}
	
	if (typeof questionElement.landscape.videos == 'undefined') {
		questionElement.landscape.videos = {video:[]};
	}
	
	if (typeof questionElement.landscape.answers == 'undefined') {
		questionElement.landscape.answers = {answer:[]};
	}
	
	if (typeof questionElement.landscape.inputs == 'undefined') {
		questionElement.landscape.inputs = [];
	}
	
	if (typeof questionElement.landscape.groups == 'undefined') {
		questionElement.landscape.groups = [];
	}
	
	//landscape
	quesLandscape_arr.push({text:questionElement.landscape.question.text, 
								fontSize:questionElement.landscape.question.fontSize, 
								lineHeight:questionElement.landscape.question.lineHeight, 
								color:questionElement.landscape.question.color, 
								align:questionElement.landscape.question.align, 
								top:questionElement.landscape.question.top, 
								left:questionElement.landscape.question.left,
								width:questionElement.landscape.question.width,
								height:questionElement.landscape.question.height,
								type:questionElement.landscape.question.type, 
								groups:[],
								videos:[],
								answers:{
									correctAnswer:!checkValue(questionElement.landscape.answers.correctAnswer) ? '' : questionElement.landscape.answers.correctAnswer,
									drag:questionElement.landscape.answers.drag,
									answer:[]
								},
								inputs:[],
								audio:questionElement.landscape.question.audio,
						   		explanation:{
									text:questionElement.landscape.explanation.text,
									fontSize:questionElement.landscape.explanation.fontSize, 
									lineHeight:questionElement.landscape.explanation.lineHeight, 
									color:questionElement.landscape.explanation.color, 
									align:questionElement.landscape.explanation.align, 
									top:questionElement.landscape.explanation.top, 
									left:questionElement.landscape.explanation.left,
									width:questionElement.landscape.explanation.width,
									height:questionElement.landscape.explanation.height,
									type:questionElement.landscape.explanation.type,
									audio:questionElement.landscape.explanation.audio,
								},
						   		background:{
									text:questionElement.landscape.background.text,
									top:questionElement.landscape.background.top, 
									left:questionElement.landscape.background.left,
									width:questionElement.landscape.background.width,
									height:questionElement.landscape.background.height
								}
							   });
		
		//videos
		quesLandscape_arr[questionIndex].videos.push({
														width:questionElement.landscape.videos.width,
														height:questionElement.landscape.videos.height,
														top:questionElement.landscape.videos.top,
														left:questionElement.landscape.videos.left,
														autoplay:questionElement.landscape.videos.autoplay,
														controls:questionElement.landscape.videos.controls,
														embed:questionElement.landscape.videos.embed,
														types:[]
													});
														 
		for(var n=0; n<questionElement.landscape.videos.video.length; n++){
			quesLandscape_arr[questionIndex].videos[0].types.push({
																	src:questionElement.landscape.videos.video[n].src,
																	type:questionElement.landscape.videos.video[n].type
																});
		};
		
		//answers
		for(var n=0; n<questionElement.landscape.answers.answer.length; n++){
			quesLandscape_arr[questionIndex].answers.answer.push({text:questionElement.landscape.answers.answer[n].text,
															submit:questionElement.landscape.answers.answer[n].submit,
															type:questionElement.landscape.answers.answer[n].type,
															width:questionElement.landscape.answers.answer[n].width,
															height:questionElement.landscape.answers.answer[n].height,
															top:questionElement.landscape.answers.answer[n].top,
															left:questionElement.landscape.answers.answer[n].left,
															fontSize:questionElement.landscape.answers.answer[n].fontSize,
															lineHeight:questionElement.landscape.answers.answer[n].lineHeight,
															color:questionElement.landscape.answers.answer[n].color,
															align:questionElement.landscape.answers.answer[n].align,
															audio:questionElement.landscape.answers.answer[n].audio,
															offsetTop:questionElement.landscape.answers.answer[n].offsetTop,
															
															dropLabelText:questionElement.landscape.answers.answer[n].dropLabelText,
															dropLabelType:questionElement.landscape.answers.answer[n].dropLabelType,
															dropLabelWidth:questionElement.landscape.answers.answer[n].dropLabelWidth,

															dropLabelHeight:questionElement.landscape.answers.answer[n].dropLabelHeight,
															dropLabelTop:questionElement.landscape.answers.answer[n].dropLabelTop,
															dropLabelLeft:questionElement.landscape.answers.answer[n].dropLabelLeft,
															dropLabelFontSize:questionElement.landscape.answers.answer[n].dropLabelFontSize,
															dropLabelLineHeight:questionElement.landscape.answers.answer[n].dropLabelLineHeight,
															dropLabelColor:questionElement.landscape.answers.answer[n].dropLabelColor,
															dropLabelAlign:questionElement.landscape.answers.answer[n].dropLabelAlign,
															dropLabelOffsetTop:questionElement.landscape.answers.answer[n].dropLabelOffsetTop,
															
														 	dragEnable:questionElement.landscape.answers.answer[n].dragEnable,
															dropEnable:questionElement.landscape.answers.answer[n].dropEnable,
															dropLeft:questionElement.landscape.answers.answer[n].dropLeft,
															dropTop:questionElement.landscape.answers.answer[n].dropTop,
															dropWidth:questionElement.landscape.answers.answer[n].dropWidth,
															dropHeight:questionElement.landscape.answers.answer[n].dropHeight,
															dropOffLeft:questionElement.landscape.answers.answer[n].dropOffLeft,
															dropOffTop:questionElement.landscape.answers.answer[n].dropOffTop});										
		}
	
		for(var n=0; n<questionElement.landscape.inputs.length; n++){
			quesLandscape_arr[questionIndex].inputs.push({text:questionElement.landscape.inputs[n].text,
															submit:questionElement.landscape.inputs[n].submit,
															type:questionElement.landscape.inputs[n].type,
															width:questionElement.landscape.inputs[n].width,
															height:questionElement.landscape.inputs[n].height,
															top:questionElement.landscape.inputs[n].top,
															left:questionElement.landscape.inputs[n].left,
															fontSize:questionElement.landscape.inputs[n].fontSize,
															lineHeight:questionElement.landscape.inputs[n].lineHeight,
															correctAnswer:!checkValue(questionElement.landscape.inputs[n].correctAnswer) ? '' : questionElement.landscape.inputs[n].correctAnswer,
															color:questionElement.landscape.inputs[n].color,
															bacgkround:questionElement.landscape.inputs[n].bacgkround,
															align:questionElement.landscape.inputs[n].align,
															audio:questionElement.landscape.inputs[n].audio,
															offsetTop:questionElement.landscape.inputs[n].offsetTop});
		};
	
		for(var n=0; n<questionElement.landscape.groups.length; n++){
			quesLandscape_arr[questionIndex].groups.push({text:questionElement.landscape.groups[n].text,
														type:questionElement.landscape.groups[n].type,
														width:questionElement.landscape.groups[n].width,
														height:questionElement.landscape.groups[n].height,
														top:questionElement.landscape.groups[n].top,
														left:questionElement.landscape.groups[n].left,
														fontSize:questionElement.landscape.groups[n].fontSize,
														lineHeight:questionElement.landscape.groups[n].lineHeight,
														color:questionElement.landscape.groups[n].color,
														align:questionElement.landscape.groups[n].align,
														offsetTop:questionElement.landscape.groups[n].offsetTop,
														correctAnswer:!checkValue(questionElement.landscape.groups[n].correctAnswer) ? '' : questionElement.landscape.groups[n].correctAnswer,
														dropMax:questionElement.landscape.groups[n].dropMax,
														dropWidth:questionElement.landscape.groups[n].dropWidth,
														dropHeight:questionElement.landscape.groups[n].dropHeight,
														dropTop:questionElement.landscape.groups[n].dropTop,
														dropLeft:questionElement.landscape.groups[n].dropLeft,
														dropOffLeft:questionElement.landscape.groups[n].dropOffLeft,
														dropOffTop:questionElement.landscape.groups[n].dropOffTop,
														audio:questionElement.landscape.groups[n].audio});
		}
	
	//portrait
	questionElement.portrait.text = '';
	
	if (typeof questionElement.portrait.question.text == 'undefined') {
		questionElement.portrait.question.text = '';
	}

	if (typeof questionElement.portrait.explanation == 'undefined') {
		questionElement.portrait.explanation = {text:''};
	}
	
	if (typeof questionElement.portrait.background == 'undefined') {
		questionElement.portrait.background = {};
	}
	
	if (typeof questionElement.portrait.videos == 'undefined') {
		questionElement.portrait.videos = {video:[]};
	}
	
	if (typeof questionElement.portrait.answers == 'undefined') {
		questionElement.portrait.answers = {correctAnswer:'', answer:[]};
	}
	
	if (typeof questionElement.portrait.inputs == 'undefined') {
		questionElement.portrait.inputs = [];
	}
	
	if (typeof questionElement.portrait.groups == 'undefined') {
		questionElement.portrait.groups = [];
	}
	
	quesPortrait_arr.push({text:questionElement.portrait.question.text, 
								fontSize:questionElement.portrait.question.fontSize, 
								lineHeight:questionElement.portrait.question.lineHeight, 
								color:questionElement.portrait.question.color, 
								align:questionElement.portrait.question.align, 
								top:questionElement.portrait.question.top, 
								left:questionElement.portrait.question.left,
								width:questionElement.portrait.question.width,
								height:questionElement.portrait.question.height,
								type:questionElement.portrait.question.type, 
								groups:[],
								videos:[],
								answers:{
									correctAnswer:!checkValue(questionElement.portrait.answers.correctAnswer) ? '' : questionElement.portrait.answers.correctAnswer,
									drag:questionElement.portrait.answers.drag,
									answer:[]
								},
								inputs:[],
								audio:questionElement.portrait.question.audio,
						   		explanation:{
									text:questionElement.portrait.explanation.text,
									fontSize:questionElement.portrait.explanation.fontSize, 
									lineHeight:questionElement.portrait.explanation.lineHeight, 
									color:questionElement.portrait.explanation.color, 
									align:questionElement.portrait.explanation.align, 
									top:questionElement.portrait.explanation.top, 
									left:questionElement.portrait.explanation.left,
									width:questionElement.portrait.explanation.width,
									height:questionElement.portrait.explanation.height,
									type:questionElement.portrait.explanation.type,
									audio:questionElement.portrait.explanation.audio,
								},
						   		background:{
									text:questionElement.portrait.background.text,
									top:questionElement.portrait.background.top, 
									left:questionElement.portrait.background.left,
									width:questionElement.portrait.background.width,
									height:questionElement.portrait.background.height
								}
							   });
		
		//videos
		quesPortrait_arr[questionIndex].videos.push({
														width:questionElement.portrait.videos.width,
														height:questionElement.portrait.videos.height,
														top:questionElement.portrait.videos.top,
														left:questionElement.portrait.videos.left,
														autoplay:questionElement.portrait.videos.autoplay,
														controls:questionElement.portrait.videos.controls,
														embed:questionElement.portrait.videos.embed,
														types:[]
													});
														 
		for(var n=0; n<questionElement.portrait.videos.video.length; n++){
			quesPortrait_arr[questionIndex].videos[0].types.push({
																	src:questionElement.portrait.videos.video[n].src,
																	type:questionElement.portrait.videos.video[n].type
																});
		};
		
		//answers
		for(var n=0; n<questionElement.portrait.answers.answer.length; n++){
			quesPortrait_arr[questionIndex].answers.answer.push({text:questionElement.portrait.answers.answer[n].text,
															submit:questionElement.portrait.answers.answer[n].submit,
															type:questionElement.portrait.answers.answer[n].type,
															width:questionElement.portrait.answers.answer[n].width,
															height:questionElement.portrait.answers.answer[n].height,
															top:questionElement.portrait.answers.answer[n].top,
															left:questionElement.portrait.answers.answer[n].left,
															fontSize:questionElement.portrait.answers.answer[n].fontSize,
															lineHeight:questionElement.portrait.answers.answer[n].lineHeight,
															color:questionElement.portrait.answers.answer[n].color,
															align:questionElement.portrait.answers.answer[n].align,
															audio:questionElement.portrait.answers.answer[n].audio,
															offsetTop:questionElement.portrait.answers.answer[n].offsetTop,
															
															dropLabelText:questionElement.portrait.answers.answer[n].dropLabelText,
															dropLabelType:questionElement.portrait.answers.answer[n].dropLabelType,
															dropLabelWidth:questionElement.portrait.answers.answer[n].dropLabelWidth,

															dropLabelHeight:questionElement.portrait.answers.answer[n].dropLabelHeight,
															dropLabelTop:questionElement.portrait.answers.answer[n].dropLabelTop,
															dropLabelLeft:questionElement.portrait.answers.answer[n].dropLabelLeft,
															dropLabelFontSize:questionElement.portrait.answers.answer[n].dropLabelFontSize,
															dropLabelLineHeight:questionElement.portrait.answers.answer[n].dropLabelLineHeight,
															dropLabelColor:questionElement.portrait.answers.answer[n].dropLabelColor,
															dropLabelAlign:questionElement.portrait.answers.answer[n].dropLabelAlign,
															dropLabelOffsetTop:questionElement.portrait.answers.answer[n].dropLabelOffsetTop,
															
														 	dragEnable:questionElement.portrait.answers.answer[n].dragEnable,
															dropEnable:questionElement.portrait.answers.answer[n].dropEnable,
															dropLeft:questionElement.portrait.answers.answer[n].dropLeft,
															dropTop:questionElement.portrait.answers.answer[n].dropTop,
															dropWidth:questionElement.portrait.answers.answer[n].dropWidth,
															dropHeight:questionElement.portrait.answers.answer[n].dropHeight,
															dropOffLeft:questionElement.portrait.answers.answer[n].dropOffLeft,
															dropOffTop:questionElement.portrait.answers.answer[n].dropOffTop});										
		}
	
		for(var n=0; n<questionElement.portrait.inputs.length; n++){
			quesPortrait_arr[questionIndex].inputs.push({text:questionElement.portrait.inputs[n].text,
															submit:questionElement.portrait.inputs[n].submit,
															type:questionElement.portrait.inputs[n].type,
															width:questionElement.portrait.inputs[n].width,
															height:questionElement.portrait.inputs[n].height,
															top:questionElement.portrait.inputs[n].top,
															left:questionElement.portrait.inputs[n].left,
															fontSize:questionElement.portrait.inputs[n].fontSize,
															lineHeight:questionElement.portrait.inputs[n].lineHeight,
															correctAnswer:!checkValue(questionElement.portrait.inputs[n].correctAnswer) ? '' : questionElement.portrait.inputs[n].correctAnswer,
															color:questionElement.portrait.inputs[n].color,
															bacgkround:questionElement.portrait.inputs[n].bacgkround,
															align:questionElement.portrait.inputs[n].align,
															audio:questionElement.portrait.inputs[n].audio,
															offsetTop:questionElement.portrait.inputs[n].offsetTop});
		};
	
		for(var n=0; n<questionElement.portrait.groups.length; n++){
			quesPortrait_arr[questionIndex].groups.push({text:questionElement.portrait.groups[n].text,
														type:questionElement.portrait.groups[n].type,
														width:questionElement.portrait.groups[n].width,
														height:questionElement.portrait.groups[n].height,
														top:questionElement.portrait.groups[n].top,
														left:questionElement.portrait.groups[n].left,
														fontSize:questionElement.portrait.groups[n].fontSize,
														lineHeight:questionElement.portrait.groups[n].lineHeight,
														color:questionElement.portrait.groups[n].color,
														align:questionElement.portrait.groups[n].align,
														offsetTop:questionElement.portrait.groups[n].offsetTop,
														correctAnswer:!checkValue(questionElement.portrait.groups[n].correctAnswer) ? '' : questionElement.portrait.groups[n].correctAnswer,
														dropMax:questionElement.portrait.groups[n].dropMax,
														dropWidth:questionElement.portrait.groups[n].dropWidth,
														dropHeight:questionElement.portrait.groups[n].dropHeight,
														dropTop:questionElement.portrait.groups[n].dropTop,
														dropLeft:questionElement.portrait.groups[n].dropLeft,
														dropOffLeft:questionElement.portrait.groups[n].dropOffLeft,
														dropOffTop:questionElement.portrait.groups[n].dropOffTop,
														audio:questionElement.portrait.groups[n].audio});
		}
}

function checkBoolean(value){
	if(value == undefined){
		return true;	
	}else{
		if(value == 'true'){
			return true;	
		}else{
			return false;
		}
	}
}

function loadXMLComplete(){
	$('.preloadText').hide();
	$('#buttonStart').show();
	
	gameData.targetArray = quesLandscape_arr;
	if(gameData.targetArray.length!=0){
		gameData.category_arr = unique(gameData.category_arr);
		gameData.category_arr.sort();
		
		if(categorySettings.allOption){
			gameData.category_arr.push(categorySettings.allText);
		}
	}
	
	if(categorySettings.status){
		buildCategoryLevel();
		buildCategory();
	}
	
	if($.editor.enable){
		loadEditPage();
		goPage('game');
	}else{
		goPage('main');
	}
}

/*!
 * 
 * QUESTION AND ANSWER IMAGE PRELOADER - This is the function that runs to preload question/answer image
 * 
 */
var imageLoader, fileFest;
function loadQuestionAssets(){
	imageLoader = new createjs.LoadQueue(false);
	createjs.Sound.alternateExtensions = ["mp3"];
	imageLoader.installPlugin(createjs.Sound);
	
	imageLoader.addEventListener("complete", handleImageComplete);
	imageLoader.loadManifest(fileFest);
}

function handleImageComplete() {
	buildQuestion();
};

function removeSoundAssets(){
	stopAudio();
	
	for(var n=0; n<audioLandscape_arr.length; n++){
		createjs.Sound.removeSound(audioLandscape_arr[n].id);	
	}
	for(var n=0; n<audioPortrait_arr.length; n++){
		createjs.Sound.removeSound(audioPortrait_arr[n].id);	
	}
}

/*!
 * 
 * RESIZE GAME - This is the function that runs to resize game
 * 
 */
function resizeGameDetail(){
	if(gameData.mode != gameData.oldMode){
		gameData.oldMode = gameData.mode;
		if(gameData.build && gameData.page == 'game'){
			buildQuestion();
		}
	}
	
	var curHoldeW = $('#mainHolder').outerWidth();
	if(gameData.mode == 'portrait'){
		resetCategory();
		$('.fontPreload').attr('data-fontSize', 20);
		$('.fontPreload').attr('data-lineHeight', 20);
		$('.fontCategory').attr('data-fontSize', 18);
		$('.fontCategory').attr('data-lineHeight', 18);
		$('.fontCategoryNav').attr('data-fontSize', 16);
		$('.fontCategoryNav').attr('data-lineHeight', 26);
		
		$('.gameQuestionStatus').attr('data-fontSize', 20);
		$('.gameQuestionStatus').attr('data-lineHeight', 20);
		$('.gameTimerStatus').attr('data-fontSize', 20);
		$('.gameTimerStatus').attr('data-lineHeight', 20);

		$('.fontResultScore').attr('data-fontSize', 40);
		$('.fontResultScore').attr('data-lineHeight', 40);
		$('.fontShare').attr('data-fontSize', 25);
		$('.fontShare').attr('data-lineHeight', 25);
		
		$('.fontMessage').attr('data-fontSize', 25);
		$('.fontMessage').attr('data-lineHeight', 25);
		
		$('.fontScoreTitle').attr('data-fontSize', 25);
		$('.fontScoreTitle').attr('data-lineHeight', 25);
		$('.fontSubmitTitle').attr('data-fontSize', 25);
		$('.fontSubmitTitle').attr('data-lineHeight', 25);
		$('.fontScoreList').attr('data-fontSize', 15);
		$('.fontScoreList').attr('data-lineHeight', 15);
		
		$('.fontLabel').attr('data-fontSize', 20);
		$('.fontLabel').attr('data-lineHeight', 20);
		$('.fontInput').attr('data-fontSize', 20);
		$('.fontInput').attr('data-lineHeight', 20);
		$('.fontError').attr('data-fontSize', 18);
		$('.fontError').attr('data-lineHeight', 18);
	}else{
		resetCategory();
		$('.fontPreload').attr('data-fontSize', 30);
		$('.fontPreload').attr('data-lineHeight', 30);
		$('.fontCategory').attr('data-fontSize', 25);
		$('.fontCategory').attr('data-lineHeight', 25);
		$('.fontCategoryNav').attr('data-fontSize', 20);
		$('.fontCategoryNav').attr('data-lineHeight', 30);
		
		$('.gameQuestionStatus').attr('data-fontSize', 30);
		$('.gameQuestionStatus').attr('data-lineHeight', 30);
		$('.gameTimerStatus').attr('data-fontSize', 30);
		$('.gameTimerStatus').attr('data-lineHeight', 30);
		
		$('.fontResultScore').attr('data-fontSize', 50);
		$('.fontResultScore').attr('data-lineHeight', 50);
		$('.fontShare').attr('data-fontSize', 30);
		$('.fontShare').attr('data-lineHeight', 30);
		
		$('.fontMessage').attr('data-fontSize', 35);
		$('.fontMessage').attr('data-lineHeight', 35);
		
		$('.fontScoreTitle').attr('data-fontSize', 50);
		$('.fontScoreTitle').attr('data-lineHeight', 50);
		$('.fontSubmitTitle').attr('data-fontSize', 50);
		$('.fontSubmitTitle').attr('data-lineHeight', 50);
		$('.fontScoreList').attr('data-fontSize', 20);
		$('.fontScoreList').attr('data-lineHeight', 20);
		
		$('.fontLabel').attr('data-fontSize', 30);
		$('.fontLabel').attr('data-lineHeight', 30);
		$('.fontInput').attr('data-fontSize', 30);
		$('.fontInput').attr('data-lineHeight', 30);
		$('.fontError').attr('data-fontSize', 28);
		$('.fontError').attr('data-lineHeight', 28);
	}
	
	$('.resizeFont').each(function(index, element) {
        $(this).css('font-size', Math.round(Number($(this).attr('data-fontSize'))*scalePercent)+'px');
		$(this).css('line-height', Math.round(Number($(this).attr('data-lineHeight'))*scalePercent)+'px');
    });

	$('.resizeBorder').each(function(index, element) {
		var borderColor = $(this).attr('data-border-color');
		var borderNumber = Number($(this).attr('data-border-size'));
		var scaleNum = Number($('#questionHolder').outerWidth()/ screenSettings.stageW);
		borderNumber = borderNumber * scaleNum;
        $(this).css('border', borderColor+' solid '+borderNumber+'px');
    });	
	
	$('.resizeBorderRadius').each(function(index, element) {
		var borderRadiusNumber = Number($(this).attr('data-border-radius'));
		var scaleNum = Number($('#questionHolder').outerWidth()/ screenSettings.stageW);
		borderRadiusNumber = borderRadiusNumber * scaleNum;
        $(this).css('border-radius', borderRadiusNumber+"px "+borderRadiusNumber+"px "+borderRadiusNumber+"px "+borderRadiusNumber+"px");
		$(this).css('-moz-border-radius', borderRadiusNumber+"px "+borderRadiusNumber+"px "+borderRadiusNumber+"px "+borderRadiusNumber+"px");
		$(this).css('-webkit-border-radius', borderRadiusNumber+"px "+borderRadiusNumber+"px "+borderRadiusNumber+"px "+borderRadiusNumber+"px");
    });	
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	return minutes+':'+seconds;
}

/*!
 * 
 * TOGGLE CONFIRM - This is the function that runs to toggle confirm exit
 * 
 */
function togglePop(con){
	if(con){
		$('#confirmHolder').show();
	}else{
		$('#confirmHolder').hide();	
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameOption(){
	if($('#buttonOption').hasClass('buttonOptionOn')){
		$('#buttonOption').removeClass('buttonOptionOn');
		$('#buttonOption').addClass('buttonOptionOff');
		$('#optionList').hide();
	}else{
		$('#buttonOption').removeClass('buttonOptionOff');
		$('#buttonOption').addClass('buttonOptionOn');
		$('#optionList').show();
	}
}

function toggleGameMute(){
	if($('#buttonSound').hasClass('buttonSoundOn')){
		$('#buttonSound').removeClass('buttonSoundOn');
		$('#buttonSound').addClass('buttonSoundOff');
		toggleSoundInMute(true);
	}else{
		$('#buttonSound').removeClass('buttonSoundOff');
		$('#buttonSound').addClass('buttonSoundOn');
		toggleSoundInMute(false);
	}
}


function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function shareLinks(action, shareScore){
	if(shareSettings.gtag){
		gtag('event','click',{'event_category':'share','event_label':action});
	}

	var gameURL = location.href;
	gameURL = encodeURIComponent(gameURL.substring(0,gameURL.lastIndexOf("/") + 1));

	var shareTitle;
	var shareText;
	if(resultSettings.mode == 'score'){
		shareTitle = shareSettings.shareTitle.replace("[SCORE]", playerData.score);
		shareText = shareSettings.shareMessage.replace("[SCORE]", playerData.score);
	}else if(resultSettings.mode == 'timer'){
		shareTitle = shareSettings.shareTitle.replace("[SCORE]", millisecondsToTime(playerData.timer));
		shareText = shareSettings.shareMessage.replace("[SCORE]", millisecondsToTime(playerData.timer));
	}


	var shareURL = '';
	if( action == 'facebook' ){
		if(shareSettings.customScore){
			gameURL = decodeURIComponent(gameURL);
			shareURL = `https://www.facebook.com/sharer/sharer.php?u=`+encodeURIComponent(`${gameURL}share.php?title=${shareTitle}&url=${gameURL}&thumb=${gameURL}share.jpg`);
		}else{
			shareURL = `https://www.facebook.com/sharer/sharer.php?u=${gameURL}`;
		}
	}else if( action == 'twitter' ){
		shareURL = `https://twitter.com/intent/tweet?text=${shareText}&url=${gameURL}`;
	}else if( action == 'whatsapp' ){
		shareURL = `https://api.whatsapp.com/send?text=${shareText}%20${gameURL}`;
	}else if( action == 'telegram' ){
		shareURL = `https://t.me/share/url?url=${gameURL}&text=${shareText}`;
	}else if( action == 'reddit' ){
		shareURL = `https://www.reddit.com/submit?url=${gameURL}&title=${shareText}`;
	}else if( action == 'linkedin' ){
		shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${gameURL}`;
	}

	window.open(shareURL);
}