import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '<app-reader>',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css']
})
export class ReaderComponent {
    @Output() levelOrderRead = new EventEmitter();

    levelOrder: string = '[1,null,3,4,5]';

    visualize() {
        if (this.levelOrder.length === 0) {
            return;
        }
        this.levelOrderRead.emit(this.levelOrder);
    }

}