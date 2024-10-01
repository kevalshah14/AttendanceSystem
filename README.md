# Project Documentation

## Overview

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes a dynamic geofence attendance system.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kevalshah14/AttendanceSystem.git
    cd my-app
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

Start the development server:
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```plaintext
my-app/
    .env
    .eslintrc.json
    .gitignore
    .next/
    app/
        api/
        attendance/
            [attendanceId]/
                page.tsx
        fonts/
        globals.css
        layout.tsx
        page.tsx
    components/
        dynamic-geofence-attendance-system.tsx
        ui/
            button.tsx
            input.tsx
            label.tsx
    lib/
        utils.ts
    prisma/
    README.md
    tailwind.config.ts
    tsconfig.json
```

### Key Files and Directories

- **app/attendance/[attendanceId]/page.tsx**: Implements the attendance page with geofence functionality.
- **[`components/dynamic-geofence-attendance-system.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/components/dynamic-geofence-attendance-system.tsx")**: Contains the dynamic geofence attendance system component.
- **[`components/ui/`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A123%2C%22character%22%3A806%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Contains reusable UI components like `Button`, `Input`, and `Label`.
- **[`lib/utils.ts`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A87%2C%22character%22%3A5%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A129%2C%22character%22%3A11%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Utility functions used across the project.
- **.env**: Environment variables for Prisma and other configurations.
- **[`tailwind.config.ts`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A78%2C%22character%22%3A4%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A89%2C%22character%22%3A5%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Tailwind CSS configuration.
- **[`tsconfig.json`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A79%2C%22character%22%3A4%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A90%2C%22character%22%3A5%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: TypeScript configuration.

## Environment Variables

Environment variables are defined in the .env file. Example:
```plaintext
DATABASE_URL="file:./dev.db"
```

## API Endpoints

### Geofence API

- **GET [`/api/geofence?attendanceId={attendanceId}`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A103%2C%22character%22%3A9%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Fetch geofence data for a specific attendance ID.
- **POST [`/api/geofence`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A103%2C%22character%22%3A9%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Set a new geofence location.

### Attendance API

- **GET [`/api/attendance`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A108%2C%22character%22%3A9%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Fetch all attendance records.
- **DELETE [`/api/attendance`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A108%2C%22character%22%3A9%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition")**: Clear all attendance records.

## Components

### `AttendancePage`

Located in app/attendance/[attendanceId]/page.tsx.

### `DynamicGeofenceAttendanceSystemComponent`

Located in [`components/dynamic-geofence-attendance-system.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/components/dynamic-geofence-attendance-system.tsx").

### UI Components

- **`Button`**: components/ui/button.tsx
- **`Input`**: components/ui/input.tsx
- **`Label`**: components/ui/label.tsx

## Utility Functions

Located in [`lib/utils.ts`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A87%2C%22character%22%3A5%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A129%2C%22character%22%3A11%7D%7D%5D%2C%22ae7ba49a-8573-4344-b846-dd99198d55ab%22%5D "Go to definition").

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License. See the LICENSE file for details.