var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.styles([
        "bootstrap.min.css",
        "font-awesome.min.css",
        "nanoscroller.min.css",
        "toastr.min.css",
        "jquery.bootstrap-touchspin.min.css",
        "bootstrap-select.css",
        "bootstrap-datetimepicker.min.css",
        "bootstrap-tagsinput.min.css",
        "jquery.gridster.min.css",
        "jquery.nestable.css",
        "nanoscroller.min.css",
        "wolf-animation.css",
        "app.min.css"
    ], 'public/assets/css/app.css');
    
    mix.scripts([
        "jquery.min.js",
        "bootstrap.min.js",
        "knockout.js",
        "knockout.mapping.js",
        "jquery.validate.min.js",
        "jquery.validate.vi.min.js",
        "jquery.nanoscroller.min.js",
        "toastr.min.js",
        "jquery.bootstrap-touchspin.min.js",
        "bootstrap-select.js",
        "defaults-vi_VI.js",    // bootstrap-select lang
        "moment.min.js",
        "bootstrap-datetimepicker.min.js",
        "bootstrap-tagsinput.min.js",
        "canvasjs.min.js",
        "jquery.gridster.min.js",
        "jquery.nestable.min.js",
        "jquery.hotkeys.min.js",
        "fn.min.js"
    ], 'public/assets/js/app.js');
});

elixir.extend('sourcemaps', false);
