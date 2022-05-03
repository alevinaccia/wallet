import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title!:string;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('titleHeader') titleHeader!: ElementRef;
  @Output() titleChange = new EventEmitter<string>();
  
  
  constructor() { }

  ngOnInit(): void {
  }
  
  toggleModal(){
    this.modal.nativeElement.classList.toggle('modal-active')
    this.overlay.nativeElement.classList.toggle('modal-overlay-active')   
  }

  editTitle(){
    let input = document.createElement('input');
    input.value = this.title;
    this.titleHeader.nativeElement.innerHTML = "";
    input.onblur = () => {
      this.titleHeader.nativeElement.innerHTML = input.value;
      this.title = input.value;
      this.titleChange.emit(this.title);
    };
		this.titleHeader.nativeElement.appendChild(input);
    input.focus();
  }

}
