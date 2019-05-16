import { Component } from '@angular/core';

@Component({
    selector: '<app-reader>',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css']
})
export class ReaderComponent {
    levelOrder = '';

    visualize(levelOrderInfo: HTMLTextAreaElement) {
        this.levelOrder = levelOrderInfo.value;
    }

}