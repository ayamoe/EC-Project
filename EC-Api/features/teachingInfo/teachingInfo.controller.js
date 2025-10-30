import { getTeachinginfo, setTeachinginfo, deleteTeachinginfo } from "./teachinginfo.service.js";
import prisma from "../../config/prisma.js";

// GET Controller
export const getController = async (req, res) => {
  try {
    const { teacher, year, month } = req.query;
    const response = await getTeachinginfo(teacher, year, month);
    return res.status(200).json(response);
  } catch (error) {
    console.error("GET Teaching Info Error:", error);
    return res.status(500).json({ error: "Failed to fetch teaching information." });
  }
};

// POST Controller
export const setController = async (req, res) => {
  const {
    subid, tid, serieid, intime, outtime,
    duration, course, session, DofTeach, present
  } = req.body;

  try {
    const subinfo = await prisma.subjectInfo.findFirst({
      where: { subId: subid, serieId: serieid },
    });

    if (!subinfo) {
      return res.status(404).json({ error: "Subject info not found." });
    }

    const payment = await prisma.paymentRate.findFirst({
      where: { subjectinfoId: subinfo.id, serieId: serieid },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment rate not found." });
    }

    const pay = session === "Live" ? payment.rate : payment.rate * present;
    const amo = (payment.rate * duration) / 60;
    const amount = session === "Live" ? amo : amo * present;

    const data = await setTeachinginfo(
      subinfo.id,
      tid,
      serieid,
      intime,
      outtime,
      duration,
      course,
      session,
      DofTeach,
      pay,
      amount,
      present
    );

    return res.status(201).json(data);
  } catch (error) {
    console.error("POST Teaching Info Error:", error);
    return res.status(500).json({ error: "Failed to add teaching information." });
  }
};

// DELETE Controller
export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }

    const response = await deleteTeachinginfo(Number(id));

    if (!response) {
      return res.status(404).json({ error: "Teaching info not found or already deleted." });
    }

    return res.status(200).json({ message: "Teaching info deleted successfully." });
  } catch (error) {
    console.error("DELETE Teaching Info Error:", error);
    return res.status(500).json({ error: "Failed to delete teaching information." });
  }
};
