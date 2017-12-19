<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
<style type="text/css">
  body {
    padding: 50px;
  }
  li {
    margin-bottom: 10px;
  }
  hr {
    margin-top: 40px;
    margin-bottom: 40px;
  }
</style>
# V - 4.0.1
* As requested, the climate icons now change when turning climate on/off. We've also addressed additional Seamgen bug fixes
===
# V - 4.0.0
KIA JIRA Issues:
* KOPE-157 [Climate Page] Pressing Plus Button Performs No Action at 64 Degrees
* KOPE-160 [Remote > Climate] Heated Accessory Icons Need Additional Top Padding
* KOPE-161 [Remote > Climate] Too Much Margin Below Upcoming Schedule Tile
* KOPE-162 [Remote > Climate > Heated and Cooled Seats] Control for Backseats is Cut Off
* KOPE-163 [Remote > Climate > Heated and Cooled Seats] Control for Backseats is Cut Off
Seamgen User stories:
* KK-310 As a user I need to see my notifications
* KK-301 As a user I need to be able to mark a maintenance milestone as complete/incomplete
* KK-300 As a user I need to see maintenance milestones
* KK-344 As a user I need to see my preferred dealer
* KK-305 As a user I need to see upcoming appointments
* KK-303 As a user I need to see Active Recalls
* KK-302 As a user I need to see Diagnostic Issues
* KK-304 As a user I need to see Diagnostic Issues
* KK-307 As a user I need to request an appointment
* KK-306 As a user I need to see the indicator light modal
* KK-308 As a user i need to see maintenance history
# V - 3.5.1
* KOPE-141 Modal Popup Scroll issue
* KOPE-153 Dynamic Cards - Missing drop down triangle
===
# V - 3.5.0
Seamgen User stories -
* KK-209 As a user I need to be able to refresh my vehicles status
* KK-291 As a user I need to see when my doors or trunk are open
* KK-287 As a user I need to lock and unlock my car
* KK-288 As a user I need activate Horn & Lights (Panic Mode)
* KK-289 As a user I need to be able to access the security info modal
* KK-347 As a user I need a to refresh the status of my vehicles climate
* KK-375 As a user I need to be able to access the Climate Info Modal
* KK-351 As a user I need a Current Weather card
* KK-370 As a user, I need to know that my climate remote request has failed.
* KK-352 As a user I need a Climate Schedules card
* KK-353 As a user I need to turn my climate on
* KK-350 As a user I need a dial to adjust my vehicles temperature
* KK-354 As a user I need to turn my climate off
* KK-348 As a user I need to turn on my defroster and heated accessories
* KK-349 As a user I need to activate heated seats

KIA JIRA Issues -
* KOPE-147 Separate css for Alerts
* KOPE-146 Bar is Overlapping with Account and vehicle drop downs
* KOPE-136 Overview - HOW TO ACTIVATE - Screen slider index navigation color reversed
##### _notes: Green icons on climate will be updated by KIA & team to support logic_
===
# V - 3.1.0
* Misc Bug fixes
##### _notes: Fire global alerts using: window.alerts.methods.open.\_success() or window.alerts.methods.open.\_error()_
===

# V - 3.5.0

