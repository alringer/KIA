$(document).ready(() => {
    window.allVehicles = {
        elements : {
            vehicle_images : $('.vehicle-image'),
            add_active_rectangle : $('.active-rectangle'),
            vehicle_wrapper : $('.js-vehicle-wrapper')
        },
        methods : {
            editing : {
                _toggle_vehicle : (e) => {
                    var $this = $(e.target)
                    window.allVehicles.elements.vehicle_wrapper.removeClass('active')
                    $this.addClass('active')
                    window.allVehicles.elements.vehicle_wrapper.addClass('inactive')
                    $this.removeClass('inactive')
                }
            }
        }
    }
    // EVENTS
    window.allVehicles.elements.vehicle_wrapper.click(window.allVehicles.methods.editing._toggle_vehicle)
})