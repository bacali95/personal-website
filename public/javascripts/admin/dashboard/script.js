(function ($) {
    "use strict";

    var files = [];
    var filesNames = [];

    document.addEventListener("DOMContentLoaded", init, false);

    function init() {
        var files_input = document.querySelector('#files');
        if (files_input) {
            files_input.addEventListener('change', handleFileSelect, false);
        }
    }

    //Projects

    function handleFileSelect(e) {
        if (!e.target.files || !window.FileReader) return;

        var selectFiles = Array.prototype.slice.call(e.target.files);

        selectFiles.forEach(function (f) {
            for (var i = 0; i < files.length; i++) {
                if (f.name === files[i].name
                    && f.lastModified === files[i].lastModified
                    && f.size === files[i].size) {
                    return;
                }
            }

            if (!f.type.match("image.*")) {
                return;
            }
            f.ID = ID();
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#selectedFiles').append('' +
                    '<div class="col-md-4"> ' +
                    '   <div id="' + f.ID + '" class="card text-center form-group border-secondary" >' +
                    '       <img class="card-img-top" src="' + e.target.result + '"/>' +
                    '       <div class="card-footer">' +
                    '           <a id="delete" class="btn btn-danger btn-sm mt-2" style="color: white">Delete</a>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>');
            };
            reader.readAsDataURL(f);

            files.push(f);
            filesNames.push(f.name);
        });
    }

    $('#addProjectForm').validate({
        rules: {
            titleFR: 'required',
            descriptionFR: 'required',
            typeFR: 'required',
            titleEN: 'required',
            descriptionEN: 'required',
            typeEN: 'required',
            category: 'required',
            repoGithub: 'required',
        },
        submitHandler: function (form) {
            var message = $('<div class="alert" style="display: none;">');
            var close = $('<span class="closebtn" data-dismiss="alert">&times</span>');
            message.append(close);
            if (files.length === 0) {
                message.append('Select images');
                message.appendTo($('body')).fadeIn(300).delay(2000).fadeOut(500);
                return;
            }
            for (let i = 0; i < files.length; i++) {
                postImage(files[i]);
            }
            $('#images').val(filesNames.join(','));
            form.submit();
        }
    });

    $('#editProjectForm').validate({
        rules: {
            titleFR: 'required',
            descriptionFR: 'required',
            typeFR: 'required',
            titleEN: 'required',
            descriptionEN: 'required',
            typeEN: 'required',
            category: 'required',
            repoGithub: 'required',
        },
        submitHandler: function (form) {
            for (let i = 0; i < files.length; i++) {
                postImage(files[i]);
            }
            $('#images').val(filesNames.join(','));
            form.submit();
        }
    });

    $(document).on('click', '#fileSelect', function (e) {
        $('#files').click();
        e.preventDefault();
        return false;
    });

    $(document).on('click', '#delete', function (e) {
        var ID = $(this).parents('.card')[0].id;
        for (let i = 0; i < files.length; i++) {
            if (files[i].ID === ID) {
                files.splice(i, 1);
                filesNames.splice(i, 1);
                break;
            }
        }
        $(this).parents('.col-md-4').remove();
        e.preventDefault();
        return false;
    });

    /**
     * @return {string}
     */
    var ID = function () {
        return Math.random().toString(36).substr(2, 9);
    };

    var postImage = function (file_data) {
        var form_data = new FormData();
        form_data.append('image', file_data);
        $.ajax({
            url: '/admin/project/postimage',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (response) {
                console.log(response);
                // $('#msg').html(response); // display success response from the server
            },
            error: function (response) {
                console.log(response);
                // $('#msg').html(response); // display error response from the server
            }
        });
    };

})(jQuery);
