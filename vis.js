function toggle_labels() {
    // The 0 indices are the index of the plot; the page
    // only has one, so the index is zero.

    three_d.plots[0].label_toggle = !three_d.plots[0].label_toggle;

    for (var i = 0; i < three_d.plots[0].points.length; i++) {
        if (three_d.plots[0].label_toggle) {
            three_d.show_label(0, i);
        } else {
            three_d.hide_label(0, i);
        }
    }

    three_d.update_render(0);
}

// function randomise_points() {
//     var i;

//     var params = {};
//     params.keep_axes = true;
//     params.data = [];

//     var r, g, b;

//     for (i = 0; i < three_d.plots[0].points.length; i++) {
//         r = Math.round(255 * Math.random());
//         g = Math.round(255 * Math.random());
//         b = Math.round(255 * Math.random());

//         params.data.push({
//             "x": Math.random(),
//             "y": Math.random(),
//             "z": Math.random(),
//             "size": 0.1 + Math.random(),
//             "color": 65536 * r + 256 * g + b,
//             "other": { "label_on": params.show_labels }
//         });
//     }

//     three_d.change_data(0, params, false, true);
// }

function init_plot(data) {
    var i, j;
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    var num_points = 50;

    var params = {};
    params.div_id = "div_plot_area";
    params.label_font_size = 18;
    params.axis_font_size = 36;
    params.axis_font_color = "#FF0000";
    params.show_labels = true;
    params.max_point_height = 40;
    params.x_scale_bounds = [-2, 4];
    params.y_scale_bounds = [-2, 3];
    params.z_scale_bounds = [-1, 2];
    params.tick_font_size = 20;

    params.data = [];

    // params.data.push({
    //     "x": 0,
    //     "y": 0,
    //     "z": 0,
    //     "size": 1,
    //     "color": "transparent",
    //     "label": '',
    //     "other": { "label_on": params.show_labels }
    // })
    var i = 0;
    colors = ['crimson','orange','gold',
    'mediumseagreen','turquoise','deepskyblue',
    'blueviolet','pink','peru']
    data.forEach(elt => {
        params.data.push({
            "x": elt.vector.x,
            "y": elt.vector.y,
            "z": elt.vector.z,
            // "size": .1,
            "color": colors[i],
            "label": elt.word,
            "other": { "label_on": params.show_labels }
        })
        i++
    });
    // test
    // params.data.push({
    //     "x": 0,
    //     "y": 0,
    //     "z": 0,
    //     "size": 5,
    //     "color": "blue",
    //     "label": "this_label",
    //     "other": { "label_on": params.show_labels }
    // })
    // params.data.push({
    //     "x": 5,
    //     "y": 5,
    //     "z": 5,
    //     "size": 1,
    //     "color": "red",
    //     "label": "this_label",
    //     "other": { "label_on": params.show_labels }
    // })
    // test

    // var rgb = [0, 0, 0];

    // for (i = 0; i < num_points; i++) {
    //     this_label = "";
    //     this_color = 0;
    //     for (j = 0; j < 3; j++) {
    //         n = Math.floor(Math.random() * 26);
    //         this_label += alphabet.substr(n, 1);

    //         rgb[j] = Math.round(255 * Math.random());
    //     }
    //     console.log('rgb',rgb);
    //     params.data.push({
    //         "x": Math.random(),
    //         "y": Math.random(),
    //         "z": Math.random(),
    //         "size": 0.1 + Math.random(),
    //         "color": 65536 * rgb[0] + 256 * rgb[1] + rgb[2],
    //         "label": this_label,
    //         "other": { "label_on": params.show_labels }
    //     });
    // }

    params.mouseover = function (i_plot, i, d) {
        three_d.set_point_color(i_plot, i, 0xFFFFFF);
    };

    params.mouseout = function (i_plot, i, d) {
        if (d.input_data.other.hasOwnProperty("clicked")) {
            if (!d.input_data.other.clicked) {
                three_d.set_point_color(i_plot, i, d.input_data.color);
            } else {
                three_d.set_point_color(i_plot, i, 0xFFFFFF);
            }
        } else {
            three_d.set_point_color(i_plot, i, d.input_data.color);
        }
    };


    params.click = function (i_plot, i, d) {
        if (d.input_data.other.hasOwnProperty("clicked")) {
            d.input_data.other.clicked = !d.input_data.other.clicked;
        } else {
            // First time clicking it.
            d.input_data.other.clicked = true;
        }

        if (d.input_data.other.clicked) {
            three_d.set_point_color(i_plot, i, 0xFFFFFF);
            if (d.have_label) {
                three_d.set_label_background_color(i_plot, i, 0xFFFFFF);
            }

        } else {
            three_d.set_point_color(i_plot, i, d.input_data.color);
            if (d.have_label) {
                three_d.set_label_color(i_plot, i, d.input_data.color);
                three_d.set_label_background_color(i_plot, i, 0x000000);
            }
        }
    };

    three_d.make_scatter(params);

    three_d.plots[0].label_toggle = true;
}

$( document ).ready(function() {
    console.log( "ready!" );
    $.getJSON( "numbers3d_2-5.json", function( data ) {
        console.log(data);
        init_plot(data);
    });
});

