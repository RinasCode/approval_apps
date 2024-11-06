"use strict";
const { Approval, BudgetRequest, User } = require("../models");

const approvalController = {
  create: async (req, res) => {
    try {
      if (!req.user || !req.user.idString) {
        return res.status(401).json({ message: "Pengguna tidak terautentikasi." });
      }

      const { decision } = req.body; 
      let status;
      let newStatus;

      if (req.user.levelNumber === 2) {
        if (decision === 'approve') {
          newStatus = 'approved-line2';
        } else if (decision === 'reject') {
          newStatus = 'reject-line2';
        } else {
          return res.status(400).json({ message: "Keputusan tidak valid." });
        }
      } else if (req.user.levelNumber === 3) {
        if (decision === 'approve') {
          newStatus = 'approved-line3';
        } else if (decision === 'reject') {
          newStatus = 'reject-line3';
        } else {
          return res.status(400).json({ message: "Keputusan tidak valid." });
        }
      } else if (req.user.levelNumber === 4) {
        if (decision === 'approve') {
          newStatus = 'approved-line4';
        } else if (decision === 'reject') {
          newStatus = 'reject-line4';
        } else {
          return res.status(400).json({ message: "Keputusan tidak valid." });
        }
      } else if (req.user.levelNumber === 5) {
        if (decision === 'approve') {
          newStatus = 'payment'; 
        } else if (decision === 'reject') {
          newStatus = 'reject-line5';
        } else {
          return res.status(400).json({ message: "Keputusan tidak valid." });
        }
      } else {
        return res.status(403).json({ message: "Pengguna tidak memiliki akses untuk persetujuan ini." });
      }

      const lastApproval = await Approval.findOne({
        order: [["idString", "DESC"]],
        attributes: ["idString"],
      });

      let newId;
      if (lastApproval) {
        const lastId = lastApproval.idString;
        const lastNumber = parseInt(lastId.replace("app", ""));
        newId = `app${String(lastNumber + 1).padStart(3, "0")}`;
      } else {
        newId = "app001";
      }

      let existingApproval;
      do {
        existingApproval = await Approval.findOne({ where: { idString: newId } });
        if (existingApproval) {
          const lastNumber = parseInt(newId.replace("app", ""));
          newId = `app${String(lastNumber + 1).padStart(3, "0")}`;
        }
      } while (existingApproval);

      const approvalData = {
        idString: newId,
        budgetRequestIdString: req.body.budgetRequestIdString,
        userIdString: req.user.idString,
        approvalDate: req.body.approvalDate,
        decision: decision,
        comments: req.body.comments,
      };

      const newApproval = await Approval.create(approvalData);

      await BudgetRequest.update(
        { status: newStatus },
        { where: { idString: req.body.budgetRequestIdString } }
      );

      return res.status(201).json(newApproval);
    } catch (error) {
      console.error("Error creating approval:", error);
      return res.status(500).json({ message: "Terjadi kesalahan saat membuat approval." });
    }
  },

  findAll: async (req, res) => {
    try {
      const approvals = await Approval.findAll({
        include: [
          { model: BudgetRequest, as: "BudgetRequest" },
          { model: User, as: "User" },
        ],
      });
      return res.status(200).json(approvals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kesalahan saat mengambil approvals", error });
    }
  },

  findById: async (req, res) => {
    try {
      const approval = await Approval.findByPk(req.params.id, {
        include: [
          { model: BudgetRequest, as: "BudgetRequest" },
          { model: User, as: "User" },
        ],
      });
      if (!approval) {
        return res.status(404).json({ message: "Approval tidak ditemukan" });
      }
      return res.status(200).json(approval);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kesalahan saat mengambil approval", error });
    }
  },

  update: async (req, res) => {
    try {
      const approval = await Approval.findByPk(req.params.id);
      if (!approval) {
        return res.status(404).json({ message: "Approval tidak ditemukan" });
      }

      const updatedApproval = await approval.update(req.body);
      return res.status(200).json(updatedApproval);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kesalahan saat memperbarui approval", error });
    }
  },

  delete: async (req, res) => {
    try {
      const approval = await Approval.findByPk(req.params.id);
      if (!approval) {
        return res.status(404).json({ message: "Approval tidak ditemukan" });
      }

      await approval.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kesalahan saat menghapus approval", error });
    }
  },

  findAllByUser: async (req, res) => {
    try {
      const userIdString = req.user.idString;

      const approvals = await Approval.findAll({
        where: { userIdString: userIdString },
        include: [
          { model: BudgetRequest, as: "BudgetRequest" },
          { model: User, as: "User" },
        ],
      });
      return res.status(200).json(approvals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Kesalahan saat mengambil approvals", error });
    }
  }
};

module.exports = approvalController;
