// import React from "react";
// import "./styles.scss";
// import Header from "./Header";
// import Show from "./Show";
// import Empty from "./Empty";
// import Form from "./Form";
// import Status from "./Status";
// import Confirm from "./Confirm";
// import useVisualMode from "hooks/useVisualMode";
// import Error from "./Error";

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";
// const SAVING = "SAVING";
// const DELETING = "DELETING";
// const CONFIRM = "CONFIRM";
// const EDIT = "EDIT";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

// export default function Appointment(props) {
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );
//   const onAdd = () => {
//     transition(CREATE);
//   };

//   function save(name, interviewer) {
//     const interview = {
//       student: name,
//       interviewer,
//     };

//     if (!interviewer || !name) {
//       transition(ERROR_SAVE, true)
//     }
//     else {
//       transition(SAVING);

//       props
//         .bookInterview(props.id, interview)
//         .then(() => {
//           console.log("showTesting")
//           transition("SHOW");
//         })
//         .catch(error => {
//           console.log("testing")
//           transition(ERROR_SAVE, true)
//         }

//         );
//     }
//   }

//   function editInterview() {
//     transition(EDIT);
//   }

//   function cancelInterview() {
//     transition(CONFIRM);
//   }

//   function onCancel() {
//     // Action to be taken when user cancels the delete operation
//     transition(SHOW);
//   }

//   function destroy() {
//     // Action to be taken when user confirms the delete operation
//     transition(DELETING, true);
//     props
//       .cancelInterview(props.id)
//       .then(() => {
//         transition(EMPTY);
//       })
//       .catch(() => {
//         transition(ERROR_DELETE, true);
//       });
//   }
//   console.log(props)
//   return (
//     <article className="appointment" data-testid="appointment">
//       <Header time={props.time} />
//       {mode === EMPTY && <Empty onAdd={onAdd} />}
//       {mode === SHOW && props.interview?.student && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={cancelInterview}
//           onEdit={editInterview}
//         />
//       )}
//       {mode === CREATE && (
//         <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
//       )}
//       {mode === SAVING && <Status message={"Saving"} />}

//       {mode === DELETING && <Status message={"Deleting"} />}

//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you want to delete this appointment?"
//           onCancel={onCancel}
//           onConfirm={destroy}
//         />
//       )}
//       {mode === EDIT && (
//         <Form
//           student={props.interview.student}
//           interviewers={props.interviewers}
//           interviewer={props.interview.interviewer.id}
//           onCancel={back}
//           onSave={save}
//         />
//       )}
//       {mode === ERROR_SAVE && <Error message={"Error saving appointment"} onClose={back} />}
//       {mode === ERROR_DELETE && (
//         <Error message={"Error deleting appointment"} onClose={back} />
//       )}
//     </article>
//   );
// }

// import React from "react";
// import "components/Application.scss";
// import DayList from "components/DayList"
// import Appointment from "components/Appointment/index"
// import useApplicationData from "hooks/useApplicationData";
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",

//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",

//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",

//   },


// };

// export default function Application(props) {
//   const {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview,
//     interviewers,
//     appointments,
//   } = useApplicationData();


//   const schedule = appointments.map(appointment => {
//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={appointment.interview}
//         interviewers={interviewers}
//         bookInterview={bookInterview}
//         cancelInterview={cancelInterview}
//       />
//     )
//   })




//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu" >
//           <DayList
//             days={state.days}
//             value={state.day}
//             onChange={setDay}
//           />
//           <div>

//           </div>
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">

//         {schedule}
//         <Appointment

//           key="last"
//           time="5pm"
//         />
//       </section>
//     </main>
//   );
// }

import React from "react";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";

import DayList from "components/DayList";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}<Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}