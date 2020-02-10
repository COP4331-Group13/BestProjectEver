# Architecture
- [Diagram 1](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Diagram_1.pdf)
- [Diagram 2](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Diagram_2.pdf)
- [Diagram 3](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Diagram_3.pdf)
- [Entity Relationship Diagram](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/seatplanner_erd.pdf)

The event planner application will be a microkernel architecture, revolving around a local storage component. All of the workflow will come in and out of the local storage. Plugins will exist for event selection, the guest view, the email component, the seating chart, the login controller, and a component that handles reading and writing to the database. The database will have tables for planner information, guest information, event information, guest groups, possible event preferences, and preferences for specific guests.

# Class Diagram
- [Class Diagram](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/uml-class.pdf)

LocalStorage - Core class, holds the necessary information to allow a user (planner/guest) to access their events.

User - Has the user data such as contact info.

Guest - Has all the guests informations such as their preferences (allows them to be seated in a preferred way), what groups they belong to (separated by the event planner), their seating exceptions (along with their preferences, can be chosen where/not to seat by) which can be overrulled by planner exception.

SaveLoad - Saves and loads information from the LocalStorage to the database.

Login - Allows a user to login via a password (for planner) or an event pin (for guest).

Security - Secures the password, pin, in order to validate and/or store on the database.

PlannerView - Has the items locations, for the planner/guest to be able to see the current event plan.

SendEmail - Contains the sender email address (planner), requests the email from the guest and sends invitations/updates in email form.

# User Interface
- [Login Screen](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Login_Screen.pdf)
- [Guest View](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Guest_View1.pdf)
- [Planner Event Selection](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Planner_Selection1.pdf)
- [Planner View](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Planner_View_11.pdf)
- [Planner View: Accessing Guest Information](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Planner_View_2.pdf)

When a user first accesses the site, they will be able to decide if they want to log in as a guest or as a planner. 

A guest will be able to log in using the email associated with their data on the guest list, and a code given to them by the planner that is generated for the event. A guest will then be able to see the layout of the event, where they are seated, their own information, groups, and preferences, and information on the event such as the time and location. A guest will be able to edit their own information as needed.

An event planner, after login, will be taken to an event selection screen. Here they can view events they have already made, create new events, or edit event settings (such as the location, date, time, etc). When an event planner selects or creates an event, they are taken to the planner view, where they will be able to create a layout for the event, view and update their guest list, and seat their guests in the seating chart. Clicking on the + next to a guest will open up the guest information, where the planner will be able to see contact information and preferences for their guest, along with any other important information they might need to see.

User stories 000 and 003 are satisfied by having the separate guest and planner views. User stories 001 and 002 are satisfied within the guest view -- a guest will be able to see and update their own information. User stories 004, 005, and 006 are satisfied by the planner being able to see and access their guest list, and are given options to add or remove guests as needed. User stories 007 - 016 all deal with the seating chart itself. An event organizer will be able to drag and drop items from the bottom bar to place in their seating chart and determine the room layout. They will be able to add, move, and remove the seating chart items. As the seating chart exists, this satisfies user story 018. 
