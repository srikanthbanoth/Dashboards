import { LightningElement, wire} from 'lwc';
//import getName from '@salesforce/apex/Opportunitycontroller.getName';
//import getAmount from '@salesforce/apex/Opportunitycontroller.getAmount';
//import getAll from '@salesforce/apex/Opportunitycontroller.getAll';
import Getreportplanned from '@salesforce/apex/Reportparse.Getreportplanned';
export default class Filters extends LightningElement {
    totalData=[];
    label=[];
    values=[];
    chartLabel;
    columns;
    display;
    chartValue;
    isTable;
    data;
    loaded=false;
    @wire(Getreportplanned)
    getData({data,error}){
        if(data){
            this.data=JSON.parse(data);
            this.loaded=true;
            // if(Array.isArray(data)){
            //     console.log('Matrix/Summary Report');
            //     for(let i=0;i<data.length;i++){
            //     this.label.push(data[i].label);
            //     this.values.push(data[i].SummaryValue);
            // }
            // console.log(this.values);
            // console.log(this.label);
            // this.chartLabel=this.label;
            // this.chartValue=this.values;
            // this.chatData=data;
            // console.log('Chart Data is consoled');
            //     this.isTable=false;

            // }
            // else{
            //     console.log('Table Report Parsed');
            //     this.columns=data.col;
            //     this.display=data.data;
            //     this.isTable=true;
            // }
            
        }
        if(error){
            console.log('Error');
        }
    }

    // opportunities;
    // error;
    // stages;
    // count;
    // keyvaluepairs;
    // stageNames=[];
    // countn=[];
    // names;
    // oopoName;
    // currencyvalue;
    // values;
    // Amount;
    // keycount={};
    // arr=[];
    // currency=[];
    // allops;    
    // @wire(getAll)
    // all({data,error}){
    //     if(data){
    //         console.log(data);
    //         for(let i=0;i<data.length;i++){
    //             this.oopoName=data[i].Name;
    //             this.currencyvalue=data[i].Amount;
    //             this.currency.push(this.currencyvalue);
    //             this.arr.push(this.oopoName);
    //             if(this.keycount.hasOwnProperty(data[i].StageName)){
    //                 this.keycount[data[i].StageName]+=1;
    //             }
    //             else{
    //                 this.keycount[data[i].StageName]=1;
    //             }
    //          }
    //         this.stageNames=Object.keys(this.keycount);
    //         this.countn=Object.values(this.keycount);
    //         this.stages=this.stageNames;
    //         this.count=this.countn;
    //         console.log('#setting Everything');
    //         console.log(this.stages);
    //         console.log(this.count);
    //         this.opportunities=this.arr;
    //         this.Amount=this.currency;
    //         this.allops=data;
    //     }
    //     else{
    //         this.error=error;
    //     }
    // }
    // value = 'Owner';
    // get options() {
    //     return [
    //         { label: 'Owner', value: 'Owned' },
    //     ];
    // }

    // get option() {
    //     return [
    //         { label: 'Current FQ', value: 'current' }
    //     ];
    // }

    // handleChange(event) {
    //     this.value = event.detail.value;
    //     if(this.value==="current"){
    //         //console.log('Current');
    //         /**Get only the opportunities in the current year */
    //         this.arr.length=0;
    //         this.currency.length=0;
    //         this.stages.length=0;
    //         this.keycount={};
    //         this.count.length=0;
    //         for(let i=0;i<this.allops.length;i++){
    //             if(this.allops[i].FiscalYear===2023){
    //                 this.oopoName=this.allops[i].Name;
    //                 this.currencyvalue=this.allops[i].Amount;
    //                 this.currency.push(this.currencyvalue);
    //                 this.arr.push(this.oopoName);
    //                 if(this.keycount.hasOwnProperty(this.allops[i].StageName)){
    //                     this.keycount[this.allops[i].StageName]+=1;
    //                 }
    //                 else{
    //                     this.keycount[this.allops[i].StageName]=1;
    //                 }
                    
    //             }
    //             else{
    //                 console.log("#Not in loop")
    //             }
                
    //          }
    //         //this.handleSomething(data);
    //         this.opportunities=[...this.arr];
    //         this.Amount=[...this.currency]; 
    //         this.stages=[...Object.keys(this.keycount)];
    //         this.count=[...Object.values(this.keycount)];       
    //     }
    //     if(this.value==="Owned"){
    //         this.arr.length=0;
    //         this.currency.length=0;
    //         this.stages.length=0;
    //         this.keycount={};
    //         this.count.length=0;
    //         for(let i=0;i<this.allops.length;i++){
    //             this.oopoName=this.allops[i].Name;
    //             this.currencyvalue=this.allops[i].Amount;
    //             this.currency.push(this.currencyvalue);
    //             this.arr.push(this.oopoName);
    //             if(this.keycount.hasOwnProperty(this.allops[i].StageName)){
    //                 this.keycount[this.allops[i].StageName]+=1;
    //             }
    //             else{
    //                 this.keycount[this.allops[i].StageName]=1;
    //             }
    //          }
    //         //this.handleSomething(data);
    //         this.opportunities=[...this.arr];
    //         this.Amount=[...this.currency];
    //         this.stages=[...Object.keys(this.keycount)];
    //         this.count=[...Object.values(this.keycount)]; 
    //     }
    // }
    
}