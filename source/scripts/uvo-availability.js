$(document).ready(() => {
    window.allVehicles = {
        elements : {
            vehicle_images : $('.vehicle-image'),
            add_active_rectangle : $('.active-rectangle'),
            vehicle_wrapper : $('.js-vehicle-wrapper'),
            vehicle_container : $('.vehicle-container'),
            head_unit_button : $('.head-unit-button')
        },
        methods : {
            editing : {
                _toggle_vehicle : (e) => {
                    var $this = $(e.target)
                    $this.toggleClass('active')
                    if(window.allVehicles.elements.vehicle_wrapper.hasClass('active')) {
                        window.allVehicles.elements.vehicle_wrapper.addClass('inactive')
                    }
                    $this.removeClass('inactive')
                    if(!$this.hasClass('active')) {
                        window.allVehicles.elements.vehicle_wrapper.removeClass('inactive')
                    }
                    if(window.allVehicles.elements.vehicle_wrapper.hasClass('inactive')) {
                        window.allVehicles.elements.vehicle_wrapper.removeClass('active')
                        $this.addClass('active')
                    }
                    
                },
                _toggle_head_unit : (e) => {
                    var $this = $(e.target)
                    $this.toggleClass('black')
                    $this.removeClass('outline')
                    if(!$this.hasClass('black')) {
                        $this.addClass('outline')
                    }
                    if(window.allVehicles.elements.head_unit_button.hasClass('outline')) {
                        window.allVehicles.elements.head_unit_button.removeClass('black')
                        window.allVehicles.elements.head_unit_button.addClass('outline')
                        $this.addClass('black')
                        $this.removeClass('outline')
                        
                    }
                    
                }
            }
        }
    }
    // EVENTS
    window.allVehicles.elements.vehicle_wrapper.click(window.allVehicles.methods.editing._toggle_vehicle)
    window.allVehicles.elements.head_unit_button.click(window.allVehicles.methods.editing._toggle_head_unit)
})