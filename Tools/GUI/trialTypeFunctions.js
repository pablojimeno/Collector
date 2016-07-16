function saveTextAsFile() // solution by NatureShade at http://stackoverflow.com/questions/609530/download-textarea-contents-as-a-file-using-only-javascript-no-server-side 
{
    var textToWrite = JSON.stringify(trialTypeElements);//Your text input;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "elementArray.json";//Your filename;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

/* * * * * *
* Adjust events
* * * * * */

function adjustKeyboard(){
  trialTypeElements['keyboard']={
    acceptedResponses:acceptedKeyboardResponses.value,
    proceed:proceedKeyboardResponses.checked,    
  }
  updateTrialTypeElements();
}

function adjustStimulus(){
  var stimText=stimInputValue.value;
  document.getElementById("element"+currentElement).innerHTML=stimText;
  
  if(stimText.indexOf('$') != -1 ){  // may need to put checks on this to prevent e.g.s like "[stim]asdfadsf"
    stimInputValue.style.color="blue";
  } else {
    stimInputValue.style.color="black";
  }

  trialTypeElements['elements'][currentElement]['stimulus']=stimText;//update trialTypeElements
  updateTrialTypeElements();

}

function adjustElementName(){
  var elementNameText=elementNameValue.value;
  document.getElementById("element"+currentElement).innerHTML=elementNameText;
  
  if(elementNameText.indexOf('$') != -1 ){  // may need to put checks on this to prevent e.g.s like "[stim]asdfadsf"
    elementNameValue.style.color="blue";
  } else {
    elementNameValue.style.color="black";
  }
  trialTypeElements['elements'][currentElement]['elementName']=elementNameText;//update trialTypeElements
  updateTrialTypeElements();
}

function adjustHeight(){
  if(Number(yPosId.value) + Number(elementHeight.value) > 100){
    elementHeight.value = 100-yPosId.value; // temporary correction will still allow user to create something bigger than the screen
  }
  newHeight = elementScale*elementHeight.value;
  newHeight = newHeight +"px";
  document.getElementById("element"+currentElement).style.height = newHeight;
  trialTypeElements['elements'][currentElement]['height']=elementHeight.value;//update trialTypeElements
  updateTrialTypeElements();
}

function adjustWidth(){
  if( Number(xPosId.value) + Number(elementWidth.value) > 100){
    elementWidth.value = 100-xPosId.value; // temporary correction will still allow user to create something bigger than the screen
  }
  newWidth = elementScale*elementWidth.value;
  newWidth = newWidth +"px";
  document.getElementById("element"+currentElement).style.width = newWidth;
  trialTypeElements['elements'][currentElement]['width']=elementWidth.value;//update trialTypeElements
  updateTrialTypeElements();
}

  // position adjustment:

  function adjustXPos(){
    if( Number(xPosId.value) + Number(elementWidth.value) > 100){
      xPosId.value= 100- elementWidth.value; // temporary correction will still allow user to create something bigger than the screen
    }  
    newXPos=(Number(xPosId.value)*elementScale) +"px";
    document.getElementById("element"+currentElement).style.left = newXPos; //-xPosId.value; // temporary correction will still allow user to create something bigger than the screen
    trialTypeElements['elements'][currentElement]['xPos']=xPosId.value;//update trialTypeElements
    updateTrialTypeElements();
  }


  function adjustYPos(){
    if( Number(yPosId.value) + Number(elementHeight.value) > 100){
      yPosId.value= 100- elementHeight.value; // temporary correction will still allow user to create something bigger than the screen
    }  
    newYPos=(Number(yPosId.value)*elementScale) +"px";
    document.getElementById("element"+currentElement).style.top = newYPos; //-xPosId.value; // temporary correction will still allow user to create something bigger than the screen
    trialTypeElements['elements'][currentElement]['yPosition']=yPosId.value;//update trialTypeElements
    updateTrialTypeElements();
  }

  function adjustZPos(){
    trialTypeElements['elements'][currentElement]['zPosition']=zPosId.value;//update trialTypeElements
    
    //update style here!!!
    document.getElementById("element"+currentElement).style.zIndex = zPosId.value;
    
    updateTrialTypeElements();
  }


  // adjusting click events
  function adjustClickProceed(){
    trialTypeElements['elements'][currentElement]['proceed']=clickProceedId.checked;//update trialTypeElements
    updateTrialTypeElements();
  }

  function adjustOutcomeElement(){
      trialTypeElements['elements'][currentElement]['clickOutcomesElement']=clickOutcomesElementId.value;
      updateTrialTypeElements();
  }

  function adjustClickOutcomes(){
    if(clickOutcomesActionId.value=="response"){
      $("#clickOutcomesElementId").hide();
      $("#responseValueId").show();
      $("#respNoSpanId").show();
      updateClickResponseValues();
    } else {
      $("#clickOutcomesElementId").show();
      populateClickElements();    
      $("#responseValueId").hide();
      $("#respNoSpanId").hide();
      trialTypeElements['elements'][currentElement]['clickOutcomesElement']=clickOutcomesElementId.value;
    }

    trialTypeElements['elements'][currentElement]['clickOutcomesAction']=clickOutcomesActionId.value;//update trialTypeElements
    updateTrialTypeElements();
    // could add preview of outcome e.g. temp fade of another element if that's the action
    currentResponseNo=responseNoId.value;

  }
  
  // text adjustments
  
  function adjustTextBack(){
    document.getElementById("element"+currentElement).style.backgroundColor=textBackId.value;
    if(textBackId.value==""){
      trialTypeElements['elements'][currentElement]['textBack']="";
    } else {
      trialTypeElements['elements'][currentElement]['textBack']=textBackId.value;//update trialTypeElements
    }
    updateTrialTypeElements();
  }

  function adjustTextColor(){
    document.getElementById("element"+currentElement).style.color=textColorId.value;
    if(textColorId.value==""){
      trialTypeElements['elements'][currentElement]['textColor']="";
    } else {
      trialTypeElements['elements'][currentElement]['textColor']=textColorId.value;//update trialTypeElements
    }
    updateTrialTypeElements();
  }

  function adjustTextFont(){
    document.getElementById("element"+currentElement).style.fontFamily=textFontId.value;
    if(textFontId.value==""){
      trialTypeElements['elements'][currentElement]['textFont']="";
    } else {
      trialTypeElements['elements'][currentElement]['textFont']=textFontId.value;//update trialTypeElements
    }
    updateTrialTypeElements();
  }

  function adjustTextSize(){
    document.getElementById('element'+currentElement).style.fontSize=(textSizeId.value)+"px";
    
    trialTypeElements['elements'][currentElement]['textSize']=textSizeId.value;//update trialTypeElements
      
    updateTrialTypeElements();
  }


  
function adjustTime(onsetOffset){
  timeElement=document.getElementById(onsetOffset+"Id");
  if(timeElement.value=="00:00"){
    timeElement.style.color="grey";
  } else {
    timeElement.style.color="blue";
  }
  trialTypeElements['elements'][currentElement][onsetOffset+'Time']=timeElement.value;//update trialTypeElements
  updateTrialTypeElements();
}


function adjustUserInputType(){
  var element = document.getElementById("element"+currentElement);
  element.parentNode.removeChild(element);
  currentXPos=xPosId.value*elementScale;
  currentYPos=yPosId.value*elementScale;
  currentWidth=elementWidth.value*elementScale;
  currentHeight=elementHeight.value*elementScale;
  document.getElementById("trialEditor").innerHTML+="<input class='inputElement' type='"+userInputTypeValue.value+"' id='element"+currentElement+"' style='position: absolute;left:"+currentXPos+"px;top:"+currentYPos+"px; width:"+currentWidth+"px; height:"+currentHeight+"px' onclick='clickElement("+elementNo+")' name='"+currentElement+"' value='"+stimInputValue.value+"' readonly>";  
  
  document.getElementById('element'+currentElement).style.color             =   textColorId.value;
  document.getElementById('element'+currentElement).style.fontFamily        =   textFontId.value;
  document.getElementById('element'+currentElement).style.fontSize          =   (textSizeId.value)+"px";
  document.getElementById('element'+currentElement).style.backgroundColor   =   textBackId.value;
          
          /*
          currentElementAttributes.textFont = textFontId.value;
          currentElementAttributes.textSize = textSizeId.value;
          currentElementAttributes.textBack = textBackId.value;
          */
  

  trialTypeElements['elements'][currentElement]['userInputType']=userInputTypeValue.value;
  updateTrialTypeElements();
}

// other functions

/* used for cleaning array of null values*/
function removeNullValues(x){ 
  var cleanArray=[];          // only add values that exist to this array (i.e. not NULL)
  for(j=0; j<x.length;j++){
    if(x[j]){
      cleanArray.push(x[j]);  
    }    
  }
  return cleanArray;
}


// future development

function supportClickOutcomes(){
  // this may be developed in version 2 to help users use this functionality; Need a list somewhere of all functions.   
}; 