import { Component, ViewChild, ElementRef } from '@angular/core';
import { Queue } from '../queue/queue.component';

@Component({
    selector: '<app-tree>',
    templateUrl: './tree.component.html'
})
export class TreeComponent {
    @ViewChild('tree') tree: ElementRef

    constructor() {};

    innerWidth: number;
    innerHeight: number;
    levelOrder: string;

    // Initialize window information to dynamically create canvas box
    ngOnInit() {
        this.innerWidth = window.innerWidth * 0.8;
        this.innerHeight = window.innerHeight * 0.7;
        this.resize();
    }

    // Create canvas box that fits the screen
    resize(): void {
        let canvasRef = this.tree.nativeElement;
        canvasRef.width = this.innerWidth;
        canvasRef.height = this.innerHeight;
    }

    drawNode(xPos: number, yPos: number, value: string | null): void {
        if (value === null) {
            return;
        }
        let nodeRef = this.tree.nativeElement.getContext('2d');
        nodeRef.font = "15px sans-serif";
        nodeRef.textAlign = 'center';
        nodeRef.fillText(value, xPos, yPos);
        nodeRef.beginPath();
        nodeRef.arc(xPos, yPos, 20, 0, Math.PI * 2);
        nodeRef.stroke();
    }

    drawLine(xPosParent: number, yPosParent: number, xPosChild: number, yPosChild:number) {
        let lineRef = this.tree.nativeElement.getContext('2d');
        lineRef.beginPath();
        lineRef.moveTo(xPosParent, yPosParent + 20);
        xPosChild = xPosChild < xPosParent ? xPosChild + 14 : xPosChild - 14;
        lineRef.lineTo(xPosChild, yPosChild - 14);
        lineRef.stroke();
    }

    getStartXPos(level: number, baseDistance: number, numOfNodes: number) {
        return this.innerWidth / 2 - (numOfNodes - 1) * baseDistance / 2;
    }

    getStartYPos(level: number) {
        return 50 + level * 80;
    }

    visualize(levelOrder: string): void {
        this.levelOrder = levelOrder;
        this.tree.nativeElement.getContext("2d").clearRect(0, 0, this.innerWidth, this.innerHeight);
        let nodeList: string[] = this.splitStringToElements();
        if (nodeList.length === 0) {
            return;
        }
        let valueQueue:Queue<string> = new Queue<string>();
        let xPosQueue:Queue<number> = new Queue<number>();
        let yPosQueue:Queue<number> = new Queue<number>();
        let index: number = 0;
        let level: number = 0;
        let baseDistance: number = (Math.log(nodeList.length) * 2) * 100;

        while (index < nodeList.length && !(valueQueue.size() > 0 && xPosQueue.size() == 0)) {
            let numOfNodes: number = Math.pow(2, level);
            let xPos: number = this.getStartXPos(level, baseDistance, numOfNodes);
            let yPos: number = this.getStartYPos(level);
            for (let i = 0; i < numOfNodes && index < nodeList.length; i += 2) {
                let parent: string | null = valueQueue.pop();
                let left: string = nodeList[index];
                left = left === '#' ? 'null' : left;
                let right: string | null = index + 1 < nodeList.length ? nodeList[index + 1] : null;
                right = right !== null && right === '#' ? 'null' : right;
                if (parent === 'null') {
                    valueQueue.push('null');
                    valueQueue.push('null');
                    xPos += 2 * baseDistance;
                    continue;
                }

                if (parent === null) {
                    valueQueue.push(left);
                    if (left !== 'null') {
                        xPosQueue.push(xPos);
                        yPosQueue.push(yPos);
                    }
                    this.drawNode(xPos, yPos, left);
                    index++;
                    continue;
                }

                if (parent !== null) {
                    let xPosParent: number = xPosQueue.pop();
                    let yPosParent: number = yPosQueue.pop();
                    this.drawLine(xPosParent, yPosParent, xPos, yPos);
                    if (right !== null) {
                        this.drawLine(xPosParent, yPosParent, xPos + baseDistance, yPos);
                    }
                }
                this.drawNode(xPos, yPos, left);
                this.drawNode(xPos + baseDistance, yPos, right);
                if (left !== 'null') {
                    xPosQueue.push(xPos);
                    yPosQueue.push(yPos);
                }

                if (right !== null && right !== 'null') {
                    xPosQueue.push(xPos + baseDistance);
                    yPosQueue.push(yPos);
                }

                valueQueue.push(left);
                valueQueue.push(right);
                xPos += baseDistance * 2;
                index += 2;
            }
            baseDistance /= 1.8;
            level++;
        }
    }

    splitStringToElements(): string[] {
        return this.levelOrder.substring(1, this.levelOrder.length - 1).split(' ').join('').split(',');
    }

}