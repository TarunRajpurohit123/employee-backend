const prisma = require("../../DB/db.config");

const employeeStatusController = {
  getAllStatus: async (_, res) => {
    try {
      const row = await prisma.employeeStatus.findMany();
      let customRow=[];
      row.forEach((elm)=>{
        customRow.push({label:elm.status,value:elm.id});
      })
      return res.status(200).json({ success: false, data: customRow });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  demo: async (req, res) => {
    const data = await prisma.employeeStatus.create({
      data: {
        status:"Trainee"
      },
    });

    if(data){
      return res.json({mess:"created"})
    }
  },
  findById: async (req, res) => {
    const { id } = req.params;
    console.log("id",id);
    try {
      const row = await prisma.employeeStatus.findUnique({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ success: false, data: row });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = employeeStatusController;