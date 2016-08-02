<!DOCTYPE html>
<html lang="{{ App::getLocale() }}">
    <head>
        <link rel="shortcut icon" href="{{ url('assets/cms/images/favicon.ico') }}">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ trans('app.'.uri()) }}</title>

        <link rel="stylesheet" href="{{ url('assets/cms/css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ url('assets/cms/css/nanoscroller.min.css') }}">
        <link rel="stylesheet" href="{{ url('assets/cms/css/toastr.min.css') }}">
        <link rel="stylesheet" href="{{ url('assets/cms/css/jquery.bootstrap-touchspin.min.css') }}">
        <link rel="stylesheet" href="{{ url('assets/cms/css/app.min.css') }}">
        
        <script src="{{ url('assets/cms/js/jquery.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/bootstrap.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/knockout.js') }}"></script>
        <script src="{{ url('assets/cms/js/knockout.mapping.js') }}"></script>
        <script src="{{ url('assets/cms/js/jquery.validate.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/jquery.validate.vi.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/jquery.nanoscroller.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/toastr.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/jquery.bootstrap-touchspin.min.js') }}"></script>
        <script src="{{ url('assets/cms/js/fn.min.js') }}"></script>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        @yield('assets')
    </head>
    <body>
        @include('cms::blocks.menu')
        <div class="container-fluid">
            <div class="row">
                <div class="app-main">
                    <div class="app-sidebar nano">
                        @include('cms::blocks.navi')
                    </div>
                    <div class="app-content">
                        @yield('main')
                    </div>
                </div>
            </div>
        </div>
        <div class="app-loading">
            <span>
                <i class="glyphicon glyphicon-refresh glyphicon-spin"></i>
                <i>{{ trans('cms::cms.loading') }}</i>
            </span>
        </div>
        @include('cms::blocks.footer')
        <script src="{{ url('assets/cms/js/app.min.js') }} "></script>
    </body>
</html>
