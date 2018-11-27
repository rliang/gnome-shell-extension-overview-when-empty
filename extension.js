const Overview = imports.ui.main.overview;

// did we activate the overview?
let _active = false;
let _wmanager = global.workspace_manager;
let _display  = global.display;
if (global.hasOwnProperty( 'screen' ) ) {
  // GNOME 3.28 or older
  let _wmanager = global.workspace_manager || global.screen;
  let _display  = global.display || global.screen;
}

function check() {
  if (!_wmanager.get_active_workspace().list_windows().length) {
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

let _switchHandle = null;
let _restackHandle = null;

function enable() {
  _switchHandle  = _wmanager.connect('workspace-switched', check);
  _restackHandle = _display.connect('restacked', check);
}

function disable() {
  _wmanager.disconnect(_switchHandle);
  _display.disconnect(_restackHandle);
}
