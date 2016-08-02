@extends('cms::layouts.base')

@section('title')
    {{ trans('app.title') }}
@endsection

@section('assets')
<link rel="stylesheet" href="{{ url('assets/cms/css/app.min.css') }}">
<script src="{{ url('assets/cms/js/jquery.min.js') }}"></script>
<script src="{{ url('assets/cms/js/knockout.js') }}"></script>
<script src="{{ url('assets/cms/js/fn.js') }}"></script>
<style>
    body {
        padding-top: 100px;
        padding-bottom: 40px;
        background-color: #dbdddd;
        background-image: url("{!! url('assets/cms/images/base-bg.png') !!}");
    }
</style>
@endsection

@section('main')
<!-- ko component: {
    name: 'form-signin',
    params: {
        token: '{!! csrf_token() !!}',
        logo: '{!! url('assets/cms/images/logo.png') !!}',
        type: 'danger',
        labels: {
            username: '{!! trans("cms::auth.username") !!}',
            password: '{!! trans("cms::auth.password") !!}',
            remember_me: '{!! trans("cms::auth.login_remember") !!}',
            login: '{!! trans("cms::auth.login") !!}'
        }
    }
} -->
<!--/ko-->

<script type="text/javascript">
    window.onload = function(){
        ko.applyBindings();
    };
</script>
@endsection
