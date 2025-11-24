import React from 'react';

// Reusable SVG wrapper for consistent sizing
const IconWrapper = ({ children, className = "h-5 w-5" }: { children: React.ReactNode; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const Wallet = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M21 7.28V5C21 3.9 20.1 3 19 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 12V12.05C20.01 12.04 20.02 12.02 20.03 12C20.02 11.98 20.01 11.96 20 11.95V12ZM20 9C20.55 9 21 9.45 21 10V14C21 14.55 20.55 15 20 15H19C18.45 15 18 14.55 18 14V10C18 9.45 18.45 9 19 9H20ZM4 19V5H19V7H6C4.9 7 4 7.9 4 9V15C4 16.1 4.9 17 6 17H19V19H4Z" />
  </IconWrapper>
);

export const TrendingUp = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" />
  </IconWrapper>
);

export const Lock = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM9 8V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9Z" />
  </IconWrapper>
);

export const Unlock = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13ZM18 8H17V6C17 4.34 15.66 3 14 3C12.34 3 11 4.34 11 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 1C14.76 1 17 3.24 17 6V8H9V6C9 3.24 11.24 1 12 1Z" />
  </IconWrapper>
);

export const AlertTriangle = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 2L1 21H23L12 2ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" />
  </IconWrapper>
);

export const ArrowRight = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
  </IconWrapper>
);

export const ArrowLeft = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
  </IconWrapper>
);

export const Settings = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M19.14 12.94C19.14 12.78 19.14 12.61 19.14 12.45C19.14 12.29 19.14 12.12 19.14 11.96L21.41 10.19C21.61 10.03 21.67 9.75 21.54 9.53L19.39 5.8C19.26 5.58 19.01 5.49 18.77 5.58L16.1 6.66C15.55 6.24 14.94 5.89 14.28 5.61L13.87 2.76C13.83 2.51 13.62 2.33 13.37 2.33H9.08C8.83 2.33 8.62 2.51 8.58 2.76L8.17 5.61C7.51 5.88 6.9 6.23 6.35 6.66L3.68 5.58C3.44 5.49 3.19 5.58 3.06 5.8L0.91 9.53C0.78 9.75 0.84 10.03 1.04 10.19L3.31 11.96C3.31 12.12 3.31 12.29 3.31 12.45C3.31 12.61 3.31 12.78 3.31 12.94L1.04 14.71C0.84 14.87 0.78 15.15 0.91 15.37L3.06 19.1C3.19 19.32 3.44 19.41 3.68 19.32L6.35 18.24C6.9 18.66 7.51 19.01 8.17 19.29L8.58 22.14C8.62 22.39 8.83 22.57 9.08 22.57H13.37C13.62 22.57 13.83 22.39 13.87 22.14L14.28 19.29C14.94 19.01 15.55 18.66 16.1 18.24L18.77 19.32C19.01 19.41 19.26 19.32 19.39 19.1L21.54 15.37C21.67 15.15 21.61 14.87 21.41 14.71L19.14 12.94ZM11.22 15.54C9.51 15.54 8.13 14.15 8.13 12.45C8.13 10.74 9.51 9.36 11.22 9.36C12.93 9.36 14.31 10.74 14.31 12.45C14.31 14.15 12.93 15.54 11.22 15.54Z" />
  </IconWrapper>
);

export const Shield = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H7V10H12V7.01L15 10.01L12 13V11.99Z" />
  </IconWrapper>
);

export const Activity = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12ZM15.97 10.97C16.26 10.68 16.26 10.21 15.97 9.92C15.68 9.63 15.21 9.63 14.92 9.92L11.5 13.34L9.08 10.92C8.79 10.63 8.32 10.63 8.03 10.92C7.74 11.21 7.74 11.68 8.03 11.97L10.97 14.92C11.12 15.07 11.31 15.14 11.5 15.14C11.69 15.14 11.88 15.07 12.03 14.92L15.97 10.97Z" />
  </IconWrapper>
);

export const DollarSign = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.23 14.2 15.22C14.2 16.38 13.02 17.1 11.5 17.1C9.48 17.1 8.74 16.12 8.62 14.5H6.41C6.54 16.79 8.01 18.25 10 18.7V21H13V18.72C15.2 18.27 16.5 16.92 16.5 15.1C16.5 12.45 14.33 11.5 11.8 10.9Z" />
  </IconWrapper>
);

export const Clock = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" />
  </IconWrapper>
);

export const Menu = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
  </IconWrapper>
);

export const X = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
  </IconWrapper>
);

export const CheckCircle = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
  </IconWrapper>
);

export const AlertCircle = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" />
  </IconWrapper>
);

export const History = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M13 3C8.03 3 4 7.03 4 12H1L5 16L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 20 10.5 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" />
  </IconWrapper>
);

// New Icons

export const Zap = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </IconWrapper>
);

export const Brain = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9 13H15V11H9V13ZM9 9H15V7H9V9ZM9 17H15V15H9V17Z" />
  </IconWrapper>
);

export const Database = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 2C6.48 2 2 4.24 2 7V17C2 19.76 6.48 22 12 22C17.52 22 22 19.76 22 17V7C22 4.24 17.52 2 12 2ZM20 17C20 18.66 16.41 20 12 20C7.59 20 4 18.66 4 17V15.28C5.55 16.36 8.62 17 12 17C15.38 17 18.45 16.36 20 15.28V17ZM20 12C20 13.66 16.41 15 12 15C7.59 15 4 13.66 4 12V10.28C5.55 11.36 8.62 12 12 12C15.38 12 18.45 11.36 20 10.28V12ZM20 7C20 8.66 16.41 10 12 10C7.59 10 4 8.66 4 7C4 5.34 7.59 4 12 4C16.41 4 20 5.34 20 7Z" />
  </IconWrapper>
);

export const UserCheck = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14ZM21.34 6.54L19.2 4.4L18.14 5.46L20.27 7.6L21.34 6.54Z" />
  </IconWrapper>
);

export const ChevronRight = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" />
  </IconWrapper>
);

export const LayoutDashboard = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" />
  </IconWrapper>
);

export const Vault = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 1L3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5L12 1ZM12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11ZM18 19H6V6.8L12 4.13L18 6.8V19Z" />
  </IconWrapper>
);

export const ShieldAlert = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM13 16H11V14H13V16ZM13 12H11V8H13V12Z" />
  </IconWrapper>
);

export const Droplets = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <path d="M16.5 13C15.3 13 14.28 13.33 13.4 13.91L13.91 14.42C14.62 14.05 15.5 13.9 16.5 14.41C16.95 14.64 17.34 15.03 17.59 15.5C18.1 16.5 17.95 17.38 17.58 18.09L18.09 18.6C18.67 17.72 19 16.7 19 15.5C19 14.12 17.88 13 16.5 13ZM12 2L5.5 9.5C4.09 11.11 3.5 12.74 3.5 14.5C3.5 19.19 7.31 23 12 23C16.69 23 20.5 19.19 20.5 14.5C20.5 12.74 19.91 11.11 18.5 9.5L12 2ZM12 21C8.41 21 5.5 18.09 5.5 14.5C5.5 13.29 5.92 12.09 6.99 10.82L12 5.04L17.01 10.82C18.08 12.09 18.5 13.29 18.5 14.5C18.5 18.09 15.59 21 12 21Z" />
  </IconWrapper>
);