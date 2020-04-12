$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        var uNumber = $('#number').val();
        
        $.get('/getCheckNumber', {uNumber: uNumber}, function(result) {
            if(result.uNumber == uNumber) {
                $('#number').css('background-color', 'red');
                $('#error').text('Number already registed');
                $('#submit').prop('disabled', true);
            }
            else {
                $('#number').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        /* 1. Get input */
        var uName = $('#name').val();
        var uNumber = $('#number').val();
        
        /* 2. Check */
        if(uName == '' && uNumber == '') {
            $('#name').css('background-color', 'red');
            $('#number').css('background-color', 'red');
            $('#error').text('Missing Input: Both');
        }
        else if(uName == '') {
            $('#name').css('background-color', 'red');
            $('#error').text('Missing Input: Name');
        }
        else if(uNumber == '') {
            $('#number').css('background-color', 'red');
            $('#error').text('Missing Input: Number');
        }
        else {
            $('#name').css('background-color', '#E3E3E3');
            $('#number').css('background-color', '#E3E3E3');
            $('#error').text('');
            /* 3. Add to Database */
            $.get('/add', {uName: uName, uNumber: uNumber}, function(result) {
                if(result) {
                    $('#contacts').append(
                        '<div class="contact">' +
                            '<img src="/images/icon.webp" class="icon">' +
                            '<div class="info">' +
                                '<p class="text">' + uName + '</p>' +
                                '<p class="text">' + uNumber + '</p>' +
                            '</div>' +
                            '<button class="remove"> X </button>' +
                        '</div>'
                    );
                }
            });
        }

        /* 4. Reset */
        $('#name').val('');
        $('#number').val('');
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    $('#contacts').on('click', '.remove', function () {
        var data = ($(this).parent().text()).trim();
        var Name = data.substr(0, data.indexOf(' '));
        var OtherName = (data.substr(Name.length)).trim();
        OtherName = OtherName.substr(0, OtherName.indexOf(' '));

        if(isNaN(OtherName)) {
            var uNumber = (data.substr(OtherName.length + Name.length + 1)).trim();
            uNumber = uNumber.substr(0, uNumber.indexOf(' '));
            var uName = Name + ' ' + OtherName;
        }
        else {
            var uName = Name;
            var uNumber = OtherName;
        }

        //$(this).parent().remove();

        $.get('/delete', {uName: uName, uNumber: uNumber}, function(result) {
            if(result) {
                $(this).parent().remove();
                $('#contacts').load('/ #contacts');
            }
        });
    });

})
