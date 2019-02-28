var rotation = 0;
var winner = [];
var socket = io.connect();
function tileCheck() {
    return new Promise(function (resolve, reject) {
        try {
            var size = jQuery(".tile").length;
            //   alert(size)
            jQuery(".tile").each(function () {

                var correct = jQuery(this).attr("data-correct");
                var current = jQuery(this).attr("data-current");
                console.log("current = " + current);
                console.log("correct = " + correct)
                if (correct == current) {
                    jQuery(this).addClass("solved");
                } else {
                    if (jQuery(this).hasClass("solved")) {
                        jQuery(this).removeClass("solved");
                    }
                }

            });
            resolve("working");
        } catch{
            reject("Something went wrong");
        }
    })

}
tileCheck();

function checkWin(winner) {
    console.log("checking");

    jQuery(".tile").each(function (e) {
        var win = jQuery(this).hasClass("solved");
        if (!win) {
            winner[e] = 0;
            return;
        }
        else {
            winner[e] = 1;
        }

    });
    var isWinner = winner.indexOf(0);
    if (isWinner == -1) {
        alert("solved");
        console.log(winner)
    }

    console.log(winner)
}

jQuery(".tile").on("click", function (event) {
    var myClass = jQuery(this).attr("class").split(' ')[1];
    // console.log(myClass)
    rotation = parseInt(jQuery(this).attr("data-current"));
    rotation += 90;
    if (rotation >= 360) {
        rotation = 0
    }
    jQuery(this).attr("data-current", rotation)
    socket.emit("rotation", { class: myClass, rotate: rotation })



});
socket.on('rotation', function (e) {
    console.log(e.class)

    console.log(e.rotate)

    $("." + e.class).rotate(e.rotate)
    jQuery("." + e.class).attr("data-current", e.rotate)
    // console.log(e);
    // var correct = jQuery("." + e.class).attr("data-correct");
    // var current = jQuery("." + e.class).attr("data-current");
    // console.log("current = " + current);
    // console.log("correct = " + correct)
    // if (correct == current) {
    //     jQuery("." + e.class).addClass("solved");
    // } else {
    //     if (jQuery("." + e.class).hasClass("solved")) {
    //         jQuery("." + e.class).removeClass("solved");
    //     }
    // }

    tileCheck().then(function(){
        checkWin(winner);
    });

});



jQuery.fn.rotate = function (degrees) {
    console.log("rotating")
    var css = {
        '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        'transform': 'rotate(' + degrees + 'deg)'
    }
    $(this).css(css);
    return;
};