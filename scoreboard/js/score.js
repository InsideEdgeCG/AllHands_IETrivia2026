////////////////////////////////////////////////////////////
// SCORE
////////////////////////////////////////////////////////////

/*!
 * 
 * SCOREBOARD SETTING CUSTOMIZATION START
 * 
 */
var scoreboardSettings = {
	displayScoreBoard:false, //toggle submit and scoreboard button
	scoreBoardTitle:"TOP 10 Scoreboard", //text for scoreboard title
	scoreRank_arr:["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"], //scoreboard ranking list
	scoreFormat:'[NUMBER]PTS',
	totalScorePage:1, //total score pages, .e.g. 2 for 20 listing
	userIDType:"email", //user ID type 'email' or 'mobile' field
	mobileFormat:{
		matches:"999-99999999", //mobile format
		minLength:10, //mobile min length
		maxLength:12 //mobile max length
	},
	submitTitle:"Submit your score", //text for submit title
	score_arr:[
		{col:"RANK", percent:8, align:"center"},
		{col:"NAME", percent:32, align:"left"},
		{col:"CATEGORY", percent:32, align:"center"},
		{col:"SCORE", percent:30, align:"center"}
	],
	text:{
		submissionError:"Submission error:",
		enterName:"*Please enter your name.",
		enterEmail:"*Please enter your email.",
		enterMobile:"*Please enter your mobile no.",
		enterValidEmail:"*Please enter a valite email.",
		enterValidMobile:"*Please enter a valite mobile no.",
		connectionError:"Database connection error",
		submissionErrorTry:"Submission error, please try again.",
	}
}

/*!
 * 
 * SCOREBOARD SETTING CUSTOMIZATION END
 * 
 */
 
$.scoreList={};

function buildScoreboard(){
	$('.fontScoreTitle').html(scoreboardSettings.scoreBoardTitle);
	$('.fontSubmitTitle').html(scoreboardSettings.submitTitle);

	$('#buttonScoreboard').hide();
	if(scoreboardSettings.displayScoreBoard){
		$('#buttonScoreboard').show();
	}

	$('#buttonScoreboard').click(function(){
		goScorePage('scoreboard');
	});
	
	$('#buttonSave').click(function(){
		goScorePage('submit');
	});
	
	$('#buttonScore').click(function(){
		goScorePage('scoreboard');
	});
	
	$('#buttonBack').click(function(){
		goScorePage('');
	});
	
	$('#buttonScorePrev').click(function(){
		toggleScorePage(false);
	});
	
	$('#buttonScoreNext').click(function(){
		toggleScorePage(true);
	});
	
	$('#buttonSubmit').click(function(){
		var userScore = playerData.timer;
		if(resultSettings.mode == 'score'){
			userScore = playerData.score;
		}
		
		if(categorySettings.status){
			submitUserScore(gameData.category_arr[gameData.categoryNum], userScore);
		}else{
			submitUserScore('', userScore);	
		}
	});
	
	$('#buttonCancelSubmit').click(function(){
		goScorePage('');
	});
	
	if(scoreboardSettings.userIDType == 'email'){
		$('.forEmail').show();
		$('.forMobile').hide();
	}else{
		$('.forEmail').hide();
		$('.forMobile').show();
		$('#uMobile').attr('placeholder', scoreboardSettings.mobileFormat.matches);
		$('#uMobile').attr('maxlength', scoreboardSettings.mobileFormat.maxLength);
	}
	
	for(var n=0;n<11;n++){
		var scoreHTML = '<li class="ignorePadding">';
		for(var s=0;s<scoreboardSettings.score_arr.length;s++){
			if(n == 0){
				scoreHTML += '<div class="list fontScoreList resizeFont" style="width:'+scoreboardSettings.score_arr[s].percent+'%; text-align:\''+scoreboardSettings.score_arr[s].align+'\';">'+scoreboardSettings.score_arr[s].col+'</div>';
			}else{
				var rankText = '';
				if(s==0){
					rankText = scoreboardSettings.scoreRank_arr[n-1];
				}
				scoreHTML += '<div class="list fontScoreList resizeFont" style="width:'+scoreboardSettings.score_arr[s].percent+'%; text-align:\''+scoreboardSettings.score_arr[s].align+'\';">'+rankText+'</div>';	
			}
		}
		scoreHTML += '<div style="clear:both;"></div></li>';
		$('ul.scoreList').append(scoreHTML);	
	}
}

/*!
 * 
 * TOGGLE SUBMIT SCORE BUTTON - This is the function that runs to display submit score button
 * 
 */
