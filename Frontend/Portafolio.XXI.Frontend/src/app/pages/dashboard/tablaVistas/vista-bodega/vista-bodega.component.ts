import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/services/storage.service';
import { Insumo } from 'src/utils/mock-core/models/insumo.model';
import { DialogContentActivoComponent } from '../../modalVistas/DialogContentBodega/activos/dialog-content-activo.component';
import { DialogContentBodegaComponent } from '../../modalVistas/DialogContentBodega/DialogContentBodega.component';

@Component({
  selector: 'app-vista-bodega',
  templateUrl: './vista-bodega.component.html',
  styleUrls: ['./vista-bodega.component.css']
})
export class VistaBodegaComponent implements OnInit {

  @ViewChild('stock') content: ElementRef; 
  dataSourceInsumo: any;
  dataSourceActivo: any;
  dataSourceSalida: any;
  displayedColumnsInsumo: string[] = ['id', 'nombreInsumo', 'marca', 'tipoInsumo',  'unidadMedida', 'cantidad', 'modificar', 'eliminar'];
  displayedInsumo: string[] = ['id', 'nombreInsumo', 'marca', 'tipoInsumo',  'unidadMedida', 'cantidad'];
  displayedColumnsActivo: string[] = ['id', 'nombreActivo', 'tipoActivo', 'cantidad', 'modificar', 'eliminar'];
  displayedActivo: string[] = ['id', 'nombreActivo', 'tipoActivo', 'cantidad'];
  displayedColumnsInsumo2: string[] = ['insumo', 'cantidad'];
  displayedColumns: string[] = ['activo', 'cantidad'];
  dataSourceInsumo2: any = [];
  dataSourceActivo2: any = [];
  agregarInsumoForm: FormGroup = new FormGroup ({
    insumo: new FormControl(),
    cantidad: new FormControl()
  });
  agregarActivoForm: FormGroup = new FormGroup ({
    activo: new FormControl(),
    cantidadActivo: new FormControl()
  });
  infoCotizacionForm: FormGroup = new FormGroup ({
    fechaEntrega: new FormControl()
  });
  hasData: boolean;
  hasDataA: boolean;
  public insumos: Insumo[] = [];
  public activos: any = [];
  public idInsumos: string [] = [];
  public id: string;
  fecha: string;

  constructor (
    public dialog: MatDialog,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }


  ngOnInit(): void
  {
    this.getData();
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

  getData() {
    this.insumos = JSON.parse(this.storageService.getCurrentInsumo());
    this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
    this.activos = JSON.parse(this.storageService.getCurrentActivo());
    this.dataSourceActivo = new MatTableDataSource<any>(this.activos);
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent = null;
    DialogContentComponent = tipo == "alimento" ? DialogContentBodegaComponent : DialogContentActivoComponent;
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Resultado de modal de ' + tipo + ':', result)
    });
  }

  delete(element: any, opt: number){
    if(opt == 1){
      this.insumos.splice(this.insumos.indexOf(element),1);
      this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
    }
    else if (opt == 2){
      this.activos.splice(this.activos.indexOf(element),1);
      this.dataSourceActivo = new MatTableDataSource<any>(this.activos);
    }
  }

  agregarInsumo = () =>
  {
    const form = this.agregarInsumoForm.value;
    const insumo = {
      insumo: form.insumo,
      cantidad: form.cantidad,
      unidadMedida: form.unidadMedida
    }
    var cantOk = true;
    this.insumos.forEach(element => {
      if(element.nombreInsumo == this.id){
        if(element.cantidad < insumo.cantidad){
          cantOk = false;
        }
        else{
          element.cantidad = element.cantidad - insumo.cantidad;
          insumo.unidadMedida = element.unidadMedida;
        }
        
      }
    });
    if(cantOk){
      this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
      this.storageService.setCurrentInsumo(this.insumos);
      const wishlist = [];
      wishlist.push(insumo);
      this.dataSourceInsumo2 = new MatTableDataSource(wishlist);
      this.agregarInsumoForm.reset();
      this.hasData = true;
    }
    else{
      this.toastr.error("La cantidad a despachar es mayor a la del stock");
    }
    
  }

  agregarActivo = () => {
    const form = this.agregarActivoForm.value;
    const activo = {
      activo: form.activo,
      cantidadActivo: form.cantidadActivo
    }
    this.activos.forEach(element => {
      if(element.nombreActivo == this.id){
        element.cantidad = element.cantidad - activo.cantidadActivo;
      }
    });
    this.dataSourceActivo = new MatTableDataSource<any>(this.activos);
    this.storageService.setCurrentInsumo(this.activos);
    const wishlist = [];
    wishlist.push(activo);
    this.dataSourceActivo2 = new MatTableDataSource(wishlist);
    this.agregarActivoForm.reset();
    this.hasDataA = true;
  }

  descargarPDf = () => {
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
    doc.save('StockSigloXXI.pdf'); 
    }, 1000);
  }

  // downloadPDF(){
  //   debugger;
  //   const DATA = document.getElementById('stock');
  //   const doc = new jsPDF('p','pt','a4');
  //   const options = {
  //     background: 'white',
  //     scale: 3
  //   };
    
  //   html2canvas(DATA, options).then((canvas) => {
  //     const img = canvas.toDataURL('image/PNG');

  //     const bufferX = 15;
  //     const bufferY = 15;
  //     const imgProps = (doc as any).getImageProperties(img);
  //     const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  //     return doc;
  //   }).then((docResult) => {
  //     docResult.save('StockSigloXXI.pdf');
  //   });

  // }

}
