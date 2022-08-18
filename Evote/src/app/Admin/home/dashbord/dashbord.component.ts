import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { ChartOption } from 'ngx-chart';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private router: Router) {}

  resulst: any = [
    {
      "name": "Tachesss planifiée",
      "value": 3,
      "color": "#546de5"
    },
    {
      "name": "Tache en cours",
      "value": 5,
      "color": "#3dc1d3"
    },
    {
      "name": "Tache terminée",
      "value": 9,
      "color": "#0be881"
    },
    {
      "name": "Tache ajournée",
      "value": 9,
      "color": "#cf6a87"
    }
  ];

  resulst3: any = [
    {
      "name": "Intervention planifiée",
      "value": 9,
      "color": "#546de5"
    },
    {
      "name": "Intervention en cours",
      "value": 2,
      "color": "#3dc1d3"
    },
    {
      "name": "Intervention terminée",
      "value": 4,
      "color": "#0be881"
    },
    {
      "name": "Intervention ajournée",
      "value": 17,
      "color": "#cf6a87"
    }
  ];

  resulst2: any = [
    {
      "name": "Materiel en bonne etat",
      "value": 40,
      "color": "#05c46b"
    },
    {
      "name": "Materiel en mauvais etat",
      "value": 5,
      "color": "#ff3f34"
    },
  ];
  data : any
  resulstt: any = []

  permission: boolean = false;

  chartOptions: ChartOption = {
    showLegend: true,
    legendTitle: 'Total',
  };

  calendarOptions?: CalendarOptions;


  onDateClick() {}



  init() {



    setTimeout(() => {
      this.calendarOptions = {
        headerToolbar: {
          right: 'prev,next today',
          center: 'title',
          left: 'timeGridDay,timeGridWeek,dayGridMonth'
        },
        initialView: 'dayGridMonth',
        eventColor: '#F4C584',
        editable: true,
        locale: frLocale,
        selectable: true,
        events: this.resulstt
      };
    }, 1000);
  }

  ngOnInit(): void {
    if (localStorage.getItem('permission') == '1') {
      this.permission = true;
    }

     this.init()
  }

  materiel() {
    this.router.navigateByUrl('/app/materials');
  }

  groupe() {
    this.router.navigateByUrl('/app/materialGroupe');
  }

  categorie() {
    this.router.navigateByUrl('/app/materialCategorie');
  }

  adresse() {
    this.router.navigateByUrl('/app/companies');
  }

  tache() {
    this.router.navigateByUrl('/app/tasks');
  }

  contrat() {
    this.router.navigateByUrl('/app/contracts');
  }

  utilisateur() {
    this.router.navigateByUrl('/app/users');
  }

  prestataire() {
    this.router.navigateByUrl('/app/materialProvider');
  }

  statistiques() {
    this.router.navigateByUrl('/app/statistiques');
  }
}
