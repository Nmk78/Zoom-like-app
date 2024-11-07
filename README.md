
# mooZ - Video Meeting Application

mooZ is a video meeting application built with Next.js, Shadcn UI, Clerk for authentication, and Stream Video SDK for video call functionality. The application allows users to schedule, join, and manage video meetings. It also supports viewing upcoming meetings, past meetings, and recorded meetings.

## Features

-   **User Authentication**: Secure authentication using Clerk.
-   **Video Meetings**: Create, join, and manage video meetings with Stream Video SDK.
-   **Upcoming Meetings**: View a list of scheduled meetings.
-   **Past Meetings**: View a list of past meetings.
-   **Recorded Meetings**: Access and view recorded meetings.
-   **Responsive Design**: Ensures a great user experience on both desktop and mobile devices.



## Usage

### Scheduling a Meeting

1.  Click on the "Schedule Meeting" button.
2.  Fill in the meeting details such as title, description, and select a date and time.
3.  Click "Create Meeting" to schedule the meeting. If successful, the meeting link will be copied to the clipboard.

### Joining a Meeting

1.  Click on the "Join Meeting" button.
2.  Enter the meeting code or link.
3.  Join the meeting.

### Viewing Recordings

1.  Click on the "Recordings" button to view all recorded meetings.
2.  Click on a recording to view the details and playback.

## Customization

### UI Components

The UI components are styled using Tailwind CSS. You can customize the styles by editing the Tailwind configuration and CSS classes in the components. Used shadcn for some components.

### Modals and Dialogs

Modals are implemented to handle different types of meetings (instant, scheduled, and joining). You can find the modal component and customize its behavior and appearance.

### Custom Hooks

Several custom hooks are used for managing the state and API calls. For example, `useGetCallsByUser` fetches the calls associated with the logged-in user.

## Known Issues

-   Ensure your system clock is accurate to avoid JWT token errors with Clerk.
    -   This can be fixed by syncing the time in your system settings.
-   If you encounter any issues with the video SDK, refer to the Stream documentation for troubleshooting.

## Reference

This repository was very helpful for this project: [Zoom Clone](https://github.com/adrianhajdin/zoom-clone)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue. This is my refactor and the project name is "mooZ," which is "Zoom" in reverse. Additionally, shadcn is added as a dependency.
