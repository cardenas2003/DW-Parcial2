import { Request, Response } from "express";
import { Institution } from "../../models/business/Institution";
import { Car } from "../../models/business/Car";

export class InstitutionController {
  // ================= GET ALL =================
  public async getAll(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const institutions =
        await Institution.findAll({
          include: [
            {
              model: Car,
              as: "car",
            },
          ],
        });

      return res.status(200).json({
        ok: true,
        data: institutions,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error getting institutions",
        error,
      });
    }
  }

  // ================= GET BY ID =================
  public async getById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;

      const institution =
        await Institution.findByPk(Number(id), {
          include: [
            {
              model: Car,
              as: "car",
            },
          ],
        });

      if (!institution) {
        return res.status(404).json({
          ok: false,
          message: "Institution not found",
        });
      }

      return res.status(200).json({
        ok: true,
        data: institution,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error getting institution",
        error,
      });
    }
  }

  // ================= CREATE =================
  public async create(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const institution =
        await Institution.create(req.body);

      return res.status(201).json({
        ok: true,
        message:
          "Institution created successfully",
        data: institution,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error creating institution",
        error,
      });
    }
  }

  // ================= UPDATE =================
  public async update(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const institution =
        await Institution.findByPk(id);

      if (!institution) {
        return res.status(404).json({
          ok: false,
          message: "Institution not found",
        });
      }

      await institution.update(req.body);

      return res.status(200).json({
        ok: true,
        message:
          "Institution updated successfully",
        data: institution,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error updating institution",
        error,
      });
    }
  }

  // ================= DELETE =================
  public async delete(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const institution =
        await Institution.findByPk(id);

      if (!institution) {
        return res.status(404).json({
          ok: false,
          message: "Institution not found",
        });
      }

      await institution.destroy();

      return res.status(200).json({
        ok: true,
        message:
          "Institution deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting institution",
        error,
      });
    }
  }

  // ================= LOGIC DELETE =================
  public async logicDelete(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const institution =
        await Institution.findByPk(id);

      if (!institution) {
        return res.status(404).json({
          ok: false,
          message: "Institution not found",
        });
      }

      await institution.update({
        status: "INACTIVE",
      });

      return res.status(200).json({
        ok: true,
        message:
          "Logical delete completed",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error in logical delete",
        error,
      });
    }
  }
}