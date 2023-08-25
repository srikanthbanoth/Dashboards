public class Reportparse {
	@AuraEnabled(cacheable=true)
    public static string Getreportplanned(){    
        List<Object> allReports=new List<Object>();
        List<columnwrapper> cl=new List<columnwrapper>();
       	List <Report> reportList = [SELECT Id,Format,DeveloperName FROM Report];
        for(integer rp=0;rp<reportList.size()-1;rp++){
            	  List<Wrapper> w=new List<Wrapper>();
            	  String reportId = (String)reportList.get(rp).get('Id');
        		  String Format=(String)reportList.get(rp).get('Format');
             	  Reports.reportResults results = Reports.ReportManager.runReport(reportId, true);
                  Reports.Dimension dim = results.getGroupingsDown();
                    Reports.GroupingValue[] groupingVal = dim.getGroupings();
                    if(!groupingVal.isEmpty()){
                       for(Reports.GroupingValue RG:groupingVal){
                        String factMapKey = RG.getKey() + '!T';
                        Reports.ReportFactWithDetails factDetails =
                            (Reports.ReportFactWithDetails)results.getFactMap().get(factMapKey);
                        reports.ReportDetailRow[] rows=factDetails.getRows();
                        system.debug('-----------------------------------------------');
                        Reports.SummaryValue sumVal = factDetails.getAggregates()[0]; 
                        w.add(new Wrapper(RG.getLabel(),(string)RG.getValue(),sumVal.getLabel(),RG.getKey(),rows,Format)); 
                      }
                        
                     allReports.add(w);
                    
        		}
                  else{
            List<Object> tb=new List<Object>();
            system.debug('In else Block');
            Reports.ReportFactWithDetails factDetails =
                            (Reports.ReportFactWithDetails)results.getFactMap().get('T!T');
            
            Reports.ReportMetadata metadata=results.getReportMetadata();
            List<String> labels=metadata.getDetailColumns();
            Reports.ReportDetailRow[] r=factDetails.getRows();
            //Prepare Columns
           	cl.clear(); //clean for Every Report
            for(String l:labels){
               cl.add(new columnwrapper(l,l,'text'));
            }
            //Prepare Data
            for(Reports.ReportDetailRow val:r){
                Reports.ReportDataCell[] dataCell=val.getDataCells();
                Map<String,String> m=new Map<String,String>();
                for(integer i=0;i<dataCell.size();i++){
                    Reports.ReportDataCell Jsondata=dataCell[i];
                    String jsonLabel=labels[i];
                    String jsond=Jsondata.getLabel();
                    m.put(jsonLabel,jsond);
                }
                tb.add(m);
            }
            Tabledata table=new Tabledata(cl,tb);
            allReports.add(table);
        }
            
        }
        return Json.serialize(allReports);
					/*String reportId = (String)reportList.get(0).get('Id');
        			String Format=(String)reportList.get(0).get('Format');
                    Reports.reportResults results = Reports.ReportManager.runReport(reportId, true);
                    Reports.Dimension dim = results.getGroupingsDown();
                    Reports.GroupingValue[] groupingVal = dim.getGroupings();
                    if(!groupingVal.isEmpty()){
                       for(Reports.GroupingValue RG:groupingVal){
                        String factMapKey = RG.getKey() + '!T';
                        Reports.ReportFactWithDetails factDetails =
                            (Reports.ReportFactWithDetails)results.getFactMap().get(factMapKey);
                        reports.ReportDetailRow[] rows=factDetails.getRows();
                        system.debug('-----------------------------------------------');
                        Reports.SummaryValue sumVal = factDetails.getAggregates()[0]; 
                        w.add(new Wrapper(RG.getLabel(),(string)RG.getValue(),sumVal.getLabel(),RG.getKey(),rows,Format)); 
                      }
                        
                     return Json.serialize(w);
                    
        		}
        else{
            List<Object> tb=new List<Object>();
            system.debug('In else Block');
            Reports.ReportFactWithDetails factDetails =
                            (Reports.ReportFactWithDetails)results.getFactMap().get('T!T');
            
            Reports.ReportMetadata metadata=results.getReportMetadata();
            List<String> labels=metadata.getDetailColumns();
            Reports.ReportDetailRow[] r=factDetails.getRows();
            //Prepare Columns
            for(String l:labels){
               cl.add(new columnwrapper(l,l,'text'));
            }
            //Prepare Data
            for(Reports.ReportDetailRow val:r){
                Reports.ReportDataCell[] dataCell=val.getDataCells();
                Map<String,String> m=new Map<String,String>();
                for(integer i=0;i<dataCell.size();i++){
                    Reports.ReportDataCell Jsondata=dataCell[i];
                    String jsonLabel=labels[i];
                    String jsond=Jsondata.getLabel();
                    m.put(jsonLabel,jsond);
                }
                tb.add(m);
            }
            Tabledata table=new Tabledata(cl,tb);
            return json.serialize(table);
        }
		*/
        //return Json.serialize(results);
          	
    }
}