import { LightningElement,api,track} from 'lwc';
import sysmodal from 'c/sysmodal';
export default class Showtables extends LightningElement {
    @api acc;
    totalData;
    label=[];
    values=[];
    @track defvalue = 'bar';
    chartLabel;
    @track columns=[];
    @track display=[];
    chartValue;
    @track isbar=true;
    @track isTable=false;    
    get options() {
        return [
            { label: 'Bar Chart', value: 'bar' },
            { label: 'Pie Chart', value: 'pie' },
        ];
    }
    handleChange(event) {
        this.value = event.detail.value;
        if(this.value==='bar')
        {
            this.isbar=true;
        }
        else {
            this.isbar=false;
        }
    }

    async handleClick() {
        const result = await sysmodal.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'large',
            description: 'View Report Data',
            col:this.columns,
            fromparenttablevalues:this.display,
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        console.log(result);
    }
    connectedCallback(){
        if(Array.isArray(this.acc)){
            let labelsarr = [];
            let svalues = [];
            console.log('array');
            this.acc.forEach(rec => {
                labelsarr.push(rec.label);
                svalues.push(rec.SummaryValue);
            })
            this.chartLabel=labelsarr;
            this.chartValue=svalues;
            this.isTable=false;
        }
        else {
            this.display = this.acc.data;
            this.columns= this.acc.col;
            this.isTable=true;
        }
    }
}