import { Component, ViewChild } from '@angular/core';
import { TreeComponent } from './tree/tree.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TreeComponent) theTree: TreeComponent;
  sendLevelOrder(levelOrder: string) {
    this.theTree.visualize(levelOrder);
  }
}
