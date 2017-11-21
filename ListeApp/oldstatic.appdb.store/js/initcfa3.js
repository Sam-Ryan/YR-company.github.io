$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
});

function troubleshoot_device(device,success_callback){
    var agree1 = confirm(_('IS_CORRECT_DEVICE')+' '+device+'?');



    if (!agree1) {
        if (!is_idevice()) {
            alert(_('VISIT_FROM_IDEVICE'));
            return false;
        }
        alert(_('ORPHANED_LINK_DESC'));

        $.post(API_URL+'?action=get_link_code', function (response) {
            if (handle_errors(response)) {
                var link_code = response.data;
                alert(_('DEVICE_IS_BEING_LINKED_RELOAD'));

                $.post(API_URL+'?lang='+LANG_CODE+'&action=unlink',function(response){
                    if (handle_errors(response)) {
                        link('new',link_code,function(data){
                            window.location=data.profile_service;
                        });
                    }
                });
            }
        });
        return false;
    } else {
        if (success_callback) {
            success_callback();
        }
    }
    return false;
}

function link(type,link_code,callback) {


    if (!link_code) {
        link_code = $('.code_input').val();
    }
    var email = $('#email').val();

    $.post(API_URL+'?lang='+LANG_CODE+'&action=link',{type:type,link_code:link_code,email:email,random:Math.random()}, function(response){
        if (handle_errors(response)) {
            $.cookie('lt', response.data['link_token'], { expires: 3650, domain:'.appdb.store' });

            if (!callback) {
                if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                    $('.link-form').hide();
                    $('#link_notice').show();
                    window.location = response.data['profile_service'];
                } else {
                    alert(_('pc_link_ok'));
                    window.location = '/';
                }
            } else {
                callback(response.data);
            }
        }
    });
    return false;
}

function unlink_email() {
    var email = $('#email').val();
    if (!email) {
        alert(_('please_enter_email'));
        return false;
    }
    $.post(API_URL+'?lang='+LANG_CODE+'&action=unlink',{email:email}, function(response){
        if (handle_errors(response)) {
            alert(_('unlink_email_sent'));
        }
    });
    return false;
}

function switch_device(link_token) {
    $.cookie('lt',link_token,{ expires: 3650, domain:'.appdb.store' });
    alert(_('device_switched'));
    window.location=window.location;
}


function is_idevice() {
    return window.navigator.userAgent.match(/(iPhone|iPad|iPod)/) ? true : false;
}

function handle_errors(response) {
    if (!response.success) {
        var errors = [];
        response.errors.forEach(function (e) {
            errors.push(_(e.toUpperCase()));
        });
        alert(errors.join(' ') + (response.data ? "\n" + response.data : ''));
        return false;
    }
    return true;
}

function _(word) {
    var translation = LANG_JSON[word.toUpperCase()];
    return (typeof (translation) == 'undefined' ? '*NO_TRANSLATION:' + word.toUpperCase() + '*' : translation);
}

function validate_PROtection(callback) {

    if (DEVICE_MODEL.match(/AppleTV/)) {
        callback(1);
        return;
    }

    if (!is_idevice()) {
        callback(IS_DEVICE_PROTECTED);
    } else {


        var protection_check_timeout = window.setTimeout(function () {
            callback(1);
        }, 500);
        $.ajax({
            url: 'http://ocsp.apple.com/ocsp03-wwdr01',
            dataType: 'jsonp',
            error: function (data) {
                console.log('PROtection check result is', data.readyState);
                if (data.readyState == 4) {
                    window.clearTimeout(protection_check_timeout);
                    callback(0);
                }
            }
        });

    }
}

$(document).ready(function () {

    if (IS_DEVICE) {

        if (is_idevice()) {

            validate_PROtection(function (result) {

                if (IS_DEVICE_PROTECTED != result) {
                    $.post(API_URL + '?lang=' + LANG_CODE + '&action=configure', {'params[is_protected]': (result ? 'yes' : 'no')},
                        function (conf_response) {
                            if (conf_response.success) {

                            } else {
                                console.log("Device protection configuration can not be saved");
                            }
                        });
                }
                if (result) {
                    $('.protection_result').text(_('protected')).addClass('green');
                    $('.protection_installer_wrap').slideUp();
                } else {
                    //alert(_('device_is_not_protected'));
                    $('.protection_result').text(_('not protected')).addClass('red');
                    $('.protection_installer_wrap').slideDown();
                }
            });
        } else {

            if (DEVICE_MODEL.match(/AppleTV/)) {
                return;
            }


            if (IS_DEVICE_PROTECTED) {
                $('.protection_result').text(_('protected')).addClass('green');
                $('.protection_installer_wrap').slideUp();
            } else {
                $('.protection_result').text(_('not protected')).addClass('red');
                $('.protection_installer_wrap').slideDown();
            }

            $.post(API_URL + '?lang=' + LANG_CODE + '&action=configure', {'params[is_protected]': (IS_DEVICE_PROTECTED ? 'yes' : 'no')},
                function (conf_response) {
                    if (conf_response.success) {

                    } else {
                        console.log("Device protection configuration can not be saved");
                    }
                });


        }
    }
});

function configure(form, params, success_callback) {
    var to_api;
    if (params) {
        to_api = params;
    } else {
        to_api = $(form).serialize();
    }
    $.post(API_URL + '?lang=' + LANG_CODE + '&action=configure', to_api, function (response) {
        if (handle_errors(response)) {
            alert(_('feature_configuration_saved'));
            if (success_callback) {
                success_callback();
            }
        }
    });
    return false;
}