(()=>{chrome.action.onClicked.addListener(e=>{chrome.scripting.executeScript({target:{tabId:e.id},files:["scripts/scrapper.js"]})});})();
