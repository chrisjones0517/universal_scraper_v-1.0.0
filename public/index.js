$(document).ready(() => {

    let nightmareArr = [];

    $('#scrapeBtn').on('click', (e) => {
        e.preventDefault();
        const URL = $('#startingURL').val().trim();
        $('iframe').attr('src', URL)



        // const obj = {
        //     first,
        //     last
        // };

        // $.ajax({
        //     url: '/post',
        //     method: 'POST',
        //     data: obj,
        //     dataType: 'text',
        //     error: (err) => {
        //         $('#statusDiv').html('<h4>An error occurred while processing your request.</h4>');
        //         console.log(err);
        //     }
        // }).then(function (res) {
        //     $('#firstName').val('');
        //     $('#lastName').val('');
        //     $('#returnedHTML').empty().append(`
        //         <div>${res}</div>
        //     `);

        //     let linkArr = $('.item-buttons > a');

        //     $.each(linkArr, (index, el) => {
        //         let link = $(el).attr('href');
        //         let newLink = `https://nmbn.boardsofnursing.org${link}`;
        //         // $(el).attr('href', newLink);

        //         $(el).html(`<iframe src="${newLink}" width="1150"></iframe>`);

        //     });
        // });
    });


    $('#goto-btn').on('click', (e) => {
        const url = $('#goto').val().trim();
        nightmareArr.push({ URL: url });
        $('#goto').val('');
        console.log(nightmareArr);
    });

    $('#insert-selector-btn').on('click', (e) => {
        const selector = $('#insert-selector').val().trim();
        const text = $('#insert-text').val().trim();
        nightmareArr.push({ INSERT: [{ SELECTOR: selector }, { TEXT: text }]});
        $('#insert-selector').val('');
        $('#insert-text').val('');
        console.log(nightmareArr);
    });

    $('#type-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#click-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#check-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#uncheck-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#select-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#wait-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#capture-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#list-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#table-selector-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#screenshot-btn').on('click', (e) => {
        console.log(e.target);
    });

    $('#refresh').on('click', (e) => {
        console.log(e.target);
    });

    $('#inject-btn').on('click', (e) => {
        console.log(e.target);
    });
});


