# Cinema Frontend Next.js

A modern, responsive web application for a cinema booking system built with Next.js 15 and React 19. This application provides a seamless movie ticket booking experience with a beautiful and intuitive user interface.

## Features

- 🎬 Movie browsing and searching
- 🎟️ Ticket purchase flow
- 🎭 Theatre and auditorium selection
- 💺 Interactive seat selection
- 📅 Date and screening time selection
- 👤 User authentication and profile management
- 🎫 Ticket management and history
- 🔍 Advanced search functionality
- 📱 Responsive design for all devices

## Technologies Used

- **Framework**: Next.js 15.3.1 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**:
  - Radix UI for accessible components
  - Custom components with Tailwind
- **Icons**: Lucide React and React Icons
- **Type Safety**: TypeScript
- **Development Tools**:
  - ESLint for code linting
  - Turbopack for fast development
  - PostCSS for CSS processing

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── skeletons/   # Loading state components
├── contexts/        # React context providers
└── lib/            # Utility functions and configurations
```

## Key Components

- `MovieCard` & `MovieBlock`: Display movie information
- `TheatreSection` & `AuditoriumCard`: Theatre and auditorium selection
- `SeatSelectionModal`: Interactive seat selection interface
- `TicketPurchaseFlow`: Complete ticket purchase process
- `LoginModal`: User authentication
- `UserTicketSheet`: Ticket management
- `SearchSheet`: Advanced movie search
- `Header` & `Footer`: Navigation and layout components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- Uses Turbopack for faster development experience
- ESLint for code quality
- TypeScript for type safety
- Tailwind CSS for styling

## License

This project is private and proprietary.
