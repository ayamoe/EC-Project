    import { useContext,createContext,useState, useEffect } from "react";

   import { createHashRouter, RouterProvider } from "react-router-dom"
    
    import Template from  "./Template"
    import Teachinginfo from "./pages/Teachinginfo";
    import Subjectinfo from "./pages/SubjectInfo";
    import Paymentrate from "./pages/Paymentrate";
    import Teacher from "./pages/Teacher";
    import TeaInfoForm from "./component/TeaInfoForm";
    import Payment from "./pages/Payment"
    import NumOfStudentRate from "./pages/NumOfStudentRate"
    import Subject from "./pages/Subject"
    import Serie from "./pages/Serie";

    import { 
        getTeachingInfo,
        getTeacher,
        getSubjectInfo,
        getPaymentRate,
        getSubject,
        getPayment,
        getSerie,
        getNumOfStudentPerRate,
    

    } from "./api/axiosConfig";


    const AppContext= createContext();

    export function  useApp(){
        return useContext(AppContext);
    }
    const router = createHashRouter([
        {
        path: "/",
        element:<Template/>,
        children : [
            {
            path : '/',
            element : <Teachinginfo/>,
            },
            {
                path: '/serie',
                element : <Serie/>,

            },

            {
               path  : '/subject',
               element : <Subject/>,
            },
            {
                path: '/teacher',
                element : <Teacher/>,
            },
            {
                path : '/subjectinfo',
                element : <Subjectinfo/>,
            },
            {
                path : '/paymentrate',
                element : <Paymentrate/>,
            },
            {
                path : '/teachinginfo',
                element : <Teachinginfo/>,
            },
            {
                path : '/teachinginfoadd',
                element : <TeaInfoForm/>,
            },
        
            {
                path : "/NumOfStudentRate",
                element : <NumOfStudentRate/>,
            },
            {
                path : "/payment",
                element : <Payment/>,

            },
            

        ],
    },
    ]);


    export default function ThemedApp (){
        const [auth,setAuth] = useState();
        const [mode,setMode] = useState("true");
        const [showForm,setShowForm] = useState('true')
        const [series,setSerie] = useState([])
        const [subject,setSubject] = useState([])
        const [teachInfo,setTeachInfo]= useState([]);
        const [teachers,setTeachers]= useState([]);
        const [subjectinfo,setSubjectinfo]= useState([]);
        const [paymentrates,setPaymentRates]= useState([])
        const [payments,setPayment] = useState([]);
        const [numofstuPerRate,setnumofstuPerRate]= useState([])
        const [teacher,setTeacher] = useState("")
        const [year,setYear] = useState("")
        const [month,setMonth] = useState(new Date().getMonth() + 1)
        const [totalAmount,setTotalAmount]= useState()
        const [loading,setLoading] = useState(true)
        
        useEffect(()=>{
                const fetchTeaInfo = async() => {

                    try{
            
                    
                    const numRate = await getNumOfStudentPerRate()
                    const pay =  await getPayment(teacher,year,month)
                    const teainfo = await getTeachingInfo(teacher,year,month);
                    const tea = await getTeacher();
                    const subinfo = await getSubjectInfo();
                    const rateofpayment = await getPaymentRate();
                    const sub = await getSubject();
                    const ser = await getSerie()
                    console.log(teainfo)
                    setSerie(ser.data)
                    setSubject(sub.data)   
                    setPayment(pay.data)
                    setTotalAmount(pay.totalAmount)
                    setPaymentRates(rateofpayment.data);
                    setSubjectinfo(subinfo.data);
                    setTeachers(tea.data);
                    setTeachInfo(teainfo.data )
                    setnumofstuPerRate(numRate.data)

                    const currentYear = new Date().getFullYear();
                

                    if (!year) setYear(currentYear);
                    
                    }catch(e){

                    }finally{
                        setLoading(false)
                    }
                    
                    
                }
                fetchTeaInfo();
               
            },[mode,teacher,year,month])

        return (
        <AppContext.Provider value={{
                                    auth,setAuth,
                                    mode,setMode,
                                    showForm,setShowForm,
                                    teachInfo,
                                    teachers,
                                    subjectinfo,
                                    paymentrates,
                                    subject,
                                    payments,
                                    setTeacher,teacher,
                                    series,setSerie,
                                    totalAmount,
                                    setMonth,month,
                                    setYear,year,
                                    numofstuPerRate,
                                    loading,setLoading
                                    }} >
            <RouterProvider router={router}/>
        </AppContext.Provider>
    )
    }