
import prisma from "../../config/prisma.js"

export const setPayment = async(sub,serie,numofstudent,num)=>{

    return data;
   
    
}

export const getPayment = async (name, year, month) => {
  try {
    // Ensure year and month are numbers
    const numericYear = year ? Number(year) : null;
    const numericMonth = month ? Number(month) : null;

    let dateFilter = {};
    if (numericYear && !numericMonth) {
      // Only year provided — filter full year
      dateFilter = {
        createdAt: {
          gte: new Date(numericYear, 0, 1),           // Jan 1st
          lt: new Date(numericYear + 1, 0, 1),         // Jan 1st next year
        },
      };
    } else if (numericYear && numericMonth) {
      // Year and month provided — filter that month
      dateFilter = {
        createdAt: {
          gte: new Date(numericYear, numericMonth - 1, 1),
          lt: new Date(numericYear, numericMonth, 1),
        },
      };
    }

    // Name filter if provided
    const nameFilter = name
      ? {
          teachingInfo: {
            teacher: {
              name: String(name),
            },
          },
        }
      : {};

    // Combine filters
    const whereCondition = {
      AND: [dateFilter, nameFilter],
    };

    // Total sum
    const sumResult = await prisma.payment.aggregate({
      where: whereCondition,
      _sum: {
        amount: true,
      },
    });

    // All matching payment records
    const data = await prisma.payment.findMany({
      where: whereCondition,
      include: {
        teachingInfo: {
          include: {
            teacher: true,
            series: true,
            subjectinfo: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
    });

    return {
      data,
      totalAmount: sumResult._sum.amount || 0,
    };
  } catch (error) {
    console.error("Error in getPayment:", error);
    throw error;
  }
};
