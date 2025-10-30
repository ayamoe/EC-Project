import { useApp } from "../ThemedApp";
import { TextField,MenuItem } from "@mui/material";
const FilterYearMonth = ()=> {
        const {payments,totalAmount,auth,month,setMonth,loading,year,setYear} = useApp();
            const currentYear = new Date().getFullYear();
            const years = Array.from({ length: 4 }, (_, i) => currentYear - i); // Past 10 years
            const months = [
                {value:0 ,label: "None"},
            { value: 1, label: "January" },
            { value: 2, label: "February" },
            { value: 3, label: "March" },
            { value: 4, label: "April" },
            { value: 5, label: "May" },
            { value: 6, label: "June" },
            { value: 7, label: "July" },
            { value: 8, label: "August" },
            { value: 9, label: "September" },
            { value: 10, label: "October" },
            { value: 11, label: "November" },
            { value: 12, label: "December" },
            
            ];
            return(
                <div style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', gap: 20 }}>
  <TextField
    select
    label="Year"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    variant="outlined"
    size="small"
    style={{ minWidth: 120 }}
  >
    {years.map((yr) => (
      <MenuItem key={yr} value={yr}>
        {yr}
      </MenuItem>
    ))}
  </TextField>

  <TextField
    select
    label="Month"
    value={month}
    onChange={(e) => setMonth(e.target.value === "None" ? null : e.target.value)}
    variant="outlined"
    size="small"
    style={{ minWidth: 150 }}
  >
    {months.map((m) => (
      <MenuItem key={m.value} value={m.value}>
        {m.label}
      </MenuItem>
    ))}
  </TextField>
</div>
            )
}
export default FilterYearMonth;