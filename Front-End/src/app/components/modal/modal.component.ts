import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title!:string;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;
  
  
  constructor() { }

  ngOnInit(): void {
  }
  
  toggleModal(){
    this.modal.nativeElement.classList.toggle('modal-active')
    this.overlay.nativeElement.classList.toggle('modal-overlay-active')   
  }

}
