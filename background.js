let lastMenuInstanceId = 0;
let nextMenuInstanceId = 1;

let s_tab_id;

browser.contextMenus.onShown.addListener(async (info, tab) => {
  let menuInstanceId = nextMenuInstanceId++;
  lastMenuInstanceId = menuInstanceId;

  s_tab_id = tab.id;

  browser.tabs.executeScript(tab.id, {
    code: `document.body.style.position = "relative";
  var elem = document.createElement('div');
  elem.className = 'cmib_akfrxyz';
  var body = document.body;
  var height = Math.max( body.scrollHeight, body.offsetHeight);
  var width = Math.max( body.scrollWidth, body.offsetWidth);
elem.style.cssText = 'bottom: 0;left: 0;z-index: 99999;position:absolute;right: 0;top: 0;height: ' + height + 'px;width: ' + width + 'px;';
document.body.appendChild(elem);`
  });

  if (menuInstanceId !== lastMenuInstanceId) {
      browser.tabs.executeScript(s_tab_id, {
        code: `document.body.style.position = "";
        [...document.getElementsByClassName("cmib_akfrxyz")].forEach(e=>e.remove());`
    });
    return;
  }
});

browser.contextMenus.onHidden.addListener(() => {
  lastMenuInstanceId = 0;

  browser.tabs.executeScript(s_tab_id, {
    code: `document.body.style.position = "";
    [...document.getElementsByClassName("cmib_akfrxyz")].forEach(e=>e.remove());`
  });
});
