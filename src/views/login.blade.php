@extends('cms::layouts.base')

@section('title')
    {{ trans('cms::cms.title') }}
@endsection

@section('assets')
<style>
body {
    padding-top: 100px;
    padding-bottom: 40px;
    background-color: #dbdddd;
    background-image: url("{{ url('assets/cms/images/base-bg.png') }}");
}
.panel-shadow {
    max-width: 330px;
    margin: 0 auto;
    border: 0px;
    -webkit-box-shadow: 0 5px 20px rgba(0,0,0,.4);
    -moz-box-shadow: 0 5px 20px rgba(0,0,0,.4);
    box-shadow: 0 5px 20px rgba(0,0,0,.4);
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
    margin-bottom: 10px;
}
.form-signin .checkbox {
    font-weight: normal;
}
.form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
<script src="{{ url('assets/cms/js/jquery.min.js') }}"></script>
@endsection

@section('main')
<div class="container">
    <div class="panel panel-default panel-shadow">
        <div class="panel-body">
            <form class="form-signin" id="form-signin" method="POST">
                {{ csrf_field() }}
                <img src="{{ url('assets/cms/images/logo.png') }}" class="img-responsive" style="margin: 5px auto 20px auto;"/>
                <div id="notify"></div>
                <input type="text" id="username" name="username" class="form-control" placeholder="{{ trans('cms::auth.username') }}" value="{{ old('inputUsername') }}" required autofocus>
                <input type="password" id="password" name="password" class="form-control" placeholder="{{ trans('cms::auth.password') }}" required>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="remember-me" value="true"> {{ trans('cms::auth.login_remember') }}
                    </label>
                </div>
                <button class="btn btn-lg btn-danger btn-block" type="submit">{{ trans('cms::auth.login') }}</button>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('#form-signin .form-control').on('keyup', function(){
        $('#notify').html('');
    });
    $('#form-signin').on('submit', function(){
        $('#form-signin .btn').prop("disabled", true);
        $.post( "login", $(this).serialize()).done(function( data ){
            $('#form-signin .btn').prop("disabled", false);
            if(data.status === 'success'){
                window.location.reload();
            }else{
                $('#notify').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
            }
        });
       return false;
    });
</script>
@endsection
