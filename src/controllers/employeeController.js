const prisma = require("../../DB/db.config");

const employeeController = {
  //   create employee controller
  addSingle: async (req, res) => {
    try {
      const {
        EmployeeName,
        EmployeeStatus,
        JoiningDate,
        BirthDate,
        Skills,
        SalaryDetails,
        Address,
      } = req.body;

      const Status = await prisma.employeeStatus.findUnique({
        where: {
          id: Number(EmployeeStatus),
        },
      });
      if (!Status) {
        return res.status(400).json({
          success: false,
          message: "Please select valid employee status.",
        });
      }
      const data = await prisma.employee.create({
        data: {
          EmployeeName,
          employeeStatusId: Number(EmployeeStatus),
          JoiningDate,
          BirthDate,
          Skills,
          SalaryDetails,
          Address,
        },
      });

      if (data) {
        return res.status(201).json({ status: true, data: "add employee." });
      }
      return res.status(201).json({ status: true, data: allEmployees });

      // res.status(201).json({ status: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
  
};

module.exports = employeeController;
