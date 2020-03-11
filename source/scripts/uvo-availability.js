$(document).ready(() => {
    // window.allVehicles = {
    //     elements : {
    //         vehicle_images : $('.vehicle-image'),
    //         add_active_rectangle : $('.active-rectangle'),
    //         vehicle_wrapper : $('.js-vehicle-wrapper')
    //     },
    //     methods : {
    //         editing : {
    //             _select_vehicle : () => {
    //                 // e.stopPropagation();
    //                 window.allVehicles.elements.add_active_rectangle.addClass('active')
    //             },
    //             _deselect_vehicle : () => {
    //                 // e.stopPropagation();
    //                 window.allVehicles.elements.add_active_rectangle.removeClass('active')
    //             },
    //             _toggle_vehicle : () => {
    //                 // e.stopPropagation();
    //                 $(this).addClass('active')
    //                 console.log("this got clicked!", $(this));
                    
    //                 // if(window.allVehicles.elements.add_active_rectangle.hasClass('active')) {
    //                 //     window.allVehicles.methods.editing._deselect_vehicle();
    //                 // } else {
    //                 //     window.allVehicles.methods.editing._select_vehicle();
    //                 // }
    //             }
    //         }
    //     }
    // }
    // // EVENTS
    // window.allVehicles.elements.vehicle_wrapper.on('click', window.allVehicles.methods.editing._toggle_vehicle)
    // window.allVehicles.elements.vehicle_images.on('click', window.allVehicles.methods.editing._deselect_vehicle)
    //     window.allVehicles.elements.vehicle_images.toggle(
    //         window.allVehicles.methods.editing._deselect_vehicle,
    //         window.allVehicles.methods.editing._select_vehicle
    //     )

        $('.js-vehicle-wrapper').click(function () {
            $('.js-vehicle-wrapper').removeClass('active')
            $(this).addClass('active')
        })
})