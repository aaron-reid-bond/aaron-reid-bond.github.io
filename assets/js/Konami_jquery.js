$( "#deal" ).hide()
$( "#rick" ).hide()

let keyCombo = []


$(document).keyup(function(event){
    if(event.key === "ArrowUp") {
        keyCombo.push(event.key)
        console.log(keyCombo)
    }
    if(event.key === "ArrowDown") {
        keyCombo.push(event.key)
        console.log(keyCombo)
    }
    if(event.key === "ArrowLeft") {
        keyCombo.push(event.key)
        console.log(keyCombo)
    }
    if(event.key === "ArrowRight") {
        keyCombo.push(event.key)
        console.log(keyCombo)
    }
    if(event.key === "b") {
        keyCombo.push(event.key)
        console.log(keyCombo)
    }
    if(event.key === "a") {
        keyCombo.push(event.key)
        console.log(keyCombo)
    }
});


$(document).keyup(function(event) {
    if (event.key === "Enter") {
        if(change(keyCombo) === true) {
            $( "#cover" ).removeClass( "d-none" );
            $( "#video" ).removeClass( "d-none" );
            $( "#video" ).append("<iframe scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1242868615&color=%23ff5500&auto_play=true&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false\"></iframe>");
            $( "#question" ).addClass( "d-none" );
            $( "#deal" ).slideDown( 12000 );
            $( "#rick" ).fadeIn( 12000 );
        } else {
            while(keyCombo.length){
                keyCombo.shift();
                console.log(keyCombo);

            }
        }
    }
    // keyCombo = ''
});
function change (arr) {
    console.log(arr.join(''));
    let arrString = arr.join('')

    if(arrString === 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba') {
        return true
    }
}

$(document).mousemove(function(e) {
    $('#deal').offset({
        left: e.pageX,
        top: e.pageY + 20
    });
});