function toggleSaveButton(con){
	if(!scoreboardSettings.displayScoreBoard){
		return;
	}else{
		$('.resultContent .option').removeClass('singleOption');
	}
	
	if(con){
		$('.resultContent .option').removeClass('NoSaveOption');
	}else{
		$('.resultContent .option').addClass('NoSaveOption');
	}
}

/*!
 * 
 * DISPLAY TOP 10 SCOREBOARD - This is the function that runs to display top ten scoreboard
 * 
 */

function goScorePage(page){
	var targetContainer;
	
	$('#scoreboardHolder').hide();
	$('.resultExtra').show();
	$('.submitContent').hide();
	
	switch(page){
		case 'submit':
			targetContainer = $('.submitContent');
		break;
		
		case 'scoreboard':
			targetContainer = $('#scoreboardHolder');

			scoreListsData.page = 1;
			scoreListsData.newPage = 1;

			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				setMemberScoreboard(true);
				loadMemberScoreboard();
			}else{
				scoreListsData.category = '';
				if(categorySettings.status){
					if(gameData.page == 'result'){
						scoreListsData.category = gameData.category_arr[gameData.categoryNum];
					}
				}
				loadScoreboard();
			}
		break;
		
		case '':
			targetContainer = null
			$('.resultExtra').hide();
		break;
	}
	
	if(targetContainer != null){
		targetContainer.show();
	}
}

function submitUserScore(type, score){
	var errorCon = false;
	var errorMessage = '';
	var userIDValue = '';
	
	if($('#uName').val().length == 0 && errorMessage == ''){
		errorCon = true;
		errorMessage += '\n'+scoreboardSettings.text.enterName;
	}
	
	if(scoreboardSettings.userIDType == 'email'){
		if($('#uEmail').val().length == 0 && errorMessage == ''){
			errorCon = true;
			errorMessage += '\n'+scoreboardSettings.text.enterEmail;
		}
		
		if(!validateEmail($('#uEmail').val())){
			errorCon = true;
			errorMessage += '\n'+scoreboardSettings.text.enterValidEmail;
		}

		userIDValue = $('#uEmail').val();
	}else{
		if($('#uMobile').val().length == 0 && errorMessage == ''){
			errorCon = true;
			errorMessage += '\n'+scoreboardSettings.text.enterMobile;
		}
		
		if(!validateMobile($('#uMobile').val()) && errorMessage == ''){
			errorCon = true;
			errorMessage += '\n'+scoreboardSettings.text.enterValidMobile;
		}

		userIDValue = $('#uMobile').val();
	}
	
	if(errorCon){
		$('.fontError').html(errorMessage);
		//alert(errorMessage);	
	}else{
		//proceed	
		$.ajax({
		  type: "POST",
		  url: 'scoreboard/s_add.php',
		  data: { name: $('#uName').val(), email: userIDValue, type: type, score: score },
		  success: submitScoreSuccess,
		  dataType  : 'json'
		});
	}
}

function submitScoreSuccess(data){
	if(data.status == true){
		toggleSaveButton(false);
		goScorePage('');
	}else{
		if(data.error == 0){
			alert(scoreboardSettings.text.connectionError);	
		}else{
			alert(scoreboardSettings.text.submissionErrorTry);	
		}
	}
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

function validateMobile($mobile) {
	var validMobile = true;

	if($mobile.length < scoreboardSettings.mobileFormat.minLength){
		validMobile = false;
	}

	for(var n=0; n<$mobile.length; n++){
		var curMatch = scoreboardSettings.mobileFormat.matches.substring(n, n+1);
		var curField = $mobile.substring(n, n+1);
		if(curMatch == '9'){
			if(isNaN(curField)){
				validMobile = false;
			}
		}else if(curMatch != '9'){
			if(curMatch != curField){
				validMobile = false;
			}
		}
	}
	return validMobile;
  }

var scoreListsData = {category:'', page:1, newPage:1};
function toggleScorePage(con){
	if(con){
		scoreListsData.newPage++;
		scoreListsData.newPage = scoreListsData.newPage > scoreboardSettings.totalScorePage ? scoreboardSettings.totalScorePage : scoreListsData.newPage;
	}else{
		scoreListsData.newPage--;
		scoreListsData.newPage = scoreListsData.newPage < 1 ? 1 : scoreListsData.newPage;	
	}
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		loadMemberScoreboard();
	}else{
		loadScoreboard();
	}
}

