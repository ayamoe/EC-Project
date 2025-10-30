-- CreateTable
CREATE TABLE "Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rateId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Subject_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "NumOfStudentPerRate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubjectInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rateId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,
    "subId" INTEGER NOT NULL,
    "NumStudent" INTEGER NOT NULL,
    CONSTRAINT "SubjectInfo_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "NumOfStudentPerRate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubjectInfo_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubjectInfo_subId_fkey" FOREIGN KEY ("subId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Serie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Series" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TeacherTeachingInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,
    "timeIn" INTEGER NOT NULL,
    "timeOut" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "dateOfTeach" DATETIME NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeacherTeachingInfo_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherTeachingInfo_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "SubjectInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherTeachingInfo_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teainfoId" INTEGER NOT NULL,
    "payment" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "present" DECIMAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_teainfoId_fkey" FOREIGN KEY ("teainfoId") REFERENCES "TeacherTeachingInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NumOfStudentPerRate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "part" INTEGER NOT NULL,
    "underNine" INTEGER,
    "underfourteen" INTEGER,
    "underTwenty" INTEGER,
    "underFourty" INTEGER,
    "underSixty" INTEGER,
    "underEighty" INTEGER,
    "underHundered" INTEGER
);

-- CreateTable
CREATE TABLE "PaymentRate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectinfoId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    CONSTRAINT "PaymentRate_subjectinfoId_fkey" FOREIGN KEY ("subjectinfoId") REFERENCES "SubjectInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PaymentRate_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teacher_Honar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherId" INTEGER NOT NULL,
    "Honar" INTEGER NOT NULL,
    "Date" DATETIME NOT NULL,
    CONSTRAINT "Teacher_Honar_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectInfo_id_key" ON "SubjectInfo"("id");
