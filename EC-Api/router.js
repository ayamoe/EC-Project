import express from "express";
import subjectrouter from "./features/subject/subject.route.js"
import teacherRouter from "./features/teacher/teacher.route.js";
import paymentrateRouter from "./features/paymentRate/paymentRate.route.js";
import serierouter from "./features/serie/serie.route.js";
import subinfojectrouter from "./features/subjectInfo/subjectInfo.route.js";
import teachinginfoRouter from "./features/teachingInfo/teachinginfo.route.js";
import paymentRouter from "./features/payment/payment.route.js";
import numofstudentrateRouter from "./features/numOfstudentRate/numOfstudentRate.route.js";
const router = express.Router();

router.use("/sub",subjectrouter);
router.use("/tea",teacherRouter);
router.use('/pay',paymentrateRouter);
router.use('/serie',serierouter);
router.use('/subinfo',subinfojectrouter);
router.use('/teachinfo',teachinginfoRouter);
router.use('/payment',paymentRouter);
router.use('/numofstudentrate',numofstudentrateRouter)
router.use('/deleteteachinginfo',teachinginfoRouter)
export default router;