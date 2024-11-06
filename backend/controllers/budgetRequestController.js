"use strict";
const { BudgetRequest, Approval } = require("../models");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const budgetRequestController = {
  create: async (req, res) => {
    try {
      console.log("Permintaan masuk:", req.body);
      console.log("Pengguna: dari token", req.user);

      let newIdString;
      let lastRequest = await BudgetRequest.findOne({
        order: [["idString", "DESC"]],
      });

      if (lastRequest) {
        let lastNumber = parseInt(lastRequest.idString.replace("req", ""), 10);
        do {
          lastNumber++;
          newIdString = `req${lastNumber.toString().padStart(3, "0")}`;
        } while (
          await BudgetRequest.findOne({ where: { idString: newIdString } })
        );
      } else {
        newIdString = "req001";
      }

      const {
        requestDate,
        amount,
        reason,
        status,
        departmentIDString,
        expectedDate,
        totalAmount,
        categoryIDString,
      } = req.body;

      let attachmentURL = "";
      if (req.file) {
        const stream = streamifier.createReadStream(req.file.buffer);
        const result = await new Promise((resolve, reject) => {
          stream.pipe(
            cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) {
                  console.error(error);
                  reject(error);
                }
                resolve(result);
              }
            )
          );
        });
        attachmentURL = result.secure_url;
      }

      const newRequest = await BudgetRequest.create({
        idString: newIdString,
        userIdString: req.user.idString,
        requestDate,
        amount,
        reason,
        status: "pending",
        departmentIDString,
        expectedDate,
        attachmentURL,
        totalAmount,
        categoryIDString,
      });

      return res.status(201).json(newRequest);
    } catch (error) {
      console.error("Error saat membuat permintaan anggaran:", error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat membuat permintaan anggaran",
        error,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      console.log("Level pengguna:", req.user.levelNumber);

      if (req.user.levelNumber < 1) {
        return res
          .status(403)
          .json({ message: "Akses ditolak: Level tidak mencukupi" });
      }

      let requests;

      if (req.user.levelNumber === 1) {
        requests = await BudgetRequest.findAll({
          where: { userIdString: req.user.idString },
          order: [["requestDate", "DESC"]],
        });
      } else {
        const statusFilter =
          req.user.levelNumber === 2
            ? "pending"
            : req.user.levelNumber === 3
            ? "approved-line2"
            : req.user.levelNumber === 4
            ? "approved-line3"
            : req.user.levelNumber === 5
            ? "approved-line4"
            : undefined;

        requests = await BudgetRequest.findAll({
          where: statusFilter ? { status: statusFilter } : {},
          order: [["requestDate", "DESC"]],
        });
      }

      return res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat mengambil permintaan anggaran",
        error,
      });
    }
  },

  findById: async (req, res) => {
    try {
      const request = await BudgetRequest.findByPk(req.params.id);
      if (!request) {
        return res
          .status(404)
          .json({ message: "Permintaan anggaran tidak ditemukan" });
      }
      return res.status(200).json(request);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat mengambil permintaan anggaran",
        error,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Memperbarui Permintaan Anggaran dengan ID:", id);

      if (!id) {
        return res
          .status(400)
          .json({ message: "ID permintaan anggaran diperlukan." });
      }

      const existingRequest = await BudgetRequest.findByPk(id);

      if (!existingRequest) {
        return res
          .status(404)
          .json({ message: "Permintaan anggaran tidak ditemukan." });
      }

      const {
        requestDate,
        amount,
        reason,
        departmentIDString,
        expectedDate,
        categoryIDString,
        action,
      } = req.body;

      let attachmentURL = existingRequest.attachmentURL;
      if (req.file) {
        const stream = streamifier.createReadStream(req.file.buffer);
        const result = await new Promise((resolve, reject) => {
          stream.pipe(
            cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) {
                  console.error("Error Upload Cloudinary:", error);
                  reject(error);
                }
                resolve(result);
              }
            )
          );
        });
        attachmentURL = result.secure_url;
      }

      await existingRequest.update({
        requestDate,
        amount,
        reason,
        departmentIDString,
        expectedDate,
        categoryIDString,
        attachmentURL,
        status:"pending",
      });

      return res.status(200).json({
        message: "Permintaan anggaran berhasil diperbarui!",
        updatedRequest: existingRequest,
      });
    } catch (error) {
      console.error("Error saat memperbarui permintaan anggaran:", error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat memperbarui permintaan anggaran.",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const request = await BudgetRequest.findByPk(req.params.id);
      if (!request) {
        return res
          .status(404)
          .json({ message: "Permintaan anggaran tidak ditemukan" });
      }
      await request.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat menghapus permintaan anggaran",
        error,
      });
    }
  },
};

module.exports = budgetRequestController;
