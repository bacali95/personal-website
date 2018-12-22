(function ($) {
    "use strict";

    let uploadedFilesCount = 0;
    const files = [];
    const filesNames = [];
    const images = [];

    document.addEventListener("DOMContentLoaded", init, false);

    function init() {
        const files_input = document.querySelector('#files');
        if (files_input) {
            files_input.addEventListener('change', handleFileSelect, false);
            $('#selectedFiles').children('.col-md-4').each(function () {
                const ID = Math.random().toString(36).substr(2, 9);
                let child = $(this).children('div.card');
                child.prop('id', ID);
                let filename = child.children('img.card-img-top').prop('src');
                let file = {
                    ID: ID,
                    name: filename,
                    fromServer: true
                };
                files.push(file);
                filesNames.push(filename.substr(filename.lastIndexOf('/') + 1));
                images.push({secure_url: filename});
            })
        }
    }

    //Projects

    function handleFileSelect(e) {
        if (!e.target.files || !window.FileReader) return;

        const selectFiles = Array.prototype.slice.call(e.target.files);

        selectFiles.forEach(function (f) {
            for (let i = 0; i < files.length; i++) {
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
            f.fromServer = false;
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#selectedFiles').append('' +
                    '<div class="col-md-4"> ' +
                    '   <div id="' + f.ID + '" class="card text-center form-group border-secondary" >' +
                    '       <img class="card-img-top" src="' + e.target.result + '" alt=""/>' +
                    '       <div class="card-footer">' +
                    '           <a id="delete" class="btn btn-danger btn-sm" style="color: white">Delete</a>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>');
            };
            reader.readAsDataURL(f);

            files.push(f);
            filesNames.push(f.name);
        });
    }

    $('#projectForm').validate({
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
            const message = $('<div class="alert" style="display: none;">');
            const close = $('<span class="closebtn" data-dismiss="alert">&times</span>');
            message.append(close);
            if (files.length === 0) {
                message.append('Select images');
                message.appendTo($('body')).fadeIn(300).delay(2000).fadeOut(500);
                return;
            }
            uploadedFilesCount = 0;
            let inProgress = 0;
            for (let i = 0; i < files.length; i++) {
                if (!files[i].fromServer) {
                    inProgress++;
                    $('#' + files[i].ID).children('.card-footer').html('' +
                        '<div class="progress">' +
                        '   <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Compressing...</div>' +
                        '</div>');
                    postImage(files[i]);
                } else {
                    $('#' + files[i].ID).children('.card-footer').html('' +
                        '<div class="progress">' +
                        '   <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Done</div>' +
                        '</div>');
                }
            }
            console.log('uploading...');
            waitFor(() => uploadedFilesCount === inProgress, () => {
                $('#images').val(JSON.stringify(images));
                form.submit();
            });
        }
    });

    $('#certificateForm').validate({
        rules: {
            title: 'required',
            category: 'required',
        },
        submitHandler: function (form) {
            const message = $('<div class="alert" style="display: none;">');
            const close = $('<span class="closebtn" data-dismiss="alert">&times</span>');
            message.append(close);
            if (files.length === 0) {
                message.append('Select images');
                message.appendTo($('body')).fadeIn(300).delay(2000).fadeOut(500);
                return;
            }
            uploadedFilesCount = 0;
            let inProgress = 0;
            for (let i = 0; i < files.length; i++) {
                if (!files[i].fromServer) {
                    inProgress++;
                    $('#' + files[i].ID).children('.card-footer').html('' +
                        '<div class="progress">' +
                        '   <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Compressing...</div>' +
                        '</div>');
                    postImage(files[i]);
                } else {
                    $('#' + files[i].ID).children('.card-footer').html('' +
                        '<div class="progress">' +
                        '   <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Done</div>' +
                        '</div>');
                }
            }
            $('#images').val(filesNames.join(','));
            console.log('uploading...');
            waitFor(() => uploadedFilesCount === inProgress, () => {
                $('#images').val(JSON.stringify(images));
                form.submit()
            });
        }
    });

    const waitFor = function (condition, callback) {
        if (!condition()) {
            window.setTimeout(waitFor.bind(null, condition, callback), 1000);
        } else {
            callback();
        }
    };

    $(document).on('click', '#fileSelect', function (e) {
        $('#files').click();
        e.preventDefault();
        return false;
    });

    $(document).on('click', '#delete', function (e) {
        const ID = $(this).parents('.card')[0].id;
        for (let i = 0; i < files.length; i++) {
            if (files[i].ID === ID) {
                for (let j = 0; j < images.length; j++) {
                    if (images[j].secure_url === files[i].name) {
                        images.splice(j, 1);
                    }
                }
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
    const ID = function () {
        return Math.random().toString(36).substr(2, 9);
    };

    const postImage = function (file_data) {
        const form_data = new FormData();
        form_data.append('ID', file_data.ID);
        form_data.append('image', file_data);
        $.ajax({
            url: '/admin/project/postimage',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (res) {
                uploadedFilesCount++;
                images.push(res.image);
                let progressbar = $('#' + res.ID + ' .card-footer .progress');
                progressbar.html('<div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Done</div>');
            },
            error: function (res) {
            }
        });
    };

    // Users
    $('#userForm').validate({
        rules: {
            username: 'required',
            password: {
                required: true,
                minlength: 8,
            },
            password2: {
                required: true,
                equalTo: '#password',
            },
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    // Categories
    $('#categoryForm').validate({
        rules: {
            name: 'required',
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

})(jQuery);
