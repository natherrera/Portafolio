import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import {insumos} from '../../../../../utils/mock-responses/insumo/insumoResponse';
import {PROVEEDOR} from '../../../../../utils/mock-responses/proveedor/proveedorResponse';
import jsPDF from 'jspdf';
import moment from 'moment';

@Component({
  selector: 'app-vistacotizacion',
  templateUrl: './vistacotizacion.component.html',
  styleUrls: ['./vistacotizacion.component.css']
})

export class VistacotizacionComponent implements OnInit
{
  @ViewChild('htmlData') content: ElementRef; 
  
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storageService: StorageService) { 
    moment.locale('es');
  }
  agregarInsumoForm: FormGroup;
  infoCotizacionForm: FormGroup;
  proveedor: string;
  cotizacion: any = [];
  listaInsumos: any = [];
  dataSource: any = [];
  fecha: string;
  hasData: boolean = false;
  pdfReady: boolean = false;
  listaProveedores: any = []
  displayedColumns: string[] = ['insumo', 'cantidad', 'unidadMedida'];
  

  ngOnInit(): void
  {
    this.listaInsumos = insumos;
    this.listaProveedores = PROVEEDOR;
    this.dataSource = new MatTableDataSource([]);
    this.agregarInsumoForm = this.formBuilder.group({
      insumo: [''],
      cantidad: [''],
      unidadMedida: [''],
    });
    this.infoCotizacionForm = this.formBuilder.group({
      proveedor: [''],
      fechaEntrega: [''],
    });
  }

  agregarInsumo = () =>
  {
    const form = this.agregarInsumoForm.value;
    const insumo = {
      insumo: form.insumo,
      cantidad: form.cantidad,
      unidadMedida: form.unidadMedida
    }
    const wishlist = [];
    wishlist.push(insumo);
    this.dataSource = new MatTableDataSource(wishlist);
    this.agregarInsumoForm.reset();
    this.hasData = true;
  }

  getInfo = () => {

  }

  descargarPDf = () => {
    this.pdfReady = true;
    this.fecha = moment(this.infoCotizacionForm.value.fechaEntrega).format('L')
    setTimeout(() => {
      let content=this.content.nativeElement;
      let doc = new jsPDF();  
      let _elementHandlers =  
      {  
        '#editor':function(element,renderer){  
          return true;  
        }  
      };  
      doc.fromHTML(content.innerHTML,15,15,{  
  
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('cotizacionsigloxxi.pdf'); 
    this.pdfReady = false;
    }, 1000);
  }

}
