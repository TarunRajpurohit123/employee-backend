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
  // get single employee
  getOneEmployee: async (req, res) => {
    const { eid } = req.params;
    try {
      const row = await prisma.employee.findUnique({
        include: {
          employeeStatus: {
            select: {
              status: true,
            },
          },
        },
        where: {
          id: Number(eid),
        },
      });
      if (!row) {
        return res
          .status(400)
          .json({ success: false, message: "No data found" });
      }
      return res.status(200).json({ success: true, data: row });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
  // get all employeedata
  getAllEmployee: async (req, res) => {
    const { statusId } = req.query;
    console.log("he;;;p");
    console.log("statusId", statusId);
    try {
      let query = {
        include: {
          employeeStatus: {
            select: {
              status: true,
            },
          },
        },
      };

      if (statusId && statusId !== "0") {
        query = {
          ...query,
          where: {
            employeeStatusId: Number(statusId),
          },
        };
      }
      const allEmployees = await prisma.employee.findMany(query);
      if (!allEmployees) {
        return res.status(500).json({
          success: false,
          message: "no data found",
        });
      }
      return res
        .status(200)
        .json({ message: "Employees List", data: allEmployees });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
  //update employee api
  updateEmployee: async (req, res) => {
    const { eid } = req.params;
    try {
      const employeeData = await prisma.employee.findUnique({
        where: {
          id: Number(eid),
        },
      });
      if (!employeeData) {
        return res
          .status(400)
          .json({ success: false, message: "No data found" });
      }
      const update = await prisma.employee.update({
        data: req.body,
        where: {
          id: Number(eid),
        },
      });
      if (!update) {
        return res.status(400).json({
          success: false,
          message: "Data not update. Plase try again!",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "data update successfully" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
  // delete employee api
  deleteEmployee: async (req, res) => {
    const { eid } = req.params;

    try {
      const deletedEmployee = await prisma.employee.delete({
        where: {
          id: Number(eid),
        },
      });

      return res
        .status(200)
        .json({ success: true, message: "data delete", data: deletedEmployee });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
};

module.exports = employeeController;
