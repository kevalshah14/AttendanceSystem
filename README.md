


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

- **[`app/attendance/[attendanceId]/page.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/app/attendance/[attendanceId]/page.tsx")**: Implements the attendance page with geofence functionality.
- **[`components/dynamic-geofence-attendance-system.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/components/dynamic-geofence-attendance-system.tsx")**: Contains the dynamic geofence attendance system component.
- **`components/ui/`**: Contains reusable UI components like [`Button`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A9%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A9%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition"), [`Input`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A9%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fui%2Finput.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A7%2C%22character%22%3A6%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition"), and [`Label`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A5%2C%22character%22%3A9%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition").
- **`lib/utils.ts`**: Utility functions used across the project.
- **[`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/.env")**: Environment variables for Prisma and other configurations.
- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`tsconfig.json`**: TypeScript configuration.

## Environment Variables

Environment variables are defined in the [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/.env") file. Example:
```plaintext
DATABASE_URL="file:./dev.db"
```

## API Endpoints

### Geofence API

- **GET `/api/geofence?attendanceId={attendanceId}`**: Fetch geofence data for a specific attendance ID.
- **POST `/api/geofence`**: Set a new geofence location.

### Attendance API

- **GET `/api/attendance`**: Fetch all attendance records.
- **DELETE `/api/attendance`**: Clear all attendance records.

## Components

### [`AttendancePage`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A19%2C%22character%22%3A24%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition")

Located in [`app/attendance/[attendanceId]/page.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/app/attendance/[attendanceId]/page.tsx").

### [`DynamicGeofenceAttendanceSystemComponent`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A28%2C%22character%22%3A16%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition")

Located in [`components/dynamic-geofence-attendance-system.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/components/dynamic-geofence-attendance-system.tsx").

### UI Components

- **[`Button`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A9%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fdynamic-geofence-attendance-system.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A9%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition")**: components/ui/button.tsx
- **[`Input`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A9%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fui%2Finput.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A7%2C%22character%22%3A6%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition")**: [`components/ui/input.tsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fcomponents%2Fui%2Finput.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "/Users/keval/Documents/VSCode /AttendanceSystem/my-app/components/ui/input.tsx")
- **[`Label`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fkeval%2FDocuments%2FVSCode%20%2FAttendanceSystem%2Fmy-app%2Fapp%2Fattendance%2F%5BattendanceId%5D%2Fpage.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A5%2C%22character%22%3A9%7D%7D%5D%2C%2278aab39c-dac0-4959-99c4-eb8645180f1e%22%5D "Go to definition")**: components/ui/label.tsx

## Utility Functions

Located in lib/utils.ts.

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License. See the LICENSE file for details.