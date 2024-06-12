import { CalendarEvent as AngularCalendarEvent } from 'angular-calendar';
export interface EventColor {
    primary: string;
    secondary: string;
}
export interface CalendarEvent extends AngularCalendarEvent {
    candidate?: {
        id: string;
        name: string;
    };
}
