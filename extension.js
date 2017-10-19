const Overview = imports.ui.main.overview;

// did we activate the overview?
let _active = false;

function check() {
  if (!global.screen.get_active_workspace().list_windows().length) {
    // workspace empty
    if (!Overview.visible) {
      _active = true;
      Overview.show();
    }
  } else {
    // workspace not empty
    if (Overview.visible && _active) {
      _active = false;
      Overview.hide();
    }
  }
}

let _handles = [];

function enable() {
  _handles = ['workspace-switched', 'restacked'].map(s => global.screen.connect(s, check));
}

function disable() {
  _handles.forEach(h => global.screen.disconnect(h));
}