===
# V - 3.0.0
* KOPE-87 IE edge Rendering Issue
* KOPE-58 IE - Font is Stripped
* KK-59 As a user I need to see recommended card templates
* KK- 60 As a user, I need to be able to browse, add and remove dynamic cards
* KK-173 As a user I need a Preferred Dealer card
* KK-175 As a user I need a Climate card template
* KK-176 As a user I need a Financing card template
* KK-177 As a user I need a Learn About Bluetooth card
* KK-178 As a user I need a Informational Videos card
* KK-80 As a user I need to choose my preferred dealer
* KK-69 As a user I need to see the vehicle settings modal
* KK-93 As user I need to delete a vehicle
* KK-81 As a user I need to create a custom field
* KK-172 As a user I need a Vehicle Location card
* KK-265 As a user I need to be able to edit my mileage
* KK-66 As a user I need to see global error and success notifications
* KK-157 As a user I need to refresh the page
* KK-158 As a user I need to send a start / stop charge command
* KK-159 As a user I need to see a Find Charging Station card
* KK-160 As a user I need to see a Charge Schedule card
* KK-161 As a user I need to see the About Your Battery modal
===
# V - 2.1.0
* KK-97 [Mobile, Tablet] Clicking outside of menu does not work properly
* KK-124 Mobile view Tool tip is not Coming
* KK-127 Extra line coming below header on overview pages
* Added Activate UVO Modal on non-activated UVO overview (previously part of v3)
===
# V - 2.0.0
* KK-56 As a user I need to send remote commands from dashboard
* KK-57 As a user I need to know when the system is processing a remote command
* KK-58 As a UVO user I need to see maintenance cards on my dashboard
* KK-62 As a user I need a global navigation bar
* KK-63 As a user I need a primary navigation bar
* KK-64 As a user I need a footer
* KK-65 As a UVO user I need to know when I have not yet activated UVO
* KK-67 As a UVO user I need to see my dashboard
* KK-68 As a non-UVO user I need to see my dashboard
* KK-97 As a user I need to see the vehicle selector
* KK-99 As a user I need to see the account menu
* KK-171 As a non-UVO user I need to see reference tiles
* KOPE-90 Sub Nav Tabs should be generic
* KOPE-43 Mobile - Vehicle Name (nickname) Model and Year off-centered
* KOPE-60 Mobile - My Vehicles: Missing Header
##### _notes: Without the use of page logic, primary nav (white bar) has class modifiers on the a parent element, rather than classes appended to the nav element itself_
===
# V - 1.1.3
* KK-213 Fixes the duplicate events bound for the "My Vehicles" list view header sorting
* KK-212 Fixes the vehicle meta data from being cut off after an accordion interaction is fired
* KK-214 Updates to the viewports, and more closely following bootstrap viewports
* KK-218 Updating the "My Vehicles" section to use the bootstrap grid
* KK-214 Viewports being used by Seamgen are different from the default bootstrap viewports / KOPE -77
* KK-215 Add TOS and PP validation error messaging / KOPE-55
* KK-216 Captcha validation error message / KOPE- 53
* KK-217 Bootstrap: Login Modal
* KK-218 Bootstrap: My Vehicles - Grid View
* KK-219 Bootstrap: Enter Vin (carousel for mobile)
* KK-220 Bootstrap: How to activate UVO modal (double carousel / rework mobile view)
* KK-225 KIA: Add Car Step 2, Car step 3, Add Vehicle Error
* Last minute Error validation request by Kia.
===
# V - 1.1.2
* KK-217 Adjusts the the login to use the login modal

====
# V - 1.1.1
* KK-198 Swapped selectize for bootstrap-select
* KK-209 Added password rules to reset password page
* KK-207 Added reveal password to sign in modal
* KK-208 Disable "select all" on my vehicles page if all checkboxes are selected
* KK-200 Each page now has it's own unique <head> elements
* KK-202 Update tab navigation on my vehicles to use bootstrap tabs
===
# V - 1.1.0
* KK-117  List View | Max cell widths do not match AC
* KK-138  S1: PC | Windows 10 | IE, Edge, FF and Chrome | Scroll bars appearing on modals
* KK-184  S1: PC | Sign In, Create Account & Forgot Password - Erroneous display of the Scroll (Arrows)
* KK-182  S1 : PC | Where Can I find my VIN Modal - Scroll bars appearing on Modals
* KK-188  S1: IE11 and FF 56.0 | Buttons misaligned on "Delete This Vehicle?" modal
* KK-185  S1 : Add your Vehicle modal - Tip text and Spelling errors
* KK-186  S1: Add a Vehicle (empty state) Update capitalization of headline
* KK-119  S1: My Vehicles View - Display of the 'How Do I activate UIVO? button'
* KK-183 S1: Closing of Modal behavior
* KK-189  S1: Add Vehicle | <Save and Close> behavior should match AC
* KK-187  S1: Buttons misaligned on "Add Your Vehicle" modal
* KK-180  Maintenance section - Misspelling
* KK-191  #4 / 11- Global CSS / CSS Framework
* KK-192  #10 - Library Declaration
* KK-193  #12 - HTML validation error
