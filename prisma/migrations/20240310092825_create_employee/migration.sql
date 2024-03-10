-- CreateTable
CREATE TABLE "EmployeeStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "EmployeeStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "EmployeeName" TEXT NOT NULL,
    "JoiningDate" TEXT NOT NULL,
    "BirthDate" TEXT NOT NULL,
    "Skills" TEXT NOT NULL,
    "SalaryDetails" INTEGER NOT NULL,
    "Address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeStatusId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeStatusId_fkey" FOREIGN KEY ("employeeStatusId") REFERENCES "EmployeeStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
