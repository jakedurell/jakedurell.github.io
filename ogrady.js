$("#sigName").val("Enter Name Here")

let subj = "*Public Records Request - " + Date() + "*"

let para1 = "Dear Attorney O'Grady,"

let para2 = "I am a Vermont citizen writing to request access to my records, currently being held in trust for me by the Vermont General Assembly (the 'Legislature'). I am making this request to the Legislature pursuant to Title I, Chapter 5, Subchapter 3, of the Vermont Public Records Act, and pursuant to Chapter I, Article 6 of the Vermont Constitution."

let para3 = "Specifically, I would like a copy of all electronic records falling within the following categories or containing any information falling within the following categories:"

let para4 = "I am requesting all records as of the date and time provided at the top of the body of this email ('Request Time'). To the extent any records requested are impermanent and records existing at the Request Time cannot be provided, I am requesting that records existing as close in time as possible to the Request Time be provided. I am expecting the fulfillment of this request within the statutorily required three (3) business days under 1 V.S.A. S.318(a)(2)."

let para5 = "I am requesting that all such records be produced in their original electronic format, regardless of whether they are kept in SQL database format, JSON, text files, excel files, csv files, or any other format. As my request is for data in its original form, I expect the response to include other information that is intertwined with the data requested and not extracted or separated from such related data. This request is not intended to and shall not be construed to require the creation of any record."

let para6 = "This e-mail is not and shall not be construed to be an agreement to pay any costs in retrieving such records. Estimated costs will be promptly considered. Any inflation of estimated costs will likely require substantial attorney expense to address, for which I would seek compensation. Such inflation includes, but is not limited to assesments for (1) costs arising from removing or filtering purportedly exempt data from otherwise very public data; (2) costs arising from querying or accessing information when such queries or access protocol already exists within the General Assembly on its websites or otherwise; and (3) costs arising from querying or accessing information which is not stored according to reasonable business standards."

let para7 = "Thank you for your assistance in this matter. Please understand that I am open to reasonable extensions and refinements of my request if it may lead to achieving my core information objectives, which I am happy to discuss with you. Please feel free to contact me if you have any questions."

let closing = "Sincerely,"

let emailHTML
let friendHTML

let friendEmail = "Hi!%0D%0A%0D%0AI have something super important to tell you about the Vermont legislature. Some weird things are going on in Montpelier, and the legislature is not giving people access to critical data about the legislative process. Crazy, right? I think they just don't understand how important this data is to people. Fortunately, we have a good public records law and it is easy to ask them for the info you need and let them know how important it is to you. Just go to https://jakedurell.github.io/ogrady and use the form to create your own email records request to legislative council. Let's get this sorted out ASAP!%0D%0A%0D%0AThanks!%0D%0A-"

$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });

    $('#get-checked-data').on('click', function (event) {
        event.preventDefault();


        let letterHTML = subj
        letterHTML += "<br><br>" + para1
        letterHTML += "<br><br>" + para2
        letterHTML += "<br><br>" + para3
        letterHTML += "<u>"


        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function (idx, li) {
            checkedItems[counter] = $(li).text();
            letterHTML += "<br><br> " + (counter + 1) + ") " + $(li).text();
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
        letterHTML += "</u>"

        letterHTML += "<br><br>" + para4
        letterHTML += "<br><br>" + para5
        letterHTML += "<br><br>" + para6
        letterHTML += "<br><br>" + para7
        letterHTML += "<br><br>" + closing
        letterHTML += "<br>" + $("#sigName").val()
        $("#letter").html(letterHTML)
        emailHTML = "mailto:MOGrady@leg.state.vt.us?"
        emailHTML += "bcc=jdurell@gmail.com"
        emailHTML += "&subject=Public Records Request"
        emailHTML += "&body="

        letterHTML.replace(/<u>/g, "x")
        letterHTML.replace(/<\/u>/g, "x")

        emailHTML += letterHTML.replace(/<br>/g, "%0D%0A")

        emailHTML = emailHTML.replace(/<u>/g, "")
        emailHTML = emailHTML.replace(/<\/u>/g, "")

        // $("#genEmailRequest").attr("href", emailHTML).attr("target", "_blank");

    });

    $('#genEmailRequest').on('click', function (event) {
        window.open(emailHTML);
    });

    $('#friendEmail').on('click', function (event) {
        friendHTML = "mailto:EnterFriendHere?"
        friendHTML += "&subject=Problems in Montpelier / Public Records Solution"
        friendHTML += "&body="
        friendHTML += friendEmail.replace(/<br>/g, "%0D%0A")
        window.open(friendHTML + $("#sigName").val());
    });
});

