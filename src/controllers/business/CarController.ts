import { Request, Response } from "express";
import { Car } from "../../models/business/Car";

export class CarController {
  // ================= GET ALL =================
  public async getAll(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const cars = await Car.findAll();

      return res.status(200).json({
        ok: true,
        data: cars,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error getting cars",
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
      const id = req.params.id as string;

      const car = await Car.findByPk(id);

      if (!car) {
        return res.status(404).json({
          ok: false,
          message: "Car not found",
        });
      }

      return res.status(200).json({
        ok: true,
        data: car,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error getting car",
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
      const car = await Car.create(req.body);

      return res.status(201).json({
        ok: true,
        message: "Car created successfully",
        data: car,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error creating car",
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
      const id = req.params.id as string;

      const car = await Car.findByPk(id);

      if (!car) {
        return res.status(404).json({
          ok: false,
          message: "Car not found",
        });
      }

      await car.update(req.body);

      return res.status(200).json({
        ok: true,
        message: "Car updated successfully",
        data: car,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error updating car",
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
      const id = req.params.id as string;

      const car = await Car.findByPk(id);

      if (!car) {
        return res.status(404).json({
          ok: false,
          message: "Car not found",
        });
      }

      await car.destroy();

      return res.status(200).json({
        ok: true,
        message: "Car deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting car",
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
      const id = req.params.id as string;

      const car = await Car.findByPk(id);

      if (!car) {
        return res.status(404).json({
          ok: false,
          message: "Car not found",
        });
      }

      await car.update({
        status: "INACTIVE",
      });

      return res.status(200).json({
        ok: true,
        message: "Logical delete completed",
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