browser.extension.isAllowedIncognitoAccess()
.then((answer) => {
    log(`Has incognito access: ${answer}`);
    if(answer)prepareMenuItem();
});

function prepareMenuItem(){
    let isPrivateWindow = browser.extension.inIncognitoContext;
    if(! isPrivateWindow){
        browser.contextMenus.create({
            id: "menu-item-private-search",
            title: "Search in private",
            contexts: ["selection"]
        });
        browser.contextMenus.onClicked.addListener((info, tab) => {
            if (info.menuItemId === "menu-item-private-search") {

                browser.windows.create({
                    incognito : true
                }).then((windowInfo)=>{
                    log(`Created window: ${windowInfo.id}`);

                    search(info.selectionText, windowInfo.tabs[0].id)

                }, onWindowCreateionError);
            }
        });
    }
}

function search(keyword, tabId) {
    log(`Searching : ${keyword}`);
    browser.search.search({
        query: keyword,
        tabId: tabId
    });
}
function onTabCreationError(error) {
    log(`Error: ${error}`);
}
  
function onWindowCreateionError(error) {
    log(`Error: ${error}`);
}
  

var loggingEnabled = false;
function log(data) {
    if(loggingEnabled) console.log(data);
}