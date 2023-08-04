import { Request, Response, Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

/**
 * Post track
 * @swagger
 * /set-email-subscribe/:
 *    post:
 *      tags:
 *        - Subscribe
 *      summary: Enviar correo para subscribirse a Defix3.
 *      description: Registrar correo.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                required: [email]
 *                properties: {
 *                  email: {
 *                    type: "string"
 *                  }
 *                }
 *      responses:
 *        '200':
 *          description: Success.
 *        '400':
 *          description: Bad Request.
 *        '500':
 *          description: Bad Request.
 */
router.post("/create-user/", userController.createUser);

router.post("/get-user-by-wallet/", userController.getUserByWallet);

router.post("/create-like-track/", userController.createLikeTrack);

router.post("/delete-like-track/", userController.deleteLikeTrack);

router.post("/delete-like-track-id/", userController.deleteLikeTrackById);

router.post("/get-all-like-track/", userController.getAllLikeTrack);

export { router };
