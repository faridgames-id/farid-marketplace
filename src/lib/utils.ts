/**
 * Farid Shop Game — Utility Functions
 * ─────────────────────────────────────
 * `cn()` — Safe dynamic class merger using clsx + tailwind-merge.
 * Prevents conflicting Tailwind classes and cleans up conditional logic.
 *
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-accent-500', className)
 *   cn('text-sm', { 'text-lg': isLarge, 'font-bold': isBold })
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes safely.
 * Resolves conflicts (e.g., `px-4` + `px-6` → `px-6`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Indonesian Rupiah.
 * Usage: formatRupiah(150000) → "Rp 150.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Checks if the current time is within operational hours.
 * Operational hours: 09:00 – 20:00 WIB (UTC+7).
 */
export function isOperationalHours(): boolean {
  const now = new Date();
  // Convert to WIB (UTC+7)
  const wibOffset = 7 * 60;
  const localOffset = now.getTimezoneOffset();
  const wibTime = new Date(now.getTime() + (wibOffset + localOffset) * 60 * 1000);

  const hours = wibTime.getHours();
  const minutes = wibTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const openTime  = 9 * 60;   // 09:00 = 540 minutes
  const closeTime = 20 * 60;  // 20:00 = 1200 minutes

  return totalMinutes >= openTime && totalMinutes < closeTime;
}

/**
 * Generates a WhatsApp API URL with a pre-filled message.
 * @param phone    - Phone number with country code, no '+' (e.g., "6287814897713")
 * @param message  - The message to send (will be URL encoded)
 */
export function generateWAUrl(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Debounce function — limits how often a function is called.
 * Used for search input to prevent excessive API calls.
 * @param fn    - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Truncates a string to a max length and adds "..." ellipsis.
 * @param text   - The string to truncate
 * @param maxLen - Maximum character length (default: 50)
 */
export function truncate(text: string, maxLen: number = 50): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3) + '...';
}

/**
 * Clamps a number between min and max values.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
