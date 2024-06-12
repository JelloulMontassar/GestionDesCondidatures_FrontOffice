import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OffreService } from '../service/offre.service';
import { CandidateDetailsDialogComponent } from '../candidate-details-dialog/candidate-details-dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';

@Component({
  selector: 'app-candidature-list',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nom', 'prenom', 'etat', 'adresse', 'libelleOffre', 'dateExpiration', 'localisation', 'salaire', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offreService: OffreService, private dialog: MatDialog, private router: Router) { }

  getAllCandidatures() {
    this.offreService.getAllCandidatures().subscribe(data => {
      const filteredData = data.map(item => {
        return {
          id: item.id,
          nom: item.candidat.nom,
          prenom: item.candidat.prenom,
          adresse: item.candidat.adresse,
          libelleOffre: item.offre.libelle,
          dateExpiration: item.offre.dateExpiration,
          localisation: item.offre.localisation,
          salaire: item.offre.salaire,
          etat: item.etat,
          candidat: item.candidat
        };
      });
      this.dataSource.data = filteredData;
    });
  }

  ngOnInit(): void {
    this.getAllCandidatures();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCandidateDetailsDialog(candidat: any) {
    this.dialog.open(CandidateDetailsDialogComponent, {
      width: '400px',
      data: { candidat }
    });
  }


  Accept(candidature: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this candidature?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.offreService.ChangeStatus(candidature.id, 1).subscribe(() => {
          Swal.fire('Approved!', 'The candidature has been approved.', 'success');

          const dialogRef = this.dialog.open(DatePickerDialogComponent, {
            width: '300px',
            data: { date: new Date() }
          });

          dialogRef.afterClosed().subscribe(selectedDate => {
            if (selectedDate) {
              const calendrier = {
                libelle: 'Entretien avec ' + candidature.candidat.nom + ' ' + candidature.candidat.prenom,
                dateDebut: selectedDate,
                dateFin: selectedDate,
                candidat: candidature.candidat
              };

              this.offreService.saveCalendrier(calendrier).subscribe(() => {
                Swal.fire('Saved!', 'The interview date has been saved.', 'success');
                this.router.navigate(['/admin/Calendrier']);
              });
            }
          });
        });
      }
    });
  }

  Refuse(candidature: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this candidature?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.offreService.ChangeStatus(candidature.id, 2).subscribe(() => {
          this.getAllCandidatures();
          Swal.fire('Rejected!', 'The candidature has been rejected.', 'success');
        });
      }
    });
  }
}
