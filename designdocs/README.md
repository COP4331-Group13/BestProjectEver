# Program Organization
- [Diagram 1](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Diagram_1.pdf)
- [Diagram 2](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Diagram_2.pdf)
- [Diagram 3](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Diagram_3.pdf)

The event planner application will be a microkernel architecture, revolving around a local storage component. All of the workflow will come in and out of the local storage, it will make it possible to hold the current user data and be able to have this data available whenever a new instance for the same user is created. Plugins will exist for event selection, the guest view (guest will only have read access to the planner view), the email component (planner will be able to send out invitation emails), the seating chart (takes in the algorithm method), the login controller (validates users access, planner/guest), and a component that handles reading and writing to the database. The data will only be written to the database once the planner has finished the current session, no unecessary connections and access will be made. The database will have tables for planner information, guest information (contains the validation method for a guest access), event information (provides guest access based on each event), guest groups, possible event preferences, and preferences for specific guests (core application functionallity, seats guest based on their preferences).

# Major Classes
- [Class Diagram](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/uml-class.pdf)

LocalStorage - Core class, holds the necessary information to allow a user (planner/guest) to access their events.

User - Has the user data such as contact info.

Guest - Has all the guests informations such as their preferences (allows them to be seated in a preferred way), what groups they belong to (separated by the event planner), their seating exceptions (along with their preferences, can be chosen where/not to seat by) which can be overrulled by planner exception.

SaveLoad - Saves and loads information from the LocalStorage to the database.

Login - Allows a user to login via a password (for planner) or an event pin (for guest).

Security - Secures the password, pin, in order to validate and/or store on the database.

PlannerView - Has the items locations, for the planner/guest to be able to see the current event plan.

SendEmail - Contains the sender email address (planner), requests the email from the guest and sends invitations/updates in email form.

# Data Design
- [Entity Relationship Diagram](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/seatplanner_erd.pdf)

# Business Rules

# User Interface Design
- [Login Screen](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Login_Screen.pdf)
- [Guest View](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Guest_View1.pdf)
- [Planner Event Selection](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Planner_Selection1.pdf)
- [Planner View](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Planner_View_11.pdf)
- [Planner View: Accessing Guest Information](https://github.com/COP4331-Group13/BestProjectEver/blob/master/designdocs/Planner_View_2.pdf)

When a user first accesses the site, they will be able to decide if they want to log in as a guest or as a planner. 

A guest will be able to log in using the email associated with their data on the guest list, and a code given to them by the planner that is generated for the event. A guest will then be able to see the layout of the event, where they are seated, their own information, groups, and preferences, and information on the event such as the time and location. A guest will be able to edit their own information as needed.

An event planner, after login, will be taken to an event selection screen. Here they can view events they have already made, create new events, or edit event settings (such as the location, date, time, etc). When an event planner selects or creates an event, they are taken to the planner view, where they will be able to create a layout for the event, view and update their guest list, and seat their guests in the seating chart. Clicking on the + next to a guest will open up the guest information, where the planner will be able to see contact information and preferences for their guest, along with any other important information they might need to see.

User stories 000 and 003 are satisfied by having the separate guest and planner views. User stories 001 and 002 are satisfied within the guest view -- a guest will be able to see and update their own information. User stories 004, 005, and 006 are satisfied by the planner being able to see and access their guest list, and are given options to add or remove guests as needed. User stories 007 - 016 all deal with the seating chart itself. An event organizer will be able to drag and drop items from the bottom bar to place in their seating chart and determine the room layout. They will be able to add, move, and remove the seating chart items. As the seating chart exists, this satisfies user story 018. 

# Resource Management

# Security
Users are authenticated based on their roles, planners will have a separate account from the guest and are able to edit their passwords at any given time, passwords will be encrypted when writing to the database; guests will have an account automatically created once in the event planner's list, a unique pin code will be generated along with the current event pin, which will then give the guests access to the event view. Only planners will have access to the seating chart in order to modify and change preferences. Guests will only have view access to the chart.

# Performance

# Scalability

# Interoperability

# Internationalization/Localization

# Input/Output

# Error Processing

# Fault Tolerance

# Architectural Feasibility

# Overengineering

# Build-vs-Buy Decisions

# Reuse

# Change Strategy
