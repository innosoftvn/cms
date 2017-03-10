<!DOCTYPE html>
<html lang="{{ App::getLocale() }}">
    <head>
        <link rel="shortcut icon" href="{{ url('assets/images/favicon.ico') }}">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ trans('app.'.uri()) }}</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="{{ url('assets/css/app.css') }}">
        <script src="{{ url('assets/js/app.js') }}"></script>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <script type="text/javascript">
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        </script>
        
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
        @yield('footer')
        <script src="{{ url('assets/js/app-init.min.js') }} "></script>
    </body>
</html>
