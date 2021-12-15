# Interview Scheduler

## Project Overview

Interview Scheduler is a single page application built using the React framework. A user is able to book an interview appointment from Monday - Friday between 12pm - 4pm. The user can then type their name and select an interviewer from a list of interviewers. This data is persisted by the API server using a PostgreSQL database. Meanwhile, the client application communicates with an API server over HTTP, using the JSON format. The project was tested extensively using Storybook, Jest, and Cypress.

## Technical Specifications
  - React
  - Webpack, Babel
  - Axios
  - Storybook, Webpack Dev Server, Jest, Testing    
    Library, Cypress

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress
```sh
npm run cypress
```

## Screenshots

!["Root page upon init"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Scheduler_init.png?raw=true)
!["Adding new appointment"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Creating_appointment.png?raw=true)
!["Name input and interviewer selected"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Name_and_Interviewer_selected.png?raw=true)
!["Saving"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Saving_new_interview.png?raw=true)
!["New interview added"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/New_interview_added.png?raw=true)
!["Confirmation upon delete"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Confirmation_on_delete.png?raw=true)
!["Deleting status indicator"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Deleting.png?raw=true)
!["Appointment Deleted"](https://github.com/CrumpetsNTea/scheduler/blob/master/docs/Deleted.png?raw=true)
