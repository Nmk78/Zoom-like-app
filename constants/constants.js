import { newMeetingHandler } from "@/lib/quickButtonHandlers";

export const tabs = [
  {
    icon: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    icon: "/icons/plus.svg",
    route: "/personal-room",
    label: "Personal Room",
  },
  {
    icon: "/icons/upcoming.svg",
    route: "/upcoming",
    label: "Upcoming",
  },
  {
    icon: "/icons/previous.svg",
    route: "/previous",
    label: "Previous",
  },
  {
    icon: "/icons/record.svg",
    route: "/recordings",
    label: "Recordings",
  },

];

export const quickButtons = [
  {
    icon: "/icons/plus.svg",
    type: "instantMeeting",
    label: "New Meeting",
    buttonLabel: "Join Meeting",
  },
  {
    icon: "/icons/meeting-join.svg",
    type: "joiningMeeting",
    label: "Join Meeting",
    buttonLabel: "Create Meeting",
  },
  {
    icon: "/icons/schedule.svg",
    type: "scheduleMeeting",
    label: "Schedule Meeting",
    buttonLabel: "Schedule Meeting",
  },
  {
    icon: "/icons/record.svg",
    type: "record",
    label: "View Recording",
    buttonLabel: "",
  },
];
