import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-vistacotizacion',
  templateUrl: './vistacotizacion.component.html',
  styleUrls: ['./vistacotizacion.component.css']
})

export class VistacotizacionComponent implements OnInit
{
  @ViewChild('htmlData') content: ElementRef; 
  
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private storageService: StorageService) { 
  }
  agregarInsumoForm: FormGroup;
  infoCotizacionForm: FormGroup;
  proveedor: string;
  cotizacion: any = [];
  listaInsumos: any = [];
  dataSource: any = [];
  hasData: boolean = false;
  pdfReady: boolean = false;
  listaProveedores: any = [{id: 1, nombre: 'Verduleria Pepito'}, {id: 2, nombre: 'Panadería Numancia'}, ]
  displayedColumns: string[] = ['insumo', 'cantidad', 'unidadMedida'];
  

  ngOnInit(): void
  {
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
    this.listaInsumos.push(insumo);
    this.dataSource = new MatTableDataSource(this.listaInsumos);
    this.agregarInsumoForm.reset();
    this.hasData = true;
  }

  getInfo = () => {

  }

  descargarPDf = () => {
    this.pdfReady = true;
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
  
    doc.save('test.pdf');  
  }


}