function detectScorePage(){
	if(scoreboardSettings.totalScorePage <= 1){
		$('#buttonScorePrev').hide();
		$('#buttonScoreNext').hide();
	}else{
		$('#buttonScorePrev').hide();
		$('#buttonScoreNext').hide();
		
		if(scoreListsData.page > 1){
			$('#buttonScorePrev').show();
		}
		
		if(scoreListsData.page < scoreboardSettings.totalScorePage){
			$('#buttonScoreNext').show();
		}
	}
}

function loadScoreboard(){
	toggleScoreboardLoader(true);
	
	if(scoreListsData.newPage != scoreListsData.page){
		scoreListsData.page = scoreListsData.newPage;	
	}
	
	detectScorePage();
	
	var pageLimit = String(((scoreListsData.page-1) * 10)+','+((scoreListsData.page) * 10));
	$.ajax({
	  type: "POST",
	  url: 'scoreboard/s_top.php',
	  data: { type: scoreListsData.category, limit:pageLimit, reverse:resultSettings.reverse },
	  success: loadScoreboardSuccess,
	  dataType  : 'json'
	});	
}

function loadScoreboardSuccess(data){
	toggleScoreboardLoader(false);

	var listCount = (scoreListsData.page-1) * 10;
	
	for(var i=0; i<10; i++){
		$('ul.scoreList li').eq(i+1).find('div').eq(0).html('');
		
		if(typeof scoreboardSettings.scoreRank_arr[listCount] != "undefined"){
			$('ul.scoreList li').eq(i+1).find('div').eq(0).html(scoreboardSettings.scoreRank_arr[listCount]);
		}else{
			$('ul.scoreList li').eq(i+1).find('div').eq(0).html((listCount+1)+'.');
		}
		
		$('ul.scoreList li').eq(i+1).find('div').eq(1).html('');
		$('ul.scoreList li').eq(i+1).find('div').eq(2).html('');
		$('ul.scoreList li').eq(i+1).find('div').eq(3).html('');
		listCount++;
	}
	
	if(data.status == true){
		var scoreList = data.datas;
		
		if(scoreList.length>0){
			for(var i=0; i<scoreList.length; i++){
				if(typeof scoreList[i] != "undefined"){
					$('ul.scoreList li').eq(i+1).find('div').eq(1).html(scoreList[i].name);
					$('ul.scoreList li').eq(i+1).find('div').eq(2).html(scoreList[i].type);
					
					if(resultSettings.mode == 'score'){
						$('ul.scoreList li').eq(i+1).find('div').eq(3).html(scoreboardSettings.scoreFormat.replace('[NUMBER]',scoreList[i].score));
					}else{
						$('ul.scoreList li').eq(i+1).find('div').eq(3).html(scoreboardSettings.scoreFormat.replace('[NUMBER]',millisecondsToTime(scoreList[i].score)));
					}
				}
			}
		}

		var categoryList = data.category;		
		if(categoryList.length>0){
			var categoryArray = [];
			for(var i=0; i<categoryList.length; i++){
				if(typeof categoryList[i] != "undefined" && categoryList[i].type != ''){
					categoryArray.push({value:categoryList[i].type, name:categoryList[i].type});
				}
			}


			if(scoreboardCategory.length != categoryArray.length){
				scoreboardCategory = categoryArray;
				buildScoreboardCategory(categoryArray);
			}
		}
	}else{
		if(data.error == 0){
			alert(scoreboardSettings.text.connectionError);	
		}
	}
}

var scoreboardCategory = [];
function buildScoreboardCategory(categoryList){
	$('.scoreList li').eq(0).find('.list').eq(2).html(scoreboardSettings.score_arr[2].col);

	if(categoryList.length>0){
		$('.scoreList li').eq(0).find('.list').eq(2).html('<select name="scoreboardCategory" id="scoreboardCategory" class="fontScoreList resizeFont" style="width:100%;"><option value="">'+scoreboardSettings.score_arr[2].col+'</option></select>');
		for(var i=0; i<categoryList.length; i++){
			$('#scoreboardCategory').append('<option value="'+categoryList[i].value+'">'+categoryList[i].name+'</option>');
		}

		$("#scoreboardCategory").change(function() {
			scoreListsData.page = 1;
			scoreListsData.newPage = 1;

			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				setMemberScoreboard(false);
				loadMemberScoreboard();
			}else{
				scoreListsData.category = $(this).val();
				loadScoreboard();
			}
		});
	}
}

/*!
 * 
 * TOGGLE SCOREBOARD LOADER - This is the function that runs to toggle scoreboard loader
 * 
 */
function toggleScoreboardLoader(con){
	if(con){
		$('#scoreboardLoader').show();
	}else{
		$('#scoreboardLoader').hide();
	}
}