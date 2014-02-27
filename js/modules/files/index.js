/**
 * User: sirzach
 * Date: 2/23/14
 * Time: 8:10 PM
 */

var App = App || global.App;

App.FilesRoute = require('./routes/files_route');
App.FilePreviewRoute = require('./routes/file_preview_route');
App.FilePreviewController = require('./controllers/file_preview_controller');

App.FilesController = require('./controllers/files_controller');
App.FileItemController = require('./controllers/file_item_controller');