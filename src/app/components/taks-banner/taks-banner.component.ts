import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { NSDate } from '../../utils/date';

@Component({
	selector: 'ns-taks-banner',
	templateUrl: './taks-banner.component.html',
	styleUrls: ['./taks-banner.component.css']
})
export class TaksBannerComponent implements OnInit {

    @Input() onNumber : number;
    
    public today = new Date();
    
    constructor() { }

    ngOnInit() { }

    get todayLabel(): string {
        return NSDate.isDayTime(this.today) ? 'Today' : 'Tonight';
    }
}
