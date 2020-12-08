import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentInsumoComponent} from '../../modalVistas/DialogContentInsumo/dialogContentInsumo.component';
import { INSUMO_DATA } from '../../../../../utils/mock-responses/insumo/insumoResponse';
import { Insumo } from '../../../../../utils/mock-core/models/insumo.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistainventario',
  templateUrl: './vistainventario.component.html',
  styleUrls: ['./vistainventario.component.css']
})
export class VistainventarioComponent implements OnInit
{
  displayedColumnsInsumo: string[] = ['select', 'nombreInsumo', 'cantidad', 'unidadMedida'];
  dataSourceInsumo: any;
  selection = new SelectionModel<Insumo>(true, []);
  public crearInsumoForm: FormGroup;
  public insumo: any = {};
  public insumos: any = [];

  
  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService,) { }


  ngOnInit(): void
  {
    
  }

  getInsumos() {
    this.insumos = JSON.parse(this.storageService.getCurrentProducts());
    this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
  }


}