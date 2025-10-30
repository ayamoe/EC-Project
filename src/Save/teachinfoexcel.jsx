import * as XLSX from "xlsx"
import {saveAs} from 'file-saver'
import { toHourMinute } from "../pages/Teachinginfo"
const teachinfoexcel = (dataexcel) => {


      const excelData = dataexcel.map((data)=> ({
            ID : data.id,
            Time_IN : toHourMinute(data.timeIn),
            Time_Out : toHourMinute(data.timeOut),
            Duration : data.duration/60,
            Course : data.course,
            session : data.session,
            DateOfTeach : data.dateOfTeach      
        
      }))
       const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook,worksheet,"Teaching Data")

      const excelBuffer = XLSX.write(workbook,{bookType : 'xlsx',type : "array"})

      const data = new Blob([excelBuffer],{type : "application/octet-stream"})
      saveAs(data,"TeachingList.xls")


}
export default teachinfoexcel;