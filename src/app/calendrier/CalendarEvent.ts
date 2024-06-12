import {CalendarEventAction} from "angular-calendar";

export interface EventColor {
    primary: string;
    secondary: string;
}

export interface CalendarEvent {
    start: Date;
    end?: Date;
    title: string;
    color: EventColor;
    actions?: CalendarEventAction[];
    allDay?: boolean;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    candidate?: {
        id: string;
        name: string;
    };
}
