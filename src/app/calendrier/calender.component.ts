import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { CalendarEvent, EventColor } from './EventColor';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const colors: { [key: string]: EventColor } = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalenderComponent implements OnInit {
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  constructor(private modal: NgbModal, private route: ActivatedRoute, private http: HttpClient) {}

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  ngOnInit(): void {
        this.loadCalendrierEvents();

  }

  loadCalendrierEvents(): void {
    this.http.get<Calendrier[]>(`http://localhost:8080/allCalendrier`).subscribe((calendriers) => {
      this.events = calendriers.map(cal => ({
        title: cal.libelle,
        start: new Date(cal.dateDebut),
        end: new Date(cal.dateFin),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        candidate: {
          id: cal.candidat.id,
          name: cal.candidat.nom + ' ' + cal.candidat.prenom
        }
      }));
      this.refresh.next(null);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
}

interface Calendrier {
  libelle: string;
  dateDebut: string;
  dateFin: string;
  candidat: {
    id: string;
    nom: string;
    prenom: string;
  };
}
